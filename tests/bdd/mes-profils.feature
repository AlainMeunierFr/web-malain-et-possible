# language: fr
# US-7.12 : Page "Mes Profils" (sélection de profil et téléchargement CV)

Fonctionnalité: Page Mes Profils (US-7.12)
  En tant que visiteur qui a cliqué sur "Télécharger mon CV" (ou qui arrive sur "Mes Profils")
  Je souhaite voir les 4 profils avec pour chacun un titre, les intitulés de poste, un lien "Télécharger le CV" (PDF) et un lien "En savoir plus"
  Afin de choisir un profil et télécharger le CV correspondant ou aller vers le détail du profil

  Contexte: Données des 4 profils issues de hero.profils dans index.json (titre, jobTitles, route, cvPath)

  Scénario: Accès à la page Mes Profils depuis le hero
    Étant donné que je suis sur la page d'accueil avec un hero contenant un lien "Télécharger mon CV" vers la page Mes Profils
    Quand je clique sur le lien "Télécharger mon CV"
    Alors je suis redirigé vers la page "Mes Profils" (route /mes-profils)
    Et je vois le titre ou en-tête de la page "Mes Profils"

  Scénario: Page Mes Profils affiche 4 blocs profil
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" avec un tableau "profils" de 4 éléments
    Quand je suis sur la page Mes Profils
    Alors je vois 4 blocs (ou containers) de profils
    Et chaque bloc correspond à un profil (CPO, COO, Agile, CTO)

  Scénario: Chaque bloc profil affiche titre, job titles, lien CV et lien En savoir plus
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" avec un profil ayant titre "Produit logiciel", jobTitles, route "/profil/cpo", cvPath
    Quand je suis sur la page Mes Profils
    Alors je vois au moins un bloc profil avec le titre "Produit logiciel"
    Et je vois la liste des job titles associée à ce profil
    Et je vois un lien "Télécharger le CV" (ou équivalent) avec icône PDF pointant vers le PDF du profil
    Et je vois un lien ou bouton "En savoir plus…" pointant vers la page du profil (/profil/cpo)

  Scénario: Lien "En savoir plus" mène vers la page du profil
    Étant donné que je suis sur la page Mes Profils avec un bloc profil dont la route est "/profil/cpo"
    Quand je clique sur le lien "En savoir plus…" de ce bloc
    Alors je suis redirigé vers la page "/profil/cpo"

  Scénario: Lien "Télécharger le CV" déclenche le téléchargement du PDF du profil
    Étant donné que je suis sur la page Mes Profils avec un bloc profil dont le cvPath pointe vers le PDF du profil
    Quand je clique sur le lien "Télécharger le CV" de ce bloc
    Alors le fichier PDF correspondant est téléchargé (ou le lien pointe vers le cvPath du profil)

  Scénario: Contenu sous les 4 blocs – texte large optionnel
    Étant donné que la page Mes Profils est alimentée par les données hero.profils et peut afficher un contenu texteLarge (texte sous la vidéo de la home)
    Quand je suis sur la page Mes Profils
    Et que les données contiennent un élément texteLarge à afficher sous les blocs
    Alors je vois les 4 blocs profil en premier
    Et je peux voir un contenu texte (texteLarge) en dessous des 4 blocs

  Scénario: Mise en page responsive – desktop (grille ou côte à côte)
    Étant donné que je suis sur la page Mes Profils avec 4 blocs profil
    Quand je visualise la page sur un écran desktop (largeur ≥ 769px)
    Alors les blocs profil sont affichés en grille ou côte à côte selon la largeur
    Et la mise en page est lisible et adaptée

  Scénario: Mise en page responsive – mobile (blocs empilés)
    Étant donné que je suis sur la page Mes Profils avec 4 blocs profil
    Quand je visualise la page sur un écran mobile (largeur ≤ 768px)
    Alors les blocs profil sont empilés verticalement (ou en mise en page adaptée)
    Et chaque bloc reste lisible et accessible

  Scénario: CTA "Discutons" sur la page Mes Profils
    Étant donné que la page Mes Profils peut afficher un rappel du lien "Discutons" vers la page contact
    Quand je suis sur la page Mes Profils
    Alors je peux voir un lien "Discutons" pointant vers "/faisons-connaissance"
    Et ce lien permet de contacter avant de télécharger un CV
