# Architecture hexagonale appliquée à Next.js : séparation Backend Pur / Backend Next.js

## Introduction

Dans les projets Next.js classiques, la logique métier est souvent mélangée avec la logique de présentation et de génération HTML. Cette approche rend le code difficile à tester, à réutiliser, et à maintenir. La logique métier devient dépendante de React, Next.js, et du contexte navigateur, ce qui complique les tests et limite la réutilisabilité.

Le besoin identifié est triple :
1. **Testabilité** : Pouvoir tester la logique métier sans dépendre de React ou Next.js
2. **Réutilisabilité** : Utiliser la même logique dans différents contextes (ligne de commande, tests, composants React, API)
3. **Séparation des préoccupations** : Distinguer clairement la logique métier (quoi) de la logique de présentation (comment)

Pour répondre à ces besoins, les principes de l'architecture hexagonale ont été appliqués à Next.js, créant une séparation claire entre le "backend pur" (logique métier) et le "backend Next.js" (génération HTML et interactivité). Cette approche, bien que peu courante dans les projets Next.js standards, permet d'atteindre un niveau de testabilité et de maintenabilité élevé.

## Résumé

Cette stratégie repose sur une séparation architecturale en deux couches distinctes :

**Backend Pur (`utils/`)**
Toute la logique métier réutilisable est isolée dans le dossier `utils/`. Ces fonctions sont :
- **Indépendantes de React/Next.js** : Utilisables en ligne de commande, dans les tests, ou dans n'importe quel contexte Node.js
- **Testables sans mocks complexes** : Pas besoin de mocker React, Next.js, ou le navigateur
- **Réutilisables** : La même fonction peut être utilisée dans un Server Component, un Client Component, une API Route, ou un script en ligne de commande

**Backend Next.js (`app/`, `components/`)**
La génération HTML et l'interactivité sont gérées par Next.js :
- **Server Components** : Génération HTML côté serveur pour le SEO et la performance
- **Client Components** : Interactivité navigateur (clics, navigation, hooks React)
- **Appel au backend pur** : Les composants Next.js appellent les fonctions du backend pur et utilisent leurs résultats

**Avantages de cette séparation**
Cette architecture crée une frontière claire entre la logique métier (testable, réutilisable) et la logique de présentation (spécifique à Next.js). Le backend pur peut être testé exhaustivement sans dépendances externes, tandis que les composants Next.js restent simples et se contentent d'appeler le backend pur et d'afficher les résultats.

---

## Principe fondamental : séparation des préoccupations

### Backend Pur : la logique métier isolée

Le backend pur contient toute la logique métier qui peut être testée et réutilisée indépendamment de Next.js. Cette logique inclut :
- Parsing de fichiers (JSON, Markdown)
- Calculs et transformations de données
- Validation selon les règles métier
- Détection et génération d'artefacts
- Logique de navigation et de routage

**Caractéristiques** :
- Fonctions pures ou avec dépendances minimales (fs, path, etc.)
- Testables en ligne de commande
- Pas de dépendance à React, Next.js, ou au navigateur
- Commentaires explicites : "Backend pur : testable sans dépendance React/Next.js"

**Exemple** : `utils/buttonHandlers.ts`
```typescript
/**
 * Backend pur : Logique métier pour gérer les actions des boutons
 * Cette logique est réutilisable et testable en ligne de commande
 */
export const getButtonAction = (command: string, url: string | null): ButtonAction => {
  // Logique métier pure, sans dépendance à React ou Next.js
  const route = getRouteForCommand(command);
  if (route) {
    return { type: 'internal', route };
  }
  // ...
};
```

Cette fonction peut être testée directement, utilisée dans un composant React, ou appelée depuis une ligne de commande.

### Backend Next.js : la génération HTML et l'interactivité

Le backend Next.js gère tout ce qui est spécifique à Next.js :
- Génération HTML côté serveur (Server Components)
- Interactivité navigateur (Client Components)
- Navigation et routage Next.js
- Optimisation des images et assets

**Caractéristiques** :
- Utilise les fonctions du backend pur
- Gère l'affichage et l'interactivité
- Peut accéder aux fichiers directement (Server Components)
- Utilise les hooks React pour l'interactivité (Client Components)

