/**
 * TI : Génère les fichiers .spec.ts Playwright dans tests/end-to-end/
 * à partir des pages et liens détectés par le plan du site (API métier).
 *
 * - Récupère toutes les pages et liens (dont menus) via detecterPages / detecterLiensInternes.
 * - Pour chaque page : un scénario (fichier .spec.ts) avec un test par lien sortant.
 * - Valide le format des e2eID (lettre + chiffres) ; en cas d'invalide, lance le script de mapping puis le TU e2e-ids-detection.
 * - Chaque test : aller sur la page → suivre le lien (sauf origine = destination) → retour arrière → lien suivant.
 */

import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { detecterPages, detecterLiensInternes } from '../../utils/backoffice';
import type { PlanPage, PlanLien } from '../../utils/backoffice';
import { clearMappingCache } from '../../utils/shared/e2eIdMapping';

const E2E_DIR = path.join(process.cwd(), 'tests', 'end-to-end');
/** Format attendu : une lettre + un ou plusieurs chiffres (ex. h1, b13, c21). */
const E2EID_FORMAT = /^[a-zA-Z][0-9]+$/;

function slugFromUrl(url: string): string {
  if (url === '/') return 'accueil';
  return url.slice(1).replace(/\//g, '-');
}

function escapeForRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateSpecContent(page: PlanPage, links: PlanLien[]): string {
  const lines: string[] = [
    "import { test, expect } from '@playwright/test';",
    '',
    `test.describe('Navigation depuis ${page.url}', () => {`,
  ];
  for (const link of links) {
    // Échappement pour regex dans le fichier généré (backslashes doublés pour la chaîne JS)
    const destPath = link.destination.replace(/^\//, '') || '';
    const destRegex = '\\\\/' + destPath.replace(/\//g, '\\\\/') + '(?:\\\\?.*)?$';
    const sourcePath = page.url.replace(/^\//, '') || '';
    const sourceRegex = sourcePath === '' ? '\\\\/?(?:\\\\?.*)?$' : '\\\\/' + sourcePath.replace(/\//g, '\\\\/') + '(?:\\\\?.*)?$';
    lines.push(`  test('vers ${link.destination} (${link.label || link.e2eID})', async ({ page }) => {`);
    lines.push(`    await page.goto('${page.url}');`);
    lines.push(`    await page.getByTestId('e2eid-${link.e2eID}').click();`);
    lines.push(`    await expect(page).toHaveURL(new RegExp('${destRegex}'));`);
    lines.push(`    await page.goBack();`);
    lines.push(`    await expect(page).toHaveURL(new RegExp('${sourceRegex}'));`);
    lines.push('  });');
    lines.push('');
  }
  lines.push('});');
  lines.push('');
  return lines.join('\n');
}

describe('Génération des specs E2E (tests/end-to-end)', () => {
  it('génère un fichier .spec.ts par page avec les scénarios de navigation (lien puis retour arrière)', () => {
    const pages = detecterPages();
    const liens = detecterLiensInternes();

    // Liens à tester : origine !== destination, et e2eID obligatoire
    const filtreTestable = (l: PlanLien) =>
      l.source !== l.destination && l.e2eID != null && l.e2eID.trim() !== '';
    let liensPourSpecs = liens.filter(filtreTestable);

    // Validation format e2eID : lettre + chiffres ; si invalide, tenter régénération puis lancer le TU
    let invalides = liensPourSpecs.filter((l) => !E2EID_FORMAT.test(l.e2eID!));
    if (invalides.length > 0) {
      try {
        child_process.execSync('npx tsx scripts/generate-e2e-mapping.ts', {
          cwd: process.cwd(),
          stdio: 'pipe',
          encoding: 'utf-8',
        });
        clearMappingCache();
        const liensApres = detecterLiensInternes();
        liensPourSpecs = liensApres.filter(filtreTestable);
        invalides = liensPourSpecs.filter((l) => !E2EID_FORMAT.test(l.e2eID!));
      } catch {
        // Script en erreur (ex. tsx absent) ; on lance le TU puis on échoue
      }
      if (invalides.length > 0) {
        try {
          child_process.execSync('npx jest e2e-ids-detection --runInBand --no-cache', {
            cwd: process.cwd(),
            stdio: 'inherit',
            encoding: 'utf-8',
          });
        } catch {
          // Le TU a échoué ; on enchaîne avec l'erreur du TI
        }
        const exemples = invalides.slice(0, 5).map((l) => `  ${l.e2eID} (${l.source} → ${l.destination})`).join('\n');
        throw new Error(
          `${invalides.length} lien(s) ont un e2eID ne respectant pas le format "lettre + chiffres" (ex. h1, b13).\n` +
            `Exemples :\n${exemples}\n\n` +
            `Le TU e2e-ids-detection a été lancé (voir sortie ci-dessus). Corriger les e2eID puis relancer.`
        );
      }
    }

    if (!fs.existsSync(E2E_DIR)) {
      fs.mkdirSync(E2E_DIR, { recursive: true });
    }

    let filesWritten = 0;

    for (const page of pages) {
      const linksFromPage = liensPourSpecs.filter((l) => l.source === page.url);
      if (linksFromPage.length === 0) continue;

      const slug = slugFromUrl(page.url);
      const filename = `page-${slug}.spec.ts`;
      const filePath = path.join(E2E_DIR, filename);
      const content = generateSpecContent(page, linksFromPage);
      fs.writeFileSync(filePath, content, 'utf-8');
      filesWritten += 1;
    }

    expect(filesWritten).toBeGreaterThan(0);
  });
});
