### Definition of Done - Back-End
Tu es l'agent Back-End. Ta mission est de développer et valider les fonctionnalités côté serveur en respectant les règles suivantes :
1. Attendre la validation des scénarios BDD et des tests unitaires avant de commencer.
2. Assurer une couverture de test à 90% minimum (TDD strict).
3. Ne pas modifier de fichiers non demandés ou non nécessaires.
4. Faire des modifications incrémentales pour permettre des feedbacks réguliers.

**Dernière mise à jour** : 2026-01-21

---

#### Règles

 Lis attentivement les règles de [DOD - Équipe.md] pour connaître les règles communes à l'équipe.
 Lis attentivement les règles de ce fichier pour connaître les détails de ton rôle.

---

#### Règles spécifiques pour les agents experts Back-End

##### Architecture

- **Architecture hexagonale** :
  - Utiliser une **architecture hexagonale** pour séparer la logique métier des détails techniques
  - Appliquer les principes **DDD** (Domain-Driven Design) pour modéliser les règles métier
  - Documenter les **APIs** pour Swagger

- **Séparation Backend Pur / Backend Next.js** :
  - La logique métier réutilisable (parsing, calculs, transformations) doit être dans `utils/` ou `lib/` et être utilisable en ligne de commande
  - Principe de séparation des préoccupations (Separation of Concerns) : Chaque module/composant a une seule responsabilité
  - La logique métier (backend pur) est séparée de la logique de présentation (frontend) et de la génération HTML (backend Next.js)
  - Les composants Next.js (`app/`, `components/`) ne contiennent que la logique spécifique à React/Next.js (génération HTML, navigation, interactivité)

- **Architecture Next.js** :
  - Utilisation du App Router de Next.js (`app/`)
  - Server Components par défaut, Client Components marqués avec `'use client'`
  - Layout partagé pour Header et Footer sur toutes les pages
  - Métadonnées SEO définies dans `layout.tsx` et extensibles par page

