# language: fr

Fonctionnalité: Affichage du contenu du site
  En tant que visiteur du site
  Je veux voir différents types de contenu correctement formatés
  Afin d'avoir une expérience de navigation riche et variée

  Scénario: Affichage d'une vidéo YouTube
    Étant donné que je suis sur une page contenant une vidéo
    Quand la page se charge
    Alors je vois un lecteur vidéo YouTube intégré
    Et la vidéo peut être lancée manuellement (pas de lancement automatique par défaut)

  Scénario: Affichage d'un texte d'introduction
    Étant donné que je suis sur une page contenant un texte d'introduction
    Quand la page se charge
    Alors je vois le texte formaté correctement
    Et le texte supporte le formatage markdown (gras avec **texte**)
    Et les citations avec auteur sont affichées avec l'auteur en italique aligné à droite

  Scénario: Affichage de témoignages
    Étant donné que je suis sur une page contenant des témoignages
    Quand la page se charge
    Alors je vois les témoignages affichés avec leur auteur
    Et chaque témoignage est correctement formaté

  Scénario: Affichage du portfolio de détournements vidéo
    Étant donné que je suis sur la page "Portfolio détournements"
    Quand la page se charge
    Alors je vois une galerie de détournements vidéo
    Et chaque détournement affiche une image
    Et chaque détournement a un lien vers la vidéo correspondante
