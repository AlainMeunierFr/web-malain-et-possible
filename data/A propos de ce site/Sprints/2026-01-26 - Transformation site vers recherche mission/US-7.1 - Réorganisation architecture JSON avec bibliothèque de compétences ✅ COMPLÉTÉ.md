# US-7.1 : Réorganisation architecture JSON avec bibliothèque de compétences ✅ COMPLÉTÉ

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