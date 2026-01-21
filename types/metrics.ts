/**
 * Types pour le système de métriques de qualité du code
 */

/**
 * Métriques de tests
 */
export interface TestMetrics {
  unitTests: number;           // Nombre de tests unitaires
  integrationTests: number;    // Nombre de tests d'intégration
  bddFeatures: number;         // Nombre de features BDD
  bddScenarios: number;        // Nombre de scénarios BDD
  bddSteps: number;            // Nombre de steps BDD
  totalTests: number;          // Total des tests
  passingTests: number;        // Tests réussis
  failingTests: number;        // Tests échoués
  testDuration: number;        // Durée des tests (ms)
  e2eTests?: {                 // Métriques des tests E2E Playwright (optionnel)
    total: number;             // Nombre total de tests E2E
    passed: number;             // Tests réussis
    failed: number;             // Tests échoués
    duration: number;           // Durée d'exécution (ms)
  };
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
  typeCoverage: number;        // % de types TypeScript
  cyclomaticComplexity: number; // Complexité moyenne
  maintainabilityIndex: number; // Index de maintenabilité (0-100)
  technicalDebt: string;        // Dette technique estimée
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
  lighthouseScore?: number;    // Score Lighthouse (0-100)
}

/**
 * Métrique complète à un instant T
 */
export interface MetricsSnapshot {
  timestamp: string;           // ISO 8601
  version: string;             // Version du projet
  branch: string;              // Branche Git
  commit: string;              // Hash du commit
  tests: TestMetrics;
  coverage: CoverageMetrics;
  quality: CodeQualityMetrics;
  size: CodeSizeMetrics;
  dependencies: DependencyMetrics;
  performance: PerformanceMetrics;
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
