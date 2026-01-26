# Dossier des polices personnalisées

Ce dossier contient tous les fichiers de polices personnalisées utilisées sur le site. Toutes les polices sont chargées localement pour garantir la disponibilité sur tous les navigateurs (y compris mobile) et éviter les dépendances externes.

## Polices requises

### 1. Clint Marker
**Utilisation** : Boutons d'action

**Fichiers requis** :
- `ClintMarker.woff2` (prioritaire)
- `ClintMarker.woff` (fallback)
- `ClintMarker.ttf` (fallback ultime)

**Poids** : normal (400)

---

### 2. Outfit
**Utilisation** : Titres (H1-H6) et corps de texte (même famille pour cohérence)

**Fichiers requis** :
- `Outfit-Regular.woff2` / `Outfit-Regular.woff` / `Outfit-Regular.ttf` (poids 400)
- `Outfit-SemiBold.woff2` / `Outfit-SemiBold.woff` / `Outfit-SemiBold.ttf` (poids 600)
- `Outfit-Bold.woff2` / `Outfit-Bold.woff` / `Outfit-Bold.ttf` (poids 700)

**Poids utilisés** : 400 (texte), 600 (titres H3-H6), 700 (titres H1-H2)

**Caractéristiques** : Moderne, spacieuse mais compacte, très lisible, caractère doux qui s'harmonise bien avec des illustrations faites main.

---

## Comment obtenir les fichiers

### Option 1 : Téléchargement depuis Google Fonts

Utilisez [google-webfonts-helper](https://gwfh.mranftl.com/) pour télécharger toutes les polices dans tous les formats :

- **Clint Marker** : https://gwfh.mranftl.com/fonts/clint-marker
- **Outfit** : https://gwfh.mranftl.com/fonts/outfit

### Option 2 : Conversion depuis fichiers existants

Si vous avez déjà les fichiers de police (format .ttf ou .otf), utilisez un convertisseur :

- [CloudConvert](https://cloudconvert.com/) : convertit TTF/OTF vers WOFF2 et WOFF
- [FontSquirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator) : génère tous les formats nécessaires

---

## Structure attendue

```
public/
  fonts/
    ClintMarker.woff2
    ClintMarker.woff
    ClintMarker.ttf
    Outfit-Regular.woff2
    Outfit-Regular.woff
    Outfit-Regular.ttf
    Outfit-SemiBold.woff2
    Outfit-SemiBold.woff
    Outfit-SemiBold.ttf
    Outfit-Bold.woff2
    Outfit-Bold.woff
    Outfit-Bold.ttf
```

---

## Avantages du chargement local

✅ **Disponibilité garantie** : Les polices sont servies depuis le même domaine, pas de dépendance externe  
✅ **Performance** : Pas de requête réseau externe, chargement plus rapide  
✅ **Compatibilité mobile** : Fonctionne même si Google Fonts est bloqué  
✅ **Multi-navigateurs** : Support de tous les navigateurs via les différents formats (WOFF2, WOFF, TTF)  
✅ **Privacy** : Pas de requête vers des services tiers (Google Fonts)

---

## Note importante

Le CSS (`app/globals.css`) est déjà configuré pour charger ces fichiers via `@font-face`. Une fois les fichiers placés dans ce dossier, toutes les polices seront automatiquement disponibles sur tous les navigateurs, y compris mobile.
