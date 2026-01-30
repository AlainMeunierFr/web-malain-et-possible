# US-5.3 : Correction des fichiers JSON non conformes ✅ COMPLÉTÉ
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