### Validation des JSON avec détection de types inconnus qui force l'implémentation ou la suppression

#### Introduction

Dans la plupart des projets, les fichiers JSON de configuration sont lus et utilisés sans validation stricte des types. Si un nouveau type est ajouté dans un JSON mais n'est pas implémenté dans le code, l'erreur n'apparaît qu'au runtime, voire jamais, créant des incohérences et des bugs difficiles à détecter.

Le besoin identifié est triple :
1. **Cohérence garantie** : Tous les types présents dans les JSON doivent être explicitement gérés dans le code
2. **Détection précoce** : Les types inconnus doivent être détectés au build, pas au runtime
3. **Décision forcée** : Le développeur doit explicitement décider : implémenter le type ou le supprimer du JSON

Pour répondre à ces besoins, un système de validation des JSON a été mis en place, où les tests d'intégration parcourent tous les fichiers JSON, détectent les types inconnus (types présents dans les JSON mais non gérés dans le code), et échouent avec un message détaillé qui force le développeur à soit implémenter le type, soit le supprimer. Aucun type inconnu ne peut rester dans le projet.

#### Résumé

Cette stratégie repose sur trois mécanismes interconnectés :

**1. Inventaire des types gérés**
Le système maintient un inventaire exhaustif de tous les types de contenu gérés dans le code (définis dans `ElementContenu` et gérés dans `PageContentRenderer`).

**2. Détection des types inconnus**
Les tests d'intégration parcourent tous les fichiers JSON du projet et détectent les types présents dans les JSON mais absents de l'inventaire des types gérés.

**3. Message d'erreur actionnable**
Si un type inconnu est détecté, le test échoue avec un message détaillé qui indique :
- Le fichier JSON concerné
- L'index de l'élément problématique
- Le type inconnu détecté
- Les actions possibles (implémenter ou supprimer)

Cette approche transforme les types JSON en contraintes techniques : un type présent dans un JSON doit être explicitement géré dans le code, forçant une décision claire et évitant les erreurs runtime.

---

#### Inventaire des types gérés

##### Types définis dans le code

Les types de contenu sont définis dans `utils/indexReader.ts` :

```typescript
export type TypeElementContenu = 
  | 'titre' 
  | 'video' 
  | 'texteLarge' 
  | 'domaineDeCompetence' 
  | 'callToAction' 
  | 'groupeBoutons' 
  | 'listeDesPages'
  | 'videoDetournement'
  | 'temoignages';

export type ElementContenu = 
  | ElementTitre 
  | ElementVideo
  | ElementTexteLarge
  | ElementDomaineDeCompetence
  | ElementCallToAction
  | ElementGroupeBoutons
  | ElementListeDesPages
  | ElementVideoDetournement
  | ElementTemoignages;
```

**Résultat** : Un inventaire exhaustif et type-safe de tous les types gérés.

##### Types gérés dans le renderer

Les types doivent également être gérés dans `PageContentRenderer.tsx` :

```typescript
switch (element.type) {
  case 'titre':
    return <Titre key={index} element={element} />;
  case 'video':
    return <Video key={index} element={element} />;
  // ... tous les types doivent être gérés
  default:
    return null; // Type non géré
}
```

**Règle** : Si un type est dans `ElementContenu` mais pas dans le `switch`, TypeScript devrait normalement le détecter, mais le système de validation JSON ajoute une couche de sécurité supplémentaire.

---

#### Détection des types inconnus

##### Parcours des fichiers JSON

Les tests d'intégration parcourent tous les fichiers JSON dans `data/` :

