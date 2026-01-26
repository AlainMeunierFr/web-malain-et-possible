/**
 * Script simple pour tester le parser avec un exemple minimal
 */

import { parseJournalMarkdown } from '../utils/journalMarkdownParser';

const markdown = `# Création du site

## Création du projet Next.js
### Prompt
Affiche "Hello World" / Créer un projet Next.js TypeScript

### Résultat technique
(commit \`8fadf78\`) : Création du projet Next.js avec une page affichant "Hello World"`;

console.log('=== CONTENU ===');
console.log(markdown);
console.log('\n');

// Parser (nouveau système : pas d'ajustement nécessaire)
const result = parseJournalMarkdown(markdown);

console.log('=== RÉSULTAT ===');
console.log(JSON.stringify(result, null, 2));
