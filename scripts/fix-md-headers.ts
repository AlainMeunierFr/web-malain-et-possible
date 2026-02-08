import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(
  process.cwd(),
  'data',
  'A propos',
  '5. Cours',
  'FORMATION - Flux de requête HomePage.md'
);

console.log(`Correction du fichier: ${filePath}`);

const content = fs.readFileSync(filePath, 'utf-8');

// ⚠️ OBSOLÈTE : Ce script convertit vers l'ancien format (avant US-5.5)
// Avec US-5.5, les fichiers MD utilisent directement #, ##, ###, etc.
// Ce script est conservé pour migration inverse si nécessaire.
// 
// Replace H2 (##) with H4 (####) - ANCIEN FORMAT
// content = content.replace(/^## /gm, '#### ');
// 
// Replace H3 (###) with H5 (#####) - ANCIEN FORMAT
// content = content.replace(/^### /gm, '##### ');

fs.writeFileSync(filePath, content, 'utf-8');

console.log('✅ Fichier corrigé avec succès !');
