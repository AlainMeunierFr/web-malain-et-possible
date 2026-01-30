# Journal de bord structuré avec parsing automatique pour génération de pages

## Introduction

Dans la plupart des projets, la documentation est statique et séparée du code. Le journal de bord, s'il existe, est souvent un simple fichier texte ou Markdown qui n'est pas intégré dans l'application. Cette approche rend difficile la navigation, la recherche, et l'intégration du journal dans l'expérience utilisateur.

Le besoin identifié est triple :
1. **Documentation vivante** : Le journal de bord doit être intégré dans l'application comme contenu dynamique
2. **Structure cohérente** : Le journal doit suivre la même structure que les autres contenus Markdown
3. **Génération automatique** : Les pages du journal doivent être générées automatiquement à partir des fichiers Markdown structurés

Pour répondre à ces besoins, un système de journal de bord structuré a été mis en place : les fichiers Markdown structurés (format `YYYY-MM-DD.md`) sont parsés automatiquement pour générer des pages web. La structure est unifiée avec les autres contenus Markdown, permettant un rendu cohérent et une maintenance facilitée.

## Résumé

Cette stratégie repose sur trois mécanismes interconnectés :

**1. Structure unifiée**
Les fichiers journal suivent la même structure hiérarchique que les autres contenus Markdown :
- H3 = Partie (###)
- H4 = Sous-partie (####)
- H5 = Bloc (#####)

**2. Parsing automatique**
Le backend pur (`utils/journalReader.ts` et `utils/journalMarkdownParser.ts`) parse automatiquement les fichiers journal et génère une structure JSON unifiée, identique à celle utilisée pour "A propos de ce site".

**3. Génération de pages**
Les pages Next.js (`app/journal-de-bord/page.tsx` et `app/journal-de-bord/[date]/page.tsx`) utilisent le backend pur pour générer automatiquement les pages à partir des fichiers Markdown parsés.

Cette approche transforme la documentation en contenu dynamique : les fichiers Markdown structurés deviennent des pages web automatiquement, tout en maintenant la cohérence avec le reste du site.

---

## Structure unifiée

### Format des fichiers journal

Les fichiers journal suivent le format `YYYY-MM-DD.md` dans `A propos de ce site/4. Journal de bord/` :

**Exemple** (`2026-01-21.md`) :
````markdown
# Sujet du jour

## Titre du prompt

### Prompt
Texte du prompt...

### Résultat technique
Texte du résultat technique...
````

**Hiérarchie** :
- **H3 (###)** = Partie principale (sujet du jour)
- **H4 (####)** = Sous-partie (titre du prompt)
- **H5 (#####)** = Bloc (Prompt, Résultat technique)

**Avantage** : Même structure que les autres contenus Markdown, styles CSS uniformes.

### Ajustement des niveaux

Pour respecter la convention hiérarchique, les niveaux sont ajustés automatiquement :

```typescript
// journalReader.ts
content = adjustMarkdownTitleLevels(content);
// ### devient ####, #### devient #####, ##### devient ######
```

**Résultat** : Après ajustement, tous les fichiers suivent la même hiérarchie, permettant l'utilisation du même parser.

---

## Parsing automatique

### Backend pur

Le backend pur parse les fichiers journal en utilisant la même logique que pour "A propos de ce site" :

**Lecture des fichiers** (`utils/journalReader.ts`) :
```typescript
export const readJournalFiles = (): JournalFile[] => {
  const journalDir = path.join(process.cwd(), 'A propos de ce site/4. Journal de bord');
  const files = fs.readdirSync(journalDir);
  
  // Filtrer les fichiers au format YYYY-MM-DD.md
  // Ajuster les niveaux de titres
  // Extraire le titre (première ligne non vide)
  // Retourner la liste des journaux
};
```

**Parsing du contenu** (`utils/journalMarkdownParser.ts`) :
```typescript
export const parseJournalMarkdown = (markdown: string): ParsedJournal => {
  // Utilise parseMarkdownContent() (parser générique)
  // Génère la structure unifiée Partie[] avec SousPartie[] et Bloc[]
  // Détecte automatiquement "Prompt" et "Résultat technique" via typeDeContenu
};
```

**Résultat** : Structure JSON unifiée, identique à celle utilisée pour "A propos de ce site".

### Structure générée

La structure générée est identique à celle des autres contenus Markdown :

```typescript
interface ParsedJournal {
  parties: Partie[]; // Les "sections" des journaux deviennent des "parties" (h3)
}

interface Partie {
  titre: string;
  contenu: string;
  contenuParse: ContenuElement[];
  sousParties: SousPartie[];
}

interface SousPartie {
  titre: string;
  contenu: string;
  contenuParse: ContenuElement[];
  typeDeContenu?: string; // "Prompt", "Résultat technique", etc.
  blocs: Bloc[];
}
```

**Avantage** : Même structure = composants React réutilisables, styles CSS uniformes.

---

## Génération de pages

### Page liste des journaux

La page `app/journal-de-bord/page.tsx` affiche la liste de tous les journaux :

```typescript
export default function JournalListPage() {
  const journals = readJournalFiles(); // ← Backend pur
  
  return (
    <div>
      <h1>Journal de bord</h1>
      {journals.map((journal) => (
        <Link href={`/journal-de-bord/${journal.date}`}>
          {journal.date} - {journal.title}
        </Link>
      ))}
    </div>
  );
}
```

**Résultat** : Liste automatique de tous les journaux, générée à partir des fichiers Markdown.

### Page détail d'un journal

La page `app/journal-de-bord/[date]/page.tsx` affiche le contenu d'un journal spécifique :

```typescript
export default function JournalDetailPage({ params }: { params: { date: string } }) {
  const journals = readJournalFiles();
  const journal = journals.find(j => j.date === params.date);
  
  if (!journal) {
    return <div>Journal non trouvé</div>;
  }
  
  const parsed = parseJournalMarkdown(journal.content); // ← Backend pur
  
  return (
    <div>
      <h1>{journal.title}</h1>
      <JournalContentRenderer parsed={parsed} />
    </div>
  );
}
```

**Résultat** : Page automatique pour chaque journal, générée à partir du fichier Markdown parsé.

### Composants réutilisables

Les composants utilisés pour "A propos de ce site" sont réutilisables pour les journaux :

```typescript
// Composant unifié qui fonctionne pour tous les types de fichiers
function JournalContentRenderer({ parsed }: { parsed: ParsedJournal }) {
  return (
    <div>
      {parsed.parties.map((partie) => (
        <PartieRenderer partie={partie} />
      ))}
    </div>
  );
}
```

**Avantage** : Pas de duplication de code, styles CSS uniformes, maintenance facilitée.

---

## Avantages de cette approche

### 1. Documentation vivante

Le journal de bord est intégré dans l'application :
- **Navigation** : Navigation facile entre les journaux
- **Recherche** : Recherche possible dans les journaux
- **Intégration** : Le journal fait partie de l'expérience utilisateur

### 2. Structure cohérente

Même structure que les autres contenus Markdown :
- **Styles CSS uniformes** : Styles basés sur la hiérarchie HTML (h3, h4, h5)
- **Composants réutilisables** : Même composants que pour "A propos de ce site"
- **Mode lecture navigateur** : Fonctionne correctement grâce à la hiérarchie cohérente

### 3. Génération automatique

Les pages sont générées automatiquement :
- **Pas de maintenance manuelle** : Ajouter un fichier Markdown = nouvelle page automatiquement
- **Cohérence garantie** : Tous les journaux suivent la même structure
- **Extensibilité** : Facile d'ajouter de nouvelles fonctionnalités (recherche, filtres, etc.)

### 4. Maintenabilité

Architecture claire et maintenable :
- **Backend pur** : Logique métier testable et réutilisable
- **Structure unifiée** : Même structure pour tous les types de fichiers
- **Composants réutilisables** : Pas de duplication de code

---

## Comparaison avec les approches traditionnelles

### Approche traditionnelle

Dans les projets classiques, le journal de bord est souvent un simple fichier texte :

```markdown
# ❌ Approche traditionnelle
# Fichier journal.txt ou journal.md
# Non intégré dans l'application
# Pas de navigation, pas de recherche, pas de structure
```

**Problèmes** :
- Non intégré dans l'application
- Pas de navigation
- Pas de structure cohérente
- Maintenance manuelle

### Approche avec parsing automatique

```markdown
# ✅ Parsing automatique
# Fichiers YYYY-MM-DD.md structurés
# Parsés automatiquement par le backend pur
# Pages générées automatiquement
# Structure unifiée avec les autres contenus
```

**Avantages** :
- Intégré dans l'application
- Navigation et recherche
- Structure cohérente
- Génération automatique

---

## Exemples concrets

### Exemple 1 : Ajout d'un nouveau journal

**Action** : Créer un fichier `2026-01-22.md` dans `A propos de ce site/4. Journal de bord/`

**Résultat** :
- Le fichier est automatiquement détecté par `readJournalFiles()`
- Une nouvelle entrée apparaît dans la liste des journaux
- Une nouvelle page est accessible via `/journal-de-bord/2026-01-22`

**Avantage** : Pas de maintenance manuelle, tout est automatique.

### Exemple 2 : Structure d'un journal

**Fichier** (`2026-01-21.md`) :
````markdown
# Nouvelle fonctionnalité

## Ajout d'un nouveau composant

### Prompt
Créer un composant pour afficher les métriques...

### Résultat technique
Composant MetricsCard créé avec tests unitaires...
````

**Parsing** :
- H3 "Nouvelle fonctionnalité" → Partie
- H4 "Ajout d'un nouveau composant" → Sous-partie
- H5 "Prompt" → Bloc avec `typeDeContenu: "Prompt"`
- H5 "Résultat technique" → Bloc avec `typeDeContenu: "Résultat technique"`

**Rendu** : Structure hiérarchique avec styles spécifiques pour Prompt et Résultat technique.

---

## Conclusion

Cette stratégie garantit que :
- ✅ Le journal de bord est intégré dans l'application comme contenu dynamique
- ✅ La structure est unifiée avec les autres contenus Markdown
- ✅ Les pages sont générées automatiquement à partir des fichiers Markdown structurés
- ✅ Les composants et styles sont réutilisables

Le système de journal de bord structuré transforme la documentation en contenu dynamique. Cette approche, bien que peu courante dans les projets standards où la documentation est statique, permet d'atteindre un niveau d'intégration et de maintenabilité rarement atteint avec les approches traditionnelles.

Le système devient une documentation vivante : les fichiers Markdown structurés deviennent des pages web automatiquement, tout en maintenant la cohérence avec le reste du site, créant une expérience utilisateur fluide et une maintenance facilitée.
