/**
 * Barrel export pour le domaine Projet (Le Projet)
 */

// Journal Reader
export { readJournalFiles, readCourseFiles } from './journalReader';
export type { JournalFile, CourseFile } from './journalReader';

// Journal Markdown Parser
export { parseJournalMarkdown } from './journalMarkdownParser';
export type { ParsedJournal } from './journalMarkdownParser';

// Sprint Board Reader
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
} from './sprintBoardReader';

export type {
  UsCardState,
  UsCard,
  UsEnCours,
  BoardColumn,
  SprintBoardData,
  UsContent,
} from './sprintBoardReader';

// About Site Reader
export {
  ValidationError,
  validerContenuMarkdown,
  parseMarkdownContent,
  parseSectionContent,
  readChapitreByPath,
  readPathContentAtRoot,
} from './aboutSiteReader';

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
} from './aboutSiteReader';

// Metrics Snapshot Builder
export { buildMetricsSnapshot, buildMetricsHistory } from './metricsSnapshotBuilder';
export type { MetricsSnapshotOverrides } from './metricsSnapshotBuilder';

// Metrics Reader
export { readMetricsHistory, readLatestMetrics } from './metricsReader';
export type { MetricsApiResponse } from './metricsReader';

// Tooltips Config
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
} from './tooltipsConfig';

export type {
  NiveauInterpretation,
  InfoBulle,
  ConfigurationInfoBulles,
  MapInfoBulles,
} from './tooltipsConfig';

// Lighthouse Collector
export {
  shouldRunLighthouse,
  fetchLighthouseScores,
  collectLighthouseScores,
  PROD_URL,
  MIN_DELAY_MS,
} from './lighthouseCollector';

export type {
  LighthouseScores,
  LighthouseResult,
} from './lighthouseCollector';
