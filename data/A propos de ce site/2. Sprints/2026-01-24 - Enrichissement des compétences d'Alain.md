# Sprint Goal
Enrichir le site avec une page dédiée présentant les compétences techniques d'Alain en ingénierie logiciel, permettant aux visiteurs de découvrir ses domaines d'expertise en développement, pratiques d'équipe et architectures.

---


## US-6.6 : Refactorisation architecture CSS - Alignement styles avec TypeDeContenu ✅ COMPLÉTÉ

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

## US-6.7 : Unification de l'architecture des images

- **En tant que** développeur/mainteneur du site
- **Je souhaite** avoir une architecture unifiée pour toutes les images
- **Afin de** faciliter la maintenance, garantir la cohérence et éviter la duplication des chemins

- **Critères d'acceptation** :

- **CA1 - Structure des dossiers** :
  - Toutes les images déplacées de `public/images/` vers `data/images/`
  - Création de 3 sous-dossiers : `json/`, `md/`, `static/`
  - Le dossier `public/images/` est maintenant vide

- **CA2 - API Route** :
  - Nouvelle route : `/api/images/[type]/[filename]`
  - Types acceptés : `json`, `md`, `static`
  - Validation du type et service depuis `data/images/{type}/`

- **CA3 - Fonctions utilitaires** :
  - `getJsonImagePath(filename)` → `/api/images/json/${filename}`
  - `getMdImagePath(filename)` → `/api/images/md/${filename}`
  - `getStaticImagePath(filename)` → `/api/images/static/${filename}`

- **CA4 - Composants modifiés** :
  - `DomaineDeCompetences.tsx` : utilise `getJsonImagePath()` pour les images de compétences
  - `Temoignages.tsx` : utilise `getJsonImagePath()` pour les photos
  - `AboutSiteContentRenderer.tsx` : utilise `getMdImagePath()` pour les images Markdown
  - `aboutSiteReader.ts` : construit automatiquement le chemin MD pour les images Markdown
  - `headerImages.ts` : utilise `getStaticImagePath()` pour Logo et Photo

- **CA5 - Format dans les fichiers** :
  - **JSON** : `"src": "Logo.png"` (juste le nom de fichier, sans chemin complet)
  - **MD** : `![alt](Logo.png)` (juste le nom de fichier, sans `/api/images/`)

- **CA6 - Configuration** :
  - `next.config.ts` : headers de cache mis à jour pour `/api/images/:type/:path*`
  - Tests unitaires mis à jour avec les nouveaux chemins

**Avantages** :
- Séparation claire entre images JSON, MD et statiques
- Réduction de la redondance (pas de chemin complet dans les fichiers)
- Flexibilité (changement de chemin centralisé dans le code)
- Cohérence : contenu et images au même endroit (approche CMS)

---

## US-6.9 : Ajout de boutons YouTube pour certaines compétences

- **En tant que** visiteur du site
- **Je souhaite** pouvoir accéder à des vidéos YouTube depuis certaines compétences
- **Afin de** approfondir ma compréhension via des ressources vidéo

- **Critères d'acceptation** :

- **CA1 - Boutons YouTube ajoutés** :
  - La compétence "BDD" a un bouton "En savoir plus..." qui ouvre un lien externe vers la vidéo YouTube `https://youtu.be/vV_heigVAUo`
  - La compétence "TDD" a un bouton "En savoir plus..." qui ouvre un lien externe vers la vidéo YouTube `https://youtu.be/yiCpfd-kz3g?si=NaUgMAUsHQByLTRd`
  - La compétence "CQRS:ES" a un bouton "En savoir plus..." qui ouvre un lien externe vers la vidéo YouTube `https://youtu.be/S1V4t7SXXCU`

- **CA2 - Détection automatique des URLs externes** :
  - Le composant `DomaineDeCompetences.tsx` détecte automatiquement les URLs externes (commençant par `http://` ou `https://`)
  - Si URL externe → utilisation d'un `<a>` avec `target="_blank"` et `rel="noopener noreferrer"`
  - Si URL interne → utilisation du composant `Link` de Next.js (comportement existant)

- **CA3 - Sécurité** :
  - Tous les liens externes ont `rel="noopener noreferrer"` pour la sécurité
  - Les liens s'ouvrent dans un nouvel onglet

- **CA4 - Cohérence** :
  - Les boutons "En savoir plus..." ont le même style visuel qu'avant
  - Seul le comportement change selon le type d'URL (interne vs externe)

**Résultat attendu** :
- Les visiteurs peuvent accéder facilement aux vidéos YouTube depuis les compétences concernées
- Les liens internes continuent de fonctionner normalement avec la navigation Next.js
- Sécurité garantie pour les liens externes
