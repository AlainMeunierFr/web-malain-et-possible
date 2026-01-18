# language: fr

Fonctionnalité: Navigation

  Scénario: L'utilisateur clique sur la photo pour naviguer vers la page "A propos de moi"
    Étant donné que le header est affiché
    Quand l'utilisateur clique sur la photo
    Alors la page "A propos de moi" est affichée
    Et elle affiche le texte "a propos de moi"

  Scénario: L'utilisateur clique sur le logo pour naviguer vers la page d'accueil
    Étant donné que le header est affiché
    Quand l'utilisateur clique sur le logo
    Alors la page d'accueil est affichée
    Et elle affiche le texte "Home page"

  Scénario: L'utilisateur clique sur le bouton Email
    Étant donné que le footer est affiché
    Quand l'utilisateur clique sur le bouton "Email"
    Alors le client de messagerie par défaut s'ouvre avec mon adresse email

  Scénario: L'utilisateur clique sur le bouton YouTube
    Étant donné que le footer est affiché
    Quand l'utilisateur clique sur le bouton "YouTube"
    Alors la chaîne YouTube s'ouvre dans un nouvel onglet

  Scénario: L'utilisateur clique sur le bouton LinkedIn
    Étant donné que le footer est affiché
    Quand l'utilisateur clique sur le bouton "LinkedIn"
    Alors le profil LinkedIn s'ouvre dans un nouvel onglet

  Scénario: L'utilisateur clique sur le bouton Plan du site
    Étant donné que le footer est affiché
    Quand l'utilisateur clique sur le bouton "Site Map"
    Alors la page plan du site est affichée

  Scénario: L'utilisateur clique sur le bouton À propos du site
    Étant donné que le footer est affiché
    Quand l'utilisateur clique sur le bouton "À propos du site"
    Alors la page à propos du site est affichée
