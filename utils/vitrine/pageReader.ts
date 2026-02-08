/**
 * Backend pur : Lecture du fichier JSON index.json
 * Cette logique est réutilisable et testable en ligne de commande
 */

import fs from 'fs';
import path from 'path';
import { loadMapping, getE2eId, profilKey, heroCallToActionKey, heroEnSavoirPlusKey, competenceKey } from '../shared/e2eIdMapping';

// Import différé pour éviter les dépendances circulaires
// bibliothequeReader et profilBuilder importent des types depuis ce fichier
// On utilise require() pour charger ces modules au runtime

/**
 * Types d'éléments de contenu de page (ordre aligné avec les interfaces ci-dessous)
 */
export type TypeElementContenu = 'titre' | 'titreDePage' | 'video' | 'texteLarge' | 'domaineDeCompetence' | 'competence' | 'experienceEtApprentissage' | 'listeDesExperiencesEtApprentissage' | 'callToAction' | 'groupeDeBoutons' | 'bouton' | 'listeDesPages' | 'listeDeDetournementsVideo' | 'detournementVideo' | 'listeDeTemoignages' | 'temoignage' | 'hero' | 'profil' | 'listeDeProfils';

/** titre */
export interface ElementTitre {
  type: 'titre';
  texte: string;
}

/** titreDePage */
export interface ElementTitreDePage {
  type: 'titreDePage';
  texte: string;
}

/** video */
export interface ElementVideo {
  type: 'video';
  urlYouTube: string;
  lancementAuto: boolean;
}

/** texteLarge */
export interface ElementTexteLarge {
  type: 'texteLarge';
  texte: string;
}

/** competence (item dans domaineDeCompetence.items) */
export interface ElementCompetence {
  type: 'competence';
  titre: string;
  image?: {
    src: string;
    alt: string;
  };
  icon?: string; // Nom de l'icône lucide-react (ex: "Rocket", "Globe")
  description: string;
  auteur?: string; // Auteur optionnel de la citation
  bouton: {
    texte: string;
    action: string;
    e2eID?: string | null;
  } | null;
}

/** experienceEtApprentissage (item dans domaineDeCompetence.experiences ; même relation que competence pour domaineDeCompetence) */
export interface ExperienceEtApprentissage {
  type: 'experienceEtApprentissage';
  id: string;
  /** Libellé métier (ex. "Expériences et apprentissages"), issu du JSON "type" */
  categorie?: string;
  description: string;
  periode: string | null;
}

/** Liste d'expériences et apprentissages (type pour domaineDeCompetence.experiences) */
export type ListeDeExperiencesEtApprentissages = ExperienceEtApprentissage[];

/** listeDesExperiencesEtApprentissage (conteneur logique pour domaineDeCompetence.experiences ; utilisé en mode lecture) */
export interface ElementListeDesExperiencesEtApprentissage {
  type: 'listeDesExperiencesEtApprentissage';
  experiences: ExperienceEtApprentissage[];
}

/** domaineDeCompetence */
export interface ElementDomaineDeCompetence {
  type: 'domaineDeCompetence';
  titre: string;
  contenu: string;
  auteur?: string; // Auteur optionnel de la citation/contenu
  items: ElementCompetence[];
  /** Expériences et apprentissages associés au domaine */
  experiences?: ListeDeExperiencesEtApprentissages;
}

/** callToAction */
export interface ElementCallToAction {
  type: 'callToAction';
  action: string; // Texte du bouton
  e2eID?: string | null; // e2eID optionnel depuis le JSON
}

/** bouton (item dans groupeDeBoutons.boutons) */
export interface ElementBoutonDeGroupe {
  type: 'bouton';
  id: string;
  icone: string; // Nom de l'icône lucide-react (ex: "Mail", "Youtube")
  texte: string | null; // Texte optionnel (null pour taille "petite")
  url: string | null;
  command: string | null; // Commande optionnelle pour navigation interne
  e2eID?: string | null; // e2eID optionnel depuis le JSON (ex: "b4", "b5")
}

/** groupeDeBoutons */
export interface ElementGroupeDeBoutons {
  type: 'groupeDeBoutons';
  taille: 'petite' | 'grande';
  boutons: ElementBoutonDeGroupe[];
}

/** Élément page dans la liste (plan-du-site.json), rempli par le script update-site-map. */
export interface PagePlanDuSite {
  url: string;
  titre: string;
  zone?: string;
  dessiner?: string;
}

