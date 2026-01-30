# US-2.4 : Détection des blocs "Prompt" et "Résultat technique" ✅ COMPLÉTÉ
- **En tant que** Système backend
- **Je souhaite** Identifier les blocs avec les titres "##### Prompt" et "##### Résultat technique" et leur contenu
- **Afin de** Leur attribuer un typeDeContenu spécial pour le style CSS
- **Critères d'acceptation** :
- Un bloc avec le titre exact "##### Prompt" a `typeDeContenu: "Prompt"`
- Un bloc avec le titre exact "##### Résultat technique" a `typeDeContenu: "Résultat technique"`
- Le contenu (texte, paragraphes, listes) d'un bloc "Prompt" a aussi `typeDeContenu: "Prompt"` pour l'affichage en bleu clair
- Les autres blocs n'ont pas de typeDeContenu

---