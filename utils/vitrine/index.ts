/**
 * Barrel export pour le domaine Vitrine (Site Vitrine)
 */

// Page Reader (anciennement indexReader)
export {
  readPageData,
  readIndexData,
  readDomaineData,
  buildMesProfilsPageData,
  convertirIndexDataEnPageData,
} from './pageReader';

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
} from './pageReader';

// Bibliothèque Reader
export {
  readCompetences,
  readDomaines,
  readAutres,
} from './bibliothequeReader';

export type {
  DomaineBibliotheque,
  CompetenceBibliotheque,
} from './bibliothequeReader';

// Profil Builder
export { resolvePageReferences } from './profilBuilder';

// Menu Reader
export { readMenu } from './menuReader';
export type { LigneDeMenu } from './menuReader';

// Button Handlers
export {
  getRouteForCommand,
  isInternalNavigation,
  getButtonAction,
} from './buttonHandlers';
export type { ButtonAction } from './buttonHandlers';

// Image Path
export {
  getJsonImagePath,
  getMdImagePath,
  getStaticImagePath,
} from './imagePath';

// JSON-LD Builder
export {
  buildPersonJsonLd,
  buildWebSiteJsonLd,
  buildBreadcrumbJsonLd,
  buildHomePageJsonLd,
  buildProfilPageJsonLd,
  buildStandardPageJsonLd,
} from './jsonLdBuilder';

// Metadata Builder
export {
  buildPageMetadata,
  buildProfilMetadata,
} from './metadataBuilder';

// Password Utils
export {
  hashPassword,
  hashMD5,
  getStoredPasswordHash,
  verifyPassword,
} from './passwordUtils';

// API Helpers (US-12.6)
export {
  validateModeParameter,
  convertToRefs,
} from './apiHelpers';

export type {
  ApiError,
  ModeValidationResult,
  ApiMode,
} from './apiHelpers';

// OpenAPI Spec (US-12.6 - CA6)
export { generateOpenApiSpec } from './openApiSpec';
export type { OpenApiSpec } from './openApiSpec';
