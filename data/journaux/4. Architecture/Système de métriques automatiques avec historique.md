# Système de métriques automatiques avec historique et tendances

## Introduction

Dans la plupart des projets, les métriques de qualité (tests, couverture, taille du code, etc.) sont collectées manuellement ou de manière ponctuelle. Cette approche rend difficile le suivi de l'évolution de la qualité dans le temps et la détection précoce des dérives.

Le besoin identifié est triple :
1. **Visibilité continue** : Suivre l'évolution de la qualité du code dans le temps
2. **Détection précoce** : Détecter les dérives avant qu'elles ne deviennent problématiques
3. **Pilotage** : Utiliser les métriques comme outil de pilotage, pas seulement de reporting

Pour répondre à ces besoins, un système de métriques automatiques a été mis en place : collecte automatique de métriques de qualité (tests, couverture, qualité de code, taille, dépendances, performance) avec historique (100 snapshots), calcul automatique des tendances (up, down, stable), et affichage dans un dashboard visuel accessible via une route dédiée.

## Résumé

Cette stratégie repose sur trois mécanismes interconnectés :

**1. Collecte automatique**
Un script (`collect-metrics-simple.ts`) parcourt automatiquement le projet pour collecter des métriques exhaustives :
- Tests (unitaires, intégration, E2E)
- Couverture de code
- Qualité de code (complexité, lignes de code)
- Taille du projet (fichiers, lignes)
- Dépendances
- Performance E2E

**2. Historique et tendances**
Les métriques sont stockées avec un historique (100 snapshots maximum) et des tendances calculées automatiquement (up ↗️, down ↘️, stable →) pour chaque métrique.

**3. Dashboard visuel**
Un dashboard accessible via `/metrics` affiche toutes les métriques avec leur historique et leurs tendances, permettant un suivi visuel de l'évolution de la qualité.

Cette approche transforme les métriques en outil de pilotage continu : l'évolution de la qualité est visible en temps réel, les dérives sont détectées précocement, et les décisions sont guidées par des données objectives.

---

## Collecte automatique des métriques

### Types de métriques collectées

**Tests** :
- Nombre de tests unitaires
- Nombre de tests d'intégration
- Nombre de tests E2E
- Nombre d'étapes E2E (appels `await page.*`)
- Résultats E2E (total, passed, failed, duration)

**Couverture de code** :
- Couverture globale (statements, branches, functions, lines)
- Couverture par fichier

**Qualité de code** :
- Complexité cyclomatique
- Lignes de code (TypeScript, CSS, JSON, Markdown)
- Nombre de fichiers par type

**Taille du projet** :
- Nombre total de fichiers
- Nombre de lignes de code
- Taille des dépendances

**Performance** :
- Durée des tests E2E
- Date de dernière exécution E2E

### Script de collecte

Le script `collect-metrics-simple.ts` parcourt automatiquement le projet :

```typescript
function collectMetrics(): MetricsSnapshot {
  return {
    timestamp: new Date().toISOString(),
    tests: {
      unitTests: countTestsInFiles('tests/unit'),
      integrationTests: countTestsInFiles('tests/integration'),
      e2eTests: collectE2EMetrics(),
    },
    coverage: collectCoverageMetrics(),
    quality: {
      complexity: calculateComplexity(),
      linesOfCode: {
        typescript: countLines('**/*.ts'),
        css: countLines('**/*.css'),
        json: countLines('**/*.json'),
        markdown: countLines('**/*.md'),
      },
    },
    size: {
      totalFiles: countFiles('**/*'),
      dependencies: countDependencies(),
    },
  };
}
```

**Exécution** : Le script peut être exécuté manuellement (`npm run metrics:collect`) ou automatiquement lors du build.

---

## Historique et tendances

### Stockage de l'historique

Les métriques sont stockées dans `public/metrics/history.json` :

```typescript
interface MetricsHistory {
  latest: MetricsSnapshot;        // Dernier snapshot
  snapshots: MetricsSnapshot[];    // Historique (max 100)
}
```

**Limite** : 100 snapshots maximum pour éviter une croissance infinie.

**Rotation** : Les snapshots les plus anciens sont supprimés automatiquement.

### Calcul des tendances

Pour chaque métrique, une tendance est calculée automatiquement :

```typescript
function calculateTrend(
  current: number,
  previous: number | undefined
): 'up' | 'down' | 'stable' {
  if (previous === undefined) {
    return 'stable';
  }
  if (current > previous) {
    return 'up';
  }
  if (current < previous) {
    return 'down';
  }
  return 'stable';
}
```

**Affichage** :
- ↗️ pour `up` (augmentation)
- ↘️ pour `down` (diminution)
- → pour `stable` (stable)

**Avantage** : Visibilité immédiate de l'évolution de chaque métrique.

---

## Dashboard visuel

