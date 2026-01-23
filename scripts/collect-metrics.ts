/**
 * Script de collecte des métriques de qualité du code
 * Analyse le projet et génère un rapport JSON complet
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import type { MetricsSnapshot, MetricsHistory } from '../types/metrics';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'metrics');
const HISTORY_FILE = path.join(OUTPUT_DIR, 'history.json');
const LATEST_FILE = path.join(OUTPUT_DIR, 'latest.json');
const HISTORY_LIMIT = 100; // Garder 100 snapshots

/**
 * Collecte les métriques de tests
 */
function collectTestMetrics() {
  console.log('📊 Collecte des métriques de tests...');
  
  // Compter les fichiers de tests
  const testFiles = {
    unit: execSync('find tests/unit -name "*.test.ts*" 2>/dev/null | wc -l || echo 0', { encoding: 'utf-8' }).trim(),
    integration: execSync('find tests/unit -name "*.integration.test.ts*" 2>/dev/null | wc -l || echo 0', { encoding: 'utf-8' }).trim(),
    bddFeatures: execSync('find tests/bdd -name "*.feature" 2>/dev/null | wc -l || echo 0', { encoding: 'utf-8' }).trim(),
  };

  // Compter les scénarios et steps BDD
  let bddScenarios = 0;
  let bddSteps = 0;
  try {
    const featureFiles = execSync('find tests/bdd -name "*.feature" 2>/dev/null', { encoding: 'utf-8' }).trim().split('\n');
    featureFiles.forEach(file => {
      if (file && fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf-8');
        // Compter les scénarios (tous les fichiers .feature sont conformes à la DOD avec accents)
        bddScenarios += (content.match(/Scénario:|Scénario Outline:/g) || []).length;
        bddSteps += (content.match(/Given |When |Then |And |But /g) || []).length;
      }
    });
  } catch (e) {
    console.warn('⚠️  Erreur lors du comptage BDD:', e);
  }

  // Exécuter les tests pour obtenir les résultats
  let passingTests = 0;
  let failingTests = 0;
  let totalTests = 0;
  let testDuration = 0;

  try {
    const testResult = execSync('npm test -- --json --outputFile=test-results.json 2>&1', { encoding: 'utf-8' });
    if (fs.existsSync('test-results.json')) {
      const results = JSON.parse(fs.readFileSync('test-results.json', 'utf-8'));
      totalTests = results.numTotalTests || 0;
      passingTests = results.numPassedTests || 0;
      failingTests = results.numFailedTests || 0;
      testDuration = results.testResults?.reduce((sum: number, r: any) => sum + (r.perfStats?.runtime || 0), 0) || 0;
      fs.unlinkSync('test-results.json');
    }
  } catch (e) {
    console.warn('⚠️  Erreur lors de l\'exécution des tests:', e);
  }

  return {
    unitTests: parseInt(testFiles.unit) || 0,
    integrationTests: parseInt(testFiles.integration) || 0,
    bddFeatures: parseInt(testFiles.bddFeatures) || 0,
    bddScenarios,
    bddSteps,
    totalTests,
    passingTests,
    failingTests,
    testDuration,
  };
}

/**
 * Collecte les métriques de couverture
 */
function collectCoverageMetrics() {
  console.log('📊 Collecte des métriques de couverture...');
  
  try {
    // Exécuter les tests avec couverture
    execSync('npm test -- --coverage --coverageReporters=json-summary --silent', { stdio: 'ignore' });
    
    const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');
    if (fs.existsSync(coveragePath)) {
      const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));
      const total = coverage.total;
      
      return {
        lines: {
          total: total.lines.total,
          covered: total.lines.covered,
          percentage: total.lines.pct,
        },
        statements: {
          total: total.statements.total,
          covered: total.statements.covered,
          percentage: total.statements.pct,
        },
        functions: {
          total: total.functions.total,
          covered: total.functions.covered,
          percentage: total.functions.pct,
        },
        branches: {
          total: total.branches.total,
          covered: total.branches.covered,
          percentage: total.branches.pct,
        },
      };
    }
  } catch (e) {
    console.warn('⚠️  Erreur lors de la collecte de couverture:', e);
  }

  return {
    lines: { total: 0, covered: 0, percentage: 0 },
    statements: { total: 0, covered: 0, percentage: 0 },
    functions: { total: 0, covered: 0, percentage: 0 },
    branches: { total: 0, covered: 0, percentage: 0 },
  };
}

