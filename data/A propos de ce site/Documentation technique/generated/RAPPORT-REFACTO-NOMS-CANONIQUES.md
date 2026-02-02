# Rapport : refactorisation noms canoniques (TypeDeContenu.propriété)

## Objectif

Faire en sorte que le code qui génère le HTML attribue des **noms canoniques** (TypeDeContenu.propriété) aux sélecteurs CSS, afin que l’export TXT (`styles-texte.txt`) affiche ces noms dans la colonne « Nom du style » et prouve l’alignement avec la règle de nommage.

## Convention : notation point (deux classes)

Chaque propriété métier est exprimée par **deux classes** sur l'élément : `typeDeContenu` et `propriété`. Le sélecteur CSS est donc **`.typeDeContenu.propriété`** (élément qui a les deux classes), ce qui aligne le « Nom du style » avec la notation littérale TypeDeContenu.propriété (avec un point, pas un tiret).

## Règle complémentaire : préfixe `ui-`

Tout élément qui **ne correspond pas** à un TypeDeContenu défini dans le JSON (structure, layout, wrapper, image pure, etc.) est identifié par le préfixe **`ui-`** dans ses classes CSS. Cela permet de distinguer le contenu métier paramétrable du reste et d'identifier les candidats à une future paramétrisation JSON.

## Stratégie : wrapper et carte (zone cliquable)

À respecter pour tous les types de contenu qui ont un bloc conteneur + une carte (ou zone) cliquable :

- **Wrapper / conteneur (div)** = layout, responsive, délimitation du bloc → **`.typeDeContenu`** (ex. `.profil`). C’est l’élément qui porte le nom du TypeDeContenu.
- **Carte / zone cliquable (Link ou zone UX)** = choix UX (lien sur toute la carte) → **`.typeDeContenu.ui-card`** (ex. `.profil.ui-card`), **pas** `.typeDeContenu .ui-card` (sélecteur descendant). L’élément carte a donc les deux classes : `typeDeContenu` et `ui-card`, ce qui donne le sélecteur `.typeDeContenu.ui-card`.

En CSS : pour cibler uniquement le wrapper quand le même type a aussi un enfant `.ui-card`, utiliser **`.typeDeContenu:not(.ui-card)`** pour les styles de bloc (flex, padding, bordure, etc.).

## Réalisé

### 1. Export TXT

- **Script** `scripts/extract-text-styles.ts` remis en **format tabulé** d’origine.
- Une ligne par règle CSS (avec font/color), colonnes : Chemin CSS, **Nom du style** (= sélecteur brut), TypeDeContenu, Composant, Niveau de titre, Type standard HTML, Police, Taille, Gras, Italique, Couleur.
- Aucune transformation du sélecteur : « Nom du style » = sélecteur tel qu’écrit dans le CSS.

### 2. Domaine de compétences (domaineDeCompetence + competence)

**Composant** `components/DomaineDeCompetences.tsx`  
- Deux classes par propriété : `domaineDeCompetence titre`, `domaineDeCompetence contenu`, `domaineDeCompetence auteur`, `competence titre`, `competence description`, `competence auteur`, `competence image`, `competence icon`, `competence bouton`.

**CSS** `app/content-styles.css`  
- Sélecteurs en notation point : `.domaineDeCompetence.titre`, `.domaineDeCompetence.contenu`, `.domaineDeCompetence.auteur`, `.competence.titre`, `.competence.description`, `.competence.auteur`, `.competence.image`, `.competence.icon`.
- Surcharge variante .light : `.domaineDeCompetence.light .domaineDeCompetence.titre`.
- Media queries et règles markdown (`.competence.description strong`, etc.) alignées.

### 3. Témoignages (temoignage singulier + ui-)

**Composant** `components/Temoignages.tsx`  
- Conteneur section : `temoignages`. Carte (item) : `temoignage ui-card`.
- Propriétés : `temoignage nom`, `temoignage fonction`, `temoignage photo`, `temoignage temoignage` (bloc texte).
- Préfixe ui- pour structure : `ui-grid`, `ui-header`, `ui-photo`, `ui-photoImage`, `ui-info`, `ui-paragraph`.

**CSS** `app/content-styles.css`  
- Sélecteurs canoniques : `.temoignage.nom`, `.temoignage.fonction`, `.temoignage.photo`, `.temoignage.temoignage` ; carte `.temoignages .temoignage.ui-card` ; media queries alignées.

### 4. Profil (profil + ui-)

**Composant** `components/ProfilContainer.tsx`  
- Wrapper (div) : `profil`. Carte cliquable (Link) : `profil route ui-card` → sélecteur `.profil.ui-card`.
- Propriétés : `profil titre`, `profil jobTitles`, `profil jobTitle`, `profil route`, `profil cvPath`.

