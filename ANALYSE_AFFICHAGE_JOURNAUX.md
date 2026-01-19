# Analyse : Pourquoi l'affichage des journaux ne respecte plus la spécification

## Spécification attendue

**Affichage souhaité** :
1. Titre de prompt (h4)
2. Prompt (composant avec fond bleu clair)
3. Texte du prompt
4. Résultat technique (composant avec fond blanc)
5. Texte du résultat technique

**SANS afficher** : Le titre de section (actuellement affiché en h3)

## Problème identifié

### État actuel dans `MarkdownRenderer.tsx`

Le composant affiche actuellement (lignes 22-70) :
1. ✅ Titre de section (h3) - **À SUPPRIMER**
2. ✅ Contenu libre de la section (si présent)
3. ✅ Titre de prompt (h4)
4. ✅ Composant Prompt
5. ✅ Composant TechnicalResult

### Pourquoi cette spécification n'est plus respectée

**Changement dans la structure du JSON** :

**ANCIEN FORMAT** (journal d'hier) :
- Markdown source : `## Section` (H2)
- Après ajustement : `### Section` (H3)
- Parser : `section.title = "Section"`
- Affichage : Le titre de section était pertinent à afficher car c'était la vraie section du journal

**NOUVEAU FORMAT** (aujourd'hui) :
- Markdown source : `### Partie` (H3)
- Après ajustement : `#### Partie` (H4)
- Parser : `section.title = "Partie"`
- Problème : "Partie" est maintenant juste un conteneur logique pour regrouper les prompts, pas une section à afficher

**Explication** :
- Dans le nouveau format, `### Partie` (H3) sert uniquement à **structurer/organiser** les prompts dans le JSON
- C'est une métadonnée de structure, pas un élément d'affichage
- Le vrai titre à afficher est `#### Sous-partie` (H4) qui devient `prompt.title`

## Pourquoi le JSON n'a plus tout à fait la même structure

Le parser `journalMarkdownParser.ts` a été adapté pour le nouveau format :
- Détecte les sections à partir de `#### ` (H4) au lieu de `### ` (H3)
- Détecte les titres de prompts à partir de `##### ` (H5) au lieu de `#### ` (H4)
- La structure JSON (`JournalSection` avec `title`, `content`, `prompts[]`) reste identique
- **MAIS** : La sémantique a changé :
  - Avant : `section.title` = vraie section du journal (à afficher)
  - Maintenant : `section.title` = "Partie" = conteneur logique (pas à afficher)

## Stratégie de correction proposée

### Option 1 : Modifier `MarkdownRenderer.tsx` (RECOMMANDÉ)

**Avantages** :
- Minimal : suppression de 4 lignes de code (lignes 23-28)
- Le JSON reste identique (pas de changement backend)
- Séparation backend/frontend préservée

**Actions** :
1. Supprimer l'affichage du titre de section (lignes 23-28 dans `MarkdownRenderer.tsx`)
2. Conserver l'affichage du contenu libre de la section (peut être utile)
3. Conserver l'affichage du titre de prompt, Prompt, et TechnicalResult

**Code à modifier** :
```tsx
// AVANT (lignes 22-28) :
parsed.sections.forEach((section, sectionIndex) => {
  // ❌ SUPPRIMER : Titre de section H3
  elements.push(
    <h3 key={`section-${sectionIndex}`} className={styles.h3}>
      {section.title}
    </h3>
  );
  
  // ✅ CONSERVER : Contenu libre de la section
  if (section.content.trim()) {
    // ...
  }
  
  // ✅ CONSERVER : Prompts
  section.prompts.forEach((prompt, promptIndex) => {
    // ...
  });
});

// APRÈS :
parsed.sections.forEach((section, sectionIndex) => {
  // ✅ CONSERVER : Contenu libre de la section (si présent)
  if (section.content.trim()) {
    elements.push(
      <CourseMarkdownRenderer 
        key={`section-content-${sectionIndex}`} 
        content={section.content.trim()} 
      />
    );
  }

  // ✅ CONSERVER : Prompts (titre, Prompt, TechnicalResult)
  section.prompts.forEach((prompt, promptIndex) => {
    // Titre de prompt H4
    if (prompt.title.trim()) {
      elements.push(
        <h4 key={`prompt-title-${sectionIndex}-${promptIndex}`} className={styles.h4}>
          {prompt.title}
        </h4>
      );
    }
    // Composant Prompt
    if (prompt.text.trim()) {
      elements.push(
        <Prompt
          key={`prompt-${sectionIndex}-${promptIndex}`}
          content={prompt.text.trim()}
        />
      );
    }
    // Composant TechnicalResult
    if (prompt.technicalResult.trim()) {
      elements.push(
        <TechnicalResult
          key={`tech-result-${sectionIndex}-${promptIndex}`}
          content={prompt.technicalResult.trim()}
        />
      );
    }
  });
});
```

### Option 2 : Modifier le parser pour ne pas créer de sections (NON RECOMMANDÉ)

**Inconvénients** :
- Changement de structure JSON (breakage)
- Nécessite modification des tests
- Change la logique backend alors que le problème est frontend

### Option 3 : Afficher conditionnellement le titre de section (NON RECOMMANDÉ)

**Inconvénients** :
- Complexifie le code sans nécessité
- La section n'est jamais à afficher dans le nouveau format

## Validation de la stratégie

**Stratégie recommandée** : **Option 1** - Supprimer l'affichage du titre de section dans `MarkdownRenderer.tsx`

**Justification** :
- ✅ Séparation backend/frontend préservée (le JSON reste inchangé)
- ✅ Changement minimal (4 lignes supprimées)
- ✅ Respecte la spécification : "Titre de prompt / Prompt / Texte du prompt / Résultat technique / Texte du résultat technique"
- ✅ Le contenu libre de la section reste affiché (peut contenir du texte avant les prompts)

## Plan d'action

1. **Supprimer** les lignes 23-28 dans `MarkdownRenderer.tsx` (affichage du titre de section)
2. **Conserver** l'affichage du contenu libre de la section (lignes 30-38)
3. **Conserver** l'affichage des prompts (lignes 40-70)
4. **Vérifier** que l'affichage correspond à la spécification
5. **Tester** que les journaux s'affichent correctement

## Questions

- Le contenu libre de la section (`section.content`) doit-il être conservé dans l'affichage ?
  - Si oui : garder lignes 30-38
  - Si non : supprimer aussi lignes 30-38
