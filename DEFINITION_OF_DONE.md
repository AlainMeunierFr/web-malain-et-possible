# Definition of Done (DOD)

Cette Definition of Done (DOD) structure les bonnes pratiques appliquées lors du développement de ce site web. Elle a été établie par un Product Manager pilotant une IA, et est organisée par thème, du plus simple au plus complexe.

## 1. Structure et Organisation

- Chaque section doit être un composant React fonctionnel dans le dossier `components/`
- Les textes statiques doivent être extraits dans des fichiers JSON dans `data/`
- La Definition of Done (DOD) doit être dans un fichier Markdown `DEFINITION_OF_DONE.md` à la racine du projet pour être partagée entre l'IA, le Product Manager et le site web
- Utilisation de CSS Modules avec un fichier CSS par composant
- Header et Footer factorisés dans le layout pour être partagés par toutes les pages
- **Séparation backend pur (logique métier) / backend Next.js (génération HTML)** : La logique métier réutilisable (parsing, calculs, transformations) doit être dans `utils/` ou `lib/` et être utilisable en ligne de commande. Les composants Next.js (`app/`, `components/`) ne contiennent que la logique spécifique à React/Next.js (génération HTML, navigation, interactivité)

## 2. Types et Interfaces

- Tous les composants doivent avoir des types TypeScript définis
- Les interfaces communes doivent être dans `types/`
- Les constantes (routes, couleurs) doivent être dans `constants/`
- Types stricts sans utilisation de `any` sauf cas justifiés

## 3. Références et Chemins

- Images stockées dans `public/images/` et référencées avec des chemins absolus
- Utilisation de `next/image` pour l'optimisation des images
- Routes centralisées dans `constants/routes.ts`
- Pas de chemins relatifs complexes (max 2 niveaux)

## 4. Styles et Responsive

- Couleurs définies comme variables CSS (`--BleuFonce`) dans `globals.css`
- Proportions calculées en pourcentages pour le responsive (ex: `8.75vh`)
- Styles partagés dans `shared.module.css` pour éviter la duplication
- CSS Modules pour l'isolation des styles par composant

## 5. Accessibilité

- Attributs `aria-label` pour tous les éléments interactifs
- Support de la navigation au clavier (`tabIndex`, `onKeyDown`)
- Attribut `role` approprié pour les éléments cliquables
- Texte alternatif descriptif pour toutes les images

## 6. Navigation et Routing

- Navigation avec `next/navigation useRouter` pour les liens internes
- Ouverture des liens externes avec `window.open` et sécurisation (`noopener`, `noreferrer`)
- Commandes de navigation mappées dans `COMMAND_TO_ROUTE`
- Gestion cohérente des clics sur logo et photo dans Header

## 7. Code Propre et Maintenable

- **Principe de séparation des préoccupations (Separation of Concerns)** : Chaque module/composant a une seule responsabilité. La logique métier (backend pur) est séparée de la logique de présentation (frontend) et de la génération HTML (backend Next.js)
- Pas de code mort : suppression des composants et fichiers inutilisés
- Pas de duplication : factorisation des styles et logique commune
- Composants purs et simples avec responsabilités uniques (Single Responsibility Principle)
- Noms de variables et fonctions explicites et en français pour le domaine métier

## 8. Tests

- Tests unitaires (TDD) pour les fonctions utilitaires et composants
- Tests BDD (Cucumber) pour les scénarios utilisateur
- Tests passent sans erreurs avant commit
- Mocking approprié des dépendances externes (`next/image`, `window`)

## 9. Architecture Next.js

- Utilisation du App Router de Next.js (`app/`)
- Server Components par défaut, Client Components marqués avec `'use client'`
- Layout partagé pour Header et Footer sur toutes les pages
- Métadonnées SEO définies dans `layout.tsx` et extensibles par page

## 10. Qualité et Maintenabilité

- Pas d'erreurs de linting (ESLint)
- Build Next.js réussi sans avertissements critiques
- Structure de dossiers claire : `components/`, `types/`, `constants/`, `data/`, `app/`
- Code documenté avec commentaires pour les logiques complexes
