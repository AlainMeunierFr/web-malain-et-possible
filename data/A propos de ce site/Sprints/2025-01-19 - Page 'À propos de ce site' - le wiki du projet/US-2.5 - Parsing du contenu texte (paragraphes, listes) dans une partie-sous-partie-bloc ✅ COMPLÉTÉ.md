# US-2.5 : Parsing du contenu texte (paragraphes, listes) dans une partie/sous-partie/bloc ✅ COMPLÉTÉ
- **En tant que** Système backend
- **Je souhaite** Extraire les paragraphes, listes à puce et listes numérotées dans le contenu
- **Afin de** Construire le JSON avec le contenu textuel structuré
- **Critères d'acceptation** :
- Chaque ligne de texte (non vide, non titre, non liste) est un paragraphe
- Chaque ligne commençant par "- " est un item de liste à puce
- Chaque ligne commençant par "1. ", "2. ", etc. est un item de liste numérotée
- Les éléments consécutifs sont regroupés (paragraphes ensemble, listes ensemble)
- Les éléments sont dans l'ordre d'apparition dans le fichier

---