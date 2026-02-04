/**
 * Barrel export pour le domaine BackOffice
 */

// Sous-domaine Generators
export * from './generators';

// Sous-domaine Integrity
export * from './integrity';

// E2E Scenario Builder
export {
  getE2eIdsForPage,
  genererCodeTestE2eId,
  genererContenuSpecE2E,
} from './e2eScenarioBuilder';

export type { PageInfo } from './e2eScenarioBuilder';
