# Vocabulaire pour les consignes d’ancrage et d’alignement

Ce document définit les termes à utiliser pour donner des consignes sur la position des éléments dans leur conteneur (alignement, répartition, ancrage). Utilise ces libellés dans tes instructions pour que l’assistant applique le bon CSS.

---

## 1. Alignement horizontal (axe principal du texte / ligne)

À utiliser pour : **contenu dans un bloc** (texte, boutons, enfants en ligne ou en colonne selon le sens du flex/grid).

| Consigne à employer | Signification | Équivalent CSS (flex) | Équivalent CSS (texte) |
|--------------------|---------------|------------------------|------------------------|
| **aligné à gauche** | Éléments collés au bord gauche du conteneur | `justify-content: flex-start` | `text-align: left` |
| **aligné à droite** | Éléments collés au bord droit du conteneur | `justify-content: flex-end` | `text-align: right` |
| **centré horizontalement** | Éléments au centre du conteneur en largeur | `justify-content: center` | `text-align: center` |
| **répartis** (ou **répartis sur toute la largeur**) | Espace égal entre les éléments, bords sans marge vide | `justify-content: space-between` | — |
| **répartis avec espaces égaux** | Espace égal entre les éléments et entre bords et premier/dernier élément | `justify-content: space-evenly` | — |
| **répartis avec marges égales** | Espace égal autour de chaque élément (gauche/droite) | `justify-content: space-around` | — |

Pour **du texte seul** dans un bloc, privilégier : *aligné à gauche*, *aligné à droite*, *centré horizontalement* (souvent avec `text-align`).

---

## 2. Alignement vertical (axe perpendiculaire)

À utiliser pour : **position du contenu en hauteur** dans un conteneur (colonne ou ligne).

| Consigne à employer | Signification | Équivalent CSS (flex) |
|---------------------|---------------|------------------------|
| **aligné en haut** (ou **en tête**) | Contenu collé en haut du conteneur | `align-items: flex-start` |
| **aligné en bas** (ou **en pied**) | Contenu collé en bas du conteneur | `align-items: flex-end` |
| **centré verticalement** | Contenu au milieu en hauteur | `align-items: center` |
| **étiré** (ou **même hauteur**) | Les enfants prennent toute la hauteur du conteneur | `align-items: stretch` |

Pour une **grille** : `align-items` sur le conteneur, ou `align-self` sur l’élément.

---

## 3. Répartition dans une grille

| Consigne à employer | Signification | Équivalent CSS |
|---------------------|---------------|----------------|
| **colonnes de largeur égale** | Autant de colonnes que souhaité, même largeur | `grid-template-columns: repeat(N, 1fr)` ou `1fr 1fr` pour 2 colonnes égales |
| **une colonne, deux colonnes…** | Nombre de colonnes | `grid-template-columns: 1fr`, `1fr 1fr`, etc. |
| **la colonne de gauche / de droite** | Cible la première ou la dernière colonne | Sélecteur sur l’enfant (ex. `:first-child`, `.ui-heroGauche`) |

---

## 4. Ancrage d’un seul élément dans son conteneur

Pour **un bloc unique** (ex. un titre, un paragraphe) dans une zone :

| Consigne à employer | Signification | Équivalent CSS |
|---------------------|---------------|----------------|
| **ancré à gauche** | Collé au bord gauche | `margin-right: auto` (dans un flex) ou `align-self: flex-start` + `text-align: left` |
| **ancré à droite** | Collé au bord droit | `margin-left: auto` (dans un flex) ou `align-self: flex-end` + `text-align: right` |
| **centré** (dans le conteneur) | Centré en horizontal et/ou vertical selon le contexte | `margin: 0 auto` (horizontal) ou flex/grid `justify-content: center` + `align-items: center` |
| **étiré en largeur** | Prend toute la largeur du conteneur | `width: 100%` ou `align-self: stretch` |

---

## 5. Ordre et sens d’empilement

| Consigne à employer | Signification | Équivalent CSS |
|---------------------|---------------|----------------|
| **empilés en colonne** | Blocs les uns sous les autres | `flex-direction: column` ou `display: block` |
| **empilés en ligne** (ou **côte à côte**) | Blocs alignés sur une ligne | `flex-direction: row` (ou `row` par défaut) |
| **inverser l’ordre** | Ordre visuel inversé (droite→gauche ou bas→haut) | `flex-direction: row-reverse` ou `column-reverse` |

---

## 6. Marges et espacement

| Consigne à employer | Signification | Équivalent CSS |
|---------------------|---------------|----------------|
| **collés** (sans espace) | Pas d’espace entre conteneur et contenu ou entre frères | `padding: 0`, `gap: 0`, `margin: 0` selon le cas |
| **espacés de X** | Espace régulier entre éléments (ou avec le bord) | `gap: X` (flex/grid) ou `margin` / `padding` |
| **marge uniquement en bas / en haut / à gauche / à droite** | Marge sur un seul côté | `margin-bottom: X`, `margin-top: X`, etc. |

---

## 7. Exemples de consignes rédigées

- *« Le titre et le sous-titre du hero sont **centrés horizontalement** dans la colonne de gauche. »*  
  → `text-align: center` sur les blocs concernés, ou `align-items: center` sur `.ui-heroGauche` si c’est un flex en colonne.

- *« La colonne gauche du hero est **centrée verticalement** par rapport à la vidéo. »*  
  → Sur le conteneur grille/flex du hero : `align-items: center`, ou sur `.ui-heroGauche` : `justify-content: center` (si direction colonne).

- *« Les deux boutons du hero sont **répartis** sur toute la largeur. »*  
  → `justify-content: space-between` sur `.ui-heroCtas` (avec `display: flex`).

- *« Le bloc texte du hero est **ancré à gauche** dans sa colonne. »*  
  → Contenu de `.ui-heroGauche` avec `align-items: flex-start` (ou équivalent) et `text-align: left`.

Tu peux copier-coller ou adapter ces formulations dans tes prompts pour que l’assistant applique le bon ancrage et le bon alignement.
