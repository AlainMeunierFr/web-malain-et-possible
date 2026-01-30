# TDD strict avec progression visible : les tests racontent l'histoire du code

## Introduction

Dans la plupart des projets, les tests sont écrits après le code ou servent principalement à vérifier la non-régression. Ils documentent ce que fait le code, mais pas comment il a émergé. Cette approche rend difficile la compréhension de l'évolution du code et de la démarche de développement.

Le besoin identifié est triple :
1. **Pédagogie** : Comprendre comment le code a émergé, pas seulement ce qu'il fait
2. **Onboarding** : Faciliter l'intégration de nouveaux développeurs en montrant la progression
3. **Maintenance** : Comprendre l'intention derrière chaque itération pour faciliter l'évolution

Pour répondre à ces besoins, une approche TDD stricte a été mise en place, où les tests montrent explicitement la progression du simple au complexe avec des commentaires "ITÉRATION 1", "ITÉRATION 2", etc. La structure des tests raconte l'histoire de l'émergence du code, rendant la démarche TDD authentique visible et pédagogique.

## Résumé

Cette stratégie repose sur trois principes fondamentaux :

**1. Progression visible dans les tests**
Les tests sont structurés pour montrer explicitement la progression du simple au complexe. Chaque itération est clairement identifiée avec un commentaire "ITÉRATION N" qui explique ce qui est ajouté à cette étape.

**2. Cycle RED → GREEN → REFACTOR strict**
Chaque itération suit strictement le cycle TDD : un test qui échoue (RED), le code minimal pour le faire passer (GREEN), puis l'amélioration (REFACTOR). Un seul test à la fois, toujours le plus simple possible.

**3. Tests comme documentation vivante**
Les tests deviennent une documentation vivante qui explique non seulement ce que fait le code, mais aussi comment il a émergé. La structure des tests raconte l'histoire du développement, facilitant la compréhension et la maintenance.

Cette approche transforme les tests en outil pédagogique : en lisant les tests dans l'ordre, on comprend immédiatement comment le code a émergé du simple au complexe, rendant la démarche TDD authentique visible et accessible.

---

## Structure des tests : progression visible

### Format standardisé

Chaque fichier de test suit une structure standardisée qui montre la progression :

```typescript
/**
 * APPROCHE TDD : Les tests montrent la progression du simple au complexe
 * - ITÉRATION 1 : Le cas le plus simple
 * - ITÉRATION 2 : Ajouter une deuxième fonctionnalité
 * - ITÉRATION 3 : Gérer les cas limites
 * - ITÉRATION 4 : Combiner plusieurs fonctionnalités
 */
describe('nomFonction - Approche TDD (simple → complexe)', () => {
  describe('ITÉRATION 1 : Le cas le plus simple', () => {
    it('should handle the simplest case', () => {
      // Test du cas le plus simple possible
    });
  });

  describe('ITÉRATION 2 : Ajouter une deuxième fonctionnalité', () => {
    it('should handle a second feature', () => {
      // Test qui ajoute une complexité minimale
    });
  });
});
```

### Commentaires d'itérations explicites

Chaque itération est clairement identifiée avec un commentaire qui explique :
- **Ce qui est testé** : La fonctionnalité ajoutée à cette itération
- **Pourquoi** : La raison de cette itération (ajout de complexité, cas limite, etc.)
- **Comment** : Le code minimal qui a émergé pour faire passer le test

**Exemple** :
```typescript
// ITÉRATION 1 : Le cas le plus simple - une commande mappe à une route
it('should return route for one known command', () => {
  const route = getRouteForCommand(COMMANDS.SITEMAP);
  expect(route).toBe(ROUTES.SITEMAP);
});

// ITÉRATION 2 : Ajouter une deuxième commande
it('should return route for multiple known commands', () => {
  expect(getRouteForCommand(COMMANDS.SITEMAP)).toBe(ROUTES.SITEMAP);
  expect(getRouteForCommand(COMMANDS.ABOUT_SITE)).toBe(ROUTES.ABOUT);
});

// ITÉRATION 3 : Gérer les commandes inconnues
it('should return null for unknown command', () => {
  const route = getRouteForCommand('cmd-Unknown');
  expect(route).toBeNull();
});
```

