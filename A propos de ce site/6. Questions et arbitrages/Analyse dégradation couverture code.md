### Analyse de la dégradation de la couverture de code

#### Problèmes identifiés

##### 1. Tests qui échouent

**Problème** : Des tests référencent des fonctions qui n'existent pas dans le code source.

**Exemple** :
- `tests/unit/indexReader.test.ts` et `tests/unit/videoDetournementJson.test.ts` référencent `readDetournementsVideo()` qui n'existe pas dans `utils/indexReader.ts`
- `tests/unit/indexReader.test.ts` teste la résolution de références externes pour témoignages et détournements, mais les tests échouent car la logique n'est pas complète

**Impact** : Tests qui échouent = couverture non calculée correctement = dégradation apparente de la couverture.

##### 2. Tests dans le dossier `continue/`

**Problème** : Des tests dans le dossier `continue/` échouent (problèmes de dépendances, `TextDecoder` non défini, etc.).

**Impact** : Ces échecs peuvent affecter le calcul global de la couverture si le dossier n'est pas correctement exclu.

##### 3. DOD non respectée

**Règle DOD** (DOD - Équipe.md, ligne 111-115) :
- **Couverture de code à 90%** : La couverture doit être maintenue à **90% minimum** sur tous les critères (lignes, statements, functions, branches)
- **Si la couverture descend en dessous de 90%, corriger immédiatement**

**État actuel** : La couverture s'est dégradée, ce qui indique que la DOD n'est pas respectée.

---

#### Actions correctives nécessaires

##### 1. Corriger les tests qui échouent

**Action immédiate** :
1. Supprimer ou corriger les tests qui référencent `readDetournementsVideo()` si cette fonction n'est pas nécessaire
2. Ou implémenter `readDetournementsVideo()` si elle est nécessaire
3. Corriger les tests de résolution de références externes pour témoignages et détournements

**Priorité** : Haute (bloque le calcul correct de la couverture)

##### 2. Exclure le dossier `continue/` de la couverture

**Action** : Vérifier que `jest.config.js` exclut bien le dossier `continue/` de la collecte de couverture.

**Vérification** :
```javascript
collectCoverageFrom: [
  'components/**/*.{ts,tsx}',
  'utils/**/*.{ts,tsx}',
  '!**/*.d.ts',
  '!**/*.test.{ts,tsx}',
  '!**/node_modules/**',
  '!**/continue/**', // ← Vérifier que cette ligne existe
],
```

**Priorité** : Moyenne (affecte le calcul de couverture mais ne bloque pas les tests)

##### 3. Vérifier la couverture réelle

**Action** : Exécuter les tests avec couverture en excluant les dossiers problématiques pour obtenir la couverture réelle du code du projet (hors `continue/`).

**Commande** :
```bash
npm test -- --coverage --collectCoverageFrom="utils/**/*.ts" --collectCoverageFrom="components/**/*.{ts,tsx}" --collectCoverageFrom="!**/continue/**" --collectCoverageFrom="!**/node_modules/**"
```

**Priorité** : Haute (nécessaire pour connaître l'état réel)

##### 4. Corriger la couverture si < 90%

**Action** : Si la couverture réelle est < 90%, ajouter les tests manquants selon la DOD :
- TDD strict : Tests écrits AVANT le code
- Progression du simple au complexe
- Couverture complète (cas normaux, cas limites, cas d'erreur)

**Priorité** : Haute (exigence DOD)

---

#### Plan d'action recommandé

##### Phase 1 : Diagnostic (immédiat)

1. ✅ Exclure `continue/` de la collecte de couverture si ce n'est pas déjà fait
2. ✅ Corriger les tests qui échouent (`readDetournementsVideo`, résolution références externes)
3. ✅ Exécuter les tests avec couverture pour obtenir la couverture réelle

##### Phase 2 : Correction (si couverture < 90%)

1. Identifier les fichiers `utils/` avec faible couverture
2. Pour chaque fichier :
   - Vérifier qu'il y a un fichier de test correspondant
   - Si non, créer le fichier de test selon TDD strict
   - Si oui, compléter les tests pour atteindre 90% minimum

##### Phase 3 : Prévention

1. Ajouter une vérification automatique de couverture dans le workflow CI/CD
2. Bloquer les merges si couverture < 90%
3. Ajouter un rappel dans la DOD pour vérifier la couverture avant chaque commit

---

#### Respect de la DOD

**Règle DOD - Back-End** (ligne 81-85) :
> Tests unitaires (TDD) obligatoires pour **TOUTES** les fonctions backend pur : Chaque fonction exportée dans `utils/` doit avoir des tests unitaires complets

**Vérification nécessaire** :
- Lister toutes les fonctions exportées dans `utils/`
- Vérifier qu'il existe un fichier de test correspondant pour chacune
- Vérifier que chaque fonction a une couverture de tests complète

**Fonctions exportées dans `utils/`** (à vérifier) :
- `utils/indexReader.ts` : `convertirIndexDataEnPageData`, `readIndexData`, `readPageData`, `readDomaineData`
- `utils/aboutSiteReader.ts` : (à vérifier)
- `utils/buttonHandlers.ts` : (à vérifier)
- `utils/e2eIdCounter.ts` : (à vérifier)
- `utils/e2eIdDetector.ts` : (à vérifier)
- `utils/e2eIdGenerator.ts` : (à vérifier)
- `utils/e2eIdInventory.ts` : (à vérifier)
- `utils/e2eMetricsCollector.ts` : (à vérifier)
- `utils/journalMarkdownParser.ts` : (à vérifier)
- `utils/journalReader.ts` : (à vérifier)
- `utils/markdownFormatter.ts` : (à vérifier)
- `utils/markdownParser.ts` : (à vérifier)
- `utils/markdownTitleAdjuster.ts` : (à vérifier)
- `utils/passwordUtils.ts` : (à vérifier)
- `utils/siteMapGenerator.ts` : (à vérifier)

---

#### Conclusion

La dégradation de la couverture de code est due à :
1. Des tests qui échouent (fonctions manquantes, logique incomplète)
2. Possible inclusion du dossier `continue/` dans le calcul de couverture
3. Non-respect de la DOD (couverture < 90%)

**Actions immédiates** :
1. Corriger les tests qui échouent
2. Vérifier l'exclusion de `continue/` dans `jest.config.js`
3. Obtenir la couverture réelle du code du projet
4. Corriger la couverture si < 90% selon la DOD

**Prévention** :
- Ajouter une vérification automatique de couverture dans CI/CD
- Bloquer les merges si couverture < 90%
- Rappel dans la DOD pour vérifier la couverture avant chaque commit
