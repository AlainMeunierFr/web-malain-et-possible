# language: fr

Fonctionnalité: Page Charte graphique accessible via « À propos du site »
  En tant que développeur ou mainteneur du site
  Je souhaite que la page Charte graphique soit accessible via le menu « À propos du site » avec son style vitrine intact
  Afin de disposer d'une référence visuelle pour tester le rendu des styles du site vitrine

  Contexte:
    Étant donné que le fichier data/A propos de ce site/menu.json existe
    Et que menu.json contient une entrée pour la Charte graphique avec type "container" et parametre "charte"

  # --- CA3 : Accessibilité via le menu ---

  Scénario: La page Charte est accessible via le menu « À propos du site »
    Étant donné que je suis sur la page "À propos du site" à l'URL /a-propos-du-site
    Quand la page se charge
    Alors je vois la ligne de menu "Charte graphique" dans la bande horizontale

  Scénario: Clic sur « Charte graphique » affiche la page Charte
    Étant donné que je suis sur la page "À propos du site"
    Quand je clique sur la ligne de menu "Charte graphique"
    Alors le contenu de la page Charte s'affiche dans la zone sous la bande
    Et l'URL devient /a-propos-du-site/charte

  Scénario: Accès direct à la page Charte via l'URL
    Quand j'accède directement à l'URL /a-propos-du-site/charte
    Alors la page Charte graphique s'affiche
    Et je vois le titre "Charte graphique"

  # --- CA4 & CA5 : Rendu CSS identique au site vitrine ---

  Scénario: La page Charte utilise exclusivement les styles du site vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors la page n'applique aucun style spécifique à la section "À propos du site"
    Et la page utilise les styles globaux du site vitrine (content-styles.css, globals.css)

  # --- Types hiérarchiques (Section 1) ---

  Scénario: Les types hiérarchiques s'affichent avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois la section "1. Types hiérarchiques"
    Et je vois des exemples de h1, h2, h3, h4, p, auteur, lien, bouton et note
    Et chaque type utilise la taille CSS correspondante (--enorme, --grande, --normale, --petite)

  # --- Types de contenu (Section 3) ---

  Scénario: Le composant Hero s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple de composant Hero
    Et le Hero utilise le layout "2 columns" avec les classes .heroGauche et .heroDroite
    Et le Hero contient un titre, un sous-titre, une description et des CTAs

  Scénario: Le composant Liste de Profils s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple de liste de profils
    Et la liste utilise le layout "4 columns x 1 row"
    Et chaque profil contient un titre, des jobTitles, des actions et un lien CV

  Scénario: Le composant Titre (bande bleue) s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple de composant Titre
    Et le titre utilise le type hiérarchique --h2

  Scénario: Le composant Liste de Témoignages s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple de liste de témoignages
    Et les témoignages utilisent le layout "2 columns x N rows"
    Et chaque témoignage contient une photo, un nom, une fonction et un texte

  Scénario: Le composant Domaine de Compétences s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple de domaine de compétences
    Et le domaine contient un domaineHeader avec titre, contenu et auteur
    Et les compétences utilisent le layout "3 columns x 1 row"
    Et chaque compétence suit l'ordre : titre → image → description → auteur → lien

  Scénario: Le composant TexteLarge s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple de composant TexteLarge
    Et le texte contient des paragraphes avec du markdown parsé (gras, italique)

  Scénario: Le composant Détournement Vidéo s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple de détournement vidéo
    Et le détournement contient un titre, un pitch et deux vidéos côte à côte

  Scénario: Le composant Groupe de Boutons s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple de groupe de boutons
    Et le groupe utilise le layout "1 column, centered"
    Et les boutons sont empilés verticalement et centrés

  Scénario: Le composant Call to Action s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple de Call to Action
    Et le CTA a l'aspect d'un bouton avec le style vitrine

  Scénario: Le composant Expérience et Apprentissage s'affiche avec le rendu vitrine
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois un exemple d'expérience et apprentissage
    Et l'expérience contient une catégorie, une description et une période

  # --- Tokens CSS (Section 4) ---

  Scénario: Les tokens CSS du site vitrine sont visibles
    Étant donné que je suis sur la page Charte à l'URL /a-propos-du-site/charte
    Quand la page se charge
    Alors je vois une section "4. Tokens CSS (variables)"
    Et les couleurs --CouleurFoncé, --CouleurClaire, --Noir et --Blanc sont affichées
    Et les tailles --enorme, --grande, --moyenne, --normale et --petite sont affichées
