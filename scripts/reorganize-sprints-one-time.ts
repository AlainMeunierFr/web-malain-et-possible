/**
 * Script one-shot : réorganise le dossier "data/A propos de ce site/2. Sprints"
 * 1. Chaque fichier MD (Sprint) devient un dossier (même nom sans .md)
 * 2. Chaque US (## US-X.X : Titre) dans le fichier devient un fichier .md dans ce dossier
 *
 * Usage : npx ts-node --project tsconfig.node.json scripts/reorganize-sprints-one-time.ts
 * Ou     : npx tsx scripts/reorganize-sprints-one-time.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const SPRINTS_DIR = path.join(
  process.cwd(),
  'data',
  'A propos de ce site',
  '2. Sprints'
);

// Caractères interdits dans les noms de fichiers Windows
function sanitizeFileName(title: string): string {
  return title
    .replace(/[:*?"<>|/\\]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim() || 'sans-titre';
}

// Détecte les délimiteurs ## US-X.X (H2 uniquement)
const US_HEADING_REGEX = /^## (US-\d+\.\d+)\s*:\s*(.+)$/m;

function extractUSBlocks(content: string): { intro: string; usBlocks: { id: string; title: string; body: string }[] } {
  const lines = content.split('\n');
  const usBlocks: { id: string; title: string; body: string }[] = [];
  let intro = '';
  let currentBlock: { id: string; title: string; body: string } | null = null;
  let introDone = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(US_HEADING_REGEX);

    if (match) {
      const [, id, title] = match;
      if (currentBlock) {
        currentBlock.body = currentBlock.body.trimEnd();
        usBlocks.push(currentBlock);
      }
      currentBlock = {
        id,
        title: title.trim(),
        body: line + '\n',
      };
      introDone = true;
      continue;
    }

    if (currentBlock) {
      currentBlock.body += line + '\n';
    } else {
      intro += line + '\n';
    }
  }

  if (currentBlock) {
    currentBlock.body = currentBlock.body.trimEnd();
    usBlocks.push(currentBlock);
  }

  return { intro: intro.trimEnd(), usBlocks };
}

function processSprintFile(filePath: string, baseName: string): void {
  const content = fs.readFileSync(filePath, 'utf8');
  const { intro, usBlocks } = extractUSBlocks(content);

  const folderPath = path.join(SPRINTS_DIR, baseName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // 1. Intro (Sprint Goal, Contexte, etc.) → 00 - Sprint goal et contexte.md
  if (intro) {
    const introPath = path.join(folderPath, '00 - Sprint goal et contexte.md');
    fs.writeFileSync(introPath, intro, 'utf8');
    console.log(`  → ${path.basename(folderPath)}/00 - Sprint goal et contexte.md`);
  }

  // 2. Chaque US → US-X.X - Titre_slug.md
  for (const block of usBlocks) {
    const safeTitle = sanitizeFileName(block.title);
    const fileName = `${block.id} - ${safeTitle}.md`;
    const usPath = path.join(folderPath, fileName);
    fs.writeFileSync(usPath, block.body, 'utf8');
    console.log(`  → ${path.basename(folderPath)}/${fileName}`);
  }
}

function main(): void {
  console.log('Réorganisation des Sprints : chaque fichier MD → dossier, chaque US → fichier\n');
  console.log(`Dossier source : ${SPRINTS_DIR}\n`);

  if (!fs.existsSync(SPRINTS_DIR)) {
    console.error('Erreur : le dossier Sprints n\'existe pas.');
    process.exit(1);
  }

  const files = fs.readdirSync(SPRINTS_DIR);
  const mdFiles = files.filter((f) => f.endsWith('.md') && fs.statSync(path.join(SPRINTS_DIR, f)).isFile());

  if (mdFiles.length === 0) {
    console.log('Aucun fichier .md trouvé.');
    return;
  }

  for (const mdFile of mdFiles) {
    const baseName = mdFile.replace(/\.md$/i, '');
    const filePath = path.join(SPRINTS_DIR, mdFile);
    console.log(`Sprint : ${mdFile}`);
    processSprintFile(filePath, baseName);
    console.log('');
  }

  console.log('Terminé. Les fichiers .md originaux sont conservés ; vous pouvez les supprimer après vérification.');
}

main();
