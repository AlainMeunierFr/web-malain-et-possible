### Sprint Goal
Mettre en place une page Metrics pour suivre automatiquement la qualité du code et l'évolution du projet à travers différentes métriques techniques (tests, couverture, qualité, taille, dépendances, performance).

#### US-4.1 : Définition des types de métriques à collecter
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

#### US-4.2 : Script de collecte automatique des métriques
- **En tant que** Développeur
- **Je souhaite** Avoir un script qui collecte automatiquement toutes les métriques du projet
- **Afin de** Générer un snapshot de métriques sans intervention manuelle

- **Critères d'acceptation** :

- **Architecture du script** :
  - Un script `scripts/collect-metrics-simple.ts` compatible avec l'environnement de développement (Windows/Linux/Mac)
  - Exécutable via `npm run metrics:collect`
  - Génère deux fichiers JSON : `public/metrics/latest.json` (dernier snapshot) et `public/metrics/history.json` (historique complet)

- **Collecte des métriques de tests** :
  - Compte le nombre de tests unitaires dans `tests/unit/` (fichiers `*.test.ts` ou `*.test.tsx`)
  - Compte le nombre de tests d'intégration (fichiers `*.integration.test.ts`)
  - Compte le nombre de features BDD dans `tests/bdd/` (fichiers `*.feature`)
  - Compte les scénarios et steps BDD en parsant les fichiers `.feature`
  - Calcule le total des tests (unitaires + intégration)

- **Collecte de la couverture** :
  - Exécute les tests avec coverage : `npm test -- --coverage --coverageReporters=json-summary`
  - Lit le fichier `coverage/coverage-summary.json` généré par Jest
  - Extrait les données de couverture : lignes, statements, fonctions, branches (total, covered, percentage)
  - Si le fichier n'existe pas, retourne des valeurs à 0 avec un avertissement

- **Collecte de la qualité du code** :
  - Exécute ESLint : `npm run lint -- --format=json`
  - Compte les erreurs et warnings ESLint dans chaque fichier
  - Agrège le total des erreurs et warnings
  - Valeurs placeholder pour : type coverage (95%), complexité cyclomatique (5), index de maintenabilité (75)

- **Collecte de la taille du code** :
  - Compte les fichiers dans les dossiers `components/`, `app/`, `utils/` (récursif, exclut `node_modules` et `.next`)
  - Compte les composants (fichiers `*.tsx` dans `components/`)
  - Compte les pages (fichiers `page.tsx` dans `app/`)
  - Compte les utils (fichiers `*.ts` dans `utils/`)
  - Compte les tests (fichiers `*.test.ts` ou `*.test.tsx` dans `tests/`)
  - Compte les lignes de code dans les fichiers source (app, components, utils)

- **Collecte des dépendances** :
  - Lit le fichier `package.json` pour compter les dépendances de production et de développement
  - Exécute `npm audit --json` pour récupérer les vulnérabilités
  - Extrait le nombre de vulnérabilités par niveau : low, moderate, high, critical, total
  - Si npm audit échoue, retourne des valeurs à 0

- **Collecte de la performance** :
  - Calcule la taille du bundle en parcourant le dossier `.next/` (récursif)
  - Convertit la taille en KB
  - Temps de build : valeur à 0 (le script ne fait pas de build pour éviter de ralentir la collecte)
  - Score Lighthouse : optionnel (undefined)

- **Informations Git** :
  - Exécute `git rev-parse --abbrev-ref HEAD` pour récupérer le nom de la branche
  - Exécute `git rev-parse --short HEAD` pour récupérer le hash court du commit
  - Si Git n'est pas disponible, retourne 'unknown'

- **Gestion de l'historique** :
  - Charge l'historique existant depuis `public/metrics/history.json`
  - Ajoute le nouveau snapshot à la fin du tableau
  - Limite la taille de l'historique à 100 snapshots (supprime les plus anciens)
  - Calcule les tendances en comparant le snapshot actuel avec le précédent :
    - Tests : up si totalTests augmente, down si diminue, stable sinon
    - Coverage : up si lines.percentage augmente, down si diminue, stable sinon
    - Quality : up si (eslintErrors + eslintWarnings) diminue, down si augmente, stable sinon
  - Sauvegarde l'historique mis à jour

