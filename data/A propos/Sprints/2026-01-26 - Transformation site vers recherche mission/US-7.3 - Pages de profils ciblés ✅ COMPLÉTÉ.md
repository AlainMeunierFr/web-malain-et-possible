# US-7.3 : Pages de profils ciblés ✅ COMPLÉTÉ

## En tant que visiteur/recruteur

## Je souhaite accéder à des pages de profils ciblés selon le poste recherché

## Afin de voir uniquement les compétences pertinentes pour ce poste

# Critères d'acceptation

## CA1 - CA1 - Pages profils
- 4 pages de profils créées : `/profil/cpo`, `/profil/coo`, `/profil/agile`, `/profil/cto`
- Chaque page a pour titre le nom du profil (ex: "Produit logiciel", "Opérations", "Transformation Agile", "Technologie")
- Chaque page référence uniquement les domaines pertinents depuis la bibliothèque (voir PROPOSITION-DOMAINES-PAR-PROFIL.md)
- Structure identique aux autres pages : vidéo(s) → titre → domaines → callToAction

## CA2 - CA2 - Vidéos par profil
- `/profil/cpo` : Vidéo `https://youtu.be/iUv6e256AVk` (Product Management) en début de page, lancement auto `true`
- `/profil/coo` : Vidéo `https://youtu.be/9rwtuxXiKC0` (Transvers et organique) en début de page, lancement auto `true`
- `/profil/agile` : Vidéo `https://youtu.be/XoruJezxpsI` (Conduite du changement) en début, `https://youtu.be/mPif5EjzFYg` (Seigneur des anneaux) en fin, lancement auto `true`/`false`
- `/profil/cto` : Vidéo `https://youtu.be/iUv6e256AVk` (Product Management) en début de page, lancement auto `true`
- Voir LISTE-VIDEOS-PAR-PROFIL.md pour détails

## CA3 - CA3 - Domaines par profil
- Répartition des domaines selon PROPOSITION-DOMAINES-PAR-PROFIL.md
- Aucun nouveau domaine à créer (les domaines existants couvrent les besoins)
- Ordre des domaines respecté pour chaque profil

## CA4 - CA4 - Navigation
- Les boutons "Découvrir" de la section HERO redirigent vers les pages de profils correspondantes
- Les pages sont accessibles depuis le plan du site

## CA5 - CA5 - CallToAction
- Chaque page de profil se termine par un CallToAction "On discute ?" qui redirige vers `/faisons-connaissance`

**État actuel :**
- ✅ Proposition de domaines validée (PROPOSITION-DOMAINES-PAR-PROFIL.md)
- ✅ Stratégie vidéos validée (LISTE-VIDEOS-PAR-PROFIL.md)
- ⏳ Pages JSON à créer (`profil-cpo.json`, `profil-coo.json`, `profil-agile.json`, `profil-cto.json`)
- ⏳ Routes Next.js à créer (`app/profil/[slug]/page.tsx` ou 4 routes distinctes)
- ⏳ Tests à créer