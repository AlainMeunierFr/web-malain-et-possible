# US-3.5 : Page "Faisons connaissance" - Affichage et comportement des boutons de contact ✅ COMPLÉTÉ
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