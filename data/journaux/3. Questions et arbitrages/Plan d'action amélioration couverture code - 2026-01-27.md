# Plan d'action - Amélioration de la couverture de code à 90%

## 📊 État actuel

**Couverture actuelle (après analyse) :**
- **Statements** : 72.32% → Objectif : 90% (écart : +17.68%)
- **Branches** : 61.1% → Objectif : 90% (écart : +28.9%) ⚠️ **PRIORITÉ**
- **Functions** : 71.42% → Objectif : 90% (écart : +18.58%)
- **Lines** : 72.19% → Objectif : 90% (écart : +17.81%)

**Problème principal :** Les **Branches** sont en orange (61.1%), c'est le point le plus faible.

## 🎯 Objectif

Atteindre **90% de couverture** pour les **4 types** de métriques :
- Statements
- Branches (priorité absolue)
- Functions
- Lines

## 🔍 Diagnostic : Pourquoi les branches sont faibles ?

Les branches correspondent aux conditions (if/else, switch, ternaires, etc.). Une couverture faible signifie que :
1. **Branches `else` non testées** : Seule la branche `true` est testée, pas la branche `false`
2. **Cas limites non couverts** : Conditions avec valeurs null/undefined/empty non testées
3. **Switch cases manquants** : Certains `case` ne sont jamais exécutés
4. **Ternaires non exhaustifs** : `condition ? true : false` - seule une branche testée
5. **Gestion d'erreurs** : `try/catch` avec seulement le `try` testé, pas le `catch`

## 📋 Plan d'action par priorité

### Phase 1 : Diagnostic détaillé (1-2h)

#### 1.1. Identifier les fichiers avec la couverture de branches la plus faible
```bash
# Générer le rapport de couverture
npm test -- --coverage

# Analyser le rapport HTML
# Ouvrir coverage/lcov-report/index.html dans le navigateur
# Trier par "Branches" (croissant)
```

#### 1.2. Lister les fichiers critiques
- Analyser `coverage/coverage-summary.json` pour identifier les fichiers avec < 70% de branches
- Créer une liste priorisée (du plus faible au moins faible)

#### 1.3. Analyser les branches non couvertes
Pour chaque fichier critique :
- Ouvrir le rapport HTML détaillé
- Identifier les lignes avec branches non couvertes (marquées en rouge)
- Lister les conditions non testées

### Phase 2 : Amélioration des branches (priorité absolue) (4-6h)

#### 2.1. Stratégie générale pour améliorer les branches

**A. Tester les branches `else`**
```typescript
// Code source
if (condition) {
  return valueA;
} else {
  return valueB; // ❌ Non testé
}

// Test à ajouter
it('should return valueB when condition is false', () => {
  const result = functionUnderTest(false);
  expect(result).toBe(valueB);
});
```

**B. Tester les cas limites**
```typescript
// Code source
if (value && value.length > 0) {
  return process(value);
} else {
  return defaultValue; // ❌ Non testé (null, undefined, empty)
}

// Tests à ajouter
it('should return defaultValue when value is null', () => {
  expect(functionUnderTest(null)).toBe(defaultValue);
});
it('should return defaultValue when value is undefined', () => {
  expect(functionUnderTest(undefined)).toBe(defaultValue);
});
it('should return defaultValue when value is empty', () => {
  expect(functionUnderTest('')).toBe(defaultValue);
});
```

**C. Tester tous les `case` d'un `switch`**
```typescript
// Code source
switch (type) {
  case 'A': return handleA();
  case 'B': return handleB(); // ❌ Non testé
  case 'C': return handleC(); // ❌ Non testé
  default: return handleDefault(); // ❌ Non testé
}

// Tests à ajouter
it('should handle type B', () => {
  expect(functionUnderTest('B')).toBe(expectedB);
});
it('should handle type C', () => {
  expect(functionUnderTest('C')).toBe(expectedC);
});
it('should handle default case', () => {
  expect(functionUnderTest('unknown')).toBe(expectedDefault);
});
```

**D. Tester les gestionnaires d'erreurs**
```typescript
// Code source
try {
  return riskyOperation();
} catch (error) {
  return handleError(error); // ❌ Non testé
}

// Test à ajouter
it('should handle errors gracefully', () => {
  const mockRiskyOperation = jest.fn().mockImplementation(() => {
    throw new Error('Test error');
  });
  const result = functionUnderTest(mockRiskyOperation);
  expect(result).toBe(expectedErrorValue);
});
```

**E. Tester les ternaires exhaustivement**
```typescript
// Code source
return condition ? valueA : valueB; // ❌ Seule valueA testée

// Tests à ajouter
it('should return valueA when condition is true', () => {
  expect(functionUnderTest(true)).toBe(valueA);
});
it('should return valueB when condition is false', () => {
  expect(functionUnderTest(false)).toBe(valueB);
});
```

#### 2.2. Fichiers prioritaires à traiter

**Fichiers identifiés avec la couverture de branches la plus faible :**

**PRIORITÉ 1 - 0% de couverture (à traiter en premier) :**
1. `components/ListeDesPages.tsx` - 0% branches ⚠️
2. `components/DomaineDeCompetences.tsx` - 0% branches ⚠️
3. `components/Matomo.tsx` - 0% branches ⚠️
4. `components/Tooltip.tsx` - 0% branches ⚠️
5. `components/PasswordModal.tsx` - 0% branches ⚠️
6. `utils/tooltipsConfig.ts` - 0% branches ⚠️