```typescript
describe('Validation des fichiers JSON', () => {
  it('devrait détecter les types inconnus dans tous les fichiers JSON', () => {
    const dataDir = path.join(process.cwd(), 'data');
    const fichiersJSON = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
    
    const typesGeres = new Set([
      'titre',
      'video',
      'texteLarge',
      'domaineDeCompetence',
      'callToAction',
      'groupeBoutons',
      'listeDesPages',
      'videoDetournement',
      'temoignages'
    ]);
    
    fichiersJSON.forEach((fichier) => {
      const contenu = fs.readFileSync(path.join(dataDir, fichier), 'utf8');
      const data = JSON.parse(contenu);
      
      if (data.contenu && Array.isArray(data.contenu)) {
        data.contenu.forEach((element: any, index: number) => {
          if (element.type && !typesGeres.has(element.type)) {
            // Type inconnu détecté !
            throw new Error(
              `Type inconnu '${element.type}' trouvé dans ${fichier} à l'index ${index}.\n` +
              `Actions possibles :\n` +
              `1) Supprimer l'objet du JSON\n` +
              `2) Implémenter le type dans PageContentRenderer`
            );
          }
        });
      }
    });
  });
});
```

**Résultat** : Tous les types présents dans les JSON sont vérifiés contre l'inventaire des types gérés.

##### Détection exhaustive

Le système détecte les types inconnus dans :
- Tous les fichiers JSON de `data/`
- Tous les éléments de `contenu[]` dans chaque fichier
- Tous les niveaux de profondeur (éléments imbriqués si nécessaire)

**Avantage** : Aucun type inconnu ne peut passer inaperçu.

---

#### Message d'erreur actionnable

##### Format du message

Le message d'erreur est structuré pour être actionnable :

**Format** :
```
Type inconnu '[type]' trouvé dans [fichier] à l'index [index].
Actions possibles :
1) Supprimer l'objet du JSON
2) Implémenter le type dans PageContentRenderer
```

**Exemple concret** :
```
Type inconnu 'nouveauType' trouvé dans index.json à l'index 2.
Actions possibles :
1) Supprimer l'objet du JSON
2) Implémenter le type dans PageContentRenderer
```

**Avantages** :
- Le développeur sait immédiatement quel fichier et quel élément corriger
- Les actions possibles sont clairement indiquées
- Pas d'ambiguïté sur ce qui doit être fait

##### Intégration dans le workflow

Dans le workflow CI/CD, les tests Jest sont exécutés avant le build :

```yaml
- name: Run Jest tests
  run: npm test  # ← Si un type inconnu est détecté, le test échoue
  # Si le test échoue, le build est bloqué
```

**Résultat** : Un type inconnu bloque le merge et le déploiement, forçant le développeur à prendre une décision.

---

#### Processus de résolution

##### Option 1 : Implémenter le type

Si le type doit être ajouté au système :

**Étape 1** : Créer l'interface TypeScript dans `utils/indexReader.ts`
```typescript
export interface ElementMonNouveauType {
  type: 'monNouveauType';
  // ... champs obligatoires
}

export type ElementContenu = 
  | ElementTitre 
  | ElementTexte
  | ... 
  | ElementMonNouveauType; // ← Ajouter le nouveau type
