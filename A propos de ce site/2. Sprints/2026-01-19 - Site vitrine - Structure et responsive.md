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
- **Nouveau Type "Tête large"** :
  - Data : un texte
  - CSS : un texte qui se comporte comme le titre d'un domaine de compétence (947 de largeur max) mais qui n'a pas "3 compétences"