**PRIORITÉ 2 - < 40% de couverture :**
7. `utils/e2eIdFromUrl.ts` - 25% branches
8. `utils/e2eIdGenerator.ts` - 27.9% branches
9. `utils/imagePath.ts` - 33.33% branches
10. `utils/referentialIntegrityChecker.ts` - 36% branches

**PRIORITÉ 3 - Autres fichiers avec conditions complexes :**
- `utils/siteMapGenerator.ts` (beaucoup de conditions)
- `utils/aboutSiteReader.ts` (validation avec conditions)
- `utils/markdownParser.ts` (parsing avec branches)
- `utils/buttonHandlers.ts` (switch/conditions)

#### 2.3. Méthodologie par fichier

Pour chaque fichier prioritaire :
1. **Ouvrir le rapport HTML** : `coverage/lcov-report/index.html`
2. **Identifier les lignes rouges** (branches non couvertes)
3. **Analyser le code source** pour comprendre la condition
4. **Écrire un test** pour couvrir la branche manquante
5. **Vérifier** : `npm test -- --coverage` et vérifier que la branche est maintenant verte
6. **Itérer** jusqu'à atteindre 90% pour ce fichier

### Phase 3 : Amélioration des autres métriques (2-3h)

#### 3.1. Statements (72.32% → 90%)
- Généralement amélioré en même temps que les branches
- Si des statements restent non couverts, ajouter des tests pour les lignes manquantes

#### 3.2. Functions (71.42% → 90%)
- Identifier les fonctions non appelées dans les tests
- Ajouter des tests pour chaque fonction exportée

#### 3.3. Lines (72.19% → 90%)
- Généralement amélioré en même temps que les statements
- Vérifier qu'il n'y a pas de lignes mortes (code jamais exécuté)

### Phase 4 : Validation et maintenance (1h)

#### 4.1. Vérification globale
```bash
npm test -- --coverage
# Vérifier que tous les 4 types sont ≥ 90%
```

#### 4.2. Configuration Jest pour maintenir 90%
Ajouter dans `jest.config.js` :
```javascript
coverageThreshold: {
  global: {
    branches: 90,
    functions: 90,
    lines: 90,
    statements: 90,
  },
},
```

#### 4.3. Intégration CI/CD
- Le build échouera si la couverture < 90%
- Forcer l'amélioration continue

## 🛠️ Outils et commandes utiles

### Générer le rapport de couverture
```bash
npm test -- --coverage
```

### Voir le rapport HTML détaillé
```bash
# Ouvrir dans le navigateur
open coverage/lcov-report/index.html
# ou
start coverage/lcov-report/index.html  # Windows
```

### Analyser un fichier spécifique
```bash
npm test -- --coverage --collectCoverageFrom="utils/siteMapGenerator.ts"
```

### Tester un fichier spécifique
```bash
npm test -- utils/siteMapGenerator.test.ts --coverage
```

### Voir uniquement les fichiers non couverts
```bash
npm test -- --coverage --coverageReporters=text | Select-String -Pattern "0%|Uncovered"
```

## 📝 Checklist d'implémentation

### Pour chaque fichier à améliorer :

- [ ] Ouvrir le rapport HTML de couverture
- [ ] Identifier les branches non couvertes (lignes rouges)
- [ ] Analyser le code source pour comprendre la condition
- [ ] Écrire un test pour couvrir la branche `else` / `false` / `catch` / `default`
- [ ] Exécuter le test : `npm test -- nomDuFichier.test.ts`
- [ ] Vérifier la couverture : `npm test -- --coverage`
- [ ] Vérifier que la branche est maintenant verte dans le rapport HTML
- [ ] Répéter jusqu'à atteindre 90% pour ce fichier

### Validation finale :

- [ ] `npm test -- --coverage` : Tous les 4 types ≥ 90%
- [ ] Ajouter `coverageThreshold` dans `jest.config.js`
- [ ] Vérifier que les tests passent avec le seuil
- [ ] Mettre à jour la documentation si nécessaire

## 🎯 Objectifs intermédiaires

### Sprint 1 (Semaine 1)
- **Objectif** : Branches 61.1% → 75%
- **Actions** : Traiter les 5 fichiers avec la couverture de branches la plus faible
- **Temps estimé** : 4-6h

### Sprint 2 (Semaine 2)
- **Objectif** : Branches 75% → 85%
- **Actions** : Traiter les 10 fichiers suivants
- **Temps estimé** : 4-6h

### Sprint 3 (Semaine 3)
- **Objectif** : Tous les types ≥ 90%
- **Actions** : Finaliser les derniers fichiers, améliorer Statements/Functions/Lines
- **Temps estimé** : 2-3h

## 💡 Bonnes pratiques

1. **Tester les cas limites** : null, undefined, empty string, 0, -1, etc.
2. **Tester les deux branches** : true ET false pour chaque condition
3. **Tester les erreurs** : try/catch, validations, edge cases
4. **Tester tous les cas** : switch avec tous les case + default
5. **Éviter le code mort** : Si une branche ne peut jamais être atteinte, la supprimer ou la documenter

## 📚 Ressources

- [Jest Coverage Documentation](https://jestjs.io/docs/configuration#coveragethreshold-object)
- [Istanbul Coverage Types](https://github.com/istanbuljs/istanbuljs/blob/master/packages/istanbul-lib-coverage/README.md)
- Rapport HTML : `coverage/lcov-report/index.html` (après `npm test -- --coverage`)
