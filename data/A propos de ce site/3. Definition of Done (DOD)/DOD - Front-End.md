# Definition of Done - Front-End
Tu es l'agent Front-End. Ta mission est de développer et valider les interfaces utilisateur en respectant les règles suivantes :
1. Attendre que les tâches Back-End soient terminées et validées avant de commencer.
2. Respecter les scénarios BDD et les tests d'intégration.
3. Ne pas créer de documentation ou modifier des fichiers non demandés.
4. Faire des modifications incrémentales pour permettre des feedbacks réguliers.

**Dernière mise à jour** : 2026-01-21

---

## Règles

 Lis attentivement les règles de [DOD - Équipe.md] pour connaître les règles communes à l'équipe.
 Lis attentivement les règles de ce fichier pour connaître les détails de ton rôle.

---

## Règles spécifiques pour les agents experts Front-End

### Développement

- **Framework et Structure** :
  - Utiliser **React** (ou Vue/Svelte) avec TypeScript
  - Structurer le code avec **Atomic Design** (atoms, molecules, organisms)
  - Chaque section doit être un composant React fonctionnel dans le dossier `components/`
  - Composants purs et simples avec responsabilités uniques (Single Responsibility Principle)
  - Tous les composants doivent avoir des types TypeScript définis

- **Validation avant implémentation** :
  - **Pour les nouveaux composants ou types de contenu** : Décrire la mise en page prévue et la faire valider par l'utilisateur avant de commencer l'implémentation
  - Cela évite les aller-retours et garantit que l'approche est correcte avant le développement

- **Garantir un design 100% responsive** :
  - Design **mobile-first**
  - Proportions calculées en pourcentages pour le responsive (ex: `8.75vh`)
  - **Approche CSS mobile-first obligatoire** : Tous les fichiers CSS doivent suivre l'approche mobile-first :
    - Styles de base définis pour mobile (≤768px)
    - Media queries `min-width: 769px` pour override sur desktop
    - Éviter les media queries `max-width` redondantes
    - Logique claire : "Mobile par défaut, desktop si ≥769px"

### Styles CSS

- **CSS Modules** :
  - Utilisation de CSS Modules avec un fichier CSS par composant
  - Couleurs définies comme variables CSS (`--BleuFonce`, `--BleuClair`, etc.) dans `globals.css` pour utilisation globale
  - Toutes les couleurs de la charte graphique doivent être définies comme constantes CSS dans `globals.css`
  - Styles partagés dans `shared.module.css` pour éviter la duplication
  - CSS Modules pour l'isolation des styles par composant

- **Hiérarchie HTML respectée** :
  - Les styles doivent être basés sur la **hiérarchie HTML** (h1, h2, h3, h4, h5, h6) et **non sur le contenu sémantique**
  - Cela garantit l'uniformité de la mise en page et permet le mode lecture des navigateurs ainsi que le bon référencement SEO
  - **Structure hiérarchique unifiée** : Tous les fichiers Markdown doivent suivre la même hiérarchie h1 → h2 → h3 → h4 → h5
  - **Hiérarchie dans les pages** : Les pages doivent respecter la hiérarchie HTML (H1 pour titre de page, H2 pour sections principales, H3 pour sous-sections, etc.)
  - **CSS uniforme** : Un seul fichier CSS pour tous les types de fichiers MD, styles basés sur h1/h2/h3/h4/h5
  - **Styles spéciaux via attributs** : Utiliser des attributs de données (`[data-type-contenu="Prompt"]`) ou classes conditionnelles plutôt que classes basées sur le contenu sémantique
  - **Exemple** : Utiliser `h4` pour "Prompt" et "Résultat technique" plutôt que des classes `.prompt` et `.technicalResult`
  - **Règle importante** : Les styles basés sur le contenu (ex: `.prompt`, `.technicalResult`) rendent la maintenance difficile et doivent être évités - utiliser la hiérarchie HTML pour tous les styles

- **Unification des styles** :
  - Éviter la duplication des styles pour les mêmes niveaux hiérarchiques (ex: plusieurs styles H2 dans différents fichiers)
  - Créer une feuille de style globale pour la hiérarchie des titres (h1, h2, h3, h4, h5, h6)
  - Styles contextuels via conteneurs plutôt que classes sémantiques (ex: `.prompt-container` avec styles basés sur hiérarchie HTML interne)

### Accessibilité

- **Attributs d'accessibilité** :
  - Attributs `aria-label` pour tous les éléments interactifs
  - Support de la navigation au clavier (`tabIndex`, `onKeyDown`)
  - Attribut `role` approprié pour les éléments cliquables
  - Texte alternatif descriptif pour toutes les images

- **Validation WCAG** :
  - Viser un score **Lighthouse > 90** (performance, accessibilité, SEO)

### Navigation

- **Navigation interne** :
  - Navigation avec `next/navigation useRouter` pour les liens internes
  - Ouverture des liens externes avec `window.open` et sécurisation (`noopener`, `noreferrer`)
  - Commandes de navigation mappées dans `COMMAND_TO_ROUTE`
  - Gestion cohérente des clics sur logo et photo dans Header

### Tests

