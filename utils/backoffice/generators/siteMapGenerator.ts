/**
 * Backend pur : Génération et validation du plan du site
 * Détecte automatiquement les pages et liens internes, met à jour le JSON
 * Les liens peuvent être dérivés de l'inventaire e2eID (source de vérité) en complément du parsing par type.
 */

import fs from 'fs';
import path from 'path';
import { getRouteForCommand } from '../../vitrine/buttonHandlers';
import { generateE2eIdInventory } from '../integrity/e2eIdInventory';
import { readPageData, type ElementContenu } from '../../vitrine/pageReader';
import { loadMapping, getE2eId, isExcluded, competenceKey, profilKey, lienPageKey, heroCallToActionKey, heroEnSavoirPlusKey, footerKey } from '../../shared/e2eIdMapping';

// Types importés depuis shared/ pour éviter les imports circulaires
// et permettre aux modules client d'utiliser ces types sans tirer 'fs'
import type { PlanPage, PlanLien, PlanSite, TypeElementCliquable } from '../../shared/planDuSiteTypes';

// Réexport des types pour les consommateurs existants
export type { PlanPage, PlanLien, PlanSite, TypeElementCliquable };

/** Ordre d'affichage des zones dans le plan du site */
const ORDRE_ZONES: (PlanPage['zone'])[] = ['HomePage', 'Profils', 'Autres', 'Footer', 'Masqué'];

function indexZonePourTri(zone: PlanPage['zone']): number {
  const index = ORDRE_ZONES.indexOf(zone);
  return index >= 0 ? index : ORDRE_ZONES.length;
}

/**
 * Convertit une URL en nom de fichier JSON correspondant
 */
const urlVersNomFichierJSON = (url: string): string | null => {
  if (url === '/') {
    return 'index.json';
  }
  
  const urlSansSlash = url.substring(1);
  
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
  
  return urlSansSlash.replace(/_/g, '-') + '.json';
};

/**
 * Détecte automatiquement toutes les pages Next.js dans le dossier app/
 */
