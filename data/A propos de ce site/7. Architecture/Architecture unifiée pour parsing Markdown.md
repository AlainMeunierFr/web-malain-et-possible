# Architecture unifiée pour parsing Markdown : un seul parser pour tous les types de fichiers

## Introduction

Dans la plupart des projets, chaque type de fichier Markdown (journaux, documentation, cours, etc.) a son propre parser spécialisé. Cette approche crée de la duplication de code, des incohérences dans le traitement, et rend l'ajout de nouveaux types de fichiers complexe.

Le besoin identifié est triple :
1. **Éviter la duplication** : Un seul parser pour tous les types de fichiers Markdown
2. **Cohérence** : Même structure de données pour tous les types de fichiers
3. **Extensibilité** : Faciliter l'ajout de nouveaux types de fichiers sans dupliquer le code

Pour répondre à ces besoins, une architecture unifiée a été mise en place : un seul parser Markdown générique (`parseMarkdown()`) pour tous les types de fichiers MD, avec une structure JSON unifiée (`ParsedFolder`) et gestion des spécificités via attributs (`typeDeContenu`, `estPrompt`, etc.) plutôt que parsers spécialisés.

## Résumé

Cette stratégie repose sur trois principes fondamentaux :

**1. Parser générique unique**
Un seul parser Markdown (`parseMarkdownContent()`) traite tous les types de fichiers MD (journaux, "A propos de ce site", cours, etc.). Ce parser génère une structure JSON unifiée basée sur la hiérarchie HTML (h1 → h2 → h3 → h4 → h5).

