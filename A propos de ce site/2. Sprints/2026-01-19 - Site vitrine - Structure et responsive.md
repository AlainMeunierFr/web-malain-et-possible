### Sprint Goal
Développer la structure hiérarchique et le responsive du site vitrine (carte de visite) en reprenant le contenu d'une version existante développée sous Bubble.

#### US-3.1 : Affichage d'un Domaine de compétences mockup sur la page d'accueil
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher sur la page d'accueil un "Domaine de compétences" avec ses 3 compétences (données mockup)
- **Afin de** Valider la structure et la mise en page d'un Domaine de compétences avant de développer les autres types de contenu
- **Critères d'acceptation** :
- Un fichier JSON `data/index.json` contient un objet "Domaine de compétences" mockup avec ses propriétés (titre, contenu, items)
- Chaque compétence contient ses propriétés (titre, image, description, bouton optionnel)
- Le JSON est chargé depuis le backend pur et affiché sur la page d'accueil via un composant React
- **CSS responsive** :
  - Un bloc conteneur principal qui régule la largeur selon les contraintes responsive : écran trop large = contrainte la largeur / écran pas assez large = écriture en plus petit
  - Premier sous-bloc horizontal qui prend toute la largeur pour le "Domaine de compétences" :
    - Ligne 1 : le titre en gras
    - Ligne 2 : le texte en normal
  - Second bloc qui contient 3 sous-blocs pour chacune des compétences :
    - Ligne 1 : le titre
    - Ligne 2 : l'image
    - Ligne 3 : le texte (contenant éventuellement du gras sur certains mots)
- Les données mockup sont réalistes mais factices (texte lorem ipsum, images placeholder, etc.)

#### US-3.2 : Navigation depuis les boutons "En savoir plus..." vers des pages dédiées
- **En tant que** Visiteur du site
- **Je souhaite** Pouvoir cliquer sur un bouton "En savoir plus..." d'une compétence pour accéder à une page dédiée contenant plus d'informations
- **Afin de** Découvrir en détail les domaines de compétences qui m'intéressent
- **Critères d'acceptation** :
- Les boutons "En savoir plus..." sont cliquables et affichent un style de lien/bouton cohérent
- Le clic sur un bouton "En savoir plus..." redirige vers une page dédiée correspondante
- Les pages dédiées affichent le contenu complet du domaine de compétences depuis un fichier JSON spécifique
- La navigation fonctionne pour au moins 3 domaines : "Stratégie" → page Robustesse, "Conduite du changement" → page Conduite du changement, "Détournement vidéo" → page Détournement vidéo
- Les pages dédiées utilisent la même structure et le même composant que la page d'accueil pour l'affichage

