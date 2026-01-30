# Diagnostic - Chronométrage BDD et E2E

## 🔍 Problème identifié

### Symptômes
- **v1** : Les durées BDD et E2E étaient identiques (une seule mesure reportée deux fois)
- **v2** : La durée BDD est à zéro

### Cause racine

Le problème vient de la confusion entre deux sources de données pour les durées :

1. **Mesure avec `Date.now()`** (lignes 1237-1239 et 1250-1252) :
   - Mesure la durée BDD : `Date.now()` avant/après `npx playwright test .features-gen`
   - Mesure la durée E2E : `Date.now()` avant/après `npx playwright test tests/end-to-end`
   - Sauvegarde dans `playwright-report/durations.json`

2. **Lecture depuis `playwright-report/data.json`** (fonction `collectE2EMetrics()`, ligne 174) :
   - Playwright génère un fichier `data.json` avec les résultats de TOUS les tests exécutés
   - Si `npm run test:bdd` est exécuté (qui lance `playwright test` sans filtre), il exécute BDD + E2E dans la même session
   - Le fichier `data.json` contient alors les résultats combinés avec une durée totale

### Scénario v1 (valeurs identiques)

1. Utilisateur exécute `npm run test:bdd` (qui lance `playwright test` sans filtre)
2. Playwright exécute BDD + E2E dans la même session
3. `playwright-report/data.json` contient la durée totale (BDD + E2E)
4. `collect-metrics-simple.ts` lit cette durée totale depuis `data.json`
5. Cette durée totale est utilisée pour BDD ET E2E → **valeurs identiques**

### Scénario v2 (BDD à zéro)

1. Le script `collect-metrics-simple.ts` mesure BDD avec `Date.now()` (ligne 1237-1239)
2. Si BDD échoue ou n'est pas exécuté, `bddDurationMs` reste à 0 (valeur initiale ligne 1221)
3. La durée est sauvegardée dans `durations.json` avec `bddDuration: 0`
4. Lors de la collecte suivante, `bddDuration` est lu depuis `durations.json` → **valeur à zéro**

## 💡 Solution proposée

### Principe
**Séparer complètement les mesures BDD et E2E** et ne jamais utiliser les durées combinées depuis `playwright-report/data.json`.

### Modifications nécessaires

#### 1. Nettoyer `playwright-report/data.json` avant chaque mesure

Avant de mesurer BDD ou E2E, supprimer ou renommer le fichier `data.json` existant pour éviter de lire des résultats obsolètes ou combinés.

#### 2. Utiliser uniquement les durées mesurées avec `Date.now()`

La fonction `collectE2EMetrics()` ne doit **jamais** utiliser la durée depuis `data.json` pour les tests E2E. Elle doit uniquement :
- Compter les tests (total, passed, failed)
- Utiliser la durée depuis `durations.json` (mesurée avec `Date.now()`)

#### 3. Garantir que BDD et E2E sont toujours mesurés séparément

Même si les tests sont exécutés dans la même session Playwright, les durées doivent être mesurées séparément avec `Date.now()` avant/après chaque commande.

#### 4. Gérer les cas d'erreur

Si BDD échoue :
- La durée mesurée jusqu'à l'erreur doit être sauvegardée
- Ne pas laisser `bddDurationMs` à 0 si une mesure a été effectuée

### Code à modifier

**Fichier : `scripts/collect-metrics-simple.ts`**

1. **Ligne 1233-1245** : S'assurer que `bddDurationMs` est toujours mesuré, même en cas d'erreur partielle
2. **Ligne 174-350** : Modifier `collectE2EMetrics()` pour ne jamais utiliser `stats.duration` depuis `data.json` pour la durée E2E
3. **Ligne 495-499** : Utiliser uniquement `e2eDurationFromTiming` (depuis `durations.json`) pour la durée E2E
4. **Avant ligne 1237** : Nettoyer `playwright-report/data.json` avant de mesurer BDD
5. **Avant ligne 1250** : Nettoyer `playwright-report/data.json` avant de mesurer E2E

### Structure proposée

```typescript
// Avant mesure BDD
if (fs.existsSync(playwrightReportData)) {
  fs.renameSync(playwrightReportData, playwrightReportData + '.backup');
}

// Mesurer BDD
const bddStart = Date.now();
execSync('npx playwright test .features-gen', ...);
bddDurationMs = Date.now() - bddStart;

// Avant mesure E2E
if (fs.existsSync(playwrightReportData)) {
  fs.renameSync(playwrightReportData, playwrightReportData + '.backup');
}

// Mesurer E2E
const e2eStart = Date.now();
execSync('npx playwright test tests/end-to-end', ...);
e2eDurationMs = Date.now() - e2eStart;

// collectE2EMetrics() ne doit utiliser que les comptages depuis data.json
// La durée E2E vient uniquement de durations.json (e2eDurationFromTiming)
```

## ✅ Solution implémentée

### Modifications apportées

1. **Fonction `collectE2EMetrics()` modifiée** :
   - Ne retourne **jamais** de durée depuis `data.json` (toujours `duration: 0`)
   - Utilise uniquement `data.json` pour compter les tests (total, passed, failed)
   - La durée E2E vient **uniquement** de `durations.json` (mesurée avec `Date.now()`)

2. **Nettoyage de `data.json` avant chaque mesure** :
   - Avant mesure BDD : renomme `data.json` en `data.json.backup-bdd`
   - Avant mesure E2E : renomme `data.json` en `data.json.backup-e2e`
   - Évite de lire des résultats obsolètes ou combinés

3. **Gestion des erreurs améliorée** :
   - Si BDD échoue, la durée mesurée jusqu'à l'erreur est conservée
   - Si E2E échoue, la durée mesurée jusqu'à l'erreur est conservée
   - Les variables `bddStart` et `e2eStart` sont déclarées dans le bon scope

4. **Utilisation exclusive de `durations.json`** :
   - La durée BDD vient **uniquement** de `durations.json` (ligne 489)
   - La durée E2E vient **uniquement** de `durations.json` (ligne 490, 495-499)
   - Ne jamais utiliser `e2eTests.duration` depuis `collectE2EMetrics()`

## ✅ Résultat attendu

- **Durée BDD** : Mesurée uniquement avec `Date.now()` avant/après `npx playwright test .features-gen`
- **Durée E2E** : Mesurée uniquement avec `Date.now()` avant/après `npx playwright test tests/end-to-end`
- **Pas de confusion** : Les durées ne sont jamais mélangées ou réutilisées entre BDD et E2E
- **Gestion d'erreur** : Si un test échoue, la durée mesurée jusqu'à l'erreur est conservée
- **Séparation claire** : `data.json` sert uniquement à compter les tests, `durations.json` sert uniquement aux durées
