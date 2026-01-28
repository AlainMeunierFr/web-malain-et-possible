# language: fr

Fonctionnalité: Affichage des expériences sous les domaines de compétences
  En tant que visiteur/recruteur
  Je veux consulter les expériences et apprentissages associés à chaque domaine de compétence
  Afin de disposer de preuves concrètes des compétences prétendues et mieux comprendre l'expérience d'Alain

  Scénario: Consultation d'un domaine avec expériences associées
    Étant donné qu'un domaine de compétence contient 3 compétences
    Et que ce domaine a des expériences associées
    Quand je consulte la page affichant ce domaine
    Alors je vois d'abord le bloc contenant les 3 compétences
    Et je vois ensuite les expériences affichées sous ce bloc
    Et les expériences sont présentées dans une liste à puces

  Scénario: Format d'affichage d'une expérience avec période
    Étant donné qu'un domaine affiche une expérience avec :
      | Élément     | Valeur                                    |
      | titre       | "Gestion de plateaux d'assistance technique" |
      | description | "Gestion de plateaux d'assistance..."    |
      | periode     | "2020-2023"                               |
    Quand je consulte la page affichant ce domaine
    Alors je vois la période en italique et entre crochets : [2020-2023]
    Et je vois le titre en gras : "Gestion de plateaux d'assistance technique"
    Et je vois la description en texte normal après le titre

  Scénario: Format d'affichage d'une expérience sans période
    Étant donné qu'un domaine affiche une expérience avec :
      | Élément     | Valeur                                    |
      | titre       | "Recrutement et formation"                |
      | description | "Recrutement et formation de plus de 100 collaborateurs..." |
      | periode     | (aucune période)                          |
    Quand je consulte la page affichant ce domaine
    Alors je vois le titre en gras : "Recrutement et formation"
    Et je vois la description en texte normal après le titre
    Et aucune période n'est affichée (pas de crochets vides)

  Scénario: Affichage de plusieurs expériences pour un domaine
    Étant donné qu'un domaine a plusieurs expériences associées
    Quand je consulte la page affichant ce domaine
    Alors je vois toutes les expériences affichées dans une liste à puces
    Et chaque expérience respecte le format : [periode] **titre** - description
    Et les expériences sont lisibles et bien séparées visuellement

  Scénario: Domaine sans expériences associées
    Étant donné qu'un domaine de compétence n'a pas d'expériences associées
    Quand je consulte la page affichant ce domaine
    Alors je vois uniquement le bloc contenant les 3 compétences
    Et aucune section d'expériences n'est affichée (pas de section vide ou d'erreur)

  Scénario: Structure d'affichage d'un domaine complet
    Étant donné qu'un domaine contient :
      - Un titre et un contenu (citation)
      - 3 compétences affichées verticalement
      - Des expériences associées
    Quand je consulte la page affichant ce domaine
    Alors je vois dans l'ordre :
      | Ordre | Élément                    |
      | 1     | Titre et contenu du domaine |
      | 2     | Bloc des 3 compétences      |
      | 3     | Section des expériences     |
    Et les expériences sont bien positionnées après le bloc des compétences
    Et l'ensemble est visuellement cohérent
