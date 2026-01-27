# Plan d'action - Tests en échec - 2026-01-27

## 📊 État des lieux

4 tests en échec identifiés :
1. `e2e-ids-coverage.integration.test.ts` - 6 e2eID non testés (76% couverture)
2. `e2e-ids-detection.integration.test.ts` - 7 éléments sans e2eID détectés
3. `GroupeBoutons.test.tsx` - Erreur jsdom avec window.location
4. `Footer.test.tsx` - Warnings act() (test passe mais warnings)

---

## 1. e2e-ids-coverage.integration.test.ts

### 🔍 Problème
6 e2eID non testés dans le scénario E2E :
- `profil-coo.json → contenu[0]` (video)
- `profil-coo.json → contenu[9]` (callToAction)
- `profil-cpo.json → contenu[0]` (video)
- `profil-cpo.json → contenu[9]` (callToAction)
- `profil-cto.json → contenu[0]` (video)
- `profil-cto.json → contenu[10]` (callToAction)

**Couverture actuelle : 76% (19/25)**

### 💡 Préconisation
**ADAPTER LE TEST E2E** - Le test E2E ne parcourt que la page d'accueil (`/`), mais ces e2eID sont sur les pages de profil (`/profil/coo`, `/profil/cpo`, `/profil/cto`).

### ✅ Plan d'action
1. **Vérifier** que les pages de profil sont accessibles et contiennent bien ces éléments
2. **Ajouter** des étapes dans `parcours-complet-liens.spec.ts` pour visiter :
   - `/profil/coo` et tester les e2eID manquants
   - `/profil/cpo` et tester les e2eID manquants
   - `/profil/cto` et tester les e2eID manquants
3. **Vérifier** que le script de génération du test E2E inclut bien toutes les pages

**Priorité : HAUTE** - C'est un test de couverture important

---

## 2. e2e-ids-detection.integration.test.ts

### 🔍 Problème
7 éléments interactifs sans e2eID détectés dans les JSON :
- `profil-agile.json → contenu[12]` (callToAction)
- `profil-coo.json → contenu[0]` (video)
- `profil-coo.json → contenu[9]` (callToAction)
- `profil-cpo.json → contenu[0]` (video)
- `profil-cpo.json → contenu[9]` (callToAction)
- `profil-cto.json → contenu[0]` (video)
- `profil-cto.json → contenu[10]` (callToAction)

Un fichier `e2e-ids-pending.json` a été généré pour arbitrer chaque élément.

### 💡 Préconisation
**ARBITRER CHAQUE ÉLÉMENT** - Ces éléments doivent avoir un e2eID pour être testables en E2E.

### ✅ Plan d'action
1. **Ouvrir** `e2e-ids-pending.json`
2. **Pour chaque élément**, décider :
   - `"action": "add"` → Générer un e2eID automatiquement (recommandé pour tous ces éléments)
   - `"action": "null"` → Exclure explicitement (seulement si élément non testable)
3. **Relancer** le test : `npm test -- tests/integration/e2e-ids-detection.integration.test.ts`
4. Le système générera automatiquement les e2eID et mettra à jour les JSON

**Priorité : HAUTE** - Nécessaire pour compléter la couverture E2E

**Note** : Ces éléments sont les mêmes que ceux manquants dans le test de couverture (point 1), donc une fois les e2eID générés, il faudra aussi mettre à jour le test E2E.

---

## 3. GroupeBoutons.test.tsx

### 🔍 Problème
Erreur jsdom : `Error: Not implemented: navigation (except hash changes)`

Le test essaie de modifier `window.location` :
```typescript
delete (window as any).location;
(window as any).location = { hostname: 'localhost' };
```

jsdom ne supporte pas la modification de `window.location` car cela déclencherait une navigation.

### 💡 Préconisation
**ADAPTER LE TEST** - Utiliser un mock plus approprié pour `window.location` qui ne déclenche pas de navigation.

### ✅ Plan d'action
1. **Remplacer** la modification directe de `window.location` par un mock avec `Object.defineProperty`
2. **Utiliser** `jest.spyOn` pour mocker `window.location.hostname` sans déclencher de navigation
3. **Alternative** : Utiliser `jsdom-global` ou `@testing-library/user-event` si nécessaire

**Exemple de solution** :
```typescript
// Au lieu de :
delete (window as any).location;
(window as any).location = { hostname: 'localhost' };

// Utiliser :
Object.defineProperty(window, 'location', {
  value: { hostname: 'localhost' },
  writable: true,
});
```

**Priorité : MOYENNE** - Le test échoue mais c'est un problème technique de mock, pas un bug fonctionnel

---

## 4. Footer.test.tsx

### 🔍 Problème
Warnings React `act()` :
```
An update to Footer inside a test was not wrapped in act(...).
```

Le composant `Footer` fait un `fetch` dans `useEffect` qui met à jour l'état `version`, mais le test ne wrappe pas cette mise à jour dans `act()`.

### 💡 Préconisation
**ADAPTER LE TEST** - Wrapper le rendu dans `act()` ou utiliser `waitFor` pour attendre la mise à jour asynchrone.

### ✅ Plan d'action
1. **Option 1** : Wrapper le rendu dans `act()` :
   ```typescript
   import { act } from '@testing-library/react';
   
   await act(async () => {
     render(<Footer />);
   });
   ```

2. **Option 2** : Utiliser `waitFor` pour attendre la mise à jour :
   ```typescript
   import { waitFor } from '@testing-library/react';
   
   render(<Footer />);
   await waitFor(() => {
     expect(screen.getByText(/v\d+\.\d+\.\d+/)).toBeInTheDocument();
   });
   ```

3. **Option 3** : Mocker le fetch pour qu'il soit synchrone dans les tests

**Priorité : BASSE** - Le test passe, ce sont juste des warnings. Mais c'est une bonne pratique de les corriger.

---

## 📋 Ordre d'exécution recommandé

1. **Étape 1** : Corriger `e2e-ids-detection.integration.test.ts` (point 2)
   - Arbitrer les éléments dans `e2e-ids-pending.json`
   - Générer les e2eID manquants
   - ✅ Test passe

2. **Étape 2** : Corriger `e2e-ids-coverage.integration.test.ts` (point 1)
   - Ajouter les pages de profil dans le test E2E
   - Tester les nouveaux e2eID générés
   - ✅ Test passe

3. **Étape 3** : Corriger `GroupeBoutons.test.tsx` (point 3)
   - Adapter le mock de `window.location`
   - ✅ Test passe

4. **Étape 4** : Corriger `Footer.test.tsx` (point 4)
   - Wrapper dans `act()` ou utiliser `waitFor`
   - ✅ Warnings disparaissent

---

## 🎯 Résultat attendu

Après correction de tous les points :
- ✅ Tous les tests passent
- ✅ Couverture E2E à 100%
- ✅ Aucun warning React
- ✅ Tous les éléments interactifs ont un e2eID

---

## 📝 Notes

- Les points 1 et 2 sont liés : les mêmes éléments manquent des e2eID ET ne sont pas testés en E2E
- Le point 3 est un problème technique de mock jsdom, pas un bug fonctionnel
- Le point 4 est une amélioration de qualité (warnings), pas un échec de test
