### Validation des fichiers Markdown avec règles métier qui font échouer le build

#### Introduction

Dans la plupart des projets, les fichiers Markdown sont traités comme de simples fichiers texte : ils sont lus, parsés, et affichés sans validation particulière. Si un fichier Markdown contient des erreurs de structure (titres mal hiérarchisés, formats incorrects), ces erreurs ne sont détectées qu'au runtime, voire jamais, créant des problèmes de cohérence et de qualité.

Le besoin identifié est triple :
1. **Cohérence garantie** : Tous les fichiers Markdown doivent respecter une structure hiérarchique cohérente
2. **Détection précoce** : Les erreurs doivent être détectées au build, pas au runtime
3. **Règles métier** : Les règles de validation doivent refléter les contraintes métier (structure de documentation, hiérarchie des titres, etc.)

Pour répondre à ces besoins, un système de validation des fichiers Markdown a été mis en place, où les règles métier sont appliquées via des tests d'intégration qui lancent des erreurs synchrones, forçant l'échec du build si les règles ne sont pas respectées. Cette approche transforme les règles de documentation en contraintes techniques qui empêchent les erreurs avant même qu'elles n'atteignent la production.

#### Résumé

Cette stratégie repose sur trois mécanismes interconnectés :

**1. Règles métier explicites**
Des règles métier claires définissent la structure attendue des fichiers Markdown :
- Les fichiers doivent commencer au niveau 3 (###), pas au niveau 1 (#) ou 2 (##)
- Un titre H4 (####) ne peut pas exister sans titre H3 (###) précédent
- Les blocs de code markdown sont ignorés lors de la validation
- Les fichiers vides sont considérés comme inexistants

**2. Validation au build via tests d'intégration**
Les règles métier sont appliquées via des tests d'intégration qui parcourent tous les fichiers Markdown du projet. Si une règle n'est pas respectée, le test lance une `ValidationError` synchrone qui fait échouer le build.

**3. Messages d'erreur actionnables**
Les erreurs de validation incluent des messages détaillés qui indiquent précisément le problème (fichier, ligne, règle violée) et comment le corriger, permettant au développeur de résoudre rapidement le problème.

Cette approche transforme les règles de documentation en garde-fous techniques : un fichier Markdown non conforme ne peut pas être déployé, garantissant ainsi la cohérence et la qualité de la documentation.

---

#### Les règles métier

##### Règle 1 : Pas de titres H1 ou H2

**Règle** : Les fichiers Markdown ne doivent pas contenir de titres de niveau 1 (#) ou 2 (##). Ils doivent commencer au niveau 3 (###).

**Raison métier** : La structure hiérarchique du projet utilise une convention où :
- H1 = Chapitre (représenté par un dossier)
- H2 = Section (représenté par un fichier MD)
- H3 = Partie (### dans le fichier MD)

Un titre H1 ou H2 dans un fichier MD créerait une incohérence avec cette structure.

**Validation** :
```typescript
if (trimmed.startsWith('# ')) {
  throw new ValidationError(
    `Le fichier "${filePath}" contient un titre de niveau 1 (#). Les fichiers MD doivent commencer au niveau 3 (###).`,
    filePath
  );
}
```

##### Règle 2 : H4 sans H3 précédent

**Règle** : Un titre H4 (####) ne peut pas exister sans titre H3 (###) précédent dans le même fichier.

**Raison métier** : La hiérarchie doit être respectée. Un sous-titre (H4) doit être dans une partie (H3), pas directement dans une section (H2).

**Validation** :
```typescript
// Tracker H3 et H4 pendant le parcours
if (trimmed.startsWith('### ') && !trimmed.startsWith('#### ')) {
  hasH3 = true;
} else if (trimmed.startsWith('#### ')) {
  hasH4 = true;
}

// Vérifier à la fin
if (hasH4 && !hasH3) {
  throw new ValidationError(
    `Le fichier "${filePath}" contient un titre de niveau 4 (####) sans titre de niveau 3 (###). Les sous-parties (####) doivent être dans une partie (###).`,
    filePath
  );
}
```

##### Règle 3 : Ignorer les blocs de code

**Règle** : Les titres présents dans les blocs de code markdown (entre ```) sont ignorés lors de la validation.

**Raison métier** : Les exemples de code peuvent contenir des titres markdown qui ne doivent pas être validés comme du contenu réel.

**Validation** :
```typescript
let dansBlocCode = false;

if (trimmed.startsWith('```')) {
  dansBlocCode = !dansBlocCode;
  continue; // Ignorer la ligne de délimitation
}

if (dansBlocCode) {
  continue; // Ignorer les lignes dans les blocs de code
}
```

##### Règle 4 : Fichiers vides

**Règle** : Les fichiers Markdown vides sont considérés comme inexistants et ne déclenchent pas d'erreur.

**Raison métier** : Un fichier vide peut être un placeholder ou un fichier en cours de création, et ne doit pas bloquer le build.

**Validation** :
```typescript
if (!contenu.trim()) {
  return; // Fichier vide : considéré comme inexistant (pas d'erreur)
}
```

---

#### Validation au build via tests d'intégration

##### Principe : erreurs synchrones qui font échouer le build

Les règles métier sont appliquées via des tests d'intégration qui parcourent tous les fichiers Markdown du projet. Si une règle n'est pas respectée, le test lance une `ValidationError` synchrone.

**Classe d'erreur dédiée** :
```typescript
export class ValidationError extends Error {
  constructor(message: string, public filePath?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

Cette classe permet de distinguer les erreurs de validation (règles métier) des erreurs techniques (fichier introuvable, erreur de parsing, etc.).

##### Test d'intégration

**Test** (`tests/integration/aboutSiteReader.integration.test.ts`) :
```typescript
describe('Validation des fichiers Markdown', () => {
  it('devrait valider tous les fichiers MD et échouer si règles non respectées', () => {
    const aboutSiteDir = path.join(process.cwd(), 'A propos de ce site');
    const fichiers = getAllMarkdownFiles(aboutSiteDir);
    
    fichiers.forEach((fichier) => {
      const contenu = fs.readFileSync(fichier, 'utf8');
      expect(() => validerContenuMarkdown(contenu, fichier)).not.toThrow(ValidationError);
    });
  });
});
```

**Comportement** :
- Si un fichier viole une règle, `validerContenuMarkdown()` lance une `ValidationError`
- Le test échoue avec un message détaillé
- Le build échoue (les tests sont exécutés avant le build dans le workflow CI/CD)

##### Forcer l'échec du build

Pour garantir que les erreurs de validation font échouer le build (et pas seulement apparaître au runtime), les erreurs sont lancées de manière synchrone dans les Server Components :

```typescript
// app/a-propos-du-site/page.tsx
export default function AboutSitePage() {
  try {
    const structure = readAboutSiteStructure(); // ← Peut lancer ValidationError
    return <AboutSiteContentRenderer structure={structure} />;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error; // ← Relancer pour faire échouer le build
    }
    // Gérer les autres erreurs...
  }
}
```

**Résultat** : Si un fichier Markdown viole une règle, le build Next.js échoue avec un message d'erreur clair.

---

#### Messages d'erreur actionnables

##### Structure des messages d'erreur

Les messages d'erreur sont structurés pour être actionnables :

**Format** :
```
Le fichier "[chemin]" contient [problème détecté].
[Explication de la règle violée].
[Solution : comment corriger].
```

**Exemple concret** :
```
Le fichier "A propos de ce site/4. Journal de bord/2026-01-21.md" contient un titre de niveau 1 (#).
Les fichiers MD doivent commencer au niveau 3 (###).
```

**Avantages** :
- Le développeur sait immédiatement quel fichier corriger
- Le problème est clairement expliqué
- La solution est évidente (remplacer # par ###)

##### Intégration dans le workflow CI/CD

Dans le workflow GitHub Actions, les tests Jest sont exécutés avant le build :

```yaml
- name: Run Jest tests
  run: npm test  # ← Si un fichier MD viole une règle, le test échoue
  # Si le test échoue, le build est bloqué
```

**Résultat** : Un fichier Markdown non conforme bloque le merge et le déploiement, forçant le développeur à corriger avant de pouvoir continuer.

---

#### Avantages de cette approche

##### 1. Détection précoce

Les erreurs sont détectées au build, pas au runtime :
- **Avant le déploiement** : Les erreurs sont détectées lors des tests, avant même que le code ne soit déployé
- **Pas de surprises en production** : Aucun risque qu'un fichier Markdown mal formé cause des problèmes en production
- **Feedback immédiat** : Le développeur sait immédiatement si son fichier est conforme

##### 2. Cohérence garantie

Tous les fichiers Markdown respectent la même structure :
- **Hiérarchie uniforme** : Tous les fichiers suivent la même convention (H3 pour parties, H4 pour sous-parties)
- **Pas d'exceptions** : Aucun fichier ne peut contourner les règles
- **Documentation vivante** : La structure est garantie par les tests, pas par la mémoire des développeurs

##### 3. Règles métier transformées en contraintes techniques

Les règles de documentation deviennent des contraintes techniques :
- **Enforcement automatique** : Les règles sont appliquées automatiquement, pas manuellement
- **Pas d'oubli possible** : Un développeur ne peut pas oublier de respecter une règle
- **Évolution facilitée** : Si une règle change, il suffit de modifier les tests

##### 4. Messages d'erreur pédagogiques

Les messages d'erreur sont conçus pour être pédagogiques :
- **Explication claire** : Pourquoi la règle existe
- **Solution évidente** : Comment corriger le problème
- **Contexte fourni** : Fichier et ligne concernés

---

#### Comparaison avec les approches traditionnelles

##### Approche traditionnelle

Dans les projets classiques, les fichiers Markdown sont souvent validés manuellement ou pas du tout :

```typescript
// ❌ Approche traditionnelle
function parseMarkdown(content: string) {
  // Pas de validation, on parse directement
  // Si la structure est incorrecte, on découvre le problème au runtime
  return parse(content);
}
```

**Problèmes** :
- Erreurs découvertes au runtime (ou jamais)
- Pas de garantie de cohérence
- Dépendance à la vigilance des développeurs

##### Approche avec validation au build

```typescript
// ✅ Validation au build
function parseMarkdown(content: string, filePath: string) {
  validerContenuMarkdown(content, filePath); // ← Échoue au build si non conforme
  return parse(content);
}
```

**Avantages** :
- Erreurs détectées au build
- Cohérence garantie par les tests
- Pas de dépendance à la vigilance humaine

---

#### Exemples concrets

##### Exemple 1 : Fichier avec titre H1

**Fichier** (`exemple.md`) :
````markdown
### Titre H1 incorrect (devrait être H3)

### Partie 1
Contenu...
````

**Résultat** :
```
❌ Le fichier "exemple.md" contient un titre de niveau 1 (#).
Les fichiers MD doivent commencer au niveau 3 (###).
```

**Solution** : Remplacer le titre H1 par un titre H3 : `### Titre H1 incorrect`

##### Exemple 2 : H4 sans H3

**Fichier** (`exemple.md`) :
```markdown
#### Sous-partie sans partie

Contenu...
```

**Résultat** :
```
❌ Le fichier "exemple.md" contient un titre de niveau 4 (####) sans titre de niveau 3 (###).
Les sous-parties (####) doivent être dans une partie (###).
```

**Solution** : Ajouter un titre H3 avant le H4 :
```markdown
### Partie
#### Sous-partie

Contenu...
```

##### Exemple 3 : Titre dans un bloc de code (ignoré)

**Fichier** (`exemple.md`) :
````markdown
### Partie 1

```markdown
### Exemple de titre dans du code (H3 au lieu de H1)
```
````

**Résultat** : ✅ Pas d'erreur (le titre dans le bloc de code est ignoré)

---

#### Conclusion

Cette stratégie garantit que :
- ✅ Tous les fichiers Markdown respectent les règles métier définies
- ✅ Les erreurs sont détectées au build, pas au runtime
- ✅ La cohérence de la documentation est garantie automatiquement
- ✅ Les messages d'erreur sont actionnables et pédagogiques

La transformation des règles de documentation en contraintes techniques via des tests d'intégration crée un système où la qualité et la cohérence sont garanties automatiquement. Cette approche, bien que peu courante dans les projets standards, permet d'atteindre un niveau de qualité et de cohérence rarement atteint avec les approches traditionnelles où la validation est manuelle ou absente.

Le système devient un garde-fou actif : un fichier Markdown non conforme ne peut pas être déployé, forçant le développeur à corriger avant de pouvoir continuer, garantissant ainsi que la documentation reste toujours cohérente et de qualité.
