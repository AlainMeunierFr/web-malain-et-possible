/**
 * Script pour tester le parser et générer un JSON inspectable
 * Usage: npx tsx scripts/testParser.ts JOURNAL_DE_BORD/2026-01-17.md
 */

import fs from 'fs';
import path from 'path';
import { parseJournalMarkdown } from '../utils/server';

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

// Lire le contenu (nouveau système : pas d'ajustement nécessaire)
const content = fs.readFileSync(fullPath, 'utf-8');

console.log('=== CONTENU ===');
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
console.log(`Nombre de parties: ${result.parties.length}`);
result.parties.forEach((partie, idx) => {
  console.log(`\nPartie ${idx + 1}: "${partie.titre}"`);
  console.log(`  - Nombre de sous-parties: ${partie.sousParties.length}`);
  partie.sousParties.forEach((sousPartie, spIdx) => {
    console.log(`  - Sous-partie ${spIdx + 1}: "${sousPartie.titre}"`);
    console.log(`    - Nombre de blocs: ${sousPartie.blocs.length}`);
    sousPartie.blocs.forEach((bloc, bIdx) => {
      console.log(`    - Bloc ${bIdx + 1}: "${bloc.titre}" (type: ${bloc.typeDeContenu || 'normal'})`);
      if (bloc.contenuParse && bloc.contenuParse.length > 0) {
        const firstContent = bloc.contenuParse[0];
        const preview = firstContent.type === 'paragraph' 
          ? (firstContent.content || '').substring(0, 50)
          : firstContent.items?.[0]?.substring(0, 50) || '';
        console.log(`      Contenu: "${preview}${preview.length >= 50 ? '...' : ''}"`);
      }
    });
  });
});
