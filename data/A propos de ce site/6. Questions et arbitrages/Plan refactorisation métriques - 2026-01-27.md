# Plan de refactorisation - Système de métriques

## ✅ Validation de la proposition

Votre proposition est **excellente** et simplifie considérablement le système actuel. Elle est cohérente avec l'architecture existante du projet.

### Points forts de la proposition

1. **Sérialisation simple** : Un seul fichier JSON dans `data/` (cohérent avec les autres pages)
2. **Algorithme clair** : Mesure avec `Date.now()` avant/après chaque test (séparation BDD/E2E garantie)
3. **Architecture cohérente** : Utilise le même pattern que les autres pages (`readPageData()`)

## 📋 Plan d'implémentation

### 1. Structure du fichier `data/metrics.json`

**Nom proposé** : `metrics.json` (cohérent avec les autres fichiers comme `index.json`, `plan-du-site.json`)

**Structure proposée** :
```json
{
  "timestamp": "2026-01-27T12:00:00.000Z",
  "branch": "main",
  "commit": "abc123",
  "version": "1.0.0",
  "tests": {
    "totalTests": 458,
    "passingTests": 458,
    "failingTests": 0,
    "testDuration": 12345,
    "totalTestFiles": 59,
    
    "unitTests": 400,
    "unitTestFiles": 50,
    "unitTestPassed": 400,
    "unitTestFailed": 0,
    "unitTestDuration": 8000,
    
    "integrationTests": 30,
    "integrationTestFiles": 5,
    "integrationTestPassed": 30,
    "integrationTestFailed": 0,
    "integrationTestDuration": 3000,
    
    "bddScenarios": 14,
    "bddFeatures": 7,
    "bddScenariosPassed": 14,
    "bddScenariosFailed": 0,
    "bddTestDuration": 5000,
    
    "e2eSteps": 200,
    "e2eScenarioFiles": 1,
    "e2eStepsPassed": 200,
    "e2eStepsFailed": 0,
    "e2eTestDuration": 15000
  },
  "coverage": {
    "lines": { "total": 5000, "covered": 4500, "percentage": 90 },
    "statements": { "total": 4500, "covered": 4050, "percentage": 90 },
    "functions": { "total": 300, "covered": 285, "percentage": 95 },
    "branches": { "total": 1000, "covered": 850, "percentage": 85 }
  },
  "quality": {
    "eslintErrors": 0,
    "eslintWarnings": 5,
    "typeCoverage": 95,
    "cyclomaticComplexity": 5
  },
  "size": {
    "totalFiles": 100,
    "sourceLines": 15000,
    "components": 30,
    "pages": 13
  },
  "dependencies": {
    "total": 50,
    "production": 20,
    "development": 30,
    "vulnerabilities": { "total": 0, "critical": 0, "high": 0, "moderate": 0, "low": 0 }
  },
  "performance": {
    "bundleSize": 500,
    "buildTime": 30000
  }
}
```

### 2. Script de collecte simplifié

**Fichier** : `scripts/collect-metrics-simple.ts` (ou nouveau `scripts/update-metrics.ts`)

**Algorithme** :
```typescript
// 1. Lire metrics.json existant (ou créer structure vide)
let metrics = readMetricsFile();

// 2. Mettre à jour les métriques de tests
// Tests unitaires et intégration (Jest)
const jestResults = runJestTests(); // --json --outputFile=test-results.json
metrics.tests.unitTests = countUnitTests();
metrics.tests.unitTestPassed = jestResults.passed;
metrics.tests.unitTestDuration = jestResults.duration;

// Tests BDD
const bddStart = Date.now();
execSync('npm run test:bdd:generate && npx playwright test .features-gen');
metrics.tests.bddTestDuration = Date.now() - bddStart;
metrics.tests.bddScenarios = countBddScenarios();

// Tests E2E
const e2eStart = Date.now();
execSync('npx playwright test tests/end-to-end');
metrics.tests.e2eTestDuration = Date.now() - e2eStart;
metrics.tests.e2eSteps = countE2ESteps();

// 3. Mettre à jour les autres métriques (coverage, quality, size, etc.)
metrics.coverage = collectCoverage();
metrics.quality = collectQuality();
metrics.size = collectSize();
metrics.dependencies = collectDependencies();
metrics.performance = collectPerformance();

// 4. Mettre à jour timestamp, branch, commit
metrics.timestamp = new Date().toISOString();
metrics.branch = getGitBranch();
metrics.commit = getGitCommit();

// 5. Sauvegarder dans data/metrics.json
writeMetricsFile(metrics);
```

### 3. Page Metrics simplifiée

**Fichier** : `app/metrics/page.tsx`

**Changement** :
```typescript
// Avant : Charge depuis public/metrics/history.json
const metricsData = loadMetrics();

// Après : Charge depuis data/metrics.json (comme les autres pages)
import { readPageData } from '../../utils/indexReader';
const metricsData = readPageData('metrics.json');
```

### 4. Fonction utilitaire

**Fichier** : `utils/metricsReader.ts` (nouveau)

```typescript
import fs from 'fs';
import path from 'path';
import type { MetricsSnapshot } from '../types/metrics';

export const readMetricsData = (): MetricsSnapshot => {
  const filePath = path.join(process.cwd(), 'data', 'metrics.json');
  
  if (!fs.existsSync(filePath)) {
    // Retourner une structure vide par défaut
    return getDefaultMetrics();
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
};
```

## 🔄 Avantages de cette approche

1. **Simplicité** : Un seul fichier JSON à maintenir
2. **Cohérence** : Même pattern que les autres pages (`readPageData()`)
3. **Séparation claire** : BDD et E2E mesurés séparément avec `Date.now()`
4. **Pas d'historique complexe** : Si besoin d'historique, on peut l'ajouter plus tard
5. **Facilité de test** : Le fichier JSON peut être mocké facilement

## ⚠️ Points à considérer

### Historique des métriques

**Question** : Souhaitez-vous conserver un historique des métriques ou juste la dernière valeur ?

**Options** :
- **Option A** : Juste la dernière valeur (plus simple, comme proposé)
- **Option B** : Ajouter un tableau `history` dans le JSON (si besoin d'évolution)
- **Option C** : Garder l'historique séparé dans `public/metrics/history.json` (comme actuellement)

**Recommandation** : Commencer par l'Option A (plus simple), ajouter l'historique plus tard si besoin.

### Nom du fichier

**Proposition** : `metrics.json` (cohérent avec `index.json`, `plan-du-site.json`)

**Alternative** : `data-metrics.json` (comme proposé) - mais moins cohérent avec les autres fichiers

**Recommandation** : `metrics.json` pour la cohérence

## ✅ Plan d'action

1. ✅ Créer la structure `data/metrics.json` avec toutes les métriques
2. ✅ Créer `utils/metricsReader.ts` pour lire le fichier
3. ✅ Simplifier `scripts/collect-metrics-simple.ts` pour mettre à jour `data/metrics.json`
4. ✅ Modifier `app/metrics/page.tsx` pour utiliser `readPageData('metrics.json')`
5. ✅ Supprimer l'ancien système (`public/metrics/history.json`, etc.)

## 🎯 Validation

Votre proposition est **parfaite** et prête à être implémentée. L'algorithme avec `Date.now()` garantit la séparation BDD/E2E.

**Souhaitez-vous que je procède à l'implémentation ?**