```

**Étape 2** : Ajouter le type dans `PageContentRenderer.tsx`
```typescript
switch (element.type) {
  case 'monNouveauType':
    return <MonNouveauComposant key={index} element={element} />;
  // ...
}
```

**Étape 3** : Créer le composant React
```typescript
// components/MonNouveauComposant.tsx
export default function MonNouveauComposant({ element }: { element: ElementMonNouveauType }) {
  // Implémentation du composant
}
```

**Étape 4** : Créer les tests
- Tests unitaires pour le composant
- Tests d'intégration pour vérifier que le type est détecté

**Résultat** : Le type est maintenant géré, le test passe.

##### Option 2 : Supprimer le type

Si le type n'est pas nécessaire :

**Action** : Supprimer l'objet du JSON

**Résultat** : Le type inconnu disparaît, le test passe.

---

#### Avantages de cette approche

##### 1. Cohérence garantie

Tous les types présents dans les JSON sont explicitement gérés :
- **Pas de types orphelins** : Aucun type ne peut exister dans un JSON sans être géré dans le code
- **Pas de code mort** : Si un type est supprimé du code, il doit être supprimé des JSON
- **Documentation vivante** : Les types gérés sont clairement identifiés

##### 2. Détection précoce

Les types inconnus sont détectés au build, pas au runtime :
- **Avant le déploiement** : Les erreurs sont détectées lors des tests
- **Pas de surprises en production** : Aucun risque qu'un type inconnu cause des problèmes en production
- **Feedback immédiat** : Le développeur sait immédiatement si un type est inconnu

##### 3. Décision forcée

Le développeur doit explicitement décider :
- **Implémenter** : Le type est nécessaire, il faut l'implémenter
- **Supprimer** : Le type n'est pas nécessaire, il faut le supprimer
- **Pas d'ambiguïté** : Aucun type ne peut rester dans un état indéterminé

##### 4. Maintenance facilitée

L'ajout de nouveaux types est guidé :
- **Processus clair** : Les étapes pour ajouter un type sont documentées
- **Tests obligatoires** : Les tests garantissent que le type est bien géré
- **Cohérence garantie** : Le système garantit que tous les types sont cohérents

---

#### Comparaison avec les approches traditionnelles

##### Approche traditionnelle

Dans les projets classiques, les types JSON ne sont pas validés strictement :

```typescript
// ❌ Approche traditionnelle
function renderContent(element: any) {
  switch (element.type) {
    case 'titre':
      return <Titre element={element} />;
    default:
      return null; // Type inconnu silencieusement ignoré
  }
}
```

**Problèmes** :
- Types inconnus ignorés silencieusement
- Erreurs découvertes au runtime (ou jamais)
- Pas de garantie de cohérence

##### Approche avec validation stricte

```typescript
// ✅ Validation stricte
// Test d'intégration détecte les types inconnus au build
// Force l'implémentation ou la suppression
// Aucun type inconnu ne peut rester
```

**Avantages** :
- Détection précoce au build
- Décision forcée (implémenter ou supprimer)
- Cohérence garantie

---

#### Exemples concrets

##### Exemple 1 : Type inconnu détecté

**Fichier** (`data/index.json`) :
```json
{
  "contenu": [
    {
      "type": "titre",
      "texte": "Bienvenue"
    },
    {
      "type": "nouveauType",
      "data": "test"
    }
  ]
}
```

**Résultat du test** :
```
❌ Type inconnu 'nouveauType' trouvé dans index.json à l'index 1.
Actions possibles :
1) Supprimer l'objet du JSON
2) Implémenter le type dans PageContentRenderer
```

**Solution** : Soit implémenter `nouveauType`, soit supprimer l'objet du JSON.

##### Exemple 2 : Type correctement géré

**Fichier** (`data/index.json`) :
```json
{
  "contenu": [
    {
      "type": "titre",
      "texte": "Bienvenue"
    },
    {
      "type": "video",
      "urlYouTube": "https://youtube.com/watch?v=...",
      "lancementAuto": false
    }
  ]
}
```

**Résultat du test** : ✅ Tous les types sont gérés, le test passe.

---

#### Conclusion

Cette stratégie garantit que :
- ✅ Tous les types présents dans les JSON sont explicitement gérés dans le code
- ✅ Les types inconnus sont détectés au build, pas au runtime
- ✅ Le développeur doit explicitement décider : implémenter ou supprimer
- ✅ Aucun type inconnu ne peut rester dans le projet

La transformation des types JSON en contraintes techniques via des tests d'intégration crée un système où la cohérence est garantie automatiquement. Cette approche, bien que peu courante dans les projets standards où les types JSON ne sont pas validés strictement, permet d'atteindre un niveau de cohérence et de maintenabilité rarement atteint avec les approches traditionnelles.

Le système devient un garde-fou actif : un type présent dans un JSON doit être explicitement géré dans le code, forçant une décision claire et évitant les erreurs runtime. Cette contrainte technique transforme les types JSON en contrat explicite entre les données et le code, créant une base solide et maintenable pour l'application.
