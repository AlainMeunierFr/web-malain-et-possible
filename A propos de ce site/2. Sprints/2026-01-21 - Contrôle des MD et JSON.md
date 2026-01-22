### Sprint Goal
Garantir la qualité et la cohérence des fichiers Markdown et JSON du projet en ajoutant des tests d'intégration qui détectent les erreurs de structure et de contenu avant qu'elles ne causent des bugs au runtime.

#### US-5.1 : Extension des tests d'intégration pour tous les fichiers Markdown ✅ COMPLÉTÉ
- **En tant que** Développeur
- **Je souhaite** Avoir des tests d'intégration qui valident TOUS les fichiers Markdown dans "A propos de ce site"
- **Afin de** Détecter les erreurs de structure (H1/H2 interdits, formatage incorrect) avant qu'elles ne causent des problèmes au runtime

- **Critères d'acceptation** :

- **Validation existante à maintenir** :
  - Le test `aboutSiteReader.integration.test.ts` valide déjà tous les MD et détecte les H1/H2 interdits
  - Cette validation doit continuer à fonctionner

- **Extension de la validation** :
  - Vérifier que tous les fichiers MD peuvent être parsés sans erreur
  - Vérifier qu'aucun fichier MD n'est vide
  - Vérifier que les fichiers respectent l'encodage UTF-8
  - Compter le nombre de fichiers MD validés (doit être > 0)

- **Gestion des erreurs** :
  - Si un fichier contient un H1 ou H2 → Test échoue avec message explicite indiquant le fichier et la ligne
  - Si un fichier ne peut pas être lu → Test échoue avec message explicite
  - Tous les fichiers MD doivent passer la validation pour que le test soit vert

- **Couverture** :
  - Test d'intégration existant : `tests/unit/aboutSiteReader.integration.test.ts`
  - Parcours récursif de tous les sous-dossiers dans "A propos de ce site"
  - Exclusion de `node_modules` et `.next`

#### US-5.2 : Tests d'intégration pour valider tous les fichiers JSON du dossier data/ ✅ COMPLÉTÉ
- **En tant que** Développeur
- **Je souhaite** Avoir des tests d'intégration qui valident tous les fichiers JSON dans le dossier `data/`
- **Afin de** Détecter les erreurs de structure, de syntaxe et les types inconnus avant qu'ils ne causent des bugs au runtime

- **Critères d'acceptation** :

- **Validation de base** :
  - Lire tous les fichiers JSON dans `data/` (non récursif, uniquement les fichiers à la racine)
  - Vérifier que chaque fichier peut être parsé sans erreur (`JSON.parse` réussit)
  - Vérifier qu'aucun fichier JSON n'est vide
  - Compter le nombre de fichiers JSON validés (doit être ≥ 10)

- **Validation des types de contenu** :
  - Pour chaque fichier JSON contenant un champ `contenu` de type Array
  - Pour chaque élément du tableau `contenu` ayant un champ `type`
  - Extraire la valeur du champ `type`
  - Vérifier que ce type est **connu de l'application**
  - Types connus = types gérés dans le `switch` de `PageContentRenderer.tsx` :
    - `'titre'`
    - `'video'`
    - `'texteLarge'`
    - `'domaineDeCompetence'`
    - `'callToAction'`
    - `'groupeBoutons'`
    - `'temoignages'`
    - `'videoDetournement'`

- **Détection des types inconnus** :
  - Si un type trouvé dans un JSON n'est PAS dans la liste des types connus
  - Le test échoue avec un message explicite :
    - Nom du fichier JSON
    - Type inconnu trouvé
    - Index de l'élément dans le tableau `contenu`
  - Message d'erreur : `"Type inconnu '{type}' trouvé dans {filename} à l'index {index}. Actions possibles : 1) Supprimer l'objet du JSON, 2) Implémenter le type dans PageContentRenderer"`

- **Validation des structures imbriquées** :
  - Pour les types complexes comme `domaineDeCompetence`, valider la présence des champs obligatoires :
    - `titre` (string)
    - `items` (array)
  - Pour `temoignages` et `videoDetournement`, accepter soit `items` soit `source`
  - Si un champ obligatoire manque → Test échoue avec message explicite

