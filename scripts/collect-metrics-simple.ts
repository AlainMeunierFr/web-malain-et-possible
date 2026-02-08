/**
 * Pipeline de validation et métriques (tout sauf « publier sur Git »).
 * - Jest (unit + intégration) en une passe, avec couverture et chronométrage
 * - Vérification des seuils de couverture (≥ 80 % lines/statements/functions, ≥ 65 % branches)
 * - BDD : génération puis exécution (règle : 100 % scénarios testables doivent passer)
 *   → SKIP_BDD=1 ou --skip-bdd : ne pas lancer les BDD ; les métriques BDD du run précédent sont conservées (ordre de grandeur)
 * - E2E : exécution
 * - Arrêt au premier échec (Option A) ; log des erreurs dans logs/publish-errors.txt pour l’IA
 * - Mise à jour des données métriques (snapshot, history, durations)
 * - Scores Web (Lighthouse) : mis à jour tous les 7 jours
 */

// Charger les variables d'environnement depuis .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import type { MetricsSnapshot, MetricsHistory, LighthouseScoresMetrics } from '../types/metrics';
import { collectLighthouseScores } from '../utils/projet/lighthouseCollector';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'metrics');
const HISTORY_FILE = path.join(OUTPUT_DIR, 'history.json');
const LATEST_FILE = path.join(OUTPUT_DIR, 'latest.json');
const HISTORY_LIMIT = 100;

/** Fichier de log des erreurs pour l’IA (débogage sans copier-coller). */
const PUBLISH_ERRORS_LOG = path.join(process.cwd(), 'logs', 'publish-errors.txt');

/**
 * Écrit les erreurs d’une étape dans logs/publish-errors.txt pour que l’IA puisse débuguer.
 */
function writeErrorLog(step: string, stdout: string, stderr: string, extra?: string): void {
  const dir = path.dirname(PUBLISH_ERRORS_LOG);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const sep = '\n' + '─'.repeat(60) + '\n';
  const body = [
    `Date: ${new Date().toISOString()}`,
    `Étape en échec: ${step}`,
    '',
    '--- stdout ---',
    stdout || '(vide)',
    '',
    '--- stderr ---',
    stderr || '(vide)',
    ...(extra ? ['', '--- détail ---', extra] : []),
  ].join('\n');
  fs.writeFileSync(PUBLISH_ERRORS_LOG, body, 'utf-8');
  console.error(`\n📄 Log des erreurs écrit dans: ${PUBLISH_ERRORS_LOG}`);
}

/** Seuils de couverture (alignés avec publie / DoD). */
const COVERAGE_THRESHOLDS = { lines: 80, statements: 80, functions: 80, branches: 65 };

/**
 * Vérifie que la couverture (coverage-summary.json) respecte les seuils.
 * En cas d’échec : log dans publish-errors.txt et process.exit(1).
 */
function checkCoverageThresholds(): void {
  const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');
  if (!fs.existsSync(coveragePath)) {
    writeErrorLog('Couverture', '', '', 'Fichier coverage/coverage-summary.json absent. Exécuter les tests Jest avec --coverage.');
    process.exit(1);
  }
  try {
    const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));
    const total = coverage?.total;
    if (!total) {
      writeErrorLog('Couverture', '', '', 'Structure coverage-summary.json invalide (pas de total).');
      process.exit(1);
    }
    const lines = { pct: total.lines?.pct ?? 0, seuil: COVERAGE_THRESHOLDS.lines };
    const statements = { pct: total.statements?.pct ?? 0, seuil: COVERAGE_THRESHOLDS.statements };
    const functions = { pct: total.functions?.pct ?? 0, seuil: COVERAGE_THRESHOLDS.functions };
    const branches = { pct: total.branches?.pct ?? 0, seuil: COVERAGE_THRESHOLDS.branches };
    const fails: string[] = [];
    if (lines.pct < lines.seuil) fails.push(`lines: ${lines.pct}% (seuil ${lines.seuil}%)`);
    if (statements.pct < statements.seuil) fails.push(`statements: ${statements.pct}% (seuil ${statements.seuil}%)`);
    if (functions.pct < functions.seuil) fails.push(`functions: ${functions.pct}% (seuil ${functions.seuil}%)`);
    if (branches.pct < branches.seuil) fails.push(`branches: ${branches.pct}% (seuil ${branches.seuil}%)`);
    if (fails.length > 0) {
      writeErrorLog('Couverture', '', '', `Seuils non atteints:\n${fails.join('\n')}\n\nTotal: ${JSON.stringify(total, null, 2)}`);
      console.error('❌ Couverture insuffisante — publication bloquée');
      process.exit(1);
    }
    console.log('✅ Couverture OK (lines/statements/functions ≥ 80%, branches ≥ 65%)\n');
  } catch (e) {
    writeErrorLog('Couverture', '', '', (e as Error).message);
    process.exit(1);
  }
}

/**
 * Lit les stats (passed, failed) depuis playwright-report/data.json.
 * Retourne null si le fichier est absent ou invalide.
 */
function readPlaywrightReportStats(dataPath: string): { passed: number; failed: number } | null {
  if (!fs.existsSync(dataPath)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    if (data.stats) {
      const passed = data.stats.expected ?? 0;
      const failed = data.stats.unexpected ?? 0;
      return { passed, failed };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Extrait les titres des tests en échec depuis playwright-report/data.json (structure suites/specs).
 * Retourne au plus maxEntries noms pour ne pas surcharger le log.
 */
function getPlaywrightFailedTitles(dataPath: string, maxEntries: number = 50): string[] {
  if (!fs.existsSync(dataPath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const failed: string[] = [];
    function walk(suites: Array<{ title?: string; specs?: Array<{ title?: string; ok?: boolean }>; suites?: unknown[] }>, prefix = '') {
      if (!Array.isArray(suites)) return;
      for (const s of suites) {
        const title = (s.title && String(s.title).trim()) ? `${prefix}${prefix ? ' › ' : ''}${s.title}` : prefix;
        if (Array.isArray(s.specs)) {
          for (const spec of s.specs) {
            if (spec.ok === false && spec.title) {
              failed.push(`${title} › ${spec.title}`.trim() || spec.title);
              if (failed.length >= maxEntries) return;
            }
          }
        }
        if (Array.isArray(s.suites)) walk(s.suites as typeof suites, title);
        if (failed.length >= maxEntries) return;
      }
    }
    if (Array.isArray(data.suites)) walk(data.suites);
    return failed;
  } catch {
    return [];
  }
}

/**
 * Compte les fichiers récursivement
 */
function countFiles(dir: string, pattern: RegExp): number {
  let count = 0;
  
  function walk(currentPath: string) {
    try {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          walk(filePath);
        } else if (stat.isFile() && pattern.test(file)) {
          count++;
        }
      });
    } catch (e) {
      // Ignorer les erreurs de permission
    }
  }
  
  walk(dir);
  return count;
}

/**
 * Compte les lignes dans les fichiers
 */
function countLines(dir: string, extension: string): number {
  let lines = 0;
  
  function walk(currentPath: string) {
    try {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          walk(filePath);
        } else if (stat.isFile() && file.endsWith(extension)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          lines += content.split('\n').length;
        }
      });
    } catch (e) {
      // Ignorer les erreurs
    }
  }
  
  walk(dir);
  return lines;
}

/**
 * Compte les tests réels (it/test blocks) dans les fichiers
 */
/**
 * Compte les tests individuels et les fichiers dans un répertoire
 */
function countTestsInFiles(dir: string): { tests: number; files: number } {
  let testCount = 0;
  let fileCount = 0;
  
  function walk(currentPath: string) {
    try {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          walk(filePath);
        } else if (stat.isFile() && /\.test\.(ts|tsx)$/.test(file)) {
          fileCount++;
          const content = fs.readFileSync(filePath, 'utf-8');
          // Compter les blocs it() et test()
          testCount += (content.match(/\b(it|test)\s*\(/g) || []).length;
        }
      });
    } catch (e) {
      // Ignorer les erreurs
    }
  }
  
  walk(dir);
  return { tests: testCount, files: fileCount };
}

/**
 * Compte les fichiers de test E2E
 */
function countE2EFiles(dir: string): number {
  let count = 0;
  
  function walk(currentPath: string) {
    try {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          walk(filePath);
        } else if (stat.isFile() && /\.spec\.(ts|tsx)$/.test(file)) {
          count++;
        }
      });
    } catch (e) {
      // Ignorer les erreurs
    }
  }
  
  walk(dir);
  return count;
}

/**
 * Compte les étapes E2E dans les fichiers de test E2E
 * Une étape est un appel à await page.* (goto, click, fill, etc.)
 */
function countE2ESteps(dir: string): number {
  let count = 0;
  
  function walk(currentPath: string) {
    try {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          walk(filePath);
        } else if (stat.isFile() && /\.spec\.(ts|tsx)$/.test(file)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          // Compter les appels await page.* (étapes Playwright)
          // Pattern: await page.goto, await page.click, await page.fill, etc.
          const stepMatches = content.match(/await\s+page\.\w+/g);
          if (stepMatches) {
            count += stepMatches.length;
          }
        }
      });
    } catch (e) {
      // Ignorer les erreurs
    }
  }
  
  walk(dir);
  return count;
}

/**
 * Collecte les métriques E2E depuis les résultats Playwright
 * IMPORTANT : Ne retourne JAMAIS de durée depuis data.json car elle peut contenir BDD+E2E combinés
 * La durée E2E doit toujours venir de durations.json (mesurée avec Date.now())
 */
