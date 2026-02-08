/**
 * Builder de MetricsSnapshot pour les tests (US-12.1).
 * Permet aux steps BDD de préparer des données métriques (typeCoverage, lighthouseScore, etc.).
 */

import type {
  MetricsSnapshot,
  MetricsHistory,
  CodeQualityMetrics,
  PerformanceMetrics,
} from '../../types/metrics';

export interface MetricsSnapshotOverrides {
  typeCoverage?: number | 'NC';
  cyclomaticComplexity?: number | 'NC';
  maintainabilityIndex?: number | 'NC';
  technicalDebt?: string | 'NC';
  lighthouseScore?: number | 'NC';
}

const defaultTests = {
  unitTests: 0,
  unitTestFiles: 0,
  unitTestPassed: 0,
  unitTestFailed: 0,
  unitTestDuration: 0,
  integrationTests: 0,
  integrationTestFiles: 0,
  integrationTestPassed: 0,
  integrationTestFailed: 0,
  integrationTestDuration: 0,
  bddFeatures: 0,
  bddScenariosTotal: 0,
  bddScenariosTestable: 0,
  bddScenariosNonTestable: 0,
  bddStepsTotal: 0,
  bddStepsImplemented: 0,
  bddStepsMissing: 0,
  e2eSteps: 0,
  e2eScenarioFiles: 0,
  e2eScenarios: 0,
  e2eStepsPassed: 0,
  e2eStepsFailed: 0,
  totalTests: 0,
  totalTestFiles: 0,
  passingTests: 0,
  failingTests: 0,
  testDuration: 0,
};

const defaultCoverage = {
  lines: { total: 0, covered: 0, percentage: 0 },
  statements: { total: 0, covered: 0, percentage: 0 },
  functions: { total: 0, covered: 0, percentage: 0 },
  branches: { total: 0, covered: 0, percentage: 0 },
};

const defaultQuality: CodeQualityMetrics = {
  eslintErrors: 0,
  eslintWarnings: 0,
  typeCoverage: 'NC',
  cyclomaticComplexity: 'NC',
  maintainabilityIndex: 'NC',
  technicalDebt: 'NC',
};

const defaultSize = {
  totalFiles: 0,
  totalLines: 0,
  sourceLines: 0,
  commentLines: 0,
  blankLines: 0,
  components: 0,
  pages: 0,
  utils: 0,
  tests: 0,
};

const defaultDependencies = {
  total: 0,
  production: 0,
  development: 0,
  outdated: 0,
  vulnerabilities: { low: 0, moderate: 0, high: 0, critical: 0, total: 0 },
};

const defaultPerformance: PerformanceMetrics = {
  bundleSize: 0,
  buildTime: 0,
  lighthouseScore: 'NC',
};

/**
 * Construit un MetricsSnapshot avec des valeurs par défaut et des surcharges optionnelles.
 * Utilisé par les steps BDD pour préparer les données (« Étant donné que les métriques collectées contiennent X »).
 */
export function buildMetricsSnapshot(
  overrides: MetricsSnapshotOverrides = {}
): MetricsSnapshot {
  const quality: CodeQualityMetrics = {
    ...defaultQuality,
    typeCoverage: overrides.typeCoverage ?? defaultQuality.typeCoverage,
    cyclomaticComplexity:
      overrides.cyclomaticComplexity ?? defaultQuality.cyclomaticComplexity,
    maintainabilityIndex:
      overrides.maintainabilityIndex ?? defaultQuality.maintainabilityIndex,
    technicalDebt: overrides.technicalDebt ?? defaultQuality.technicalDebt,
  };

  const performance: PerformanceMetrics = {
    ...defaultPerformance,
    lighthouseScore:
      overrides.lighthouseScore !== undefined
        ? overrides.lighthouseScore
        : defaultPerformance.lighthouseScore,
  };

  return {
    timestamp: new Date().toISOString(),
    branch: 'main',
    commit: 'test',
    tests: defaultTests,
    coverage: defaultCoverage,
    quality,
    size: defaultSize,
    dependencies: defaultDependencies,
    performance,
  };
}

/**
 * Construit un MetricsHistory à partir d'un snapshot (pour écriture dans history.json).
 */
export function buildMetricsHistory(snapshot: MetricsSnapshot): MetricsHistory {
  return {
    snapshots: [snapshot],
    latest: snapshot,
    trends: { tests: 'stable', coverage: 'stable', quality: 'stable' },
  };
}
