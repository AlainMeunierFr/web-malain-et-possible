# US-5.7 : Système de détection et génération d'e2eID ✅ COMPLÉTÉ

## En tant que Développeur

## Je souhaite Avoir un système automatique pour détecter, générer et assigner des identifiants E2E aux éléments interactifs

## Afin de Faciliter l'écriture et la maintenance des tests E2E

# Critères d'acceptation

## CA1 - Détection automatique : `utils/e2eIdDetector.ts` qui détecte :
- Les e2eID présents dans les composants React
- Les e2eID définis dans les constantes (`constants/e2eIds.ts`)
- Les e2eID présents dans les fichiers JSON
## CA2 - Génération automatique : `utils/e2eIdGenerator.ts` qui génère des e2eID uniques pour les éléments sans identifiant
## CA3 - Inventaire : `utils/e2eIdInventory.ts` qui crée un inventaire complet de tous les e2eID du projet
## CA4 - Compteur : `utils/e2eIdCounter.ts` qui compte les e2eID par type et par source
## CA5 - Fichier pending : `e2e-ids-pending.json` qui liste les e2eID en attente d'assignation
## CA6 - Tests BDD : Feature `tests/bdd/e2e-ids-assignment.feature` avec scénarios pour :
- Détection des e2eID manquants
- Génération automatique d'e2eID
- Assignation des e2eID aux éléments
## CA7 - Tests d'intégration
- `tests/integration/e2e-ids-detection.integration.test.ts` pour valider la détection
- `tests/integration/e2e-ids-coverage.integration.test.ts` pour valider la couverture
## CA8 - Couverture 100% : Tous les éléments interactifs doivent avoir un e2eID assigné