/**
 * Script "Publie" : Automatise le processus de publication
 * 
 * Ce script :
 * 1. Lance tous les tests avec chronométrage (coverage + JSON)
 * 2. Si échec, analyse et liste les erreurs avec exigences et causes, puis s'arrête
 * 3. Si succès, collecte toutes les métriques (E2E, BDD, etc.)
 * 4. Publie sur Git
 * 
 * Objectif : Avoir sur git et Vercel un site avec 100% de couverture de test avec leur chronométrage à jour
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Lance tous les tests avec chronométrage et coverage
 * Retourne le code de sortie et les résultats JSON
 */
function runTestsWithTiming(): { 
  exitCode: number; 
  output: string; 
  stderr: string;
  resultsJson?: any;
} {
  const jestResultsPath = path.join(process.cwd(), 'test-results.json');
  const coverageSummaryPath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');
  
  // Supprimer les fichiers existants pour forcer un nouveau run
  if (fs.existsSync(jestResultsPath)) {
    fs.unlinkSync(jestResultsPath);
  }
  if (fs.existsSync(coverageSummaryPath)) {
    fs.rmSync(path.dirname(coverageSummaryPath), { recursive: true, force: true });
  }
  
  try {
    console.log('⏱️  Lancement des tests avec chronométrage et coverage...\n');
    const output = execSync('npm test -- --coverage --coverageReporters=json-summary --coverageReporters=text --json --outputFile=test-results.json', { 
      encoding: 'utf-8',
      stdio: 'pipe' // Capture la sortie pour analyse
    });
    
    // Lire les résultats JSON
    let resultsJson = null;
    if (fs.existsSync(jestResultsPath)) {
      try {
        resultsJson = JSON.parse(fs.readFileSync(jestResultsPath, 'utf-8'));
      } catch (e) {
        console.warn('⚠️  Impossible de parser test-results.json');
      }
    }
    
    return { exitCode: 0, output, stderr: '', resultsJson };
  } catch (error: any) {
    // Lire les résultats JSON même en cas d'erreur (pour analyser les échecs)
    let resultsJson = null;
    if (fs.existsSync(jestResultsPath)) {
      try {
        resultsJson = JSON.parse(fs.readFileSync(jestResultsPath, 'utf-8'));
      } catch (e) {
        // Ignorer si le fichier n'est pas valide
      }
    }
    
    return { 
      exitCode: error.status || 1, 
      output: error.stdout?.toString() || '',
      stderr: error.stderr?.toString() || error.message || '',
      resultsJson
    };
  }
}

/**
 * Analyse les erreurs de tests en détail
 * Explique l'exigence du test et la cause de l'échec pour permettre un arbitrage
 */
