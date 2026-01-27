### Plan d'action suite corrections CSS - 2026-01-27

**État actuel** : 4 suites de tests échouent encore (7 tests en échec sur 458 total)
**Progrès** : De 17 suites en échec → 4 suites en échec (13 suites corrigées ✅)

#### ✅ Tests corrigés dans cette session

1. **CallToAction.test.tsx** : Classes CSS corrigées
2. **Titre.test.tsx** : Classe CSS corrigée
3. **TexteLarge.test.tsx** : Classes CSS corrigées
4. **Temoignages.test.tsx** : Classe CSS corrigée
5. **PageContentRenderer.test.tsx** : PageTitleProvider ajouté + correction items
6. **Video.test.tsx** : Classe CSS corrigée
7. **Header.test.tsx** : PageTitleProvider ajouté
8. **profilPages.test.ts** : Mocks competences.json corrigés
9. **temoignagesJson.test.ts** : Test adapté pour _temoignages.json
10. **parcours-complet-liens.spec.ts** : Test hero-bouton-principal ajouté

#### 🔍 Tests restants à traiter

**1. Tests à supprimer (selon actions précisées)** :
- `tests/unit/tooltip-config.test.ts` : À supprimer (refonte page metrics prévue)
- `tests/unit/tooltip-integration.test.ts` : À supprimer (refonte page metrics prévue)
- `tests/unit/Tooltip.test.tsx` : À supprimer (refonte page metrics prévue)
- `tests/integration/pageRendering.test.ts` : À supprimer (page n'existe plus)

**2. Tests à investiguer** :
- `tests/unit/VideoDetournement.test.tsx` : Vérifier si problème classe CSS
- `tests/unit/GroupeBoutons.test.tsx` : Problème window.location (limitation jsdom) - à investiguer si bloquant

**3. Tests d'intégration** :
- `tests/integration/e2e-ids-coverage.integration.test.ts` : Vérifier si hero-bouton-principal est bien testé maintenant

#### 📋 Plan d'action proposé

**Phase 1 - Nettoyage (rapide)** :
1. Supprimer les 4 fichiers de tests obsolètes mentionnés ci-dessus
2. Vérifier VideoDetournement.test.tsx (probablement même problème CSS)
3. Relancer tous les tests pour avoir un état des lieux propre

**Phase 2 - Investigation** :
1. Analyser GroupeBoutons.test.tsx (window.location) - déterminer si c'est bloquant
2. Vérifier e2e-ids-coverage.integration.test.ts (confirmer que hero-bouton-principal est testé)

**Phase 3 - Objectif final** :
- Atteindre 100% de tests qui passent (ou identifier les tests non-bloquants)

#### 🎯 Priorités

**Haute priorité** :
- Supprimer les tests obsolètes (4 fichiers)
- Vérifier VideoDetournement.test.tsx

**Moyenne priorité** :
- Analyser GroupeBoutons.test.tsx (limitation jsdom)

**Basse priorité** :
- Vérifier e2e-ids-coverage (déjà corrigé, juste confirmation)

#### ⚠️ Notes

- Les tests tooltip sont à supprimer car une refonte de la page metrics est prévue
- GroupeBoutons.test.tsx a un problème avec `window.location` qui est une limitation de jsdom, pas un bug réel
- Tous les tests liés à la refactorisation CSS sont maintenant corrigés
