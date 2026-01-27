# Inventaire complet des métriques de la page Metrics

## 📊 Métriques affichées sur la page

### Section : 🧪 Tests

#### 1. Total Tests
- **Variables** : `totalTests`, `passingTests`, `failingTests`, `testDuration`, `totalTestFiles`
- **Calcul** :
  - `totalTests` = `unitTests + integrationTests + bddScenarios + e2eSteps` (somme des tests DÉFINIS)
  - `passingTests` = `unitTestPassed + integrationTestPassed + bddScenariosPassed + e2eStepsPassed`
  - `failingTests` = `unitTestFailed + integrationTestFailed + bddScenariosFailed + e2eStepsFailed`
  - `testDuration` = `jestDurations.totalDuration` (depuis `test-results.json` généré par Jest)
  - `totalTestFiles` = `unitTestFiles + integrationTestFiles + bddFeatures + e2eScenarioFiles`
- **Source** : `collectTestMetrics()` lignes 420-763

#### 2. Scénarios BDD
- **Variables** : `bddScenarios`, `bddScenariosPassed`, `bddScenariosFailed`, `bddTestDuration`, `bddFeatures`
- **Calcul** :
  - `bddScenarios` = Compte les occurrences de `Scénario:` et `Scénario Outline:` dans les fichiers `.feature` (ligne 467)
  - `bddFeatures` = Compte les fichiers `.feature` dans `tests/bdd/` (ligne 454)
  - `bddScenariosPassed` = `bddScenarios` (par défaut, tous réussis) - peut être ajusté si résultats E2E disponibles (ligne 608-617)
  - `bddScenariosFailed` = 0 (par défaut) - peut être ajusté si résultats E2E disponibles
  - `bddTestDuration` = Depuis `playwright-report/durations.json` → `bddDuration` (mesuré avec `Date.now()` avant/après `npx playwright test .features-gen`)
- **Source** : `collectTestMetrics()` lignes 454-473, 608-623, 740-746

#### 3. Tests Unitaires
- **Variables** : `unitTests`, `unitTestPassed`, `unitTestFailed`, `unitTestDuration`, `unitTestFiles`
- **Calcul** :
  - `unitTests` = Compte les occurrences de `it(` et `test(` dans les fichiers `tests/unit/*.test.ts` (ligne 423-425)
  - `unitTestFiles` = Compte les fichiers `tests/unit/*.test.ts` (ligne 423-425)
  - `unitTestPassed` = Calculé proportionnellement depuis `test-results.json` (Jest) en fonction du ratio de réussite global (lignes 538-600)
  - `unitTestFailed` = Calculé proportionnellement depuis `test-results.json` (Jest) (lignes 538-600)
  - `unitTestDuration` = Depuis `test-results.json` (Jest) → somme des durées des fichiers de tests unitaires (ligne 731)
- **Source** : `collectTestMetrics()` lignes 422-425, 538-600, 725-731, `collectJestTestDurations()` lignes 356-415

#### 4. Tests Intégration
- **Variables** : `integrationTests`, `integrationTestPassed`, `integrationTestFailed`, `integrationTestDuration`, `integrationTestFiles`
- **Calcul** :
  - `integrationTests` = Compte les occurrences de `it(` et `test(` dans les fichiers `*.integration.test.ts` (dans `tests/integration/` et `tests/unit/`) (lignes 427-452)
  - `integrationTestFiles` = Compte les fichiers `*.integration.test.ts` (lignes 427-452)
  - `integrationTestPassed` = Calculé proportionnellement depuis `test-results.json` (Jest) (lignes 538-600)
  - `integrationTestFailed` = Calculé proportionnellement depuis `test-results.json` (Jest) (lignes 538-600)
  - `integrationTestDuration` = Depuis `test-results.json` (Jest) → somme des durées des fichiers de tests d'intégration (ligne 734)
- **Source** : `collectTestMetrics()` lignes 427-452, 538-600, 730-738, `collectJestTestDurations()` lignes 356-415