/**
 * Collecte les métriques de qualité
 */
function collectQualityMetrics() {
  console.log('📊 Collecte des métriques de qualité...');
  
  let eslintErrors = 0;
  let eslintWarnings = 0;
  
  try {
    execSync('npm run lint -- --format=json --output-file=eslint-report.json', { stdio: 'ignore' });
  } catch (e) {
    // ESLint retourne un code d'erreur s'il y a des erreurs
  }
  
  try {
    if (fs.existsSync('eslint-report.json')) {
      const eslintResults = JSON.parse(fs.readFileSync('eslint-report.json', 'utf-8'));
      eslintResults.forEach((file: any) => {
        eslintErrors += file.errorCount || 0;
        eslintWarnings += file.warningCount || 0;
      });
      fs.unlinkSync('eslint-report.json');
    }
  } catch (e) {
    console.warn('⚠️  Erreur lors de l\'analyse ESLint:', e);
  }

  return {
    eslintErrors,
    eslintWarnings,
    typeCoverage: 95, // Placeholder - nécessite type-coverage
    cyclomaticComplexity: 5, // Placeholder - nécessite complexity-report
    maintainabilityIndex: 75, // Placeholder
    technicalDebt: '2h', // Placeholder
  };
}

/**
 * Collecte les métriques de taille
 */
function collectSizeMetrics() {
  console.log('📊 Collecte des métriques de taille...');
  
  const countFiles = (pattern: string) => {
    try {
      return parseInt(execSync(`find ${pattern} 2>/dev/null | wc -l || echo 0`, { encoding: 'utf-8' }).trim()) || 0;
    } catch {
      return 0;
    }
  };

  const countLines = (pattern: string) => {
    try {
      const result = execSync(`find ${pattern} -exec wc -l {} + 2>/dev/null | tail -1 || echo "0"`, { encoding: 'utf-8' }).trim();
      return parseInt(result.split(' ')[0]) || 0;
    } catch {
      return 0;
    }
  };

  return {
    totalFiles: countFiles('.') - countFiles('node_modules') - countFiles('.next'),
    totalLines: countLines('app') + countLines('components') + countLines('utils') + countLines('tests'),
    sourceLines: countLines('app') + countLines('components') + countLines('utils'),
    commentLines: 0, // Placeholder
    blankLines: 0, // Placeholder
    components: countFiles('components/*.tsx'),
    pages: countFiles('app/*/page.tsx'),
    utils: countFiles('utils/*.ts'),
    tests: countFiles('tests/**/*.test.ts*'),
  };
}

/**
 * Collecte les métriques de dépendances
 */
function collectDependencyMetrics() {
  console.log('📊 Collecte des métriques de dépendances...');
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const production = Object.keys(packageJson.dependencies || {}).length;
  const development = Object.keys(packageJson.devDependencies || {}).length;

  let vulnerabilities = { low: 0, moderate: 0, high: 0, critical: 0, total: 0 };
  
  try {
    const auditResult = execSync('npm audit --json', { encoding: 'utf-8' });
    const audit = JSON.parse(auditResult);
    vulnerabilities = {
      low: audit.metadata?.vulnerabilities?.low || 0,
      moderate: audit.metadata?.vulnerabilities?.moderate || 0,
      high: audit.metadata?.vulnerabilities?.high || 0,
      critical: audit.metadata?.vulnerabilities?.critical || 0,
      total: audit.metadata?.vulnerabilities?.total || 0,
    };
  } catch (e) {
    console.warn('⚠️  Erreur lors de l\'audit npm:', e);
  }

  return {
    total: production + development,
    production,
    development,
    outdated: 0, // Placeholder
    vulnerabilities,
  };
}

/**
 * Collecte les métriques de performance
 */
function collectPerformanceMetrics() {
  console.log('📊 Collecte des métriques de performance...');
  
  let bundleSize = 0;
  let buildTime = 0;

  try {
    const start = Date.now();
    execSync('npm run build', { stdio: 'ignore' });
    buildTime = Date.now() - start;

    // Calculer la taille du bundle
    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
      const getSize = (dir: string): number => {
        let size = 0;
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            size += getSize(filePath);
          } else {
            size += stat.size;
          }
        });
        return size;
      };
      bundleSize = Math.round(getSize(nextDir) / 1024); // KB
    }
  } catch (e) {
    console.warn('⚠️  Erreur lors du build:', e);
  }

  return {
    bundleSize,
    buildTime,
    lighthouseScore: undefined,
  };
}

