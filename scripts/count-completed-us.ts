/**
 * Script pour compter les User Stories complétées dans les sprints
 * Les US sont dans les sous-dossiers de "data/A propos de ce site/Sprints".
 * Une US est considérée comme complétée si le nom du fichier ou le contenu contient "✅ COMPLÉTÉ" ou "COMPLETÉ"
 */

import fs from 'fs';
import path from 'path';

const SPRINTS_DIR = path.join(process.cwd(), 'data', 'A propos de ce site', 'Sprints');

/** Nom de fichier qui identifie une US (ex. US-7.1 - Titre.md ou US-7.1 - Titre ✅ COMPLÉTÉ.md) */
const US_FILENAME_REGEX = /^US-\d+\.\d+[a-z]?\s*-/i;

/** Marqueur de complétion dans le nom de fichier ou le contenu */
function isCompletedInFilename(filename: string): boolean {
  const normalized = filename.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return (
    /COMPL[EÉ]T[EÉ]/i.test(filename) ||
    /COMPLETE/i.test(normalized) ||
    filename.includes('✅')
  );
}

interface CompletedUS {
  id: string;
  title: string;
  file: string;
}

/**
 * Extrait l'id US (ex. US-7.1) et le titre depuis le nom de fichier (sans .md, sans marqueur complété).
 */
function parseUsFilename(filename: string): { id: string; title: string } | null {
  const base = filename.replace(/\.md$/i, '').trim();
  const match = base.match(/^(US-\d+\.\d+[a-z]?)\s*-\s*(.+)$/i);
  if (!match) return null;
  const title = match[2]
    .replace(/\s*✅\s*(COMPLÉTÉ|COMPLETÉ|COMPLETE)\s*/gi, '')
    .trim();
  return { id: match[1], title };
}

/**
 * Compte les User Stories complétées dans tous les sous-dossiers de Sprints.
 * Chaque sous-dossier = un sprint ; chaque fichier US-X.Y - Titre.md = une US.
 */
export function countCompletedUS(): { count: number; usList: CompletedUS[] } {
  const usList: CompletedUS[] = [];

  if (!fs.existsSync(SPRINTS_DIR)) {
    console.warn(`⚠️  Dossier sprints non trouvé: ${SPRINTS_DIR}`);
    return { count: 0, usList: [] };
  }

  const entries = fs.readdirSync(SPRINTS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const sprintDir = path.join(SPRINTS_DIR, entry.name);
    const files = fs.readdirSync(sprintDir);

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      if (!US_FILENAME_REGEX.test(file)) continue;

      const parsed = parseUsFilename(file);
      if (!parsed) continue;

      let completed = isCompletedInFilename(file);
      if (!completed) {
        const filePath = path.join(sprintDir, file);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          completed =
            content.includes('✅ COMPLÉTÉ') ||
            content.includes('✅ COMPLETÉ') ||
            /COMPL[EÉ]T[EÉ]/i.test(content);
        } catch {
          // ignorer les erreurs de lecture
        }
      }

      if (completed) {
        usList.push({
          id: parsed.id,
          title: parsed.title,
          file: `${entry.name}/${file}`,
        });
      }
    }
  }

  return { count: usList.length, usList };
}

/**
 * Fonction principale pour usage en ligne de commande
 */
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('count-completed-us.ts')) {
  const { count, usList } = countCompletedUS();
  console.log(`📊 User Stories complétées: ${count}`);
  if (usList.length > 0) {
    console.log('\nListe des US complétées:');
    usList.forEach(us => {
      console.log(`  - ${us.id}: ${us.title} (${us.file})`);
    });
  }
}
