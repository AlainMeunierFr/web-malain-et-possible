# US-3.3 : Enrichissement des pages avec de nouveaux types de contenu ✅ COMPLÉTÉ

## En tant que Visiteur du site

## Je souhaite Voir différents types de contenu sur les pages (titres, vidéos, textes d'introduction) en plus des domaines de compétences

## Afin de Avoir une expérience de navigation plus riche et variée avec différents formats de présentation

# Critères d'acceptation

- Le JSON n'est plus une liste de "domaine de compétence". Le JSON devient "contenu de page", lequel contient, pour compatibilité ascendante, la liste actuelle de "Domaine de compétence". Mais ce JSON va pouvoir contenir d'autres types que nous allons définir ensuite.
## CA1 - Nouveau Type "Titre"
- Data : un texte
- CSS : une bande bleue foncée qui fait toute la largeur de la page contenant le texte en h1
## CA2 - Nouveau type "Vidéo"
- Data : URL YouTube / Lancement automatique = Oui/Non
- CSS : incrustation de vidéo YouTube
## CA3 - Nouveau Type "Texte large"
- Data : un texte
- CSS : un texte qui se comporte comme le titre d'un domaine de compétence (947 de largeur max) mais qui n'a pas "3 compétences"