/** listeDesPages — les pages viennent du JSON (plan-du-site.json), rempli par le script update-site-map. */
export interface ElementListeDesPages {
  type: 'listeDesPages';
  /** Liste des pages à afficher (injectée par le script qui met à jour le plan du site). */
  pages?: PagePlanDuSite[];
}

/** detournementVideo (item dans listeDeDetournementsVideo.items ; contient videoDetournee + videoOriginale) */
export interface ElementDetournementVideo {
  type: 'detournementVideo';
  /** Titre du client / pour le compte de (affiché en tête de chaque détournement) */
  titre: string;
  id?: number;
  titreVideoDetournee: string;
  videoDetournee: string; // ID ou URL YouTube
  titreVideoOriginale: string;
  videoOriginale: string; // ID ou URL YouTube
  date: string; // ex: "30/3/2023"
  pitch?: string;
  droitsAuteur?: string;
  linkedin?: string;
}

/** listeDeDetournementsVideo */
export interface ElementListeDeDetournementsVideo {
  type: 'listeDeDetournementsVideo';
  items: ElementDetournementVideo[];
}

/** temoignage (item dans listeDeTemoignages.items) */
export interface ElementTemoignage {
  type: 'temoignage';
  nom: string;
  fonction: string;
  photo: string;
  temoignage: string;
}

/** listeDeTemoignages */
export interface ElementListeDeTemoignages {
  type: 'listeDeTemoignages';
  items: ElementTemoignage[];
}

/** profil (item dans hero.profils ou listeDeProfils.profils) */
export interface ElementProfil {
  type: 'profil';
  titre: string;
  jobTitles: string[];
  slug: string;
  route: string;
  cvPath: string;
  /** e2eID fourni par le mapping (injecté côté serveur pour listeDeProfils) */
  e2eID?: string;
}

/** Vidéo embarquée (propriété de hero ou bloc standalone). */
export interface HeroVideoData {
  urlYouTube: string;
  lancementAuto?: boolean;
  e2eID?: string;
}

/** hero */
export interface ElementHero {
  type: 'hero';
  titre: string;
  sousTitre: string;
  description: string;
  callToAction: {
    texte: string;
    action: string;
    /** e2eID du mapping (ex. a10 pour Discutons → /faisons-connaissance). */
    e2eID?: string;
  };
  /** Vidéo affichée à droite (hero.droite) ; nom canonique hero.video. */
  video?: HeroVideoData;
  /** URL interne vers la page "Mes profils" (ex. lien "Télécharger mon CV"). */
  ensavoirplus: string;
  /** e2eID du mapping pour le lien "Télécharger mon CV" (ex. l1 pour → /mes-profils). */
  ensavoirplusE2eID?: string;
}

/** listeDeProfils */
export interface ElementListeDeProfils {
  type: 'listeDeProfils';
  profils: ElementProfil[];
}

/**
 * Union type pour tous les éléments de contenu
 */
export type ElementContenu = 
  | ElementTitre 
  | ElementTitreDePage
  | ElementVideo 
  | ElementTexteLarge 
  | ElementDomaineDeCompetence
  | ElementListeDesExperiencesEtApprentissage
  | ElementCallToAction
  | ElementGroupeDeBoutons
  | ElementListeDesPages
  | ElementListeDeDetournementsVideo
  | ElementListeDeTemoignages
  | ElementHero
  | ElementListeDeProfils
  | ElementProfil;

/**
 * Interface pour la structure "contenu de page"
 */
export interface ContenuPage {
  contenu: ElementContenu[];
}

/**
 * Structure complète du fichier index.json (ancienne structure pour compatibilité).
 * Les domaines n'ont pas le champ discriminant "type" dans le JSON.
 */
export interface IndexData {
  domainesDeCompetences: Omit<ElementDomaineDeCompetence, 'type'>[];
}

/**
 * Metadata SEO pour une page (stockées dans les JSON)
 */
export interface PageMetadata {
  title: string;
  description: string;
  ogType?: 'website' | 'profile' | 'article';
  ogImage?: string;
  keywords?: string[];
}

/**
 * Interface pour la nouvelle structure "contenu de page"
 */
export interface PageData {
  metadata?: PageMetadata;
  contenu: ElementContenu[];
}

/**
 * Types pour les données JSON brutes (avant normalisation).
 * Utilisés pour typer les données lues depuis les fichiers JSON qui peuvent
 * avoir des structures variées (anciennes vs nouvelles).
 */

