# Spec – Deux blocs BDD sur la page Métriques

Sujet de l’échange : séparer le décompte **scénarios** et **étapes** BDD en deux cartes distinctes, avec titres et champs définis ci‑dessous.

---

## Bloc 1 : Scénarios BDD

| Élément | Valeur |
|--------|--------|
| **Titre carte** | Scénarios BDD |
| **Total** | bddScenariosTotal |
| **Testable** | bddScenariosTestable |
| **Non testable** | bddScenariosFailed |
| **Durée** | bddTestDuration (ms) |
| **Fichiers** | bddFeatures |
| **Tooltip** | id `bddScenarios` dans data/_metrics.json |

---

## Bloc 2 : Étapes BDD

| Élément | Valeur |
|--------|--------|
| **Titre carte** | Étapes BDD |
| **Total** | bddStepsTotal |
| **Implementé** | bddStepsImplemented |
| **Non implémenté** | bddStepsMissing (dette = steps sans définition) |
| **Durée** | NP |
| **Scénarios** | bddScenariosTotal |
| **Tooltip** | « Réussis » = implémentés, « Échoués » = manquants |

---

## Ordre dans la section Tests

Total → **Scénarios BDD** → **Étapes BDD** → Unitaires → Intégration → E2E


