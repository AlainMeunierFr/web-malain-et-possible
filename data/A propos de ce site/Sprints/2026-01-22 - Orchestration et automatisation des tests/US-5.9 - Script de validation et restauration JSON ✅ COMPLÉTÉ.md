# US-5.9 : Script de validation et restauration JSON ✅ COMPLÉTÉ

- **En tant que** Développeur
- **Je souhaite** Avoir un script qui valide les fichiers JSON et restaure automatiquement depuis des backups en cas d'erreur
- **Afin de** Protéger contre les pertes de données et garantir l'intégrité des JSON

- **Critères d'acceptation** :
- **Validation** : Script `scripts/validate-and-restore-json.ts` qui :
  - Valide la syntaxe JSON de tous les fichiers dans `data/`
  - Valide la structure selon les interfaces TypeScript
  - Détecte les types de contenu inconnus
- **Système de backup** : Création automatique de backups (fichiers `*.backup.json`) avant toute modification
- **Restauration automatique** : En cas d'erreur de validation, restauration automatique depuis le backup le plus récent
- **Rapport d'erreur** : Affichage d'un rapport détaillé des erreurs trouvées avec :
  - Nom du fichier
  - Type d'erreur
  - Ligne et colonne de l'erreur
  - Suggestion de correction
- **Intégration** : Le script peut être appelé manuellement ou intégré dans le workflow de développement