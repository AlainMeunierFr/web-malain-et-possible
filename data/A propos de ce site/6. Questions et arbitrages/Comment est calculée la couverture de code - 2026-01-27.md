# Comment est calculée la couverture de code ?

## 🛠️ Outil utilisé

**Jest** (framework de tests JavaScript/TypeScript) avec son système de couverture intégré.

Jest utilise **Istanbul** (via `@jest/coverage`) pour instrumenter le code et mesurer la couverture lors de l'exécution des tests.

## 📋 Fichiers analysés

La configuration Jest (`jest.config.js`) définit quels fichiers sont analysés pour la couverture :

```javascript
collectCoverageFrom: [
  'components/**/*.{ts,tsx}',  // Tous les composants React
  'utils/**/*.{ts,tsx}',        // Toutes les utilitaires
  '!**/*.d.ts',                 // Exclure les fichiers de déclaration TypeScript
  '!**/*.test.{ts,tsx}',        // Exclure les fichiers de tests
  '!**/node_modules/**',        // Exclure node_modules
  '!**/continue/**',            // Exclure le dossier continue
],
```

**Résumé :**
- ✅ **Inclus** : `components/` et `utils/` (fichiers `.ts` et `.tsx`)
- ❌ **Exclus** : Fichiers de tests, déclarations TypeScript, node_modules, dossier continue

## 🔄 Processus de calcul

### 1. Génération de la couverture

**Commande exécutée :**
```bash
npm test -- --coverage --coverageReporters=json-summary --coverageReporters=text
```

**Ce qui se passe :**
1. Jest exécute tous les tests (unitaires et intégration)
2. Istanbul instrumente le code source (ajoute des compteurs pour suivre l'exécution)
3. Pendant l'exécution des tests, Istanbul enregistre quelles lignes/fonctions/branches sont exécutées
4. Jest génère un rapport de couverture dans le dossier `coverage/`

### 2. Fichiers générés

Jest génère plusieurs fichiers dans `coverage/` :
- `coverage-summary.json` : Résumé global (utilisé par le script de collecte)
- `coverage/lcov-report/` : Rapport HTML détaillé
- `coverage/lcov.info` : Format LCOV (pour intégration CI/CD)

### 3. Structure de `coverage-summary.json`

```json
{
  "total": {
    "lines": {
      "total": 1736,
      "covered": 1412,
      "skipped": 0,
      "pct": 81.33
    },
    "statements": {
      "total": 1808,
      "covered": 1474,
      "skipped": 0,
      "pct": 81.52
    },
    "functions": {
      "total": 205,
      "covered": 168,
      "skipped": 0,
      "pct": 81.95
    },
    "branches": {
      "total": 1130,
      "covered": 806,
      "skipped": 0,
      "pct": 71.32
    }
  },
  // ... détails par fichier
}
```

## 📊 Métriques collectées

### 1. Lignes (Lines)
- **Total** : Nombre total de lignes de code dans les fichiers analysés
- **Covered** : Nombre de lignes exécutées au moins une fois pendant les tests
- **Percentage** : `(covered / total) * 100`

### 2. Statements (Instructions)
- **Total** : Nombre total d'instructions exécutables
- **Covered** : Nombre d'instructions exécutées au moins une fois
- **Percentage** : `(covered / total) * 100`
- **Note** : Plus granulaire que les lignes (une ligne peut contenir plusieurs statements)

### 3. Functions (Fonctions)
- **Total** : Nombre total de fonctions/méthodes définies
- **Covered** : Nombre de fonctions appelées au moins une fois
- **Percentage** : `(covered / total) * 100`

### 4. Branches (Branches)
- **Total** : Nombre total de branches conditionnelles (if/else, switch, ternaires, etc.)
- **Covered** : Nombre de branches exécutées au moins une fois
- **Percentage** : `(covered / total) * 100`
- **Note** : Une condition `if (x > 0)` crée 2 branches : `true` et `false`

## 🔍 Collecte dans le script de métriques

**Fonction :** `collectCoverageMetrics()` dans `scripts/collect-metrics-simple.ts`

**Processus :**
1. Vérifie l'existence de `coverage/coverage-summary.json`
2. Lit le fichier JSON
3. Extrait les métriques depuis `coverage.total`
4. Retourne un objet avec les 4 métriques (lignes, statements, functions, branches)

**Code :**
```typescript
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
```

## ⚙️ Quand la couverture est générée

### Automatique
Lors de l'exécution de `npm run metrics:collect` :
1. Si `coverage-summary.json` n'existe pas → exécute `npm test -- --coverage`
2. Si le fichier existe → réutilise les résultats existants

### Manuel
```bash
# Générer la couverture manuellement
npm test -- --coverage

# Voir le rapport HTML
open coverage/lcov-report/index.html
```

## 📈 Affichage sur la page Metrics

Les métriques de couverture sont affichées dans la section **🎯 Couverture de Code** :
- 4 barres de progression (Lignes, Statements, Fonctions, Branches)
- Pourcentage affiché pour chaque métrique
- Statistiques : Total et Couvertes pour les lignes

## ⚠️ Limitations

1. **Tests E2E non inclus** : Seuls les tests Jest (unitaires et intégration) sont pris en compte
2. **Code Next.js** : Les fichiers dans `app/` ne sont pas analysés (seulement `components/` et `utils/`)
3. **Code côté serveur** : Le code exécuté uniquement côté serveur n'est pas couvert
4. **Tests BDD** : Les tests BDD (Playwright) ne contribuent pas à la couverture Jest

## 🔧 Configuration

**Fichier :** `jest.config.js`

**Options importantes :**
- `collectCoverageFrom` : Définit les fichiers à analyser
- `coverageReporters` : Définit les formats de rapport (`json-summary`, `text`, `lcov`, `html`)
- `testPathIgnorePatterns` : Exclut certains dossiers des tests (mais pas de la couverture)

## 📝 Exemple de calcul

**Fichier :** `utils/markdownParser.ts`
- **Lignes totales** : 150
- **Lignes couvertes** : 120 (exécutées par les tests)
- **Couverture** : `(120 / 150) * 100 = 80%`

**Si un test exécute :**
- Ligne 10 : `const result = parseMarkdown(text);` ✅
- Ligne 20 : `if (result) { ... }` ✅ (branche true)
- Ligne 25 : `else { ... }` ❌ (branche false non testée)

**Résultat :**
- **Lignes** : 2/3 = 66.7%
- **Statements** : 2/3 = 66.7%
- **Functions** : 1/1 = 100% (si `parseMarkdown` est appelée)
- **Branches** : 1/2 = 50% (seule la branche `true` est testée)
