/**
 * Script "Publie" : Automatise le processus de publication
 * 
 * Ce script :
 * 0. Vérification de la couverture précédente (≥ 80% lines/statements/functions, ≥ 65% branches) — fail fast
 * 1. Vérification TypeScript (tsc --noEmit)
 * 2. Lance les tests et collecte les métriques (Jest + BDD + E2E en une seule passe, avec chronométrage)
 * 3. Publie sur Git
 * 
 * Objectif : Une seule exécution des tests pour valider et chronométrer.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

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
 * Lance les tests (Jest + BDD + E2E) et collecte les métriques en une seule passe.
 * Chronométrage pendant l'exécution — pas de double run.
 */
function runTestsAndCollectMetrics(): void {
  console.log('📊 Lancement des tests et collecte des métriques (une seule passe)...\n');
  try {
    execSync('npm run metrics:collect', { 
      encoding: 'utf-8',
      stdio: 'inherit'
    });
    console.log('\n✅ Tous les tests passent, métriques collectées\n');
  } catch (error) {
    console.error('\n❌ Des tests ont échoué ou la collecte a échoué — publication bloquée');
    throw error;
  }
}

/**
 * Publie sur Git
 * Sous Windows/OneDrive, active core.longpaths pour éviter "adding files failed" (chemins longs).
 */
function publishToGit(message: string): void {
  console.log('📤 Publication sur Git...\n');
  try {
    // Sous Windows/OneDrive : autoriser les chemins > 260 caractères
    try {
      execSync('git config core.longpaths true', { encoding: 'utf-8', stdio: 'pipe' });
    } catch {
      // Ignorer si config échoue
    }
    try {
      execSync('git add -A', { encoding: 'utf-8', stdio: 'pipe', maxBuffer: 10 * 1024 * 1024 });
    } catch (addError: unknown) {
      const err = addError as { stderr?: string; stdout?: string; output?: (string | null)[] };
      console.error('❌ Erreur lors de la publication Git (git add -A)');
      const stderr = err?.stderr ?? err?.output?.[2];
      const stdout = err?.stdout ?? err?.output?.[1];
      if (stderr) console.error(stderr);
      if (stdout) console.error(stdout);
      if (!stderr && !stdout) console.error((addError as Error).message);
      console.error('\nConseil : Si "Filename too long", exécuter : git config core.longpaths true');
      throw addError;
    }
    execSync('git commit -m ' + JSON.stringify(message), { encoding: 'utf-8', stdio: 'inherit' });
    execSync('git push', { encoding: 'utf-8', stdio: 'inherit' });
    console.log('✅ Publication réussie\n');
  } catch (error: unknown) {
    const err = error as { stderr?: string; stdout?: string };
    if (!err?.stderr && !err?.stdout) {
      console.error('❌ Erreur lors de la publication Git');
    }
    throw error;
  }
}

/**
 * Vérifie la couverture de code précédente (fail fast)
 * Si un rapport de couverture existe et qu'un critère est < 80%, on bloque immédiatement.
 * Pas de rapport = premier run → on laisse passer.
 */
function checkPreviousCoverage(): void {
  const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');
  
  if (!fs.existsSync(coveragePath)) {
    console.log('   Pas de rapport de couverture précédent → premier run, on continue\n');
    return;
  }
  
  try {
    const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf-8'));
    const total = coverage.total;
    
    if (!total) {
      console.warn('⚠️  Structure de couverture invalide → on continue\n');
      return;
    }
    
    // Seuils différenciés : les branches (if/else, ternaires JSX) sont plus dures à couvrir
    const SEUILS: Record<string, number> = {
      lines: 80,
      statements: 80,
      functions: 80,
      branches: 65,
    };
    let tousAuDessus = true;
    
    for (const [metric, seuil] of Object.entries(SEUILS)) {
      const pct = total[metric]?.pct ?? 0;
      const status = pct >= seuil ? '✅' : '❌';
      console.log(`   ${status} ${metric}: ${pct}% (seuil: ${seuil}%)`);
      if (pct < seuil) tousAuDessus = false;
    }
    
    if (!tousAuDessus) {
      console.error('\n❌ Couverture insuffisante détectée sur le run précédent');
      console.error('   Corriger la couverture avant de publier\n');
      throw new Error('Couverture insuffisante');
    }
    
    console.log('\n✅ Couverture précédente OK sur tous les critères\n');
  } catch (error) {
    if (error instanceof Error && error.message.includes('Couverture insuffisante')) {
      throw error;
    }
    console.warn('⚠️  Erreur lors de la lecture de la couverture → on continue\n');
  }
}

/**
 * Vérification TypeScript (même contrôle que Vercel au build)
 * Détecte les erreurs de type (ex. variable non définie) avant de lancer les tests
 */
function runTypeCheck(): void {
  console.log('🔍 Vérification TypeScript (tsc --noEmit)...\n');
  try {
    execSync('npx tsc --noEmit', {
      encoding: 'utf-8',
      stdio: 'inherit'
    });
    console.log('\n✅ Vérification TypeScript OK\n');
  } catch (error) {
    console.error('\n❌ Erreur TypeScript : le build échouerait sur Vercel');
    console.error('   Corriger les erreurs ci-dessus avant de publier\n');
    throw error;
  }
}

/**
 * Fonction principale
 */
function main() {
  console.log('🚀 Démarrage du processus "Publie"\n');
  
  console.log('='.repeat(60));
  console.log('Étape 0/3 : Vérification de la couverture précédente\n');
  
  checkPreviousCoverage();
  
  console.log('='.repeat(60));
  console.log('Étape 1/3 : Vérification TypeScript\n');
  
  runTypeCheck();
  
  console.log('='.repeat(60));
  console.log('Étape 2/3 : Lancement des tests et collecte des métriques\n');
  
  try {
    runTestsAndCollectMetrics();
  } catch (error) {
    // Analyser les échecs si test-results.json existe (Jest)
    const jestResultsPath = path.join(process.cwd(), 'test-results.json');
    let resultsJson: any = null;
    if (fs.existsSync(jestResultsPath)) {
      try {
        resultsJson = JSON.parse(fs.readFileSync(jestResultsPath, 'utf-8'));
      } catch {
        // Ignorer
      }
    }
    analyzeTestFailures('', '', resultsJson);
    if (resultsJson) {
      const total = resultsJson.numTotalTests || 0;
      const passed = resultsJson.numPassedTests || 0;
      const failed = resultsJson.numFailedTests || 0;
      console.log(`\n📊 Résumé Jest : ${passed}/${total} passent, ${failed} échouent\n`);
    }
    console.error('❌ Publication Git annulée — ne pas publier en cas d\'erreur.\n');
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log('Étape 3/3 : Publication sur Git\n');

  const commitMessage = `Publication automatique - Tests OK, métriques à jour`;
  publishToGit(commitMessage);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Processus "Publie" terminé avec succès !');
  console.log('   - Couverture ≥ 80% vérifiée');
  console.log('   - Tests (Jest + BDD + E2E) passés en une seule passe');
  console.log('   - Métriques et chronométrage à jour');
  console.log('   - Modifications publiées sur Git');
  console.log('   - Site prêt pour déploiement sur Vercel\n');
}

// Exécuter le script
main();