- **Affichage d'un résumé** :
  - Affiche un résumé console avec les principales métriques :
    - Tests : total (réussis ✓, échoués ✗)
    - Features BDD : nombre (scénarios)
    - Couverture : pourcentage de lignes
    - ESLint : erreurs, warnings
    - Composants, pages
    - Dépendances : total (vulnérabilités)
    - Bundle : taille en KB

- **Gestion des erreurs** :
  - Affiche des warnings (⚠️) pour les erreurs non bloquantes (tests échoués, audit avec vulnérabilités)
  - Continue la collecte même si certaines métriques échouent
  - Retourne des valeurs par défaut (0 ou undefined) pour les métriques non disponibles

#### US-4.3 : Page d'affichage des métriques avec dashboard visuel
- **En tant que** Manager technico-fonctionnel
- **Je souhaite** Voir un dashboard visuel des métriques de qualité du code dans le navigateur
- **Afin de** Suivre facilement l'évolution de la qualité du projet sans regarder les fichiers JSON bruts

- **Critères d'acceptation** :

- **Route et structure de la page** :
  - La page est accessible via la route `/metrics`
  - Un dossier `app/metrics/` contient `page.tsx` et `metrics.module.css`
  - La page utilise un Server Component Next.js pour charger les données côté serveur
  - Architecture : chargement des données → rendu HTML → envoi au client (SEO optimal)

- **Chargement des données** :
  - Une fonction `loadMetrics()` lit le fichier `public/metrics/history.json`
  - Si le fichier n'existe pas ou si une erreur survient, retourne `null`
  - Si `null`, affiche un état vide avec instructions : "Exécutez `npm run metrics:collect` pour générer les métriques"

- **Header de la page** :
  - Titre principal : "📊 Métriques de Qualité du Code"
  - Méta-informations affichées :
    - Version du projet (depuis le snapshot)
    - Branche Git actuelle
    - Hash court du commit
    - Date/heure de dernière mise à jour (format localisé français)

- **Section Tests (🧪)** :
  - Carte "Total Tests" : nombre total avec tendance (↗️ up, ↘️ down, → stable)
    - Sous-titre : nombre de tests réussis et échoués
  - Carte "Tests Unitaires" : nombre de tests unitaires
  - Carte "Tests Intégration" : nombre de tests d'intégration
  - Carte "Features BDD" : nombre de features
    - Sous-titre : nombre de scénarios et steps BDD

- **Section Couverture de Code (🎯)** :
  - 4 barres de progression horizontales (une par métrique) :
    - Lignes : pourcentage avec barre colorée
    - Statements : pourcentage avec barre colorée
    - Fonctions : pourcentage avec barre colorée
    - Branches : pourcentage avec barre colorée
  - Couleur de la barre selon le pourcentage :
    - Vert (≥80%) : bon
    - Orange (≥60% et <80%) : warning
    - Rouge (<60%) : danger
  - Statistiques en bas : "Total : X lignes" / "Couvertes : Y lignes"

- **Section Qualité du Code (✨)** :
  - Carte "Erreurs ESLint" : nombre avec tendance
  - Carte "Warnings ESLint" : nombre
  - Carte "Type Coverage" : pourcentage avec unité "%"
  - Carte "Complexité Cyclomatique" : valeur moyenne

- **Section Taille du Code (📏)** :
  - Carte "Fichiers Total" : nombre total de fichiers
  - Carte "Lignes de Code" : nombre de lignes source (hors commentaires/blancs)
  - Carte "Composants" : nombre de composants React
  - Carte "Pages" : nombre de pages Next.js

- **Section Dépendances (📦)** :
  - Carte "Total" : nombre total de dépendances
    - Sous-titre : nombre en production et développement
  - Carte "Vulnérabilités" : nombre total
    - Sous-titre : nombre de vulnérabilités critiques et hautes

- **Section Performance (⚡)** :
  - Carte "Taille Bundle" : taille en KB
  - Carte "Temps de Build" : temps en secondes (converti depuis ms)
  - Carte "Score Lighthouse" : score sur 100 (si disponible)

- **Section Historique (📈)** :
  - Information textuelle : "X mesures enregistrées"
  - Note : Cette section sera enrichie ultérieurement avec des graphiques d'évolution

