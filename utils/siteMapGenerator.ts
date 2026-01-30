/**
 * Backend pur : Génération et validation du plan du site
 * Détecte automatiquement les pages et liens internes, met à jour le JSON
 * Les liens peuvent être dérivés de l'inventaire e2eID (source de vérité) en complément du parsing par type.
 */

import fs from 'fs';
import path from 'path';
import { getRouteForCommand } from './buttonHandlers';
import { generateE2eIdInventory } from './e2eIdInventory';
import { readPageData } from './indexReader';

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
  zone?: 'HomePage' | 'Profils' | 'Autres' | 'Footer' | 'Masqué'; // Zone d'affichage dans le plan du site
  ordre?: number;
}

/** Ordre d'affichage des zones dans le plan du site (Home, Profils, Autres, Footer, Masqué) */
const ORDRE_ZONES: (PlanPage['zone'])[] = ['HomePage', 'Profils', 'Autres', 'Footer', 'Masqué'];

function indexZonePourTri(zone: PlanPage['zone']): number {
  const index = ORDRE_ZONES.indexOf(zone);
  return index >= 0 ? index : ORDRE_ZONES.length; // sans zone → après Masqué
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
  /** e2eID de l'élément cliquable (source unique de vérité pour dériver les liens) */
  e2eID?: string;
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
    'profil/cpo': 'profil-cpo.json',
    'profil/coo': 'profil-coo.json',
    'profil/agile': 'profil-agile.json',
    'profil/cto': 'profil-cto.json',
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
        if (fichier.name === 'api' || fichier.name.startsWith('.') || fichier.name.startsWith('[')) {
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

          // La page "Faisons connaissance" est maintenant incluse dans le plan du site
          // avec la zone "Footer"

          // Essayer de déduire le titre depuis le JSON associé
          let titre = fichier.name;
          
          try {
            const nomFichierJSON = urlVersNomFichierJSON(url);
            if (nomFichierJSON) {
              const cheminJSON = path.join(process.cwd(), 'data', nomFichierJSON);
              if (fs.existsSync(cheminJSON)) {
                const contenuJSON = JSON.parse(fs.readFileSync(cheminJSON, 'utf8'));
                // Chercher d'abord titreDePage, puis titre en fallback
                const titreElement = contenuJSON.contenu?.find((el: any) => el.type === 'titreDePage') 
                  || contenuJSON.contenu?.find((el: any) => el.type === 'titre');
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

          // Assigner automatiquement une zone selon l'URL
          let zone: 'HomePage' | 'Profils' | 'Autres' | 'Footer' | 'Masqué' | undefined;
          if (url === '/') {
            zone = 'HomePage';
          } else if (url.startsWith('/profil/')) {
            zone = 'Profils';
          } else if (url === '/metrics' || url === '/a-propos-du-site' || url === '/faisons-connaissance') {
            zone = 'Footer';
          } else if (url === '/maintenance' || url === '/plan-du-site') {
            zone = 'Masqué';
          } else {
            zone = 'Autres';
          }

          pages.push({
            url,
            titre,
            x: null,
            y: null,
            dessiner,
            zone,
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

  // Gérer les routes dynamiques de profils : créer explicitement les 4 pages de profils
  const profils = ['cpo', 'coo', 'agile', 'cto'];
  for (const slug of profils) {
    const url = `/profil/${slug}`;
    // Vérifier si la page n'existe pas déjà (éviter les doublons)
    if (!pages.find((p) => p.url === url)) {
      let titre = `Profil ${slug}`;
      try {
        const nomFichierJSON = `profil-${slug}.json`;
        const cheminJSON = path.join(process.cwd(), 'data', nomFichierJSON);
        if (fs.existsSync(cheminJSON)) {
          const contenuJSON = JSON.parse(fs.readFileSync(cheminJSON, 'utf8'));
          // Chercher d'abord titreDePage, puis titre en fallback
          const titreElement = contenuJSON.contenu?.find((el: any) => el.type === 'titreDePage') 
            || contenuJSON.contenu?.find((el: any) => el.type === 'titre');
          if (titreElement) {
            titre = titreElement.texte;
          }
        }
      } catch (e) {
        // Garder le titre par défaut
      }
      pages.push({
        url,
        titre,
        x: null,
        y: null,
        dessiner: 'Oui',
        zone: 'Profils', // Les profils sont dans la zone Profils
      });
    }
  }

  // Ajouter la HomePage si elle n'est pas déjà là
  if (!pages.find((p) => p.url === '/')) {
    let titreHome = 'Home';
    try {
      const indexData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'index.json'), 'utf8'));
      // Chercher d'abord titreDePage, puis titre en fallback
      const titreElement = indexData.contenu?.find((el: any) => el.type === 'titreDePage') 
        || indexData.contenu?.find((el: any) => el.type === 'titre');
      if (titreElement) {
        titreHome = titreElement.texte;
      }
    } catch (e) {
      // Garder le titre par défaut
    }
    // HomePage doit être dessinée par défaut (seules /maintenance et /plan-du-site sont "Non")
    pages.unshift({ url: '/', titre: titreHome, x: null, y: null, dessiner: 'Oui', zone: 'HomePage' });
  }

  return pages;
};

/**
 * Fichier JSON → URL de la page (source unique pour tout le générateur de plan).
 * Cohérent avec les routes de l'app : index → /, profil-* → /profil/slug, reste → /nomSansExt.
 */
function fichierJsonVersPageSource(fichierJSON: string): string {
  if (fichierJSON === 'index.json') return '/';
  const nomSansExt = fichierJSON.replace('.json', '');
  if (nomSansExt.startsWith('profil-')) return '/profil/' + nomSansExt.slice(7);
  return '/' + nomSansExt;
}

/**
 * Extrait tous les liens internes depuis un contenu de page **résolu** (même structure que l'app après readPageData).
 * Une seule traversée : domaines avec items[].bouton.action, profils[].route. Pas de logique par type "ref" vs "inline".
 */
function extractLinksFromContenu(
  contenu: { type?: string; items?: Array<{ bouton?: { action?: string; texte?: string; e2eID?: string } }>; profils?: Array<{ route?: string; titre?: string }> }[] | undefined,
  pageSource: string,
  estLienInterne: (url: string) => boolean
): PlanLien[] {
  const liens: PlanLien[] = [];
  if (!contenu || !Array.isArray(contenu)) return liens;
  for (const element of contenu) {
    if (element.type === 'domaineDeCompetence' && element.items) {
      for (const item of element.items) {
        const action = item.bouton?.action;
        if (action && estLienInterne(action) && action !== '/faisons-connaissance' && action !== pageSource) {
          liens.push({
            source: pageSource,
            destination: action,
            label: item.bouton?.texte,
            e2eID: item.bouton?.e2eID,
          });
        }
      }
    }
    if (element.type === 'profils' && element.profils) {
      for (const p of element.profils) {
        if (p.route && estLienInterne(p.route) && p.route !== pageSource) {
          liens.push({ source: pageSource, destination: p.route, label: p.titre || p.route });
        }
      }
    }
  }
  return liens;
}

/**
 * Dérive les liens du plan depuis l'inventaire e2eID (liste de tous les e2eID avec destination).
 * Chaque élément de l'inventaire qui a une destination interne produit un PlanLien (source = page du fichier, destination, e2eID).
 * Permet de ne pas dépendre uniquement du parsing par type (domaineDeCompetence, profils, etc.).
 */
export function getLiensFromE2eIdInventory(): PlanLien[] {
  const inventory = generateE2eIdInventory();
  const liens: PlanLien[] = [];
  for (const item of inventory) {
    if (!item.destination || item.source !== 'json') continue;
    const source = fichierJsonVersPageSource(item.file);
    liens.push({
      source,
      destination: item.destination,
      label: item.description ?? undefined,
      e2eID: item.e2eID,
    });
  }
  return liens;
}

/**
 * Détecte automatiquement tous les liens internes entre pages
 * Combine : inventaire e2eID (liens dérivés des e2eID avec destination) + parsing par type JSON + footer + liens manuels.
 * @returns Liste des liens détectés
 */
export const detecterLiensInternes = (): PlanLien[] => {
  const liens: PlanLien[] = [];
  const dataDir = path.join(process.cwd(), 'data');

  // 0. Liens dérivés de l'inventaire e2eID (source de vérité : liste de tous les e2eID)
  const liensInventaire = getLiensFromE2eIdInventory();
  for (const l of liensInventaire) {
    liens.push(l);
  }
  
  // Fonction pour vérifier si une URL est interne
  const estLienInterne = (url: string | null | undefined): boolean => {
    if (!url) return false;
    // Un lien interne commence par / et n'est pas externe
    return url.startsWith('/') && !url.startsWith('//') && !url.match(/^https?:\/\//);
  };

  // 1. Liens depuis le contenu résolu de chaque page (même pipeline que l'app : readPageData → refs résolues → extraction)
  // Tout JSON dans data/ (hors _*) ; pas d'exclusion. readPageData résout les refs comme l'app.
  const fichiersJSON = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json') && !f.startsWith('_'));

  for (const fichierJSON of fichiersJSON) {
    try {
      const pageData = readPageData(fichierJSON);
      const pageSource = fichierJsonVersPageSource(fichierJSON);
      for (const l of extractLinksFromContenu(pageData.contenu, pageSource, estLienInterne)) {
        liens.push(l);
      }
    } catch {
      continue;
    }
  }

  // Lien Home → Mes Profils (présent dans HeroSection, non déclaré dans index.json)
  liens.push({ source: '/', destination: '/mes-profils', label: 'Mes Profils' });

  // 2. Détecter les liens depuis le footer
  try {
    const footerButtonsPath = path.join(dataDir, '_footerButtons.json');
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

  // Logo header (e2eid-h1) : depuis chaque page vers Home, présent sur toutes les pages
  for (const page of pages) {
    if (page.url !== '/') {
      liensResolus.push({ source: page.url, destination: '/', label: 'Logo', e2eID: 'h1' });
    }
  }

  // 4. Filtrer les liens vers /faisons-connaissance (exclus du plan, sauf depuis Home)
  const liensFiltres = liensResolus.filter((lien) => lien.destination !== '/faisons-connaissance');
  // Lien Home → Faisons connaissance (bouton « Discutons » du hero) : conservé pour l’assistant (BleuClair depuis Home)
  liensFiltres.push({ source: '/', destination: '/faisons-connaissance', label: 'Discutons' });

  // 4b. Exclure les liens source === destination (comme le render : compétence vers la page courante = on ne l'affiche pas)
  const liensSansAuto = liensFiltres.filter((lien) => lien.source !== lien.destination);

  // 5. Dédupliquer les liens (même source + destination)
  const liensUniques: PlanLien[] = [];
  const liensVus = new Set<string>();
  
  for (const lien of liensSansAuto) {
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
 * @param options.siteMapPath Chemin optionnel du fichier (pour les tests unitaires, évite d'écrire dans le fichier réel)
 */
export const mettreAJourPlanJSON = (
  pages: PlanPage[],
  liens: PlanLien[],
  options?: { siteMapPath?: string }
): void => {
  const siteMapPath = options?.siteMapPath ?? path.join(process.cwd(), 'data', '_Pages-Et-Lien.json');
  
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
      // Pour /faisons-connaissance, forcer la zone Footer (mise à jour de l'US)
      const zone = pageDetectee.url === '/faisons-connaissance' 
        ? 'Footer' 
        : (pageExistante.zone || pageDetectee.zone);
      pagesMisesAJour.push({
        url: pageExistante.url,
        titre: pageDetectee.titre, // Seule valeur mise à jour depuis l'algo
        x: pageExistante.x,
        y: pageExistante.y,
        numero: pageExistante.numero, // Conserver le numéro existant
        dessiner,
        e2eIDs: pageExistante.e2eIDs, // Conserver les e2eIDs existants
        zone, // Utiliser la zone calculée (Footer pour /faisons-connaissance, sinon existante ou détectée)
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
        zone: pageDetectee.zone, // Utiliser la zone détectée
        dessiner,
        // zone n'est pas définie pour les nouvelles pages (sera assignée manuellement)
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

  // Trier les pages par zone, puis par Ordre dans chaque zone
  pagesMisesAJour.sort((a, b) => {
    const zoneDiff = indexZonePourTri(a.zone) - indexZonePourTri(b.zone);
    if (zoneDiff !== 0) return zoneDiff;
    const ordreA = a.ordre ?? Infinity;
    const ordreB = b.ordre ?? Infinity;
    return ordreA - ordreB;
  });

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
      `Veuillez remplir manuellement les coordonnées dans le fichier _Pages-Et-Lien.json.`
    );
  }
};
