# language: fr

Fonctionnalité: Contact et interaction avec le site
  En tant que visiteur du site
  Je veux pouvoir entrer en contact avec Alain
  Afin de découvrir comment collaborer

  Scénario: Affichage de la page "Faisons connaissance"
    Étant donné que je suis sur la page "Faisons connaissance"
    Quand la page se charge
    Alors je vois des boutons de contact organisés en groupes
    Et chaque groupe contient plusieurs boutons de contact
    Et les boutons permettent différents modes de contact (déjeuner, visio, téléphone, email, réseaux sociaux)

  Scénario: Accès aux réseaux sociaux depuis le footer
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur le bouton YouTube dans le footer
    Alors une nouvelle fenêtre s'ouvre vers la chaîne YouTube
    Quand je clique sur le bouton LinkedIn dans le footer
    Alors une nouvelle fenêtre s'ouvre vers le profil LinkedIn
    Quand je clique sur le bouton Email dans le footer
    Alors mon client de messagerie s'ouvre avec une nouvelle composition

  Scénario: Accès à la page Metrics depuis le footer
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur le bouton "Metrics" dans le footer
    Alors je suis redirigé vers la page Metrics
    Et je vois un dashboard avec les métriques de qualité du code
