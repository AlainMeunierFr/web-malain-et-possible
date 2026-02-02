/**
 * Capture une capture d'écran (viewport + full page) pour référence visuelle UI/UX.
 * Utile pour comparer la mise en page prod vs local (le snapshot ARIA ne donne pas le visuel).
 *
 * Usage:
 *   npx tsx scripts/screenshot-page.ts [URL] [répertoire_sortie]
 *
 * Exemples:
 *   npx tsx scripts/screenshot-page.ts https://web-malain-et-possible.vercel.app/ .cursor
 *   npx tsx scripts/screenshot-page.ts http://localhost:3000 .cursor
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_URL = 'http://localhost:3000';
const DEFAULT_DIR = '.cursor';
const VIEWPORT = { width: 1280, height: 720 };

async function main() {
  const url = process.argv[2] ?? DEFAULT_URL;
  const outDir = process.argv[3] ?? DEFAULT_DIR;
  const isLocal = url.includes('localhost');
  const prefix = isLocal ? 'screenshot-local' : 'screenshot-production';

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewportSize(VIEWPORT);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    const viewportPath = path.join(outDir, `${prefix}-viewport.png`);
    await page.screenshot({ path: viewportPath });
    console.log(`Viewport → ${viewportPath}`);

    const fullPath = path.join(outDir, `${prefix}-full.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Full page → ${fullPath}`);

    await browser.close();
  } catch (err) {
    await browser.close();
    console.error(err);
    process.exit(1);
  }
}

main();
