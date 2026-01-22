# État des tests BDD

## Problème identifié

Vous avez **deux systèmes de tests BDD** qui coexistent :

### 1. Playwright BDD (exécuté par `npm run test:bdd`)
- ✅ `about-site.feature` → `about-site.steps.ts` (playwright-bdd)
- ✅ `navigation.feature` → `navigation.steps.ts` (playwright-bdd)

**Ces tests sont configurés dans `playwright.config.ts` et sont exécutés.**

### 2. Jest/Cucumber (exécuté par `npm test`)
- ⚠️ `faisons-connaissance.feature` → `faisons-connaissance.steps.ts` (@cucumber/cucumber + Jest)
- ⚠️ `call-to-action.feature` → `call-to-action.steps.ts` (@cucumber/cucumber + Jest)
- ⚠️ `site-map.feature` → `site-map.steps.ts` (@cucumber/cucumber + Jest)
- ⚠️ `e2e-ids-assignment.feature` → `e2e-ids-assignment.steps.ts` (@cucumber/cucumber + Jest)

**Ces tests utilisent Jest et ne sont PAS exécutés par `npm run test:bdd`.**

### 3. Features sans steps
- ❌ `criteres-acceptation.feature` (pas de fichier .steps.ts)
- ❌ `page-content-types.feature` (pas de fichier .steps.ts)
- ❌ `user-stories-format.feature` (pas de fichier .steps.ts)

## Pourquoi "No tests found" ?

Quand vous lancez `npm run test:bdd`, cela exécute :
1. `bddgen test` → génère les tests Playwright depuis les features configurées
2. `playwright test` → exécute les tests générés dans `.features-gen/`

**Seulement 2 features sont configurées** dans `playwright.config.ts`, donc seulement 2 features sont générées et exécutées.

## Les fichiers `.feature.spec.js`

Les fichiers `.feature.spec.js` dans `.features-gen/` sont **générés automatiquement** par `playwright-bdd` à partir des fichiers `.feature`. Ils correspondent bien aux BDD créés intentionnellement :
- `.features-gen/tests/bdd/about-site.feature.spec.js` ← généré depuis `tests/bdd/about-site.feature`
- `.features-gen/tests/bdd/navigation.feature.spec.js` ← généré depuis `tests/bdd/navigation.feature`

## Solutions possibles

### Option 1 : Migrer toutes les features vers Playwright BDD (recommandé)
- Avantage : Un seul système, tests E2E réels
- Inconvénient : Nécessite de réécrire les steps Jest en steps Playwright

### Option 2 : Garder les deux systèmes
- Playwright BDD pour les tests E2E (navigation, pages)
- Jest/Cucumber pour les tests unitaires/intégration (parsing, validation)

### Option 3 : Ajouter les features manquantes à la config Playwright
- Ajouter les features qui ont des steps Playwright (actuellement seulement 2)
- Les autres features restent avec Jest/Cucumber

## Prochaines étapes

1. Décider quelle approche adopter
2. Si Option 1 : Migrer les steps Jest vers Playwright
3. Si Option 3 : Ajouter les features manquantes à `playwright.config.ts`