**Avantage** : En lisant les tests dans l'ordre, on comprend immédiatement comment le code a émergé.

---

## Cycle RED → GREEN → REFACTOR strict

### Principe : un test à la fois

Chaque itération suit strictement le cycle TDD avec un seul test à la fois :

**ITÉRATION 1** :
1. **RED** : Écrire le test le plus simple possible → Le test échoue
2. **GREEN** : Écrire le code minimal pour faire passer le test → Le test passe
3. **REFACTOR** : Améliorer le code en gardant le test vert → Code amélioré, test toujours vert

**ITÉRATION 2** :
1. **RED** : Écrire le test suivant (le plus simple possible) → Le test échoue
2. **GREEN** : Étendre le code minimalement → Le test passe
3. **REFACTOR** : Améliorer → Code amélioré, tous les tests verts

**Règle absolue** : Ne jamais écrire plusieurs tests en même temps. Toujours commencer par le cas le plus simple possible.

### Exemple concret : `buttonHandlers.ts`

**ITÉRATION 1** (RED → GREEN → REFACTOR) :
```typescript
// RED : Test qui échoue
it('should return route for one known command', () => {
  const route = getRouteForCommand(COMMANDS.SITEMAP);
  expect(route).toBe(ROUTES.SITEMAP); // ❌ Échoue : fonction n'existe pas
});

// GREEN : Code minimal
export const getRouteForCommand = (command: string): string | null => {
  if (command === COMMANDS.SITEMAP) {
    return ROUTES.SITEMAP;
  }
  return null;
};

// REFACTOR : Améliorer (pas nécessaire pour cette itération simple)
```

**ITÉRATION 2** (RED → GREEN → REFACTOR) :
```typescript
// RED : Test qui échoue
it('should return route for multiple known commands', () => {
  expect(getRouteForCommand(COMMANDS.ABOUT_SITE)).toBe(ROUTES.ABOUT); // ❌ Échoue
});

// GREEN : Code minimal (étendre la fonction)
export const getRouteForCommand = (command: string): string | null => {
  if (command === COMMANDS.SITEMAP) {
    return ROUTES.SITEMAP;
  }
  if (command === COMMANDS.ABOUT_SITE) {
    return ROUTES.ABOUT;
  }
  return null;
};

// REFACTOR : Améliorer (utiliser un Map)
export const getRouteForCommand = (command: string): string | null => {
  const commandToRouteMap: Record<string, string> = {
    [COMMANDS.SITEMAP]: ROUTES.SITEMAP,
    [COMMANDS.ABOUT_SITE]: ROUTES.ABOUT,
  };
  return commandToRouteMap[command] || null;
};
```

**Résultat** : Le code émerge progressivement, et la progression est visible dans les tests.

---

## Tests comme documentation vivante

### Raconter l'histoire du code

Les tests racontent l'histoire de l'émergence du code :

**Exemple** : `aboutSiteReader.test.ts`
```typescript
/**
 * APPROCHE TDD : Code fait émerger progressivement du simple au complexe
 * 
 * ITÉRATION 1 (GREEN) : Détecter un titre H1 - code minimal pour faire passer le test
 * ITÉRATION 2 (GREEN) : Détecter un titre H2 - extension du code
 * ITÉRATION 3 (GREEN) : Détecter H4 sans H3 - nécessite de tracker H3 et H4
 * ITÉRATION 4 (GREEN) : Ignorer les blocs de code markdown - nécessite de tracker l'état dans/dansBlocCode
 * ITÉRATION 5 (GREEN) : Fichier vide ne doit pas lever d'erreur - cas limite
 */
describe('validerContenuMarkdown - APPROCHE TDD', () => {
  describe('ITÉRATION 1 : Le cas le plus simple - détecter un titre H1', () => {
    it('devrait lever une ValidationError pour un fichier contenant un titre H1', () => {
      // Test du cas le plus simple
    });
  });

  describe('ITÉRATION 2 : Détecter un titre H2', () => {
    // ...
  });
});
```

