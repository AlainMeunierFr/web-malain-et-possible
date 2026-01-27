# Sprint Goal
Transformer le site d'une orientation "offre entreprise - personne morale" vers "recherche mission - personne physique", en réorganisant l'architecture technique pour permettre la création de profils ciblés et l'ajout d'une section HERO orientée recherche d'emploi.

---

## Contexte

Le site actuel a été conçu pour présenter une offre de services (freelance/consultation) à destination des entreprises. Il doit maintenant servir de vitrine pour une recherche de mission (CDI ou freelance long terme) en tant que personne physique.

Cette transformation nécessite :
1. Une réorganisation de l'architecture technique des JSON pour permettre la réutilisation et la mise à jour centralisée
2. La création d'une section HERO claire sur la recherche d'emploi
3. La possibilité de créer des pages de profils ciblés (CPO, COO, Transformation Agile, CTO)

---

## US-7.1 : Réorganisation architecture JSON avec bibliothèque de compétences

- **En tant que** développeur/mainteneur du site
- **Je souhaite** centraliser toutes les compétences et domaines dans une bibliothèque
- **Afin de** permettre la réutilisation, la mise à jour centralisée et la création de profils ciblés

- **Critères d'acceptation** :

- **CA1 - Structure de bibliothèque** :
  - Toutes les compétences sont centralisées dans `data/bibliotheque/competences.json`
  - Tous les domaines de compétences sont centralisées dans `data/bibliotheque/domaines.json`
  - Les domaines pointent vers les compétences via leurs IDs (slug du titre)

- **CA2 - Pages avec références** :
  - Les pages JSON utilisent des références `{ "type": "domaineDeCompetence", "ref": "id-domaine" }` au lieu de domaines inline
  - Le backend résout automatiquement les références pour produire le même format JSON qu'actuellement
  - Le rendu reste identique (aucun changement côté frontend)

- **CA3 - Utilitaires de lecture** :
  - `utils/bibliothequeReader.ts` charge les compétences et domaines depuis la bibliothèque
  - `utils/profilBuilder.ts` résout les références vers la bibliothèque
  - `utils/indexReader.ts` détecte et résout automatiquement les références

- **CA4 - Intégrité référentielle** :
  - `utils/referentialIntegrityChecker.ts` vérifie que toutes les références sont valides
  - Un test d'intégrité détecte les liens cassés
  - Le build échoue si l'intégrité est cassée

- **CA5 - Migration** :
  - Toutes les pages existantes sont migrées pour utiliser des références
  - Aucune régression visuelle
  - Les tests passent à 100%

- **CA6 - Tests** :
  - Tests unitaires pour `bibliothequeReader`, `profilBuilder` et `referentialIntegrityChecker`
  - Tests d'intégration pour vérifier le rendu identique
  - Tous les tests passent

**Résultat attendu :**
- 50 compétences uniques dans la bibliothèque
- 18 domaines uniques dans la bibliothèque
- Toutes les pages utilisent des références
- Architecture modulaire permettant la création de profils ciblés

---

## US-7.2 : Section HERO orientée recherche d'emploi

- **En tant que** visiteur/recruteur
- **Je souhaite** voir immédiatement que le site est orienté recherche d'emploi
- **Afin de** comprendre rapidement la disponibilité et les intentions d'Alain

- **Scénarios BDD** : Voir `tests/bdd/hero-section-recherche-emploi.feature` (20 scénarios)

- **Critères d'acceptation** :

- **CA1 - Section HERO principale** :
  - La section HERO remplace le contenu actuel en haut de la page d'accueil
  - Titre : "Alain Meunier"
  - Sous-titre : "Je recherche un projet stimulant (CDI ou freelance)"
  - Description de la valeur apportée (texte épuré, voir CA4)
  - 1 bouton principal : "On discute ?" qui redirige vers `/faisons-connaissance`

