# Malain et Possible - Site Web

Site web personnel développé avec Next.js, présentant mon parcours professionnel et mes compétences.

## Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Tests unitaires/intégration** : Jest
- **Tests BDD** : Cucumber.js
- **Tests E2E** : Playwright
- **CI/CD** : GitHub Actions
- **Hébergement** : Vercel

## Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
npm run build
npm start
```

## Tests de validation

### Exécuter les tests localement

#### Tests unitaires et d'intégration (Jest)

```bash
npm test
```

Ce script exécute :
- **Tests unitaires** (`tests/unit/*.test.tsx`) : Validation des fonctions et composants
- **Tests d'intégration** (`tests/integration/*.integration.test.ts`) :
  - Validation des fichiers Markdown dans `A propos de ce site/`
  - Validation des fichiers JSON dans `data/`

#### Tests BDD (Cucumber)

```bash
npm run test:bdd
```

Exécute les scénarios Gherkin définis dans `tests/features/*.feature`.

#### Tests E2E (Playwright)

```bash
npx playwright test
```

Tests de navigation et comportement utilisateur dans le navigateur.

### Interpréter les erreurs

#### Erreur "Type inconnu dans JSON"

```
Type inconnu 'nouveauType' trouvé dans index.json à l'index 2.
Actions possibles :
1) Supprimer l'objet du JSON
2) Implémenter le type dans PageContentRenderer
```

**Solution** : Soit supprimer l'objet non conforme du fichier JSON, soit implémenter le type (voir section suivante).

#### Erreur "Fichier MD contient un H1/H2"

```
Le fichier "exemple.md" contient un titre de niveau 1 (#).
Les fichiers MD doivent commencer au niveau 3 (###).
```

**Solution** : Remplacer `#` par `###` (H1 → H3) et `##` par `####` (H2 → H4).

#### Erreur "H4 sans H3 précédent"

```
Le fichier "exemple.md" contient un titre H4 (####) sans titre H3 (###) précédent.
```

**Solution** : Ajouter un titre H3 avant le titre H4 ou convertir le H4 en H3.

### Ajouter un nouveau type de contenu

Pour ajouter un nouveau type de contenu supporté par l'application :

#### 1. Créer l'interface TypeScript

Dans `utils/indexReader.ts` :

```typescript
export interface ElementMonNouveauType {
  type: 'monNouveauType';
  // ... champs obligatoires
}

export type ElementContenu = 
  | ElementTitre 
  | ElementTexte
  | ... 
  | ElementMonNouveauType;
```

#### 2. Ajouter le type dans le renderer

Dans `components/PageContentRenderer.tsx` :

```typescript
switch (element.type) {
  case 'monNouveauType':
    return <MonNouveauComposant key={index} element={element} />;
  // ... autres cases
}
```

#### 3. Créer le composant React

Créer `components/MonNouveauComposant.tsx` avec son module CSS associé.

#### 4. Créer les tests

- **Tests unitaires** : `tests/unit/MonNouveauComposant.test.tsx`
- **Tests d'intégration** : Vérifier que le type est bien détecté dans `tests/integration/jsonValidation.integration.test.ts`

#### 5. Vérifier que les tests passent

```bash
npm test
```

Si tous les tests passent, le nouveau type est prêt à être utilisé.

## Workflow CI/CD

Le workflow GitHub Actions (`.github/workflows/playwright.yml`) exécute automatiquement lors des push et pull requests :

1. **Installation des dépendances** (`npm ci`)
2. **Tests Jest** (`npm test`) - **Bloque le build si échec**
3. **Installation Playwright** (`npx playwright install --with-deps`)
4. **Tests E2E** (`npx playwright test`) - **Bloque le build si échec**

**Si un test échoue, le merge est bloqué et le déploiement n'a pas lieu.**

## Métriques de qualité

### Collecter les métriques

```bash
npm run metrics:collect
```

Les métriques sont automatiquement collectées lors du build et stockées dans `public/metrics/`.

## Structure du projet

```
.
├── app/                          # Pages Next.js (App Router)
├── components/                   # Composants React
├── constants/                    # Constantes (routes, images)
├── data/                         # Données JSON statiques
├── types/                        # Interfaces TypeScript
├── utils/                        # Fonctions utilitaires (backend pur)
├── tests/
│   ├── unit/                    # Tests unitaires Jest
│   ├── integration/             # Tests d'intégration Jest
│   ├── features/                # Scénarios BDD (Cucumber)
│   └── step-definitions/        # Implémentation des steps BDD
├── public/                       # Assets statiques
│   └── metrics/                 # Métriques de qualité
└── A propos de ce site/         # Documentation et journal de bord
    ├── Definition of Done/
    ├── Sprints/
    ├── Journal de bord/
    └── ...
```

## Principes de développement

- **TDD strict** : Tests écrits avant le code (cycle RED → GREEN → REFACTOR)
- **BDD** : Scénarios Gherkin pour les fonctionnalités métier
- **Architecture hexagonale** : Séparation logique métier / infrastructure
- **Clean Code** : Principes SOLID, noms explicites, pas de duplication
- **Couverture 100%** : Tous les fichiers backend pur (`utils/`) doivent avoir une couverture complète

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Jest Documentation](https://jestjs.io/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Playwright Documentation](https://playwright.dev/)

## Déploiement

Le déploiement est automatique sur Vercel lors des push sur la branche `main`, à condition que tous les tests passent.

Pour déployer manuellement :
1. Connecter le projet à Vercel
2. Les déploiements se feront automatiquement à chaque push

---

**Développé avec ❤️ par Malain et Possible**
