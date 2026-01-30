# US-4.1 : Définition des types de métriques à collecter ✅ COMPLÉTÉ
- **En tant que** Manager technico-fonctionnel
- **Je souhaite** Avoir une structure TypeScript bien définie pour tous les types de métriques que je souhaite suivre
- **Afin de** Garantir la cohérence des données collectées et faciliter leur exploitation

- **Critères d'acceptation** :

- **Types de métriques définies** :
  - Un fichier `types/metrics.ts` définit toutes les interfaces TypeScript pour les métriques
  - `TestMetrics` : nombre de tests (unitaires, intégration, BDD), résultats (réussis/échoués), durée
  - `CoverageMetrics` : couverture de code (lignes, statements, fonctions, branches) avec total/couvert/pourcentage
  - `CodeQualityMetrics` : erreurs/warnings ESLint, couverture des types, complexité cyclomatique
  - `CodeSizeMetrics` : nombre de fichiers, lignes de code (total, source, commentaires), composants, pages, utils
  - `DependencyMetrics` : nombre de dépendances (total, production, dev), vulnérabilités par niveau
  - `PerformanceMetrics` : taille du bundle (KB), temps de build (ms), score Lighthouse optionnel

- **Structure de snapshot** :
  - Interface `MetricsSnapshot` : capture complète des métriques à un instant T
  - Contient : timestamp (ISO 8601), version du projet, branche Git, hash du commit
  - Agrège toutes les métriques : tests, coverage, quality, size, dependencies, performance

- **Gestion de l'historique** :
  - Interface `MetricsHistory` : historique des snapshots avec tendances
  - Contient : tableau de snapshots, dernier snapshot, tendances (tests, coverage, quality)
  - Les tendances indiquent l'évolution : 'up' (amélioration), 'down' (dégradation), 'stable'

- **Configuration** :
  - Interface `MetricsConfig` : configuration du collecteur
  - Contient : dossier de sortie, limite d'historique, seuils minimums (coverage, quality, complexity)