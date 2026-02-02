/**
 * Génère le fichier "Hiérarchie du site" (HIERARCHIE-SITE-ASCII.md) à partir de la spec canonique.
 * Sans IA : structure des pages (containers et propriétés) dérivée de CANONICAL_SPEC_ORDER.
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateHierarchyMarkdown } from '../utils/siteHierarchyGenerator';

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(ROOT, 'HIERARCHIE-SITE-ASCII.md');

const markdown = generateHierarchyMarkdown();
fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');

console.log('✅ Fichier généré : HIERARCHIE-SITE-ASCII.md');
console.log('   Source : constants/canonicalSpec.ts (CANONICAL_SPEC_ORDER)');
