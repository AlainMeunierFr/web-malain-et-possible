# US-7.6 : Support écrans ultra-larges (3840x1080)

## En tant que visiteur avec un écran ultra-large (3840x1080 ou similaire)

## Je souhaite que le contenu soit centré et limité en largeur

## Afin de garantir une lisibilité optimale et éviter que le texte soit trop étalé

# Critères d'acceptation

## CA1 - Critères d'acceptation :

## CA2 - CA1 - Container global pour centrer le contenu :
- Création d'un container global dans `app/shared.module.css` pour centrer tout le contenu
- Largeur max adaptée pour les écrans ultra-larges (≥2560px)
- Centrage automatique avec `margin: 0 auto`

## CA3 - CA2 - Media queries pour écrans ultra-larges :
- Ajout de media queries pour `@media (min-width: 2560px)` (écrans 2K/ultra-larges)
- Ajout de media queries pour `@media (min-width: 3840px)` (écrans 4K/ultra-ultra-larges)
- Ajustement des `max-width` pour tous les types de contenu

## CA4 - CA3 - Largeurs max optimisées :
- **Écrans ≥2560px** : `max-width: 1600px` pour les contenus principaux
- **Écrans ≥3840px** : `max-width: 1800px` pour les contenus principaux
- Largeurs spécifiques pour vidéos, témoignages, etc.

## CA5 - CA4 - Centrage systématique :
- Tous les éléments de contenu sont centrés horizontalement
- Le contenu ne s'étale pas sur toute la largeur de l'écran
- Espacement équilibré de chaque côté

## CA6 - CA5 - Ajustements de polices et espacements :
- Polices légèrement augmentées pour meilleure lisibilité sur grands écrans
- Espacements (padding/margin) ajustés proportionnellement
- Cohérence visuelle maintenue

**Résultat attendu :**
- Le site est parfaitement lisible et centré sur écrans ultra-larges (3840x1080)
- Le contenu ne s'étale pas sur toute la largeur
- Expérience utilisateur optimale sur tous les types d'écrans

# US-7.6 : ✅ Complétée

**Livrables :**
- ✅ Media queries pour écrans ultra-larges (≥2560px) ajoutées dans `app/content-styles.css`
- ✅ Media queries pour écrans ultra-ultra-larges (≥3840px) ajoutées dans `app/content-styles.css`
- ✅ Ajustements des `max-width` pour tous les types de contenu :
- **≥2560px** : `max-width: 1600px` pour contenus principaux
- **≥3840px** : `max-width: 1800px` pour contenus principaux
- ✅ Ajustements des polices et espacements pour meilleure lisibilité
- ✅ Media queries ajoutées pour pages spécifiques (`metrics.module.css`, `about.module.css`)
- ✅ Centrage systématique avec `margin: 0 auto` sur tous les éléments

**Résultat :**
- Le site est parfaitement lisible et centré sur écrans ultra-larges (3840x1080)
- Le contenu ne s'étale pas sur toute la largeur, restant dans des largeurs optimales pour la lisibilité
- Expérience utilisateur optimale sur tous les types d'écrans (mobile, tablette, desktop, ultra-large)