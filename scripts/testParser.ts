/**
 * Script pour tester le parser et générer un JSON inspectable
 * Usage: npx tsx scripts/testParser.ts JOURNAL_DE_BORD/2026-01-17.md
 */

import fs from 'fs';
import path from 'path';
import { parseJournalMarkdown } from '../utils/journalMarkdownParser';
import { adjustMarkdownTitleLevels } from '../utils/markdownTitleAdjuster';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: npx tsx scripts/testParser.ts <path-to-markdown-file>');
  process.exit(1);
}

const fullPath = path.join(process.cwd(), filePath);

if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

console.log(`Parsing: ${filePath}\n`);

// Lire le contenu
let content = fs.readFileSync(fullPath, 'utf-8');

// Appliquer l'ajustement des niveaux (comme dans journalReader)
content = adjustMarkdownTitleLevels(content);

console.log('=== CONTENU APRÈS AJUSTEMENT ===');
console.log(content.substring(0, 500));
console.log('...\n');

// Parser
const result = parseJournalMarkdown(content);

// Sauvegarder le JSON dans un fichier pour inspection
const jsonPath = path.join(process.cwd(), 'parsed-journal.json');
fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), 'utf-8');

console.log('=== RÉSULTAT DU PARSING (JSON) ===');
console.log(JSON.stringify(result, null, 2));
console.log(`\nJSON sauvegardé dans: ${jsonPath}`);

// Statistiques
console.log('\n=== STATISTIQUES ===');
console.log(`Nombre de sections: ${result.sections.length}`);
result.sections.forEach((section, idx) => {
  console.log(`\nSection ${idx + 1}: "${section.title}"`);
  console.log(`  - Nombre de prompts: ${section.prompts.length}`);
  section.prompts.forEach((prompt, pIdx) => {
    console.log(`  - Prompt ${pIdx + 1}:`);
    console.log(`    Titre: "${prompt.title || '(sans titre)'}"`);
    console.log(`    Texte: "${prompt.text.substring(0, 50)}${prompt.text.length > 50 ? '...' : ''}" (${prompt.text.length} chars)`);
    console.log(`    Résultat: "${prompt.technicalResult.substring(0, 50)}${prompt.technicalResult.length > 50 ? '...' : ''}" (${prompt.technicalResult.length} chars)`);
  });
});
