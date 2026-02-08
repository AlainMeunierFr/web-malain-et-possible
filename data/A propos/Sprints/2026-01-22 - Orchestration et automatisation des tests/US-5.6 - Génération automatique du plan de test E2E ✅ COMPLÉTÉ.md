# US-5.6 : Génération automatique du plan de test E2E ✅ COMPLÉTÉ

## En tant que Lead Developer

## Je souhaite Générer automatiquement un scénario E2E complet qui parcourt tous les liens du site

## Afin de Garantir une couverture complète des tests end-to-end sans maintenance manuelle

# Critères d'acceptation

## CA1 - Script de génération : Création de `scripts/generate-e2e-scenario.ts` qui :
- Lit la liste des liens depuis `Pages-Et-Lien.json`
- Génère un chemin optimal qui parcourt tous les liens
- Teste tous les e2eID présents sur chaque page visitée
- Évite les doublons en supprimant les liens déjà parcourus
## CA2 - Algorithme glouton : Utilise un algorithme glouton pour optimiser le parcours (commence par la page d'accueil, suit les liens disponibles)
## CA3 - Scénario Playwright : Génère un fichier `tests/end-to-end/parcours-complet-liens.spec.ts` avec :
- Navigation séquentielle à travers tous les liens
- Tests de tous les e2eID sur chaque page
- Vérification que tous les liens sont accessibles
## CA4 - Hook pre-commit : Script `scripts/pre-commit-generate-e2e.ts` qui régénère automatiquement le plan E2E avant chaque commit
## CA5 - Tests d'intégration : Tests dans `tests/integration/generate-e2e-plan.integration.test.ts` pour valider la génération
## CA6 - Protection des données : Le script protège les données sensibles dans les tests (masquage des mots de passe, etc.)