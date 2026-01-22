# État de Cucumber dans le projet

## Réponse à vos questions

### 1. Utilise-t-on encore Cucumber ?

**Oui, mais seulement pour 4 features qui utilisent Jest/Cucumber :**
- `faisons-connaissance.feature` → `faisons-connaissance.steps.ts` (utilise `@cucumber/cucumber`)
- `call-to-action.feature` → `call-to-action.steps.ts` (utilise `@cucumber/cucumber`)
- `site-map.feature` → `site-map.steps.ts` (utilise `@cucumber/cucumber`)
- `e2e-ids-assignment.feature` → `e2e-ids-assignment.steps.ts` (utilise `@cucumber/cucumber`)

**Ces tests sont exécutés par `npm test` (Jest), pas par `npm run test:bdd`.**

### 2. Peut-on désinstaller Cucumber ?

**Dépend de votre choix :**

#### Option A : Garder les deux systèmes (actuel)
- ✅ **Garder** `@cucumber/cucumber` et `cucumber-html-reporter`
- Les 4 features Jest/Cucumber continuent de fonctionner
- Les 2 features Playwright BDD continuent de fonctionner
- **Inconvénient** : Deux systèmes différents

#### Option B : Migrer tout vers Playwright BDD (recommandé)
- ✅ **Désinstaller** `@cucumber/cucumber` et `cucumber-html-reporter`
- Migrer les 4 fichiers `.steps.ts` de Jest/Cucumber vers Playwright BDD
- **Avantage** : Un seul système, tests E2E réels, spécifications agnostiques

#### Option C : Supprimer les features Jest/Cucumber
- ✅ **Désinstaller** `@cucumber/cucumber` et `cucumber-html-reporter`
- Supprimer les 4 features qui utilisent Jest/Cucumber
- **Inconvénient** : Perte de ces tests

## Fichiers liés à Cucumber

- `cucumber.js` : Configuration pour les tests Jest/Cucumber
- `cucumber-report.html` : Rapport généré par `cucumber-html-reporter` (pour Jest/Cucumber)
- `tests/bdd/setup.ts` : Setup pour Jest/Cucumber

## Playwright BDD n'utilise PAS Cucumber

`playwright-bdd` est une **alternative** à Cucumber qui :
- Lit les fichiers `.feature` (Gherkin)
- Génère directement des tests Playwright (pas besoin de Cucumber)
- Utilise `npx playwright show-report` pour les rapports (pas `cucumber-html-reporter`)

## Recommandation

**Option B** : Migrer vers Playwright BDD pour :
- ✅ Un seul système de tests BDD
- ✅ Tests E2E réels (navigation dans un vrai navigateur)
- ✅ Spécifications `.feature` agnostiques (réutilisables avec C#, Python, etc.)
- ✅ Rapports Playwright plus détaillés

Souhaitez-vous que je migre les 4 features Jest/Cucumber vers Playwright BDD ?
