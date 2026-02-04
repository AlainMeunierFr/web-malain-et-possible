# US-1.2 : Page avec header, footer, logo et photo ✅ COMPLÉTÉ

## En tant que Visiteur du site

## Je souhaite Voir une page avec un header fixe en haut, un footer fixe en bas, un logo en haut à gauche et une photo en haut à droite

## Afin de Avoir une structure de base cohérente pour le site

# Critères d'acceptation

- Le header est fixe en haut avec une hauteur responsive (8.75vh, minimum 78px)
- Le footer est fixe en bas avec une hauteur responsive (5.47vh, minimum 53px)
## CA1 - Le logo et la photo sont des éléments du header (pas du contenu de la page)
- Le logo flotte au-dessus du header en haut à gauche (position absolue, déborde vers le bas)
- La photo flotte au-dessus du header en haut à droite (position absolue, déborde vers le bas)
- Les proportions sont calculées de façon responsive
- La couleur bleue (#0070C0) est définie comme variable CSS `--BleuFonce`
- Le logo a une marge de 10 pixels par raport au haut et au bord gauche du navigateur
- La photo a une marge de 10 pixels par raport au haut et au bord droite du navigateur
- Le contenu de la page commence à 120px du haut pour éviter d'être masqué par le header
- Le contenu de la page ne descend pas en dessous de 60px du bas pour éviter d'être masqué par le footer
- Cette règle s'applique à toutes les pages du site (règle globale)
## CA2 - Z-index du header
- Le header doit avoir un z-index suffisamment élevé (minimum 1000) pour rester au-dessus du contenu qui scroll
- Le contenu qui scroll doit passer DESSOUS le header, pas par-dessus
- Le header doit avoir un arrière-plan opaque pour masquer le contenu