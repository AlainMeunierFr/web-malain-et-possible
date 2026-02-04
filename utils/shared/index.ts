/**
 * Barrel export pour les utilitaires partagés (shared)
 */

export { isProduction, isDevelopment } from './environment';

export { isInReservedRange, generateE2eIdFromUrl } from './e2eIdFromUrl';

// Types du plan du site (partagés entre backoffice et client)
export type { PlanPage, PlanLien, PlanSite } from './planDuSiteTypes';

export { collectE2EMetrics } from './e2eMetricsCollector';
export type { E2EMetrics } from './e2eMetricsCollector';

export {
  getPagesExclues,
  getLiensAParcourirInitial,
  getPagesAccessiblesDepuis,
  retirerLienUtilise,
  pageAccueil,
} from './assistantScenario';

// Re-export des utilitaires markdown
export * from './markdown';
