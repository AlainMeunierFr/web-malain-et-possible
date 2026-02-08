/**
 * Types pour le système de métriques de qualité du code
 */

/**
 * Métriques de tests
 */
export interface TestMetrics {
  // Tests unitaires
  unitTests: number;           // Nombre de tests unitaires individuels (it/test)
  unitTestFiles: number;       // Nombre de fichiers de tests unitaires
  unitTestPassed: number;     // Tests unitaires réussis
  unitTestFailed: number;      // Tests unitaires échoués
  unitTestDuration?: number;   // Durée des tests unitaires (ms)
  
  // Tests d'intégration
  integrationTests: number;    // Nombre de tests d'intégration individuels (it/test)
  integrationTestFiles: number; // Nombre de fichiers de tests d'intégration
  integrationTestPassed: number; // Tests d'intégration réussis
  integrationTestFailed: number; // Tests d'intégration échoués
  integrationTestDuration?: number; // Durée des tests d'intégration (ms)
  
  // BDD - Scénarios
  bddFeatures: number;              // [A] Nombre de fichiers .feature
  bddScenariosTotal: number;        // [B] Scénarios (expanded, inclut Outline × Examples)
  bddScenariosTestable: number;     // [F] Scénarios testables (tous les steps implémentés)
  bddScenariosNonTestable: number;  // [G] Scénarios non testables (≥1 step manquant)
  bddTestDuration?: number;         // Durée d'exécution des scénarios testables (ms)
  
  // BDD - Étapes
  bddStepsTotal: number;            // [C] Nombre de textes de steps uniques dans les .feature
  bddStepsImplemented: number;      // [D] Steps ayant une définition dans les .steps.ts
  bddStepsMissing: number;          // [E] Steps sans définition (dette BDD)
  
  // E2E
  e2eSteps: number;            // Nombre total d'étapes E2E dans les fichiers de test
  e2eScenarioFiles: number;    // Nombre de fichiers de tests E2E (.spec.ts)
  e2eScenarios: number;        // Nombre de scénarios E2E
  e2eStepsPassed: number;      // Steps E2E réussis
  e2eStepsFailed: number;      // Steps E2E échoués
  e2eTests?: {                 // Métriques des tests E2E Playwright (optionnel)
    total: number;             // Nombre total de tests E2E
    passed: number;             // Tests réussis
    failed: number;             // Tests échoués
    duration: number;           // Durée d'exécution (ms)
    lastRunDate?: string;       // Date du dernier run (ISO 8601)
  };
  
  // Totaux
  totalTests: number;          // Total des tests (tests individuels + scénarios + steps)
  totalTestFiles: number;      // Total des fichiers de tests (unitTestFiles + integrationTestFiles + bddFeatures + e2eScenarioFiles)
  passingTests: number;        // Tests réussis (tous types)
  failingTests: number;        // Tests échoués (tous types)
  testDuration: number;        // Durée totale des tests (ms)
}

/**
 * Métriques de couverture
 */
export interface CoverageMetrics {
  lines: {
    total: number;
    covered: number;
    percentage: number;
  };
  statements: {
    total: number;
    covered: number;
    percentage: number;
  };
  functions: {
    total: number;
    covered: number;
    percentage: number;
  };
  branches: {
    total: number;
    covered: number;
    percentage: number;
  };
}

/**
 * Métriques de qualité de code
 */
export interface CodeQualityMetrics {
  eslintErrors: number;
  eslintWarnings: number;
  typeCoverage: number | "NC";        // % de types TypeScript ou "NC" si non calculé
  cyclomaticComplexity: number | "NC"; // Complexité moyenne ou "NC" si non calculé
  maintainabilityIndex: number | "NC"; // Index de maintenabilité (0-100) ou "NC" si non calculé
  technicalDebt: string | "NC";        // Dette technique estimée ou "NC" si non calculé
}

/**
 * Métriques de taille de code
 */
export interface CodeSizeMetrics {
  totalFiles: number;
  totalLines: number;
  sourceLines: number;         // LOC (hors commentaires/blancs)
  commentLines: number;
  blankLines: number;
  components: number;
  pages: number;
  utils: number;
  tests: number;
}

/**
 * Métriques de dépendances
 */
export interface DependencyMetrics {
  total: number;
  production: number;
  development: number;
  outdated: number;
  vulnerabilities: {
    low: number;
    moderate: number;
    high: number;
    critical: number;
    total: number;
  };
}

/**
 * Métriques de performance
 */
export interface PerformanceMetrics {
  bundleSize: number;          // Taille du bundle (KB)
  buildTime: number;           // Temps de build (ms)
  lighthouseScore?: number | "NC";    // Score Lighthouse global (0-100) ou "NC" si non calculé
  lighthouse?: LighthouseScoresMetrics; // Scores Lighthouse détaillés (4 catégories)
}

/**
 * Scores Lighthouse détaillés (4 catégories)
 */
export interface LighthouseScoresMetrics {
  performance: number | "NC";
  accessibility: number | "NC";
  bestPractices: number | "NC";
  seo: number | "NC";
}

/**
 * Métrique complète à un instant T
 */
export interface MetricsSnapshot {
  timestamp: string;           // ISO 8601
  branch: string;              // Branche Git
  commit: string;              // Hash du commit
  tests: TestMetrics;
  coverage: CoverageMetrics;
  quality: CodeQualityMetrics;
  size: CodeSizeMetrics;
  dependencies: DependencyMetrics;
  performance: PerformanceMetrics;
  lighthouse?: LighthouseScoresMetrics; // Scores Web (PageSpeed)
}

/**
 * Historique des métriques
 */
export interface MetricsHistory {
  snapshots: MetricsSnapshot[];
  latest: MetricsSnapshot;
  trends: {
    tests: 'up' | 'down' | 'stable';
    coverage: 'up' | 'down' | 'stable';
    quality: 'up' | 'down' | 'stable';
  };
  lastLighthouseRun?: string;  // ISO 8601 - date du dernier run Lighthouse
}

/**
 * Configuration du collecteur de métriques
 */
export interface MetricsConfig {
  outputDir: string;
  historyLimit: number;         // Nombre de snapshots à garder
  thresholds: {
    coverage: number;           // % minimum requis
    quality: number;            // Score minimum requis
    complexity: number;         // Complexité maximum
  };
}