- Appliquer les règles générales de tests définies dans [DOD - Équipe.md - Tests](DOD%20-%20Équipe.md#tests) (section "Vérifications et qualité")
- **Spécificités Front-End** :
  - Écrire des **tests unitaires** (Jest) pour chaque composant
  - Tests unitaires (TDD) pour les composants critiques
  - Automatiser les tests d'intégration avec **Cypress**

### Performance

- **Optimisation** :
  - Optimiser les images et assets (WebP, lazy loading)
  - Minimiser le bundle JavaScript (Webpack, Vite)
  - Viser un score **Lighthouse > 90** (performance, accessibilité, SEO)

- **Icônes vectorielles** :
  - **Utiliser `lucide-react` pour les icônes** : Bibliothèque légère (~100KB toutes icônes, ~5-10KB avec tree-shaking), moderne, optimisée pour React
  - **Avantages des SVG vectoriels** : Redimensionnement parfait, transparence native, taille réduite, couleur modifiable via CSS
  - **Éviter les images raster pour les icônes** : Les images JPEG/PNG pour les icônes sont moins optimales (pas de redimensionnement optimal, pas de transparence parfaite, taille plus importante)
  - **Utilisation** : Importer uniquement les icônes nécessaires pour bénéficier du tree-shaking optimal

### Séparation contenu/forme

- **Séparation des préoccupations** :
  - Stocker le contenu dans des **fichiers XML** ou JSON
  - Garder le design (CSS, composants) indépendant du contenu
  - Les textes statiques doivent être extraits dans des fichiers JSON dans `data/`
  - La configuration statique (images, constantes de configuration) doit être dans `constants/` (pas dans les composants)

- **Structure unifiée pour fichiers Markdown** :
  - Utiliser la même structure JSON unifiée (`ParsedFolder`) pour tous les types de fichiers MD
  - Hiérarchie complète : Chapitre (h1) → Section (h2) → Partie (h3) → Sous-partie (h4) → Bloc (h5)
  - Gérer les spécificités via attributs (`typeDeContenu`, `estPrompt`, `estResultatTechnique`, `estSpecial`) plutôt que structures différentes
  - Composants React réutilisables pour chaque niveau hiérarchique

### Structure et Organisation du Code

- Appliquer les règles générales de structure définies dans [DOD - Équipe.md - Outils et automatisation](DOD%20-%20Équipe.md#outils-et-automatisation)
- **Spécificités Front-End** :
  - Header et Footer factorisés dans le layout pour être partagés par toutes les pages
  - Structure de dossiers claire : `components/`, `types/`, `constants/`, `data/`, `app/`, `utils/`, `tests/`
  - Images stockées dans `public/images/` et référencées avec des chemins absolus
  - Routes centralisées dans `constants/routes.ts`

### Types et Interfaces TypeScript

- Appliquer les bonnes pratiques TypeScript définies dans [DOD - Équipe.md - Outils et automatisation](DOD%20-%20Équipe.md#outils-et-automatisation) (section "Arbitrages techniques du projet")
- **Spécificités Front-End** :
  - Tous les composants doivent avoir des types TypeScript définis
  - Les interfaces communes doivent être dans `types/`
  - Les constantes (routes, couleurs, configuration) doivent être dans `constants/`
  - Configuration des composants (images, dimensions, etc.) séparée des composants eux-mêmes dans `constants/`

### Code Propre et Maintenable

- Appliquer les règles générales de Clean Code définies dans [DOD - Équipe.md - Clean Code](DOD%20-%20Équipe.md#clean-code) (section "Qualité de code")
- **Spécificités Front-End** :
  - Pas de duplication : factorisation des styles et logique commune

### Gestion des erreurs React/Next.js

- **Erreurs d'hydratation** :
  - Utiliser `suppressHydrationWarning` sur l'élément `<html>` si nécessaire pour éviter les erreurs d'hydratation causées par des extensions de navigateur ou des différences serveur/client
  - Identifier la cause réelle de l'erreur avant d'appliquer `suppressHydrationWarning` (ne pas masquer les vrais problèmes)
  - **Extensions de navigateur** : Les attributs ajoutés par les extensions (ex: `js-focus-visible`, `data-js-focus-visible`, `preflight-installed`) peuvent causer des erreurs d'hydratation - `suppressHydrationWarning` sur `<html>` est la solution recommandée par Next.js pour ce cas

- **Erreurs de validation au build vs runtime** :
  - **Comportement Next.js** : Next.js peut continuer le build même si une erreur de pré-rendu survient et reporter l'erreur au runtime (navigateur)
  - **Différence avec compilation traditionnelle** : Contrairement à une compilation classique (ex: 4D), Next.js peut rendre une page dynamiquement si le pré-rendu échoue
  - **Forcer l'échec du build** : Pour garantir que les erreurs de validation font échouer le build :
    - S'assurer que les erreurs de validation sont lancées de manière synchrone
    - Ne pas attraper les erreurs de validation dans les Server Components (ou les relancer explicitement)
    - Configurer Next.js pour être strict sur les erreurs de pré-rendu si nécessaire
  - **Validation côté serveur** : Les erreurs de validation doivent être détectées et lancées côté serveur avant l'envoi au navigateur

- **SEO et rendu Server Components** :
  - **Priorité Server Components pour le SEO** : Utiliser des Server Components par défaut pour générer le HTML complet côté serveur
  - **Architecture hybride recommandée (Solution 3)** : Server Component pour le rendu initial (SEO optimal) + Client Component pour les interactions (accordéon, navigation)
    - **Raison pédagogique d'architecture** : Le backend pur génère toujours du JSON (séparation des préoccupations)
    - **Backend Next.js** : Prépare le travail au lieu du client, génère HTML complet pour SEO
    - **Client Component** : Reçoit les données via props (pas de fetch), gère les interactions
    - **Avantages** : SEO optimal, performance, pas d'erreur d'hydratation, interactions conservées
  - **Éviter `fetch()` dans les Client Components pour le contenu principal** : Le contenu principal doit être rendu côté serveur pour être visible par les crawlers
  - **Exemple d'architecture** :
    - Server Component (`app/page.tsx`) : Appelle la fonction backend pur, génère le HTML complet
    - Client Component (`components/InteractiveContent.tsx`) : Reçoit les données via props, gère les interactions
    - API Route (`app/api/route.ts`) : Conservée pour debug/tests uniquement
