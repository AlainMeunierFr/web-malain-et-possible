# US-3.6 : Amélioration de l'affichage des "Critères d'acceptation" dans le wiki ✅ COMPLÉTÉ

## En tant que Lecteur du wiki du site

## Je souhaite Voir les "Critères d'acceptation" des User Stories structurés hiérarchiquement avec des thèmes de critères en gras et des critères normaux

## Afin de Mieux comprendre l'organisation et la hiérarchie des critères d'acceptation

# Critères d'acceptation

## CA1 - Détection du format dans le parseur
- Le parseur Markdown détecte les éléments de type "Critères d'acceptation" dans les User Stories
- Une section "Critères d'acceptation" commence par la ligne `- **Critères d'acceptation** :` (avec `typeDeContenu: "Critères d'acceptation"`)
- Cette section se termine soit :
- À la prochaine User Story (ligne commençant par `### US-`)
- À un séparateur `---`
- À la fin de la sous-partie (H4)
- Dans cette section "Critères d'acceptation" :
- Si une ligne commence par `- **` : c'est un "Thème de critère" (puce de niveau 1, texte en gras)
- Sinon (ligne commence par `- ` sans `**` au début) : c'est un "Critère" (puce de niveau 2, texte normal, indenté sous le thème précédent)
- Les critères sont imbriqués sous leur thème de critère correspondant (le dernier thème rencontré)

## CA2 - Structure de données
- Les éléments de type "Critères d'acceptation" sont enrichis avec une structure hiérarchique
- Les thèmes de critères et les critères sont distingués et structurés dans le JSON généré

## CA3 - Affichage CSS dans le wiki
- Les thèmes de critères (niveau 1) : puce de niveau 1, texte en gras (style `**texte**` rendu en `<strong>`)
- Les critères (niveau 2) : puce de niveau 2 (indentée), texte normal
- Hiérarchie visuelle claire entre thèmes et critères (indentation)

## CA4 - Comportement implicite de l'IA
- Lorsque j'écris une User Story dans le wiki, je respecte cette structure dans la section "Critères d'acceptation" :
- `- **Thème de critère**` pour les thèmes (ex: `- **CSS responsive** :`)
- `- Critère normal` (sans `**` au début) pour les critères sous ce thème
- La règle est ajoutée dans la DOD "Comportement implicite de l'IA" (section sur l'écriture des User Stories)