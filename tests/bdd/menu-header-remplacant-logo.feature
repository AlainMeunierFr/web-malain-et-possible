# language: fr

@menu-header-remplacant-logo
Fonctionnalité: Menu header remplaçant le logo (US-13.1)
  En tant que visiteur du site
  Je souhaite voir un menu de navigation dans le header à la place du logo, dont le contenu est configurable
  Afin d'accéder rapidement aux principales sections depuis n'importe quelle page

  # --- CA1 : Affichage menu desktop ---

  Scénario: Le logo n'apparaît plus dans le header
    Étant donné que je suis sur n'importe quelle page du site
    Quand je regarde le header
    Alors je ne vois pas le logo "Malain et possible" dans le header

  Scénario: Un menu horizontal s'affiche à gauche du header
    Étant donné que je suis sur n'importe quelle page du site
    Et que l'écran est en mode desktop (largeur ≥ 768px)
    Quand je regarde le header
    Alors je vois un menu horizontal à gauche
    Et le menu contient des liens et des menus déroulants (dropdown)

  Scénario: La photo reste en place à droite du header
    Étant donné que je suis sur n'importe quelle page du site
    Quand je regarde le header
    Alors je vois la photo en haut à droite du header

  Scénario: Le titre de page apparaît dans le header entre le menu et la photo
    Étant donné que je suis sur une page avec un titre (ex. "Mes Profils")
    Quand je regarde le header
    Alors le titre de page apparaît dans le header après le menu
    Et le titre est affiché en blanc
    Et un séparateur vertical (fer) est visible à gauche du titre

  # --- CA2 : Menu paramétrable (valeurs par défaut) ---

  Scénario: Le menu affiche les entrées principales par défaut
    Étant donné que je suis sur n'importe quelle page du site
    Et que la configuration par défaut du menu est utilisée
    Quand je regarde le menu du header
    Alors je vois les entrées suivantes : Accueil, Mes profils, Détournement vidéo, A propos

  Scénario: Le lien Accueil mène à la page d'accueil
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur "Accueil" dans le menu du header
    Alors je suis redirigé vers la page d'accueil (/)

  Scénario: Cliquer sur Mes profils mène vers la page Mes profils
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur "Mes profils" dans le menu du header
    Alors je suis redirigé vers /mes-profils

  Scénario: Le survol sur Mes profils affiche le sous-menu
    Étant donné que je suis sur n'importe quelle page du site
    Quand je survole "Mes profils" dans le menu du header
    Alors le sous-menu s'affiche
    Et je vois les sous-items : Produit logiciel, Opérations, Transformation Agile, Technologie

  Scénario: Cliquer sur un sous-item de Mes profils mène vers la page de profil
    Étant donné que je suis sur n'importe quelle page du site
    Quand je survole "Mes profils" dans le menu du header
    Et je clique sur "Produit logiciel" dans le sous-menu
    Alors je suis redirigé vers /profil/cpo

  Scénario: Cliquer sur Détournement vidéo mène vers la page Détournement de scènes cultes
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur "Détournement vidéo" dans le menu du header
    Alors je suis redirigé vers /detournement-video

  Scénario: Le survol sur Détournement vidéo affiche le sous-menu
    Étant donné que je suis sur n'importe quelle page du site
    Quand je survole "Détournement vidéo" dans le menu du header
    Alors le sous-menu s'affiche
    Et je vois le sous-item "Portfolio"

  Scénario: Cliquer sur Portfolio dans le sous-menu Détournement vidéo mène vers la page Portfolio
    Étant donné que je suis sur n'importe quelle page du site
    Quand je survole "Détournement vidéo" dans le menu du header
    Et je clique sur "Portfolio" dans le sous-menu
    Alors je suis redirigé vers /portfolio-detournements

  Scénario: Le lien A propos mène vers la page A propos
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur "A propos" dans le menu du header
    Alors je suis redirigé vers /a-propos

  # --- CA3 : Menu hamburger mobile ---

  Scénario: Sur mobile, le menu horizontal est masqué et une icône hamburger s'affiche
    Étant donné que je suis sur n'importe quelle page du site
    Et que l'écran est en mode mobile (largeur < 768px)
    Quand je regarde le header
    Alors je ne vois pas le menu horizontal avec les liens
    Et je vois une icône hamburger

  Scénario: La photo reste visible dans le header sur mobile
    Étant donné que je suis sur n'importe quelle page du site
    Et que l'écran est en mode mobile (largeur < 768px)
    Quand je regarde le header
    Alors je vois la photo à droite du header

  Scénario: Le panneau latéral s'ouvre au clic sur l'icône hamburger
    Étant donné que je suis sur n'importe quelle page du site
    Et que l'écran est en mode mobile (largeur < 768px)
    Quand je clique sur l'icône hamburger
    Alors un panneau latéral ou overlay s'ouvre
    Et le panneau contient les mêmes entrées que le menu desktop (Accueil, Mes profils, Détournement vidéo, A propos)
    Et les sous-menus sont accessibles dans le panneau

  # CA4 (logo dans le footer) supprimé : logo retiré du footer
