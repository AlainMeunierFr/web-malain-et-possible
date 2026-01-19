# Language: fr
# Feature: Page "Faisons connaissance" - Affichage et comportement des boutons de contact

Feature: Affichage des boutons de contact sur la page "Faisons connaissance"
  En tant que visiteur du site
  Je veux voir une page "Faisons connaissance" avec des boutons de contact organisés en groupes
  Afin de facilement entrer en contact avec Alain

  Background:
    Étant donné que je suis sur la page "/faisons-connaissance"
    Et que le fichier JSON de la page contient un titre et des groupes de boutons

  Scenario: Affichage du titre de la page
    Étant donné que le JSON contient un élément de type "titre" avec le texte "Faisons connaissance"
    Quand la page est chargée
    Alors je vois un titre "Faisons connaissance"

  Scenario: Affichage du groupe de boutons "grands" (verticaux)
    Étant donné que le JSON contient un élément de type "groupeBoutons" avec taille "grande"
    Et que ce groupe contient 3 boutons avec icônes et textes
    Quand la page est chargée
    Alors je vois un groupe de boutons affiché verticalement
    Et chaque bouton affiche une icône et un titre
    Et les boutons sont empilés les uns sous les autres

  Scenario: Contenu du groupe de boutons "grands"
    Étant donné que le JSON contient un groupe de boutons de taille "grande"
    Quand la page est chargée
    Alors je vois un bouton avec icône de couverts et texte "Déjeuner aux alentours de Lyon"
    Et je vois un bouton avec icône de visioconférence et texte "30mn de visio"
    Et je vois un bouton avec icône de téléphone et texte "+33 6.21.03.12.65"

  Scenario: Navigation depuis les boutons "grands"
    Étant donné que je suis sur la page "/faisons-connaissance"
    Quand je clique sur le bouton "Déjeuner aux alentours de Lyon"
    Alors je suis redirigé vers "http://localhost:3000/about-site"
    Quand je clique sur le bouton "30mn de visio"
    Alors je suis redirigé vers "http://localhost:3000/about-site"
    Quand je clique sur le bouton "+33 6.21.03.12.65"
    Alors le client téléphonique s'ouvre avec le numéro "tel:+33621031265"

  Scenario: Comportement téléphone sur smartphone
    Étant donné que je suis sur un smartphone
    Et que je suis sur la page "/faisons-connaissance"
    Quand je clique sur le bouton "+33 6.21.03.12.65"
    Alors un appel téléphonique est déclenché vers "+33 6.21.03.12.65"

  Scenario: Affichage du groupe de boutons "petits" (horizontaux)
    Étant donné que le JSON contient un élément de type "groupeBoutons" avec taille "petite"
    Et que ce groupe contient 3 boutons avec icônes uniquement
    Quand la page est chargée
    Alors je vois un groupe de boutons affiché horizontalement
    Et chaque bouton affiche uniquement une icône (sans texte)
    Et les boutons sont alignés côte à côte

  Scenario: Contenu du groupe de boutons "petits"
    Étant donné que le JSON contient un groupe de boutons de taille "petite"
    Quand la page est chargée
    Alors je vois un bouton avec icône email
    Et je vois un bouton avec icône YouTube
    Et je vois un bouton avec icône LinkedIn

  Scenario: Navigation depuis les boutons "petits"
    Étant donné que je suis sur la page "/faisons-connaissance"
    Quand je clique sur le bouton email
    Alors le client de messagerie s'ouvre avec l'adresse "mailto:alain@maep.fr"
    Quand je clique sur le bouton YouTube
    Alors la chaîne YouTube s'ouvre dans un nouvel onglet
    Quand je clique sur le bouton LinkedIn
    Alors le profil LinkedIn s'ouvre dans un nouvel onglet

  Scenario: Couleur des boutons inversée par rapport au footer
    Étant donné que je suis sur la page "/faisons-connaissance"
    Quand la page est chargée
    Alors les boutons ont une couleur de texte BleuFonce sur fond clair
    Et cette couleur est l'inverse de celle du footer (blanc sur BleuFonce)

  Scenario: Structure JSON de la page "Faisons connaissance"
    Étant donné que le fichier "data/faisons-connaissance.json" existe
    Quand je charge le contenu de la page
    Alors le JSON contient un tableau "contenu"
    Et ce tableau contient un élément de type "titre"
    Et ce tableau contient un élément de type "groupeBoutons" avec taille "grande"
    Et ce tableau contient un élément de type "groupeBoutons" avec taille "petite"

  Scenario: Réutilisation de l'architecture des boutons du footer
    Étant donné que les boutons utilisent la même architecture que le footer
    Quand la page est chargée
    Alors la logique de gestion des boutons (icône, URL, command) est réutilisée
    Et l'affichage est adapté selon la taille du groupe (petite/grande)
