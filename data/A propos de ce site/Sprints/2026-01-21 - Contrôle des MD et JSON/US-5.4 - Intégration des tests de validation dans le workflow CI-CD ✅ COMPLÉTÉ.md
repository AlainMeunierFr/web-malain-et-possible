# US-5.4 : Intégration des tests de validation dans le workflow CI/CD ✅ COMPLÉTÉ
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