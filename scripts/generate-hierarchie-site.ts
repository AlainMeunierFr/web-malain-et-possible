/**
 * Génère le fichier "Hiérarchie du site" dans Documentation technique.
 * Sans IA : structure des pages (containers et propriétés) dérivée de CANONICAL_SPEC_ORDER.
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateHierarchyMarkdown } from '../utils/siteHierarchyGenerator';

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'data', 'A propos de ce site', 'Documentation technique');
const OUTPUT_FILE = path.join(OUTPUT_DIR, '2. Hierarchie du site.md');

// Créer le dossier si nécessaire
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const markdown = generateHierarchyMarkdown();
fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');

console.log('✅ Fichier généré : data/A propos de ce site/Documentation technique/2. Hierarchie du site.md');
console.log('   Source : constants/canonicalSpec.ts (CANONICAL_SPEC_ORDER)');
