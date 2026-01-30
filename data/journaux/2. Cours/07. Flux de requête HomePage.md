# Formation : Flux de requête HomePage - Debug pas à pas

## Vue d'ensemble

Ce document explique **séquentiellement** ce qui se passe lorsqu'un navigateur appelle l'URL `/` (HomePage) dans cette application Next.js.

---

## ÉTAPE 1 : Requête HTTP du navigateur

### Composant technique : **Navigateur Web** (Chrome, Firefox, etc.)
- **Langage** : HTTP/HTTPS (protocole réseau)
- **Type de fichier** : Requête HTTP (non fichier)
- **Entrée** :
  - URL : `http://localhost:3000/` ou `https://example.com/`
  - Méthode HTTP : `GET`
  - Headers HTTP (User-Agent, Accept, etc.)

### Sortie
- Requête HTTP envoyée au serveur Next.js
- Le navigateur attend une réponse HTML

---

## ÉTAPE 2 : Réception par le serveur Next.js

### Composant technique : **Serveur Next.js** (Node.js)
- **Langage** : JavaScript/TypeScript (exécuté par Node.js)
- **Type de fichier** : Serveur HTTP intégré dans Next.js
- **Entrée** :
  - Requête HTTP GET pour `/`
  - Headers HTTP

### Sortie
- Requête routée vers le système de routing Next.js
- Recherche du fichier correspondant dans `app/page.tsx`

---

## ÉTAPE 3 : Configuration Next.js (`next.config.ts`)

### Composant technique : **Next.js Configuration**
- **Langage** : TypeScript
- **Type de fichier** : `next.config.ts`
- **Entrée** :
  - Configuration du projet (compression, images, redirections, headers)

### Sortie
- Configuration appliquée pour la requête :
  - Compression activée (gzip/brotli)
  - Headers de sécurité configurés
  - Optimisations d'images activées

**Fichier concerné** : `next.config.ts`

```typescript
// Configuration Next.js (lignes 7-64)
const nextConfig: NextConfig = {
  compress: true, // Compression HTTP
  images: { /* ... */ },
  async headers() { /* Headers de sécurité */ }
};
```

---

## ÉTAPE 4 : Layout racine (`app/layout.tsx`)

### Composant technique : **React Server Component** (Next.js App Router)
- **Langage** : TypeScript + JSX
- **Type de fichier** : `app/layout.tsx`
- **Entrée** :
  - `children` : ReactNode (sera le contenu de la page HomePage)

### Sortie
- Structure HTML de base :
  ```html
  <html lang="fr">
    <body>
      <Header />      <!-- Composant Client -->
      {children}      <!-- Contenu de HomePage -->
      <Footer />      <!-- Composant Client -->
    </body>
  </html>
  ```

**Fichier concerné** : `app/layout.tsx`