**Exemple** : `components/Footer.tsx`
```typescript
'use client';

import { getButtonAction } from '../utils/buttonHandlers'; // ← Appel au backend pur

export default function Footer() {
  const router = useRouter();
  
  const handleClick = (command: string, url: string | null) => {
    const action = getButtonAction(command, url); // ← Logique métier dans backend pur
    switch (action.type) {
      case 'internal':
        router.push(action.route); // ← Interactivité Next.js
        break;
      // ...
    }
  };
}
```

Le composant React se contente d'appeler le backend pur et d'utiliser le résultat pour l'interactivité.

---

## Exemples concrets dans le projet

### Exemple 1 : Lecture de données JSON

**Backend Pur** (`utils/indexReader.ts`) :
```typescript
/**
 * Backend pur : Lecture du fichier JSON index.json
 * Cette logique est réutilisable et testable en ligne de commande
 */
export const readPageData = (filename: string): PageData => {
  const filePath = path.join(process.cwd(), 'data', filename);
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
};
```

**Backend Next.js** (`app/page.tsx`) :
```typescript
import { readPageData } from '../utils/indexReader'; // ← Backend pur

export default function HomePage() {
  const pageData = readPageData('index.json'); // ← Appel au backend pur
  return (
    <main>
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
```

**Avantages** :
- `readPageData()` peut être testée sans Next.js
- `readPageData()` peut être utilisée dans un script en ligne de commande
- `HomePage` reste simple et se contente d'appeler le backend pur

### Exemple 2 : Parsing Markdown

**Backend Pur** (`utils/aboutSiteReader.ts`) :
```typescript
/**
 * Backend pur : Logique métier pour lire les dossiers dans "A propos de ce site"
 * Cette logique est réutilisable et testable en ligne de commande
 */
export const readAboutSiteStructure = (): AboutSiteStructure => {
  // Parsing Markdown, validation, transformation
  // Tout cela sans dépendance à React ou Next.js
};
```

**Backend Next.js** (`app/a-propos/page.tsx`) :
```typescript
import { readAboutSiteStructure } from '../../utils/aboutSiteReader'; // ← Backend pur

export default function AboutSitePage() {
  const structure = readAboutSiteStructure(); // ← Appel au backend pur
  return <AboutSiteContentRenderer structure={structure} />;
}
```

**Avantages** :
- Le parsing Markdown peut être testé exhaustivement sans Next.js
- Le parsing peut être utilisé dans un script pour générer de la documentation
- La page Next.js reste simple et déclarative

### Exemple 3 : Gestion des actions de boutons

**Backend Pur** (`utils/buttonHandlers.ts`) :
```typescript
/**
 * Backend pur : Logique métier pour gérer les actions des boutons
 * Utilisable en ligne de commande : getButtonAction('cmd-PlanDuSite', null)
 */
export const getButtonAction = (command: string, url: string | null): ButtonAction => {
  // Logique métier pure : détermine le type d'action (internal, external, alert)
  // Sans dépendance à React ou Next.js
};
```

**Backend Next.js** (`components/Footer.tsx`) :
```typescript
'use client';

import { getButtonAction } from '../utils/buttonHandlers'; // ← Backend pur

const handleClick = (command: string, url: string | null) => {
  const action = getButtonAction(command, url); // ← Logique métier dans backend pur
  switch (action.type) {
    case 'internal':
      router.push(action.route); // ← Interactivité Next.js
      break;
    case 'external':
      window.open(action.url); // ← Interactivité navigateur
      break;
  }
};
```

**Avantages** :
- La logique métier peut être testée sans mocker React ou Next.js
- La logique peut être réutilisée dans différents contextes
- Le composant React reste simple et se contente d'exécuter l'action

---

## Avantages de cette architecture

### 1. Testabilité maximale

Le backend pur peut être testé sans aucune dépendance externe :
- Pas besoin de mocker React, Next.js, ou le navigateur
- Tests rapides (pas de rendu React, pas de navigateur)
- Tests isolés (chaque fonction peut être testée indépendamment)

**Exemple** : Test de `getButtonAction()` sans dépendance à React
```typescript
describe('getButtonAction', () => {
  it('should return internal action for known command', () => {
    const action = getButtonAction(COMMANDS.SITEMAP, null);
    expect(action.type).toBe('internal');
    expect(action.route).toBe('/plan-du-site');
  });
});
```

### 2. Réutilisabilité