#### 5. Steps E2E
- **Variables** : `e2eSteps`, `e2eStepsPassed`, `e2eStepsFailed`, `e2eTestDuration`, `e2eScenarioFiles`
- **Calcul** :
  - `e2eSteps` = Compte les occurrences de `await page.` dans les fichiers `tests/end-to-end/*.spec.ts` (ligne 516)
  - `e2eScenarioFiles` = Compte les fichiers `tests/end-to-end/*.spec.ts` (ligne 515)
  - `e2eStepsPassed` = Calculé depuis `e2eTests.passed` (si tous les tests réussissent, tous les steps réussissent) (lignes 627-647)
  - `e2eStepsFailed` = Calculé depuis `e2eTests.failed` (1 step échoué par test échoué) (lignes 627-647)
  - `e2eTestDuration` = Depuis `playwright-report/durations.json` → `e2eDuration` (mesuré avec `Date.now()` avant/après `npx playwright test tests/end-to-end`) (lignes 495-503)
  - **Note** : `e2eScenarios` existe dans le code mais n'est pas affichée directement (utilisée pour le calcul)
- **Source** : `collectTestMetrics()` lignes 514-516, 625-659, 748-754, `collectE2EMetrics()` lignes 174-351

### Section : 🎯 Couverture de Code

#### 6. Lignes (Couverture)
- **Variables** : `coverage.lines.total`, `coverage.lines.covered`, `coverage.lines.percentage`
- **Calcul** :
  - Depuis `coverage/coverage-summary.json` (généré par Jest avec `--coverage`)
  - `total` = `coverage.total.lines.total`
  - `covered` = `coverage.total.lines.covered`
  - `percentage` = `coverage.total.lines.pct`
- **Source** : `collectCoverageMetrics()` lignes 768-848

#### 7. Statements (Couverture)
- **Variables** : `coverage.statements.total`, `coverage.statements.covered`, `coverage.statements.percentage`
- **Calcul** :
  - Depuis `coverage/coverage-summary.json`
  - `total` = `coverage.total.statements.total`
  - `covered` = `coverage.total.statements.covered`
  - `percentage` = `coverage.total.statements.pct`
- **Source** : `collectCoverageMetrics()` lignes 768-848

#### 8. Fonctions (Couverture)
- **Variables** : `coverage.functions.total`, `coverage.functions.covered`, `coverage.functions.percentage`
- **Calcul** :
  - Depuis `coverage/coverage-summary.json`
  - `total` = `coverage.total.functions.total`
  - `covered` = `coverage.total.functions.covered`
  - `percentage` = `coverage.total.functions.pct`
- **Source** : `collectCoverageMetrics()` lignes 768-848

#### 9. Branches (Couverture)
- **Variables** : `coverage.branches.total`, `coverage.branches.covered`, `coverage.branches.percentage`
- **Calcul** :
  - Depuis `coverage/coverage-summary.json`
  - `total` = `coverage.total.branches.total`
  - `covered` = `coverage.total.branches.covered`
  - `percentage` = `coverage.total.branches.pct`
- **Source** : `collectCoverageMetrics()` lignes 768-848

### Section : ✨ Qualité du Code

#### 10. Erreurs ESLint
- **Variables** : `quality.eslintErrors`
- **Calcul** :
  - Exécute `npm run lint -- --format=json`
  - Additionne `errorCount` de tous les fichiers analysés
- **Source** : `collectQualityMetrics()` lignes 853-879

#### 11. Warnings ESLint
- **Variables** : `quality.eslintWarnings`
- **Calcul** :
  - Exécute `npm run lint -- --format=json`
  - Additionne `warningCount` de tous les fichiers analysés
- **Source** : `collectQualityMetrics()` lignes 853-879

#### 12. Type Coverage
- **Variables** : `quality.typeCoverage`
- **Calcul** :
  - **Valeur** : `"NC"` (Non Calculé) - **N'est pas affichée** si valeur = "NC"
  - ⚠️ **À améliorer** : Devrait être calculé réellement
- **Source** : `collectQualityMetrics()` ligne 874

#### 13. Complexité Cyclomatique
- **Variables** : `quality.cyclomaticComplexity`
- **Calcul** :
  - **Valeur** : `"NC"` (Non Calculé) - **N'est pas affichée** si valeur = "NC"
  - ⚠️ **À améliorer** : Devrait être calculé réellement
- **Source** : `collectQualityMetrics()` ligne 875

#### 14. Index de Maintenabilité
- **Variables** : `quality.maintainabilityIndex`
- **Calcul** :
  - **Valeur** : `"NC"` (Non Calculé) - **N'est pas affichée** si valeur = "NC"
  - ⚠️ **À améliorer** : Devrait être calculé réellement
