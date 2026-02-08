# US-4.6 : Tooltips informatifs pour les métriques ✅ COMPLÉTÉ

## En tant que décideur consultant la page Métriques

## Je souhaite disposer d'explications pédagogiques sur chaque métrique via des info-bulles

## Afin de comprendre la signification business de chaque indicateur technique sans connaissances préalables en développement

# Critères d'acceptation

## CA1 - CA1 - Paramétrage externe des contenus
- Un fichier JSON `data/tooltips-metrics.json` contient les explications de chaque métrique
- Le contenu est modifiable sans toucher au code source
- Format : clé métrique → { title, description, interpretation[] }

## CA2 - CA2 - Indicateur visuel sur chaque métrique
- Chaque bloc bleu de métrique affiche une icône "ℹ" à côté du titre
- L'icône invite visuellement au survol (cursor: help)
- Design cohérent avec l'interface existante

## CA3 - CA3 - Affichage de l'info-bulle au survol
- Survol de l'icône "ℹ" affiche la tooltip avec contenu pédagogique
- Contenu : terme technique + explication accessible + grille d'interprétation
- Support clavier (focus) pour l'accessibilité

## CA4 - CA4 - Priorité d'affichage absolue (Z-INDEX)
- Les tooltips flottent **EN COUCHES** au-dessus de TOUS les éléments
- Priorité z-index maximale pour dépasser sections, cartes, autres blocs
- Aucun élément de la page ne doit masquer une tooltip active

## CA5 - CA5 - Gestion intelligente de la zone d'affichage
- Repositionnement automatique si débordement (header/footer)
- Calcul dynamique de la position optimale
- Tooltip reste entièrement visible dans la zone d'affichage

## CA6 - CA6 - Couverture complète des 19 métriques
- Toutes les métriques disposent de leur tooltip spécifique :
Complexité Cyclomatique, Scénarios BDD, Tests Unitaires, Tests Intégration, Steps E2E, Erreurs ESLint, Warnings ESLint, Type Coverage, Couverture Lignes/Statements/Fonctions/Branches, Fichiers, Lignes de Code, Composants, Pages, Dépendances, Vulnérabilités, Taille Bundle, Temps de Build

## CA7 - Statut : 🔄 Développement en cours - Problème z-index en résolution