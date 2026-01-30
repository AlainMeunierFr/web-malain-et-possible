# US-4.2 : Script de collecte automatique des métriques ✅ COMPLÉTÉ
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