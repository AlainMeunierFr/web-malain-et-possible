# language: fr

Fonctionnalité: Navigation et affichage des domaines de compétences
  En tant que visiteur du site
  Je veux voir et naviguer dans les domaines de compétences
  Afin de découvrir les services proposés et accéder aux détails

  Scénario: Affichage des domaines de compétences sur la page d'accueil
    Étant donné que je suis sur la page d'accueil
    Quand la page se charge
    Alors je vois au moins un domaine de compétences
    Et chaque domaine affiche un titre
    Et chaque domaine affiche un contenu d'introduction
    Et chaque domaine affiche au moins une compétence avec son titre, son image et sa description

  Scénario: Navigation vers une page dédiée depuis une compétence
    Étant donné que je suis sur la page d'accueil
    Et que je vois une compétence avec un bouton "En savoir plus..."
    Quand je clique sur le bouton "En savoir plus..." de cette compétence
    Alors je suis redirigé vers la page dédiée correspondante
    Et la page dédiée affiche le contenu complet du domaine de compétences

  Scénario: Alternance visuelle des domaines de compétences
    Étant donné que je suis sur une page avec plusieurs domaines de compétences
    Quand la page se charge
    Alors le premier domaine après un titre a un fond blanc
    Et le deuxième domaine a un fond bleu clair
    Et l'alternance continue pour les domaines suivants
    Et les vidéos ont toujours un fond blanc et ne comptent pas dans l'alternance