/** Élément JSON brut avec propriétés optionnelles pour normalisation */
interface RawJsonElement {
  type?: string;
  // Propriétés pour domaineDeCompetence
  competences?: RawJsonCompetence[];
  items?: RawJsonCompetence[];
  experiences?: RawJsonExperience[];
  ref?: string;
  // Propriétés pour détournements
  detournementVideo?: RawJsonDetournement[];
  // Propriétés pour source externe
  source?: string;
  // Autres propriétés passées telles quelles
  [key: string]: unknown;
}

/** Compétence JSON brute (peut ne pas avoir de type) */
interface RawJsonCompetence {
  type?: string;
  titre?: string;
  description?: string;
  [key: string]: unknown;
}

/** Expérience JSON brute */
interface RawJsonExperience {
  type?: string;
  id?: string;
  categorie?: string;
  description?: string;
  periode?: string | null;
  [key: string]: unknown;
}

/** Détournement vidéo JSON brut */
interface RawJsonDetournement {
  type?: string;
  titre?: string;
  [key: string]: unknown;
}

/** Témoignage JSON brut */
interface RawJsonTemoignage {
  type?: string;
  nom?: string;
  [key: string]: unknown;
}

/** Données de page JSON brutes */
interface RawPageData {
  metadata?: PageMetadata;
  contenu?: RawJsonElement[];
  domainesDeCompetences?: unknown[];
}

/** Données source JSON brutes */
interface RawSourceData {
  contenu?: Array<{
    type?: string;
    items?: RawJsonTemoignage[] | RawJsonDetournement[];
  }>;
}

/**
 * Convertit l'ancienne structure (IndexData) en nouvelle structure (PageData) pour compatibilité ascendante
 */
export const convertirIndexDataEnPageData = (indexData: IndexData): PageData => {
  const contenu: ElementContenu[] = indexData.domainesDeCompetences.map((domaine): ElementDomaineDeCompetence => ({
    type: 'domaineDeCompetence',
    titre: domaine.titre,
    contenu: domaine.contenu,
    auteur: domaine.auteur,
    items: domaine.items,
    experiences: domaine.experiences,
  }));

  return { contenu };
};

/**
 * Lit le fichier index.json et retourne les données (ancienne structure pour compatibilité)
 */
export const readIndexData = (): IndexData => {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Le fichier index.json n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(indexPath, 'utf8');
  const data: IndexData = JSON.parse(fileContent);

  return data;
};

/**
 * Lit le fichier JSON et retourne les données en structure "contenu de page"
 * Supporte à la fois l'ancienne structure (domainesDeCompetences) et la nouvelle (contenu)
 */
