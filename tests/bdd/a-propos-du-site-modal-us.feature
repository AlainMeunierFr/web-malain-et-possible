# language: fr

Fonctionnalité: Clic post-it – affichage détaillé de l'US en modal — US-11.6
  En tant que visiteur ou membre du projet qui consulte la page « A propos de ce site » et le board KanBan du sprint en cours
  Je souhaite qu'au clic sur une carte (post-it) du board, cette User Story s'affiche en grand dans une modal avec l'ID, le titre et le contenu complet en Markdown, et un moyen de fermer la vue
  Afin de lire le détail d'une User Story (contexte, critères d'acceptation) sans quitter la page

  Contexte:
    Étant donné que je suis sur la page "A propos de ce site"
    Et que menu.json contient une ligne avec Titre "Sprint en cours", Type "container", Parametre "sprintEnCours"
    Et j'ai cliqué sur la ligne de menu "Sprint en cours" dans la bande horizontale
    Et le contenu du container sprintEnCours s'affiche
    Et le board affiche au moins une carte US

  Scénario: Au clic sur une carte du board, une modal s'ouvre et affiche cette US
    Quand je clique sur une carte du board KanBan
    Alors une modal (ou overlay) s'affiche
    Et la modal affiche l'US correspondant à la carte cliquée

  Scénario: La modal affiche en haut l'ID et le titre de l'US
    Quand je clique sur une carte du board KanBan
    Alors une modal s'affiche
    Et en haut de la modal je vois l'ID de l'US en gras
    Et en haut de la modal je vois le titre de l'US correspondant à la carte cliquée

  Scénario: La modal affiche le bloc En tant que / Je souhaite / Afin de
    Quand je clique sur une carte du board KanBan
    Alors une modal s'affiche
    Et dans la modal je vois le bloc "En tant que" avec le rôle
    Et dans la modal je vois "Je souhaite" et "Afin de" avec le bénéfice

  Scénario: La modal affiche le contenu de l'US au format Markdown avec une zone défilable
    Quand je clique sur une carte du board KanBan
    Alors une modal s'affiche
    Et la modal affiche le contenu de l'US (critères d'acceptation, etc.) au format Markdown
    Et une zone défilable (ascenseur) permet de scroller ce contenu

  Scénario: Le titre de l'US et le bloc En tant que restent visibles pendant le scroll
    Quand je clique sur une carte du board KanBan
    Alors une modal s'affiche
    Et le titre de l'US (ID et titre) reste visible en haut de la modal
    Et le bloc "En tant que … Je souhaite … Afin de …" reste visible en haut de la modal
    Et seul le contenu des critères d'acceptation (et le reste du Markdown) défile

  Scénario: Un contrôle de fermeture en haut à droite (icône vectorielle case à cocher) permet de fermer la modal
    Quand je clique sur une carte du board KanBan
    Alors une modal s'affiche
    Et je vois en haut à droite de la modal une icône vectorielle de case à cocher pour fermer
    Quand je clique sur l'icône de fermeture (case à cocher) de la modal
    Alors la modal se ferme
    Et je revois le board KanBan

  Scénario: La modal occupe bien l'écran pour afficher tous les CA
    Quand je clique sur une carte du board KanBan
    Alors une modal s'affiche
    Et la modal occupe une grande surface de l'écran (quasi plein écran ou largeur et hauteur majoritaires)

  Scénario: La modal utilise la police Clint Marker pour le contenu
    Quand je clique sur une carte du board KanBan
    Alors une modal s'affiche
    Et le contenu affiché dans la modal utilise la police Clint Marker