**2. Structure hiérarchique unifiée**
Tous les fichiers Markdown suivent la même hiérarchie :
- H1 = Chapitre (représenté par un dossier)
- H2 = Section (représenté par un fichier MD)
- H3 = Partie (### dans le fichier MD)
- H4 = Sous-partie (#### dans le fichier MD)
- H5 = Bloc (##### dans le fichier MD)

**3. Gestion des spécificités via attributs**
Les spécificités de chaque type de fichier sont gérées via des attributs (`typeDeContenu`, `estPrompt`, `estResultatTechnique`) plutôt que des parsers spécialisés. Une fonction d'enrichissement séparée (`detecterUserStory()`, etc.) gère les spécificités après le parsing générique.

Cette approche transforme le parsing Markdown en opération générique et réutilisable : un seul parser, une seule structure, des spécificités gérées via attributs, créant une base solide et extensible pour tous les types de fichiers Markdown.

---

## Parser générique unique

### Principe : un parser pour tous

Le parser générique `parseMarkdownContent()` traite n'importe quel contenu Markdown et génère une structure JSON unifiée :

```typescript
/**
 * Parse le contenu markdown générique (paragraphes, listes, etc.)
 * Utilisé par tous les types de fichiers MD
 */
export const parseMarkdownContent = (contenu: string): ContenuElement[] => {
  // Parsing générique : paragraphes, listes à puce, listes numérotées
  // Retourne une structure unifiée ContenuElement[]
};
```

**Utilisation** :
- Journaux : `parseMarkdownContent()` pour parser le contenu des parties
- "A propos de ce site" : `parseMarkdownContent()` pour parser le contenu des sections
- Cours : `parseMarkdownContent()` pour parser le contenu des cours

**Avantage** : Un seul parser à maintenir, un seul comportement à tester, une seule logique à comprendre.

### Structure JSON unifiée

Tous les types de fichiers génèrent la même structure de base :

```typescript
interface Partie {
  titre: string;
  contenu: string;
  contenuParse: ContenuElement[]; // ← Parsé avec parseMarkdownContent()
  sousParties: SousPartie[];
}

interface SousPartie {
  titre: string;
  contenu: string;
  contenuParse: ContenuElement[]; // ← Parsé avec parseMarkdownContent()
  typeDeContenu?: string; // ← Spécificité gérée via attribut
  blocs: Bloc[];
}

interface Bloc {
  titre: string;
  contenu: string;
  contenuParse: ContenuElement[]; // ← Parsé avec parseMarkdownContent()
  typeDeContenu?: string; // ← Spécificité gérée via attribut
}
```

**Avantage** : Même structure pour tous les types de fichiers, facilitant la réutilisation des composants React et des styles CSS.

---

## Structure hiérarchique unifiée

### Convention hiérarchique

Tous les fichiers Markdown suivent la même convention hiérarchique :

**Hiérarchie** :
- **H1** = Chapitre (représenté par un dossier)
- **H2** = Section (représenté par un fichier MD)
- **H3** = Partie (### dans le fichier MD)
- **H4** = Sous-partie (#### dans le fichier MD)
- **H5** = Bloc (##### dans le fichier MD)

**Exemple pour "A propos de ce site"** :
````markdown
# Partie principale (H3)

## Sous-partie (H4)

### Bloc (H5)
Contenu du bloc...
````

**Exemple pour journaux** (après ajustement des niveaux) :
````markdown
## Partie (H4, était H3 dans le fichier source)

### Sous-partie (H5, était H4 dans le fichier source)

#### Prompt (H6, était H5 dans le fichier source)
Contenu du prompt...
````

**Avantage** : Hiérarchie cohérente, styles CSS uniformes, mode lecture des navigateurs fonctionnel.

### Ajustement des niveaux

Pour les journaux, les niveaux sont ajustés automatiquement pour respecter la convention :

```typescript
// journalReader.ts : Ajuste les niveaux avant le parsing
content = adjustMarkdownTitleLevels(content);
// ### devient ####, #### devient #####, etc.
```

**Résultat** : Après ajustement, tous les fichiers suivent la même hiérarchie, permettant l'utilisation du même parser.

---

## Gestion des spécificités via attributs

### Principe : attributs plutôt que parsers spécialisés

Les spécificités de chaque type de fichier sont gérées via des attributs plutôt que des parsers spécialisés :

**Attributs utilisés** :
- `typeDeContenu` : "Prompt", "Résultat technique", "User Story", etc.
- `estPrompt` : Booléen pour les blocs Prompt
- `estResultatTechnique` : Booléen pour les blocs Résultat technique
- `estSpecial` : Booléen pour les éléments spéciaux

**Détection automatique** :
```typescript
// Détection automatique dans le parser
const titreLower = titre.toLowerCase();
const typeDeContenu = (titreLower === 'prompt' || titreLower === 'résultat technique') 
  ? (titreLower === 'prompt' ? 'Prompt' : 'Résultat technique')
  : undefined;

sousPartieCourante = {
  titre,
  contenu: '',
  contenuParse: [],
  typeDeContenu, // ← Attribut pour gérer la spécificité
  blocs: []
};
```

**Avantage** : Pas besoin de parser spécialisé, la spécificité est gérée via un attribut dans la structure unifiée.

### Enrichissement spécifique

Pour les spécificités complexes (ex: User Stories), une fonction d'enrichissement séparée est utilisée :

```typescript
/**
 * Détecte si une sous-partie est une User Story et attribue les typeDeContenu
 * Fonction d'enrichissement appelée après le parsing générique
 */
export const detecterUserStory = (
  elements: ContenuElement[],
  contenuBrut: string
): ContenuElement[] => {
  // Détection des éléments spécifiques (En tant que, Je souhaite, etc.)
  // Attribution des typeDeContenu aux éléments concernés
  // Retourne les éléments enrichis
};
```

**Utilisation** :
```typescript
// Après le parsing générique
const contenuParse = parseMarkdownContent(contenuBrut);
// Enrichissement spécifique
sousPartieCourante.contenuParse = detecterUserStory(contenuParse, contenuBrut);
```

**Avantage** : Le parsing générique reste simple, les spécificités sont gérées via enrichissement séparé.

---

## Exemples concrets

### Exemple 1 : Parser pour "A propos de ce site"

**Fichier** (`A propos de ce site/1. A propos du projet/1. Contexte.md`) :
````markdown
# Partie principale

## Sous-partie

Contenu de la sous-partie...
````

**Parsing** :
```typescript
const contenuParse = parseSectionContent(contenu);
// Utilise parseMarkdownContent() pour parser le contenu
// Génère la structure unifiée Partie[] avec SousPartie[]
```

**Résultat** : Structure unifiée, prête pour le rendu React.

### Exemple 2 : Parser pour journaux

**Fichier** (`A propos de ce site/4. Journal de bord/2026-01-21.md`) :
````markdown
# Sujet du jour

## Titre du prompt

### Prompt
Texte du prompt...

### Résultat technique
Texte du résultat...
````

**Ajustement des niveaux** :
```typescript
// journalReader.ts
content = adjustMarkdownTitleLevels(content);
// ### devient ####, #### devient #####, ##### devient ######
```

**Parsing** :
```typescript
const parsed = parseJournalMarkdown(content);
// Utilise parseMarkdownContent() pour parser le contenu
// Détecte automatiquement "Prompt" et "Résultat technique" via typeDeContenu
```

**Résultat** : Structure unifiée avec `typeDeContenu: "Prompt"` et `typeDeContenu: "Résultat technique"`.

### Exemple 3 : Réutilisation des composants React

**Composant unifié** :
```typescript
// Composant qui fonctionne pour tous les types de fichiers
function SousPartieRenderer({ sousPartie }: { sousPartie: SousPartie }) {
  return (
    <div>
      <h4>{sousPartie.titre}</h4>
      {sousPartie.typeDeContenu === 'Prompt' && (
        <div className="prompt-style">
          {/* Style spécifique pour Prompt */}
        </div>
      )}
      <MarkdownContentRenderer elements={sousPartie.contenuParse} />
    </div>
  );
}
```

**Avantage** : Un seul composant pour tous les types de fichiers, styles basés sur la hiérarchie HTML et les attributs.

---

## Avantages de cette architecture

### 1. Éviter la duplication

Un seul parser pour tous les types de fichiers :
- **Maintenance simplifiée** : Un seul parser à maintenir
- **Cohérence garantie** : Même comportement pour tous les types
- **Tests unifiés** : Un seul ensemble de tests pour le parser

### 2. Cohérence

Même structure pour tous les types de fichiers :
- **Styles CSS uniformes** : Styles basés sur la hiérarchie HTML (h3, h4, h5)
- **Composants React réutilisables** : Un seul composant pour tous les types
- **Mode lecture navigateur** : Fonctionne correctement grâce à la hiérarchie cohérente

### 3. Extensibilité

Faciliter l'ajout de nouveaux types de fichiers :
- **Pas de nouveau parser** : Utiliser le parser générique existant
- **Attributs pour spécificités** : Gérer les spécificités via attributs
- **Enrichissement séparé** : Fonctions d'enrichissement pour les cas complexes

### 4. Maintenabilité

Architecture claire et maintenable :
- **Séparation des préoccupations** : Parsing générique vs enrichissement spécifique
- **Code DRY** : Pas de duplication de logique de parsing
- **Compréhension facilitée** : Une seule logique à comprendre

---

## Comparaison avec les approches traditionnelles

### Approche traditionnelle

Dans les projets classiques, chaque type de fichier a son propre parser :

```typescript
// ❌ Approche traditionnelle
function parseJournal(markdown: string): JournalStructure { /* ... */ }
function parseAboutSite(markdown: string): AboutSiteStructure { /* ... */ }
function parseCourse(markdown: string): CourseStructure { /* ... */ }
// Duplication de code, incohérences, maintenance difficile
```

**Problèmes** :
- Duplication de code
- Incohérences dans le traitement
- Maintenance difficile (changements à faire dans plusieurs parsers)

### Approche avec architecture unifiée

```typescript
// ✅ Architecture unifiée
function parseMarkdownContent(contenu: string): ContenuElement[] { /* ... */ }
function parseSectionContent(contenu: string): SectionContent { /* ... */ }
function parseJournalMarkdown(markdown: string): ParsedJournal {
  // Utilise parseMarkdownContent() et parseSectionContent()
  // Structure unifiée, spécificités via attributs
}
```

**Avantages** :
- Pas de duplication
- Cohérence garantie
- Maintenance facilitée

---

## Conclusion

Cette stratégie garantit que :
- ✅ Un seul parser générique pour tous les types de fichiers Markdown
- ✅ Structure hiérarchique unifiée basée sur la hiérarchie HTML
- ✅ Spécificités gérées via attributs plutôt que parsers spécialisés
- ✅ Extensibilité facilitée pour l'ajout de nouveaux types de fichiers

L'architecture unifiée transforme le parsing Markdown en opération générique et réutilisable. Cette approche, bien que peu courante dans les projets standards où chaque type de fichier a son propre parser, permet d'atteindre un niveau de cohérence, de maintenabilité et d'extensibilité rarement atteint avec les approches traditionnelles.

Le système devient une base solide et extensible : un seul parser, une seule structure, des spécificités gérées via attributs, créant une architecture claire et maintenable pour tous les types de fichiers Markdown.
