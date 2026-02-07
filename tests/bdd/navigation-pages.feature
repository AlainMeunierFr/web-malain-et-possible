# language: fr

Fonctionnalité: Navigation entre les pages du site
  En tant que visiteur du site
  Je veux naviguer facilement entre les différentes pages
  Afin de découvrir tout le contenu disponible

  Scénario: Navigation vers la page d'accueil depuis le menu
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur "Accueil" dans le menu du header
    Alors je suis redirigé vers la page d'accueil

  Scénario: Navigation vers la page "À propos du site" depuis la photo
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur la photo en haut à droite
    Alors je suis redirigé vers la page "À propos du site"

  Scénario: Navigation vers le plan du site depuis le footer
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur le bouton "Plan du site" dans le footer
    Alors je suis redirigé vers la page "Plan du site"
    Et je vois une liste de toutes les pages disponibles avec des boutons cliquables

  Scénario: Navigation vers la page "Faisons connaissance" depuis un bouton d'action
    Étant donné que je suis sur une page avec un bouton "Faisons connaissance..."
    Quand je clique sur ce bouton
    Alors je suis redirigé vers la page "Faisons connaissance"
    Et je vois des boutons de contact organisés en groupes
