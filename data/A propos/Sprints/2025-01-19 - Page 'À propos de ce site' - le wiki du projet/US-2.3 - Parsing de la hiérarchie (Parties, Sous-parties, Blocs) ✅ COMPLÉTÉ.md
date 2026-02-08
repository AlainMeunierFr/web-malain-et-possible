# US-2.3 : Parsing de la hiérarchie (Parties, Sous-parties, Blocs) ✅ COMPLÉTÉ

## En tant que Système backend

## Je souhaite Extraire la structure hiérarchique complète d'un fichier MD : parties (###), sous-parties (####) et blocs (#####)

## Afin de Construire la structure hiérarchique Partie → Sous-partie → Bloc

# Critères d'acceptation

## CA1 - Parties (###) : Chaque titre ### est détecté comme une partie, le titre est extrait, le contenu est extrait jusqu'à la prochaine partie ou fin de fichier
## CA2 - Sous-parties (####) : Chaque titre #### est détecté comme une sous-partie, le titre est extrait, le contenu est extrait jusqu'à la prochaine sous-partie, partie ou fin de fichier
## CA3 - Blocs (#####) : Chaque titre ##### est détecté comme un bloc, le titre est extrait, le contenu est extrait jusqu'au prochain bloc, sous-partie, partie ou fin de fichier
- La hiérarchie est respectée : Bloc dans Sous-partie, Sous-partie dans Partie