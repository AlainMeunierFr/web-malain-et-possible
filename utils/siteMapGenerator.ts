/**
 * Backend pur : Génération et validation du plan du site
 * Détecte automatiquement les pages et liens internes, met à jour le JSON
 */

import fs from 'fs';
import path from 'path';
import { getRouteForCommand } from './buttonHandlers';

/**
 * Interface pour une Page dans le plan du site
 */
export interface PlanPage {
  url: string;
  titre: string;
  x: number | null;
  y: number | null;
  numero?: number; // Numéro d'ordre pour l'affichage dans le plan du site
  dessiner?: 'Oui' | 'Non'; // Indique si la page doit être dessinée sur le plan
  e2eIDs?: string[]; // Liste des e2eID présents sur la page (un e2eID par élément interactif)
}

/**
 * Interface pour un Lien dans le plan du site
 */
export interface PlanLien {
  source: string;
  destination: string;
  sourceSide?: 'Haut' | 'Bas' | 'Droite' | 'Gauche'; // Côté du rectangle source où la flèche part
  destinationSide?: 'Haut' | 'Bas' | 'Droite' | 'Gauche'; // Côté du rectangle destination où la flèche arrive
  label?: string;
}

/**
 * Interface pour le plan du site complet
 */
export interface PlanSite {
  pages: PlanPage[];
  liens: PlanLien[];
}

/**
 * Convertit une URL en nom de fichier JSON correspondant
 * @param url URL de la page (ex: '/transformation', '/detournement-video')
 * @returns Nom du fichier JSON correspondant (ex: 'transformation.json', 'detournement-video.json')
 * Les noms de fichiers JSON correspondent maintenant directement aux URLs (sans slash initial)
 */
const urlVersNomFichierJSON = (url: string): string | null => {
  if (url === '/') {
    return 'index.json';
  }
  
  // Enlever le slash initial
  const urlSansSlash = url.substring(1);
  
  // Mapping explicite URL -> nom de fichier JSON
  // Les noms de fichiers JSON correspondent maintenant aux URLs (sans slash initial, avec underscores/tirets)
  const mapping: Record<string, string> = {
    'transformation': 'transformation.json',
    'detournement-video': 'detournement-video.json',
    'faisons-connaissance': 'faisons-connaissance.json',
    'robustesse': 'robustesse.json',
    'management-de-produit-logiciel': 'management-de-produit-logiciel.json',
    'portfolio-detournements': 'portfolio-detournements.json',
    'pour-aller-plus-loin': 'pour-aller-plus-loin.json',
  };
  
  if (mapping[urlSansSlash]) {
    return mapping[urlSansSlash];
  }
  
  // Par défaut, convertir l'URL en nom de fichier (remplacer _ par - et ajouter .json)
  return urlSansSlash.replace(/_/g, '-') + '.json';
};

/**
 * Détecte automatiquement toutes les pages Next.js dans le dossier app/
 * @returns Liste des pages détectées avec leur URL et titre
 */
