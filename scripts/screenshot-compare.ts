/**
 * Capture les screenshots prod + local pour plusieurs pages en une commande.
 * Pour la mise en page UI/UX : compare visuellement les PNG générés.
 *
 * Usage: npm run screenshot:compare
 * Prérequis local : lancer "npm run dev" dans un autre terminal.
 */

import { chromium, type Browser } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const PROD_BASE = 'https://web-malain-et-possible.vercel.app';
const LOCAL_BASE = 'http://localhost:3000';
const DIR = '.cursor';
const VIEWPORT = { width: 1280, height: 720 };

/** Chemins à capturer pour avoir une vision d'ensemble (home, mes-profils, profil). */
const PAGE_PATHS: { path: string; slug: string }[] = [
  { path: '/', slug: 'home' },
  { path: '/mes-profils', slug: 'mes-profils' },
  { path: '/profil/cpo', slug: 'profil-cpo' },
];

function pathToUrl(base: string, p: string): string {
  return p === '/' ? `${base}/` : `${base}${p}`;
}

async function captureScreenshot(
  url: string,
  filePrefix: string,
  browser: Browser
) {
  const page = await browser.newPage();
  await page.setViewportSize(VIEWPORT);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  const viewportPath = path.join(DIR, `${filePrefix}-viewport.png`);
  await page.screenshot({ path: viewportPath });
  const fullPath = path.join(DIR, `${filePrefix}-full.png`);
  await page.screenshot({ path: fullPath, fullPage: true });
  await page.close();
  return { viewportPath, fullPath };
}

async function main() {
  if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  let localFailed = false;

  try {
    for (const { path: pagePath, slug } of PAGE_PATHS) {
      const prodUrl = pathToUrl(PROD_BASE, pagePath);
      const localUrl = pathToUrl(LOCAL_BASE, pagePath);

      console.log(`\n--- ${pagePath} (${slug}) ---`);

      console.log('  Production…');
      try {
        const prod = await captureScreenshot(
          prodUrl,
          `screenshot-production-${slug}`,
          browser
        );
        console.log(`    → ${prod.viewportPath}`);
        console.log(`    → ${prod.fullPath}`);
      } catch (err) {
        console.error('  Échec prod:', err);
        process.exit(1);
      }

      console.log('  Local…');
      try {
        const local = await captureScreenshot(
          localUrl,
          `screenshot-local-${slug}`,
          browser
        );
        console.log(`    → ${local.viewportPath}`);
        console.log(`    → ${local.fullPath}`);
      } catch (err) {
        console.warn('  Local non disponible (démarre "npm run dev" dans un autre terminal).');
        localFailed = true;
      }
    }
  } finally {
    await browser.close();
  }

  if (localFailed) {
    console.warn('\nRelance "npm run screenshot:compare" une fois le serveur local prêt.');
  }
  console.log('\nTerminé. Compare visuellement les PNG dans .cursor/ (prod vs local par page).');
  console.log('Pour aligner le CSS : ouvre les images et indique à l’assistant les écarts à corriger.');
}

main();
