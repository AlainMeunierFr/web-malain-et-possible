# US-3.7 : Reprise du contenu manquant avec les types de contenu existants ✅ COMPLÉTÉ

## En tant que Visiteur du site

## Je souhaite Voir tout le contenu de l'ancien site repris dans le nouveau site en utilisant les types de contenu déjà implémentés (titre, video, texteLarge, domaineDeCompetence, callToAction, groupeBoutons)

## Afin de Avoir un site complet avec tout le contenu de l'ancien site disponible

# Critères d'acceptation

## CA1 - Analyse du contenu manquant
- Comparer le contenu de l'ancien site avec le contenu actuel du nouveau site
- Identifier les éléments de contenu qui ne sont pas encore repris
- Lister les éléments qui peuvent être créés avec les types de contenu existants (titre, video, texteLarge, domaineDeCompetence, callToAction, groupeBoutons)

## CA2 - Reprise du contenu
- Créer les fichiers JSON nécessaires pour les pages manquantes
- Utiliser les types de contenu existants pour structurer le contenu
- Respecter la structure hiérarchique et l'ordre du contenu de l'ancien site
- Vérifier que tous les textes, images et liens sont correctement repris

## CA3 - Validation
- Toutes les pages de l'ancien site ont leur équivalent dans le nouveau site
- Le contenu est fidèle à l'original (textes, images, structure)
- Les types de contenu utilisés sont appropriés et cohérents

# US-3.8a : Création du type de contenu "témoignage" ✅ COMPLÉTÉ

## En tant que Visiteur du site

## Je souhaite Voir des témoignages de clients ou partenaires sur le site

## Afin de Avoir une preuve sociale et crédibilité pour les services proposés

## CA4 - Structure de données
- Définir l'interface TypeScript `ElementTemoignage` dans `utils/indexReader.ts`
- Structure : `type: 'temoignage'`, `auteur` (string), `fonction` (string optionnel), `entreprise` (string optionnel), `texte` (string), `photo` (string optionnel pour URL d'image)
- Ajouter le type à l'union type `ElementContenu`

## CA5 - Composant React
- Créer le composant `Temoignage.tsx` avec son CSS module `Temoignage.module.css`
- Intégrer le composant dans `PageContentRenderer`
- Le témoignage affiche : photo (si présente), texte, auteur, fonction/entreprise

## CA6 - CSS
- Design cohérent avec le reste du site
- Responsive (mobile-first)
- Mise en page claire et lisible

## CA7 - Tests
- Tests unitaires pour le composant `Temoignage`
- Tests pour la lecture du JSON avec type "temoignage"

# US-3.8b : Création du type de contenu "portfolio détournements" ✅ COMPLÉTÉ

## En tant que Visiteur du site

## Je souhaite Voir une galerie de détournements vidéo avec des images et des liens vers les vidéos

## Afin de Découvrir les réalisations créatives d'Alain

## CA8 - Structure de données
- Définir l'interface TypeScript `ElementPortfolioDetournements` dans `utils/indexReader.ts`
- Structure : `type: 'portfolioDetournements'`, `items` (tableau d'objets)
- Chaque item contient : `titre` (string), `image` (string pour URL), `videoUrl` (string optionnel pour URL YouTube), `description` (string optionnel)
- Ajouter le type à l'union type `ElementContenu`

## CA9 - Composant React
- Créer le composant `PortfolioDetournements.tsx` avec son CSS module `PortfolioDetournements.module.css`
- Intégrer le composant dans `PageContentRenderer`
- La galerie affiche les items en grille responsive

## CA10 - CSS
- Grille responsive (mobile-first)
- Images avec effet hover si lien vidéo présent
- Design cohérent avec le reste du site

## CA11 - Tests
- Tests unitaires pour le composant `PortfolioDetournements`
- Tests pour la lecture du JSON avec type "portfolioDetournements"