export const readPageData = (filename: string = 'index.json'): PageData => {
  const filePath = path.join(process.cwd(), 'data', filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier ${filename} n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data: RawPageData = JSON.parse(fileContent);

  // Si c'est l'ancienne structure (domainesDeCompetences), on la convertit
  if ('domainesDeCompetences' in data && !('contenu' in data)) {
    return convertirIndexDataEnPageData(data as unknown as IndexData);
  }

  // Normaliser la nouvelle structure : convertir "competences" en "items" pour les domaines de compétences
  const pageData: PageData = {
    metadata: data.metadata,
    contenu: (data.contenu || []) as ElementContenu[],
  };
  
  if (pageData.contenu && Array.isArray(pageData.contenu)) {
    pageData.contenu = pageData.contenu.map((element) => {
      const rawElement = element as unknown as RawJsonElement;
      
      // Portfolio détournements : élément avec clé "detournementVideo" (tableau) sans type → listeDeDetournementsVideo
      if (rawElement.detournementVideo && Array.isArray(rawElement.detournementVideo) && rawElement.type !== 'listeDeDetournementsVideo') {
        const items = rawElement.detournementVideo.map((d: RawJsonDetournement) =>
          d.type != null ? d : { type: 'detournementVideo' as const, ...d }
        );
        return { type: 'listeDeDetournementsVideo' as const, items } as unknown as ElementListeDeDetournementsVideo;
      }
      
      if (element.type === 'domaineDeCompetence') {
        // Si l'élément a "competences" au lieu de "items", le mapper
        if (rawElement.competences && !rawElement.items && !rawElement.ref) {
          const items = rawElement.competences.map((c: RawJsonCompetence) =>
            c.type != null ? c : { type: 'competence', ...c }
          );
          return {
            ...element,
            items,
          } as unknown as ElementDomaineDeCompetence;
        }
        // Si items existe sans type sur les compétences, normaliser
        if (rawElement.items && Array.isArray(rawElement.items)) {
          const items = rawElement.items.map((c: RawJsonCompetence) =>
            c.type != null ? c : { type: 'competence', ...c }
          );
          const out: Partial<ElementDomaineDeCompetence> = { ...element, items: items as unknown as ElementCompetence[] };
          // Normaliser experiences (discriminant experienceEtApprentissage) si présentes
          if (rawElement.experiences && Array.isArray(rawElement.experiences)) {
            out.experiences = rawElement.experiences.map((e: RawJsonExperience) =>
              e.type === 'experienceEtApprentissage' ? e as ExperienceEtApprentissage : { type: 'experienceEtApprentissage', id: e.id ?? '', categorie: e.categorie ?? e.type, description: e.description ?? '', periode: e.periode ?? null }
            );
          }
          return out as ElementDomaineDeCompetence;
        }
      }
      
      // Si l'élément a une propriété "source" (ex: temoignages), charger le fichier externe
      if (rawElement.source && typeof rawElement.source === 'string') {
        const sourceFile = rawElement.source;
        const sourcePath = path.join(process.cwd(), 'data', sourceFile);
        
        if (fs.existsSync(sourcePath)) {
          const sourceContent = fs.readFileSync(sourcePath, 'utf8');
          const sourceData: RawSourceData = JSON.parse(sourceContent);
          
          // Si le fichier source contient un élément du même type, utiliser ses items
          if (sourceData.contenu && Array.isArray(sourceData.contenu)) {
            const sourceElement = sourceData.contenu.find((el) => el.type === element.type);
            if (sourceElement && sourceElement.items) {
              // Pour listeDeTemoignages / listeDeDetournementsVideo, ajouter le discriminant type si absent (JSON source sans type)
              const items =
                element.type === 'listeDeTemoignages'
                  ? sourceElement.items.map((item: RawJsonTemoignage) => (item.type != null ? item : { type: 'temoignage', ...item }))
                  : element.type === 'listeDeDetournementsVideo'
                    ? sourceElement.items.map((item: RawJsonDetournement) => (item.type != null ? item : { type: 'detournementVideo', ...item }))
                    : sourceElement.items;
              return {
                ...element,
                items,
              };
            }
          }
        }
      }
      
      return element;
    }) as ElementContenu[];
  }

  // Enrichir le hero de la page d'accueil avec les e2eID du mapping (l1, a10)
  if (filename === 'index.json' && pageData.contenu) {
    const mapping = loadMapping();
    pageData.contenu = pageData.contenu.map((el) => {
      if (el.type !== 'hero') return el;
      const ctaE2e = getE2eId(heroCallToActionKey('/', el.callToAction.action), mapping);
      const enPlusE2e = getE2eId(heroEnSavoirPlusKey('/', el.ensavoirplus), mapping);
      return {
        ...el,
        callToAction: { ...el.callToAction, ...(ctaE2e && { e2eID: ctaE2e }) },
        ...(enPlusE2e && { ensavoirplusE2eID: enPlusE2e }),
      };
    }) as ElementContenu[];
  }

  // Détecter si la page contient des références vers la bibliothèque
  const hasReferences = pageData.contenu && pageData.contenu.some((element) => {
    if (element.type === 'domaineDeCompetence') {
      const rawElement = element as unknown as RawJsonElement;
      return 'ref' in rawElement && typeof rawElement.ref === 'string';
    }
    return false;
  });

  // Si la page contient des références, les résoudre
  if (hasReferences) {
    try {
      // Import dynamique pour éviter les dépendances circulaires
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- résolution dynamique pour éviter cycles
      const { readCompetences, readDomaines, readAutres } = require('./bibliothequeReader');
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- résolution dynamique pour éviter cycles
      const { resolvePageReferences } = require('./profilBuilder');
      
      const competences = readCompetences();
      const domaines = readDomaines();
      const autres = readAutres();
      const resolved = resolvePageReferences(pageData, competences, domaines, autres);
      // Vérifier que les références ont bien été résolues
      const stillHasRefs = resolved.contenu.some((element: ElementContenu) => {
        if (element.type === 'domaineDeCompetence') {
          const rawElement = element as unknown as RawJsonElement;
          return 'ref' in rawElement && typeof rawElement.ref === 'string';
        }
        return false;
      });
      if (stillHasRefs) {
        console.error(`Des références n'ont pas été résolues pour ${filename}`);
      }
      // Enrichir les boutons des domaines avec les e2eID depuis _Pages-Liens-Et-Menus (liens)
      const slugMatch = filename.match(/^profil-(.+)\.json$/);
      if (slugMatch) {
        const slug = slugMatch[1];
        const sourcePath = `/profil/${slug}`;
        const planPath = path.join(process.cwd(), 'data', '_Pages-Liens-Et-Menus.json');
        if (fs.existsSync(planPath)) {
          const planData = JSON.parse(fs.readFileSync(planPath, 'utf-8')) as { liens?: Array<{ source: string; destination: string; e2eID?: string }> };
          const liens = planData.liens || [];
          const lienByDest = new Map<string, string>();
          for (const lien of liens) {
            if (lien.source === sourcePath && lien.e2eID) {
              lienByDest.set(lien.destination, lien.e2eID);
            }
          }
          for (const element of resolved.contenu) {
            if (element.type === 'domaineDeCompetence' && element.items) {
              for (const item of element.items) {
                if (item.bouton && item.bouton.action) {
                  const e2eID = lienByDest.get(item.bouton.action);
                  if (e2eID) {
                    item.bouton.e2eID = e2eID;
                  }
                }
              }
            }
          }
        }
      }
      enrichDomainesE2eIdsFromMapping(resolved, filename);
      return resolved;
    } catch (error) {
      // Si la bibliothèque n'existe pas encore, continuer sans résolution (compatibilité ascendante)
      console.error(`Impossible de résoudre les références pour ${filename}:`, error);
      // Ne pas retourner pageData avec des refs non résolues, cela rendrait la page vide
      throw error;
    }
  }

  enrichDomainesE2eIdsFromMapping(pageData, filename);
  return pageData;
};

function sourcePathFromFilename(filename: string): string {
  if (filename === 'index.json') return '/';
  const base = filename.replace(/\.json$/, '');
  if (base.startsWith('profil-')) return `/profil/${base.slice(7)}`;
  return `/${base}`;
}

function enrichDomainesE2eIdsFromMapping(pageData: PageData, filename: string): void {
  const sourcePath = sourcePathFromFilename(filename);
  const mapping = loadMapping();
  if (!pageData.contenu) return;
  for (const element of pageData.contenu) {
    if (element.type === 'domaineDeCompetence' && element.items) {
      for (const item of element.items) {
        if (item.bouton?.action) {
          const e2eID = getE2eId(competenceKey(sourcePath, item.bouton.action), mapping);
          if (e2eID) item.bouton.e2eID = e2eID;
        }
      }
    }
  }
}

/**
 * Enrichit les profils des blocs listeDeProfils avec les e2eID du mapping (source page → Profil:destination).
 * À appeler côté serveur pour la page Mes profils afin que les liens "En savoir plus" aient les e2eID attendus par les specs E2E.
 */
export const enrichListeDeProfilsE2eIds = (
  contenu: ElementContenu[],
  sourcePath: string
): ElementContenu[] => {
  const mapping = loadMapping();
  return contenu.map((element) => {
    if (element.type !== 'listeDeProfils') return element;
    return {
      ...element,
      profils: element.profils.map((p) => {
        const e2eID = getE2eId(profilKey(sourcePath, p.route), mapping);
        return { ...p, ...(e2eID && { e2eID }) };
      }),
    };
  });
};

/**
 * Lit un fichier JSON de domaine de compétences et retourne les données
 * @param filename Nom du fichier JSON (ex: "transformation.json")
 */
export const readDomaineData = (filename: string): IndexData => {
  const filePath = path.join(process.cwd(), 'data', filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier ${filename} n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data: IndexData = JSON.parse(fileContent);

  return data;
};

/**
 * Retourne les données de la page Mes Profils (US-7.12).
 * Source unique : data/mes-profils.json (profils + CTA Discutons + texteLarge).
 * Les profils sont enrichis avec les e2eID du mapping (p9, p10, p11, p12) pour les tests E2E.
 */
export const buildMesProfilsPageData = (): PageData => {
  const pageData = readPageData('mes-profils.json');
  if (pageData.contenu) {
    pageData.contenu = enrichListeDeProfilsE2eIds(pageData.contenu, '/mes-profils');
  }
  return pageData;
};