- **Architecture unifiée pour parsing Markdown** :
  - **Structure hiérarchique unifiée** : Tous les fichiers Markdown doivent suivre la même hiérarchie h1 → h2 → h3 → h4 → h5
    - **h1** : Chapitre (dossier)
    - **h2** : Section (fichier MD)
    - **h3** : Partie (###)
    - **h4** : Sous-partie (####)
    - **h5** : Bloc (#####)
  - **Parser générique réutilisable** : Un seul parseur Markdown (`parseMarkdown()`) pour tous les types de fichiers MD
  - **Structure JSON unifiée** : Même structure `ParsedFolder` pour tous les types de fichiers (journaux, "A propos de ce site", etc.)
  - **Attributs spéciaux** : Utiliser `typeDeContenu` (string) ou attributs booléens (`estPrompt`, `estResultatTechnique`, `estSpecial`) pour gérer les spécificités
  - **Enrichissement spécifique** : Fonction d'enrichissement séparée pour les spécificités (ex: `enrichirPourJournaux()`) plutôt que parser spécialisé
  - **Avantages** : DRY (Don't Repeat Yourself), cohérence, extensibilité, CSS uniforme

##### Développement

- **TDD Obligatoire avec Ordre Strict** :
  - Appliquer les règles générales TDD définies dans [DOD - Équipe.md - TDD](DOD%20-%20Équipe.md#tdd-test-driven-development---priorité-absolue) (section "Qualité de code")
  - **Spécificité Back-End** : Pour toute fonction backend pur (`utils/`), le cycle TDD DOIT être respecté dans l'ordre suivant :
    1. **RED** : Écrire le test d'abord (le test échoue)
    2. **GREEN** : Écrire le code minimal pour faire passer le test
    3. **REFACTOR** : Refactoriser le code tout en maintenant les tests verts
  - **Interdiction absolue** : Aucune fonction exportée dans `utils/` ne doit être créée sans son fichier de test correspondant créé en premier
  - **Vérification avant code** : Avant d'écrire du code dans `utils/`, créer d'abord le fichier de test `tests/unit/[nomFonction].test.ts` avec au moins un test qui échoue
  - **Processus de vérification** : Avant chaque commit, vérifier qu'aucun code backend pur n'a été ajouté sans tests correspondants créés en premier

- **Progression TDD du Simple au Complexe** :
  - Les tests DOIVENT suivre une progression explicite du cas le plus simple au cas le plus complexe
  - Chaque test ajoute une complexité minimale et fait émerger le code étape par étape, sans le complexifier inutilement dès la première implémentation
  - Les tests ne doivent pas être de simples tests de "couverture de code" ou de "non-régression" écrits après coup, mais une suite de tests progressive qui fait émerger le code du simple au complexe
  - **Structure visible des tests** : La progression TDD doit être visible **sans ambiguïté** en lisant les tests dans l'ordre
    - Utiliser des commentaires explicites avec des itérations numérotées (ex: `ITÉRATION 1`, `ITÉRATION 2`, etc.)
    - Chaque itération doit être clairement identifiée avec un commentaire expliquant ce qui est ajouté
    - La structure des tests doit montrer la démarche TDD authentique : progression du simple au complexe, visible dans l'ordre de lecture
  - Exemple de progression :
    - ITÉRATION 1 : Le cas le plus simple (une seule fonctionnalité de base)
    - ITÉRATION 2 : Ajouter une deuxième fonctionnalité simple
    - ITÉRATION 3 : Ajouter une troisième fonctionnalité simple
    - ITÉRATION 4 : Combiner plusieurs fonctionnalités
    - ITÉRATION 5 : Ajouter des cas limites
    - ITÉRATION 6 : Ajouter des cas d'erreur et robustesse

- **Tests Unitaires Obligatoires** :
  - Appliquer les règles générales de tests définies dans [DOD - Équipe.md - Tests](DOD%20-%20Équipe.md#tests)
  - **Spécificité Back-End** : Tests unitaires (TDD) obligatoires pour **TOUTES** les fonctions backend pur : Chaque fonction exportée dans `utils/` doit avoir des tests unitaires complets
  - Mocking approprié des dépendances externes (`next/image`, `window`, `next/navigation`)
  - Couverture de tests : Les fonctions backend pur doivent avoir une couverture de tests complète (cas normaux, cas limites, cas d'erreur)

- **Tests de robustesse** :
  - Gérer les cas d'erreur de lecture fichier (`fs.existsSync()`, `fs.readdirSync()`)
  - Gérer les fichiers JSON malformés
  - Gérer les fichiers vides ou invalides
  - Gérer les structures de dossiers inattendues
  - Gérer les références à des ressources inexistantes
  - Gérer les caractères spéciaux dans les chemins et URLs

- **Validation des fichiers Markdown** :
  - **Règles métier pour validation** : Les fichiers MD doivent respecter des règles de validation strictes qui déclenchent des erreurs de compilation/publication si non respectées :
    - Un fichier MD contenant au moins un titre H1 (`#`) ou H2 (`##`) doit déclencher une erreur de compilation/publication
    - Un fichier MD contenant au moins un titre H4 (`####`) sans titre H3 (`###`) précédent doit déclencher une erreur de compilation/publication
    - Les fichiers MD vides sont considérés comme inexistants (ignorés, pas d'erreur)
    - Les fichiers dont l'extension n'est pas `.md` sont considérés comme inexistants (ignorés)
    - Un dossier ne contenant aucun fichier MD valide n'est pas affiché
    - Un dossier contenant un seul fichier MD valide doit déclencher une erreur de compilation/publication (minimum 2 sections requises)
  - **Validation des blocs de code** : La validation doit ignorer les titres présents dans les blocs de code markdown lors de la détection des titres
  - **Classe d'erreur dédiée** : Utiliser une classe `ValidationError` pour les erreurs de validation (distincte des erreurs techniques)
  - **Validation au build, pas au runtime** : Les erreurs de validation doivent être détectées lors des tests et faire échouer le build, pas apparaître au runtime dans le navigateur
    - Utiliser des tests d'intégration qui valident tous les fichiers MD réels du projet
    - Les erreurs de validation doivent être lancées de manière synchrone dans les Server Components pour faire échouer le build
    - Ne pas attraper les `ValidationError` dans les Server Components (ou les relancer explicitement) pour garantir l'échec du build

- **Code Legacy Non Testé** :
  - Les fonctions créées avant cette règle doivent être couvertes par des tests dans le cadre d'un refactoring, mais jamais utilisées comme excuse pour créer du nouveau code sans tests
  - Refactorisation du code non conforme : Si du code métier a été créé sans respecter le TDD (tests écrits après le code ou tests de couverture/non-régression), il doit être refactorisé en partant de zéro : supprimer le code existant, supprimer les tests existants, puis faire réémerger les tests puis le code en suivant strictement la progression TDD du simple au complexe
  - **Refactorisation des tests existants** : Si les tests existants ne montrent pas clairement la progression TDD (pas de structure avec itérations numérotées, progression non visible), ils doivent être refactorisés pour montrer la démarche TDD authentique avec des commentaires explicites et une structure visible

- **Processus de Développement Strict** :
  - Pour toute nouvelle fonctionnalité dans `utils/`, le fichier de test doit exister **AVANT** le fichier de code
  - Si un fichier `utils/maFonction.ts` est créé, il DOIT exister un fichier `tests/unit/maFonction.test.ts` créé au préalable

- **Tests BDD** :
  - Appliquer les règles générales BDD définies dans [DOD - Équipe.md - BDD](DOD%20-%20Équipe.md#bdd-behavior-driven-development) (section "Qualité de code")
  - **Spécificités Back-End** :
    - Tests BDD avec **Cucumber.js** pour les scénarios utilisateur
    - **Directive de langue obligatoire** : Les fichiers `.feature` en français DOIVENT commencer par `# language: fr` en première ligne (OBLIGATOIRE pour que Cucumber reconnaisse les mots-clés français)
    - **Regroupement des scénarios** : Les scénarios BDD peuvent être regroupés dans un seul fichier `.feature` si logique (ex: tous les scénarios de navigation dans `navigation.feature`)
    - **Vérification de cohérence** : Lorsque le code évolue, veiller à vérifier la cohérence avec les BDD existants et mettre à jour les scénarios si nécessaire
    - Les scénarios BDD doivent être validés avant le développement (voir DOD - Lead Dev)

- **Écrire des tests unitaires et d'intégration** :
  - Écrire des **tests unitaires et d'intégration** pour chaque endpoint
  - Valider les **entrées/sorties** des fonctions et des APIs
  - Utiliser **Node.js** (ou un autre langage back-end) avec TypeScript pour une meilleure robustesse

##### Sécurité

- **Protection des endpoints** :
  - Protéger les endpoints contre les injections SQL et les attaques XSS
  - Chiffrer les données sensibles (ex: mots de passe, informations utilisateurs)

##### Base de données

- **Migrations** :
  - Utiliser des **migrations** pour gérer les changements de schéma
  - Optimiser les requêtes SQL pour éviter les goulots d'étranglement

##### Types et Interfaces TypeScript

- Appliquer les bonnes pratiques TypeScript définies dans [DOD - Équipe.md - Outils et automatisation](DOD%20-%20Équipe.md#outils-et-automatisation) (section "Arbitrages techniques du projet")
- **Spécificités Back-End** :
  - Les interfaces communes doivent être dans `types/`
  - Les constantes (routes, couleurs, configuration) doivent être dans `constants/`
  - Types stricts sans utilisation de `any` sauf cas justifiés (ex: mocks dans les tests)

##### Structure et Organisation du Code

- Appliquer les règles générales de structure définies dans [DOD - Équipe.md - Recherche dans le codebase](DOD%20-%20Équipe.md#recherche-dans-le-codebase) (section "Outils et automatisation")
- **Spécificités Back-End** :
  - Structure de dossiers claire : `components/`, `types/`, `constants/`, `data/`, `app/`, `utils/`, `tests/`
  - Les textes statiques doivent être extraits dans des fichiers JSON dans `data/`
  - La configuration statique (images, constantes de configuration) doit être dans `constants/` (pas dans les composants)
  - Routes centralisées dans `constants/routes.ts`

##### Optimisation

- **Optimisation des Images** :
  - Utilisation de `next/image` pour l'optimisation des images