- **CA2 - Nouveau type de contenu "Profil"** :
  - Création d'un nouveau type d'élément `profil` dans le système de contenu
  - Structure JSON pour un profil :
    ```json
    {
      "type": "profil",
      "titre": "Titre du profil (type de mission)",
      "jobTitles": ["Job Title 1", "Job Title 2", ...],
      "slug": "slug-du-profil",
      "route": "/profil/slug-du-profil",
      "cvPath": "/data/CV/slug-du-profil.pdf"
    }
    ```
  - Le type `profil` est ajouté dans `utils/indexReader.ts`
  - Nouveau composant `ProfilContainer.tsx` pour afficher un profil

- **CA3 - Containers de profils dans la HERO** :
  - 4 containers de profils affichés dans la HERO en disposition 4x1 (4 colonnes côte à côte sur desktop)
  - Chaque container affiche :
    - **Titre** : Type de mission (ex: "Produit logiciel")
    - **Liste de Job Titles** : Liste en plus petit pour mots-clés et adaptation aux vocables préférés des lecteurs
    - **Bouton d'accès** : Bouton pour accéder à la page de profil correspondante (texte à définir)
    - **Bouton CV** : Bouton "Voir mon CV" pour télécharger le CV spécifique à ce profil
  
  - Les 4 profils avec valeurs par défaut (voir fichier PROPOSITIONS-VALEURS-PROFILS.md) :
    1. **Produit logiciel** (slug: `cpo`)
       - Job Titles : CPO - Chief Product Officer, HOP - Head of Product, Product Manager, Product Owner
       - Route : `/profil/cpo`
       - CV Path : `/data/CV/cpo.pdf`
    
    2. **Opérations** (slug: `coo`)
       - Job Titles : COO - Chief Operation Officer, HOO - Head of Operation, Directeur opérationnel
       - Route : `/profil/coo`
       - CV Path : `/data/CV/coo.pdf`
    
    3. **Transformation Agile** (slug: `agile`)
       - Job Titles : Transformation Agile, Coach Agile, Scrum Master, Product Owner
       - Route : `/profil/agile`
       - CV Path : `/data/CV/agile.pdf`
    
    4. **Technologie** (slug: `cto`)
       - Job Titles : CTO - Chief Technology Officer, HTO - Head of Technology, Directeur Technique
       - Route : `/profil/cto`
       - CV Path : `/data/CV/cto.pdf`

- **CA4 - Description de la valeur** :
  - Texte épuré (version finale à valider) :
    > "25 ans d'expérience à transformer des idées en produits logiciels qui génèrent de la valeur. J'ai équipé 15% des radiologues libéraux français avec mon premier produit. Passionné par la résolution de problèmes complexes, je combine rigueur technique et leadership humain. Mon parcours d'entrepreneur m'a appris que les meilleures solutions naissent de l'engagement des équipes. Je recherche un projet long terme où je pourrai contribuer à la stratégie et à la transformation des organisations."

- **CA5 - Réorganisation du contenu de la page d'accueil** :
  - La page d'accueil (Home) ne contient que :
    1. Section HERO avec les 4 containers de profils
    2. CallToAction "On discute ?" (redirige vers `/faisons-connaissance`)
    3. Vidéo "Mon parcours, mes transformations"
    4. Texte large actuellement sous la vidéo
  - Tous les domaines de compétences sont déplacés sur les sous-pages de profils (`/profil/cpo`, `/profil/coo`, `/profil/agile`, `/profil/cto`)
  - Les autres éléments (témoignages, etc.) peuvent être conservés ou déplacés selon décision ultérieure

- **CA6 - Structure de dossiers** :
  - Création du dossier `public/CV/` pour stocker les CV par profil (fichiers statiques servis par Next.js)
  - Les CV seront créés plus tard (pas dans le scope de cette US)
  - Les chemins dans les JSON de profils pointent vers `/CV/[slug].pdf` (ex: `/CV/cpo.pdf`)

- **CA7 - Composant React HeroSection** :
  - Nouveau composant `HeroSection.tsx` avec :
    - Affichage du titre, sous-titre et description
    - Bouton "On discute ?"
    - 4 containers de profils (utilisant le composant `ProfilContainer.tsx`)
  - Type `hero` ajouté dans `utils/indexReader.ts`
  - Intégration dans `PageContentRenderer.tsx`