export const detecterPages = (): PlanPage[] => {
  const appDir = path.join(process.cwd(), 'app');
  const pages: PlanPage[] = [];

  const titreParUrl: Record<string, string> = {
    '/raw': 'Raw (DOM sans CSS)',
  };

  const ajouterPage = (url: string, titreDefaut: string): void => {
    let titre = titreParUrl[url] ?? titreDefaut;
    if (!titreParUrl[url]) {
      try {
        const nomFichierJSON = urlVersNomFichierJSON(url);
        if (nomFichierJSON) {
          const cheminJSON = path.join(process.cwd(), 'data', nomFichierJSON);
          if (fs.existsSync(cheminJSON)) {
            const contenuJSON = JSON.parse(fs.readFileSync(cheminJSON, 'utf8'));
            const titreElement = contenuJSON.contenu?.find((el: any) => el.type === 'titreDePage')
              || contenuJSON.contenu?.find((el: any) => el.type === 'titre');
            if (titreElement) {
              titre = titreElement.texte;
            }
          }
        }
      } catch (e) {
        // Garder le titre par défaut
      }
    }
    // Pages à exclure complètement (redirections, pages techniques)
    const pagesExclues = ['/metrics']; // /metrics redirige vers /a-propos?view=metrics
    if (pagesExclues.includes(url)) {
      return; // Ne pas ajouter cette page
    }
    
    const pagesNonDessinees = ['/maintenance', '/plan-du-site', '/pour-aller-plus-loin'];
    const dessiner = pagesNonDessinees.includes(url) ? 'Non' : 'Oui';
    let zone: 'HomePage' | 'Profils' | 'Autres' | 'Footer' | 'Masqué' | undefined;
    if (url === '/') {
      zone = 'HomePage';
    } else if (url.startsWith('/profil/')) {
      zone = 'Profils';
    } else if (url === '/a-propos' || url === '/faisons-connaissance') {
      zone = 'Footer';
    } else if (url === '/maintenance' || url === '/plan-du-site' || url === '/pour-aller-plus-loin') {
      zone = 'Masqué';
    } else {
      zone = 'Autres';
    }
    pages.push({ url, titre, x: null, y: null, dessiner, zone });
  };

  const scannerDossier = (dir: string, urlPrefix: string = ''): void => {
    if (!fs.existsSync(dir)) {
      return;
    }

    const pagePathCourant = path.join(dir, 'page.tsx');
    if (fs.existsSync(pagePathCourant)) {
      const url = urlPrefix === '' ? '/' : urlPrefix;
      if (!pages.find((p) => p.url === url)) {
        const titreDefaut = url === '/' ? 'Home' : path.basename(dir);
        ajouterPage(url, titreDefaut);
      }
    }

    const fichiers = fs.readdirSync(dir, { withFileTypes: true });

    for (const fichier of fichiers) {
      if (fichier.isDirectory()) {
        if (fichier.name === 'api' || fichier.name.startsWith('.') || fichier.name.startsWith('[')) {
          continue;
        }

        const cheminComplet = path.join(dir, fichier.name);
        const pagePath = path.join(cheminComplet, 'page.tsx');
        const isRouteGroup = fichier.name.startsWith('(');

        if (isRouteGroup) {
          scannerDossier(cheminComplet, urlPrefix);
        } else if (fs.existsSync(pagePath)) {
          const url = urlPrefix === '' ? `/${fichier.name}` : `${urlPrefix}/${fichier.name}`;
          if (!pages.find((p) => p.url === url)) {
            ajouterPage(url, fichier.name);
          }
        } else {
          const nouvelleUrlPrefix = urlPrefix === '' ? `/${fichier.name}` : `${urlPrefix}/${fichier.name}`;
          scannerDossier(cheminComplet, nouvelleUrlPrefix);
        }
      }
    }
  };

  scannerDossier(appDir);

  const profils = ['cpo', 'coo', 'agile', 'cto'];
  for (const slug of profils) {
    const url = `/profil/${slug}`;
    if (!pages.find((p) => p.url === url)) {
      let titre = `Profil ${slug}`;
      try {
        const nomFichierJSON = `profil-${slug}.json`;
        const cheminJSON = path.join(process.cwd(), 'data', nomFichierJSON);
        if (fs.existsSync(cheminJSON)) {
          const contenuJSON = JSON.parse(fs.readFileSync(cheminJSON, 'utf8'));
          const titreElement = contenuJSON.contenu?.find((el: any) => el.type === 'titreDePage') 
            || contenuJSON.contenu?.find((el: any) => el.type === 'titre');
          if (titreElement) {
            titre = titreElement.texte;
          }
        }
      } catch (e) {
        // Garder le titre par défaut
      }
      pages.push({ url, titre, x: null, y: null, dessiner: 'Oui', zone: 'Profils' });
    }
  }

  if (!pages.find((p) => p.url === '/')) {
    let titreHome = 'Home';
    try {
      const indexData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'index.json'), 'utf8'));
      const titreElement = indexData.contenu?.find((el: any) => el.type === 'titreDePage') 
        || indexData.contenu?.find((el: any) => el.type === 'titre');
      if (titreElement) {
        titreHome = titreElement.texte;
      }
    } catch (e) {
      // Garder le titre par défaut
    }
    pages.unshift({ url: '/', titre: titreHome, x: null, y: null, dessiner: 'Oui', zone: 'HomePage' });
  }

  return pages;
};

/**
 * Fichier JSON → URL de la page (source unique pour tout le générateur de plan).
 */
function fichierJsonVersPageSource(fichierJSON: string): string {
  if (fichierJSON === 'index.json') return '/';
  const nomSansExt = fichierJSON.replace('.json', '');
  if (nomSansExt.startsWith('profil-')) return '/profil/' + nomSansExt.slice(7);
  return '/' + nomSansExt;
}

