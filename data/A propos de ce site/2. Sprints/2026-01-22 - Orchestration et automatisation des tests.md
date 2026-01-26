# Sprint Goal
Automatiser la génération et l'orchestration des tests end-to-end (E2E) pour garantir une couverture complète et maintenir la qualité des tests sans intervention manuelle.

---

## US-5.6 : Génération automatique du plan de test E2E ✅ COMPLÉTÉ

- **En tant que** Lead Developer
- **Je souhaite** Générer automatiquement un scénario E2E complet qui parcourt tous les liens du site
- **Afin de** Garantir une couverture complète des tests end-to-end sans maintenance manuelle

- **Critères d'acceptation** :
- **Script de génération** : Création de `scripts/generate-e2e-scenario.ts` qui :
  - Lit la liste des liens depuis `Pages-Et-Lien.json`
  - Génère un chemin optimal qui parcourt tous les liens
  - Teste tous les e2eID présents sur chaque page visitée
  - Évite les doublons en supprimant les liens déjà parcourus
- **Algorithme glouton** : Utilise un algorithme glouton pour optimiser le parcours (commence par la page d'accueil, suit les liens disponibles)
- **Scénario Playwright** : Génère un fichier `tests/end-to-end/parcours-complet-liens.spec.ts` avec :
  - Navigation séquentielle à travers tous les liens
  - Tests de tous les e2eID sur chaque page
  - Vérification que tous les liens sont accessibles
- **Hook pre-commit** : Script `scripts/pre-commit-generate-e2e.ts` qui régénère automatiquement le plan E2E avant chaque commit
- **Tests d'intégration** : Tests dans `tests/integration/generate-e2e-plan.integration.test.ts` pour valider la génération
- **Protection des données** : Le script protège les données sensibles dans les tests (masquage des mots de passe, etc.)

## US-5.7 : Système de détection et génération d'e2eID ✅ COMPLÉTÉ

- **En tant que** Développeur
- **Je souhaite** Avoir un système automatique pour détecter, générer et assigner des identifiants E2E aux éléments interactifs
- **Afin de** Faciliter l'écriture et la maintenance des tests E2E

- **Critères d'acceptation** :
- **Détection automatique** : `utils/e2eIdDetector.ts` qui détecte :
  - Les e2eID présents dans les composants React
  - Les e2eID définis dans les constantes (`constants/e2eIds.ts`)
  - Les e2eID présents dans les fichiers JSON
- **Génération automatique** : `utils/e2eIdGenerator.ts` qui génère des e2eID uniques pour les éléments sans identifiant
- **Inventaire** : `utils/e2eIdInventory.ts` qui crée un inventaire complet de tous les e2eID du projet
- **Compteur** : `utils/e2eIdCounter.ts` qui compte les e2eID par type et par source
- **Fichier pending** : `e2e-ids-pending.json` qui liste les e2eID en attente d'assignation
- **Tests BDD** : Feature `tests/bdd/e2e-ids-assignment.feature` avec scénarios pour :
  - Détection des e2eID manquants
  - Génération automatique d'e2eID
  - Assignation des e2eID aux éléments
- **Tests d'intégration** : 
  - `tests/integration/e2e-ids-detection.integration.test.ts` pour valider la détection
  - `tests/integration/e2e-ids-coverage.integration.test.ts` pour valider la couverture
- **Couverture 100%** : Tous les éléments interactifs doivent avoir un e2eID assigné

## US-5.8 : Scripts de refactorisation DDD ✅ COMPLÉTÉ

- **En tant que** Développeur
- **Je souhaite** Avoir des scripts pour automatiser la refactorisation du code selon les principes DDD
- **Afin de** Maintenir la qualité du code et respecter l'architecture hexagonale

- **Critères d'acceptation** :
- **Refactorisation du code** : Script `scripts/refactor-ddd-code.ts` qui :
  - Identifie les violations des principes DDD
  - Propose des corrections automatiques
  - Refactorise le code pour respecter l'architecture hexagonale
- **Refactorisation des JSON** : Script `scripts/refactor-ddd-json.ts` qui :
  - Valide la structure des JSON selon les règles métier
  - Corrige automatiquement les structures non conformes
  - Maintient la cohérence des données
- **Correction des tests** : Script `scripts/fix-all-tests-ddd.ts` qui :
  - Corrige les tests non conformes aux principes DDD
  - Met à jour les tests pour refléter les changements de structure
- **Tests** : Tests unitaires dans `tests/unit/ddd-refactoring.test.ts` pour valider les scripts
- **Documentation** : Documentation des règles DDD appliquées par les scripts

## US-5.9 : Script de validation et restauration JSON ✅ COMPLÉTÉ

- **En tant que** Développeur
- **Je souhaite** Avoir un script qui valide les fichiers JSON et restaure automatiquement depuis des backups en cas d'erreur
- **Afin de** Protéger contre les pertes de données et garantir l'intégrité des JSON

- **Critères d'acceptation** :
- **Validation** : Script `scripts/validate-and-restore-json.ts` qui :
  - Valide la syntaxe JSON de tous les fichiers dans `data/`
  - Valide la structure selon les interfaces TypeScript
  - Détecte les types de contenu inconnus
- **Système de backup** : Création automatique de backups (fichiers `*.backup.json`) avant toute modification
- **Restauration automatique** : En cas d'erreur de validation, restauration automatique depuis le backup le plus récent
- **Rapport d'erreur** : Affichage d'un rapport détaillé des erreurs trouvées avec :
  - Nom du fichier
  - Type d'erreur
  - Ligne et colonne de l'erreur
  - Suggestion de correction
- **Intégration** : Le script peut être appelé manuellement ou intégré dans le workflow de développement

## US-4.7 : Système de versioning basé sur les User Stories complétées ✅ COMPLÉTÉ

- **En tant que** Product Owner
- **Je souhaite** Avoir un système de versioning automatique qui reflète le nombre de User Stories complétées
- **Afin de** Suivre la progression du projet de manière cohérente et automatique

- **Critères d'acceptation** :
- **Format de version** : `major.minor.patch` où :
  - `major` : Fixé à 1
  - `minor` : Nombre total de User Stories complétées depuis le début du projet
  - `patch` : Numéro de build (incrémenté à chaque build)
- **Comptage automatique** : Script `scripts/count-completed-us.ts` qui compte toutes les US marquées "✅ COMPLETE" ou "✅ COMPLETE" dans tous les fichiers du dossier "2. Sprints"
- **Détection dans le titre** : Les US complétées peuvent être marquées directement dans le titre (format `#### US-X.Y : Titre ✅ COMPLETE`)
- **Synchronisation** : Script `scripts/increment-site-version.ts sync` qui synchronise le `minor` avec le nombre d'US complétées
- **Incrémentation automatique** : Le `patch` est incrémenté automatiquement à chaque build via `npm run version:patch`
- **Stockage** : Version stockée dans `site-version.json` et accessible via l'API `/api/version`
- **Affichage** : Version affichée dans le footer du site
- **Intégration CI/CD** : Synchronisation et incrémentation automatiques lors des builds sur Vercel

## US-4.X : Graphiques pour métriques (À TRAITER ULTÉRIEUREMENT)

- **En tant que** Manager technico-fonctionnel
- **Je souhaite** Voir l'évolution des métriques sous forme de graphiques (courbes, barres)
- **Afin de** Identifier rapidement les tendances et les anomalies sur une période donnée

- **Note** : Cette US sera traitée ultérieurement, après US-4.3, pour enrichir la section "Historique"

- **Critères d'acceptation** :

- **Bibliothèque de graphiques** :
  - Utilisation de `chart.js` avec le wrapper React `react-chartjs-2`
  - Les bibliothèques sont déjà installées dans `devDependencies`

- **Graphiques à implémenter** :
  - Graphique linéaire : évolution du nombre de tests dans le temps
  - Graphique linéaire : évolution de la couverture de code dans le temps
  - Graphique linéaire : évolution des erreurs ESLint dans le temps
  - Graphique en barres : évolution de la taille du code (lignes, composants, pages)
  - Graphique en barres : évolution de la taille du bundle dans le temps

- **Filtres et période** :
  - Filtres pour sélectionner la période : derniers 7 jours, 30 jours, 90 jours, tout l'historique

## US-4.8 : Système de métriques E2E ✅ COMPLÉTÉ

- **En tant que** Lead Developer
- **Je souhaite** Collecter des métriques spécifiques aux tests E2E (couverture des liens, e2eID, etc.)
- **Afin de** Suivre la qualité et la couverture des tests end-to-end

- **Critères d'acceptation** :
- **Collecteur de métriques E2E** : Création de `utils/e2eMetricsCollector.ts` qui collecte :
  - Nombre de liens testés vs total
  - Nombre d'e2eID détectés vs assignés
  - Couverture des pages par les tests E2E
  - Taux de réussite des tests E2E
- **Intégration** : Les métriques E2E sont intégrées dans le système de métriques global (`types/metrics.ts`)
- **Tests** : Tests unitaires complets dans `tests/unit/e2eMetricsCollector.test.ts` avec couverture 100%
- **Affichage** : Les métriques E2E sont affichées dans la page Metrics avec les autres métriques
- **Historique** : Les métriques E2E sont stockées dans l'historique avec les autres métriques
  - Affichage par défaut : derniers 30 jours

- **Design** :
  - Les graphiques sont responsive
  - Intégration cohérente avec le design existant de la page Metrics
  - Graphiques placés dans la section "Historique" (📈)

- **Interactions** :
  - Survol d'un point : affiche les valeurs exactes et la date
  - Légende interactive pour masquer/afficher certaines séries