**Avantage** : En lisant les tests, on comprend immédiatement :
- Comment le code a émergé (du simple au complexe)
- Pourquoi chaque itération a été ajoutée
- Comment chaque fonctionnalité a été implémentée

### Pédagogie et onboarding

Cette approche facilite l'onboarding :

**Pour un nouveau développeur** :
1. Lire les tests dans l'ordre
2. Comprendre la progression du simple au complexe
3. Voir comment chaque fonctionnalité a émergé
4. Comprendre l'intention derrière chaque itération

**Exemple** : Un nouveau développeur qui lit `buttonHandlers.test.ts` comprend immédiatement :
- La fonction a commencé par gérer une seule commande
- Puis plusieurs commandes ont été ajoutées
- Puis la gestion des commandes inconnues
- Puis la logique de navigation interne/externe
- Etc.

### Maintenance facilitée

Cette approche facilite la maintenance :

**Pour modifier une fonctionnalité** :
1. Identifier l'itération concernée dans les tests
2. Comprendre l'intention originale
3. Modifier en respectant la progression
4. Ajouter une nouvelle itération si nécessaire

**Pour déboguer** :
1. Lire les tests pour comprendre l'évolution
2. Identifier l'itération où le problème pourrait se situer
3. Comprendre l'intention derrière cette itération
4. Corriger en respectant la progression

---

## Avantages de cette approche

### 1. Pédagogie

Les tests deviennent un outil pédagogique :
- **Compréhension immédiate** : On comprend comment le code a émergé en lisant les tests
- **Progression visible** : La structure montre clairement la progression du simple au complexe
- **Intention préservée** : Les commentaires d'itérations préservent l'intention derrière chaque étape

### 2. Onboarding facilité

L'intégration de nouveaux développeurs est facilitée :
- **Tests comme documentation** : Les tests expliquent non seulement ce que fait le code, mais aussi comment il a émergé
- **Progression claire** : Un nouveau développeur peut suivre la progression étape par étape
- **Compréhension rapide** : Pas besoin de deviner l'intention, elle est explicite dans les tests

### 3. Maintenance améliorée

La maintenance est facilitée :
- **Intention préservée** : Les commentaires d'itérations préservent l'intention originale
- **Évolution guidée** : La structure guide l'ajout de nouvelles fonctionnalités
- **Refactoring sécurisé** : Comprendre la progression aide à refactoriser sans casser l'intention

### 4. Qualité de code

La qualité du code est améliorée :
- **Code minimal** : Chaque itération ajoute le code minimal nécessaire
- **Pas de sur-ingénierie** : La progression du simple au complexe évite la complexité inutile
- **Tests exhaustifs** : Chaque itération est testée, garantissant une couverture complète

---

## Comparaison avec les approches traditionnelles

### Approche traditionnelle

Dans les projets classiques, les tests sont souvent écrits après le code :

```typescript
// ❌ Approche traditionnelle
// Code écrit d'abord
export const getRouteForCommand = (command: string): string | null => {
  const commandToRouteMap: Record<string, string> = {
    [COMMANDS.SITEMAP]: ROUTES.SITEMAP,
    [COMMANDS.ABOUT_SITE]: ROUTES.ABOUT,
    [COMMANDS.METRICS]: ROUTES.METRICS,
  };
  return commandToRouteMap[command] || null;
};

// Tests écrits après
describe('getRouteForCommand', () => {
  it('should return route for SITEMAP', () => { /* ... */ });
  it('should return route for ABOUT_SITE', () => { /* ... */ });
  it('should return null for unknown', () => { /* ... */ });
});
```

