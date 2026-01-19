### Analyse : Types de contenu structurés du site vitrine

#### Source d'analyse
Fichier HTML : `Exemple/Malain et possible - A propos de moi.html`
Page analysée : "A propos de moi" (page la plus significative du site vitrine)

#### Types de contenu identifiés

##### 1. Section principale
**Propriétés** :
- `titre` : string (ex: "Mon profil multi compétences", "Mes convictions acquises par empirisme")
- `contenu` : string (texte d'introduction de la section)
- `backgroundColor` : string (couleur de fond, ex: "var(--color_background_default)", "var(--color_primary_contrast_default)")
- `padding` : object (padding top/bottom, ex: "0px 0px 20px")
- `sousSections` : array (liste des sous-sections)

##### 2. Domaine de competences
**Propriétés** :
- `titre` : string (ex: "Stratégie et transformations", "Engager les équipes", "Interactions humaines")
- `contenu` : string (texte d'introduction de la sous-section)
- `items` : array (3 {Compétence})

##### 3. Compétence
**Propriétés** :
- `titre` : string (ex: "Culture d'entreprise", "Stratégie", "Conduite du changement")
- `image` : object
- `description` : string
- `bouton` : object (optionnel)
  - `texte` : string (ex: "En savoir plus")
  - `action` : string (type d'action)

##### 4. Citation avec auteur
**Propriétés** :
- `citation` : string (texte de la citation entre guillemets)
- `auteur` : string (nom de l'auteur)
- `fonction` : string (fonction de l'auteur, en italique)
- `style` : object
  - `fontStyle` : string (ex: "italic")
  - `color` : string (couleur, ex: "var(--color_bTHHW0_default)")

##### 5. Témoignage
**Propriétés** :
- `photo` : object
  - `src` : string (chemin vers la photo)
  - `alt` : string
  - `width` : string (ex: "50px")
  - `borderRadius` : string (ex: "50px" pour un cercle)
  - `border` : object (optionnel)
    - `width` : string
    - `color` : string
- `nom` : string (nom du témoin)
- `fonction` : string (fonction du témoin, en italique)
- `texte` : string (texte du témoignage entre guillemets)
- `style` : object
  - `padding` : string (ex: "10px 0px 30px")

##### 6. Titre de section avec fond coloré
**Propriétés** :
- `texte` : string (texte du titre)
- `niveau` : number (1, 2, 3)
- `backgroundColor` : string (couleur de fond, ex: "var(--color_bTHGN0_default)")
- `color` : string (couleur du texte, ex: "var(--color_primary_contrast_default)")
- `textAlign` : string (ex: "center")
- `fontSize` : string (ex: "24px")
- `fontWeight` : string (ex: "700")

##### 7. Paragraphe de texte
**Propriétés** :
- `contenu` : string (texte du paragraphe, peut contenir du HTML comme `<br>`, `<strong>`, `<em>`, `<a>`)
- `fontFamily` : string (ex: "Noto Serif")
- `fontSize` : string (ex: "14px")
- `fontWeight` : string (ex: "400")
- `color` : string (ex: "var(--color_text_default)")
- `lineHeight` : string (ex: "1.4")
- `width` : string (ex: "100%", "95%", "80%")
- `textAlign` : string (optionnel, ex: "center")

##### 8. Image standalone
**Propriétés** :
- `src` : string (chemin vers l'image)
- `alt` : string (texte alternatif)
- `width` : string (largeur, ex: "60%", "100%")
- `aspectRatio` : string (ratio, ex: "100%")
- `alignSelf` : string (ex: "center")
- `margin` : string (ex: "0px", "20px 0px 0px")

##### 9. Bouton d'action
**Propriétés** :
- `texte` : string (texte du bouton)
- `backgroundColor` : string (ex: "var(--color_primary_contrast_default)")
- `color` : string (ex: "var(--color_bTHGN0_default)")
- `border` : object
  - `style` : string (ex: "solid")
  - `width` : string (ex: "1px")
  - `color` : string
- `fontFamily` : string (ex: "Clint Marker")
- `fontSize` : string (ex: "18px")
- `fontWeight` : string (ex: "bold")
- `padding` : string (ex: "8px 16px")
- `width` : string (ex: "100%", "150px")
- `action` : string (type d'action, ex: "navigation", "modal", "external")

##### 10. Groupe de boutons (footer)
**Propriétés** :
- `boutons` : array (liste des boutons)
- `backgroundColor` : string (ex: "var(--color_bTHGN0_default)")
- `justifyContent` : string (ex: "space-around", "center")
- `height` : string (ex: "50px")

##### 11. Item de bouton social
**Propriétés** :
- `icone` : string (nom de l'icône, ex: "fa-envelope-square", "fa-youtube-play", "fa-linkedin-square", "fa-map")
- `titre` : string (tooltip, ex: "email", "Chaine YouTube", "Linkedin", "Carte du site")
- `color` : string (ex: "var(--color_primary_contrast_default)")
- `action` : object
  - `type` : string (ex: "email", "external", "navigation")
  - `url` : string (optionnel)

#### Structure hiérarchique observée

```
Page
└── Section principale
    ├── Titre de section (h1 ou h2)
    ├── Paragraphe d'introduction
    └── Sous-section
        ├── Titre de sous-section (h2)
        ├── Paragraphe d'introduction
        └── Groupe d'items (3 colonnes)
            └── Item de compétence
                ├── Titre (h3)
                ├── Image
                ├── Description (paragraphe)
                ├── Lien (optionnel)
                └── Bouton (optionnel)
    └── Section de témoignages
        └── Liste de témoignages
            └── Témoignage
                ├── Photo
                ├── Nom (h3)
                ├── Fonction (texte italique)
                └── Texte (paragraphe)
```

#### Observations importantes

1. **Hiérarchie visuelle** : La page utilise une hiérarchie claire avec des sections, sous-sections et items
2. **Responsive** : Les groupes utilisent flexbox avec des largeurs en pourcentage (33%, 50%, 60%, 80%, 95%, 100%)
3. **Couleurs** : Utilisation de variables CSS (--color_bTHGN0_default, --color_text_default, etc.)
4. **Typographie** : Deux familles de polices principales :
   - "Oswald" pour les titres
   - "Noto Serif" pour le texte
5. **Images** : Toutes les images utilisent un aspect-ratio avec padding-top pour maintenir les proportions
6. **Citations** : Format spécifique avec auteur et fonction en italique
7. **Témoignages** : Format avec photo circulaire, nom, fonction et texte

#### Prochaines étapes

1. Créer les interfaces TypeScript pour ces types de contenu
2. Créer un fichier JSON mockup avec ces structures
3. Développer les composants React correspondants
4. Implémenter le responsive pour chaque type de contenu
