/**
 * Barrel export CLIENT-SAFE
 * 
 * Ce fichier n'exporte que les modules qui n'utilisent PAS 'fs' ou d'autres
 * APIs Node.js uniquement. Utilisable dans les Client Components React.
 * 
 * Pour les Server Components ou scripts Node.js, importer depuis :
 * - './index' (barrel complet)
 * - './vitrine', './projet', './backoffice', './shared' (sous-barrels spécifiques)
 */

// === VITRINE (client-safe) ===
// Button handlers
export {
  getRouteForCommand,
  isInternalNavigation,
  getButtonAction,
} from './vitrine/buttonHandlers';
export type { ButtonAction } from './vitrine/buttonHandlers';

// Image paths
export {
  getJsonImagePath,
  getMdImagePath,
  getStaticImagePath,
} from './vitrine/imagePath';

// Types uniquement (pas d'import runtime)
export type {
  TypeElementContenu,
  ElementTitre,
  ElementTitreDePage,
  ElementVideo,
  ElementTexteLarge,
  ElementCompetence,
  ExperienceEtApprentissage,
  ListeDeExperiencesEtApprentissages,
  ElementListeDesExperiencesEtApprentissage,
  ElementDomaineDeCompetence,
  ElementCallToAction,
  ElementBoutonDeGroupe,
  ElementGroupeDeBoutons,
  PagePlanDuSite,
  ElementListeDesPages,
  ElementDetournementVideo,
  ElementListeDeDetournementsVideo,
  ElementTemoignage,
  ElementListeDeTemoignages,
  ElementProfil,
  HeroVideoData,
  ElementHero,
  ElementListeDeProfils,
  ElementContenu,
  ContenuPage,
  IndexData,
  PageMetadata,
  PageData,
} from './vitrine/pageReader';

// === SHARED (client-safe) ===
// Environment
export { isProduction, isDevelopment } from './shared/environment';

// E2E ID utilities (sans fs)
export { isInReservedRange, generateE2eIdFromUrl } from './shared/e2eIdFromUrl';

// Types du plan du site
export type { PlanPage, PlanLien, PlanSite } from './shared/planDuSiteTypes';

// Assistant scenario (sans fs depuis la correction)
export {
  getPagesExclues,
  getLiensAParcourirInitial,
  getPagesAccessiblesDepuis,
  retirerLienUtilise,
  pageAccueil,
} from './shared/assistantScenario';

// Markdown utilities (client-safe)
export { parseInlineMarkdown } from './shared/markdown/markdownInlineParser';
export { adjustMarkdownTitleLevels } from './shared/markdown/markdownTitleAdjuster';
export { parseMarkdownDOD } from './shared/markdown/markdownParser';
export type { ParsedDOD } from './shared/markdown/markdownParser';

// === TYPES depuis modules serveur (copiés pour éviter import de 'fs') ===

/**
 * Ligne de menu (copié depuis vitrine/menuReader.ts pour éviter import de 'fs')
 */
export interface LigneDeMenu {
  Titre: string;
  Numéro: number;
  Type: 'Path' | 'container';
  Parametre: string;
  e2eID?: string | null;
}

// === TYPES du domaine Projet (copiés depuis aboutSiteReader.ts) ===

export interface ContenuElement {
  type: 'paragraph' | 'ul' | 'ol' | 'image' | 'code';
  content?: string;
  items?: string[];
  imageFilename?: string;
  imageUrl?: string;
  typeDeContenu?: string;
  language?: string;
  niveauListe?: number;
}

export interface Bloc {
  titre: string;
  contenu: string;
  contenuParse: ContenuElement[];
  typeDeContenu?: string;
}

export interface SousPartie {
  titre: string;
  contenu: string;
  contenuParse: ContenuElement[];
  typeDeContenu?: string;
  blocs: Bloc[];
}

export interface Partie {
  titre: string;
  contenu: string;
  contenuParse: ContenuElement[];
  sousParties: SousPartie[];
}

export interface SectionContent {
  contenuInitial: string;
  parties: Partie[];
  niveauBase?: number; // Niveau de base détecté (1, 2, ou 3) pour adapter la hiérarchie HTML
}

export interface Section {
  nom: string;
  contenu: string;
  parties: Partie[];
  niveauBase?: number; // Niveau de base détecté (1, 2, ou 3) pour adapter la hiérarchie HTML
}

export interface Chapitre {
  nom: string;
  sections: Section[];
}

export interface DossierRacine {
  nom: string;
  path: string;
}

export interface PathContentAtRoot {
  fichiers: Section[];
  dossiers: DossierRacine[];
}

export interface AboutSiteStructure {
  chapitres: Chapitre[];
}

// === TYPES du domaine Projet - journalReader ===

export interface JournalFile {
  filename: string;
  date: string;
  title: string;
  content: string;
}

export interface CourseFile {
  filename: string;
  title: string;
  content: string;
}

// === TYPES du domaine Projet - journalMarkdownParser ===

export interface ParsedJournal {
  date: string;
  titre: string;
  corps: string;
}

// === TYPES du domaine Vitrine - bibliothequeReader ===

export interface DomaineBibliotheque {
  id: string;
  titre: string;
  contenu: string;
  auteur?: string;
  competences: string[];
  experiences?: string[];
}

/**
 * CompetenceBibliotheque (copié depuis bibliothequeReader.ts)
 * Note: copie des propriétés de ElementCompetence pour éviter les dépendances circulaires
 */
export interface CompetenceBibliotheque {
  id: string;
  type: 'competence';
  titre: string;
  image?: {
    src: string;
    alt: string;
  };
  icon?: string;
  description: string;
}

// === TYPES du domaine Projet - tooltipsConfig ===

export interface NiveauInterpretation {
  range: string;
  level: string;
  description: string;
  color?: string;
}

export interface InfoBulle {
  id: string;
  title: string;
  description: string;
  interpretation?: NiveauInterpretation[];
  type?: 'metric' | 'concept' | 'help';
}

export interface ConfigurationInfoBulles {
  page: string;
  version: string;
  description?: string;
  infoBulles: InfoBulle[];
}

export type MapInfoBulles = Record<string, InfoBulle>;