/**
 * Charge la bibliothèque de domaines et compétences pour résoudre les références
 */
function loadBibliotheque(): { domaines: Record<string, unknown>; competences: Record<string, unknown> } {
  const dataDir = path.join(process.cwd(), 'data', 'bibliotheque');
  let domaines: Record<string, unknown> = {};
  let competences: Record<string, unknown> = {};
  
  try {
    const domainesPath = path.join(dataDir, 'domaines.json');
    if (fs.existsSync(domainesPath)) {
      const data = JSON.parse(fs.readFileSync(domainesPath, 'utf8'));
      domaines = data.domaines || {};
    }
  } catch { /* ignore */ }
  
  try {
    const competencesPath = path.join(dataDir, 'competences.json');
    if (fs.existsSync(competencesPath)) {
      const data = JSON.parse(fs.readFileSync(competencesPath, 'utf8'));
      competences = data.competences || {};
    }
  } catch { /* ignore */ }
  
  return { domaines, competences };
}

/**
 * Extrait tous les liens internes depuis un contenu de page résolu.
 * Résout les références vers la bibliothèque pour trouver les boutons des compétences.
 * Les e2eID sont résolus depuis le mapping centralisé, pas depuis les données métier.
 */
function extractLinksFromContenu(
  contenu: ElementContenu[] | undefined,
  pageSource: string,
  estLienInterne: (url: string) => boolean,
  bibliotheque?: { domaines: Record<string, unknown>; competences: Record<string, unknown> },
  e2eMapping?: Record<string, string>
): PlanLien[] {
  const liens: PlanLien[] = [];
  if (!contenu || !Array.isArray(contenu)) return liens;
  
  const biblio = bibliotheque || loadBibliotheque();
  const mapping = e2eMapping || loadMapping();
  
  for (const element of contenu) {
    // Type hero : callToAction et ensavoirplus
    if (element.type === 'hero') {
      const hero = element as { callToAction?: { action?: string; texte?: string }; ensavoirplus?: string };
      if (hero.callToAction?.action && estLienInterne(hero.callToAction.action) && hero.callToAction.action !== pageSource) {
        const key = heroCallToActionKey(pageSource, hero.callToAction.action);
        const e2eId = getE2eId(key, mapping);
        liens.push({
          source: pageSource,
          destination: hero.callToAction.action,
          label: hero.callToAction.texte || 'Call to action',
          typeElement: 'Hero.CallToAction',
          e2eID: e2eId ?? undefined,
        });
      }
      if (hero.ensavoirplus && estLienInterne(hero.ensavoirplus) && hero.ensavoirplus !== pageSource) {
        const key = heroEnSavoirPlusKey(pageSource, hero.ensavoirplus);
        const e2eId = getE2eId(key, mapping);
        liens.push({
          source: pageSource,
          destination: hero.ensavoirplus,
          label: 'Télécharger mon CV',
          typeElement: 'Hero.EnSavoirPlus',
          e2eID: e2eId ?? undefined,
        });
      }
    }
    
    // Type domaineDeCompetence avec ref : résoudre vers la bibliothèque
    if (element.type === 'domaineDeCompetence') {
      const domaine = element as { ref?: string; id?: string; items?: Array<{ id?: string; bouton?: { action?: string; texte?: string } }> };
      
      // Si c'est une référence, résoudre depuis la bibliothèque
      if (domaine.ref && biblio.domaines[domaine.ref]) {
        const domaineData = biblio.domaines[domaine.ref] as { competences?: string[] };
        if (domaineData.competences) {
          for (const compRef of domaineData.competences) {
            const comp = biblio.competences[compRef] as { id?: string; bouton?: { action?: string; texte?: string } } | undefined;
            if (comp?.bouton?.action && estLienInterne(comp.bouton.action) && comp.bouton.action !== '/faisons-connaissance' && comp.bouton.action !== pageSource) {
              // Résoudre l'e2eID depuis le mapping via la clé Source.Competence:Destination
              const key = competenceKey(pageSource, comp.bouton.action);
              // Si l'élément est exclu ("null"), ne pas l'ajouter au plan de test
              if (isExcluded(key, mapping)) continue;
              const e2eId = getE2eId(key, mapping);
            liens.push({
              source: pageSource,
              destination: comp.bouton.action,
              label: comp.bouton.texte,
              e2eID: e2eId ?? undefined,
              typeElement: 'Competence',
            });
            }
          }
        }
      }
      
      // Si c'est un domaine inline avec items
      if (domaine.items) {
        for (const item of domaine.items) {
          const action = item.bouton?.action;
          if (action && estLienInterne(action) && action !== '/faisons-connaissance' && action !== pageSource) {
            // Résoudre l'e2eID depuis le mapping via la clé Source.Competence:Destination
            const key = competenceKey(pageSource, action);
            // Si l'élément est exclu ("null"), ne pas l'ajouter au plan de test
            if (isExcluded(key, mapping)) continue;
            const e2eId = getE2eId(key, mapping);
            liens.push({
              source: pageSource,
              destination: action,
              label: item.bouton?.texte,
              e2eID: e2eId ?? undefined,
              typeElement: 'Competence',
            });
          }
        }
      }
    }
    
    // Type listeDeProfils
    if (element.type === 'listeDeProfils' && (element as { profils?: Array<{ route?: string; titre?: string; slug?: string }> }).profils) {
      const profils = (element as { profils: Array<{ route?: string; titre?: string; slug?: string }> }).profils;
      for (const p of profils) {
        if (p.route && estLienInterne(p.route) && p.route !== pageSource) {
          // Le composant ProfilContainer utilise "En savoir plus…" comme texte du lien
          // Résoudre l'e2eID depuis le mapping
          const key = profilKey(pageSource, p.route);
          const e2eId = getE2eId(key, mapping);
          liens.push({
            source: pageSource,
            destination: p.route,
            label: 'En savoir plus…',
            typeElement: 'Profil',
            e2eID: e2eId ?? undefined,
          });
        }
      }
    }
    
    // Type callToAction standalone
    if (element.type === 'callToAction') {
      const cta = element as { action?: string; texte?: string };
      // Les callToAction avec texte "On discute ?" ou similaire pointent vers /faisons-connaissance, on les ignore
      if (cta.action && estLienInterne(cta.action) && cta.action !== '/faisons-connaissance' && cta.action !== pageSource) {
        // L'e2eID pour les callToAction serait basé sur l'action
        const ctaKey = `callToAction:${pageSource}:${cta.action}`;
        const e2eId = getE2eId(ctaKey, mapping);
        liens.push({
          source: pageSource,
          destination: cta.action,
          label: cta.texte || 'Action',
          e2eID: e2eId ?? undefined,
          typeElement: 'CallToAction',
        });
      }
    }
    
    // Type listeDesPages : génère des liens vers toutes les pages listées
    // Le composant ListeDesPages crée des liens avec e2eID généré par generateE2eIdFromUrl
    if (element.type === 'listeDesPages') {
      const listeDesPages = element as { pages?: Array<{ url: string; titre: string; zone?: string; dessiner?: string }> };
      if (listeDesPages.pages) {
        for (const page of listeDesPages.pages) {
          // Exclure les pages masquées et la page source elle-même
          if (page.zone === 'Masqué' || page.dessiner === 'Non' || page.url === pageSource) {
            continue;
          }
          if (estLienInterne(page.url)) {
            // Résoudre l'e2eID depuis le mapping
            const key = lienPageKey(pageSource, page.url);
            const e2eId = getE2eId(key, mapping);
            liens.push({
              source: pageSource,
              destination: page.url,
              label: page.titre,
              typeElement: 'LienPage',
              e2eID: e2eId ?? undefined,
            });
          }
        }
      }
    }
  }
  return liens;
}

