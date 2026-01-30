# language: fr
# US-7.11 : Home Hero – Mise en page premier écran (vidéo à droite, texte et CTAs à gauche)

Fonctionnalité: Home Hero – Premier écran (US-7.11)
  En tant que visiteur sur la home
  Je souhaite voir en un coup d'œil ton nom, ta disponibilité, un résumé de profil, les deux actions (CV et contact) et la vidéo
  Afin de comprendre le message et les CTAs sans scroll

  Contexte: Données hero et vidéo issues de index.json (contenu existant)
  Contexte: Cas nominal desktop = 769px ≤ largeur ≤ 3000px ; très grand écran = largeur ≥ 3000px (contrainte front-end)

  Scénario: Mise en page desktop – zone gauche affiche nom, sous-titre, résumé et CTAs (cas nominal 769–3000px)
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" avec un titre "Alain Meunier"
    Et que cet élément a un sousTitre de type "Disponible pour…"
    Et que cet élément a une description (résumé de profil)
    Et que cet élément a un lien "Télécharger mon CV" pointant vers la page Mes Profils
    Et que cet élément a un lien contact avec le libellé "Discutons" pointant vers "/faisons-connaissance"
    Quand je charge la page d'accueil
    Et que je visualise la page sur un écran desktop nominal (769px ≤ largeur ≤ 3000px)
    Alors je vois la section hero en haut de la page
    Et je vois le nom "Alain Meunier" dans la zone gauche du hero
    Et je vois un sous-titre de type "Disponible pour…" dans la zone gauche du hero
    Et je vois le résumé de profil dans la zone gauche du hero
    Et je vois le lien "Télécharger mon CV" avec icône PDF dans la zone gauche du hero
    Et je vois le lien "Discutons" dans la zone gauche du hero

  Scénario: Mise en page desktop – zone droite affiche la vidéo (cas nominal 769–3000px)
    Étant donné que le fichier "data/index.json" contient un élément de type "hero"
    Et que le fichier "data/index.json" contient un élément de type "video" (vidéo de présentation)
    Quand je charge la page d'accueil
    Et que je visualise la page sur un écran desktop nominal (769px ≤ largeur ≤ 3000px)
    Alors je vois la section hero en haut de la page
    Et je vois la vidéo de présentation dans la zone droite du hero

  Scénario: CTA "Télécharger mon CV" mène vers la page Mes Profils
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" avec un lien "Télécharger mon CV" vers la page Mes Profils
    Quand je suis sur la page d'accueil
    Et que je clique sur le lien "Télécharger mon CV"
    Alors je suis redirigé vers la page "Mes Profils" (ou la route correspondante)

  Scénario: CTA "Discutons" mène vers la page contact
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" avec un lien contact "Discutons" vers "/faisons-connaissance"
    Quand je suis sur la page d'accueil
    Et que je clique sur le lien "Discutons"
    Alors je suis redirigé vers la page "/faisons-connaissance"

  Scénario: Premier écran – aucun contenu sous le bloc hero
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" en premier
    Et que le fichier "data/index.json" contient éventuellement un élément de type "video" et "texteLarge" après
    Quand je charge la page d'accueil
    Alors le premier écran (viewport) affiche uniquement le bloc hero (zone gauche + zone droite)
    Et je ne vois pas de contenu sous le hero sans faire défiler (pas de texte large ni autre bloc visible dans le viewport initial)

  Scénario: Hero tient dans le viewport – essentiel visible sans scroll
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" et un élément de type "video"
    Quand je charge la page d'accueil
    Alors l'essentiel du bloc hero (nom, CTAs, vidéo) est visible dans le viewport sans scroll obligatoire

  Scénario: Hero sur très grand écran (largeur ≥ 3000px) – mise en page préservée
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" et un élément de type "video"
    Quand je charge la page d'accueil
    Et que je visualise la page sur un très grand écran (largeur ≥ 3000px)
    Alors je vois la section hero en haut de la page
    Et je vois la zone gauche du hero (nom, résumé, CTAs)
    Et je vois la zone droite du hero (vidéo)
    Et l'essentiel du bloc hero est visible dans le viewport sans scroll obligatoire
    Et la mise en page reste lisible et ne se dégrade pas (pas de débordement ni contenu illisible)

  Scénario: Responsive – contenu hero présent sur mobile avec mise en page adaptée
    Étant donné que le fichier "data/index.json" contient un élément de type "hero" et un élément de type "video"
    Quand je charge la page d'accueil
    Et que je visualise la page sur un écran mobile (largeur ≤ 768px)
    Alors je vois le nom "Alain Meunier"
    Et je vois le lien "Télécharger mon CV"
    Et je vois le lien "Discutons"
    Et je vois la vidéo de présentation
    Et le contenu est affiché avec un ordre ou une mise en page adaptés (ex. texte puis vidéo, ou blocs empilés)

  Scénario: Pas de texte large sous la vidéo sur la home
    Étant donné que le fichier "data/index.json" contient un élément de type "hero", puis un élément de type "video", puis un élément de type "texteLarge"
    Quand je charge la page d'accueil
    Alors le texte large (texteLarge) n'est pas affiché sur la page d'accueil
    Et seul le bloc hero et la vidéo (intégrés au hero ou immédiatement après) sont visibles sur le premier écran