```typescript:12:26:app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

### Détail important
- `<Header />` et `<Footer />` sont des **Client Components** (`'use client'`)
- Ils sont **exécutés côté client** (navigateur)
- Le `{children}` sera rendu **côté serveur** (HomePage)

---

## ÉTAPE 5 : Page HomePage (`app/page.tsx`)

### Composant technique : **React Server Component**
- **Langage** : TypeScript + JSX
- **Type de fichier** : `app/page.tsx`
- **Entrée** : Aucun (c'est le point d'entrée de la route `/`)

### Sortie
- Appel à `readPageData('index.json')` → retourne `PageData`
- JSX avec `<main>` et `<PageContentRenderer>`

**Fichier concerné** : `app/page.tsx`

```typescript:9:19:app/page.tsx
export default function HomePage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const pageData = readPageData('index.json');

  return (
    <main className={styles.main}>
      {/* Affichage de tous les éléments de contenu */}
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
```

### Point important
- **Exécution côté serveur** : `readPageData()` est appelé **avant** l'envoi au navigateur
- Le fichier JSON est lu **sur le serveur**, pas côté client

---

## ÉTAPE 6 : Lecture du fichier JSON (`utils/indexReader.ts`)

### Composant technique : **Backend pur** (Node.js File System)
- **Langage** : TypeScript
- **Type de fichier** : `utils/indexReader.ts`
- **Fonction** : `readPageData(filename: string)`
- **Entrée** :
  - `filename` : `"index.json"` (string)

### Sortie
- `PageData` : Objet TypeScript avec structure :
  ```typescript
  {
    contenu: ElementContenu[]  // Tableau d'éléments de contenu
  }
  ```

**Fichier concerné** : `utils/indexReader.ts`

```typescript:241:285:utils/indexReader.ts
export const readPageData = (filename: string = 'index.json'): PageData => {
  const filePath = path.join(process.cwd(), 'data', filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier ${filename} n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);

  // Si c'est l'ancienne structure (domainesDeCompetences), on la convertit
  if ('domainesDeCompetences' in data && !('contenu' in data)) {
    return convertirIndexDataEnPageData(data as IndexData);
  }

  // Résoudre les références externes dans le contenu
  const pageData = data as PageData;
  if (pageData.contenu) {
    pageData.contenu = pageData.contenu.map(element => {
      // Résoudre les témoignages depuis un fichier source
      if (element.type === 'temoignages' && element.source && !element.items) {
        const sourceFilePath = path.join(process.cwd(), 'data', element.source);
        if (fs.existsSync(sourceFilePath)) {
          const sourceContent = fs.readFileSync(sourceFilePath, 'utf8');
          const sourceData = JSON.parse(sourceContent);
          return { ...element, items: sourceData.items };
        }
      }
      
      // Résoudre les détournements vidéo depuis un fichier source
      if (element.type === 'videoDetournement' && element.source && !element.items) {
        const sourceFilePath = path.join(process.cwd(), 'data', element.source);
        if (fs.existsSync(sourceFilePath)) {
          const sourceContent = fs.readFileSync(sourceFilePath, 'utf8');
          const sourceData = JSON.parse(sourceContent);
          return { ...element, items: sourceData.détournements || sourceData.items };
        }
      }
      
      return element;
    });
  }

  return pageData;
};
```

### Détails techniques
1. **`fs.existsSync(filePath)`** : Vérifie si le fichier existe (Node.js File System API)
2. **`fs.readFileSync(filePath, 'utf8')`** : Lit le fichier **synchronement** (bloque jusqu'à la fin)
3. **`JSON.parse(fileContent)`** : Parse le JSON en objet JavaScript
4. **Résolution des références** : Si un élément a un `source`, on charge ce fichier JSON externe

### Fichier lu : `data/index.json`
- **Format** : JSON
- **Structure** :
  ```json
  {
    "contenu": [
      { "type": "titre", "texte": "Mon parcours..." },
      { "type": "video", "urlYouTube": "https://...", "lancementAuto": false },
      { "type": "domaineDeCompetence", "titre": "...", "items": [...] }
    ]
  }
  ```

---

## ÉTAPE 7 : Rendu du contenu (`components/PageContentRenderer.tsx`)

### Composant technique : **React Server Component**
- **Langage** : TypeScript + JSX
- **Type de fichier** : `components/PageContentRenderer.tsx`
- **Entrée** :
  - `contenu` : `ElementContenu[]` (tableau d'éléments)

### Sortie
- JSX avec tous les composants rendus selon le `type` de chaque élément

**Fichier concerné** : `components/PageContentRenderer.tsx`

```typescript:28:65:components/PageContentRenderer.tsx
const PageContentRenderer: React.FC<PageContentRendererProps> = ({ contenu }) => {
  return (
    <>
      {contenu.map((element, index) => {
        switch (element.type) {
          case 'titre':
            return <Titre key={index} element={element} />;
          case 'video':
            return <Video key={index} element={element} />;
          case 'texteLarge':
            return <TexteLarge key={index} element={element} />;
          case 'domaineDeCompetence':
            return (
              <DomaineDeCompetences
                key={index}
                domaine={{
                  titre: element.titre,
                  contenu: element.contenu,
                  items: element.items,
                }}
              />
            );
          case 'callToAction':
            return <CallToAction key={index} element={element} />;
          case 'groupeBoutons':
            return <GroupeBoutons key={index} element={element} />;
          case 'temoignages':
            return <Temoignages key={index} element={element} />;
          case 'videoDetournement':
            return <VideoDetournement key={index} element={element} />;
          default:
            return null;
        }
      })}
    </>
  );
};
```

### Logique
- **Parcours** : Pour chaque élément du tableau `contenu`
- **Switch** : Sélectionne le composant React approprié selon le `type`
- **Rendu** : Chaque composant reçoit ses props et se rend

### Composants utilisés
1. `Titre` : Affiche un titre (H1 ou H2)
2. `Video` : Affiche une vidéo YouTube
3. `TexteLarge` : Affiche un texte formaté
4. `DomaineDeCompetences` : Affiche un domaine avec ses compétences
5. `CallToAction` : Affiche un bouton d'action
6. `GroupeBoutons` : Affiche un groupe de boutons
7. `Temoignages` : Affiche une grille de témoignages (lazy loaded)
8. `VideoDetournement` : Affiche des détournements vidéo (lazy loaded)

---

## ÉTAPE 8 : Composants individuels (exemple : `Titre`)

### Composant technique : **React Component**
- **Langage** : TypeScript + JSX
- **Type de fichier** : `components/Titre.tsx`
- **Entrée** :
  - `element` : `ElementTitre` = `{ type: 'titre', texte: string }`

### Sortie
- JSX : `<h1>` ou `<h2>` avec le texte

**Exemple avec Titre** :
```typescript
<Titre element={{ type: 'titre', texte: 'Mon parcours, mes transformations' }} />
```

→ Rendu comme : `<h1>Mon parcours, mes transformations</h1>`

---

## ÉTAPE 9 : Génération HTML côté serveur

### Composant technique : **Next.js Server-Side Rendering (SSR)**
- **Langage** : HTML généré par React
- **Type de fichier** : HTML (généré dynamiquement)

### Sortie
- HTML complet avec :
  - `<html>`, `<head>`, `<body>`
  - Tout le contenu rendu depuis les composants
  - Styles CSS (via `<link>` ou `<style>`)
  - Scripts JavaScript pour l'hydratation React

---

## ÉTAPE 10 : Envoi HTML au navigateur

### Composant technique : **Serveur Next.js → Navigateur**
- **Langage** : HTTP/HTML
- **Type de fichier** : Réponse HTTP

### Sortie
- Réponse HTTP 200 OK
- Headers HTTP (Content-Type: text/html, etc.)
- Corps : HTML complet

---

## ÉTAPE 11 : Réception et parsing HTML (Navigateur)

### Composant technique : **Navigateur Web** (moteur de rendu)
- **Langage** : HTML/CSS
- **Type de fichier** : HTML parsé en DOM

### Sortie
- DOM (Document Object Model) créé
- Styles CSS appliqués
- Scripts JavaScript chargés

---

## ÉTAPE 12 : Hydratation React côté client

### Composant technique : **React Client-Side Hydration**
- **Langage** : JavaScript (exécuté par le navigateur)
- **Type de fichier** : JavaScript bundle (Next.js)

### Ce qui se passe
- React **"prend le contrôle"** du DOM déjà rendu
- Les **Client Components** (`Header`, `Footer`) deviennent interactifs
- Les **lazy-loaded components** (`Temoignages`, `VideoDetournement`) sont chargés

### Composants Client

#### Header (`components/Header.tsx`)
- **Type** : `'use client'` (Client Component)
- **Fonctionnalités** :
  - Clic sur le logo → navigation via `router.push()`
  - Gestion du clavier (accessibilité)

#### Footer (`components/Footer.tsx`)
- **Type** : `'use client'` (Client Component)
- **Fonctionnalités** :
  - Clic sur boutons → navigation interne/externe
  - Utilise `router.push()` pour navigation interne
  - Utilise `window.open()` pour liens externes

---

## Résumé du flux complet

```
1. Navigateur      → GET /                    [HTTP Request]
2. Serveur Next.js → Réception requête        [Node.js HTTP Server]
3. Next.js Config  → Application config       [next.config.ts]
4. Layout          → Structure HTML de base   [app/layout.tsx]
5. HomePage        → Appel readPageData()     [app/page.tsx]
6. Backend pur     → Lecture index.json       [utils/indexReader.ts]
7. File System     → Lecture fichier JSON     [Node.js fs API]
8. PageRenderer    → Sélection composants     [components/PageContentRenderer.tsx]
9. Composants      → Rendu JSX                [components/*.tsx]
10. Next.js SSR    → Génération HTML          [React Server Components]
11. Serveur        → Envoi HTML au navigateur [HTTP Response]
12. Navigateur     → Parsing HTML → DOM       [Browser Engine]
13. React Hydrate  → Activation composants    [React Client Hydration]
14. Composants     → Interactivité            [Client Components]
```

---

## Concepts clés

### Server Components vs Client Components

**Server Components** (exécutés sur le serveur) :
- `app/page.tsx`
- `app/layout.tsx`
- `components/PageContentRenderer.tsx`
- `components/Titre.tsx`, `Video.tsx`, etc.

**Client Components** (exécutés dans le navigateur) :
- `components/Header.tsx` (`'use client'`)
- `components/Footer.tsx` (`'use client'`)
- Composants avec interactivité (clics, états, etc.)

### Backend pur

**Définition** : Code qui **ne dépend pas** de l'environnement (serveur ou client).

**Exemple** : `utils/indexReader.ts`
- Utilise `fs` (File System) → **seulement côté serveur**
- Mais la **logique** est réutilisable et testable indépendamment

### Flux de données

```
JSON (data/index.json)
  ↓
readPageData() (Backend pur)
  ↓
PageData (TypeScript object)
  ↓
PageContentRenderer (Server Component)
  ↓
Composants individuels (Server Components)
  ↓
HTML généré (SSR)
  ↓
Navigateur → DOM
  ↓
React Hydration → Interactivité
```

---

## Pour aller plus loin

### Debugging

1. **Côté serveur** : Ajouter `console.log()` dans `readPageData()` → visible dans les logs Next.js
2. **Côté client** : Ajouter `console.log()` dans les Client Components → visible dans la console du navigateur
3. **React DevTools** : Inspecter les composants et leurs props

### Performance

- **Server Components** : Moins de JavaScript envoyé au client
- **Lazy Loading** : `Temoignages` et `VideoDetournement` chargés à la demande
- **CSS Modules** : Styles scoped, pas de conflits

### Types TypeScript

Tous les types sont définis dans `utils/indexReader.ts` :
- `PageData`
- `ElementContenu`
- `ElementTitre`, `ElementVideo`, etc.

---

## Conclusion

Le flux est **séquentiel et clair** :
1. Requête HTTP
2. Routing Next.js
3. Server Components (lecture JSON)
4. Rendu HTML
5. Envoi au navigateur
6. Hydratation React
7. Interactivité Client Components

**Point important** : La plupart du code s'exécute **côté serveur**, ce qui améliore les performances et le SEO.
