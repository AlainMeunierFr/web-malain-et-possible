# Deux projets parallèles : Deux approches de développement

## Vue d'ensemble

Ce site web "Malain et Possible" existe en **deux versions distinctes**, représentant deux approches de développement différentes :

### 1. Version itérative (ce dépôt)
- **Dépôt Git** : `web-malain-et-possible`
- **Vercel** : `web-malain-et-possible`
- **Approche** : Développement itératif classique en 4 jours
- **Méthode** : US → BDD → TDD → Implémentation
- **Caractéristiques** :
  - 400 tests automatisés
  - 91.23% de couverture de code
  - Tests BDD avec Cucumber
  - Développement incrémental avec métriques

### 2. Version expérimentale (autre dépôt)
- **Dépôt Git** : `web-malain-et-possible-clone`
- **Vercel** : `web-malain-et-possible-clone`
- **Approche** : Reconstruction complète à partir des US uniquement
- **Méthode** : US détaillées + Critères d'acceptation → Code généré
- **Caractéristiques** :
  - Code généré par Cursor à partir des US
  - Approche top-down
  - Focus sur les critères d'acceptation

## Objectif de l'expérience

### Pourquoi deux projets ?

Cette expérience vise à **comparer deux méthodes de développement** :

1. **Approche itérative classique** (ce dépôt)
   - Développement progressif avec TDD/BDD
   - Tests écrits en parallèle du code
   - Refactoring continu
   - Métriques de qualité suivies

2. **Approche par génération** (clone)
   - Code généré directement depuis les US
   - Focus sur les critères d'acceptation détaillés
   - Moins de tests unitaires
   - Rapidité de mise en œuvre

### Résultats observés

- **Code différent** : Les deux projets ont des implémentations différentes
- **Résultat similaire** : Le rendu final est visuellement proche
- **Approches complémentaires** : Chaque méthode a ses avantages

## Important : Les deux projets sont INDÉPENDANTS

⚠️ **Ces deux dépôts ne doivent PAS être synchronisés !**

Ils représentent deux expériences parallèles avec des historiques Git complètement différents.

## Workflow de développement (ce dépôt uniquement)

### Configuration Git

Ce dépôt pousse uniquement vers `origin` :

```bash
git remote -v
# origin  https://github.com/AlainMeunierFr/web-malain-et-possible.git
```

### Déploiement standard

```bash
# 1. Développement
npm run dev

# 2. Tests
npm test

# 3. Build
npm run build

# 4. Commit
git add .
git commit -m "Description"

# 5. Déploiement
git push origin main
```

Vercel déploie automatiquement sur `web-malain-et-possible`.

## Pour travailler sur le projet clone

Le projet `web-malain-et-possible-clone` est dans un **dépôt séparé** avec son propre workspace local.

**Ce ne sont pas le même projet !**

## Conclusion

Cette expérience de deux projets parallèles permet de :
- Comparer concrètement deux approches de développement
- Évaluer la qualité du code généré par IA
- Mesurer l'impact du TDD/BDD sur la qualité finale
- Identifier les forces et faiblesses de chaque méthode
