# US-4.7 : Système de versioning basé sur les User Stories complétées ✅ COMPLÉTÉ

## En tant que Product Owner

## Je souhaite Avoir un système de versioning automatique qui reflète le nombre de User Stories complétées

## Afin de Suivre la progression du projet de manière cohérente et automatique

# Critères d'acceptation

## CA1 - Format de version : `major.minor.patch` où :
- `major` : Fixé à 1
- `minor` : Nombre total de User Stories complétées depuis le début du projet
- `patch` : Numéro de build (incrémenté à chaque build)
## CA2 - Comptage automatique : Script `scripts/count-completed-us.ts` qui compte toutes les US marquées "✅ COMPLETE" ou "✅ COMPLETE" dans tous les fichiers du dossier "2. Sprints"
## CA3 - Détection dans le titre : Les US complétées peuvent être marquées directement dans le titre (format `### US-X.Y : Titre ✅ COMPLETE`)
## CA4 - Synchronisation : Script `scripts/increment-site-version.ts sync` qui synchronise le `minor` avec le nombre d'US complétées
## CA5 - Incrémentation automatique : Le `patch` est incrémenté automatiquement à chaque build via `npm run version:patch`
## CA6 - Stockage : Version stockée dans `site-version.json` et accessible via l'API `/api/version`
## CA7 - Affichage : Version affichée dans le footer du site
## CA8 - Intégration CI/CD : Synchronisation et incrémentation automatiques lors des builds sur Vercel

# US-4.X : Graphiques pour métriques (À TRAITER ULTÉRIEUREMENT)

## En tant que Manager technico-fonctionnel

## Je souhaite Voir l'évolution des métriques sous forme de graphiques (courbes, barres)

## Afin de Identifier rapidement les tendances et les anomalies sur une période donnée

## CA9 - Note : Cette US sera traitée ultérieurement, après US-4.3, pour enrichir la section "Historique"

## CA10 - Bibliothèque de graphiques
- Utilisation de `chart.js` avec le wrapper React `react-chartjs-2`
- Les bibliothèques sont déjà installées dans `devDependencies`

## CA11 - Graphiques à implémenter
- Graphique linéaire : évolution du nombre de tests dans le temps
- Graphique linéaire : évolution de la couverture de code dans le temps
- Graphique linéaire : évolution des erreurs ESLint dans le temps
- Graphique en barres : évolution de la taille du code (lignes, composants, pages)
- Graphique en barres : évolution de la taille du bundle dans le temps

## CA12 - Filtres et période
- Filtres pour sélectionner la période : derniers 7 jours, 30 jours, 90 jours, tout l'historique