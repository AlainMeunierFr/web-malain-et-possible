# Instructions pour télécharger les polices Outfit

## Option 1 : Google Webfonts Helper (Recommandé)

1. Allez sur : https://gwfh.mranftl.com/fonts/outfit
2. **Sélectionnez les poids** :
   - ✅ 400 (Regular)
   - ✅ 600 (SemiBold) 
   - ✅ 700 (Bold)
3. **Sélectionnez le style** : ✅ normal
4. **Sélectionnez les subsets** : ✅ latin
5. Cliquez sur **"Download @font-face kit"**
6. Extrayez le ZIP
7. Copiez les fichiers dans `public/fonts/` :
   - `outfit-v15-latin-regular.woff2` → `Outfit-Regular.woff2`
   - `outfit-v15-latin-regular.woff` → `Outfit-Regular.woff`
   - `outfit-v15-latin-regular.ttf` → `Outfit-Regular.ttf`
   - `outfit-v15-latin-600.woff2` → `Outfit-SemiBold.woff2`
   - `outfit-v15-latin-600.woff` → `Outfit-SemiBold.woff`
   - `outfit-v15-latin-600.ttf` → `Outfit-SemiBold.ttf`
   - `outfit-v15-latin-700.woff2` → `Outfit-Bold.woff2`
   - `outfit-v15-latin-700.woff` → `Outfit-Bold.woff`
   - `outfit-v15-latin-700.ttf` → `Outfit-Bold.ttf`

## Option 2 : Google Fonts Direct

1. Allez sur : https://fonts.google.com/specimen/Outfit
2. Cliquez sur "Download family" (en haut à droite)
3. Extrayez le ZIP
4. Les fichiers sont dans `outfit/static/`
5. Renommez et copiez dans `public/fonts/` :
   - `Outfit-Regular.ttf` → convertissez en WOFF2 et WOFF
   - `Outfit-SemiBold.ttf` → convertissez en WOFF2 et WOFF
   - `Outfit-Bold.ttf` → convertissez en WOFF2 et WOFF

## Option 3 : Conversion depuis TTF

Si vous avez les fichiers TTF, utilisez :
- https://cloudconvert.com/ttf-to-woff2
- https://cloudconvert.com/ttf-to-woff

## Structure finale attendue

```
public/fonts/
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