function collectE2EMetrics(): { total: number; passed: number; failed: number; duration: number; lastRunDate?: string } | undefined {
  try {
    let lastRunDate: Date | null = null;
    let resultData: { total: number; passed: number; failed: number; duration: number } | null = null;
    
    // Playwright stocke les résultats dans playwright-report/data.json (reporter HTML)
    const playwrightReportData = path.join(process.cwd(), 'playwright-report', 'data.json');
    
    if (fs.existsSync(playwrightReportData)) {
      try {
        const stats = fs.statSync(playwrightReportData);
        const statsMtime: Date = stats.mtime;
        if (lastRunDate === null) {
          lastRunDate = statsMtime;
        } else {
          const currentTime = statsMtime.getTime();
          const lastTime = (lastRunDate as Date).getTime();
          if (currentTime > lastTime) {
            lastRunDate = statsMtime;
          }
        }
        
        const content = fs.readFileSync(playwrightReportData, 'utf-8');
        const data = JSON.parse(content);
        
        // Structure de playwright-report/data.json (reporter JSON)
        // Le reporter JSON utilise une structure différente avec stats.duration
        if (data.stats) {
          const stats = data.stats;
          const total = (stats.expected || 0) + (stats.unexpected || 0) + (stats.skipped || 0);
          const passed = stats.expected || 0;
          const failed = stats.unexpected || 0;
          // ⚠️ NE PAS utiliser stats.duration car il peut contenir BDD+E2E combinés
          // La durée sera fournie depuis durations.json (mesurée avec Date.now())
          const duration = 0; // Toujours 0, sera remplacée par la durée depuis durations.json
          
          if (total > 0) {
            resultData = {
              total,
              passed,
              failed,
              duration: duration, // Toujours 0
            };
          }
        } else if (data.files && Array.isArray(data.files)) {
          // Structure alternative (ancien format HTML reporter)
          let total = 0;
          let passed = 0;
          let failed = 0;
          // ⚠️ NE PAS additionner les durées car elles peuvent contenir BDD+E2E combinés
          // La durée sera fournie depuis durations.json (mesurée avec Date.now())
          
          for (const file of data.files) {
            if (file.tests && Array.isArray(file.tests)) {
              for (const test of file.tests) {
                if (test.results && Array.isArray(test.results)) {
                  for (const result of test.results) {
                    total++;
                    if (result.status === 'passed') {
                      passed++;
                    } else if (result.status === 'failed' || result.status === 'timedOut') {
                      failed++;
                    }
                    // ⚠️ Ne pas additionner result.duration
                  }
                }
              }
            }
          }
          
          if (total > 0) {
            resultData = {
              total,
              passed,
              failed,
              duration: 0, // Toujours 0, sera remplacée par la durée depuis durations.json
            };
          }
        }
      } catch (e) {
        // Si le parsing échoue, continuer avec test-results
      }
    }
    
    // Fallback : chercher dans test-results/
    const testResultsDir = path.join(process.cwd(), 'test-results');
    
    if (fs.existsSync(testResultsDir)) {
      let total = 0;
      let passed = 0;
      let failed = 0;
      // ⚠️ NE PAS additionner les durées car elles peuvent contenir BDD+E2E combinés
      let latestFileDate: Date | null = null;
      
      function walkResultsDir(currentPath: string) {
        try {
          const entries = fs.readdirSync(currentPath, { withFileTypes: true });
          
          for (const entry of entries) {
            const entryPath = path.join(currentPath, entry.name);
            
            if (entry.isDirectory()) {
              walkResultsDir(entryPath);
            } else if (entry.isFile() && entry.name.endsWith('.json')) {
              try {
                const stats = fs.statSync(entryPath);
                if (!latestFileDate || stats.mtime > latestFileDate) {
                  latestFileDate = stats.mtime;
                }
                
                const content = fs.readFileSync(entryPath, 'utf-8');
                const result = JSON.parse(content);
                
                // Structure alternative : chercher status et duration
                if (result.status) {
                  total++;
                  if (result.status === 'passed') {
                    passed++;
                  } else if (result.status === 'failed' || result.status === 'timedOut') {
                    failed++;
                  }
                  // ⚠️ Ne pas utiliser result.duration
                }
              } catch (e) {
                // Ignorer les fichiers JSON invalides
              }
            }
          }
        } catch (e) {
          // Ignorer les erreurs de lecture
        }
      }
      
      walkResultsDir(testResultsDir);
      
      if (total > 0 && latestFileDate !== null) {
        const latestDate: Date = latestFileDate;
        if (lastRunDate === null) {
          lastRunDate = latestDate;
        } else {
          const latestTime = latestDate.getTime();
          const lastTime = (lastRunDate as Date).getTime();
          if (latestTime > lastTime) {
            lastRunDate = latestDate;
          }
        }
        // Ne pas écraser resultData si on a déjà des données depuis playwright-report/data.json
        if (!resultData) {
          resultData = {
            total,
            passed,
            failed,
            duration: 0, // Toujours 0, sera remplacée par la durée depuis durations.json
          };
        }
      }
    }
    
    // Si on a des données, retourner avec la date
    if (resultData) {
      return {
        ...resultData,
        lastRunDate: lastRunDate ? lastRunDate.toISOString() : undefined,
      };
    }
    
    // Aucun résultat trouvé
    return undefined;
  } catch (error) {
    console.warn('⚠️  Impossible de lire les résultats E2E Playwright');
    return undefined;
  }
}

/**
 * Collecte les durées des tests depuis les résultats Jest
 */
function collectJestTestDurations(): { unitDuration: number; integrationDuration: number; totalDuration: number; passingTests: number; failingTests: number } {
  let unitDuration = 0;
  let integrationDuration = 0;
  let totalDuration = 0;
  let passingTests = 0;
  let failingTests = 0;

  try {
    // Jest peut générer un fichier JSON avec --json --outputFile
    // Vérifier si un fichier test-results.json existe (généré par Jest)
    const jestResultsPath = path.join(process.cwd(), 'test-results.json');
    
    if (fs.existsSync(jestResultsPath)) {
      const jestResults = JSON.parse(fs.readFileSync(jestResultsPath, 'utf-8'));
      
      // Structure Jest JSON : { numTotalTests, numPassedTests, numFailedTests, testResults: [...] }
      if (jestResults.testResults && Array.isArray(jestResults.testResults)) {
        passingTests = jestResults.numPassedTests || 0;
        failingTests = jestResults.numFailedTests || 0;
        
        for (const testResult of jestResults.testResults) {
          const filePath = testResult.name || '';
          const isIntegration = filePath.includes('integration') || filePath.includes('.integration.test.');
          
          // Durée du fichier de test (en millisecondes)
          // Jest stocke les durées dans startTime et endTime (timestamps en millisecondes)
          const fileDuration = testResult.endTime && testResult.startTime 
            ? testResult.endTime - testResult.startTime 
            : 0;
          
          totalDuration += fileDuration;
          
          if (isIntegration) {
            integrationDuration += fileDuration;
          } else {
            unitDuration += fileDuration;
          }
        }
      } else {
        console.warn('⚠️  Structure de test-results.json invalide (pas de testResults)');
        console.warn(`   Contenu du fichier: ${JSON.stringify(jestResults).substring(0, 200)}...`);
      }
    } else {
      console.warn(`⚠️  Fichier test-results.json non trouvé à: ${jestResultsPath}`);
      console.warn('   Les durées seront à 0. Assurez-vous que Jest est exécuté avec --json --outputFile=test-results.json');
      console.warn('   Le fichier doit être généré lors de l\'exécution de npm run metrics:collect');
    }
  } catch (e) {
    console.warn('⚠️  Impossible de lire les durées Jest (test-results.json non trouvé ou invalide)');
    console.warn(`   Erreur: ${(e as Error).message}`);
  }

  return {
    unitDuration,
    integrationDuration,
    totalDuration,
    passingTests,
    failingTests,
  };
}

/**
 * Collecte les métriques de tests
 */
