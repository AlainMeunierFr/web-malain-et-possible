### Definition of Done - Équipe

**Dernière mise à jour** : 2026-01-21

---

#### Règles générales pour tous les membres

##### Collaboration et Documentation

- **Journal de bord** :
  - Documenter toutes les interactions entre le PO Humain et les agent IA dans le **Journal de bord** (`A propos de ce site/4. Journal de bord/YYYY-MM-DD.md`).
  - **Tenue en temps réel** : Le journal DOIT être mis à jour **immédiatement après chaque prompt**, pas après coup. Dès qu'un prompt est validé, le fichier de journal du jour doit être modifié.
  - À chaque prompt qui modifie le code ou la structure du projet :
    1. **Si le fichier journal du jour n'existe pas, le créer** (format `YYYY-MM-DD.md` dans `A propos de ce site/4. Journal de bord/`)
    2. Si un nouveau sujet est exploré, créer une nouvelle partie avec `### Titre du sujet` (H3)
    3. Ajouter le prompt dans le journal avec :
       - `#### Titre du prompt` (H4) - titre descriptif du prompt
       - `##### Prompt` (H5) - le prompt exact de l'utilisateur (corriger fautes d'orthographe/syntaxe)
       - `##### Résultat technique` (H5) - résumé technique de la réponse apportée
  - **Règle de validation importante** : Les fichiers journal doivent respecter les règles de validation des fichiers MD :
    - **Aucun titre H1 (#) ou H2 (##) ne doit être présent** dans le fichier
    - Les fichiers doivent commencer au niveau 3 (###)
    - Si un exemple de format contient des titres H1/H2, il doit être mis dans un bloc de code markdown pour être ignoré par le parser
    - Cette règle est validée lors des tests et doit faire échouer le build si non respectée

- **Critères pour l'ajout au journal** :
  - Prompt qui modifie le code → **OUI** (ajouter au journal)
  - Prompt théorique/formation → **NON** (créer un cours dans `5. Cours/`)
  - Prompt de diagnostic/question → **OUI** (ajouter au journal)
  - Prompt de publication Git → **NON** (est disponible par git si nécessaire)

- **Fichiers d'arbitrage** :
  - Lorsque l'utilisateur pose une question de fond sur l'architecture, un arbitrage à faire, ou une stratégie à adopter en mode "agent", l'inviter à passer en mode "question" :
  - Lorsque l'utilisateur le fait en mode "question"
    1. Si c'est un cours (ex: "Compare moi XML et JSON") créer un fichier dans le dossier `A propos de ce site/5. cours/`
    1. Sinon, pour les questions d'architecture et d'arbitrage, créer un fichier dans le dossier `A propos de ce site/6. Questions et arbitrages/`
    2. Nom du fichier : Utiliser un nom descriptif en minuscules avec des espaces (pas de majuscules, pas d'underscores)
    3. Format : `Titre descriptif.md` (ex: "Analyse architecture unifiée.md")
    4. Le fichier toit commencer par un rappel du prompt.
    5. Inclure la question de l'utilisateur, la réponse/analyse/arbitrage proposé, respecter la structure Markdown (titres maximum H3 - ###)
    6. **Règle de validation** : Les fichiers d'arbitrage doivent aussi respecter les règles de validation des fichiers MD (pas de H1/H2, commencer au niveau H3)

##### Gestion des User Stories par Sprint

- **Identification du Sprint en cours** :
  - Les User Stories sont organisées dans le dossier `A propos de ce site/2. Sprints/` avec un fichier MD par Sprint.
  - Le Sprint en cours est le dernier fichier créé dans `A propos de ce site/2. Sprints/`
  - Vérifier la date de modification pour identifier le dernier fichier
  - Aider à rédiger le nouveau Sprint Goal pour nommer le fichier
  - Le format est : `YYYY-MM-DD - Sprint Goal.md`

- **Écriture des User Stories** :
  - Toutes les nouvelles User Stories doivent être écrites dans le fichier du Sprint en cours
  - Respecter le format existant : `#### US-X.Y : Titre` avec les sections "En tant que", "Je souhaite", "Afin de", "Critères d'acceptation"

- **Structure des Critères d'acceptation** :
  - La section "Critères d'acceptation" commence par la ligne `- **Critères d'acceptation** :`
  - Si une ligne commence par `- **` (avec `**` au début) : c'est un "Thème de critère" (puce de niveau 1, texte en gras)
  - Si une ligne commence par `- ` (sans `**` au début) : c'est un "Critère" (puce de niveau 2, texte normal, indenté sous le thème précédent)

- **Rester focus sur le Sprint en cours** :
  - Rester concentré sur l'objectif du Sprint en cours
  - Ne pas se détourner vers d'autres sujets non liés au Sprint en cours
  - **Détection de dérive** : Si l'utilisateur dérive vers d'autres sujets non liés au Sprint en cours, l'alerter poliment pour maintenir le focus
  - **Comportement** :
    - Si l'utilisateur est focus : continuer à écrire les US dans le Sprint en cours
    - Si l'utilisateur n'est pas focus : alerter pour signaler la dérive
    - Si l'utilisateur décide de clore le Sprint et d'en démarrer un nouveau

##### Qualité de code

- **BDD (Behavior-Driven Development)** :
  - Pour toute demande fonctionnelle/métier :
    1. Reformuler la demande en User Story (format : "En tant que [rôle], je veux [action] afin de [bénéfice]")
    2. Identifier le problème métier réel à résoudre
    3. **Valider la User Story avec l'utilisateur avant de continuer**
    4. Une fois la User Story validée, créer le plan de test (BDD métier en format Gherkin français, ou tests E2E selon le besoin)
    5. Pour BDD métier : Scénarios avec Given/When/Then (format Gherkin en français)
    6. **Valider le plan de test avec l'utilisateur avant de continuer**
  - Les scénarios Gherkin expriment les intentions métier et sont lisibles par les non-développeurs
  - **Accent fort sur l'expression du métier** : Le code doit exprimer l'intention métier de manière explicite
  - Les intentions doivent être "dans le code source" pour faciliter la compréhension et la maintenance

- **Clean Code** :
  - Respecter les principes SOLID
  - Éviter la duplication
  - Utiliser des noms explicites et en français pour le domaine métier
  - Code documenté avec commentaires pour les logiques complexes
  - Ne pas ajouter dans les commentaires des contraintes décrites dans la DOD
  - Documentation pédagogique : Les commentaires dans le code doivent expliquer surtout le "pourquoi" et pas seulement le "comment"
  - Composants purs et simples avec responsabilités uniques (Single Responsibility Principle)
  - Pas de code mort : suppression des composants et fichiers inutilisés

- **TDD (Test-Driven Development) - PRIORITÉ ABSOLUE** :
  - **Règle stricte** : **TESTS D'ABORD, CODE ENSUITE**
  - **Objectif du TDD** : Le TDD n'est **pas** une métrique de couverture, mais une **discipline de développement** qui vise à faire émerger le code le plus simple possible.
  - **Outils d'enforcement** (optionnels mais recommandés) :
    - **TDD Guard** (https://github.com/nizos/tdd-guard) : Outil open source qui empêche de commencer à coder avant d'avoir un test qui échoue et d'implémenter plus que ce que le test exige
    - **TDD.sh** (https://tdd.sh/) : Outil CLI open source pour pratiquer le TDD selon Kent Beck (red → green → refactor) avec timers pour limiter le temps en phase "red"
  - **Suivre strictement le cycle RED → GREEN → REFACTOR - UN TEST À LA FOIS** :
    - **RED** : Écrire **un seul test** qui échoue (le plus simple possible)
    - **GREEN** : Écrire le **code minimal** pour faire passer ce test (pas plus)
    - **REFACTOR** : Améliorer le code en gardant les tests verts (nommage métier/DDD, lisibilité)
    - **PUIS SEULEMENT** : Passer au test suivant
  - **Règles strictes d'implémentation** :
    - **One test at a time (un test à la fois)** : Ne jamais écrire plusieurs tests en même temps, se concentrer sur un seul comportement à la fois
    - **Smallest possible test first (commencer par le cas le plus simple)** : Toujours commencer par le cas le plus simple possible, progresser incrémentalement
    - **Minimal code (code minimal pour faire passer le test)** : Écrire **juste assez** de code pour faire passer le test, principe YAGNI
    - **Refactor after each green (refactoriser après chaque test vert)** : Toujours refactoriser après chaque test vert avant de passer au suivant
  - **Couverture de code à 90%** :
    - La couverture doit être maintenue à **90% minimum** sur tous les critères (lignes, statements, functions, branches)
    - Chaque nouveau code doit avoir ses tests unitaires **AVANT** d'être validé
    - Si la couverture descend en dessous de 90%, corriger immédiatement
    - Exécuter `npm test -- --coverage` régulièrement pour vérifier la couverture

##### Processus de développement

- **Validation de la demande** :
  - **Règle absolue** : **NE JAMAIS CODER AVANT VALIDATION COMPLÈTE**
  - **Reformuler la demande** :
    - Reformuler clairement ce que l'utilisateur demande
    - Identifier les ambiguïtés ou les points non clairs
    - **Demander validation explicite** avant de continuer
  - **Distinguer demande fonctionnelle vs technique** :
    - **Demande fonctionnelle/métier** → Suivre le processus complet User Story → Plan de test → Technique → Code
    - **Demande purement technique** (syntaxe, erreur évidente) → Peut passer directement au code
  - **Éviter la complexité inutile** :
    - Quand une demande semble simple, proposer d'abord la solution la plus simple possible
    - Quand une demande semble complexe explorer d'autres stratégies avant de chercher à résoudre : reformuler, découper...
    - Ne pas gérer tous les cas possibles s'ils ne sont pas demandés
    - Si la demande est ambiguë, demander clarification avant de proposer une solution

- **Approche technique (pour demandes fonctionnelles)** :
  - **Processus obligatoire** :
    1. Expliquer comment je compte m'y prendre techniquement
    2. Lister les tâches techniques que je vais réaliser
    3. **Discuter avec l'utilisateur de l'approche avant de coder**

- **Choix autonomes importants** :
  - Pour les choix de design/structure importants :
    - Proposer plusieurs options ou demander validation explicite
    - Ne pas faire de choix autonomes sur des éléments critiques (icônes, structure, architecture)

##### Vérifications et qualité

- **Linters** :
  - Après chaque modification de code :
    - Lancer `read_lints` sur les fichiers modifiés
    - Corriger automatiquement les erreurs de linting si évidentes
    - Signaler les erreurs non évidentes à l'utilisateur

- **Build** :
  - Après modifications importantes :
    - Lancer `npm run build` pour vérifier que le projet compile
    - Si erreur de build, corriger avant de publier
    - Ne pas publier si le build échoue

- **Tests** :
  - Après chaque modification :
    - Lancer les tests pertinents (pas tous les tests à chaque modification)
    - Vérifier que tous les tests passent
    - Vérifier la couverture de code

- **Collecte des métriques** :
  - Lors de chaque build, lancer automatiquement `npm run metrics:collect` pour collecter les métriques
  - Les métriques doivent être collectées et stockées dans `public/metrics/`
  - L'historique des métriques doit être maintenu pour suivre l'évolution

##### Communication

- **Communication en français** :
  - Toutes les communications avec l'utilisateur :
    1. Toujours en français
    2. Explications pédagogiques pour les concepts techniques
    3. Citations de code avec le format `startLine:endLine:filepath`

- **Gestion des erreurs** :
  - En cas d'erreur :
    1. **Identifier d'abord le problème métier/fonctionnel** avant de proposer une solution technique
    2. Analyser l'erreur complètement avant de proposer une solution
    3. Ne pas faire de corrections multiples en parallèle sans comprendre la cause
    4. Proposer une solution simple avant une solution complexe
    5. Si plusieurs tentatives échouent, proposer de repartir de zéro avec User Story → Plan de test → TDD

- **Amélioration des ajustements CSS** :
  - Pour éviter les aller-retours longs sur les ajustements CSS :
    1. Demander plus de précisions (screenshots, mesures, descriptions détaillées)
    2. Suggérer d'utiliser les outils de développement du navigateur pour identifier précisément les styles
    3. Faire des modifications incrémentales avec pauses pour feedback (sans forcément relancer les tests et/ou publier à chaque fois)

##### Outils et automatisation

- **Arbitrages techniques du projet** :
  - **IDE** : Cursor
  - **Langage** : TypeScript
  - **Frontend** : Next.js
  - **Gestion du code** : GitHub
  - **TDD** : Jest
  - **BDD** : Cucumber.js
  - **Hébergement** : Vercel

- **Git** :
  - Utiliser **GitHub** pour gérer l'historique du code
  - **Historique clair** : Les commits doivent avoir des messages descriptifs et suivre une logique cohérente
  - Après chaque modification validée :
    1. `git add -A` pour ajouter tous les changements
    2. `git commit -m "Message descriptif"` avec un message clair
    3. `git push` pour publier sur GitHub
  - **Exception** : Si l'utilisateur demande explicitement de ne pas publier, ne pas le faire

- **CI/CD - Principes non négociables** :
  - Le code doit être **versionné, testé et déployable**
  - **Déploiement rapide** dans un environnement accessible à des utilisateurs réels (testeurs, amis, tiers)
  - **Itérations courtes** et **feedback rapide**
  - Les tests doivent passer avant chaque déploiement
  - Le build doit être vérifié avant publication (voir section "Build")

- **Recherche dans le codebase** :
  - Avant de modifier du code :
    1. Utiliser `codebase_search` pour comprendre le contexte
    2. Lire les fichiers pertinents avec `read_file`
    3. Vérifier les tests existants avec `grep` ou `read_file`
    4. Comprendre l'architecture avant de modifier

- **Création de todos pour tâches complexes** :
  - Pour les tâches avec 3+ étapes distinctes :
    1. Créer une liste de todos avec `todo_write`
    2. Marquer les todos comme `in_progress` / `completed` au fur et à mesure
  - Ne pas créer de todos pour les tâches triviales (< 3 étapes)

- **Vérification des dépendances** :
  - Avant d'ajouter une nouvelle dépendance :
    1. Vérifier si une solution native existe
    2. Vérifier la compatibilité avec les versions actuelles
    3. Proposer l'ajout dans `package.json` avec justification

##### Comportements à NE PAS faire automatiquement

- **Création de fichiers de documentation** :
  - Ne pas créer de fichiers `.md` de documentation sauf demande explicite

- **Modification de fichiers non demandés** :
  - Ne modifier que les fichiers explicitement mentionnés ou nécessaires pour la tâche

- **Exécution de tous les tests** :
  - Ne pas lancer tous les tests à chaque modification, seulement les tests pertinents

- **Refactorisation sans demande** :
  - Boy Scoot : quand on repasse sur du code qui ne respecte pas la DOD on ne repart pas sans nettoyer en passant

##### Modifications incrémentales

- **Règle** : Pour permettre l'interruption facile :
  - Faire des changements par petits pas
  - Avec pauses entre chaque étape pour permettre feedback
  - Ne pas tout modifier d'un coup

---

#### RÉSUMÉ DES PRIORITÉS ABSOLUES

**À respecter en TOUTE CIRCONSTANCE** :

1. ✅ **NE JAMAIS CODER AVANT VALIDATION COMPLÈTE** (Validation de la demande)
2. ✅ **TESTS D'ABORD, CODE ENSUITE** - TDD strict avec couverture 90% minimum (TDD)
3. ✅ **JOURNAL DE BORD TOUJOURS À JOUR** - Après chaque modification (Journal de bord)
4. ✅ **RESPECTER LE DOD** - Vérifier avant chaque action que le DOD est respecté