function analyzeTestFailures(output: string, stderr: string, resultsJson?: any): void {
  console.log('\n' + '='.repeat(60));
  console.log('📋 ANALYSE DES ÉCHECS DE TESTS\n');
  
  // Si on a les résultats JSON, les utiliser pour une analyse détaillée
  if (resultsJson && resultsJson.testResults) {
    const failingTests = resultsJson.testResults.filter((tr: any) => tr.status === 'failed');
    
    if (failingTests.length > 0) {
      console.log(`❌ ${failingTests.length} fichier(s) de test en échec :\n`);
      
      failingTests.forEach((testResult: any, index: number) => {
        const fileName = testResult.name.replace(process.cwd() + path.sep, '');
        console.log(`${index + 1}. ${fileName}`);
        
        if (testResult.assertionResults) {
          const failingAssertions = testResult.assertionResults.filter((ar: any) => ar.status === 'failed');
          
          failingAssertions.forEach((assertion: any, assertIndex: number) => {
            console.log(`\n   Test "${assertion.title}":`);
            console.log(`   📌 Exigence : ${assertion.title}`);
            
            if (assertion.failureMessages && assertion.failureMessages.length > 0) {
              // Extraire la cause principale de l'erreur
              const failureMsg = assertion.failureMessages[0];
              
              // Identifier le type d'erreur
              if (failureMsg.includes('Expected') && failureMsg.includes('Received')) {
                console.log(`   🔍 Cause : Le test attendait une valeur différente de celle reçue`);
                // Extraire les valeurs attendues/reçues si possible
                const expectedMatch = failureMsg.match(/Expected: (.+?)(?:\n|Received)/);
                const receivedMatch = failureMsg.match(/Received: (.+?)(?:\n|$)/);
                if (expectedMatch) console.log(`      Attendu : ${expectedMatch[1].trim()}`);
                if (receivedMatch) console.log(`      Reçu : ${receivedMatch[1].trim()}`);
              } else if (failureMsg.includes('TypeError')) {
                console.log(`   🔍 Cause : Erreur de type (TypeError)`);
                const typeErrorMatch = failureMsg.match(/TypeError: (.+?)(?:\n|$)/);
                if (typeErrorMatch) console.log(`      Détail : ${typeErrorMatch[1].trim()}`);
              } else if (failureMsg.includes('ReferenceError')) {
                console.log(`   🔍 Cause : Référence manquante (ReferenceError)`);
                const refErrorMatch = failureMsg.match(/ReferenceError: (.+?)(?:\n|$)/);
                if (refErrorMatch) console.log(`      Détail : ${refErrorMatch[1].trim()}`);
              } else {
                console.log(`   🔍 Cause : ${failureMsg.split('\n')[0]}`);
              }
              
              // Afficher le message complet si court, sinon juste un extrait
              if (failureMsg.length < 200) {
                console.log(`   📄 Message complet :`);
                console.log(`      ${failureMsg.split('\n').join('\n      ')}`);
              }
            }
          });
        } else {
          // Pas de détails d'assertion, afficher le message d'erreur général
          if (testResult.message) {
            console.log(`   🔍 Cause : ${testResult.message.split('\n')[0]}`);
          }
        }
        
        console.log(''); // Ligne vide entre les fichiers
      });
    }
  } else {
    // Fallback : analyse basique depuis la sortie texte
    const fullOutput = output + '\n' + stderr;
    const failingTests = fullOutput.match(/FAIL\s+(tests\/[^\s]+)/g) || [];
    const failingTestFiles = [...new Set(failingTests.map(m => m.replace('FAIL ', '')))];
    
    if (failingTestFiles.length > 0) {
      console.log(`❌ ${failingTestFiles.length} fichier(s) de test en échec :\n`);
      failingTestFiles.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
      });
    }
    
    // Afficher les erreurs courantes
    if (fullOutput.includes('ReferenceError')) {
      console.log('\n💡 Suggestion : Vérifier les imports manquants');
    }
    if (fullOutput.includes('TypeError')) {
      console.log('\n💡 Suggestion : Vérifier les types et les valeurs null/undefined');
    }
    if (fullOutput.includes('Le fichier') && fullOutput.includes('n\'existe pas')) {
      console.log('\n💡 Suggestion : Vérifier les mocks de fichiers dans les tests');
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('💡 ARBITRAGE REQUIS\n');
  console.log('Les tests échouent. Deux possibilités :');
  console.log('   1. Le code a un bug → Corriger le code');
  console.log('   2. Les spécifications ont évolué → Mettre à jour les tests\n');
  console.log('Une fois la décision prise et les corrections effectuées,');
  console.log('relancer "npm run publie"\n');
}

/**
 * Collecte toutes les métriques (E2E, BDD, etc.)
 * NOTE : Les tests Jest ont déjà été exécutés avec coverage, cette étape
 * collecte les métriques E2E et BDD et met à jour les durées
 */
function collectAllMetrics(): void {
  console.log('📊 Collecte de toutes les métriques (E2E, BDD, etc.)...\n');
  console.log('   (Les tests Jest ont déjà été exécutés avec chronométrage)\n');
  try {
    execSync('npm run metrics:collect', { 
      encoding: 'utf-8',
      stdio: 'inherit'
    });
    console.log('\n✅ Toutes les métriques collectées avec succès\n');
  } catch (error) {
    console.error('\n❌ Erreur lors de la collecte des métriques');
    console.error('   Les métriques E2E/BDD ne seront pas à jour');
    throw error; // Bloquer la publication si les métriques échouent
  }
}

/**
 * Publie sur Git
 */
function publishToGit(message: string): void {
  console.log('📤 Publication sur Git...\n');
  try {
    execSync('git add -A', { encoding: 'utf-8', stdio: 'inherit' });
    execSync(`git commit -m "${message}"`, { encoding: 'utf-8', stdio: 'inherit' });
    execSync('git push', { encoding: 'utf-8', stdio: 'inherit' });
    console.log('✅ Publication réussie\n');
  } catch (error) {
    console.error('❌ Erreur lors de la publication Git');
    throw error;
  }
}

