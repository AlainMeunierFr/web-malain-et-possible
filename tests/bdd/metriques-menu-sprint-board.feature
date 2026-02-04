# language: fr

@metriques-menu-sprint-board
Fonctionnalité: Déplacer Métriques vers menu Sprint Board (US-12.5)
  En tant que utilisateur du module projet
  Je souhaite accéder aux métriques depuis le menu horizontal "A propos du site"
  Afin de regrouper les outils de suivi de projet au même endroit et alléger le footer

  # --- CA1 : Suppression du bouton footer ---

  Scénario: Le bouton Métriques n'apparaît plus dans le footer
    Étant donné que je suis sur n'importe quelle page du site
    Quand je regarde le footer
    Alors je ne vois pas de bouton "Métriques" avec l'icône 📊
    Et le fichier "_footerButtons.json" ne contient pas d'entrée pour "Métriques"

  # --- CA2 : Nouveau bouton dans le menu horizontal ---

  Scénario: Le bouton Métriques apparaît dans le menu horizontal A propos du site
    Étant donné que je suis sur la page "A propos de ce site"
    Quand je regarde le menu horizontal
    Alors je vois un bouton "Métriques"
    Et le bouton "Métriques" est positionné avant le bouton "API Swagger"

  Scénario: Le bouton Métriques est actif quand on est sur la vue métriques
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Quand je regarde le menu horizontal
    Alors le bouton "Métriques" a un style actif (bleu foncé)
    Et les autres boutons du menu ont un style inactif

  # --- CA3 : Navigation ---

  Scénario: Cliquer sur Métriques affiche les métriques dans la zone centrale
    Étant donné que je suis sur la page "A propos de ce site"
    Et que le menu horizontal est visible
    Quand je clique sur le bouton "Métriques"
    Alors les métriques s'affichent dans la zone centrale
    Et l'URL devient "/a-propos-du-site?view=metrics"

  Scénario: Cliquer sur Sprint en cours revient au board Kanban
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Quand je clique sur le bouton "Sprint en cours"
    Alors le board Kanban s'affiche dans la zone centrale
    Et l'URL devient "/a-propos-du-site" sans paramètre view

  Scénario: La page /metrics redirige vers la nouvelle URL
    Étant donné que j'accède directement à l'URL "/metrics"
    Quand la page se charge
    Alors je suis redirigé vers "/a-propos-du-site?view=metrics"
    Et les métriques s'affichent correctement

  # --- CA4 : Bloc Tests ---

  Scénario: Le bloc Tests affiche 5 cartes avec les bonnes informations
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Quand je regarde le bloc Tests
    Alors je vois 5 cartes avec les titres suivants :
      """
      Total
      BDD
      Unitaires
      Intégration
      E2E
      """
    Et chaque carte contient une infobulle (ℹ️)
    Et chaque carte affiche un chiffre principal (nombre de tests)
    Et chaque carte affiche une jauge de réussite avec pourcentage

  Scénario: Chaque carte du bloc Tests affiche 4 détails
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Quand je regarde une carte du bloc Tests
    Alors je vois 4 détails :
      """
      ✅ réussies
      ❌ échouées
      ⏱️ durée
      📁 total fichiers
      """

  # --- CA5 : Bloc Couverture ---

  Scénario: Le bloc Couverture affiche 4 cartes avec jauges
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Quand je regarde le bloc Couverture
    Alors je vois 4 cartes avec les titres suivants :
      """
      Lignes
      Statements
      Fonctions
      Branches
      """
    Et chaque carte affiche un pourcentage
    Et chaque carte affiche une jauge colorée
    Et le style visuel est cohérent avec le bloc Tests (cartes bleues)

  # --- CA6 : Bloc Autres indicateurs ---

  Scénario: Le bloc Autres indicateurs regroupe plusieurs catégories
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Quand je regarde le bloc Autres indicateurs
    Alors je vois les catégories suivantes :
      """
      Qualité (ESLint)
      Taille
      Dépendances
      Performance
      Version
      """
    Et la présentation est compacte avec sous-titres par catégorie
    Et les indicateurs sont affichés sous forme de liste structurée (pas de cartes individuelles)

  # --- CA7 : Layout responsive ---

  Scénario: Layout 2 colonnes sur écran large
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Et que l'écran a une résolution de 1900x800
    Quand je regarde la disposition des blocs
    Alors le layout est en 2 colonnes
    Et la colonne gauche occupe environ 60-70% de la largeur
    Et la colonne droite occupe environ 30-40% de la largeur
    Et tout le contenu tient sans ascenseur vertical

  Scénario: Colonne gauche contient Tests et Couverture
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Et que l'écran est large (≥1200px)
    Quand je regarde la colonne gauche
    Alors je vois le bloc Tests en haut
    Et je vois le bloc Couverture en dessous
    Et les cartes avec jauges sont mises en valeur visuellement

  Scénario: Colonne droite contient Autres indicateurs
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Et que l'écran est large (≥1200px)
    Quand je regarde la colonne droite
    Alors je vois le bloc Autres indicateurs
    Et ce bloc occupe toute la hauteur de la colonne
    Et la présentation est plus compacte (liste de chiffres, moins d'emphase visuelle)

  Scénario: Layout responsive sur smartphone
    Étant donné que je suis sur la page "/a-propos-du-site?view=metrics"
    Et que l'écran est petit (≤768px)
    Quand je regarde la disposition des blocs
    Alors les blocs s'empilent verticalement
    Et le bloc Tests est en premier
    Et le bloc Couverture est en second
    Et le bloc Autres indicateurs est en dernier