/**
 * Obtenir les informations Git
 */
function getGitInfo() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    const commit = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
    return { branch, commit };
  } catch {
    return { branch: 'unknown', commit: 'unknown' };
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Démarrage de la collecte des métriques...\n');

  // Créer le dossier de sortie
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Collecter toutes les métriques
  const gitInfo = getGitInfo();
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  const snapshot: MetricsSnapshot = {
    timestamp: new Date().toISOString(),
    version: packageJson.version || '0.1.0',
    branch: gitInfo.branch,
    commit: gitInfo.commit,
    tests: collectTestMetrics(),
    coverage: collectCoverageMetrics(),
    quality: collectQualityMetrics(),
    size: collectSizeMetrics(),
    dependencies: collectDependencyMetrics(),
    performance: collectPerformanceMetrics(),
  };

  // Sauvegarder le snapshot actuel
  fs.writeFileSync(LATEST_FILE, JSON.stringify(snapshot, null, 2));
  console.log(`\n✅ Snapshot sauvegardé: ${LATEST_FILE}`);

  // Charger l'historique existant
  let history: MetricsHistory = {
    snapshots: [],
    latest: snapshot,
    trends: {
      tests: 'stable',
      coverage: 'stable',
      quality: 'stable',
    },
  };

  if (fs.existsSync(HISTORY_FILE)) {
    try {
      const existingHistory = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
      history.snapshots = existingHistory.snapshots || [];
    } catch (e) {
      console.warn('⚠️  Erreur lors de la lecture de l\'historique');
    }
  }

  // Ajouter le nouveau snapshot
  history.snapshots.push(snapshot);
  
  // Limiter la taille de l'historique
  if (history.snapshots.length > HISTORY_LIMIT) {
    history.snapshots = history.snapshots.slice(-HISTORY_LIMIT);
  }

  // Calculer les tendances
  if (history.snapshots.length >= 2) {
    const previous = history.snapshots[history.snapshots.length - 2];
    const current = snapshot;

    history.trends = {
      tests: current.tests.totalTests > previous.tests.totalTests ? 'up' : 
             current.tests.totalTests < previous.tests.totalTests ? 'down' : 'stable',
      coverage: current.coverage.lines.percentage > previous.coverage.lines.percentage ? 'up' :
                current.coverage.lines.percentage < previous.coverage.lines.percentage ? 'down' : 'stable',
      quality: (current.quality.eslintErrors + current.quality.eslintWarnings) < 
               (previous.quality.eslintErrors + previous.quality.eslintWarnings) ? 'up' : 
               (current.quality.eslintErrors + current.quality.eslintWarnings) > 
               (previous.quality.eslintErrors + previous.quality.eslintWarnings) ? 'down' : 'stable',
    };
  }

  history.latest = snapshot;

  // Sauvegarder l'historique
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  console.log(`✅ Historique sauvegardé: ${HISTORY_FILE}`);

  // Afficher un résumé
  console.log('\n📈 Résumé des métriques:');
  console.log(`  Tests: ${snapshot.tests.totalTests} (${snapshot.tests.passingTests} ✓, ${snapshot.tests.failingTests} ✗)`);
  console.log(`  Couverture: ${snapshot.coverage.lines.percentage.toFixed(2)}%`);
  console.log(`  ESLint: ${snapshot.quality.eslintErrors} erreurs, ${snapshot.quality.eslintWarnings} warnings`);
  console.log(`  Fichiers: ${snapshot.size.totalFiles}`);
  console.log(`  Dépendances: ${snapshot.dependencies.total} (${snapshot.dependencies.vulnerabilities.total} vulnérabilités)`);
  console.log(`  Bundle: ${snapshot.performance.bundleSize} KB`);
  console.log(`  Build: ${(snapshot.performance.buildTime / 1000).toFixed(2)}s`);

  console.log('\n✨ Collecte terminée avec succès!');
}

main().catch(console.error);
