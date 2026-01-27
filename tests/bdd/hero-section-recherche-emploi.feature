# language: fr

Fonctionnalité: Section HERO orientée recherche d'emploi
  En tant que visiteur/recruteur
  Je veux voir immédiatement que le site est orienté recherche d'emploi
  Afin de comprendre rapidement la disponibilité et les intentions d'Alain

  Scénario: Affichage de la section HERO depuis le JSON
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" avec :
      | Propriété       | Valeur                                    |
      | type             | "hero"                                    |
      | titre            | "Alain Meunier"                          |
      | sousTitre        | "Je recherche un projet stimulant..."     |
      | description      | "Description de la valeur..."            |
      | boutonPrincipal  | { "texte": "On discute ?", "action": "/faisons-connaissance" } |
    Quand je charge la page d'accueil
    Alors je vois la section HERO en haut de la page
    Et je vois le titre "Alain Meunier"
    Et je vois le sous-titre "Je recherche un projet stimulant..."
    Et je vois la description de la valeur
    Et je vois le bouton "On discute ?"

  Scénario: Navigation depuis le bouton principal de la HERO
    Étant donné que le fichier "data/index.json" contient un élément de type "hero"
    Et que cet élément a un boutonPrincipal avec action "/faisons-connaissance"
    Quand je suis sur la page d'accueil
    Et que je clique sur le bouton principal de la HERO
    Alors je suis redirigé vers la page "/faisons-connaissance"

  Scénario: Affichage des containers de profils depuis le JSON
    Étant donné que le fichier "data/index.json" contient un élément de type "hero"
    Et que cet élément contient un tableau "profils" avec 4 éléments de type "profil"
    Quand je charge la page d'accueil
    Alors je vois 4 containers de profils dans la section HERO
    Et chaque container affiche le titre du profil correspondant depuis le JSON

  Scénario: Structure et affichage d'un container profil
    Étant donné que le fichier "data/index.json" contient un élément de type "hero"
    Et que cet élément contient un profil avec :
      | Propriété | Type   | Exemple                    |
      | type      | string | "profil"                   |
      | titre     | string | "Produit logiciel"          |
      | jobTitles | array  | ["CPO - ...", "HOP - ..."] |
      | slug      | string | "cpo"                      |
      | route     | string | "/profil/cpo"              |
      | cvPath    | string | "/data/CV/cpo.pdf"         |
    Quand je charge la page d'accueil
    Alors je vois un container profil avec le titre depuis le JSON
    Et je vois la liste des job titles depuis le tableau jobTitles du JSON
    Et je vois un bouton d'accès qui pointe vers la route depuis le JSON
    Et je vois le bouton "Voir le CV"

  Scénario: Navigation vers une page de profil depuis le JSON
    Étant donné que le fichier "data/index.json" contient un élément de type "hero"
    Et que cet élément contient un profil avec route "/profil/cpo"
    Quand je suis sur la page d'accueil
    Et que je clique sur le bouton d'accès du container profil correspondant
    Alors je suis redirigé vers la route définie dans le JSON du profil

  Scénario: Téléchargement du CV depuis le JSON
    Étant donné que le fichier "data/index.json" contient un élément de type "hero"
    Et que cet élément contient un profil avec cvPath "/data/CV/cpo.pdf"
    Quand je suis sur la page d'accueil
    Et que je clique sur le bouton "Voir le CV" du container profil correspondant
    Alors le fichier CV défini dans cvPath du JSON est téléchargé

  Scénario: Disposition des containers de profils sur desktop
    Étant donné que le fichier "data/index.json" contient un élément de type "hero"
    Et que cet élément contient un tableau "profils" avec plusieurs éléments
    Quand je charge la page d'accueil
    Et que je visualise la page sur un écran desktop (largeur ≥ 769px)
    Alors les containers de profils sont affichés côte à côte en disposition horizontale
    Et aucun profil n'a plus de valeur visuelle que les autres

  Scénario: Disposition des containers de profils sur mobile
    Étant donné que le fichier "data/index.json" contient un élément de type "hero"
    Et que cet élément contient un tableau "profils" avec plusieurs éléments
    Quand je charge la page d'accueil
    Et que je visualise la page sur un écran mobile (largeur ≤ 768px)
    Alors les containers de profils sont empilés verticalement
    Et chaque container occupe toute la largeur disponible

  Scénario: Contenu de la page d'accueil après la HERO
    Étant donné que le fichier "data/index.json" contient :
      - Un élément de type "hero" en premier
      - Un élément de type "callToAction" après la HERO
      - Un élément de type "video" après le callToAction
      - Un élément de type "texteLarge" après la vidéo
    Quand je charge la page d'accueil
    Et que je fais défiler la page après la section HERO
    Alors je vois le CallToAction défini dans le JSON
    Et je vois la vidéo définie dans le JSON
    Et je vois le texte large défini dans le JSON
    Et je ne vois plus les domaines de compétences (ils sont sur les pages de profils)

  Scénario: Validation de la structure JSON du type "hero"
    Étant donné que le fichier "data/index.json" contient un élément de type "hero"
    Alors cet élément contient les propriétés obligatoires :
      | Propriété       | Type   | Obligatoire |
      | type            | string | Oui          |
      | titre           | string | Oui          |
      | sousTitre       | string | Oui          |
      | description     | string | Oui          |
      | boutonPrincipal | object | Oui          |
      | profils         | array  | Oui          |
    Et la propriété "profils" contient uniquement des éléments de type "profil"

  Scénario: Validation de la structure JSON du type "profil"
    Étant donné qu'un élément de type "profil" existe dans un élément de type "hero"
    Alors cet élément contient les propriétés obligatoires :
      | Propriété | Type   | Obligatoire |
      | type      | string | Oui         |
      | titre     | string | Oui         |
      | jobTitles | array  | Oui         |
      | slug      | string | Oui         |
      | route     | string | Oui         |
      | cvPath    | string | Oui         |
    Et la propriété "jobTitles" est un tableau non vide de chaînes de caractères

  Scénario: Respect de la charte graphique
    Étant donné que je suis sur la page d'accueil
    Et que la section HERO est affichée
    Alors la section HERO utilise les couleurs de la charte graphique actuelle
    Et les polices sont cohérentes avec le reste du site
    Et le style est harmonieux avec les autres pages
