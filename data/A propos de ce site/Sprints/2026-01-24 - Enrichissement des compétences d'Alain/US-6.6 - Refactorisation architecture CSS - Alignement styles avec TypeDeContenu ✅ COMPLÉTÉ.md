# US-6.6 : Refactorisation architecture CSS - Alignement styles avec TypeDeContenu ✅ COMPLÉTÉ

- **En tant que** Product Owner / Designer
- **Je souhaite** pouvoir modifier facilement le design du site en changeant un seul style
- **Afin de** maintenir une cohérence visuelle et faciliter les évolutions de design

- **Critères d'acceptation** :

- **CA1 - Architecture "feuille de style"** :
  - Création d'un fichier CSS global `app/button-styles.css` (non-module) pour tous les styles de boutons
  - Création d'un fichier CSS global `app/content-styles.css` (non-module) pour tous les styles de contenu
  - Architecture : Un style = Un nom = Un TypeDeContenu (principe fondamental)

- **CA2 - Styles de boutons unifiés** :
  - Tous les boutons utilisent la classe globale `.bouton`
  - Styles spécifiques par TypeDeContenu : `.hero .bouton`, `.domaineDeCompetence .bouton`, `.callToAction .bouton`, `.listeDesPages .bouton`, `.groupeBoutons .bouton`, `.profil .bouton`
  - Modifier `.bouton` = tous les boutons changent uniformément

- **CA3 - Styles de contenu alignés avec TypeDeContenu** :
  - Tous les composants utilisent des classes globales correspondant aux TypeDeContenu :
    - `Titre.tsx` → `className="titre"`
    - `Video.tsx` → `className="video"`
    - `TexteLarge.tsx` → `className="texteLarge"`
    - `DomaineDeCompetences.tsx` → `className="domaineDeCompetence"`
    - `CallToAction.tsx` → `className="callToAction"`
    - `GroupeBoutons.tsx` → `className="groupeBoutons"`
    - `ListeDesPages.tsx` → `className="listeDesPages"`
    - `VideoDetournement.tsx` → `className="videoDetournement"`
    - `Temoignages.tsx` → `className="temoignages"`
    - `HeroSection.tsx` → `className="hero"`
    - `ProfilContainer.tsx` → `className="profil"`

- **CA4 - Nettoyage des CSS Modules** :
  - Suppression de tous les styles déplacés vers les fichiers CSS globaux
  - Conservation uniquement des styles spécifiques non déplacés (ex: `.markdownLink`, `.videoActions`, `.droitsAuteurPopup`)
  - Commentaires ajoutés dans les CSS Modules : "Styles déplacés vers app/[button|content]-styles.css"

- **CA5 - Import global** :
  - `app/button-styles.css` importé dans `app/layout.tsx`
  - `app/content-styles.css` importé dans `app/layout.tsx`
  - Application site-wide sans dépendance aux CSS Modules pour les styles principaux

- **CA6 - Cohérence des noms** :
  - Les noms de styles correspondent exactement aux noms des TypeDeContenu
  - Plus de noms transformés `__abc123` (CSS global, non-module)
  - Architecture intuitive : modifier un style dans `content-styles.css` = tous les éléments de ce TypeDeContenu changent

- **CA7 - Uniformisation des boutons Hero** :
  - Les boutons "On discute ?" et "Découvrir" dans la zone Hero ont la même présentation
  - Utilisation de `.hero .bouton` pour le bouton principal
  - Utilisation de `.hero .profil .bouton` pour les boutons des profils (héritent de `.hero .bouton`)

**Résultat attendu :**
- Architecture CSS simplifiée et intuitive
- Modification d'un style = changement uniforme sur tout le site
- Maintenabilité améliorée : un seul fichier CSS global par type de style
- Noms de styles identiques aux TypeDeContenu pour faciliter la maintenance

---