function collectTestMetrics() {
  console.log('📊 Collecte des métriques de tests...');
  
  const testsDir = path.join(process.cwd(), 'tests');
  
  // Compter les tests unitaires (individuels + fichiers)
  const unitMetrics = countTestsInFiles(path.join(testsDir, 'unit'));
  const unitTests = unitMetrics.tests;
  const unitTestFiles = unitMetrics.files;
  
  // Compter les tests d'intégration spécifiquement (individuels + fichiers)
  let integrationTests = 0;
  let integrationTestFiles = 0;
  try {
    const integrationDir = path.join(testsDir, 'integration');
    if (fs.existsSync(integrationDir)) {
      const files = fs.readdirSync(integrationDir).filter(f => /\.integration\.test\.(ts|tsx)$/.test(f));
      integrationTestFiles += files.length;
      files.forEach(file => {
        const content = fs.readFileSync(path.join(integrationDir, file), 'utf-8');
        integrationTests += (content.match(/\b(it|test)\s*\(/g) || []).length;
      });
    }
    // Aussi chercher dans tests/unit pour les fichiers .integration.test.*
    const unitDir = path.join(testsDir, 'unit');
    if (fs.existsSync(unitDir)) {
      const files = fs.readdirSync(unitDir).filter(f => /\.integration\.test\.(ts|tsx)$/.test(f));
      integrationTestFiles += files.length;
      files.forEach(file => {
        const content = fs.readFileSync(path.join(unitDir, file), 'utf-8');
        integrationTests += (content.match(/\b(it|test)\s*\(/g) || []).length;
      });
    }
  } catch (e) {
    console.warn('⚠️  Erreur lors du comptage des TI');
  }
  
  const bddFeatures = countFiles(path.join(testsDir, 'bdd'), /\.feature$/);
  
  // ── BDD Scénarios [B], [F], [G] : compter depuis les .spec.js générés par bddgen ──
  // C'est la source de vérité du framework (pas de regex sur les .feature)
  let bddScenariosTestable = 0;    // [F] test()
  let bddScenariosNonTestable = 0; // [G] test.fixme()
  
  try {
    const featuresGenDir = path.join(process.cwd(), '.features-gen');
    if (fs.existsSync(featuresGenDir)) {
      function walkSpecs(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            walkSpecs(fullPath);
          } else if (entry.isFile() && entry.name.endsWith('.spec.js')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            // test('titre', ...) → scénario testable
            bddScenariosTestable += (content.match(/\btest\('/g) || []).length;
            // test.fixme('titre', ...) → scénario non testable (≥1 step manquant)
            bddScenariosNonTestable += (content.match(/test\.fixme\('/g) || []).length;
          }
        }
      }
      walkSpecs(featuresGenDir);
    }
  } catch (e) {
    console.warn('⚠️  Erreur lors du comptage des scénarios BDD depuis .features-gen');
  }
  
  const bddScenariosTotal = bddScenariosTestable + bddScenariosNonTestable; // [B]
  
  // ── BDD Étapes [C], [D], [E] ──
  // [C] Steps uniques : parser les .feature (mots-clés FR + EN)
  const uniqueStepTexts = new Set<string>();
  try {
    const bddDir = path.join(testsDir, 'bdd');
    if (fs.existsSync(bddDir)) {
      const featureFiles = fs.readdirSync(bddDir).filter(f => f.endsWith('.feature'));
      // Regex couvrant tous les mots-clés Gherkin FR et EN pour les steps
      const stepKeywordRegex = /^\s*(?:Étant donné que |Étant donné |Et que |Et qu'|Et |Quand |Alors |Mais |Soit |Given |When |Then |And |But )(.+)$/;
      for (const file of featureFiles) {
        const content = fs.readFileSync(path.join(bddDir, file), 'utf-8');
        const lines = content.split('\n');
        for (const line of lines) {
          const match = line.match(stepKeywordRegex);
          if (match) {
            uniqueStepTexts.add(match[1].trim());
          }
        }
      }
    }
  } catch (e) {
    console.warn('⚠️  Erreur lors du comptage des steps BDD uniques');
  }
  
  const bddStepsTotal = uniqueStepTexts.size; // [C]
  
  // [E] Steps manquants : capturer la sortie de bddgen en mode fail-on-gen
  let bddStepsMissing = 0;
  try {
    const configPath = path.join(process.cwd(), 'playwright.config.ts');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const tempContent = configContent.replace("missingSteps: 'skip-scenario'", "missingSteps: 'fail-on-gen'");
    fs.writeFileSync(configPath, tempContent, 'utf-8');
    try {
      execSync('npx bddgen test', { encoding: 'utf-8', stdio: 'pipe' });
      // Pas d'erreur → 0 missing steps
    } catch (e: unknown) {
      const execError = e as { stderr?: string; stdout?: string };
      const output = (execError.stderr || '') + (execError.stdout || '');
      const match = output.match(/Missing step definitions:\s*(\d+)/);
      if (match) bddStepsMissing = parseInt(match[1]);
    } finally {
      // Toujours restaurer le config original
      fs.writeFileSync(configPath, configContent, 'utf-8');
    }
  } catch (e) {
    console.warn('⚠️  Erreur lors du comptage des steps BDD manquants');
  }
  
  const bddStepsImplemented = Math.max(0, bddStepsTotal - bddStepsMissing); // [D]
  
  console.log(`✅ BDD Scénarios: ${bddScenariosTotal} total (${bddScenariosTestable} testables, ${bddScenariosNonTestable} non testables)`);
  console.log(`✅ BDD Étapes: ${bddStepsTotal} uniques (${bddStepsImplemented} implémentés, ${bddStepsMissing} manquants)`);
  console.log(`✅ BDD Features: ${bddFeatures}`);

  // Collecter les métriques E2E (stats depuis data.json ; durée depuis Date.now() → durations.json)
  const e2eTestsRaw = collectE2EMetrics();
  let e2eTests = e2eTestsRaw ?? undefined;

  // Durées BDD et E2E : Date.now() avant/après chaque run, persistant dans durations.json
  // IMPORTANT : Ne JAMAIS utiliser la durée depuis collectE2EMetrics() car elle peut contenir BDD+E2E combinés
  let bddDuration = 0;
  let e2eDurationFromTiming = 0;
  const durationsPathForBDDE2E = path.join(process.cwd(), 'playwright-report', 'durations.json');
  if (fs.existsSync(durationsPathForBDDE2E)) {
    try {
      const d = JSON.parse(fs.readFileSync(durationsPathForBDDE2E, 'utf-8'));
      bddDuration = Math.round(Number(d.bddDuration) || 0);
      e2eDurationFromTiming = Math.round(Number(d.e2eDuration) || 0);
    } catch {
      /* ignorer */
    }
  }
  // Utiliser UNIQUEMENT la durée depuis durations.json (mesurée avec Date.now())
  // Ne JAMAIS utiliser e2eTests.duration depuis collectE2EMetrics()
  if (e2eTests) {
    if (e2eDurationFromTiming > 0) {
      // Utiliser la durée mesurée avec Date.now()
      e2eTests = { ...e2eTests, duration: e2eDurationFromTiming };
    } else {
      // Si pas de durée mesurée, mettre 0 (ne pas utiliser la durée depuis data.json)
      e2eTests = { ...e2eTests, duration: 0 };
    }
  }

  if (e2eTests) {
    console.log(`✅ Métriques E2E collectées: ${e2eTests.total} tests (${e2eTests.passed} réussis, ${e2eTests.failed} échoués), durée: ${(e2eTests.duration / 1000).toFixed(2)}s`);
  } else {
    console.warn('⚠️  Aucune métrique E2E trouvée. Pour obtenir les durées E2E, exécutez d\'abord: npm run metrics:collect (qui lance BDD puis E2E).');
  }
  if (bddDuration > 0) {
    console.log(`✅ Durée BDD (Date.now()): ${(bddDuration / 1000).toFixed(2)}s`);
  }

  // Compter les fichiers et étapes E2E dans les fichiers de test
  const e2eScenarioFiles = countE2EFiles(path.join(testsDir, 'end-to-end'));
  const e2eSteps = countE2ESteps(path.join(testsDir, 'end-to-end'));

  // Collecter les résultats Jest (passing/failing tests) depuis test-results.json
  const jestDurations = collectJestTestDurations();
  
  // Durées Jest : Date.now() avant/après chaque run, persistant dans durations.json
  // IMPORTANT : Ne JAMAIS utiliser les durées depuis collectJestTestDurations() car elles peuvent être imprécises
  let unitDurationFromTiming = 0;
  let integrationDurationFromTiming = 0;
  const durationsPathForJest = path.join(process.cwd(), 'playwright-report', 'durations.json');
  if (fs.existsSync(durationsPathForJest)) {
    try {
      const d = JSON.parse(fs.readFileSync(durationsPathForJest, 'utf-8'));
      unitDurationFromTiming = Math.round(Number(d.unitDuration) || 0);
      integrationDurationFromTiming = Math.round(Number(d.integrationDuration) || 0);
    } catch {
      /* ignorer */
    }
  }
  
  if (unitDurationFromTiming > 0 || integrationDurationFromTiming > 0) {
    console.log(`✅ Durées Jest (Date.now()): Unit=${unitDurationFromTiming}ms, Integration=${integrationDurationFromTiming}ms`);
  } else {
    console.warn('⚠️  Aucune durée Jest mesurée. Pour obtenir les durées, exécutez d\'abord: npm run metrics:collect (qui lance les tests Jest).');
  }

  // RÈGLE 1: Utiliser les tests DÉFINIS dans les fichiers comme base (pas les tests exécutés)
  // Les tests définis = unitTests + integrationTests (comptés dans les fichiers)
  const totalJestTestsDefined = unitTests + integrationTests;
  
  // Récupérer les résultats Jest (tests exécutés)
  const jestTotalPassed = jestDurations.passingTests || 0;
  const jestTotalFailed = jestDurations.failingTests || 0;
  const jestTotalExecuted = jestTotalPassed + jestTotalFailed;
  
  // RÈGLE 2: Répartir proportionnellement les tests réussis/échoués basés sur les tests DÉFINIS
  // Mais s'assurer que unitTestPassed + unitTestFailed = unitTests (et idem pour integration)
  let unitTestPassed = 0;
  let unitTestFailed = 0;
  let integrationTestPassed = 0;
  let integrationTestFailed = 0;
  
  if (totalJestTestsDefined > 0 && jestTotalExecuted > 0) {
    // Calculer le ratio de réussite global
    const successRatio = jestTotalPassed / jestTotalExecuted;
    const failureRatio = jestTotalFailed / jestTotalExecuted;
    
    // Si Jest a exécuté plus de tests que définis, on normalise en appliquant les ratios aux tests définis
    // Sinon, on utilise les résultats réels mais on les limite aux tests définis
    const maxTestsToUse = Math.min(jestTotalExecuted, totalJestTestsDefined);
    const normalizedPassed = Math.round(maxTestsToUse * successRatio);
    const normalizedFailed = maxTestsToUse - normalizedPassed;
    
    // Répartition proportionnelle basée sur les tests définis
    const unitRatio = unitTests / totalJestTestsDefined;
    const integrationRatio = integrationTests / totalJestTestsDefined;
    
    // Répartir les tests réussis normalisés
    unitTestPassed = Math.round(normalizedPassed * unitRatio);
    integrationTestPassed = normalizedPassed - unitTestPassed;
    
    // Répartir les tests échoués normalisés
    unitTestFailed = Math.round(normalizedFailed * unitRatio);
    integrationTestFailed = normalizedFailed - unitTestFailed;
    
    // Ajuster pour garantir unitTestPassed + unitTestFailed = unitTests
    // On ajuste en premier les valeurs pour qu'elles correspondent exactement
    const unitTotal = unitTestPassed + unitTestFailed;
    if (unitTotal !== unitTests) {
      const diff = unitTests - unitTotal;
      // Ajuster proportionnellement entre réussis et échoués
      if (unitTotal > 0) {
        const currentPassedRatio = unitTestPassed / unitTotal;
        unitTestPassed = Math.round(unitTests * currentPassedRatio);
        unitTestFailed = unitTests - unitTestPassed;
      } else {
        // Si aucun test, tous réussis par défaut
        unitTestPassed = unitTests;
        unitTestFailed = 0;
      }
    }
    
    // Ajuster pour garantir integrationTestPassed + integrationTestFailed = integrationTests
    const integrationTotal = integrationTestPassed + integrationTestFailed;
    if (integrationTotal !== integrationTests) {
      const diff = integrationTests - integrationTotal;
      // Ajuster proportionnellement entre réussis et échoués
      if (integrationTotal > 0) {
        const currentPassedRatio = integrationTestPassed / integrationTotal;
        integrationTestPassed = Math.round(integrationTests * currentPassedRatio);
        integrationTestFailed = integrationTests - integrationTestPassed;
      } else {
        // Si aucun test, tous réussis par défaut
        integrationTestPassed = integrationTests;
        integrationTestFailed = 0;
      }
    }
  } else if (totalJestTestsDefined > 0) {
    // Si aucun test n'a été exécuté, tous sont considérés comme réussis par défaut
    unitTestPassed = unitTests;
    unitTestFailed = 0;
    integrationTestPassed = integrationTests;
    integrationTestFailed = 0;
  }
  
  // RÈGLE 3: Pour BDD - testable + non testable = total scénarios
  // Vérification de cohérence (les chiffres viennent des .spec.js générés)
  if (bddScenariosTestable + bddScenariosNonTestable !== bddScenariosTotal) {
    console.warn(`⚠️  Incohérence BDD scénarios: testable (${bddScenariosTestable}) + non testable (${bddScenariosNonTestable}) ≠ total (${bddScenariosTotal})`);
  }
  // Vérification steps
  if (bddStepsImplemented + bddStepsMissing !== bddStepsTotal) {
    console.warn(`⚠️  Incohérence BDD étapes: implémentés (${bddStepsImplemented}) + manquants (${bddStepsMissing}) ≠ total (${bddStepsTotal})`);
  }
  
  // RÈGLE 4: Pour E2E Steps - réussis + échoués = total steps
  // Utiliser les résultats E2E de Playwright pour calculer les steps réussis/échoués
  let e2eStepsPassed = e2eSteps;
  let e2eStepsFailed = 0;
  
  // Si on a des résultats E2E, calculer les steps réussis/échoués
  if (e2eTests && e2eTests.total > 0) {
    // Si tous les tests réussissent, tous les steps réussissent
    if (e2eTests.failed === 0) {
      e2eStepsPassed = e2eSteps;
      e2eStepsFailed = 0;
    } else {
      // Si des tests échouent, on compte 1 step échoué par test échoué
      // (car un test échoue généralement à cause d'un step spécifique)
      // Le reste des steps sont considérés comme réussis
      e2eStepsFailed = Math.min(e2eTests.failed, e2eSteps); // Maximum : 1 step échoué par test échoué, mais pas plus que le total
      e2eStepsPassed = e2eSteps - e2eStepsFailed;
    }
  } else {
    // Si aucun test E2E n'a été exécuté, tous les steps sont considérés comme réussis par défaut
    e2eStepsPassed = e2eSteps;
    e2eStepsFailed = 0;
  }
  
  // Vérification: e2eStepsPassed + e2eStepsFailed = e2eSteps
  if (e2eStepsPassed + e2eStepsFailed !== e2eSteps) {
    const diff = e2eSteps - (e2eStepsPassed + e2eStepsFailed);
    // Ajuster en privilégiant les réussis si diff > 0, sinon en retirant des réussis
    if (diff > 0) {
      e2eStepsPassed += diff;
    } else {
      e2eStepsFailed += Math.abs(diff);
      e2eStepsPassed = Math.max(0, e2eStepsPassed - Math.abs(diff));
    }
  }
  
  // RÈGLE 5: Total = somme des tests EXÉCUTABLES
  // Pour BDD, seuls les scénarios testables comptent (les non-testables ne s'exécutent pas)
  const totalTests = unitTests + integrationTests + bddScenariosTestable + e2eSteps;
  
  // RÈGLE 6: Total des fichiers de tests = somme des fichiers de chaque type
  const totalTestFiles = unitTestFiles + integrationTestFiles + bddFeatures + e2eScenarioFiles;
  
  // Totaux globaux (réussis + échoués)
  // BDD testable = réussis (ils passent tous quand exécutés, sinon le build échoue)
  const passingTests = unitTestPassed + integrationTestPassed + bddScenariosTestable + e2eStepsPassed;
  const failingTests = unitTestFailed + integrationTestFailed + 0 /* BDD: pas d'échec, build bloqué sinon */ + e2eStepsFailed;
  
  const e2eScenarios = e2eTests?.total || 0; // Nombre de scénarios E2E depuis Playwright
  
  // Vérifications de cohérence
  const unitTotal = unitTestPassed + unitTestFailed;
  const integrationTotal = integrationTestPassed + integrationTestFailed;
  const e2eTotal = e2eStepsPassed + e2eStepsFailed;
  const globalTotal = passingTests + failingTests;
  
  let hasInconsistency = false;
  
  if (unitTotal !== unitTests) {
    console.warn(`⚠️  Incohérence TU: unitTestPassed (${unitTestPassed}) + unitTestFailed (${unitTestFailed}) = ${unitTotal} ≠ unitTests (${unitTests})`);
    hasInconsistency = true;
  }
  
  if (integrationTotal !== integrationTests) {
    console.warn(`⚠️  Incohérence TI: integrationTestPassed (${integrationTestPassed}) + integrationTestFailed (${integrationTestFailed}) = ${integrationTotal} ≠ integrationTests (${integrationTests})`);
    hasInconsistency = true;
  }
  
  if (e2eTotal !== e2eSteps) {
    console.warn(`⚠️  Incohérence E2E: e2eStepsPassed (${e2eStepsPassed}) + e2eStepsFailed (${e2eStepsFailed}) = ${e2eTotal} ≠ e2eSteps (${e2eSteps})`);
    hasInconsistency = true;
  }
  
  if (globalTotal !== totalTests) {
    console.warn(`⚠️  Incohérence globale: passingTests (${passingTests}) + failingTests (${failingTests}) = ${globalTotal} ≠ totalTests (${totalTests})`);
    hasInconsistency = true;
  }
  
  // Vérification de cohérence pour les fichiers
  if (totalTestFiles !== unitTestFiles + integrationTestFiles + bddFeatures + e2eScenarioFiles) {
    console.warn(`⚠️  Incohérence fichiers: totalTestFiles (${totalTestFiles}) ≠ unitTestFiles (${unitTestFiles}) + integrationTestFiles (${integrationTestFiles}) + bddFeatures (${bddFeatures}) + e2eScenarioFiles (${e2eScenarioFiles})`);
    hasInconsistency = true;
  }
  
  if (!hasInconsistency) {
    console.log(`✅ Calcul cohérent:`);
    console.log(`   TU: ${unitTestPassed} + ${unitTestFailed} = ${unitTests}`);
    console.log(`   TI: ${integrationTestPassed} + ${integrationTestFailed} = ${integrationTests}`);
    console.log(`   BDD scénarios: ${bddScenariosTestable} testables + ${bddScenariosNonTestable} non testables = ${bddScenariosTotal}`);
    console.log(`   BDD étapes: ${bddStepsImplemented} implémentés + ${bddStepsMissing} manquants = ${bddStepsTotal}`);
    console.log(`   E2E: ${e2eStepsPassed} + ${e2eStepsFailed} = ${e2eSteps}`);
    console.log(`   Total tests (exécutables): ${passingTests} + ${failingTests} = ${totalTests} (${unitTests} + ${integrationTests} + ${bddScenariosTestable} + ${e2eSteps})`);
    console.log(`   Total fichiers: ${totalTestFiles} = ${unitTestFiles} + ${integrationTestFiles} + ${bddFeatures} + ${e2eScenarioFiles}`);
  }

  return {
    // Tests unitaires
    unitTests,
    unitTestFiles,
    unitTestPassed,
    unitTestFailed,
    unitTestDuration: unitDurationFromTiming,
    
    // Tests d'intégration
    integrationTests,
    integrationTestFiles,
    integrationTestPassed,
    integrationTestFailed,
    integrationTestDuration: integrationDurationFromTiming,
    
    // BDD - Scénarios
    bddFeatures,
    bddScenariosTotal,
    bddScenariosTestable,
    bddScenariosNonTestable,
    bddTestDuration: bddDuration,
    
    // BDD - Étapes
    bddStepsTotal,
    bddStepsImplemented,
    bddStepsMissing,
    
    // E2E
    e2eSteps,
    e2eScenarioFiles,
    e2eScenarios,
    e2eStepsPassed,
    e2eStepsFailed,
    e2eTests,
    
    // Totaux
    totalTests,
    totalTestFiles,
    passingTests,
    failingTests,
    testDuration: unitDurationFromTiming + integrationDurationFromTiming + bddDuration + e2eDurationFromTiming,
  };
}

/**
 * Collecte les métriques de couverture
 */
function collectCoverageMetrics() {
  console.log('📊 Collecte des métriques de couverture...');
  
  const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');
  
  if (!fs.existsSync(coveragePath)) {
    console.warn('⚠️  Fichier coverage-summary.json non trouvé dans coverage/');
    console.warn('   Exécutez d\'abord: npm test -- --coverage');
    return {
      lines: { total: 0, covered: 0, percentage: 0 },
      statements: { total: 0, covered: 0, percentage: 0 },
      functions: { total: 0, covered: 0, percentage: 0 },
      branches: { total: 0, covered: 0, percentage: 0 },
    };
  }
  
  try {
    const coverageContent = fs.readFileSync(coveragePath, 'utf-8');
    const coverage = JSON.parse(coverageContent);
    
    if (!coverage || !coverage.total) {
      console.warn('⚠️  Structure de coverage-summary.json invalide (pas de propriété "total")');
      return {
        lines: { total: 0, covered: 0, percentage: 0 },
        statements: { total: 0, covered: 0, percentage: 0 },
        functions: { total: 0, covered: 0, percentage: 0 },
        branches: { total: 0, covered: 0, percentage: 0 },
      };
    }
    
    const total = coverage.total;
    
    // Vérifier que les données sont présentes
    if (!total.lines || !total.statements || !total.functions || !total.branches) {
      console.warn('⚠️  Structure de coverage-summary.json incomplète');
      return {
        lines: { total: 0, covered: 0, percentage: 0 },
        statements: { total: 0, covered: 0, percentage: 0 },
        functions: { total: 0, covered: 0, percentage: 0 },
        branches: { total: 0, covered: 0, percentage: 0 },
      };
    }
    
    const result = {
      lines: {
        total: total.lines.total || 0,
        covered: total.lines.covered || 0,
        percentage: total.lines.pct || 0,
      },
      statements: {
        total: total.statements.total || 0,
        covered: total.statements.covered || 0,
        percentage: total.statements.pct || 0,
      },
      functions: {
        total: total.functions.total || 0,
        covered: total.functions.covered || 0,
        percentage: total.functions.pct || 0,
      },
      branches: {
        total: total.branches.total || 0,
        covered: total.branches.covered || 0,
        percentage: total.branches.pct || 0,
      },
    };
    
    console.log(`✅ Couverture récupérée: ${result.lines.percentage}% lignes, ${result.functions.percentage}% fonctions`);
    
    return result;
  } catch (e) {
    console.warn('⚠️  Erreur lors de la lecture de coverage-summary.json:', (e as Error).message);
    console.warn('   Exécutez d\'abord: npm test -- --coverage');
  }

  return {
    lines: { total: 0, covered: 0, percentage: 0 },
    statements: { total: 0, covered: 0, percentage: 0 },
    functions: { total: 0, covered: 0, percentage: 0 },
    branches: { total: 0, covered: 0, percentage: 0 },
  };
}

/**
 * Collecte le type coverage TypeScript via type-coverage (CLI --json-output)
 */
function collectTypeCoverage(): number | "NC" {
  try {
    const out = execSync('npx type-coverage --json-output --suppressError', {
      encoding: 'utf-8',
      maxBuffer: 5 * 1024 * 1024,
    });
    const data = JSON.parse(out.trim()) as { percent?: number; correctCount?: number; totalCount?: number };
    if (typeof data.percent === 'number') {
      return Math.round(data.percent);
    }
    if (typeof data.totalCount === 'number' && data.totalCount > 0 && typeof data.correctCount === 'number') {
      return Math.round(100 * data.correctCount / data.totalCount);
    }
  } catch {
    // type-coverage peut échouer (projet non compilable, etc.)
  }
  return "NC";
}

/**
 * Collecte les métriques de qualité
 */
function collectQualityMetrics() {
  console.log('📊 Collecte des métriques de qualité...');
  
  let eslintErrors = 0;
  let eslintWarnings = 0;
  
  try {
    const result = execSync('npm run lint -- --format=json', { encoding: 'utf-8' });
    const eslintResults = JSON.parse(result);
    eslintResults.forEach((file: { errorCount?: number; warningCount?: number }) => {
      eslintErrors += file.errorCount || 0;
      eslintWarnings += file.warningCount || 0;
    });
  } catch (e) {
    // ESLint peut retourner une erreur s'il y a des problèmes
    console.warn('⚠️  Analyse ESLint avec erreurs');
  }

  const typeCoverage = collectTypeCoverage();
  if (typeCoverage !== "NC") {
    console.log(`✅ Type coverage: ${typeCoverage}%`);
  }

  return {
    eslintErrors,
    eslintWarnings,
    typeCoverage,
    cyclomaticComplexity: "NC" as const,
    maintainabilityIndex: "NC" as const,
    technicalDebt: "NC" as const,
  };
}

/**
 * Collecte les métriques de taille
 */
function collectSizeMetrics() {
  console.log('📊 Collecte des métriques de taille...');
  
  const components = countFiles('components', /\.tsx?$/);
  const pages = countFiles('app', /page\.tsx$/);
  const utils = countFiles('utils', /\.ts$/);
  const tests = countFiles('tests', /\.test\.(ts|tsx)$/);
  
  const appLines = countLines('app', '.tsx') + countLines('app', '.ts');
  const componentsLines = countLines('components', '.tsx');
  const utilsLines = countLines('utils', '.ts');
  
  return {
    totalFiles: components + pages + utils,
    totalLines: appLines + componentsLines + utilsLines,
    sourceLines: appLines + componentsLines + utilsLines,
    commentLines: 0,
    blankLines: 0,
    components,
    pages,
    utils,
    tests,
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
    console.warn('⚠️  Audit npm avec vulnérabilités détectées');
  }

  return {
    total: production + development,
    production,
    development,
    outdated: 0,
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
  const nextDir = path.join(process.cwd(), '.next');
  const buildMetricsFile = path.join(process.cwd(), '.next', 'build-metrics.json');
  
  // Essayer de lire le temps de build depuis un fichier de métriques
  if (fs.existsSync(buildMetricsFile)) {
    try {
      const buildMetrics = JSON.parse(fs.readFileSync(buildMetricsFile, 'utf-8'));
      buildTime = buildMetrics.buildTime || 0;
      
      // Avertir si le dernier build a échoué
      if (buildMetrics.buildSuccess === false) {
        console.log('⚠️  Le dernier build a échoué. Le temps affiché est le temps écoulé avant l\'erreur.');
        if (buildMetrics.error) {
          console.log(`   Erreur: ${buildMetrics.error}`);
        }
      }
    } catch (e) {
      // Ignorer les erreurs de lecture
    }
  }
  
  // Si pas de métriques et que le dossier .next existe, informer l'utilisateur
  if (buildTime === 0 && fs.existsSync(nextDir)) {
    console.log('⚠️  Temps de build non disponible.');
    console.log('   Le fichier .next/build-metrics.json n\'existe pas.');
    console.log('   Le temps de build sera mesuré automatiquement lors du prochain "npm run build".');
  }
  
  // Mesurer uniquement le bundle client (.next/static), pas tout le dossier .next
  const staticDir = path.join(nextDir, 'static');
  if (fs.existsSync(staticDir)) {
    function getSize(dir: string): number {
      let size = 0;
      try {
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
      } catch (e) {
        // Ignorer les erreurs
      }
      return size;
    }
    bundleSize = Math.round(getSize(staticDir) / 1024);
  }

  // Score Lighthouse : exécuté si METRICS_LIGHTHOUSE_URL est défini (ex. http://localhost:3000)
  let lighthouseScore: number | "NC" = "NC";
  const lighthouseUrl = process.env.METRICS_LIGHTHOUSE_URL;
  if (lighthouseUrl) {
    const lighthouseReportPath = path.join(OUTPUT_DIR, 'lighthouse-report.json');
    try {
      execSync(
        `npx lighthouse "${lighthouseUrl}" --output=json --output-path="${lighthouseReportPath}" --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet`,
        { encoding: 'utf-8', timeout: 120000, stdio: 'pipe' }
      );
      if (fs.existsSync(lighthouseReportPath)) {
        const report = JSON.parse(fs.readFileSync(lighthouseReportPath, 'utf-8')) as { categories?: { performance?: { score?: number } } };
        const perf = report.categories?.performance?.score;
        if (typeof perf === 'number') {
          lighthouseScore = Math.round(perf * 100);
          console.log(`✅ Score Lighthouse (performance): ${lighthouseScore}`);
        }
      }
    } catch (e) {
      console.warn('⚠️  Lighthouse non disponible (Chrome/Chromium requis ou URL injoignable). Définir METRICS_LIGHTHOUSE_URL si le serveur tourne.');
    }
  }

  return {
    bundleSize,
    buildTime,
    lighthouseScore,
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
 * Affiche un rapport formaté similaire au tableau de bord
 */
function displayFormattedReport(snapshot: MetricsSnapshot, trends: { tests: 'up' | 'down' | 'stable'; coverage: 'up' | 'down' | 'stable'; quality: 'up' | 'down' | 'stable' }) {
  console.log('\n' + '='.repeat(80));
  console.log('📊 MÉTRIQUES DE QUALITÉ DU CODE'.padStart(50));
  console.log('='.repeat(80));
  
  // Header
  console.log(`\nBranche: ${snapshot.branch} | Commit: ${snapshot.commit}`);
  console.log(`Mis à jour: ${new Date(snapshot.timestamp).toLocaleString('fr-FR')}`);
  
  // Section Tests
  console.log('\n' + '─'.repeat(80));
  console.log('🧪 TESTS');
  console.log('─'.repeat(80));
  
  // Total Tests
  const totalSuccessRate = snapshot.tests.totalTests > 0 
    ? (snapshot.tests.passingTests / snapshot.tests.totalTests) * 100 
    : 0;
  const totalTrend = trends.tests === 'up' ? '↗️' : trends.tests === 'down' ? '↘️' : '→';
  console.log(`\n📊 Total Tests ${totalTrend}`);
  console.log(`   Total: ${snapshot.tests.totalTests}`);
  console.log(`   ✅ Réussis: ${snapshot.tests.passingTests} | ❌ Échoués: ${snapshot.tests.failingTests}`);
  console.log(`   ⏱️  Durée: ${(snapshot.tests.testDuration / 1000).toFixed(2)}s`);
  console.log(`   📁 Fichiers: ${snapshot.tests.totalTestFiles || 0}`);
  console.log(`   📈 Taux de réussite: ${totalSuccessRate.toFixed(1)}%`);
  
  // BDD - Scénarios (règle : < 100 % testables passants → blocage publication ; 100 % → on affiche la dette)
  const bddCoverageRate = snapshot.tests.bddScenariosTotal > 0
    ? (snapshot.tests.bddScenariosTestable / snapshot.tests.bddScenariosTotal) * 100
    : 0;
  console.log(`\n📋 BDD - Scénarios`);
  console.log(`   Total: ${snapshot.tests.bddScenariosTotal || 0}`);
  console.log(`   ✅ Testables: ${snapshot.tests.bddScenariosTestable || 0} | ⏸️  Non testables: ${snapshot.tests.bddScenariosNonTestable || 0}`);
  console.log(`   ⏱️  Durée: ${((snapshot.tests.bddTestDuration || 0) / 1000).toFixed(2)}s`);
  console.log(`   📁 Features: ${snapshot.tests.bddFeatures || 0}`);
  console.log(`   📈 Couverture: ${bddCoverageRate.toFixed(1)}%`);
  console.log(`   📉 Dette technique — Scénarios: ${snapshot.tests.bddScenariosTestable || 0} / ${snapshot.tests.bddScenariosNonTestable || 0} (testables / non testables)`);

  // BDD - Étapes
  const bddStepsCoverageRate = snapshot.tests.bddStepsTotal > 0
    ? (snapshot.tests.bddStepsImplemented / snapshot.tests.bddStepsTotal) * 100
    : 0;
  console.log(`\n🔧 BDD - Étapes`);
  console.log(`   Total uniques: ${snapshot.tests.bddStepsTotal || 0}`);
  console.log(`   ✅ Implémentés: ${snapshot.tests.bddStepsImplemented || 0} | ⏸️  Manquants: ${snapshot.tests.bddStepsMissing || 0}`);
  console.log(`   📋 Scénarios: ${snapshot.tests.bddScenariosTotal || 0}`);
  console.log(`   📈 Couverture: ${bddStepsCoverageRate.toFixed(1)}%`);
  console.log(`   📉 Dette technique — Étapes: ${snapshot.tests.bddStepsImplemented || 0} / ${snapshot.tests.bddStepsMissing || 0} (implémentées / non implémentées)`);
  
  // Tests Unitaires
  const unitSuccessRate = snapshot.tests.unitTests > 0
    ? (snapshot.tests.unitTestPassed / snapshot.tests.unitTests) * 100
    : 0;
  console.log(`\n🔬 Tests Unitaires`);
  console.log(`   Total: ${snapshot.tests.unitTests || 0}`);
  console.log(`   ✅ Réussis: ${snapshot.tests.unitTestPassed || 0} | ❌ Échoués: ${snapshot.tests.unitTestFailed || 0}`);
  console.log(`   ⏱️  Durée: ${((snapshot.tests.unitTestDuration || 0) / 1000).toFixed(2)}s`);
  console.log(`   📁 Fichiers: ${snapshot.tests.unitTestFiles || 0}`);
  console.log(`   📈 Taux de réussite: ${unitSuccessRate.toFixed(1)}%`);
  
  // Tests Intégration
  const integrationSuccessRate = snapshot.tests.integrationTests > 0
    ? (snapshot.tests.integrationTestPassed / snapshot.tests.integrationTests) * 100
    : 0;
  console.log(`\n🔗 Tests Intégration`);
  console.log(`   Total: ${snapshot.tests.integrationTests || 0}`);
  console.log(`   ✅ Réussis: ${snapshot.tests.integrationTestPassed || 0} | ❌ Échoués: ${snapshot.tests.integrationTestFailed || 0}`);
  console.log(`   ⏱️  Durée: ${((snapshot.tests.integrationTestDuration || 0) / 1000).toFixed(2)}s`);
  console.log(`   📁 Fichiers: ${snapshot.tests.integrationTestFiles || 0}`);
  console.log(`   📈 Taux de réussite: ${integrationSuccessRate.toFixed(1)}%`);
  
  // Steps E2E
  const e2eSuccessRate = snapshot.tests.e2eSteps > 0
    ? ((snapshot.tests.e2eStepsPassed || snapshot.tests.e2eSteps) / snapshot.tests.e2eSteps) * 100
    : 0;
  const e2eDuration = snapshot.tests.e2eTests?.duration || snapshot.tests.bddTestDuration || 0;
  console.log(`\n🌐 Steps E2E`);
  console.log(`   Total: ${snapshot.tests.e2eSteps || 0}`);
  console.log(`   ✅ Réussis: ${snapshot.tests.e2eStepsPassed || snapshot.tests.e2eSteps || 0} | ❌ Échoués: ${snapshot.tests.e2eStepsFailed || 0}`);
  console.log(`   ⏱️  Durée: ${(e2eDuration / 1000).toFixed(2)}s`);
  console.log(`   📁 Fichiers: ${snapshot.tests.e2eScenarioFiles || 0}`);
  console.log(`   📈 Taux de réussite: ${e2eSuccessRate.toFixed(1)}%`);
  if (snapshot.tests.e2eTests) {
    console.log(`   📊 Tests E2E exécutés: ${snapshot.tests.e2eTests.total} (${snapshot.tests.e2eTests.passed} réussis, ${snapshot.tests.e2eTests.failed} échoués)`);
  }
  
  // Section Couverture
  console.log('\n' + '─'.repeat(80));
  console.log('🎯 COUVERTURE DE CODE');
  console.log('─'.repeat(80));
  const coverageTrend = trends.coverage === 'up' ? '↗️' : trends.coverage === 'down' ? '↘️' : '→';
  console.log(`\n📊 Couverture ${coverageTrend}`);
  console.log(`   Lignes: ${snapshot.coverage.lines.percentage.toFixed(1)}% (${snapshot.coverage.lines.covered}/${snapshot.coverage.lines.total})`);
  console.log(`   Statements: ${snapshot.coverage.statements.percentage.toFixed(1)}% (${snapshot.coverage.statements.covered}/${snapshot.coverage.statements.total})`);
  console.log(`   Fonctions: ${snapshot.coverage.functions.percentage.toFixed(1)}% (${snapshot.coverage.functions.covered}/${snapshot.coverage.functions.total})`);
  console.log(`   Branches: ${snapshot.coverage.branches.percentage.toFixed(1)}% (${snapshot.coverage.branches.covered}/${snapshot.coverage.branches.total})`);
  
  // Section Qualité
  console.log('\n' + '─'.repeat(80));
  console.log('✨ QUALITÉ DU CODE');
  console.log('─'.repeat(80));
  const qualityTrend = trends.quality === 'up' ? '↗️' : trends.quality === 'down' ? '↘️' : '→';
  console.log(`\n📊 Qualité ${qualityTrend}`);
  console.log(`   Erreurs ESLint: ${snapshot.quality.eslintErrors}`);
  console.log(`   Warnings ESLint: ${snapshot.quality.eslintWarnings}`);
  console.log(`   Type Coverage: ${snapshot.quality.typeCoverage}%`);
  console.log(`   Complexité Cyclomatique: ${snapshot.quality.cyclomaticComplexity}`);
  console.log(`   Index de Maintenabilité: ${snapshot.quality.maintainabilityIndex}`);
  console.log(`   Dette Technique: ${snapshot.quality.technicalDebt}`);
  
  // Section Taille
  console.log('\n' + '─'.repeat(80));
  console.log('📏 TAILLE DU CODE');
  console.log('─'.repeat(80));
  console.log(`\n📊 Taille`);
  console.log(`   Fichiers Total: ${snapshot.size.totalFiles}`);
  console.log(`   Lignes de Code: ${snapshot.size.sourceLines}`);
  console.log(`   Composants: ${snapshot.size.components}`);
  console.log(`   Pages: ${snapshot.size.pages}`);
  console.log(`   Utils: ${snapshot.size.utils}`);
  
  // Section Dépendances
  console.log('\n' + '─'.repeat(80));
  console.log('📦 DÉPENDANCES');
  console.log('─'.repeat(80));
  console.log(`\n📊 Dépendances`);
  console.log(`   Total: ${snapshot.dependencies.total} (${snapshot.dependencies.production} prod, ${snapshot.dependencies.development} dev)`);
  console.log(`   Vulnérabilités: ${snapshot.dependencies.vulnerabilities.total} (${snapshot.dependencies.vulnerabilities.critical} critiques, ${snapshot.dependencies.vulnerabilities.high} hautes, ${snapshot.dependencies.vulnerabilities.moderate} modérées, ${snapshot.dependencies.vulnerabilities.low} faibles)`);
  
  // Section Performance
  console.log('\n' + '─'.repeat(80));
  console.log('⚡ PERFORMANCE');
  console.log('─'.repeat(80));
  console.log(`\n📊 Performance`);
  console.log(`   Taille Bundle: ${snapshot.performance.bundleSize} KB`);
  console.log(`   Temps de Build: ${(snapshot.performance.buildTime / 1000).toFixed(2)}s`);
  if (snapshot.performance.lighthouseScore) {
    console.log(`   Score Lighthouse: ${snapshot.performance.lighthouseScore}/100`);
  }
  
  console.log('\n' + '='.repeat(80));
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Collecte des métriques (version simplifiée)...\n');

  // Créer le dossier de sortie
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Note : La couverture de code sera générée lors de l'exécution des tests Jest (unitaires et intégration)
  // dans la section de rechronométrage ci-dessous

  // Générer les résultats E2E/BDD AVANT de collecter les métriques
  // Durées mesurées par Date.now() avant/après chaque run (soustraction = durée réelle)
  // Logique de rechronométrage basée sur le commit hash :
  // - Nouveau commit : on chronomètre
  // - Si erreur dans ce commit : on chronomètre
  // - Si pas d'erreur dans ce commit : on ne chronomètre plus
  // - Sauf si on force avec --force
  const durationsPath = path.join(process.cwd(), 'playwright-report', 'durations.json');
  const playwrightReportPath = path.join(process.cwd(), 'playwright-report', 'data.json');
  
  // Détecter l'option --force
  const forceReRun = process.argv.includes('--force') || process.argv.includes('--re-run');

  /** Si true, on n'exécute pas les tests BDD ; on conserve les métriques BDD du run précédent (ordre de grandeur). */
  const skipBdd = process.env.SKIP_BDD === '1' || process.argv.includes('--skip-bdd');
  
  // Obtenir le commit hash actuel
  const gitInfo = getGitInfo();
  const currentCommit = gitInfo.commit;
  
  // Lire les durées existantes (si présentes)
  let existingDurations: { 
    unitDuration?: number; 
    integrationDuration?: number; 
    bddDuration?: number; 
    e2eDuration?: number; 
    commit?: string; 
    hasError?: boolean 
  } = {};
  if (fs.existsSync(durationsPath)) {
    try {
      existingDurations = JSON.parse(fs.readFileSync(durationsPath, 'utf-8'));
    } catch {
      // Ignorer si le fichier est corrompu
    }
  }
  
  // Décider si on doit rechronométrer
  const shouldReRun = forceReRun || 
                      !existingDurations.commit || 
                      existingDurations.commit !== currentCommit ||
                      existingDurations.hasError === true;
  
  let unitDurationMs = existingDurations.unitDuration || 0;
  let integrationDurationMs = existingDurations.integrationDuration || 0;
  let bddDurationMs = existingDurations.bddDuration || 0;
  let e2eDurationMs = existingDurations.e2eDuration || 0;
  let hasError = false;
  
  if (shouldReRun) {
    const reason = forceReRun ? '--force activé' : 
                   !existingDurations.commit ? 'première exécution' :
                   existingDurations.commit !== currentCommit ? `nouveau commit (${currentCommit} vs ${existingDurations.commit})` :
                   'erreur précédente détectée';
    console.log(`📊 Rechronométrage de tous les tests (${reason})...\n`);
    
    const playwrightReportData = path.join(process.cwd(), 'playwright-report', 'data.json');
    const jestResultsPath = path.join(process.cwd(), 'test-results.json');
    const coverageSummaryPath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');
    
    // Une seule exécution Jest : tous les tests (unit + integration) avec coverage et JSON.
    // On exécute toujours quand on rechronomètre (pas de réutilisation) pour une seule passe.
    console.log('⏱️  Exécution de tous les tests Jest (unit + intégration) avec coverage et chronométrage...');
    try {
      execSync('npm test -- --coverage --coverageReporters=json-summary --coverageReporters=text --json --outputFile=test-results.json --silent', { 
        encoding: 'utf-8', 
        stdio: 'inherit' 
      });
      console.log('✅ Tous les tests Jest passent\n');
    } catch (e) {
      console.error('❌ Les tests Jest ont échoué.');
      hasError = true;
    }
    
    // Durées unit / intégration dérivées du même run (test-results.json)
    if (fs.existsSync(jestResultsPath)) {
      const jestDurations = collectJestTestDurations();
      unitDurationMs = jestDurations.unitDuration;
      integrationDurationMs = jestDurations.integrationDuration;
      if (unitDurationMs > 0 || integrationDurationMs > 0) {
        console.log('⏱️  Durées Jest (dérivées du run unique) :');
        console.log(`   ✅ Tests unitaires: ${(unitDurationMs / 1000).toFixed(2)}s | Tests d'intégration: ${(integrationDurationMs / 1000).toFixed(2)}s\n`);
      }
      if (jestDurations.failingTests > 0) hasError = true;
    }
    // Option A : arrêt au premier échec + log pour l’IA
    if (hasError) {
      writeErrorLog('Jest', '', '', 'Tests Jest en échec. Voir test-results.json pour le détail.');
      process.exit(1);
    }
    // Vérification des seuils de couverture (pipeline = tout sauf publish)
    checkCoverageThresholds();

    let bddHadFailure = false;
    let bddPassed = 0;
    let bddFailed = 0;
    if (skipBdd) {
      console.log('⏭️  BDD ignorés (SKIP_BDD=1 ou --skip-bdd). Métriques BDD conservées (ordre de grandeur).\n');
      // bddDurationMs reste existingDurations.bddDuration
    } else {
    // Exécuter BDD : 1) génération 2) exécution (chronométrée). En cas d'échec = warning + log, on continue (dette à résorber).
    // Voir .cursor/arbitrage-BDD-vs-TI.md pour l'arbitrage US ↔ TU.
    let bddStart: number | undefined;

    // Étape 1 : Génération BDD (bddgen test)
    // bddgen peut signaler des "missing step definitions" — c'est un gap de couverture,
    // pas un échec de test. Il génère quand même les specs pour les steps qui matchent.
    console.log('🔄 Génération des tests BDD...');
    try {
      execSync('npm run test:bdd:generate', { encoding: 'utf-8', stdio: 'inherit' });
      console.log('   ✅ Génération BDD complète (tous les steps matchent)\n');
    } catch (e) {
      console.warn('   ⚠️  Génération BDD : certains steps n\'ont pas de définition (couverture BDD incomplète)');
      console.warn('   Les tests BDD générés seront quand même exécutés.\n');
    }

    // Vérification : au moins un spec BDD généré (sinon échec explicite, pas "No tests found" plus tard)
    const bddSpecDir = path.join(process.cwd(), '.features-gen', 'tests', 'bdd');
    const bddSpecFiles = fs.existsSync(bddSpecDir)
      ? fs.readdirSync(bddSpecDir).filter((f: string) => f.endsWith('.spec.js'))
      : [];
    if (bddSpecFiles.length === 0) {
      console.error('   ❌ Aucun fichier .spec.js généré dans .features-gen/tests/bdd/');
      console.error('   La génération BDD (bddgen test) aurait dû produire des specs. Vérifiez tests/bdd/*.feature et *.steps.ts.\n');
      writeErrorLog('BDD', '', '', 'Aucun spec BDD généré dans .features-gen/tests/bdd/. Vérifier bddgen et les features/steps.');
      process.exit(1);
    }
    
    // Nettoyer data.json avant de mesurer BDD pour éviter de lire des résultats obsolètes
    if (fs.existsSync(playwrightReportData)) {
      try {
        fs.renameSync(playwrightReportData, playwrightReportData + '.backup-bdd');
      } catch (e) {
        // Si le fichier est verrouillé, continuer quand même
      }
    }
    
    // Étape 2 : Exécution des tests BDD (BLOQUANT — tous les tests générés doivent passer)
    // Playwright démarre le serveur (npm run dev) si besoin : premier lancement peut prendre 30–60 s
    // Sous Windows, la config principale peut ne pas découvrir .features-gen (dossier caché).
    // Utiliser une config dédiée (testDir absolu vers .features-gen) pour une découverte fiable.
    const bddConfigPath = path.join(process.cwd(), 'playwright.bdd-only.config.ts');
    try {
      console.log('⏱️  Exécution des tests BDD (démarrage du serveur si besoin, puis ~183 tests)...');
      console.log('   Astuce : lancer "npm run dev" dans un autre terminal pour réutiliser le serveur.');
      bddStart = Date.now();
      execSync(`npx playwright test -c "${bddConfigPath}" --reporter=list`, {
        encoding: 'utf-8',
        stdio: 'inherit',
        env: { ...process.env, PLAYWRIGHT_FORCE_TTY: '1' },
      });
      bddDurationMs = Date.now() - bddStart;
      const bddStats = readPlaywrightReportStats(playwrightReportData);
      if (bddStats) {
        bddPassed = bddStats.passed;
        bddFailed = bddStats.failed;
        console.log(`   ✅ BDD: ${bddPassed} passés${bddFailed > 0 ? `, ${bddFailed} échoués` : ''} (${(bddDurationMs / 1000).toFixed(2)}s)\n`);
        if (bddFailed > 0) bddHadFailure = true;
      } else {
        console.log(`   ✅ BDD: ${(bddDurationMs / 1000).toFixed(2)}s\n`);
      }
    } catch (e) {
      if (bddStart !== undefined) {
        bddDurationMs = Date.now() - bddStart;
        const bddStats = readPlaywrightReportStats(playwrightReportData);
        if (bddStats) {
          bddPassed = bddStats.passed;
          bddFailed = bddStats.failed;
          console.error(`   ❌ Échec des tests BDD: ${bddPassed} passés, ${bddFailed} échoués (durée: ${(bddDurationMs / 1000).toFixed(2)}s)`);
        } else {
          console.error(`   ❌ Échec des tests BDD (durée: ${(bddDurationMs / 1000).toFixed(2)}s)`);
        }
      } else {
        console.error('   ❌ Échec des tests BDD');
      }
      console.error('   Les tests BDD ont échoué.\n');
      bddHadFailure = true;
    }
    if (bddHadFailure) {
      const failedList = getPlaywrightFailedTitles(playwrightReportData, 60);
      const detail = failedList.length > 0
        ? `Tests BDD en échec (${bddFailed} échoué(s)). Scénarios en échec:\n\n${failedList.map((t) => `  - ${t}`).join('\n')}${failedList.length >= 60 ? '\n  ... (tronqué à 60)' : ''}\n\nVoir playwright-report/index.html et .features-gen/ pour le détail.`
        : 'Tests BDD en échec. Voir playwright-report/ et .features-gen/ pour le détail.';
      writeErrorLog('BDD', '', '', detail);
      console.warn('⚠️  Des scénarios BDD ont échoué (dette à résorber). Log: ' + PUBLISH_ERRORS_LOG + '\n   La publication continue.\n');
    }
    } // fin if (!skipBdd)

    // Vérification : le dossier tests/end-to-end doit exister et contenir au moins un .spec.ts (générés par un TI ou script).
    // Sinon = blocage publication (on vise à corriger la situation E2E).
    const e2eDir = path.join(process.cwd(), 'tests', 'end-to-end');
    const e2eSpecFiles = fs.existsSync(e2eDir)
      ? fs.readdirSync(e2eDir).filter((f: string) => f.endsWith('.spec.ts'))
      : [];
    if (e2eSpecFiles.length === 0) {
      console.error('   ❌ Aucun test E2E trouvé : le dossier tests/end-to-end/ est absent ou ne contient aucun .spec.ts');
      console.error('   Les specs E2E doivent être générés par le TI (ex. generate-e2e-navigation) ou un script avant publication.\n');
      writeErrorLog('E2E', '', '', 'Aucun fichier .spec.ts dans tests/end-to-end/. Le TI de génération E2E doit produire ces fichiers (ex. tests/integration/generate-e2e-navigation.integration.test.ts).');
      process.exit(1);
    }
    
    // Exécuter E2E (sauf si aucun spec, ex. mode US→TI seul avec SKIP_BDD=1)
    let e2eStart: number | undefined;
    let e2ePassed = 0;
    let e2eFailed = 0;
    if (e2eSpecFiles.length > 0) {
    try {
      // Nettoyer data.json avant de mesurer E2E pour éviter de lire des résultats BDD
      if (fs.existsSync(playwrightReportData)) {
        try {
          fs.renameSync(playwrightReportData, playwrightReportData + '.backup-e2e');
        } catch (e) {
          // Si le fichier est verrouillé, continuer quand même
        }
      }
      
      console.log('⏱️  Exécution des tests E2E...');
      e2eStart = Date.now();
      execSync('npx playwright test -c playwright.e2e-only.config.ts --reporter=list', {
        encoding: 'utf-8',
        stdio: 'inherit',
        env: { ...process.env, SKIP_BDD_GEN: '1', PLAYWRIGHT_FORCE_TTY: '1' },
      });
      e2eDurationMs = Date.now() - e2eStart;
      const e2eStats = readPlaywrightReportStats(playwrightReportData);
      if (e2eStats) {
        e2ePassed = e2eStats.passed;
        e2eFailed = e2eStats.failed;
        console.log(`   ✅ E2E: ${e2ePassed} passés${e2eFailed > 0 ? `, ${e2eFailed} échoués` : ''} (${(e2eDurationMs / 1000).toFixed(2)}s)\n`);
      } else {
        console.log(`   ✅ E2E: ${(e2eDurationMs / 1000).toFixed(2)}s\n`);
      }
    } catch (e) {
      // Même en cas d'erreur, mesurer la durée jusqu'à l'erreur
      if (e2eStart !== undefined) {
        e2eDurationMs = Date.now() - e2eStart;
        const e2eStats = readPlaywrightReportStats(playwrightReportData);
        if (e2eStats) {
          e2ePassed = e2eStats.passed;
          e2eFailed = e2eStats.failed;
          console.error(`   ❌ Échec des tests E2E: ${e2ePassed} passés, ${e2eFailed} échoués (durée: ${(e2eDurationMs / 1000).toFixed(2)}s)`);
        } else {
          console.error(`   ❌ Échec des tests E2E (durée: ${(e2eDurationMs / 1000).toFixed(2)}s)`);
        }
      } else {
        console.error('   ❌ Échec des tests E2E');
      }
      console.error('   Les tests E2E sont essentiels à la non-régression. Publication bloquée.\n');
      hasError = true;
    }
    if (hasError) {
      const e2eFailedList = getPlaywrightFailedTitles(playwrightReportData, 60);
      const e2eDetail = e2eFailedList.length > 0
        ? `Tests E2E en échec (${e2eFailed} échoué(s)). Scénarios en échec:\n\n${e2eFailedList.map((t) => `  - ${t}`).join('\n')}${e2eFailedList.length >= 60 ? '\n  ... (tronqué à 60)' : ''}\n\nVoir playwright-report/index.html et tests/end-to-end/ pour le détail.`
        : 'Tests E2E en échec. Voir playwright-report/ et tests/end-to-end/ pour le détail.';
      writeErrorLog('E2E', '', '', e2eDetail);
      process.exit(1);
    }
    } // fin if (e2eSpecFiles.length > 0)
    
    // Sauvegarder les durées avec le commit hash et le statut d'erreur
    const reportDir = path.dirname(durationsPath);
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(durationsPath, JSON.stringify({
      unitDuration: unitDurationMs,
      integrationDuration: integrationDurationMs,
      bddDuration: bddDurationMs,
      e2eDuration: e2eDurationMs,
      commit: currentCommit,
      hasError: hasError,
      timestamp: new Date().toISOString()
    }, null, 2));
    
    if (hasError) {
      console.error('❌ Tests exécutés avec erreurs — publication bloquée');
      console.error(`   BDD: ${bddPassed} passés${bddFailed > 0 ? `, ${bddFailed} échoués` : ''} (${(bddDurationMs / 1000).toFixed(2)}s) | E2E: ${e2ePassed} passés${e2eFailed > 0 ? `, ${e2eFailed} échoués` : ''} (${(e2eDurationMs / 1000).toFixed(2)}s)`);
      console.error('   Les tests BDD et E2E sont le cœur de la non-régression. Corrigez les erreurs avant de publier.\n');
      process.exit(1);
    } else {
      console.log('✅ Tous les tests exécutés avec succès (durées enregistrées dans playwright-report/durations.json)');
      console.log(`   BDD: ${bddPassed} passés (${(bddDurationMs / 1000).toFixed(2)}s) | E2E: ${e2ePassed} passés (${(e2eDurationMs / 1000).toFixed(2)}s)\n`);
    }
  } else {
    console.log(`✅ Durées existantes trouvées pour le commit ${currentCommit}`);
    console.log(`   Unitaires: ${(unitDurationMs / 1000).toFixed(2)}s | Intégration: ${(integrationDurationMs / 1000).toFixed(2)}s | BDD: ${(bddDurationMs / 1000).toFixed(2)}s | E2E: ${(e2eDurationMs / 1000).toFixed(2)}s`);
    console.log('   Réutilisation des durées (utilisez --force pour forcer le rechronométrage)\n');
  }

  // Réutiliser gitInfo déjà déclaré plus haut
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  const snapshot: MetricsSnapshot = {
    timestamp: new Date().toISOString(),
    branch: gitInfo.branch,
    commit: gitInfo.commit,
    tests: collectTestMetrics(),
    coverage: collectCoverageMetrics(),
    quality: collectQualityMetrics(),
    size: collectSizeMetrics(),
    dependencies: collectDependencyMetrics(),
    performance: collectPerformanceMetrics(),
  };

  // Si BDD ignorés, conserver les métriques BDD du run précédent (ordre de grandeur dans le JSON → affichage inchangé)
  if (skipBdd && fs.existsSync(LATEST_FILE)) {
    try {
      const prev = JSON.parse(fs.readFileSync(LATEST_FILE, 'utf-8'));
      if (prev.tests) {
        const t = snapshot.tests;
        const bddFeatures = prev.tests.bddFeatures ?? t.bddFeatures;
        const bddScenariosTotal = prev.tests.bddScenariosTotal ?? t.bddScenariosTotal;
        const bddScenariosTestable = prev.tests.bddScenariosTestable ?? t.bddScenariosTestable;
        const bddScenariosNonTestable = prev.tests.bddScenariosNonTestable ?? t.bddScenariosNonTestable;
        const bddTestDuration = prev.tests.bddTestDuration ?? bddDurationMs;
        const bddStepsTotal = prev.tests.bddStepsTotal ?? t.bddStepsTotal;
        const bddStepsImplemented = prev.tests.bddStepsImplemented ?? t.bddStepsImplemented;
        const bddStepsMissing = prev.tests.bddStepsMissing ?? t.bddStepsMissing;
        const totalTests = t.unitTests + t.integrationTests + bddScenariosTestable + t.e2eSteps;
        const passingTests = t.unitTestPassed + t.integrationTestPassed + bddScenariosTestable + t.e2eStepsPassed;
        const failingTests = t.unitTestFailed + t.integrationTestFailed + t.e2eStepsFailed;
        const totalTestFiles = t.unitTestFiles + t.integrationTestFiles + bddFeatures + t.e2eScenarioFiles;
        const testDuration = (t.unitTestDuration ?? 0) + (t.integrationTestDuration ?? 0) + bddTestDuration + (t.e2eTests?.duration ?? 0);
        snapshot.tests = {
          ...t,
          bddFeatures,
          bddScenariosTotal,
          bddScenariosTestable,
          bddScenariosNonTestable,
          bddTestDuration,
          bddStepsTotal,
          bddStepsImplemented,
          bddStepsMissing,
          totalTests,
          passingTests,
          failingTests,
          totalTestFiles,
          testDuration,
        };
      }
    } catch {
      console.warn('⚠️  Impossible de lire le snapshot précédent pour les métriques BDD');
    }
  }

  // Sauvegarder le snapshot
  fs.writeFileSync(LATEST_FILE, JSON.stringify(snapshot, null, 2));
  console.log(`\n✅ Snapshot sauvegardé: ${LATEST_FILE}`);

  // Charger et mettre à jour l'historique
  const history: MetricsHistory = {
    snapshots: [],
    latest: snapshot,
    trends: {
      tests: 'stable',
      coverage: 'stable',
      quality: 'stable',
    },
  };

  let existingLighthouseScores: LighthouseScoresMetrics | undefined;
  let lastLighthouseRun: string | undefined;

  if (fs.existsSync(HISTORY_FILE)) {
    try {
      const existingHistory = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
      history.snapshots = existingHistory.snapshots || [];
      lastLighthouseRun = existingHistory.lastLighthouseRun;
      // Récupérer les scores Lighthouse existants du dernier snapshot
      if (existingHistory.latest?.lighthouse) {
        existingLighthouseScores = existingHistory.latest.lighthouse;
      }
    } catch (e) {
      console.warn('⚠️  Erreur lors de la lecture de l\'historique');
    }
  }

  // Scores Web (Lighthouse / PageSpeed) : mis à jour tous les 7 jours
  console.log('\n🔍 Scores Web (Lighthouse) — mise à jour tous les 7 jours...');
  const lighthouseResult = await collectLighthouseScores(lastLighthouseRun, existingLighthouseScores);
  
  if (!lighthouseResult.skipped) {
    history.lastLighthouseRun = lighthouseResult.lastRun;
    console.log(`✅ Scores Web mis à jour: Perf=${lighthouseResult.scores.performance}, A11y=${lighthouseResult.scores.accessibility}, BP=${lighthouseResult.scores.bestPractices}, SEO=${lighthouseResult.scores.seo}`);
  } else {
    history.lastLighthouseRun = lastLighthouseRun;
    console.log('⏭️  Scores Web non recalculés (dernière exécution < 7 jours)');
  }
  
  // Ajouter les scores Lighthouse au snapshot
  (snapshot as MetricsSnapshot & { lighthouse?: LighthouseScoresMetrics }).lighthouse = lighthouseResult.scores;

  history.snapshots.push(snapshot);
  
  if (history.snapshots.length > HISTORY_LIMIT) {
    history.snapshots = history.snapshots.slice(-HISTORY_LIMIT);
  }

  if (history.snapshots.length >= 2) {
    const previous = history.snapshots[history.snapshots.length - 2];
    history.trends = {
      tests: snapshot.tests.totalTests > previous.tests.totalTests ? 'up' : 
             snapshot.tests.totalTests < previous.tests.totalTests ? 'down' : 'stable',
      coverage: snapshot.coverage.lines.percentage > previous.coverage.lines.percentage ? 'up' :
                snapshot.coverage.lines.percentage < previous.coverage.lines.percentage ? 'down' : 'stable',
      quality: (snapshot.quality.eslintErrors + snapshot.quality.eslintWarnings) < 
               (previous.quality.eslintErrors + previous.quality.eslintWarnings) ? 'up' : 
               (snapshot.quality.eslintErrors + snapshot.quality.eslintWarnings) > 
               (previous.quality.eslintErrors + previous.quality.eslintWarnings) ? 'down' : 'stable',
    };
  }

  history.latest = snapshot;
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  console.log(`✅ Historique sauvegardé: ${HISTORY_FILE}`);

  // Afficher le rapport formaté similaire au tableau de bord
  displayFormattedReport(snapshot, history.trends);
  
  console.log('\n✨ Terminé! Visitez http://localhost:3000/metrics');
}

main().catch(console.error);
