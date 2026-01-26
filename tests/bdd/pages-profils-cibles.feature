# language: fr

Fonctionnalité: Pages de profils ciblés
  En tant que visiteur/recruteur
  Je veux accéder à des pages de profils ciblés selon le poste recherché
  Afin de voir uniquement les compétences pertinentes pour ce poste

  Scénario: Structure de la page profil CPO
    Étant donné que le fichier "data/profil-cpo.json" existe
    Et que ce fichier contient un tableau "contenu" avec des éléments dans l'ordre suivant :
      | Type                | Propriétés requises                                    |
      | video               | urlYouTube, lancementAuto                              |
      | titre               | texte                                                 |
      | domaineDeCompetence  | ref (référence vers bibliothèque)                     |
      | domaineDeCompetence  | ref                                                   |
      | ...                  | ...                                                   |
      | callToAction         | action                                                |
    Quand je charge la page "/profil/cpo"
    Alors je vois une vidéo en haut de page
    Et je vois un titre de page
    Et je vois plusieurs domaines de compétences résolus depuis la bibliothèque
    Et je vois un CallToAction en fin de page

  Scénario: Vidéo sur la page profil CPO
    Étant donné que le fichier "data/profil-cpo.json" contient un élément de type "video" en première position
    Et que cet élément a les propriétés :
      | Propriété      | Valeur attendue                    |
      | urlYouTube     | "https://youtu.be/iUv6e256AVk"     |
      | lancementAuto  | true                               |
    Quand je charge la page "/profil/cpo"
    Alors je vois la vidéo avec l'URL YouTube spécifiée
    Et la vidéo se lance automatiquement

  Scénario: Titre de la page profil CPO
    Étant donné que le fichier "data/profil-cpo.json" contient un élément de type "titre"
    Et que cet élément a une propriété "texte" avec une valeur non vide
    Quand je charge la page "/profil/cpo"
    Alors je vois le titre de la page affiché
    Et le titre correspond à la valeur de la propriété "texte" du JSON

  Scénario: Domaines référencés depuis la bibliothèque - CPO
    Étant donné que le fichier "data/profil-cpo.json" contient des éléments de type "domaineDeCompetence"
    Et que chaque élément a une propriété "ref" pointant vers un domaine de la bibliothèque
    Et que la bibliothèque "data/bibliotheque/domaines.json" contient les domaines référencés
    Quand je charge la page "/profil/cpo"
    Alors tous les domaines référencés sont résolus depuis la bibliothèque
    Et chaque domaine affiché contient ses compétences complètes
    Et aucune référence n'est cassée

  Scénario: CallToAction sur la page profil CPO
    Étant donné que le fichier "data/profil-cpo.json" contient un élément de type "callToAction" en dernière position
    Et que cet élément a une propriété "action" avec la valeur "On discute ?"
    Quand je charge la page "/profil/cpo"
    Alors je vois un CallToAction en fin de page
    Et le CallToAction redirige vers "/faisons-connaissance"

  Scénario: Structure de la page profil COO
    Étant donné que le fichier "data/profil-coo.json" existe
    Et que ce fichier contient un tableau "contenu" avec une structure similaire à profil-cpo.json
    Quand je charge la page "/profil/coo"
    Alors je vois une vidéo en haut de page
    Et je vois un titre de page
    Et je vois plusieurs domaines de compétences
    Et je vois un CallToAction en fin de page

  Scénario: Vidéo sur la page profil COO
    Étant donné que le fichier "data/profil-coo.json" contient un élément de type "video" en première position
    Et que cet élément a les propriétés :
      | Propriété      | Valeur attendue                    |
      | urlYouTube     | "https://youtu.be/9rwtuxXiKC0"     |
      | lancementAuto  | true                               |
    Quand je charge la page "/profil/coo"
    Alors je vois la vidéo avec l'URL YouTube spécifiée
    Et la vidéo se lance automatiquement

  Scénario: Structure de la page profil Agile avec deux vidéos
    Étant donné que le fichier "data/profil-agile.json" existe
    Et que ce fichier contient un tableau "contenu" avec :
      | Position | Type                | Description                                    |
      | 1        | video               | Vidéo en début de page                        |
      | 2        | titre               | Titre de la page                               |
      | 3+       | domaineDeCompetence  | Domaines référencés                           |
      | N-1      | video               | Vidéo en fin de page (après les domaines)      |
      | N        | callToAction        | CallToAction en fin                            |
    Quand je charge la page "/profil/agile"
    Alors je vois une vidéo en haut de page
    Et je vois un titre de page
    Et je vois plusieurs domaines de compétences
    Et je vois une deuxième vidéo après les domaines
    Et je vois un CallToAction en fin de page

  Scénario: Vidéos sur la page profil Agile
    Étant donné que le fichier "data/profil-agile.json" contient deux éléments de type "video"
    Et que le premier élément début a les propriétés :
      | Propriété      | Valeur attendue                    |
      | urlYouTube     | "https://youtu.be/XoruJezxpsI"     |
      | lancementAuto  | true                               |
    Et que le deuxième élément fin a les propriétés :
      | Propriété      | Valeur attendue                    |
      | urlYouTube     | "https://youtu.be/mPif5EjzFYg"     |
      | lancementAuto  | false                              |
    Quand je charge la page "/profil/agile"
    Alors je vois la première vidéo en haut de page avec lancement auto
    Et je vois la deuxième vidéo après les domaines sans lancement auto

  Scénario: Structure de la page profil CTO
    Étant donné que le fichier "data/profil-cto.json" existe
    Et que ce fichier contient un tableau "contenu" avec une structure similaire à profil-cpo.json
    Quand je charge la page "/profil/cto"
    Alors je vois une vidéo en haut de page
    Et je vois un titre de page
    Et je vois plusieurs domaines de compétences
    Et je vois un CallToAction en fin de page

  Scénario: Vidéo sur la page profil CTO
    Étant donné que le fichier "data/profil-cto.json" contient un élément de type "video" en première position
    Et que cet élément a les propriétés :
      | Propriété      | Valeur attendue                    |
      | urlYouTube     | "https://youtu.be/iUv6e256AVk"     |
      | lancementAuto  | true                               |
    Quand je charge la page "/profil/cto"
    Alors je vois la vidéo avec l'URL YouTube spécifiée
    Et la vidéo se lance automatiquement

  Scénario: Navigation depuis la section HERO vers un profil
    Étant donné que la page d'accueil contient une section HERO avec 4 containers de profils
    Et que chaque container a un bouton "Découvrir" avec une route vers "/profil/[slug]"
    Quand je suis sur la page d'accueil
    Et que je clique sur le bouton "Découvrir" du profil CPO
    Alors je suis redirigé vers la page "/profil/cpo"
    Et la page "/profil/cpo" s'affiche correctement

  Scénario: Intégrité référentielle des domaines - CPO
    Étant donné que le fichier "data/profil-cpo.json" contient des éléments de type "domaineDeCompetence" avec des propriétés "ref"
    Et que la bibliothèque "data/bibliotheque/domaines.json" existe
    Quand je charge la page "/profil/cpo"
    Alors toutes les références "ref" pointent vers des domaines existants dans la bibliothèque
    Et aucune erreur d'intégrité référentielle n'est levée

  Scénario: Intégrité référentielle des domaines - COO
    Étant donné que le fichier "data/profil-coo.json" contient des éléments de type "domaineDeCompetence" avec des propriétés "ref"
    Et que la bibliothèque "data/bibliotheque/domaines.json" existe
    Quand je charge la page "/profil/coo"
    Alors toutes les références "ref" pointent vers des domaines existants dans la bibliothèque
    Et aucune erreur d'intégrité référentielle n'est levée

  Scénario: Intégrité référentielle des domaines - Agile
    Étant donné que le fichier "data/profil-agile.json" contient des éléments de type "domaineDeCompetence" avec des propriétés "ref"
    Et que la bibliothèque "data/bibliotheque/domaines.json" existe
    Quand je charge la page "/profil/agile"
    Alors toutes les références "ref" pointent vers des domaines existants dans la bibliothèque
    Et aucune erreur d'intégrité référentielle n'est levée

  Scénario: Intégrité référentielle des domaines - CTO
    Étant donné que le fichier "data/profil-cto.json" contient des éléments de type "domaineDeCompetence" avec des propriétés "ref"
    Et que la bibliothèque "data/bibliotheque/domaines.json" existe
    Quand je charge la page "/profil/cto"
    Alors toutes les références "ref" pointent vers des domaines existants dans la bibliothèque
    Et aucune erreur d'intégrité référentielle n'est levée

  Scénario: Ordre des domaines respecté - CPO
    Étant donné que le fichier "data/profil-cpo.json" contient plusieurs éléments de type "domaineDeCompetence" dans un ordre spécifique
    Et que chaque élément a une propriété "ref" unique
    Quand je charge la page "/profil/cpo"
    Alors les domaines sont affichés dans le même ordre que dans le JSON
    Et l'ordre correspond à celui défini dans PROPOSITION-DOMAINES-PAR-PROFIL.md

  Scénario: Accessibilité depuis le plan du site
    Étant donné que le plan du site existe
    Quand je consulte le plan du site
    Alors je vois les 4 pages de profils listées :
      | Route          | Titre                |
      | /profil/cpo   | Produit logiciel     |
      | /profil/coo   | Opérations           |
      | /profil/agile | Transformation Agile |
      | /profil/cto   | Technologie          |
