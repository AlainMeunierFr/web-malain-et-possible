# US-4.4 : Intégration de la collecte de métriques dans le workflow de développement ✅ COMPLÉTÉ

## En tant que Développeur

## Je souhaite Collecter automatiquement les métriques à chaque fois que j'exécute les tests ou que je fais un build

## Afin de Avoir des métriques toujours à jour sans effort supplémentaire

# Critères d'acceptation

## CA1 - Scripts npm disponibles
- `npm run metrics:collect` : collecte les métriques et génère les fichiers JSON
- `npm run metrics:view` : lance le serveur de développement pour voir la page `/metrics`
- `npm run metrics:full` : collecte les métriques puis lance le serveur (`npm run metrics:collect && npm run dev`)

## CA2 - Configuration dans package.json
- Les scripts utilisent `ts-node` pour exécuter le script TypeScript directement
- Le script de collecte est `scripts/collect-metrics-simple.ts` (compatible Windows)

## CA3 - Documentation
- Le README du projet explique comment utiliser les scripts de métriques
- Instructions pour visualiser les métriques : "Visitez http://localhost:3000/metrics après avoir collecté les métriques"

## CA4 - Bonnes pratiques
- Collecter les métriques après chaque changement significatif du code
- Comparer les tendances avant/après une fonctionnalité ou un refactoring
- Utiliser les métriques pour valider l'amélioration continue de la qualité du code