### Page de visualisation

Une page dédiée (`app/metrics/page.tsx`) affiche toutes les métriques :

**Composants** :
- **MetricCard** : Affiche une métrique avec sa valeur, son unité, et sa tendance
- **ProgressBar** : Affiche une métrique sous forme de barre de progression
- **Chart** : Affiche l'historique d'une métrique sous forme de graphique

**Exemple** :
```typescript
<MetricCard
  title="Tests unitaires"
  value={metrics.tests.unitTests}
  trend={trends.unitTests}
/>
```

### Métriques affichées

**Tests** :
- Tests unitaires (avec tendance)
- Tests d'intégration (avec tendance)
- Tests E2E (total, passed, failed, duration)

**Couverture** :
- Couverture globale (barre de progression)
- Couverture par critère (statements, branches, functions, lines)

**Qualité** :
- Complexité cyclomatique
- Lignes de code par type (TypeScript, CSS, JSON, Markdown)

**Taille** :
- Nombre total de fichiers
- Nombre de dépendances

**Performance** :
- Durée des tests E2E
- Date de dernière exécution E2E

---

## Avantages de cette approche

### 1. Visibilité continue

L'évolution de la qualité est visible en temps réel :
- **Historique** : 100 snapshots permettent de voir l'évolution sur une longue période
- **Tendances** : Les tendances sont calculées automatiquement et affichées visuellement
- **Dashboard** : Un dashboard centralisé permet de voir toutes les métriques en un coup d'œil

### 2. Détection précoce

Les dérives sont détectées précocement :
- **Tendances** : Une tendance à la baisse est immédiatement visible
- **Comparaison** : Comparaison facile avec les snapshots précédents
- **Alertes visuelles** : Les barres de progression et les tendances servent d'alertes visuelles

### 3. Pilotage

Les métriques deviennent un outil de pilotage :
- **Décisions guidées** : Les décisions sont guidées par des données objectives
- **Objectifs mesurables** : Les objectifs de qualité sont mesurables et suivis
- **Amélioration continue** : L'amélioration continue est facilitée par la visibilité

### 4. Automatisation

La collecte est entièrement automatisée :
- **Pas d'effort manuel** : Le script collecte automatiquement toutes les métriques
- **Exécution régulière** : Le script peut être exécuté régulièrement (build, CI/CD)
- **Historique automatique** : L'historique est géré automatiquement

---

## Comparaison avec les approches traditionnelles

### Approche traditionnelle

Dans les projets classiques, les métriques sont collectées manuellement ou de manière ponctuelle :

```bash
# ❌ Approche traditionnelle
# Collecte manuelle, ponctuelle
npm test -- --coverage
# Résultats non stockés, pas d'historique, pas de tendances
```

**Problèmes** :
- Collecte manuelle fastidieuse
- Pas d'historique
- Pas de tendances
- Pas de visibilité continue

### Approche avec système automatique

```bash
# ✅ Système automatique
npm run metrics:collect  # Collecte automatique
# Résultats stockés avec historique, tendances calculées, dashboard visuel
```

**Avantages** :
- Collecte automatique
- Historique et tendances
- Visibilité continue
- Pilotage facilité

---

## Exemples concrets

### Exemple 1 : Détection d'une dérive

**Scénario** : Le nombre de tests unitaires diminue.

**Dashboard** :
```
Tests unitaires: 45 ↘️
(Précédent: 50)
```

**Action** : Le développeur voit immédiatement la dérive et peut investiguer.

### Exemple 2 : Suivi de l'amélioration

**Scénario** : La couverture de code augmente progressivement.

**Dashboard** :
```
Couverture: 85% ↗️
(Précédent: 82%)
```

**Résultat** : L'amélioration est visible et mesurable.

### Exemple 3 : Historique sur une période

**Scénario** : Visualisation de l'évolution sur 3 mois.

**Dashboard** : Graphique montrant l'évolution du nombre de tests, de la couverture, etc.

**Avantage** : Compréhension de l'évolution à long terme.

---

## Conclusion

Cette stratégie garantit que :
- ✅ Les métriques sont collectées automatiquement et régulièrement
- ✅ L'historique est maintenu automatiquement (100 snapshots)
- ✅ Les tendances sont calculées et affichées visuellement
- ✅ Un dashboard centralisé permet un suivi visuel de l'évolution

Le système de métriques automatiques transforme les métriques en outil de pilotage continu. Cette approche, bien que peu courante dans les projets standards où les métriques sont collectées manuellement, permet d'atteindre un niveau de visibilité et de pilotage rarement atteint avec les approches traditionnelles.

Le système devient un partenaire de pilotage : l'évolution de la qualité est visible en temps réel, les dérives sont détectées précocement, et les décisions sont guidées par des données objectives, créant une base solide pour l'amélioration continue de la qualité du code.