- **Source** : `collectQualityMetrics()` ligne 876

#### 15. Dette Technique
- **Variables** : `quality.technicalDebt`
- **Calcul** :
  - **Valeur** : `"NC"` (Non Calculé) - **N'est pas affichée** si valeur = "NC"
  - ⚠️ **À améliorer** : Devrait être calculé réellement
- **Source** : `collectQualityMetrics()` ligne 877

### Section : 📏 Taille du Code

#### 16. Fichiers Total
- **Variables** : `size.totalFiles`
- **Calcul** :
  - `components + pages + utils`
  - `components` = Compte les fichiers `.tsx` et `.ts` dans `components/` (ligne 887)
  - `pages` = Compte les fichiers `page.tsx` dans `app/` (ligne 888)
  - `utils` = Compte les fichiers `.ts` dans `utils/` (ligne 889)
- **Source** : `collectSizeMetrics()` lignes 884-907

#### 17. Lignes de Code
- **Variables** : `size.sourceLines`
- **Calcul** :
  - `appLines + componentsLines + utilsLines`
  - `appLines` = Compte les lignes dans `app/*.tsx` et `app/*.ts` (ligne 892)
  - `componentsLines` = Compte les lignes dans `components/*.tsx` (ligne 893)
  - `utilsLines` = Compte les lignes dans `utils/*.ts` (ligne 894)
- **Source** : `collectSizeMetrics()` lignes 884-907

#### 18. Composants
- **Variables** : `size.components`
- **Calcul** :
  - Compte les fichiers `.tsx` et `.ts` dans `components/` (ligne 887)
- **Source** : `collectSizeMetrics()` lignes 884-907

#### 19. Pages
- **Variables** : `size.pages`
- **Calcul** :
  - Compte les fichiers `page.tsx` dans `app/` (ligne 888)
- **Source** : `collectSizeMetrics()` lignes 884-907

#### 20. Utils
- **Variables** : `size.utils`
- **Calcul** :
  - Compte les fichiers `.ts` dans `utils/` (ligne 889)
- **Source** : `collectSizeMetrics()` lignes 884-907

#### 21. Tests (fichiers)
- **Variables** : `size.tests`
- **Calcul** :
  - Compte les fichiers `.test.ts` et `.test.tsx` dans `tests/` (ligne 890)
- **Source** : `collectSizeMetrics()` lignes 884-907

### Section : 📦 Dépendances

#### 22. Total Dépendances
- **Variables** : `dependencies.total`, `dependencies.production`, `dependencies.development`
- **Calcul** :
  - `production` = Nombre de clés dans `package.json.dependencies` (ligne 916)
  - `development` = Nombre de clés dans `package.json.devDependencies` (ligne 917)
  - `total` = `production + development` (ligne 936)
- **Source** : `collectDependencyMetrics()` lignes 912-942

#### 23. Vulnérabilités
- **Variables** : `dependencies.vulnerabilities.total`, `dependencies.vulnerabilities.critical`, `dependencies.vulnerabilities.high`, `dependencies.vulnerabilities.moderate`, `dependencies.vulnerabilities.low`
- **Calcul** :
  - Exécute `npm audit --json`
  - Lit depuis `audit.metadata.vulnerabilities.*`
- **Source** : `collectDependencyMetrics()` lignes 912-942

### Section : ⚡ Performance

#### 24. Taille Bundle
- **Variables** : `performance.bundleSize`
- **Calcul** :
  - Calcule la taille totale du dossier `.next/` en KB (lignes 980-1000)
  - Parcourt récursivement tous les fichiers et additionne les tailles
- **Source** : `collectPerformanceMetrics()` lignes 947-1007

#### 25. Temps de Build
- **Variables** : `performance.buildTime`
- **Calcul** :
  - Lit depuis `.next/build-metrics.json` → `buildTime` (ligne 959)
  - ⚠️ **À améliorer** : Le fichier doit être généré lors du build
- **Source** : `collectPerformanceMetrics()` lignes 947-1007

#### 26. Score Lighthouse
- **Variables** : `performance.lighthouseScore`
- **Calcul** :
  - **Valeur** : `"NC"` (Non Calculé) - **N'est pas affichée** si valeur = "NC" ou undefined
  - ⚠️ **À améliorer** : Devrait être calculé réellement
