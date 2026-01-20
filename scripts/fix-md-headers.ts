import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(
  process.cwd(),
  'A propos de ce site',
  '5. Cours',
  'FORMATION - Flux de requête HomePage.md'
);

console.log(`Correction du fichier: ${filePath}`);

let content = fs.readFileSync(filePath, 'utf-8');

// Replace H2 (##) with H4 (####)
content = content.replace(/^## /gm, '#### ');

// Replace H3 (###) with H5 (#####)
content = content.replace(/^### /gm, '##### ');

fs.writeFileSync(filePath, content, 'utf-8');

console.log('✅ Fichier corrigé avec succès !');