- **CA8 - Design et responsive** :
  - Respect de la charte graphique actuelle du site
  - Design responsive (80% des visiteurs seront sur mobile)
  - Sur desktop : disposition 4x1 (4 colonnes côte à côte, aucun profil n'a plus de valeur que les autres)
  - Sur mobile : empilement vertical des containers de profils (un sous l'autre)

- **CA9 - Structure JSON de la HERO** :
  - Nouveau type d'élément `hero` dans les JSON de pages
  - Structure JSON pour la HERO :
    ```json
    {
      "type": "hero",
      "titre": "Alain Meunier",
      "sousTitre": "Je recherche un projet stimulant (CDI ou freelance)",
      "description": "Texte de description...",
      "boutonPrincipal": {
        "texte": "On discute ?",
        "action": "/faisons-connaissance"
      },
      "profils": [
        { "type": "profil", "titre": "...", "jobTitles": [...], "slug": "...", "route": "...", "cvPath": "..." },
        ...
      ]
    }
    ```

---

## US-7.3 : Pages de profils ciblés ✅ COMPLÉTÉ

- **En tant que** visiteur/recruteur
- **Je souhaite** accéder à des pages de profils ciblés selon le poste recherché
- **Afin de** voir uniquement les compétences pertinentes pour ce poste

- **Critères d'acceptation** :

- **CA1 - Pages profils** :
  - 4 pages de profils créées : `/profil/cpo`, `/profil/coo`, `/profil/agile`, `/profil/cto`
  - Chaque page a pour titre le nom du profil (ex: "Produit logiciel", "Opérations", "Transformation Agile", "Technologie")
  - Chaque page référence uniquement les domaines pertinents depuis la bibliothèque (voir PROPOSITION-DOMAINES-PAR-PROFIL.md)
  - Structure identique aux autres pages : vidéo(s) → titre → domaines → callToAction

- **CA2 - Vidéos par profil** :
  - `/profil/cpo` : Vidéo `https://youtu.be/iUv6e256AVk` (Product Management) en début de page, lancement auto `true`
  - `/profil/coo` : Vidéo `https://youtu.be/9rwtuxXiKC0` (Transvers et organique) en début de page, lancement auto `true`
  - `/profil/agile` : Vidéo `https://youtu.be/XoruJezxpsI` (Conduite du changement) en début, `https://youtu.be/mPif5EjzFYg` (Seigneur des anneaux) en fin, lancement auto `true`/`false`
  - `/profil/cto` : Vidéo `https://youtu.be/iUv6e256AVk` (Product Management) en début de page, lancement auto `true`
  - Voir LISTE-VIDEOS-PAR-PROFIL.md pour détails

- **CA3 - Domaines par profil** :
  - Répartition des domaines selon PROPOSITION-DOMAINES-PAR-PROFIL.md
  - Aucun nouveau domaine à créer (les domaines existants couvrent les besoins)
  - Ordre des domaines respecté pour chaque profil

- **CA4 - Navigation** :
  - Les boutons "Découvrir" de la section HERO redirigent vers les pages de profils correspondantes
  - Les pages sont accessibles depuis le plan du site

- **CA5 - CallToAction** :
  - Chaque page de profil se termine par un CallToAction "On discute ?" qui redirige vers `/faisons-connaissance`

**État actuel :**
- ✅ Proposition de domaines validée (PROPOSITION-DOMAINES-PAR-PROFIL.md)
- ✅ Stratégie vidéos validée (LISTE-VIDEOS-PAR-PROFIL.md)
- ⏳ Pages JSON à créer (`profil-cpo.json`, `profil-coo.json`, `profil-agile.json`, `profil-cto.json`)
- ⏳ Routes Next.js à créer (`app/profil/[slug]/page.tsx` ou 4 routes distinctes)
- ⏳ Tests à créer

---

## US-7.4 : Sections Témoignages dans tous les profils

- **En tant que** visiteur/recruteur
- **Je souhaite** voir des témoignages clients à la fin de chaque page de profil
- **Afin de** renforcer ma confiance et la crédibilité d'Alain avant le call-to-action final

- **Critères d'acceptation** :

- **CA1 - Structure de la section Témoignages** :
  - Chaque page de profil (`/profil/cpo`, `/profil/coo`, `/profil/agile`, `/profil/cto`) contient une section "Témoignages" à la fin, juste avant le call-to-action final
  - La section est composée de :
    1. Un titre "Témoignages" (type `titre`)
    2. Un élément `temoignages` avec `source: "_temoignages.json"` pour charger les témoignages depuis le fichier partagé

- **CA2 - Fichier de témoignages partagé** :
  - Les témoignages sont centralisés dans `data/_temoignages.json`
  - Le fichier contient une structure `temoignages` avec un tableau `items` de témoignages
  - Chaque témoignage contient : `nom`, `fonction`, `photo`, `temoignage`
  - Le composant `Temoignages.tsx` existant charge et affiche les témoignages depuis ce fichier

- **CA3 - Intégration dans les profils** :
  - `profil-cpo.json` : Section Témoignages ajoutée avant le call-to-action
  - `profil-coo.json` : Section Témoignages ajoutée avant le call-to-action
  - `profil-agile.json` : Section Témoignages ajoutée avant le call-to-action (avant la vidéo finale si présente)
  - `profil-cto.json` : Section Témoignages ajoutée avant le call-to-action

- **CA4 - Affichage** :
  - Les témoignages s'affichent avec le composant `Temoignages.tsx` existant
  - Le rendu respecte le design actuel (grille 2 colonnes sur desktop, empilé sur mobile)
  - Les photos, noms, fonctions et textes de témoignages sont correctement affichés

- **CA5 - Positionnement** :
  - La section Témoignages apparaît systématiquement avant le dernier call-to-action de chaque profil
  - L'ordre de contenu d'un profil est : Vidéo(s) → Titre → Domaines → Témoignages → Call-to-action

**Résultat attendu :**
- Tous les profils affichent des témoignages clients avant le call-to-action final
- Amélioration de la crédibilité et de la confiance
- Cohérence : mêmes témoignages partagés sur tous les profils (cohérence du message)

---

## US-7.5 : Améliorations design - TitreDePage et styles bouton HeroSection

- **En tant que** visiteur/recruteur
- **Je souhaite** avoir une meilleure expérience visuelle et de navigation
- **Afin de** mieux identifier la page sur laquelle je me trouve et avoir un feedback visuel clair sur les interactions

- **Critères d'acceptation** :

- **CA1 - Type TitreDePage** :
  - Création d'un nouveau type de contenu `titreDePage` dans `utils/indexReader.ts`
  - Interface `ElementTitreDePage` avec `type: 'titreDePage'` et `texte: string`
  - Le type est ajouté au type union `ElementContenu`

- **CA2 - Affichage du titre dans le Header** :
  - Le premier élément `titreDePage` de chaque page est extrait et affiché dans le header (bande bleue)
  - Le titre s'affiche en police blanche, centré horizontalement et verticalement dans la bande bleue
  - Positionnement : entre le logo et la photo
  - Le titre est centré en hauteur dans la bande bleue (contrairement au logo et à la photo qui dépassent)

- **CA3 - Contexte React pour partage du titre** :
  - Création d'un contexte `PageTitleContext` (`contexts/PageTitleContext.tsx`)
  - Provider `PageTitleProvider` avec state `pageTitle` et fonction `setPageTitle`
  - Hook `usePageTitle()` pour accéder au contexte
  - Intégration dans `app/layout.tsx` avec `PageTitleProvider`

- **CA4 - Extraction et affichage** :
  - `PageContentRenderer.tsx` extrait le premier `titreDePage` du contenu via `useEffect`
  - Le titre est mis dans le contexte via `setPageTitle`
  - Le `titreDePage` n'est pas affiché dans le contenu de la page (retourne `null` dans le switch)
  - `Header.tsx` utilise `usePageTitle()` pour récupérer et afficher le titre conditionnellement

- **CA5 - Styles du titre dans le Header** :
  - `.titleContainer` : Position absolue, centré (`left: 50%`, `top: 50%`, `transform: translate(-50%, -50%)`)
  - `.pageTitle` : Police blanche, police serif, taille 1.5rem, gras, centré
  - Responsive : Réduction à 1.125rem sur mobile, ajustement du `max-width` pour éviter les chevauchements

- **CA6 - Migration des pages** :
  - Remplacement du premier `"type": "titre"` par `"type": "titreDePage"` dans :
    - `profil-cpo.json` : "Produit logiciel"
    - `profil-coo.json` : "Opérations"
    - `profil-agile.json` : "Transformation Agile"
    - `profil-cto.json` : "Technologie"
    - `faisons-connaissance.json` : "Faisons connaissance"
    - `detournement-video.json` : "Détournement de scènes cultes du cinéma"
    - `portfolio-detournements.json` : "Portfolio de detournements vidéos"
    - `pour-aller-plus-loin.json` : "Pour aller plus loin, je vous propose une expérience..."

- **CA7 - Styles bouton principal HeroSection** :
  - Inversion des styles hover/normal pour améliorer l'UX
  - **État normal** (`.boutonPrincipal`) :
    - `background-color: var(--BoutonCouleurFond)` (style sobre)
    - `color: var(--BoutonCouleur)`
    - `transform: translateY(0)` (pas de décalage)
    - `box-shadow: none` (pas d'ombre)
  - **État hover** (`.boutonPrincipal:hover`) :
    - `background-color: var(--BoutonCouleurFondHover)` (style plus visible)
    - `color: var(--BoutonCouleurTexteHover)`
    - `transform: var(--BoutonTransformHover)` (effet de décalage)
    - `box-shadow: var(--BoutonOmbreHover)` (ombre pour profondeur)

- **CA8 - Client Component** :
  - `PageContentRenderer.tsx` est marqué comme Client Component avec `'use client'` pour utiliser les hooks React (`useEffect`, `usePageTitle`)

**Résultat attendu :**
- Identification claire de la page courante via le titre dans le header
- Meilleur feedback visuel sur les interactions (bouton sobre par défaut, plus visible au survol)
- Expérience utilisateur améliorée avec navigation plus intuitive

---

## Résultats du Sprint

### US-7.1 : ✅ Complétée

**Livrables :**
- ✅ `data/bibliotheque/competences.json` avec 50 compétences
- ✅ `data/bibliotheque/domaines.json` avec 18 domaines
- ✅ `utils/bibliothequeReader.ts` - Lecture de la bibliothèque
- ✅ `utils/profilBuilder.ts` - Résolution des références
- ✅ `utils/referentialIntegrityChecker.ts` - Vérification d'intégrité
- ✅ `utils/indexReader.ts` - Adaptation pour résolution automatique
- ✅ Migration de toutes les pages vers références
- ✅ Tests unitaires (17 tests passent)
- ✅ Tests d'intégration (rendu identique vérifié)
- ✅ Intégrité référentielle validée

**Scripts créés :**
- `scripts/extract-bibliotheque.ts` - Extraction automatique de la bibliothèque
- `scripts/migrate-pages-to-references.ts` - Migration automatique des pages
- `scripts/check-integrity.ts` - Vérification d'intégrité référentielle
- `scripts/test-resolution.ts` - Test de résolution
- `scripts/verify-resolution.ts` - Vérification de résolution

**Impact :**
- Architecture modulaire permettant la réutilisation
- Mise à jour centralisée des compétences
- Base solide pour créer des profils ciblés

### US-7.2 : ✅ Complétée

**Livrables :**
- ✅ Types `hero` et `profil` ajoutés dans `utils/indexReader.ts`
- ✅ Composant `HeroSection.tsx` créé avec styles responsive
- ✅ Composant `ProfilContainer.tsx` créé avec styles responsive
- ✅ `PageContentRenderer.tsx` adapté pour gérer le type `hero`
- ✅ Dossier `public/CV/` créé pour les CV
- ✅ `data/index.json` migré avec section HERO en premier
- ✅ Tests unitaires créés et passent (36 tests)
- ✅ Rendu validé : structure correcte avec 4 profils

**Résultat :**
- Page d'accueil contient : HERO → Vidéo → TexteLarge (CallToAction redondant supprimé)
- 4 containers de profils affichés en 4x1 sur desktop, empilés sur mobile
- Navigation fonctionnelle vers les pages de profils
- Chemins CV configurés (fichiers à créer plus tard)
- Charte graphique respectée (variables CSS, styles de boutons cohérents)
- Boutons alignés horizontalement en bas des containers, quelle que soit la hauteur
- Interlignes réduits pour optimiser l'espace vertical
- Support du markdown inline (gras) dans les textes de la HERO

### US-7.3 : ✅ Complétée

**Livrables :**
- ✅ 4 pages de profils créées : `/profil/cpo`, `/profil/coo`, `/profil/agile`, `/profil/cto`
- ✅ Route Next.js dynamique : `app/profil/[slug]/page.tsx`
- ✅ Pages JSON créées : `profil-cpo.json`, `profil-coo.json`, `profil-agile.json`, `profil-cto.json`
- ✅ Domaines de compétences référencés depuis la bibliothèque selon PROPOSITION-DOMAINES-PAR-PROFIL.md
- ✅ Vidéos intégrées selon LISTE-VIDEOS-PAR-PROFIL.md
- ✅ Témoignages ajoutés avant le call-to-action (US-7.4)
- ✅ Navigation fonctionnelle depuis la section HERO
- ✅ Pages accessibles depuis le plan du site

**Résultat :**
- 4 profils ciblés opérationnels avec leurs domaines de compétences spécifiques
- Structure cohérente : vidéo(s) → titre → domaines → témoignages → call-to-action
- Navigation fluide depuis la page d'accueil vers les profils

### US-7.4 : ✅ Complétée

**Livrables :**
- ✅ Section "Témoignages" ajoutée dans les 4 profils (`profil-cpo.json`, `profil-coo.json`, `profil-agile.json`, `profil-cto.json`)
- ✅ Témoignages chargés depuis `data/_temoignages.json` partagé
- ✅ Affichage via le composant `Temoignages.tsx` existant
- ✅ Positionnement cohérent : avant le call-to-action final sur tous les profils

**Résultat :**
- Tous les profils affichent des témoignages clients avant le call-to-action
- Amélioration de la crédibilité et de la confiance
- Cohérence du message avec témoignages partagés

### US-7.5 : ✅ Complétée

**Livrables :**
- ✅ Type `titreDePage` créé dans `utils/indexReader.ts`
- ✅ Contexte `PageTitleContext` créé pour partager le titre avec le Header
- ✅ `PageContentRenderer.tsx` marqué comme Client Component et extraction du titre
- ✅ `Header.tsx` affiche le titre conditionnellement dans la bande bleue
- ✅ Styles du titre : police blanche, centré verticalement et horizontalement
- ✅ Migration de 8 pages : premier `titre` remplacé par `titreDePage`
- ✅ Styles bouton HeroSection inversés : sobre par défaut, visible au survol

**Résultat :**
- Identification claire de la page courante via le titre dans le header
- Meilleur feedback visuel sur les interactions (bouton principal)
- Expérience utilisateur améliorée

---

## Notes techniques

- Les IDs sont générés en slug depuis les titres (ex: "Stratégie et transformations" → "strategie-et-transformations")
- Compatibilité ascendante : les pages sans références continuent de fonctionner
- Le format JSON final envoyé au render est identique à l'actuel (pas de changement côté frontend)
- Architecture DDD : séparation claire entre Domain (bibliothèque) et Application (pages)
