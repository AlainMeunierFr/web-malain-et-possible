# US-3.11 : Alternance de fond pour améliorer la lisibilité visuelle ✅ COMPLÉTÉ

- **En tant que** Visiteur du site
- **Je souhaite** Voir les différents domaines de compétences avec des fonds alternés (blanc et bleu clair)
- **Afin de** Faciliter la distinction visuelle entre les différentes idées et améliorer la navigation visuelle

- **Critères d'acceptation** :
- **Alternance automatique** : Les composants `DomaineDeCompetences` alternent automatiquement entre fond blanc (index impair) et fond bleu clair (index pair)
- **Remise à zéro sur les titres** : Chaque titre (`Titre` composant) remet à zéro le compteur d'alternance, garantissant que le premier domaine après un titre est toujours blanc
- **Vidéos exclues** : Les composants `Video` ont toujours un fond blanc et ne participent pas à l'alternance
- **Gestion dynamique** : L'alternance est calculée dynamiquement dans `PageContentRenderer` en fonction de la position dans la liste, évitant les problèmes lors de la réorganisation des JSON
- **Styles CSS** : 
  - Classe `.containerLight` pour `DomaineDeCompetences` avec `background-color: var(--BleuClair)`
  - Classe `.videoContainerLight` pour `Video` (non utilisée car vidéos toujours blanches)
- **Comportement** : 
  - Premier `DomaineDeCompetences` après un titre (index 0, pair) = fond blanc
  - Deuxième (index 1, impair) = fond bleu clair
  - Et ainsi de suite
- **En tant que** Visiteur du site
- **Je souhaite** Voir une visualisation graphique du plan du site avec des rectangles (pages) et des flèches (liens)
- **Afin de** Naviguer facilement et découvrir tout le contenu disponible

- **Note** : Cette US sera traitée après US-3.10a, une fois la structure de données validée