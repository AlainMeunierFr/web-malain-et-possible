# language: fr

Fonctionnalité: Page dédiée Ingénierie logiciel
  En tant que visiteur du site
  Je veux accéder à une page dédiée présentant les compétences techniques d'Alain en ingénierie logiciel
  Afin de découvrir ses domaines d'expertise en développement, pratiques d'équipe et architectures

  Scénario: Navigation vers la page depuis la page d'accueil
    Étant donné que je suis sur la page d'accueil
    Et que je vois le domaine de compétence "Ingénierie logiciel"
    Quand je clique sur le bouton "En savoir plus" de ce domaine
    Alors je suis redirigé vers la page "/ingenierie-logiciel"
    Et je vois le titre "Ingénierie logiciel" en haut de la page

  Scénario: Affichage des domaines de compétences
    Étant donné que je suis sur la page "/ingenierie-logiciel"
    Alors je vois 3 domaines de compétences :
      | Domaine              |
      | Développeur          |
      | Expérience en équipe |
      | Autres pratiques connues |
    Et chaque domaine a une description

  Scénario: Affichage des compétences du domaine "Développeur"
    Étant donné que je suis sur la page "/ingenierie-logiciel"
    Quand je regarde le domaine "Développeur"
    Alors je vois 3 compétences :
      | Compétence   |
      | 4D           |
      | no-code      |
      | Vibe Coding  |
    Et chaque compétence a une image
    Et chaque compétence a un texte descriptif

  Scénario: Affichage des compétences du domaine "Expérience en équipe"
    Étant donné que je suis sur la page "/ingenierie-logiciel"
    Quand je regarde le domaine "Expérience en équipe"
    Alors je vois 3 compétences :
      | Compétence |
      | BDD        |
      | TDD        |
      | CI/CD      |
    Et chaque compétence a une image
    Et chaque compétence a un texte descriptif

  Scénario: Affichage des compétences du domaine "Autres pratiques connues"
    Étant donné que je suis sur la page "/ingenierie-logiciel"
    Quand je regarde le domaine "Autres pratiques connues"
    Alors je vois 3 compétences :
      | Compétence            |
      | CleanCode             |
      | Architecture Hexagonale |
      | CQRS:ES               |
    Et chaque compétence a une image
    Et chaque compétence a un texte descriptif

  Scénario: Navigation depuis Vibe Coding vers A propos
    Étant donné que je suis sur la page "/ingenierie-logiciel"
    Et que je vois la compétence "Vibe Coding"
    Quand je clique sur le bouton "En savoir plus..." de cette compétence
    Alors je suis redirigé vers la page "/a-propos"

  Scénario: Affichage responsive sur mobile
    Étant donné que je suis sur la page "/ingenierie-logiciel"
    Et que je visualise la page sur un écran mobile (largeur ≤ 768px)
    Alors les compétences sont empilées verticalement
    Et chaque compétence est centrée et occupe environ 85% de la largeur de l'écran

  Scénario: Affichage responsive sur desktop
    Étant donné que je suis sur la page "/ingenierie-logiciel"
    Et que je visualise la page sur un écran desktop (largeur ≥ 769px)
    Alors les compétences sont affichées côte à côte (3 par ligne)
    Et les domaines de compétences alternent les fonds (blanc/bleu clair)

  Scénario: Intégration dans le plan du site
    Étant donné que le test d'intégration du plan du site est exécuté
    Alors la page "/ingenierie-logiciel" est automatiquement détectée
    Et elle apparaît dans la liste des pages du plan du site