/**
 * Vérifie que la couverture de code est à 100%
 */
function checkCoverage(): void {
  const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');
  
  if (!fs.existsSync(coveragePath)) {
    console.warn('⚠️  Fichier coverage-summary.json non trouvé');
    console.warn('   La couverture sera vérifiée lors de la collecte des métriques\n');
    return;
  }
  
  try {
    const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));
    const total = coverage.total;
    
    if (!total) {
      console.warn('⚠️  Structure de couverture invalide\n');
      return;
    }
    
    const metrics = ['lines', 'statements', 'functions', 'branches'];
    const all100 = metrics.every(metric => {
      const pct = total[metric]?.pct || 0;
      return pct >= 100;
    });
    
    if (all100) {
      console.log('✅ Couverture de code : 100% sur tous les critères\n');
    } else {
      console.warn('⚠️  Couverture de code < 100% :');
      metrics.forEach(metric => {
        const pct = total[metric]?.pct || 0;
        const status = pct >= 100 ? '✅' : '❌';
        console.warn(`   ${status} ${metric}: ${pct}%`);
      });
      console.warn('\n   La publication continue, mais la couverture n\'est pas à 100%\n');
    }
  } catch (error) {
    console.warn('⚠️  Erreur lors de la lecture de la couverture\n');
  }
}

/**
 * Génère le scénario E2E avant de lancer les tests
 * Le scénario doit être à jour pour que les tests d'intégration passent
 */
function generateE2EScenario(): void {
  console.log('📝 Génération du scénario E2E...\n');
  try {
    execSync('npm run test:e2e:generate', { 
      encoding: 'utf-8',
      stdio: 'inherit'
    });
    console.log('\n✅ Scénario E2E généré avec succès\n');
  } catch (error) {
    console.error('\n❌ Erreur lors de la génération du scénario E2E');
    console.error('   Les tests d\'intégration pourront échouer\n');
    throw error; // Bloquer la publication si la génération échoue
  }
}

/**
 * Fonction principale
 */
function main() {
  console.log('🚀 Démarrage du processus "Publie"\n');
  console.log('='.repeat(60));
  console.log('Étape 0/4 : Génération du scénario E2E\n');
  
  generateE2EScenario();
  
  console.log('='.repeat(60));
  console.log('Étape 1/4 : Lancement des tests avec chronométrage\n');
  
  const testResult = runTestsWithTiming();
  
  // Si les tests échouent, analyser en détail et arrêter
  if (testResult.exitCode !== 0) {
    console.error('\n❌ Les tests échouent');
    console.error('   La publication est bloquée jusqu\'à correction\n');
    
    analyzeTestFailures(testResult.output, testResult.stderr, testResult.resultsJson);
    
    // Afficher un résumé
    if (testResult.resultsJson) {
      const total = testResult.resultsJson.numTotalTests || 0;
      const passed = testResult.resultsJson.numPassedTests || 0;
      const failed = testResult.resultsJson.numFailedTests || 0;
      console.log(`\n📊 Résumé : ${passed}/${total} test(s) passent, ${failed} test(s) échouent\n`);
    }
    
    process.exit(1);
  }
  
  console.log('✅ Tous les tests passent\n');
  
  // Afficher un résumé des tests réussis
  if (testResult.resultsJson) {
    const total = testResult.resultsJson.numTotalTests || 0;
    const passed = testResult.resultsJson.numPassedTests || 0;
    console.log(`📊 ${passed}/${total} test(s) passent\n`);
  }
  
  console.log('='.repeat(60));
  console.log('Étape 2/4 : Collecte de toutes les métriques (E2E, BDD, etc.)\n');
  
  collectAllMetrics();
  
  console.log('='.repeat(60));
  console.log('Étape 3/4 : Vérification de la couverture de code\n');
  
  checkCoverage();
  
  console.log('='.repeat(60));
  console.log('Étape 4/4 : Publication sur Git\n');
  
  const commitMessage = `Publication automatique - Tests OK, métriques à jour`;
  publishToGit(commitMessage);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Processus "Publie" terminé avec succès !');
  console.log('   - Tous les tests passent (avec chronométrage)');
  console.log('   - Toutes les métriques collectées');
  console.log('   - Modifications publiées sur Git');
  console.log('   - Site prêt pour déploiement sur Vercel\n');
}

// Exécuter le script
main();
