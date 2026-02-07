/**
 * Barrel export SERVER-ONLY
 * 
 * Ce fichier exporte les modules qui utilisent 'fs' et d'autres APIs Node.js.
 * À utiliser UNIQUEMENT dans :
 * - Server Components (fichiers sans 'use client')
 * - API Routes (app/api/*)
 * - Scripts Node.js (scripts/*)
 * 
 * Pour les Client Components, utiliser './client' ou './index'
 */

// === VITRINE (server-only) ===
export {
  readPageData,
  readIndexData,
  readDomaineData,
  buildMesProfilsPageData,
  convertirIndexDataEnPageData,
} from './vitrine/pageReader';

export {
  readCompetences,
  readDomaines,
  readAutres,
} from './vitrine/bibliothequeReader';

export { resolvePageReferences } from './vitrine/profilBuilder';

export { readMenu } from './vitrine/menuReader';

export { readHeaderMenu, readExclusHeader } from './vitrine/headerMenuReader';
export {
  checkMenuIntegrity,
  type MenuIntegrityResult,
} from './vitrine/headerMenuIntegrityChecker';
export type { HeaderMenuEntry, HeaderMenuEntryConfig, MenusConfig } from './shared/headerMenuTypes';

export {
  buildPersonJsonLd,
  buildWebSiteJsonLd,
  buildBreadcrumbJsonLd,
  buildHomePageJsonLd,
  buildProfilPageJsonLd,
  buildStandardPageJsonLd,
} from './vitrine/jsonLdBuilder';

export {
  buildPageMetadata,
  buildProfilMetadata,
} from './vitrine/metadataBuilder';

export {
  hashPassword,
  hashMD5,
  getStoredPasswordHash,
  verifyPassword,
} from './vitrine/passwordUtils';

// === PROJET (server-only) ===
export { readJournalFiles, readCourseFiles } from './projet/journalReader';
export type { JournalFile, CourseFile } from './projet/journalReader';

export { parseJournalMarkdown } from './projet/journalMarkdownParser';
export type { ParsedJournal } from './projet/journalMarkdownParser';

export {
  readSprintGoal,
  readAgentsFromCursorAgents,
  readAgentsFromAgentsJson,
  readUsEnCours,
  getSprintFolderContainingUs,
  getLatestSprintFolder,
  readSprintUsCards,
  getSprintBoardData,
  readUsContent,
} from './projet/sprintBoardReader';

export type {
  UsCardState,
  UsCard,
  UsEnCours,
  BoardColumn,
  SprintBoardData,
  UsContent,
} from './projet/sprintBoardReader';

export {
  ValidationError,
  validerContenuMarkdown,
  parseMarkdownContent,
  parseSectionContent,
  readChapitreByPath,
  readPathContentAtRoot,
} from './projet/aboutSiteReader';

export type {
  ContenuElement,
  Bloc,
  SousPartie,
  Partie,
  SectionContent,
  Section,
  Chapitre,
  DossierRacine,
  PathContentAtRoot,
  AboutSiteStructure,
} from './projet/aboutSiteReader';

export { buildMetricsSnapshot, buildMetricsHistory } from './projet/metricsSnapshotBuilder';

export { readMetricsHistory, readLatestMetrics } from './projet/metricsReader';
export type { MetricsApiResponse } from './projet/metricsReader';

export {
  creerMapInfoBulles,
  loadInfoBullesConfig,
  loadTooltipsConfig,
  getTooltipConfig,
  hasTooltipConfig,
  getAvailableMetrics,
  validateInfoBulle,
  validateMetricConfig,
  clearTooltipsCache,
  validateInfoBullesConfig,
  validateTooltipsConfig,
} from './projet/tooltipsConfig';

export type {
  NiveauInterpretation,
  InfoBulle,
  ConfigurationInfoBulles,
  MapInfoBulles,
} from './projet/tooltipsConfig';

// Lighthouse Collector
export {
  shouldRunLighthouse,
  fetchLighthouseScores,
  collectLighthouseScores,
  PROD_URL,
  MIN_DELAY_MS,
} from './projet/lighthouseCollector';

export type {
  LighthouseScores,
  LighthouseResult,
} from './projet/lighthouseCollector';

// === SHARED (server-only) ===
export { collectE2EMetrics } from './shared/e2eMetricsCollector';
export type { E2EMetrics } from './shared/e2eMetricsCollector';

// Markdown formatter (uses fs)
export { formatJournalMarkdown, formatAllJournalFiles } from './shared/markdown/markdownFormatter';
