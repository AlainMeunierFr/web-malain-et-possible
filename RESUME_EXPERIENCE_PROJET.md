# Résumé de notre expérience de développement collaboratif

**Date de début : 17 janvier 2026**

## Contexte et objectif

Ce projet est né d'une volonté de remise à niveau sur le développement web moderne, en s'appuyant sur l'intelligence artificielle comme partenaire pédagogique. L'objectif initial était double : créer un site vitrine personnel tout en se formant aux pratiques du software craftsmanship (TDD, BDD, Clean Code, DDD).

En tant qu'ancien développeur (1995-2020) ayant principalement travaillé sur l'environnement 4D, j'avais de solides bases en modélisation de données et algorithmie, mais j'étais moins familier avec la programmation orientée objet pure, les frameworks modernes, et la culture du code issue du software craft. Ce projet représentait donc une opportunité unique d'apprendre en pratiquant, avec l'IA comme accélérateur d'apprentissage plutôt que comme simple outil de génération de code.

## Approche méthodologique

Dès le départ, nous avons établi un cadre de travail rigoureux avec une **Definition of Done (DOD)** structurée, incluant :
- Des règles pour le backend pur et le backend Next.js
- Des règles pour le front-end (CSS, accessibilité, responsive)
- Un journal de bord quotidien documentant chaque étape
- Une approche TDD stricte (RED → GREEN → REFACTOR)
- L'utilisation de BDD avec Gherkin pour définir les comportements

Cette discipline nous a permis de maintenir une progression claire et traçable, chaque décision technique étant documentée et justifiée.

## Principales réalisations

### Phase 1 : Fondations (17-18 janvier 2026)

**Création du site Next.js TypeScript**
- Mise en place de l'architecture de base
- Implémentation du Header et Footer avec design responsive
- Intégration des images (Logo et Photo) avec proportions calculées
- Refactorisation des couleurs en variables CSS (`--BleuFonce`)

**Implémentation des boutons footer**
- Développement avec logique métier séparée (backend pur)
- Tests BDD et TDD complets
- Gestion des URLs internes/externes et des commandes spéciales (`mailto:`, `tel:`)

### Phase 2 : Page "À propos du site" et architecture unifiée (18-19 janvier 2026)

**Création de la page wiki "À propos du site"**
- Parser Markdown avec validation de structure (pas de H1/H2, H4 doit suivre H3)
- Système de `typeDeContenu` pour remplacer les flags booléens multiples
- Architecture unifiée entre journal de bord et contenu du site
- Tests d'intégration pour garantir la cohérence

**Refactorisation et simplification**
- Passage d'une architecture avec flags multiples (`estPrompt`, `estSpecial`) à un système unique `typeDeContenu`
- Simplification du HTML généré : texte + `typeDeContenu`, la CSS gère le reste
- Réduction de la complexité du code, suppression de l'over-engineering

### Phase 3 : Site vitrine - Structure et contenu (19 janvier 2026)

**US-3.1 : Affichage d'un Domaine de compétences**
- Création du système de types de contenu (`DomaineDeCompetences`)
- Composant React avec parsing Markdown inline pour le gras
- CSS responsive mobile-first avec contrainte de largeur maximale (947px)
- Intégration d'icônes Lucide-React pour remplacer les images pixelisées

**US-3.2 : Navigation vers des pages dédiées**
- Création de pages dédiées (Robustesse, Conduite du changement, Détournement vidéo)
- Système de routing Next.js avec fichiers JSON séparés
- Réutilisation des composants existants

**US-3.3 : Enrichissement avec nouveaux types de contenu**
- Type "Titre" : bande bleue foncée pleine largeur avec h1
- Type "Vidéo" : intégration YouTube responsive (100% mobile, 70% desktop)
- Type "TexteLarge" : texte large sans compétences associées
- Refactorisation du système de lecture JSON pour supporter les deux structures (ancienne et nouvelle)

