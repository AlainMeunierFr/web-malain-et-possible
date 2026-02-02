/**
 * Capture les snapshots prod + local et génère un diff.
 * Une seule commande : npm run snapshot:compare
 * Prérequis pour le local : lancer "npm run dev" dans un autre terminal.
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const PROD_URL = 'https://web-malain-et-possible.vercel.app/';
const LOCAL_URL = 'http://localhost:3000';
const DIR = '.cursor';
const PROD_FILE = path.join(DIR, 'snapshot-production.txt');
const LOCAL_FILE = path.join(DIR, 'snapshot-local.txt');
const DIFF_FILE = path.join(DIR, 'snapshot-diff.txt');

function ensureDir(dir: string) {
  if (dir !== '.' && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function simpleDiff(a: string, b: string): string {
  const linesA = a.split(/\r?\n/);
  const linesB = b.split(/\r?\n/);
  const out: string[] = [];
  const maxLen = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < maxLen; i++) {
    const la = linesA[i] ?? '';
    const lb = linesB[i] ?? '';
    if (la === lb) {
      out.push(`  ${la || '(vide)'}`);
    } else {
      if (la) out.push(`- ${la}`);
      if (lb) out.push(`+ ${lb}`);
      if (!la && lb) out.push(`+ ${lb}`);
    }
  }
  return out.join('\n');
}

async function captureSnapshot(url: string): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const snapshot = await page.locator('body').ariaSnapshot({ timeout: 10000 });
    await browser.close();
    return snapshot;
  } finally {
    await browser.close();
  }
}

async function main() {
  ensureDir(DIR);

  console.log('Snapshot production…');
  let prod = '';
  try {
    prod = await captureSnapshot(PROD_URL);
    fs.writeFileSync(PROD_FILE, prod, 'utf-8');
    console.log(`  → ${PROD_FILE} (${prod.length} caractères)`);
  } catch (err) {
    console.error('  Échec prod:', err);
    process.exit(1);
  }

  console.log('Snapshot local…');
  let local = '';
  try {
    local = await captureSnapshot(LOCAL_URL);
    fs.writeFileSync(LOCAL_FILE, local, 'utf-8');
    console.log(`  → ${LOCAL_FILE} (${local.length} caractères)`);
  } catch (err) {
    console.warn('  Local non disponible (démarre "npm run dev" dans un autre terminal).');
    console.warn('  Relance "npm run snapshot:compare" une fois le serveur prêt.');
  }

  if (prod && local) {
    const diff = simpleDiff(prod, local);
    fs.writeFileSync(DIFF_FILE, diff, 'utf-8');
    console.log(`Diff → ${DIFF_FILE}`);
  }

  console.log('Terminé. Pour analyser : demande à l’assistant de comparer les fichiers .cursor/snapshot-*.txt');
}

main();
