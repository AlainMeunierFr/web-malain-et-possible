# US-6.7 : Unification de l'architecture des images ✅ COMPLÉTÉ

- **En tant que** développeur/mainteneur du site
- **Je souhaite** avoir une architecture unifiée pour toutes les images
- **Afin de** faciliter la maintenance, garantir la cohérence et éviter la duplication des chemins

- **Critères d'acceptation** :

- **CA1 - Structure des dossiers** :
  - Toutes les images déplacées de `public/images/` vers `data/images/`
  - Création de 3 sous-dossiers : `json/`, `md/`, `static/`
  - Le dossier `public/images/` est maintenant vide

- **CA2 - API Route** :
  - Nouvelle route : `/api/images/[type]/[filename]`
  - Types acceptés : `json`, `md`, `static`
  - Validation du type et service depuis `data/images/{type}/`

- **CA3 - Fonctions utilitaires** :
  - `getJsonImagePath(filename)` → `/api/images/json/${filename}`
  - `getMdImagePath(filename)` → `/api/images/md/${filename}`
  - `getStaticImagePath(filename)` → `/api/images/static/${filename}`

- **CA4 - Composants modifiés** :
  - `DomaineDeCompetences.tsx` : utilise `getJsonImagePath()` pour les images de compétences
  - `Temoignages.tsx` : utilise `getJsonImagePath()` pour les photos
  - `AboutSiteContentRenderer.tsx` : utilise `getMdImagePath()` pour les images Markdown
  - `aboutSiteReader.ts` : construit automatiquement le chemin MD pour les images Markdown
  - `headerImages.ts` : utilise `getStaticImagePath()` pour Logo et Photo

- **CA5 - Format dans les fichiers** :
  - **JSON** : `"src": "Logo.png"` (juste le nom de fichier, sans chemin complet)
  - **MD** : `![alt](Logo.png)` (juste le nom de fichier, sans `/api/images/`)

- **CA6 - Configuration** :
  - `next.config.ts` : headers de cache mis à jour pour `/api/images/:type/:path*`
  - Tests unitaires mis à jour avec les nouveaux chemins

**Avantages** :
- Séparation claire entre images JSON, MD et statiques
- Réduction de la redondance (pas de chemin complet dans les fichiers)
- Flexibilité (changement de chemin centralisé dans le code)
- Cohérence : contenu et images au même endroit (approche CMS)

---