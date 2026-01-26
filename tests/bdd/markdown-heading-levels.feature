# US : Décalage des niveaux de titre Markdown vers HTML

## Contexte
En tant que rédacteur de contenu Markdown
Je veux utiliser les niveaux de titre standards (#, ##, ###, etc.) dans mes fichiers MD
Afin de ne plus être contraint par une validation qui impose de commencer au niveau 3

## Règle métier
Les niveaux de titre Markdown sont décalés de +2 lors du rendu HTML :
- `#` dans MD → `<h3>` en HTML
- `##` dans MD → `<h4>` en HTML
- `###` dans MD → `<h5>` en HTML
- `####` dans MD → `<h6>` en HTML
- etc.

## Scénario 1 : Titre H1 Markdown devient H3 HTML
Étant donné un fichier Markdown avec un titre de niveau 1
```
# Mon titre principal
```
Quand le contenu est rendu en HTML
Alors le titre doit être rendu comme `<h3>Mon titre principal</h3>`

## Scénario 2 : Titre H2 Markdown devient H4 HTML
Étant donné un fichier Markdown avec un titre de niveau 2
```
## Mon sous-titre
```
Quand le contenu est rendu en HTML
Alors le titre doit être rendu comme `<h4>Mon sous-titre</h4>`

## Scénario 3 : Titre H3 Markdown devient H5 HTML
Étant donné un fichier Markdown avec un titre de niveau 3
```
### Ma section
```
Quand le contenu est rendu en HTML
Alors le titre doit être rendu comme `<h5>Ma section</h5>`

## Scénario 4 : Titre H4 Markdown devient H6 HTML
Étant donné un fichier Markdown avec un titre de niveau 4
```
#### Ma sous-section
```
Quand le contenu est rendu en HTML
Alors le titre doit être rendu comme `<h6>Ma sous-section</h6>`

## Scénario 5 : Validation accepte tous les niveaux de titre
Étant donné un fichier Markdown avec des titres de niveau 1 et 2
```
# Titre principal
## Sous-titre
### Section
```
Quand le fichier est validé
Alors aucune erreur de validation ne doit être levée

## Scénario 6 : Hiérarchie complète avec décalage
Étant donné un fichier Markdown avec une hiérarchie complète
```
# Niveau 1
## Niveau 2
### Niveau 3
#### Niveau 4
##### Niveau 5
###### Niveau 6
```
Quand le contenu est rendu en HTML
Alors les titres doivent être rendus comme :
- `#` → `<h3>`
- `##` → `<h4>`
- `###` → `<h5>`
- `####` → `<h6>`
- `#####` → reste `<h6>` (limite HTML)
- `######` → reste `<h6>` (limite HTML)