**CSS** `app/content-styles.css`  
- Wrapper : `.profil:not(.ui-card)` pour le bloc (layout, responsive). Carte : `.profil.ui-card` (pas descendant).
- Sélecteurs canoniques : `.profil.titre`, `.profil.jobTitles`, `.profil.jobTitle`, `.profil.route`, `.profil.cvPath` ; media queries et `.blocsProfils .profil` alignés.

### 5. Détournement vidéo (detournementVideo + ui-)

**Composant** `components/VideoDetournement.tsx`  
- Deux classes : `detournementVideo titreVideoDetournee`, `detournementVideo titreVideoOriginale`, `detournementVideo pourLeCompteDe`, `detournementVideo pitch`.
- Préfixe ui- pour structure : `ui-card`, `ui-videosContainer`, `ui-videoSection`, etc.

**CSS** `app/content-styles.css`  
- Sélecteurs en notation point : `.detournementVideo.titreVideoDetournee`, `.detournementVideo.titreVideoOriginale`, `.detournementVideo.pourLeCompteDe`, `.detournementVideo.pitch`, et blocs ui- ; media queries alignées.

### 6. Vérifications

- Tests unitaires `DomaineDeCompetences.test.tsx` : **8/8 passent**.
- Tests unitaires `Temoignages.test.tsx` : racine `temoignages` inchangée.
- Export TXT régénéré : la colonne « Nom du style » contient bien les sélecteurs canoniques (domaineDeCompetence, competence, temoignages, etc.).

## Effet de bord sur la présentation

**Aucun.** Refactorisation uniquement : les anciennes classes ont été remplacées par les classes canoniques et le CSS cible ces nouvelles classes. Le rendu visuel reste identique.

### 7. Phase 1 complète (titre, groupeDeBoutons, profil wrapper/carte, DomaineDeCompetences, VideoDetournement)

**Profil**  
- CSS : wrapper `.profil:not(.ui-card)`, carte `.profil.ui-card` (stratégie wrapper/carte).

**Titre** (`components/Titre.tsx`)  
- Deux classes : `titre texte` → sélecteur `.titre.texte` (remplace `.titre-texte`).

**GroupeBoutons** (`components/GroupeBoutons.tsx`)  
- Propriété : `groupeDeBoutons texte` → sélecteur `.groupeDeBoutons.texte` (remplace `.groupeDeBoutons-texte`).

**VideoDetournement**  
- `detournementVideo-pourLeCompteDe` → `detournementVideo pourLeCompteDe` (sélecteur `.detournementVideo.pourLeCompteDe`).

**DomaineDeCompetences**  
- `competence-description` → `competence description` ; `competence-auteur` → `competence auteur`.
- Media queries : `.domaineDeCompetence-titre` → `.domaineDeCompetence.titre`, `.competence-titre` → `.competence.titre`.
- Expériences : `experiencesTitre` → `experienceEtApprentissage titre`, etc. ; sélecteurs `.experienceEtApprentissage.titre`, `.experienceEtApprentissage.periode`, `.experienceEtApprentissage.description`.
- **competence.image / competence.icon** : wrapper image/icône avec classes `competence image` ou `competence icon` ; sélecteurs `.competence.image`, `.competence.icon` (remplace `.domaineDeCompetence .competenceImage`).

### 8. Alignement liste canonique (titreDePage, temoignage, TU Header)

**titreDePage.texte**  
- Header : `className="titreDePage texte"` (au lieu de `titreDePage titreDePage`) ; CSS `.titreDePage.texte`.

**temoignage (singulier)**  
- Chaque carte : `temoignage ui-card` ; propriétés `temoignage nom`, `temoignage fonction`, `temoignage photo`, `temoignage temoignage`. CSS : `.temoignage.nom`, `.temoignage.fonction`, `.temoignage.photo`, `.temoignage.temoignage` ; carte `.temoignages .temoignage.ui-card`.

**TU Header**  
- Tests qui lisaient `Header.module.css` : lecture désormais dans `app/content-styles.css` avec sélecteur `header.header` (alignement avec styles globalisés).

## À faire (hors périmètre Phase 1)

Étendre la même règle aux TypeDeContenu restants si besoin :

- hero, titreDePage, callToAction, texteLarge : déjà alignés (Phase 1 précédente ou rapport).
- Autres composants : deux classes par propriété et sélecteurs `.typeDeContenu.propriété` ; préfixe `ui-` pour la structure ; stratégie wrapper/carte (`.typeDeContenu` + `.typeDeContenu.ui-card`) pour les cartes cliquables.