- **Source** : `collectPerformanceMetrics()` ligne 1005

### Métadonnées

#### 27. Timestamp
- **Variables** : `timestamp`
- **Calcul** : `new Date().toISOString()` (ligne 1285)
- **Source** : `main()` ligne 1285

#### 28. Branche Git
- **Variables** : `branch`
- **Calcul** : `git rev-parse --abbrev-ref HEAD` (ligne 1010)
- **Source** : `getGitInfo()` lignes 1008-1016

#### 29. Commit Git
- **Variables** : `commit`
- **Calcul** : `git rev-parse --short HEAD` (ligne 1011)
- **Source** : `getGitInfo()` lignes 1008-1016

#### 30. Version du site
- **Variables** : `version` (affichée dans le header, mais pas dans le JSON)
- **Calcul** : Lit depuis `site-version.json` → `major.minor.patch` (lignes 36-53)
- **Source** : `loadSiteVersion()` dans `app/metrics/page.tsx` lignes 36-53

## 📋 Résumé par catégorie

### Tests (5 cartes)
1. Total Tests (5 variables)
2. Scénarios BDD (5 variables)
3. Tests Unitaires (5 variables)
4. Tests Intégration (5 variables)
5. Steps E2E (5 variables)

**Total variables tests** : 25 variables

### Couverture (4 barres de progression)
6. Lignes (3 variables)
7. Statements (3 variables)
8. Fonctions (3 variables)
9. Branches (3 variables)

**Total variables couverture** : 12 variables

### Qualité (4 cartes)
10. Erreurs ESLint (1 variable)
11. Warnings ESLint (1 variable)
12. Type Coverage (1 variable - hardcodée)
13. Complexité Cyclomatique (1 variable - hardcodée)
14. Index de Maintenabilité (1 variable - hardcodée)
15. Dette Technique (1 variable - hardcodée)

**Total variables qualité** : 6 variables (3 hardcodées)

### Taille (4 cartes)
16. Fichiers Total (1 variable)
17. Lignes de Code (1 variable)
18. Composants (1 variable)
19. Pages (1 variable)
20. Utils (1 variable - non affichée mais calculée)
21. Tests (1 variable - non affichée mais calculée)

**Total variables taille** : 6 variables (2 non affichées)

### Dépendances (2 cartes)
22. Total Dépendances (3 variables)
23. Vulnérabilités (5 variables)

**Total variables dépendances** : 8 variables

### Performance (2-3 cartes)
24. Taille Bundle (1 variable)
25. Temps de Build (1 variable)
26. Score Lighthouse (1 variable - undefined)

**Total variables performance** : 3 variables (1 undefined)

### Métadonnées (3 variables)
27. Timestamp (1 variable)
28. Branche Git (1 variable)
29. Commit Git (1 variable)
30. Version site (1 variable - chargée séparément)

**Total variables métadonnées** : 4 variables

## 📊 Total général

**Total variables métriques** : ~65 variables

## ⚠️ Points à améliorer

1. **Type Coverage** : Valeur "NC" (Non Calculé) - **N'est pas affichée** - Devrait être calculée
2. **Complexité Cyclomatique** : Valeur "NC" (Non Calculé) - **N'est pas affichée** - Devrait être calculée
3. **Index de Maintenabilité** : Valeur "NC" (Non Calculé) - **N'est pas affichée** - Devrait être calculée
4. **Dette Technique** : Valeur "NC" (Non Calculé) - **N'est pas affichée** - Devrait être calculée
5. **Score Lighthouse** : Valeur "NC" (Non Calculé) - **N'est pas affichée** - Devrait être calculé
6. **Temps de Build** : Nécessite `.next/build-metrics.json` (doit être généré lors du build)

## 🔄 Calculs complexes

### Répartition proportionnelle des tests Jest (lignes 538-600)
- Calcule les ratios de réussite/échec depuis `test-results.json`
- Répartit proportionnellement entre tests unitaires et intégration
- Ajuste pour garantir que `passed + failed = total` pour chaque catégorie

### Calcul des steps E2E réussis/échoués (lignes 625-659)
- Si tous les tests E2E réussissent → tous les steps réussissent
- Si des tests échouent → 1 step échoué par test échoué
- Ajuste pour garantir que `passed + failed = total steps`
