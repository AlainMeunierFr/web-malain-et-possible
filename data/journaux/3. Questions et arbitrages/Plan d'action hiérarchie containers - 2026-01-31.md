# Plan d'action : hiérarchie des containers (rendu page)

Objectif : contrôler la hiérarchie des containers (parent / enfant) pour un système de rendu unifié (mode lecture + rendu final).

---

## A. Container général

- Un container principal doit contenir le rendu de **tous** les TypeDeContenu (corps de page).
- Rôle : responsive (largeur, hauteur, marges gauche/droite, centrage).
- Nom proposé : **contenuDeLaPage**.
- **titreDePage.texte** est **hors** de ce container (titre dans le header).

---

## B. titreDePage.texte

- Affecter **header** comme container de titreDePage.texte.

---

## C. Hero et vidéo

- La **vidéo** doit être une **propriété du Hero**.
- Refactor complète : JSON → types / readers → CANONICAL_SPEC_ORDER → composants → CSS.

---

## D. Profil (rendu final)

- **listeDeProfils.container** = container de **colonnes**.
- **profil.container** = colonne N (une colonne par profil).
- Une **ligne par propriété** dans chaque profil.

---

## E. Témoignage (rendu final)

- **temoignage.container** = container de **lignes**.
- **Ligne 1** : **temoignage.container.temoins** = container de colonnes  
  - **Colonne 1** = Photo  
  - **Colonne 2** = **temoignage.container.texte** (lignes : nom, fonction)
- **Ligne 2** : **temoignage.container.temoignage** (texte du témoignage).

---

## F. domaineDeCompetence et competence (rendu final)

- **domaineDeCompetence.container** = container de **colonnes**.
- **competence.container** = colonne N (une colonne par compétence).
- Une **ligne par propriété** dans chaque compétence.

---

## G. Portfolio des détournements (mode lecture + containers)

### G.1 Mode lecture : afficher le portfolio

- **Fait** : normalisation dans `readPageData` (indexReader.ts) pour que `portfolio-detournements.json` soit lu avec la structure `listeDeDetournementsVideo` + `items` (detournementVideo). Le mode lecture affiche désormais le portfolio quand la page est chargée.

### G.2 Organisation en containers pour detournementVideo (à implémenter)

Pour chaque item **detournementVideo** (mode lecture et rendu final) :

- **detournementVideo.container** (en lignes)
  - **Ligne 1** : **detournementVideo.container.titre**  
    - detournementVideo.titre  
    - detournementVideo.pitch  
    - detournementVideo.date  
  - **Ligne 2** : **detournementVideo.container.video** (2 colonnes)
    - **Colonne 1** : **detournementVideo.container.videoDetournee**  
      - detournementVideo.titreVideoDetournee  
      - detournementVideo.videoDetournee  
      - detournementVideo.droitsAuteur  
      - detournementVideo.linkedin  
    - **Colonne 2** : **detournementVideo.container.videoOriginale**  
      - detournementVideo.titreVideoOriginale  
      - detournementVideo.videoOriginale  

À appliquer au rendu final (VideoDetournement) et au mode lecture (structure des lignes/colonnes).