/**
 * Dérive les liens du plan depuis l'inventaire e2eID.
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
 * Détecte automatiquement tous les liens internes entre pages.
 */
export const detecterLiensInternes = (): PlanLien[] => {
  const liens: PlanLien[] = [];
  const dataDir = path.join(process.cwd(), 'data');

  // Note: getLiensFromE2eIdInventory() n'est plus utilisé ici car les liens
  // sont maintenant extraits directement depuis le contenu des pages avec les types métier.
  // Les liens footer sont gérés par la lecture de _footerButtons.json ci-dessous.
  
  const estLienInterne = (url: string | null | undefined): boolean => {
    if (!url) return false;
    return url.startsWith('/') && !url.startsWith('//') && !url.match(/^https?:\/\//);
  };

  // Charger la bibliothèque et le mapping e2eID une seule fois pour toutes les pages
  const bibliotheque = loadBibliotheque();
  const e2eMapping = loadMapping();

  const fichiersJSON = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json') && !f.startsWith('_'));

  for (const fichierJSON of fichiersJSON) {
    try {
      const pageData = readPageData(fichierJSON);
      const pageSource = fichierJsonVersPageSource(fichierJSON);
      
      // Exclure l'extraction du contenu de /a-propos (on teste juste entrer/sortir)
      if (pageSource === '/a-propos') {
        continue;
      }
      
      for (const l of extractLinksFromContenu(pageData.contenu, pageSource, estLienInterne, bibliotheque, e2eMapping)) {
        liens.push(l);
      }
    } catch {
      continue;
    }
  }

  liens.push({ source: '/', destination: '/mes-profils', label: 'Mes Profils', typeElement: 'Hero.EnSavoirPlus' });

  try {
    const footerButtonsPath = path.join(dataDir, '_footerButtons.json');
    if (fs.existsSync(footerButtonsPath)) {
      const footerButtons = JSON.parse(fs.readFileSync(footerButtonsPath, 'utf8'));
      
      if (footerButtons.type === 'groupeDeBoutons' && footerButtons.boutons) {
        for (const button of footerButtons.boutons) {
          if (button.command) {
            const route = getRouteForCommand(button.command);
            if (route && route !== '/faisons-connaissance') {
              const key = footerKey(route);
              const e2eId = getE2eId(key, e2eMapping);
              liens.push({ source: '*', destination: route, label: button.texte || button.icone, typeElement: 'Footer.Bouton', e2eID: e2eId ?? undefined });
            }
          }
        }
      }
    }
  } catch (e) {
    // Ignorer les erreurs
  }

  const liensResolus: PlanLien[] = [];
  const pages = detecterPages();

  for (const lien of liens) {
    if (lien.source === '*') {
      // Les liens avec source '*' sont des éléments globaux (footer, header)
      // On les duplique pour chaque page pour que tous les liens soient présents
      // Mais ils auront le même e2eID dans le mapping (géré par generate-e2e-mapping.ts)
      for (const page of pages) {
        // Résoudre l'e2eID depuis le mapping avec la clé complète Source.TypeMétier:Destination
        const key = `${page.url}.${lien.typeElement}:${lien.destination}`;
        const e2eId = getE2eId(key, e2eMapping) ?? lien.e2eID;
        liensResolus.push({ 
          source: page.url, 
          destination: lien.destination, 
          label: lien.label,
          typeElement: lien.typeElement,
          e2eID: e2eId ?? undefined,
        });
      }
    } else {
      liensResolus.push(lien);
    }
  }

  // Header.Logo : élément global, dupliqué pour chaque page (sauf la homepage)
  for (const page of pages) {
    if (page.url !== '/') {
      // Résoudre l'e2eID depuis le mapping avec la clé complète
      const key = `${page.url}.Header.Logo:/`;
      const logoE2eId = getE2eId(key, e2eMapping) ?? 'h1';
      liensResolus.push({ 
        source: page.url, 
        destination: '/', 
        label: 'Logo', 
        e2eID: logoE2eId, 
        typeElement: 'Header.Logo' 
      });
    }
  }

  const liensFiltres = liensResolus.filter((lien) => lien.destination !== '/faisons-connaissance');
  
  // Ajouter le lien principal vers "Faisons connaissance" avec e2eID depuis le mapping
  const ctaKey = heroCallToActionKey('/', '/faisons-connaissance');
  const ctaE2eId = getE2eId(ctaKey, e2eMapping);
  liensFiltres.push({ source: '/', destination: '/faisons-connaissance', label: 'Discutons', typeElement: 'Hero.CallToAction', e2eID: ctaE2eId ?? undefined });

  const liensSansAuto = liensFiltres.filter((lien) => lien.source !== lien.destination);

  // Filtrer les liens dont la source ou destination n'est pas une page existante,
  // ou dont la source ou destination est une page masquée (dessiner = Non).
  // Exception : /plan-du-site reste masquée pour l'affichage mais sert de hub de navigation E2E.
  // Ex. /temoignage-linkedin = lien externe hérité, /pour-aller-plus-loin = page masquée
  const urlsExistantes = new Set(pages.map((p) => p.url));
  const PLAN_DU_SITE = '/plan-du-site';
  const urlsPagesMasquees = new Set(
    pages.filter((p) => p.dessiner === 'Non' && p.url !== PLAN_DU_SITE).map((p) => p.url)
  );
  const liensVersPageExistante = liensSansAuto.filter(
    (lien) =>
      urlsExistantes.has(lien.destination) &&
      !urlsPagesMasquees.has(lien.destination) &&
      !urlsPagesMasquees.has(lien.source)
  );

  const liensUniques: PlanLien[] = [];
  const liensVus = new Set<string>();
  
  for (const lien of liensVersPageExistante) {
    const cle = `${lien.source}->${lien.destination}`;
    if (!liensVus.has(cle)) {
      liensVus.add(cle);
      liensUniques.push(lien);
    }
  }

  return liensUniques;
};

/**
 * Met à jour le plan JSON avec les pages et liens détectés.
 */
export const mettreAJourPlanJSON = (
  pages: PlanPage[],
  liens: PlanLien[],
  options?: { siteMapPath?: string }
): void => {
  const siteMapPath = options?.siteMapPath ?? path.join(process.cwd(), 'data', '_Pages-Liens-Et-Menus.json');
  
  let planExistant: PlanSite = { pages: [], liens: [] };
  
  if (fs.existsSync(siteMapPath)) {
    try {
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      planExistant = JSON.parse(contenu);
    } catch (e) {
      planExistant = { pages: [], liens: [] };
    }
  }

  const pagesMisesAJour: PlanPage[] = [];
  
  for (const pageDetectee of pages) {
    const pageExistante = planExistant.pages.find((p) => p.url === pageDetectee.url);
    
    if (pageExistante) {
      const dessiner = pageExistante.dessiner || pageDetectee.dessiner || 'Oui';
      const zone = pageDetectee.url === '/faisons-connaissance' 
        ? 'Footer' 
        : (pageExistante.zone || pageDetectee.zone);
      pagesMisesAJour.push({
        url: pageExistante.url,
        titre: pageDetectee.titre,
        x: pageExistante.x,
        y: pageExistante.y,
        numero: pageExistante.numero,
        dessiner,
        e2eIDs: pageExistante.e2eIDs,
        zone,
      });
    } else {
      const dessiner = pageDetectee.dessiner || 'Oui';
      pagesMisesAJour.push({
        url: pageDetectee.url,
        titre: pageDetectee.titre,
        x: null,
        y: null,
        zone: pageDetectee.zone,
        dessiner,
      });
    }
  }

  const liensMisesAJour: PlanLien[] = [];
  
  for (const lienDetecte of liens) {
    // Les liens globaux (source = '*') sont toujours valides
    const sourceExiste = lienDetecte.source === '*' || pagesMisesAJour.some((p) => p.url === lienDetecte.source);
    const destinationExiste = pagesMisesAJour.some((p) => p.url === lienDetecte.destination);
    
    if (sourceExiste && destinationExiste) {
      const lienExistant = planExistant.liens.find(
        (l) => l.source === lienDetecte.source && l.destination === lienDetecte.destination
      );
      
      if (lienExistant) {
        // Fusionner : conserver les propriétés existantes (sourceSide, destinationSide)
        // mais utiliser le nouveau e2eID, label et typeElement
        liensMisesAJour.push({
          ...lienExistant,
          label: lienDetecte.label ?? lienExistant.label,
          e2eID: lienDetecte.e2eID ?? lienExistant.e2eID,
          typeElement: lienDetecte.typeElement ?? lienExistant.typeElement,
        });
      } else {
        liensMisesAJour.push(lienDetecte);
      }
    }
  }

  pagesMisesAJour.sort((a, b) => {
    const zoneDiff = indexZonePourTri(a.zone) - indexZonePourTri(b.zone);
    if (zoneDiff !== 0) return zoneDiff;
    const ordreA = a.ordre ?? Infinity;
    const ordreB = b.ordre ?? Infinity;
    return ordreA - ordreB;
  });

  const nouveauPlan: PlanSite = { pages: pagesMisesAJour, liens: liensMisesAJour };

  const dataDir = path.dirname(siteMapPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(siteMapPath, JSON.stringify(nouveauPlan, null, 2));
};

/**
 * Injecte la liste des pages dans plan-du-site.json.
 */
export const injecterPagesDansPlanDuSiteJson = (
  pages: PlanPage[],
  options?: { planDuSitePath?: string }
): void => {
  const planDuSitePath =
    options?.planDuSitePath ?? path.join(process.cwd(), 'data', 'plan-du-site.json');
  const pagesFiltrees = pages.filter(
    (p) => (p as PlanPage & { zone?: string }).zone !== 'Masqué' && p.dessiner !== 'Non'
  );
  const mapping = loadMapping();
  const sourcePlan = '/plan-du-site';
  const pagesPourJson = pagesFiltrees.map((p) => {
    const e2eID = getE2eId(lienPageKey(sourcePlan, p.url), mapping);
    return {
      url: p.url,
      titre: p.titre,
      zone: (p as PlanPage & { zone?: string }).zone,
      dessiner: p.dessiner,
      ...(e2eID && { e2eID }),
    };
  });

  let contenu: unknown;
  if (fs.existsSync(planDuSitePath)) {
    const raw = fs.readFileSync(planDuSitePath, 'utf8');
    contenu = JSON.parse(raw);
  } else {
    return;
  }

  const root = contenu as { contenu?: Array<{ type?: string; pages?: unknown }> };
  if (!Array.isArray(root.contenu)) return;
  const listeDesPagesEl = root.contenu.find((el) => el.type === 'listeDesPages');
  if (!listeDesPagesEl) return;
  (listeDesPagesEl as { type: string; pages: typeof pagesPourJson }).pages = pagesPourJson;
  fs.writeFileSync(planDuSitePath, JSON.stringify(contenu, null, 2));
};

/**
 * Valide que toutes les pages ont un emplacement défini.
 */
export const validerEmplacements = (plan: PlanSite): void => {
  const pagesSansEmplacement = plan.pages.filter((p) => p.x === null || p.y === null);
  
  if (pagesSansEmplacement.length > 0) {
    const urlsSansEmplacement = pagesSansEmplacement.map((p) => p.url).join(', ');
    throw new Error(
      `Les pages suivantes n'ont pas d'emplacement défini (x, y) : ${urlsSansEmplacement}. ` +
      'Veuillez remplir manuellement les coordonnées dans le fichier _Pages-Liens-Et-Menus.json.'
    );
  }
};
