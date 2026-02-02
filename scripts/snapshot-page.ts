/**
 * Capture le snapshot ARIA d'une page et l'écrit dans un fichier.
 * Utilisable sans MCP : exécuter en terminal pour comparer prod / local.
 *
 * Usage:
 *   npx tsx scripts/snapshot-page.ts [URL] [fichier_sortie]
 *
 * Exemples:
 *   npx tsx scripts/snapshot-page.ts
 *   npx tsx scripts/snapshot-page.ts http://localhost:3000 .cursor/snapshot-local.txt
 *   npx tsx scripts/snapshot-page.ts https://web-malain-et-possible.vercel.app/ .cursor/snapshot-production.txt
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_URL = 'http://localhost:3000';
const DEFAULT_OUTPUT = '.cursor/snapshot.txt';

async function main() {
  const url = process.argv[2] ?? DEFAULT_URL;
  const outputArg = process.argv[3];
  const outputPath =
    outputArg ??
    (url.includes('localhost') ? '.cursor/snapshot-local.txt' : '.cursor/snapshot-production.txt');

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const snapshot = await page.locator('body').ariaSnapshot({ timeout: 10000 });
    await browser.close();

    const dir = path.dirname(outputPath);
    if (dir !== '.' && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outputPath, snapshot, 'utf-8');
    console.log(`Snapshot écrit dans ${outputPath} (${snapshot.length} caractères)`);
  } catch (err) {
    await browser.close();
    console.error(err);
    process.exit(1);
  }
}

main();