Le backend pur peut être utilisé dans différents contextes :
- **Ligne de commande** : Scripts pour générer de la documentation, valider des fichiers, etc.
- **Tests** : Tests unitaires et d'intégration
- **Composants React** : Server Components et Client Components
- **API Routes** : Endpoints Next.js qui retournent du JSON

**Exemple** : Utilisation dans un script en ligne de commande
```typescript
// scripts/validate-json.ts
import { readPageData } from '../utils/indexReader'; // ← Backend pur

const data = readPageData('index.json');
// Validation, transformation, etc.
```

### 3. Maintenabilité

La séparation claire facilite la maintenance :
- **Logique métier** : Modifications dans `utils/`, tests correspondants
- **Présentation** : Modifications dans `components/`, tests de rendu
- **Pas de couplage** : Changer la logique métier n'affecte pas la présentation, et vice versa

### 4. Évolutivité

L'architecture facilite l'évolution :
- **Nouveaux contextes** : Le backend pur peut être utilisé dans de nouveaux contextes (API REST, GraphQL, etc.) sans modification
- **Nouvelles présentations** : De nouveaux composants peuvent utiliser le même backend pur
- **Refactoring** : Le backend pur peut être refactorisé indépendamment de Next.js

---

## Structure du projet

### Organisation des dossiers

```
.
├── utils/                    # Backend Pur
│   ├── indexReader.ts       # Lecture JSON (testable en CLI)
│   ├── buttonHandlers.ts    # Logique métier boutons (testable en CLI)
│   ├── aboutSiteReader.ts   # Parsing Markdown (testable en CLI)
│   └── ...
├── app/                      # Backend Next.js (Server Components)
│   ├── page.tsx             # Appelle utils/indexReader.ts
│   └── ...
├── components/               # Backend Next.js (Client Components)
│   ├── Footer.tsx            # Appelle utils/buttonHandlers.ts
│   └── ...
└── tests/
    ├── unit/                 # Tests du backend pur (sans React)
    └── integration/          # Tests d'intégration
```

### Convention de nommage

Les fichiers du backend pur commencent par un commentaire explicite :
```typescript
/**
 * Backend pur : [Description]
 * Cette logique est réutilisable et testable en ligne de commande
 * 
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 */
```

Cette convention permet d'identifier rapidement les fichiers du backend pur et de comprendre leur rôle.

---

## Comparaison avec les approches traditionnelles

### Approche traditionnelle Next.js

Dans les projets Next.js classiques, la logique métier est souvent dans les composants :

```typescript
// ❌ Approche traditionnelle
export default function HomePage() {
  const filePath = path.join(process.cwd(), 'data', 'index.json');
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  // Logique métier mélangée avec la présentation
  return <div>{/* ... */}</div>;
}
```

**Problèmes** :
- Difficile à tester (besoin de mocker Next.js)
- Non réutilisable (couplé à Next.js)
- Logique métier et présentation mélangées

### Approche avec architecture hexagonale

```typescript
// ✅ Backend Pur (utils/indexReader.ts)
export const readPageData = (filename: string): PageData => {
  // Logique métier isolée, testable en CLI
};

// ✅ Backend Next.js (app/page.tsx)
export default function HomePage() {
  const pageData = readPageData('index.json'); // Appel au backend pur
  return <div>{/* ... */}</div>; // Présentation simple
}
```

**Avantages** :
- Testable sans Next.js
- Réutilisable dans différents contextes
- Séparation claire des préoccupations

---

## Conclusion

Cette stratégie garantit que :
- ✅ La logique métier est isolée et testable indépendamment de Next.js
- ✅ Le code est réutilisable dans différents contextes (CLI, tests, composants, API)
- ✅ La séparation des préoccupations est claire et maintenable
- ✅ L'architecture facilite l'évolution et le refactoring

L'application des principes de l'architecture hexagonale à Next.js crée une frontière claire entre la logique métier (backend pur) et la logique de présentation (backend Next.js). Cette approche, bien que peu courante dans les projets Next.js standards, permet d'atteindre un niveau de testabilité, de réutilisabilité et de maintenabilité rarement atteint avec les approches traditionnelles où tout est mélangé dans les composants.

Le backend pur devient un atout stratégique : il peut être testé exhaustivement, réutilisé dans différents contextes, et évoluer indépendamment de Next.js, créant une base solide et maintenable pour l'application.
