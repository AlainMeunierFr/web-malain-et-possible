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
- Le Domaine de compétences s'affiche avec son titre, son contenu d'introduction et ses 3 compétences
- Les données mockup sont réalistes mais factices (texte lorem ipsum, images placeholder, etc.)