export const detecterPages = (): PlanPage[] => {
  const appDir = path.join(process.cwd(), 'app');
  const pages: PlanPage[] = [];

  // Fonction récursive pour scanner les dossiers
  const scannerDossier = (dir: string, urlPrefix: string = ''): void => {
    if (!fs.existsSync(dir)) {
      return;
    }

    const fichiers = fs.readdirSync(dir, { withFileTypes: true });

    for (const fichier of fichiers) {
      if (fichier.isDirectory()) {
        // Ignorer certains dossiers
        if (fichier.name === 'api' || fichier.name.startsWith('.')) {
          continue;
        }

        const cheminComplet = path.join(dir, fichier.name);
        const pagePath = path.join(cheminComplet, 'page.tsx');

        // Si on trouve un page.tsx, c'est une route Next.js
        if (fs.existsSync(pagePath)) {
          // Construire l'URL
          const url = urlPrefix === '' && fichier.name === 'page.tsx' 
            ? '/' 
            : urlPrefix === '' 
            ? `/${fichier.name}` 
            : `${urlPrefix}/${fichier.name}`;

          // Exclure la page "Faisons connaissance..." car toutes les pages y amènent
          // et ça rend le plan illisible
          if (url === '/faisons-connaissance') {
            continue;
          }

          // Essayer de déduire le titre depuis le JSON associé
          let titre = fichier.name;
          
          try {
            const nomFichierJSON = urlVersNomFichierJSON(url);
            if (nomFichierJSON) {
              const cheminJSON = path.join(process.cwd(), 'data', nomFichierJSON);
              if (fs.existsSync(cheminJSON)) {
                const contenuJSON = JSON.parse(fs.readFileSync(cheminJSON, 'utf8'));
                const titreElement = contenuJSON.contenu?.find((el: any) => el.type === 'titre');
                if (titreElement) {
                  titre = titreElement.texte;
                }
              }
            }
          } catch (e) {
            // Si erreur, garder le titre par défaut
          }

          // Déterminer si la page doit être dessinée
          // Par défaut "Oui", sauf pour "Maintenance" et "Liste des pages du site" (plan-du-site)
          const pagesNonDessinees = ['/maintenance', '/plan-du-site'];
          const dessiner = pagesNonDessinees.includes(url) ? 'Non' : 'Oui';

          pages.push({
            url,
            titre,
            x: null,
            y: null,
            dessiner,
          });
        } else {
          // Continuer à scanner récursivement
          const nouvelleUrlPrefix = urlPrefix === '' ? `/${fichier.name}` : `${urlPrefix}/${fichier.name}`;
          scannerDossier(cheminComplet, nouvelleUrlPrefix);
        }
      }
    }
  };

  // Démarrer le scan depuis app/
  scannerDossier(appDir);

  // Ajouter la HomePage si elle n'est pas déjà là
  if (!pages.find((p) => p.url === '/')) {
    let titreHome = 'Home';
    try {
      const indexData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'index.json'), 'utf8'));
      const titreElement = indexData.contenu?.find((el: any) => el.type === 'titre');
      if (titreElement) {
        titreHome = titreElement.texte;
      }
    } catch (e) {
      // Garder le titre par défaut
    }
    // HomePage doit être dessinée par défaut (seules /maintenance et /plan-du-site sont "Non")
    pages.unshift({ url: '/', titre: titreHome, x: null, y: null, dessiner: 'Oui' });
  }

  return pages;
};

/**
 * Détecte automatiquement tous les liens internes entre pages
 * @returns Liste des liens détectés
 */
