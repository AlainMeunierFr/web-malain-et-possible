# US-5.2 : Tests d'intégration pour valider tous les fichiers JSON du dossier data/ ✅ COMPLÉTÉ
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