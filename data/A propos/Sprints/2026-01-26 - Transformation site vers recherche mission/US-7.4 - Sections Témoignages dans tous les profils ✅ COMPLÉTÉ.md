# US-7.4 : Sections Témoignages dans tous les profils

## En tant que visiteur/recruteur

## Je souhaite voir des témoignages clients à la fin de chaque page de profil

## Afin de renforcer ma confiance et la crédibilité d'Alain avant le call-to-action final

# Critères d'acceptation

## CA1 - CA1 - Structure de la section Témoignages
- Chaque page de profil (`/profil/cpo`, `/profil/coo`, `/profil/agile`, `/profil/cto`) contient une section "Témoignages" à la fin, juste avant le call-to-action final
- La section est composée de :
1. Un titre "Témoignages" (type `titre`)
2. Un élément `temoignages` avec `source: "_temoignages.json"` pour charger les témoignages depuis le fichier partagé

## CA2 - CA2 - Fichier de témoignages partagé
- Les témoignages sont centralisés dans `data/_temoignages.json`
- Le fichier contient une structure `temoignages` avec un tableau `items` de témoignages
- Chaque témoignage contient : `nom`, `fonction`, `photo`, `temoignage`
- Le composant `Temoignages.tsx` existant charge et affiche les témoignages depuis ce fichier

## CA3 - CA3 - Intégration dans les profils
- `profil-cpo.json` : Section Témoignages ajoutée avant le call-to-action
- `profil-coo.json` : Section Témoignages ajoutée avant le call-to-action
- `profil-agile.json` : Section Témoignages ajoutée avant le call-to-action (avant la vidéo finale si présente)
- `profil-cto.json` : Section Témoignages ajoutée avant le call-to-action

## CA4 - CA4 - Affichage
- Les témoignages s'affichent avec le composant `Temoignages.tsx` existant
- Le rendu respecte le design actuel (grille 2 colonnes sur desktop, empilé sur mobile)
- Les photos, noms, fonctions et textes de témoignages sont correctement affichés

## CA5 - CA5 - Positionnement
- La section Témoignages apparaît systématiquement avant le dernier call-to-action de chaque profil
- L'ordre de contenu d'un profil est : Vidéo(s) → Titre → Domaines → Témoignages → Call-to-action

**Résultat attendu :**
- Tous les profils affichent des témoignages clients avant le call-to-action final
- Amélioration de la crédibilité et de la confiance
- Cohérence : mêmes témoignages partagés sur tous les profils (cohérence du message)