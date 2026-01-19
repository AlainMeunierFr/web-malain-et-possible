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