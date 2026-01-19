# Language: fr
# Feature: Types de contenu enrichis pour les pages

Feature: Affichage de différents types de contenu sur les pages
  En tant que visiteur du site
  Je veux voir différents types de contenu (titres, vidéos, textes d'introduction) en plus des domaines de compétences
  Afin d'avoir une expérience de navigation plus riche et variée

  Background:
    Étant donné que je suis sur une page du site vitrine
    Et que le fichier JSON de la page contient différents types de contenu

  Scenario: Affichage d'un type "Titre"
    Étant donné que le JSON contient un élément de type "Titre" avec un texte
    Quand la page est chargée
    Alors je vois une bande bleue foncée qui fait toute la largeur de la page
    Et le texte est affiché en h1 dans cette bande

  Scenario: Affichage d'un type "Vidéo"
    Étant donné que le JSON contient un élément de type "Vidéo" avec une URL YouTube
    Et que le lancement automatique est configuré (Oui ou Non)
    Quand la page est chargée
    Alors je vois une incrustation de vidéo YouTube
    Et la vidéo respecte la configuration de lancement automatique

  Scenario: Affichage d'un type "Tête large"
    Étant donné que le JSON contient un élément de type "Tête large" avec un texte
    Quand la page est chargée
    Alors je vois un texte qui se comporte comme le titre d'un domaine de compétence
    Et la largeur maximale est de 947px
    Et il n'y a pas de "3 compétences" affichées

  Scenario: Compatibilité ascendante avec les domaines de compétences existants
    Étant donné que le JSON contient un élément de type "Domaine de compétence"
    Quand la page est chargée
    Alors le domaine de compétence s'affiche correctement comme avant
    Et il est compatible avec la nouvelle structure "contenu de page"

  Scenario: Structure JSON "contenu de page" avec plusieurs types
    Étant donné que le JSON a une structure "contenu de page"
    Et que ce contenu contient plusieurs types différents (Titre, Vidéo, Tête large, Domaine de compétence)
    Quand la page est chargée
    Alors tous les types de contenu s'affichent dans l'ordre défini dans le JSON
    Et chaque type utilise son composant et son style CSS approprié