- **Design des cartes de métriques** :
  - Chaque carte (MetricCard) affiche :
    - Titre de la métrique (en majuscules, léger, petite taille)
    - Valeur principale (grande taille, gras) avec unité si applicable
    - Indicateur de tendance (emoji : ↗️ up vert, ↘️ down rouge, → stable gris)
    - Sous-titre optionnel (petite taille, opacité réduite)
  - Fond dégradé bleu (var(--BleuFonce) vers #005a99)
  - Effet hover : translation vers le haut (-4px)
  - Couleur du texte : blanc

- **Design des barres de progression** :
  - Chaque barre affiche :
    - Label à gauche, pourcentage à droite
    - Barre de fond grise
    - Barre de remplissage colorée selon le pourcentage
    - Hauteur : 24px
    - Border-radius : 12px pour arrondir les coins

- **Layout responsive** :
  - Les cartes sont organisées en grille avec `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`
  - Sur mobile (≤768px) : une seule colonne
  - Sur desktop : plusieurs colonnes (auto-fit)
  - Espacement uniforme entre les cartes : 1.5rem

- **Couleurs et styles** :
  - Fond de la page : dégradé bleu (var(--BleuClair) vers var(--BleuFonce))
  - Sections : fond blanc, border-radius 16px, ombre portée
  - Padding de la page : ajusté pour éviter que le contenu soit caché par le header fixe
  - Container principal : max-width 1400px, centré

#### US-4.4 : Intégration de la collecte de métriques dans le workflow de développement
- **En tant que** Développeur
- **Je souhaite** Collecter automatiquement les métriques à chaque fois que j'exécute les tests ou que je fais un build
- **Afin de** Avoir des métriques toujours à jour sans effort supplémentaire

- **Critères d'acceptation** :

- **Scripts npm disponibles** :
  - `npm run metrics:collect` : collecte les métriques et génère les fichiers JSON
  - `npm run metrics:view` : lance le serveur de développement pour voir la page `/metrics`
  - `npm run metrics:full` : collecte les métriques puis lance le serveur (`npm run metrics:collect && npm run dev`)

- **Configuration dans package.json** :
  - Les scripts utilisent `ts-node` pour exécuter le script TypeScript directement
  - Le script de collecte est `scripts/collect-metrics-simple.ts` (compatible Windows)

- **Documentation** :
  - Le README du projet explique comment utiliser les scripts de métriques
  - Instructions pour visualiser les métriques : "Visitez http://localhost:3000/metrics après avoir collecté les métriques"

- **Bonnes pratiques** :
  - Collecter les métriques après chaque changement significatif du code
  - Comparer les tendances avant/après une fonctionnalité ou un refactoring
  - Utiliser les métriques pour valider l'amélioration continue de la qualité du code

#### US-4.5 : Ajout d'un lien vers la page Metrics dans la navigation ✅ COMPLÉTÉ
- **En tant que** Développeur ou Manager
- **Je souhaite** Accéder facilement à la page Metrics depuis n'importe quelle page du site
- **Afin de** Consulter les métriques sans avoir à taper l'URL manuellement

- **Statut** : ✅ Implémenté et validé avec tests TDD

- **Critères d'acceptation** :

- **Ajout d'un lien dans le footer (développeurs)** :
  - ✅ Un bouton "Metrics" est ajouté dans le footer du site (fichier `data/footerButtons.json`)
  - ✅ Le bouton est visible uniquement en environnement de développement (`process.env.NODE_ENV === 'development'`) - filtré dans `Footer.tsx`
  - ✅ Le bouton redirige vers `/metrics` via la commande `cmd-Metrics` gérée dans `FooterButton.tsx`
  - ✅ Icône : BarChart3 de lucide-react
  - ✅ Tooltip : "Consulter les métriques de qualité du code"

- **Conditions d'affichage** :
  - ✅ Le lien n'est PAS visible en production (filtré dans Footer.tsx ligne 12-14)
  - ✅ Le lien est visible en développement
  - ✅ Justification : La page Metrics est un outil pour l'équipe de développement, pas pour les visiteurs

- **Tests** :
  - ✅ Test unitaire ajouté dans `tests/unit/FooterButton.test.tsx`
  - ✅ Vérifie que le clic sur le bouton Metrics redirige vers `/metrics`
  - ✅ TDD strict : RED → GREEN → REFACTOR respecté

#### US-4.6 : Graphiques d'évolution des métriques dans le temps (futur)
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
  - Affichage par défaut : derniers 30 jours

- **Design** :
  - Les graphiques sont responsive
  - Intégration cohérente avec le design existant de la page Metrics
  - Graphiques placés dans la section "Historique" (📈)

- **Interactions** :
  - Survol d'un point : affiche les valeurs exactes et la date
  - Légende interactive pour masquer/afficher certaines séries
