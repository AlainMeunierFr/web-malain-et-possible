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
}

/**
 * Interface pour un Lien dans le plan du site
 */
export interface PlanLien {
  source: string;
  destination: string;
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

          // Essayer de déduire le titre depuis le JSON associé
          let titre = fichier.name;
          
          // Pour la HomePage, chercher dans index.json
          if (url === '/') {
            try {
              const indexData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'index.json'), 'utf8'));
              const titreElement = indexData.contenu?.find((el: any) => el.type === 'titre');
              if (titreElement) {
                titre = titreElement.texte;
              }
            } catch (e) {
              // Si erreur, garder le titre par défaut
            }
          } else {
            // Pour les autres pages, chercher le JSON correspondant
            const nomFichier = fichier.name.replace(/-/g, ' ');
            // Essayer de trouver un JSON avec un nom similaire
            try {
              const dataDir = path.join(process.cwd(), 'data');
              const fichiersJSON = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json') && f !== 'index.json' && f !== 'footerButtons.json');
              
              // Chercher un JSON qui pourrait correspondre
              for (const fichierJSON of fichiersJSON) {
                try {
                  const contenuJSON = JSON.parse(fs.readFileSync(path.join(dataDir, fichierJSON), 'utf8'));
                  const titreElement = contenuJSON.contenu?.find((el: any) => el.type === 'titre');
                  if (titreElement) {
                    titre = titreElement.texte;
                    break;
                  }
                } catch (e) {
                  // Continuer
                }
              }
            } catch (e) {
              // Si erreur, garder le titre par défaut
            }
          }

          pages.push({
            url,
            titre,
            x: null,
            y: null,
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
    pages.unshift({ url: '/', titre: titreHome, x: null, y: null });
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
    f !== 'Détournements vidéo.json' &&
    f !== 'site-map.json'
  );

  for (const fichierJSON of fichiersJSON) {
    try {
      const contenu = fs.readFileSync(path.join(dataDir, fichierJSON), 'utf8');
      const data = JSON.parse(contenu);
      
      // Déterminer l'URL de la page source depuis le nom du fichier
      let pageSource = '/';
      if (fichierJSON === 'index.json') {
        pageSource = '/';
      } else {
        // Convertir le nom de fichier en URL
        // Ex: "Conduite du changement.json" -> "/transformation"
        // Ex: "management-de-produit-logiciel.json" -> "/management-de-produit-logiciel"
        const nomSansExt = fichierJSON.replace('.json', '');
        if (nomSansExt === 'Conduite du changement') {
          pageSource = '/transformation';
        } else if (nomSansExt === 'Détournement vidéo') {
          pageSource = '/detournement-video';
        } else if (nomSansExt === 'faisons-connaissance') {
          pageSource = '/faisons-connaissance';
        } else if (nomSansExt === 'Robustesse') {
          pageSource = '/robustesse';
        } else if (nomSansExt === 'management-de-produit-logiciel') {
          pageSource = '/management-de-produit-logiciel';
        } else if (nomSansExt === 'portfolio-detournements') {
          pageSource = '/portfolio-detournements';
        } else if (nomSansExt === 'pour-aller-plus-loin') {
          pageSource = '/pour_aller_plus_loin';
        } else {
          // Par défaut, utiliser le nom du fichier avec des tirets
          pageSource = '/' + nomSansExt.toLowerCase().replace(/\s+/g, '-');
        }
      }

      // Parcourir le contenu pour trouver les liens
      if (data.contenu && Array.isArray(data.contenu)) {
        for (const element of data.contenu) {
          // CallToAction : toujours vers /faisons-connaissance
          if (element.type === 'callToAction') {
            liens.push({
              source: pageSource,
              destination: '/faisons-connaissance',
              label: element.action,
            });
          }

          // Domaines de compétences : boutons dans les compétences
          if (element.type === 'domaineDeCompetence' && element.items) {
            for (const competence of element.items) {
              if (competence.bouton && competence.bouton.action) {
                const action = competence.bouton.action;
                if (estLienInterne(action)) {
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
      
      for (const button of footerButtons) {
        if (button.command) {
          const route = getRouteForCommand(button.command);
          if (route) {
            // Le footer est présent sur toutes les pages, donc on crée un lien depuis chaque page
            // Pour simplifier, on considère que le footer est accessible depuis toutes les pages
            // On ajoutera les liens depuis chaque page détectée
            liens.push({
              source: '*', // Spécial : signifie "toutes les pages"
              destination: route,
              label: button.tooltip || button.alt,
            });
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

  // 4. Dédupliquer les liens (même source + destination)
  const liensUniques: PlanLien[] = [];
  const liensVus = new Set<string>();
  
  for (const lien of liensResolus) {
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
 * - Ajoute les nouvelles pages (avec x: null, y: null)
 * - Supprime les pages obsolètes
 * - Ajoute les nouveaux liens
 * - Supprime les liens obsolètes
 * - Conserve les emplacements (x, y) existants
 * @param pages Pages détectées
 * @param liens Liens détectés
 */
export const mettreAJourPlanJSON = (pages: PlanPage[], liens: PlanLien[]): void => {
  const siteMapPath = path.join(process.cwd(), 'data', 'site-map.json');
  
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
    // Chercher si elle existe déjà dans le plan
    const pageExistante = planExistant.pages.find((p) => p.url === pageDetectee.url);
    
    if (pageExistante) {
      // Conserver l'emplacement existant si présent
      pagesMisesAJour.push({
        url: pageDetectee.url,
        titre: pageDetectee.titre, // Mettre à jour le titre au cas où
        x: pageExistante.x,
        y: pageExistante.y,
      });
    } else {
      // Nouvelle page : ajouter avec x et y null
      pagesMisesAJour.push({
        url: pageDetectee.url,
        titre: pageDetectee.titre,
        x: null,
        y: null,
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
      `Veuillez remplir manuellement les coordonnées dans le fichier site-map.json.`
    );
  }
};
