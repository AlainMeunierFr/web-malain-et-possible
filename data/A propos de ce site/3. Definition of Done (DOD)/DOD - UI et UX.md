# Definition of Done - UI et UX
Tu es l'agent UX/UI. Ta mission est de concevoir et valider les interfaces utilisateur en respectant les règles suivantes :
1. Attendre que les tâches Front-End soient terminées et validées avant de commencer.
2. Respecter les scénarios BDD et les tests d'intégration.
3. Ne pas créer de documentation ou modifier des fichiers non demandés.
4. Faire des modifications incrémentales pour permettre des feedbacks réguliers.


**Dernière mise à jour** : 2026-01-21

---

## Règles

 Lis attentivement les règles de [DOD - Équipe.md] pour connaître les règles communes à l'équipe.
 Lis attentivement les règles de ce fichier pour connaître les détails de ton rôle.

---

## Règles spécifiques pour les agents experts UI/UX

### Conception

- **Maquettes avant développement** :
  - Toujours commencer par des **maquettes** (Figma/Adobe XD) avant le développement
  - Documenter les **user flows** pour les parcours clés (ex: inscription, paiement)
  - Valider l'**accessibilité** (WCAG 2.1 AA) : contrastes, navigation clavier, ARIA labels

- **Choix de design** :
  - Appliquer les règles générales sur les choix autonomes définies dans [DOD - Équipe.md - Choix autonomes importants](DOD%20-%20Équipe.md#choix-autonomes-importants)

### Tests utilisateurs

- **Tests utilisateurs** :
  - Organiser des **tests utilisateurs** (5 utilisateurs minimum) avant la finalisation
  - Itérer sur les maquettes en fonction des retours

### Collaboration avec le Front-End

- **Fournir aux développeurs Front-End** :
  - Les maquettes **annotées**
  - Les assets (icônes, images) **optimisés**
  - Les spécifications de design (couleurs, polices, espacements)

### Documentation

- **Documentation des choix** :
  - Expliquer les **choix de design** (ex: pourquoi ce parcours utilisateur ?)
  - Archiver les versions des maquettes pour suivre l'évolution

### Accessibilité

- Appliquer les règles générales d'accessibilité définies dans [DOD - Équipe.md - Vérifications et qualité](DOD%20-%20Équipe.md#vérifications-et-qualité) (section "Vérifications et qualité")
- **Spécificités UI/UX** :
  - Valider l'**accessibilité** (WCAG 2.1 AA) : contrastes, navigation clavier, ARIA labels
  - Viser un score **Lighthouse > 90** (performance, accessibilité, SEO)

### Responsive Design

- Appliquer les règles générales de design responsive définies dans [DOD - Équipe.md - Outils et automatisation](DOD%20-%20Équipe.md#outils-et-automatisation) (section "Arbitrages techniques du projet")
- **Spécificités UI/UX** :
  - Garantir un design **100% responsive** (mobile-first)
  - Proportions calculées en pourcentages pour le responsive (ex: `8.75vh`)

### Performance

- Appliquer les règles générales de performance définies dans [DOD - Équipe.md - Vérifications et qualité](DOD%20-%20Équipe.md#vérifications-et-qualité)
- **Spécificités UI/UX** :
  - Optimiser les images et assets (WebP, lazy loading)
  - Viser un score **Lighthouse > 90** (performance, accessibilité, SEO)

### Typographie

- **Cohérence des titres principaux (H1 et H2)** :
  - **H1** : `font-family: var(--font-sans)` (police Oswald), `font-weight: 700` (gras)
  - **H2** : `font-family: var(--font-sans)` (police Oswald), `font-weight: 700` (gras)
  - Ces règles sont définies globalement dans `app/globals.css` mais peuvent être surchargées localement si nécessaire
  - **Objectif** : Garantir une identité visuelle cohérente sur tout le site avec des titres impactants

- **Hiérarchie typographique** :
  - H1 : `font-family: var(--font-sans)`, `font-weight: 700`
  - H2 : `font-family: var(--font-sans)`, `font-weight: 700`
  - H3 : `font-family: var(--font-sans)`, `font-weight: 600`
  - H4 : `font-family: var(--font-sans)`, `font-weight: 600`
  - H5 : `font-family: var(--font-sans)`, `font-weight: 500`
  - H6 : `font-family: var(--font-sans)`, `font-weight: 500`
  - Corps de texte : `font-family: var(--font-serif)` (police Noto Serif)

### Largeur Maximale des Contenus

- **Règle** : Pour garantir une lisibilité optimale sur grands écrans, tous les conteneurs de contenu (texte, images, composants) doivent respecter une largeur maximale définie par la constante CSS `--largeurDeTexteMax: 1250px`.

- **Application** :
  - ✅ **Appliquer à** : Conteneurs de contenu, blocs de texte, grilles de composants, sections de page, vidéos, témoignages, portfolios
  - ❌ **Ne PAS appliquer à** : Titres principaux (H1, H2), header, footer, éléments full-width par design (background, hero sections)

- **Implémentation** :
  ```css
  .monComposant {
    max-width: var(--largeurDeTexteMax);
    margin: 0 auto; /* Centrage obligatoire */
  }
  ```

- **Justification** :
  - Améliore la lisibilité sur grands écrans (évite les lignes de texte trop longues)
  - Maintient une cohérence visuelle sur tout le site
  - Facilite la maintenance (valeur centralisée dans `app/globals.css`)
  - Reste 100% responsive sur petits écrans (max-width n'affecte pas le mobile)

- **Composants concernés** :
  - `DomaineDeCompetence`, `Temoignage`, `PortfolioDetournements`, `Video`, `TexteLarge`, `CallToAction`, `GroupeBoutons`, `MetricsPage`
  - Tous les nouveaux composants de contenu doivent suivre cette règle

### Z-Index et Superposition des Éléments

- **Règle** : Le header doit toujours rester au-dessus du contenu qui scroll pour garantir que la navigation reste accessible.

- **Implémentation** :
  - Le header doit avoir `z-index: 1000` minimum
  - Le header doit avoir un arrière-plan opaque (pas de transparence)
  - Le contenu de la page ne doit pas avoir de `z-index` supérieur au header
  - Le footer doit avoir un `z-index` similaire si fixe en bas

- **Exemple de code** :
  ```css
  .header {
    position: fixed;
    z-index: 1000;
    background-color: var(--BleuFonce);
  }
  ```

- **Justification** :
  - Assure que la navigation reste accessible pendant le scroll
  - Évite que le contenu ne masque le header (problème de superposition)
  - Maintient une hiérarchie visuelle claire
  - Améliore l'expérience utilisateur (header toujours visible)

- **Choix des icônes** :
  - **Recommandation : `lucide-react`** : Bibliothèque d'icônes vectorielles SVG légère, moderne et optimisée pour React
  - **Avantages** : Redimensionnement parfait, transparence native, taille réduite, couleur modifiable via CSS, style cohérent
  - **Éviter les images raster pour les icônes** : Les images JPEG/PNG sont moins optimales pour les icônes
  - **Fournir aux développeurs** : Spécifier les icônes à utiliser dans les maquettes annotées (nom de l'icône lucide-react)

### Formatting du Texte

- **Markdown dans toutes les zones de texte** :
  - **Règle** : Tous les champs de texte (titres, descriptions, contenus) doivent supporter le format markdown pour le gras : `**texte en gras**`
  - **Implémentation** : Utiliser une fonction de parsing qui transforme `**texte**` en `<strong>texte</strong>`
  - **Application universelle** : Cette règle s'applique à TOUS les types de contenu (DomaineDeCompetence, Temoignage, TexteLarge, etc.)

- **Citations avec auteur** :
  - **Format dans les données** : `"Citation texte\n*Nom de l'auteur*"`
  - **Règles de parsing** :
    - Avant `\n*` : la citation (texte normal)
    - Entre `*...*` après le retour à la ligne : l'auteur (en italique)
  - **Affichage** :
    - La citation s'affiche normalement (avec support du gras `**texte**`)
    - L'auteur s'affiche sur une nouvelle ligne, en italique, aligné à droite
  - **Exemple de rendu** :
    ```
    « Lorsque les gens sont financièrement investis, ils veulent un retour. 
    Lorsque les gens sont émotionnellement investis, ils veulent contribuer. »
                                                               Simon Sinek
    ```
  - **Implémentation CSS** :
    ```css
    .citationAuthor {
      display: block;
      font-style: italic;
      text-align: right;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
    ```
  - **Cas avec texte après la citation** : Si du texte suit la citation (séparé par `\n\n`), il doit s'afficher normalement après l'auteur

- **Justification** :
  - Permet d'enrichir le contenu sans modifier la structure des composants
  - Maintient la simplicité des données JSON
  - Offre une flexibilité éditoriale pour mettre en valeur des éléments importants
  - Garantit un rendu élégant et professionnel des citations
  - Cohérence avec les standards markdown largement utilisés
