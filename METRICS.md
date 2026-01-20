# 📊 Système de Métriques de Qualité du Code

## Vue d'ensemble

Ce projet dispose d'un système complet de collecte et de visualisation des métriques de qualité du code. Il permet de suivre dans le temps :

- **Tests** : TU, TI, BDD (features, scénarios, steps)
- **Couverture** : Lignes, statements, fonctions, branches
- **Qualité** : Erreurs ESLint, warnings, type coverage
- **Taille** : Nombre de fichiers, lignes de code, composants
- **Dépendances** : Total, vulnérabilités
- **Performance** : Taille du bundle, temps de build

---

## 🚀 Utilisation

### Collecter les métriques

```bash
npm run metrics:collect
```

Cette commande :
1. Analyse tout le projet
2. Collecte toutes les métriques
3. Génère `public/metrics/latest.json` (snapshot actuel)
4. Met à jour `public/metrics/history.json` (historique)

### Visualiser les métriques

```bash
npm run dev
```

Puis visitez : **http://localhost:3000/metrics**

### Collecter ET visualiser (tout-en-un)

```bash
npm run metrics:full
```

---

## 📂 Structure

```
scripts/
  └── collect-metrics-simple.ts   # Script de collecte

app/
  └── metrics/
      ├── page.tsx                # Page de visualisation
      └── metrics.module.css      # Styles

types/
  └── metrics.ts                  # Types TypeScript

public/
  └── metrics/
      ├── latest.json             # Dernière mesure
      └── history.json            # Historique (100 dernières)
```

---

## 📈 Métriques Collectées

### 1. Tests

| Métrique | Description |
|----------|-------------|
| `unitTests` | Nombre de tests unitaires (`*.test.ts(x)`) |
| `integrationTests` | Nombre de tests d'intégration (`*.integration.test.ts(x)`) |
| `bddFeatures` | Nombre de fichiers `.feature` |
| `bddScenarios` | Nombre de scénarios BDD |
| `bddSteps` | Nombre de steps BDD (Given, When, Then) |
| `totalTests` | Total des tests |
| `passingTests` | Tests réussis |
| `failingTests` | Tests échoués |

### 2. Couverture

| Métrique | Description |
|----------|-------------|
| `lines` | Couverture des lignes (%, total, covered) |
| `statements` | Couverture des statements |
| `functions` | Couverture des fonctions |
| `branches` | Couverture des branches |

**Note** : Exécutez `npm test -- --coverage` avant de collecter pour avoir les données de couverture.

### 3. Qualité

| Métrique | Description |
|----------|-------------|
| `eslintErrors` | Nombre d'erreurs ESLint |
| `eslintWarnings` | Nombre de warnings ESLint |
| `typeCoverage` | % de code typé TypeScript |
| `cyclomaticComplexity` | Complexité cyclomatique moyenne |

### 4. Taille du Code

| Métrique | Description |
|----------|-------------|
| `totalFiles` | Nombre total de fichiers |
| `sourceLines` | Lignes de code source |
| `components` | Nombre de composants React |
| `pages` | Nombre de pages Next.js |
| `utils` | Nombre de fichiers utilitaires |
| `tests` | Nombre de fichiers de tests |

### 5. Dépendances

| Métrique | Description |
|----------|-------------|
| `total` | Total des dépendances |
| `production` | Dépendances de production |
| `development` | Dépendances de développement |
| `vulnerabilities` | Détail par niveau (low, moderate, high, critical) |

### 6. Performance

| Métrique | Description |
|----------|-------------|
| `bundleSize` | Taille du bundle Next.js (KB) |
| `buildTime` | Temps de build (ms) |

---

## 🎯 Tendances

Le système calcule automatiquement les tendances entre 2 mesures :
- ↗️ **Up** : Amélioration
- ↘️ **Down** : Régression
- → **Stable** : Inchangé

---

## 📊 Page de Visualisation

La page `/metrics` affiche :

### Sections
1. **Header** : Version, branche Git, commit, date
2. **Tests** : Cartes avec totaux et tendances
3. **Couverture** : Barres de progression colorées
4. **Qualité** : Erreurs ESLint, type coverage, complexité
5. **Taille** : Fichiers, lignes, composants, pages
6. **Dépendances** : Total et vulnérabilités
7. **Performance** : Bundle size et build time
8. **Historique** : Nombre de mesures enregistrées

### Design
- **Gradient violet** pour l'ambiance
- **Cartes colorées** pour chaque métrique
- **Barres de progression** pour la couverture
- **Indicateurs de tendance** (↗️↘️→)
- **Responsive** (mobile-friendly)

---

## 🔧 Configuration

### Seuils (à personnaliser dans `types/metrics.ts`)

```typescript
thresholds: {
  coverage: 80,      // % minimum de couverture
  quality: 90,       // Score minimum de qualité
  complexity: 10,    // Complexité maximum acceptable
}
```

### Limite d'historique

Par défaut : **100 snapshots**

Modifiable dans `scripts/collect-metrics-simple.ts` :
```typescript
const HISTORY_LIMIT = 100;
```

---

## 🤖 Automatisation

### CI/CD

Ajoutez dans votre pipeline CI/CD :

```yaml
# GitHub Actions exemple
- name: Collect metrics
  run: npm run metrics:collect

- name: Upload metrics
  uses: actions/upload-artifact@v3
  with:
    name: metrics
    path: public/metrics/
```

### Pre-commit Hook

Ajoutez dans `.husky/pre-commit` :

```bash
npm run metrics:collect
```

### Scheduled Task

Pour collecter automatiquement chaque jour :

**Windows** : Planificateur de tâches
```batch
npm run metrics:collect
```

**Linux/Mac** : Cron
```bash
0 0 * * * cd /path/to/project && npm run metrics:collect
```

---

## 📈 Objectifs de Qualité

### Recommandations

| Métrique | Objectif | Minimum |
|----------|----------|---------|
| Couverture lignes | 90% | 80% |
| Erreurs ESLint | 0 | 5 |
| Tests unitaires | 50+ | 20+ |
| Features BDD | 10+ | 5+ |
| Complexité cyclomatique | < 10 | < 15 |
| Vulnérabilités critiques | 0 | 0 |

---

## 🐛 Troubleshooting

### "Couverture à 0%"
➡️ Exécutez `npm test -- --coverage` avant de collecter

### "Erreur ESLint"
➡️ Normal si vous avez des erreurs lint, elles seront comptées

### "Git info = unknown"
➡️ Assurez-vous d'être dans un repo Git

### "Bundle size = 0"
➡️ Exécutez `npm run build` avant de collecter

---

## 🚀 Prochaines Améliorations

- [ ] Graphiques historiques avec Chart.js
- [ ] Export PDF des rapports
- [ ] Comparaison entre branches
- [ ] Alertes par email si seuils dépassés
- [ ] Score Lighthouse automatique
- [ ] Intégration SonarQube
- [ ] Badge SVG pour le README

---

## 📝 Notes

- Les métriques sont **locales** (stockées dans `public/metrics/`)
- L'historique est limité à **100 snapshots**
- Les tendances nécessitent **2 mesures minimum**
- Le script fonctionne sur **Windows, Mac, Linux**

---

## 🎉 Résultat Actuel

Dernière mesure générée :
- ✅ Tests : **28** (28 TU + 0 TI)
- ✅ Features BDD : **8** (33 scénarios)
- ✅ Composants : **23**
- ✅ Pages : **11**
- ✅ Dépendances : **30**
- ✅ Bundle : **1 GB** (optimisable !)

**Visitez : http://localhost:3000/metrics** 🎊