**Problèmes** :
- Tests de couverture/non-régression, pas de progression TDD
- Pas de visibilité sur l'émergence du code
- Intention perdue (pourquoi ce code existe-t-il ?)

### Approche TDD avec progression visible

```typescript
// ✅ TDD avec progression visible
describe('getRouteForCommand - Approche TDD (simple → complexe)', () => {
  // ITÉRATION 1 : Le cas le plus simple
  it('should return route for one known command', () => {
    // Test écrit AVANT le code
  });
  
  // ITÉRATION 2 : Ajouter une deuxième commande
  it('should return route for multiple known commands', () => {
    // Test écrit AVANT l'extension du code
  });
});
```

**Avantages** :
- Progression visible dans les tests
- Intention préservée (commentaires d'itérations)
- Code émerge du simple au complexe

---

## Exemples concrets

### Exemple 1 : `buttonHandlers.test.ts`

**Structure visible** :
```typescript
describe('buttonHandlers - Approche TDD (simple → complexe)', () => {
  describe('getRouteForCommand', () => {
    // ITÉRATION 1 : Le cas le plus simple - une commande mappe à une route
    it('should return route for one known command', () => { /* ... */ });

    // ITÉRATION 2 : Ajouter une deuxième commande
    it('should return route for multiple known commands', () => { /* ... */ });

    // ITÉRATION 3 : Gérer les commandes inconnues
    it('should return null for unknown command', () => { /* ... */ });

    // ITÉRATION 4 : Gérer les commandes externes (pas de route interne)
    it('should return null for external link commands', () => { /* ... */ });
  });
});
```

**Résultat** : La progression est claire et visible.

### Exemple 2 : `aboutSiteReader.test.ts`

**Structure visible** :
```typescript
describe('validerContenuMarkdown - APPROCHE TDD', () => {
  describe('ITÉRATION 1 : Le cas le plus simple - détecter un titre H1', () => {
    it('devrait lever une ValidationError pour un fichier contenant un titre H1', () => { /* ... */ });
  });

  describe('ITÉRATION 2 : Détecter un titre H2', () => {
    it('devrait lever une ValidationError pour un fichier contenant un titre H2', () => { /* ... */ });
  });

  describe('ITÉRATION 3 : Détecter H4 sans H3', () => {
    it('devrait lever une ValidationError si un fichier contient H4 sans H3', () => { /* ... */ });
    it('ne devrait pas lever d\'erreur si H4 est présent avec H3', () => { /* ... */ });
  });

  describe('ITÉRATION 4 : Ignorer les blocs de code markdown', () => {
    it('ne devrait pas lever d\'erreur pour un titre H1 dans un bloc de code', () => { /* ... */ });
  });

  describe('ITÉRATION 5 : Fichier vide ne doit pas lever d\'erreur', () => {
    it('ne devrait pas lever d\'erreur pour un fichier vide', () => { /* ... */ });
  });
});
```

**Résultat** : La progression du simple au complexe est explicite et pédagogique.

---

## Conclusion

Cette stratégie garantit que :
- ✅ Les tests montrent explicitement la progression du simple au complexe
- ✅ La démarche TDD authentique est visible et pédagogique
- ✅ L'intention derrière chaque itération est préservée dans les commentaires
- ✅ L'onboarding et la maintenance sont facilités par la structure claire

La transformation des tests en documentation vivante qui raconte l'histoire du code crée un système où la compréhension et la maintenance sont facilitées. Cette approche, bien que peu courante dans les projets standards où les tests sont souvent écrits après le code, permet d'atteindre un niveau de qualité et de maintenabilité rarement atteint avec les approches traditionnelles.

Les tests deviennent un atout stratégique : ils expliquent non seulement ce que fait le code, mais aussi comment il a émergé, pourquoi chaque fonctionnalité existe, et comment elle a été implémentée. Cette visibilité transforme les tests en outil pédagogique et de maintenance, créant une base solide pour l'évolution du code.
