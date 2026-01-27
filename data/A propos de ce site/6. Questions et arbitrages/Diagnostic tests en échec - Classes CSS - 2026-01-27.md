### Diagnostic des tests en échec - Classes CSS - 2026-01-27

**Contexte** : Refactorisation CSS vers une feuille de style globale (`app/content-styles.css`) pour chaque TypeDeContenu. Les tests n'ont pas été mis à jour en même temps.

#### Tests avec classes CSS incorrectes

**1. tests/unit/CallToAction.test.tsx**
- **Problème** : Test attend `callToActionContainer` et `callToActionButton`
- **Réalité** : Composant utilise `callToAction` (ligne 11) et `bouton` (ligne 14)
- **CSS global** : `.callToAction` défini dans `app/content-styles.css` ligne 327
- **Action** : Corriger les assertions pour utiliser `callToAction` et `bouton`

**2. tests/unit/Titre.test.tsx**
- **Problème** : Test attend `titreContainer`
- **Réalité** : Composant utilise `titre` (ligne 15)
- **CSS global** : `.titre` défini dans `app/content-styles.css` ligne 9
- **Action** : Corriger l'assertion pour utiliser `titre`

**3. tests/unit/TexteLarge.test.tsx**
- **Problème** : Test attend `texteLargeContainer` (2 occurrences)
- **Réalité** : Composant utilise `texteLarge` (ligne 30)
- **CSS global** : `.texteLarge` défini dans `app/content-styles.css` ligne 98
- **Action** : Corriger les assertions pour utiliser `texteLarge`

**4. tests/unit/Temoignages.test.tsx**
- **Problème** : Test attend `container`
- **Réalité** : Composant utilise `temoignages` (ligne 33)
- **CSS global** : `.temoignages` défini dans `app/content-styles.css` ligne 577
- **Action** : Corriger l'assertion pour utiliser `temoignages`

#### Tests avec problème de contexte React

**5. tests/unit/PageContentRenderer.test.tsx**
- **Problème** : `usePageTitle must be used within a PageTitleProvider`
- **Cause** : Le composant `PageContentRenderer` utilise `usePageTitle()` (ligne 26) qui nécessite un `PageTitleProvider`
- **Action** : Envelopper les tests avec `<PageTitleProvider>` depuis `contexts/PageTitleContext.tsx`

#### Tests à vérifier (non testés dans cette session)

- `tests/unit/Video.test.tsx` : À vérifier si les classes CSS sont correctes
- `tests/unit/GroupeBoutons.test.tsx` : À vérifier si les classes CSS sont correctes
- `tests/unit/Header.test.tsx` : À vérifier
- `tests/unit/VideoDetournement.test.tsx` : À vérifier si les classes CSS sont correctes

#### Plan d'action

1. **Corriger les classes CSS dans les tests** :
   - CallToAction : `callToActionContainer` → `callToAction`, `callToActionButton` → `bouton` ✅
   - Titre : `titreContainer` → `titre` ✅
   - TexteLarge : `texteLargeContainer` → `texteLarge` (2 occurrences) ✅
   - Temoignages : `container` → `temoignages` ✅
   - Video : `videoContainer` → `video` ✅

2. **Ajouter PageTitleProvider dans les tests** :
   - PageContentRenderer.test.tsx : Ajout de `PageTitleProvider` ✅
   - Header.test.tsx : Ajout de `PageTitleProvider` (en plus de `EditingProvider`) ✅

3. **Corriger les autres problèmes** :
   - PageContentRenderer.test.tsx : `competences: []` → `items: []` pour domaineDeCompetence ✅

#### Résultat

✅ **Tous les tests corrigés passent maintenant** :
- CallToAction.test.tsx : 4/4 tests passent
- Titre.test.tsx : 2/2 tests passent
- TexteLarge.test.tsx : 3/3 tests passent
- Temoignages.test.tsx : 6/6 tests passent
- PageContentRenderer.test.tsx : 9/9 tests passent
- Video.test.tsx : 9/9 tests passent
- Header.test.tsx : 9/9 tests passent

**Note** : GroupeBoutons.test.tsx a un problème avec `window.location` (limitation jsdom), pas un problème de classe CSS.
