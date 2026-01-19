### Analyse des Styles - Vue d'ensemble

#### Problème identifié

Les styles sont basés sur le **contenu sémantique** ("Prompt", "Résultat technique") plutôt que sur la **hiérarchie HTML** (h1, h2, h3, etc.). Cela viole les fondamentaux HTML et rend la maintenance difficile.

#### Tableau récapitulatif des styles existants

| Fichier CSS | Classe/Selecteur | Balise HTML utilisée | Niveau hiérarchique réel | Contenu sémantique | Problème |
|------------|------------------|---------------------|-------------------------|-------------------|----------|
| **Prompt.module.css** | `.prompt` | `<div>` (via composant Prompt) | - | Prompt utilisateur | ❌ Style basé sur contenu, pas hiérarchie |
| **TechnicalResult.module.css** | `.technicalResult` | `<div>` (via composant TechnicalResult) | - | Résultat technique | ❌ Style basé sur contenu, pas hiérarchie |
| **MarkdownRenderer.module.css** | `.markdownContent h1` | `<h1>` | H1 | Titre principal | ✅ Correct |
| **MarkdownRenderer.module.css** | `.markdownContent h2` | `<h2>` | H2 | Sous-titre | ✅ Correct |
| **MarkdownRenderer.module.css** | `.markdownContent h3` | `<h3>` | H3 | Section | ✅ Correct (utilisé pour sections) |
| **MarkdownRenderer.module.css** | `.markdownContent h4` | `<h4>` | H4 | Titre de prompt | ⚠️ Utilisé pour titre de prompt (sémantique) |
| **MarkdownRenderer.module.css** | `.markdownContent h5` | `<h5>` | H5 | - | ✅ Correct (non utilisé actuellement) |
| **MarkdownRenderer.module.css** | `.markdownContent h6` | `<h6>` | H6 | Prompt / Résultat technique | ❌ Utilisé pour "####### Prompt" et "####### Résultat technique" (sémantique) |
| **AccordionSection.module.css** | `.accordionTitle` | `<h1>` | H1 | Titre accordéon | ✅ Correct (utilisé pour H1) |
| **JournalList.module.css** | `.journalDate` | `<h2>` | H2 | Date journal | ✅ Correct (utilisé pour H2) |
| **CourseList.module.css** | `.courseTitle` | `<h2>` | H2 | Titre cours | ✅ Correct (utilisé pour H2) |
| **about-site.module.css** | `.intro h2` | `<h2>` | H2 | Sous-titre intro | ✅ Correct |
| **about-site.module.css** | `.dodSection h2` | `<h2>` | H2 | Sous-titre DOD | ✅ Correct |
| **about-site.module.css** | `.theme h2` | `<h2>` | H2 | Thème DOD | ✅ Correct |
| **about-site.module.css** | `.theme h3` | `<h3>` | H3 | Sous-thème | ✅ Correct |
| **SimpleMarkdownRenderer.module.css** | `.simpleMarkdownContent` | `<div>` + `<p>`, `<ul>`, `<li>` | - | Contenu simple (dans Prompt/TechnicalResult) | ⚠️ Pas de titres, OK |

#### Hiérarchie HTML actuelle dans les journaux

##### Structure actuelle (problématique)
```
<h1> - Accordion "Journal de bord" (1.75rem)
  <h2> - Date du journal (1.25rem)
    <h3> - Section journal (1.25rem)
      <h4> - Titre de prompt (1.1rem, bleu)
        <div class="prompt"> - Contenu prompt (fond bleu clair)
          <h6> - "####### Prompt" (0.9rem) ❌ PROBLÈME
        <div class="technicalResult"> - Contenu résultat (fond blanc)
          <h6> - "####### Résultat technique" (0.9rem) ❌ PROBLÈME
```

##### Structure souhaitée (basée sur hiérarchie HTML)
```
<h1> - Accordion "Journal de bord" (2rem)
  <h2> - Date du journal (1.5rem)
    <h3> - Section journal (1.25rem)
      <h4> - Titre de prompt (1.1rem)
        <div class="h4-content"> - Contenu prompt (fond bleu clair)
          <h5> - "Prompt" (1rem) ✅
        <div class="h4-content"> - Contenu résultat (fond blanc)
          <h5> - "Résultat technique" (1rem) ✅
```

#### Problèmes identifiés

##### 1. Prompt et TechnicalResult utilisent H6 au lieu de H5
- **Actuellement** : `<h6>####### Prompt</h6>` et `<h6>####### Résultat technique</h6>`
- **Problème** : H6 est au niveau le plus bas de la hiérarchie, alors que ces éléments sont des sous-titres de prompt (H4)
- **Solution** : Utiliser H5 pour "Prompt" et "Résultat technique"

##### 2. Styles basés sur le contenu au lieu de la hiérarchie
- **Actuellement** : `.prompt` et `.technicalResult` sont des classes CSS basées sur le contenu
- **Problème** : Si on veut modifier l'apparence des éléments de niveau H5, il faut modifier deux classes
- **Solution** : Utiliser des classes basées sur la hiérarchie (`.h5-content` ou simplement styler `h5` dans le contexte)

##### 3. Duplication des styles H2
- **Actuellement** : Plusieurs styles H2 dans différents fichiers (`.intro h2`, `.dodSection h2`, `.theme h2`, `.journalDate`, `.courseTitle`)
- **Problème** : Duplication et incohérence
- **Solution** : Unifier dans un style global pour H2

#### Plan de refactorisation

1. **Changer H6 → H5** pour "Prompt" et "Résultat technique"
2. **Remplacer les classes `.prompt` et `.technicalResult`** par des styles basés sur la hiérarchie HTML
3. **Créer une feuille de style globale** pour la hiérarchie des titres (h1, h2, h3, h4, h5, h6)
4. **Unifier les styles H2** dans tous les fichiers
5. **Assurer la cohérence** pour le mode lecture et le SEO

#### Feuille de style proposée (structure)

```css
/* Hiérarchie globale des titres */
h1 { /* 2rem - Titre principal accordéon */ }
h2 { /* 1.5rem - Date journal, titre cours, sous-titres */ }
h3 { /* 1.25rem - Sections journal */ }
h4 { /* 1.1rem - Titres de prompts */ }
h5 { /* 1rem - Labels "Prompt", "Résultat technique" */ }
h6 { /* 0.9rem - Sous-labels (si nécessaire) */ }

/* Contextes avec styles spéciaux */
.prompt-container { /* Fond bleu clair pour contenu prompt */ }
.technical-result-container { /* Fond blanc pour contenu résultat */ }

/* Ces containers utilisent la hiérarchie HTML standard */
```