- **Rapport de validation** :
  - Afficher le nombre total de fichiers JSON validés
  - Afficher le nombre total d'éléments de contenu analysés
  - Afficher la liste des types trouvés et leur fréquence
  - Exemple de rapport :
    ```
    ✓ 10 fichiers JSON validés
    ✓ 45 éléments de contenu analysés
    ✓ Types trouvés : titre (12), texteLarge (8), domaineDeCompetence (5), callToAction (10), video (3), ...
    ```

- **Gestion des erreurs** :
  - Le test continue même si un fichier échoue (pour afficher toutes les erreurs d'un coup)
  - À la fin, si au moins un fichier a échoué → Test échoue avec le récapitulatif de toutes les erreurs

- **Fichier de test** :
  - Créer `tests/integration/jsonValidation.integration.test.ts`
  - Utiliser `fs` réel (non mocké) pour lire les vrais fichiers du projet

#### US-5.3 : Correction des fichiers JSON non conformes ✅ COMPLÉTÉ
- **En tant que** Développeur
- **Je souhaite** Corriger tous les fichiers JSON qui ne passent pas les tests de validation
- **Afin de** Garantir que tous les JSON sont conformes et ne causeront pas de bugs au runtime

- **Critères d'acceptation** :

- **Identifier les fichiers non conformes** :
  - Lancer les tests d'intégration créés dans US-4.2
  - Lister tous les fichiers JSON avec erreurs de validation

- **Actions de correction** :
  - Pour chaque type inconnu trouvé dans un JSON :
    - **Option 1** : Supprimer l'objet du JSON si le type n'est plus utilisé
    - **Option 2** : Implémenter le type dans `PageContentRenderer.tsx` si le type doit être supporté
  - Pour chaque erreur de structure (champ manquant, mauvais type) :
    - Corriger la structure du JSON pour respecter l'interface TypeScript correspondante

- **Cas spécifique : portfolio-detournements.json** :
  - Le fichier contient deux clés différentes : `"détournement-original"` et `"détournements"`
  - Choisir la bonne clé (probablement `"détournements"`) et supprimer l'autre
  - Vérifier que la structure correspond à l'interface `DetournementVideo[]`

- **Validation finale** :
  - Relancer les tests d'intégration
  - Tous les tests doivent être verts (100% des fichiers JSON valides)
  - Aucun type inconnu ne doit être trouvé

- **Documentation** :
  - Si des types ont été supprimés, documenter la raison dans le commit
  - Si des types ont été ajoutés à `PageContentRenderer`, créer les composants React correspondants

#### US-5.4 : Intégration des tests de validation dans le workflow CI/CD ✅ COMPLÉTÉ
- **En tant que** Lead Developer
- **Je souhaite** Que les tests de validation MD/JSON soient exécutés automatiquement lors des builds
- **Afin de** Bloquer les merges et les déploiements si des fichiers non conformes sont détectés

- **Critères d'acceptation** :

- **Intégration dans les scripts npm** :
  - Les tests d'intégration (MD et JSON) sont déjà dans le dossier `tests/integration/`
  - Ils sont exécutés automatiquement lors de `npm test`
  - Pas de script séparé nécessaire

- **Blocage du build** :
  - Si un test d'intégration échoue → `npm test` retourne un code d'erreur
  - Le build (`npm run build`) doit échouer si les tests échouent
  - Vérifier que le workflow CI/CD (GitHub Actions, Vercel, etc.) exécute bien `npm test` avant le build

- **Rapport d'erreur clair** :
  - En cas d'échec, le développeur doit voir immédiatement :
    - Quel fichier JSON/MD a échoué
    - Quelle erreur a été détectée
    - Comment la corriger (message explicite)

- **Exceptions** :
  - Aucune exception : tous les fichiers MD et JSON doivent être valides à 100%
  - Si un fichier doit temporairement contenir un type non supporté, créer d'abord le support dans l'app avant de l'ajouter au JSON

- **Documentation** :
  - Mettre à jour le README du projet pour expliquer :
    - Comment exécuter les tests de validation localement
    - Comment interpréter les erreurs
    - Comment ajouter un nouveau type de contenu (étapes : 1. TypeScript interface, 2. PageContentRenderer switch, 3. Composant React, 4. Tests)

