# US-5.5 : Décalage des niveaux de titre Markdown vers HTML ✅ COMPLÉTÉ

## En tant que Rédacteur de contenu Markdown

## Je souhaite Utiliser les niveaux de titre standards (#, ##, ###, etc.) dans mes fichiers MD sans être contraint par une validation qui impose de commencer au niveau 3

## Afin de Écrire du contenu Markdown avec une hiérarchie naturelle et standard- **Critères d'acceptation** :

# Critères d'acceptation

## CA1 - Règle métier de décalage
- Les niveaux de titre Markdown sont décalés de +2 lors du rendu HTML :
- `#` dans MD → `<h3>` en HTML
- `##` dans MD → `<h4>` en HTML
- `###` dans MD → `<h5>` en HTML
- `####` dans MD → `<h6>` en HTML
- `#####` et `######` dans MD → `<h6>` en HTML (limite HTML)

## CA2 - Modification de la validation
- Suppression de l'interdiction des titres H1 et H2 dans les fichiers Markdown
- Modification de la validation hiérarchique : vérifie H2 sans H1 (au lieu de H4 sans H3)
- Les fichiers MD peuvent maintenant commencer par `#` ou `##`

## CA3 - Modification du rendu
- `CourseMarkdownRenderer` applique le décalage +2 lors du rendu des titres
- Les parsers (`aboutSiteReader`, `journalMarkdownParser`) cherchent les nouveaux niveaux :
- `# ` pour les parties (au lieu de `### `)
- `## ` pour les sous-parties (au lieu de `#### `)
- `### ` pour les blocs (au lieu de `##### `)- **Scénarios BDD** :
- Création du fichier `tests/bdd/markdown-heading-levels.feature` avec 6 scénarios couvrant :
- Titre H1 Markdown devient H3 HTML
- Titre H2 Markdown devient H4 HTML
- Titre H3 Markdown devient H5 HTML
- Titre H4 Markdown devient H6 HTML
- Validation accepte tous les niveaux de titre
- Hiérarchie complète avec décalage

## CA4 - Tests unitaires
- Suppression des tests de validation H1/H2 obsolètes
- Mise à jour des tests pour utiliser les nouveaux niveaux (`# Partie` au lieu de `### Partie`)
- Modification de la validation hiérarchique (H2 sans H1 au lieu de H4 sans H3)

## CA5 - Migration des fichiers existants
- Les fichiers Markdown existants doivent être mis à jour manuellement avec NotePad++ :
- `### ` → `# ` (parties)
- `#### ` → `## ` (sous-parties)
- `##### ` → `### ` (blocs)
- `###### ` → `#### ` (sous-blocs)
- Les tests unitaires utilisant les anciens niveaux devront être mis à jour progressivement

## CA6 - Documentation
- Mise à jour du journal de bord pour documenter cette implémentation
- Note : Cette US invalide partiellement US-5.1 (qui validait l'interdiction H1/H2) et US-2.6 (ancienne validation H1/H2 interdits)