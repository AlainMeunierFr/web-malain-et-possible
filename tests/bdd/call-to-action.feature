# Language: fr
# Feature: Call to Action et page "Faisons connaissance"

Feature: Accès à la page de contact via un Call to Action
  En tant que visiteur du site
  Je veux voir un bouton "Faisons connaissance..." en bas de toutes les pages
  Afin d'accéder facilement à la page de contact

  Background:
    Étant donné que je suis sur une page du site vitrine
    Et que le fichier JSON de la page contient un élément "callToAction" à la fin du contenu

  Scenario: Affichage du bouton Call to Action
    Étant donné que le JSON contient un élément de type "callToAction" avec action "Faisons connaissance..."
    Quand la page est chargée
    Alors je vois un bouton avec le texte "Faisons connaissance..."
    Et le bouton a le même style que "En savoir plus..." (bordure bleue, police Clint Marker)
    Et la largeur maximale du bouton est de 947px
    Et le bouton est centré dans son conteneur

  Scenario: Navigation vers la page "Faisons connaissance"
    Étant donné que je suis sur une page affichant le bouton "Faisons connaissance..."
    Quand je clique sur le bouton "Faisons connaissance..."
    Alors je suis redirigé vers la page "/faisons-connaissance"
    Et la navigation est optimisée (utilisation de Next.js Link)

  Scenario: Call to Action présent sur toutes les pages
    Étant donné que je consulte la page d'accueil
    Alors je vois le bouton "Faisons connaissance..." en bas de page
    Étant donné que je consulte la page "Conduite du changement"
    Alors je vois le bouton "Faisons connaissance..." en bas de page
    Étant donné que je consulte la page "Détournement vidéo"
    Alors je vois le bouton "Faisons connaissance..." en bas de page
    Étant donné que je consulte la page "Robustesse"
    Alors je vois le bouton "Faisons connaissance..." en bas de page

  Scenario: Effet hover sur le bouton Call to Action
    Étant donné que je suis sur une page affichant le bouton "Faisons connaissance..."
    Quand je passe la souris sur le bouton
    Alors le fond du bouton devient bleu
    Et le texte devient blanc
    Et la transition est fluide (200ms)

  Scenario: Responsive du bouton Call to Action
    Étant donné que je suis sur un smartphone
    Quand la page est chargée
    Alors le bouton "Faisons connaissance..." prend toute la largeur disponible (max 947px)
    Étant donné que je suis sur un écran desktop
    Quand la page est chargée
    Alors le bouton "Faisons connaissance..." est centré avec une largeur maximale de 947px

  Scenario: Page "Faisons connaissance" accessible
    Étant donné que je suis sur une page du site
    Quand je clique sur le bouton "Faisons connaissance..."
    Alors la page "/faisons-connaissance" se charge
    Et la page affiche le contenu de contact
    Et la page utilise la même structure que les autres pages (Header/Footer partagés)