export const detecterLiensInternes = (): PlanLien[] => {
  const liens: PlanLien[] = [];
  const dataDir = path.join(process.cwd(), 'data');
  
  // Fonction pour vérifier si une URL est interne
  const estLienInterne = (url: string | null | undefined): boolean => {
    if (!url) return false;
    // Un lien interne commence par / et n'est pas externe
    return url.startsWith('/') && !url.startsWith('//') && !url.match(/^https?:\/\//);
  };

  // 1. Détecter les liens depuis les fichiers JSON de pages
  const fichiersJSON = fs.readdirSync(dataDir).filter((f) => 
    f.endsWith('.json') && 
    f !== 'footerButtons.json' && 
    f !== 'detournement-video.json' &&
    f !== 'Pages-Et-Lien.json'
  );

  for (const fichierJSON of fichiersJSON) {
    try {
      const contenu = fs.readFileSync(path.join(dataDir, fichierJSON), 'utf8');
      const data = JSON.parse(contenu);
      
      // Déterminer l'URL de la page source depuis le nom du fichier
      // Les noms de fichiers JSON correspondent maintenant directement aux URLs (sans slash initial)
      let pageSource = '/';
      if (fichierJSON === 'index.json') {
        pageSource = '/';
      } else {
        // Le nom du fichier (sans extension) correspond directement à l'URL (sans slash initial)
        const nomSansExt = fichierJSON.replace('.json', '');
        pageSource = '/' + nomSansExt;
      }

      // Parcourir le contenu pour trouver les liens
      if (data.contenu && Array.isArray(data.contenu)) {
        for (const element of data.contenu) {
          // CallToAction : toujours vers /faisons-connaissance
          // Exclu du plan car toutes les pages y amènent et ça rend le plan illisible
          // if (element.type === 'callToAction') {
          //   liens.push({
          //     source: pageSource,
          //     destination: '/faisons-connaissance',
          //     label: element.action,
          //   });
          // }

          // Domaines de compétences : boutons dans les compétences
          if (element.type === 'domaineDeCompetence' && element.competences) {
            for (const competence of element.competences) {
              if (competence.bouton && competence.bouton.action) {
                const action = competence.bouton.action;
                if (estLienInterne(action) && action !== '/faisons-connaissance') {
                  liens.push({
                    source: pageSource,
                    destination: action,
                    label: competence.bouton.texte,
                  });
                }
              }
            }
          }
        }
      }
    } catch (e) {
      // Ignorer les erreurs de lecture/parsing
      continue;
    }
  }

  // 2. Détecter les liens depuis le footer
  try {
    const footerButtonsPath = path.join(dataDir, 'footerButtons.json');
    if (fs.existsSync(footerButtonsPath)) {
      const footerButtons = JSON.parse(fs.readFileSync(footerButtonsPath, 'utf8'));
      
      // Vérifier si c'est la nouvelle structure (groupeBoutons)
      if (footerButtons.type === 'groupeBoutons' && footerButtons.boutons) {
        for (const button of footerButtons.boutons) {
          if (button.command) {
            const route = getRouteForCommand(button.command);
            if (route && route !== '/faisons-connaissance') {
              // Le footer est présent sur toutes les pages, donc on crée un lien depuis chaque page
              liens.push({
                source: '*', // Spécial : signifie "toutes les pages"
                destination: route,
                label: button.texte || button.icone,
              });
            }
          }
        }
      }
    }
  } catch (e) {
    // Ignorer les erreurs
  }

  // 3. Résoudre les liens "*" (footer) : créer un lien depuis chaque page
  const liensResolus: PlanLien[] = [];
  const pages = detecterPages();
  
  for (const lien of liens) {
    if (lien.source === '*') {
      // Créer un lien depuis chaque page vers la destination
      for (const page of pages) {
        liensResolus.push({
          source: page.url,
          destination: lien.destination,
          label: lien.label,
        });
      }
    } else {
      liensResolus.push(lien);
    }
  }

  // 4. Filtrer les liens vers /faisons-connaissance (exclus du plan)
  const liensFiltres = liensResolus.filter((lien) => lien.destination !== '/faisons-connaissance');

  // 5. Dédupliquer les liens (même source + destination)
  const liensUniques: PlanLien[] = [];
  const liensVus = new Set<string>();
  
  for (const lien of liensFiltres) {
    const cle = `${lien.source}->${lien.destination}`;
    if (!liensVus.has(cle)) {
      liensVus.add(cle);
      liensUniques.push(lien);
    }
  }

  return liensUniques;
};

/**
 * Met à jour le plan JSON avec les pages et liens détectés
 * - Recherche chaque page par son URL : si elle n'existe pas, la crée
 * - Ne touche pas aux valeurs existantes, sauf "titre" qui prend la valeur trouvée par l'algo
 * - Si "dessiner" est vide/null, la valeur par défaut est "Oui"
 * - Supprime les pages obsolètes
 * - Ajoute les nouveaux liens
 * - Supprime les liens obsolètes
 * - Conserve les emplacements (x, y) existants
 * @param pages Pages détectées
 * @param liens Liens détectés
 */
export const mettreAJourPlanJSON = (pages: PlanPage[], liens: PlanLien[]): void => {
  const siteMapPath = path.join(process.cwd(), 'data', 'Pages-Et-Lien.json');
  
  let planExistant: PlanSite = { pages: [], liens: [] };
  
  // Lire le plan existant s'il existe
  if (fs.existsSync(siteMapPath)) {
    try {
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      planExistant = JSON.parse(contenu);
    } catch (e) {
      // Si erreur de lecture, repartir de zéro
      planExistant = { pages: [], liens: [] };
    }
  }

  // Mettre à jour les pages
  const pagesMisesAJour: PlanPage[] = [];
  
  // Pour chaque page détectée
  for (const pageDetectee of pages) {
    // Rechercher la page par son URL dans le plan existant
    const pageExistante = planExistant.pages.find((p) => p.url === pageDetectee.url);
    
    if (pageExistante) {
      // Page existe déjà : conserver TOUTES les valeurs existantes sauf le titre qui est mis à jour
      // Si dessiner est vide/null, utiliser 'Oui' par défaut
      const dessiner = pageExistante.dessiner || pageDetectee.dessiner || 'Oui';
      pagesMisesAJour.push({
        url: pageExistante.url,
        titre: pageDetectee.titre, // Seule valeur mise à jour depuis l'algo
        x: pageExistante.x,
        y: pageExistante.y,
        numero: pageExistante.numero, // Conserver le numéro existant
        dessiner,
        e2eIDs: pageExistante.e2eIDs, // Conserver les e2eIDs existants
      });
    } else {
      // Page n'existe pas : créer une nouvelle page
      // Si dessiner est vide/null, utiliser 'Oui' par défaut
      const dessiner = pageDetectee.dessiner || 'Oui';
      pagesMisesAJour.push({
        url: pageDetectee.url,
        titre: pageDetectee.titre,
        x: null,
        y: null,
        dessiner,
      });
    }
  }

  // Mettre à jour les liens
  const liensMisesAJour: PlanLien[] = [];
  
  // Pour chaque lien détecté
  for (const lienDetecte of liens) {
    // Vérifier que la source et la destination existent dans les pages
    const sourceExiste = pagesMisesAJour.some((p) => p.url === lienDetecte.source);
    const destinationExiste = pagesMisesAJour.some((p) => p.url === lienDetecte.destination);
    
    if (sourceExiste && destinationExiste) {
      // Vérifier si le lien existe déjà dans le plan existant
      const lienExistant = planExistant.liens.find(
        (l) => l.source === lienDetecte.source && l.destination === lienDetecte.destination
      );
      
      if (lienExistant) {
        liensMisesAJour.push(lienExistant); // Conserver le label existant
      } else {
        liensMisesAJour.push(lienDetecte); // Nouveau lien
      }
    }
    // Si source ou destination n'existe pas, on ignore le lien (il sera supprimé)
  }
  
  // Note: Les liens du plan existant qui ne sont plus détectés sont automatiquement supprimés
  // car on ne les ajoute pas à liensMisesAJour
  // Seuls les liens détectés (passés en paramètre) sont conservés

  // Créer le nouveau plan
  const nouveauPlan: PlanSite = {
    pages: pagesMisesAJour,
    liens: liensMisesAJour,
  };

  // S'assurer que le répertoire data/ existe avant d'écrire le fichier
  const dataDir = path.dirname(siteMapPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Écrire le plan mis à jour
  fs.writeFileSync(siteMapPath, JSON.stringify(nouveauPlan, null, 2));
};

/**
 * Valide que toutes les pages ont un emplacement défini (x et y non null)
 * @param plan Plan du site à valider
 * @throws Error si au moins une page n'a pas d'emplacement
 */
export const validerEmplacements = (plan: PlanSite): void => {
  const pagesSansEmplacement = plan.pages.filter((p) => p.x === null || p.y === null);
  
  if (pagesSansEmplacement.length > 0) {
    const urlsSansEmplacement = pagesSansEmplacement.map((p) => p.url).join(', ');
    throw new Error(
      `Les pages suivantes n'ont pas d'emplacement défini (x, y) : ${urlsSansEmplacement}. ` +
      `Veuillez remplir manuellement les coordonnées dans le fichier Pages-Et-Lien.json.`
    );
  }
};