**US-3.4 : Call to Action et page de contact**
- Bouton CTA sur la page d'accueil
- Page "Faisons connaissance" avec groupes de boutons (grands et petits)
- Factorisation avec le footer pour la logique métier des boutons

**US-3.5 : Comportement de la page "Faisons connaissance"**
- Trois grands boutons verticaux (Déjeuner, Visio, Téléphone)
- Trois petits boutons horizontaux (Email, YouTube, LinkedIn)
- Réutilisation de l'architecture footer avec propriété `taille`

**US-3.6 : Amélioration de la lisibilité des Critères d'acceptation**
- Hiérarchie visuelle pour les User Stories dans le wiki
- Détection et parsing des thèmes de critères (`- **Thème**`) et critères (`- Critère`)
- Styles CSS distincts (puce disc pour thèmes en gras, puce circle pour critères indentés)
- HTML minimal : texte + `typeDeContenu`, la CSS fait le reste
- Mise à jour de la DOD pour documenter le comportement implicite de l'IA

## Résultats et apprentissages

### Métriques

- **Durée du projet** : 3 jours (17-19 janvier 2026)
- **Total des prompts** : 19+ prompts documentés
- **Fichiers créés** : 50+ fichiers
- **Tests** : 31+ tests passants
- **Commits Git** : 10+ commits documentés
- **User Stories réalisées** : 6 US (US-3.1 à US-3.6)

### Apprentissages techniques

1. **Architecture Next.js** : Compréhension approfondie des Server Components et Client Components, avec séparation claire entre backend pur (Node.js) et backend Next.js.

2. **TDD et BDD** : Mise en pratique rigoureuse du cycle RED-GREEN-REFACTOR, avec tests unitaires et tests BDD en Gherkin. Cette approche a permis de garantir la qualité du code tout en documentant les comportements attendus.

3. **Clean Code et DDD** : Adoption progressive d'une architecture orientée métier, avec des noms explicites (`DomaineDeCompetences`, `typeDeContenu`) et une séparation des responsabilités.

4. **CSS Mobile-First** : Passage d'une approche desktop-first à mobile-first, avec media queries utilisant `min-width` et suppression de la duplication de code.

5. **Refactorisation continue** : Identification et élimination de l'over-engineering, simplification du HTML généré, réduction de la complexité inutile.

### Apprentissages méthodologiques

1. **Importance de la DOD** : La Definition of Done a été un outil précieux pour maintenir la qualité et la cohérence, même dans un projet de petite envergure.

2. **Journal de bord** : La documentation systématique de chaque prompt et résultat technique a permis de garder une trace claire de l'évolution du projet et des décisions prises.

3. **Itération et feedback** : Le processus itératif avec validation continue a permis d'ajuster rapidement la direction du projet et d'éviter les impasses techniques.

4. **Balance entre apprentissage et résultat** : Le projet a réussi à maintenir un équilibre entre l'objectif fonctionnel (avoir un site vitrine) et l'objectif pédagogique (apprendre les bonnes pratiques).

## Perspectives

Ce projet a démontré la viabilité d'une approche collaborative avec l'IA pour l'apprentissage et le développement. La combinaison de :
- Un cadre méthodologique rigoureux (DOD, TDD, BDD)
- Une documentation systématique (journal de bord)
- Une approche itérative et testée
- Une supervision humaine constante

a permis de produire un code de qualité tout en progressant dans la compréhension des pratiques modernes du développement logiciel.

L'expérience montre que l'IA peut être un véritable partenaire pédagogique, à condition de maintenir une vigilance constante sur la qualité du code généré et de comprendre chaque ligne produite. Le code n'est pas seulement fonctionnel : il est lisible, testable, et exprime clairement les intentions métier.

---

*Ce document a été généré le 19 janvier 2026, à l'issue de trois jours de développement collaboratif avec l'IA.*