#### US-3.3 : Enrichissement des pages avec de nouveaux types de contenu
- **En tant que** Visiteur du site
- **Je souhaite** Voir différents types de contenu sur les pages (titres, vidéos, textes d'introduction) en plus des domaines de compétences
- **Afin de** Avoir une expérience de navigation plus riche et variée avec différents formats de présentation
- **Critères d'acceptation** :
- Le JSON n'est plus une liste de "domaine de compétence". Le JSON devient "contenu de page", lequel contient, pour compatibilité ascendante, la liste actuelle de "Domaine de compétence". Mais ce JSON va pouvoir contenir d'autres types que nous allons définir ensuite.
- **Nouveau Type "Titre"** :
  - Data : un texte
  - CSS : une bande bleue foncée qui fait toute la largeur de la page contenant le texte en h1
- **Nouveau type "Vidéo"** :
  - Data : URL YouTube / Lancement automatique = Oui/Non
  - CSS : incrustation de vidéo YouTube
- **Nouveau Type "Texte large"** :
  - Data : un texte
  - CSS : un texte qui se comporte comme le titre d'un domaine de compétence (947 de largeur max) mais qui n'a pas "3 compétences"

#### US-3.4 : Contact - Call to Action et page "Faisons connaissance"
- **En tant que** Visiteur du site
- **Je souhaite** Pouvoir accéder à une page "Faisons connaissance" depuis un bouton d'action visible en bas de toutes les pages
- **Afin de** Entrer en contact avec Alain et découvrir comment collaborer
- **Critères d'acceptation** :
- **Type de contenu "callToAction"** :
  - Un nouveau type de contenu "callToAction" est défini dans `TypeElementContenu` avec une interface `ElementCallToAction` contenant un champ "action" (string) pour le texte du bouton
  - Ce type est ajouté à l'union type `ElementContenu` dans `utils/indexReader.ts`
  - Le composant `PageContentRenderer` gère le rendu de ce nouveau type de contenu
- **Ajout dans les JSON** :
  - Un élément `callToAction` avec `action: "Faisons connaissance..."` est ajouté à la fin du tableau `contenu` de tous les fichiers JSON de pages (`index.json`, `Conduite du changement.json`, `Détournement vidéo.json`, `Robustesse.json`)
- **Rendu CSS du bouton** :
  - Le bouton a le même style que "En savoir plus..." : bordure bleue (`rgba(0, 112, 192, 1)`), police 'Clint Marker', fond transparent, effet hover (fond bleu, texte blanc)
  - La largeur maximale du bouton est de 947px (identique à un "Domaine de compétence")
  - Le bouton est centré dans son conteneur
  - Le design est responsive (mobile-first)
- **Comportement du bouton** :
  - Un clic sur le bouton "Faisons connaissance..." redirige vers la page "/faisons-connaissance"
  - La navigation utilise Next.js Link pour une navigation optimisée
- **Page "Faisons connaissance"** :
  - La page "/faisons-connaissance" affiche le contenu de contact
  - Le contenu est basé sur le fichier HTML d'exemple "Malain et possible - Faisons connaissance.html"
  - La page est responsive et utilise la même structure que les autres pages du site (Header/Footer partagés)

#### US-3.5 : Page "Faisons connaissance" - Affichage et comportement des boutons de contact
- **En tant que** Visiteur du site
- **Je souhaite** Voir une page "Faisons connaissance" avec des boutons de contact clairs et accessibles organisés en groupes
- **Afin de** Facilement entrer en contact avec Alain selon différents modes (déjeuner, visio, téléphone, email, réseaux sociaux)

- **Critères d'acceptation** :

- **Titre de la page** :
  - La page affiche un titre "Faisons connaissance"

- **Nouveau type de contenu "Groupe de boutons"** :
  - Un nouveau type de contenu "groupeBoutons" est défini dans `TypeElementContenu` avec une interface `ElementGroupeBoutons`
  - Un groupe de boutons contient :
    - `taille` : "petite" ou "grande"
    - `boutons` : tableau de boutons
  - Chaque bouton contient : `icone` (string), `texte` (string optionnel), `url` (string), `command` (string optionnel)
  - Le type est ajouté à l'union type `ElementContenu` dans `utils/indexReader.ts`
  - Le composant `PageContentRenderer` gère le rendu de ce nouveau type de contenu

- **Groupe de boutons "grands" (verticaux)** :
  - Un groupe de boutons de taille "grande" s'affiche verticalement
  - Chaque bouton large affiche une icône et un titre
  - Les boutons sont empilés verticalement (flex-direction: column)
  - 3 boutons dans ce groupe :
    1. Icône "UtensilsCrossed" (couverts) + texte "Déjeuner aux alentours de Lyon" + URL "http://localhost:3000/about-site"
    2. Icône "Video" (visioconférence) + texte "30mn de visio" + URL "http://localhost:3000/about-site"
    3. Icône "Phone" (téléphone) + texte "+33 6.21.03.12.65" + URL "tel:+33621031265"
  - Sur smartphone, le bouton téléphone déclenche un appel (`tel:`)

- **Groupe de boutons "petits" (horizontaux)** :
  - Un groupe de boutons de taille "petite" s'affiche horizontalement
  - Les boutons sont sans texte, icône uniquement (comme le footer)
  - Les boutons sont alignés horizontalement (flex-direction: row)
  - 3 boutons dans ce groupe :
    1. Icône "Mail" + URL "mailto:alain@maep.fr"
    2. Icône "Youtube" + URL "https://www.youtube.com/@m-alain-et-possible"
    3. Icône "Linkedin" + URL "https://www.linkedin.com/in/alain-meunier-maep/"

- **Couleur du texte inversée** :
  - Les boutons du footer sont blancs sur fond BleuFonce
  - Les boutons de la page "Faisons connaissance" sont BleuFonce sur fond blanc (ou fond clair)
  - La couleur du texte est donc inversée par rapport au footer

- **Architecture des données** :
  - Un fichier JSON `data/faisons-connaissance.json` définit le contenu de la page
  - Structure : tableau `contenu` contenant des éléments de type "titre" et "groupeBoutons"
  - La page utilise `readPageData` pour charger le JSON
  - Réutilisation de la logique des boutons du footer (ButtonGroup, ButtonItem) avec paramètre de taille
  - Factorisation des composants de boutons pour éviter la duplication

- **Composants réutilisables** :
  - Factorisation avec le footer : réutilisation de la logique de boutons (icône, URL, command)
  - Adaptation du rendu selon la taille du groupe (petite = horizontal sans texte, grande = vertical avec icône et texte)
  - Adaptation de la couleur selon le contexte (footer = blanc sur bleu, page = bleu sur blanc)

#### US-3.6 : Amélioration de l'affichage des "Critères d'acceptation" dans le wiki
- **En tant que** Lecteur du wiki du site
- **Je souhaite** Voir les "Critères d'acceptation" des User Stories structurés hiérarchiquement avec des thèmes de critères en gras et des critères normaux
- **Afin de** Mieux comprendre l'organisation et la hiérarchie des critères d'acceptation

- **Critères d'acceptation** :

- **Détection du format dans le parseur** :
  - Le parseur Markdown détecte les éléments de type "Critères d'acceptation" dans les User Stories
  - Une section "Critères d'acceptation" commence par la ligne `- **Critères d'acceptation** :` (avec `typeDeContenu: "Critères d'acceptation"`)
  - Cette section se termine soit :
    - À la prochaine User Story (ligne commençant par `#### US-`)
    - À un séparateur `---`
    - À la fin de la sous-partie (H4)
  - Dans cette section "Critères d'acceptation" :
    - Si une ligne commence par `- **` : c'est un "Thème de critère" (puce de niveau 1, texte en gras)
    - Sinon (ligne commence par `- ` sans `**` au début) : c'est un "Critère" (puce de niveau 2, texte normal, indenté sous le thème précédent)
  - Les critères sont imbriqués sous leur thème de critère correspondant (le dernier thème rencontré)

- **Structure de données** :
  - Les éléments de type "Critères d'acceptation" sont enrichis avec une structure hiérarchique
  - Les thèmes de critères et les critères sont distingués et structurés dans le JSON généré

- **Affichage CSS dans le wiki** :
  - Les thèmes de critères (niveau 1) : puce de niveau 1, texte en gras (style `**texte**` rendu en `<strong>`)
  - Les critères (niveau 2) : puce de niveau 2 (indentée), texte normal
  - Hiérarchie visuelle claire entre thèmes et critères (indentation)

- **Comportement implicite de l'IA** :
  - Lorsque j'écris une User Story dans le wiki, je respecte cette structure dans la section "Critères d'acceptation" :
    - `- **Thème de critère**` pour les thèmes (ex: `- **CSS responsive** :`)
    - `- Critère normal` (sans `**` au début) pour les critères sous ce thème
  - La règle est ajoutée dans la DOD "Comportement implicite de l'IA" (section sur l'écriture des User Stories)