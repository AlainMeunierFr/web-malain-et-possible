# US-4.3 : Page d'affichage des métriques avec dashboard visuel ✅ COMPLÉTÉ
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