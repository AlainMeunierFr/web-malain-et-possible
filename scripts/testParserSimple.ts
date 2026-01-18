/**
 * Script simple pour tester le parser avec un exemple minimal
 */

import { parseJournalMarkdown } from '../utils/journalMarkdownParser';
import { adjustMarkdownTitleLevels } from '../utils/markdownTitleAdjuster';

const markdown = `## Création du site

### Création du projet Next.js
##### Prompt
Affiche "Hello World" / Créer un projet Next.js TypeScript

##### Résultat technique
(commit \`8fadf78\`) : Création du projet Next.js avec une page affichant "Hello World"`;

console.log('=== CONTENU ORIGINAL ===');
console.log(markdown);
console.log('\n');

// Appliquer l'ajustement
const adjusted = adjustMarkdownTitleLevels(markdown);
console.log('=== CONTENU APRÈS AJUSTEMENT ===');
console.log(adjusted);
console.log('\n');

// Parser
const result = parseJournalMarkdown(adjusted);

console.log('=== RÉSULTAT ===');
console.log(JSON.stringify(result, null, 2));
