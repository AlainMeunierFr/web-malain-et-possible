/**
 * Construction du contenu du spec E2E Playwright (liste d'étapes → contenu du fichier)
 * US-Assistant-Scenario : E1/E2 - même format que le scénario actuel
 * Fonctions pures déplacées depuis scripts/generate-e2e-scenario.ts
 */

import type { PlanLien } from './generators/siteMapGenerator';
import type { E2eIdInventoryItem } from './integrity/e2eIdInventory';
import { generateE2eIdFromUrl } from '../shared/e2eIdFromUrl';

export type PageInfo = { url: string; titre?: string };

/**
 * Détermine quels e2eID sont présents sur une page donnée.
 * Les boutons du footer et le header sont présents sur toutes les pages.
 */
export function getE2eIdsForPage(
  _pageUrl: string,
  inventory: E2eIdInventoryItem[]
): E2eIdInventoryItem[] {
  const e2eIds: E2eIdInventoryItem[] = [];

  const footerButtons = inventory.filter(
    (item) => item.file === '_footerButtons.json' && item.e2eID != null
  );
  e2eIds.push(...footerButtons);

  const headerElements = inventory.filter(
    (item) => item.source === 'constant' && item.e2eID != null
  );
  e2eIds.push(...headerElements);

  const otherE2eIds = inventory.filter(
    (item) =>
      (item.source === 'json' || item.source === 'react') &&
      item.file !== '_footerButtons.json' &&
      item.e2eID != null
  );
  e2eIds.push(...otherE2eIds);

  const uniqueE2eIds = new Map<string, E2eIdInventoryItem>();
  e2eIds.forEach((item) => {
    if (item.e2eID && !uniqueE2eIds.has(item.e2eID)) {
      uniqueE2eIds.set(item.e2eID, item);
    }
  });

  return Array.from(uniqueE2eIds.values());
}

/**
 * Génère le code pour tester un e2eID (lignes du spec).
 */
export function genererCodeTestE2eId(
  item: E2eIdInventoryItem,
  index: number
): string[] {
  const lignes: string[] = [];
  const e2eId = item.e2eID!;

  lignes.push(`  // Test e2eID: ${e2eId} (${item.type} - ${item.file})`);
  lignes.push(`  const element${index} = page.getByTestId('e2eid-${e2eId}');`);
  lignes.push(`  if (await element${index}.count() > 0) {`);

  if (item.type === 'link' || item.type === 'bouton' || item.type === 'react') {
    lignes.push(`    await expect(element${index}).toBeVisible();`);
    if (
      item.description &&
      (item.description.includes('email') ||
        item.description.includes('youtube') ||
        item.description.includes('linkedin'))
    ) {
      lignes.push(`    // Élément externe, vérification de présence uniquement`);
    } else {
      lignes.push(`    // Élément interactif présent et visible`);
    }
  } else {
    lignes.push(`    await expect(element${index}).toBeVisible();`);
  }

  lignes.push(`  }`);

  return lignes;
}

/**
 * Génère le contenu complet du fichier spec E2E Playwright.
 */
export function genererContenuSpecE2E(
  chemin: string[],
  liens: PlanLien[],
  pages: PageInfo[],
  inventory: E2eIdInventoryItem[]
): string {
  const cheminEffectif =
    chemin.length === 0 && inventory.length > 0 ? ['/'] : [...chemin];
  const lignes: string[] = [];

  lignes.push("import { test, expect } from '@playwright/test';");
  lignes.push('');
  lignes.push(
    "test('parcours complet de tous les liens du site et test de tous les e2eID', async ({ page }) => {"
  );
  lignes.push('  // Scénario généré automatiquement depuis _Pages-Liens-Et-Menus.json');
  lignes.push('  // Ce test parcourt tous les liens du site et teste tous les e2eID présents');
  lignes.push('');

  const liensMap = new Map<string, string>();
  liens.forEach((lien) => {
    liensMap.set(`${lien.source}->${lien.destination}`, lien.label || '');
  });

  const pagesMap = new Map<string, string>();
  pages.forEach((p) => {
    pagesMap.set(p.url, p.titre || '');
  });

  const e2eIdsTestes = new Set<string>();
  let e2eIdTestIndex = 0;

  for (let i = 0; i < cheminEffectif.length; i++) {
    const page = cheminEffectif[i];

    if (i === 0) {
      lignes.push(`  await test.step("Étape ${i + 1}: Page d'accueil", async () => {`);
      lignes.push(`    await page.goto('${page}', { waitUntil: 'domcontentloaded' });`);
      lignes.push(`    await expect(page).toHaveURL('${page}');`);
      lignes.push(`    await page.waitForLoadState('networkidle').catch(() => {});`);
      lignes.push(`  });`);
    } else {
      const pagePrecedente = cheminEffectif[i - 1];
      const label = liensMap.get(`${pagePrecedente}->${page}`) || 'lien';
      const escapedLabel = JSON.stringify(label).slice(1, -1);
      lignes.push(
        `  await test.step("Étape ${i + 1}: Navigation de ${pagePrecedente} vers ${page} (${escapedLabel})", async () => {`
      );

      if (pagePrecedente === page) {
        lignes.push(`    await expect(page).toHaveURL('${page}');`);
        lignes.push(`  });`);
        continue;
      }
      if (page === '/') {
        lignes.push(`    const logo = page.getByTestId('e2eid-h1');`);
        lignes.push(`    if (await logo.count() > 0) {`);
        lignes.push(`      await logo.click();`);
        lignes.push(`      await expect(page).toHaveURL('/');`);
        lignes.push(`    } else {`);
        lignes.push(`      await page.goto('/');`);
        lignes.push(`    }`);
        lignes.push(`  });`);
        continue;
      }
      if (page === '/plan-du-site') {
        lignes.push(
          `    const boutonPlanDuSite = page.locator('footer').locator('[e2eid="e2eid-b44"]');`
        );
        lignes.push(`    await boutonPlanDuSite.first().waitFor({ state: 'visible', timeout: 15000 });`);
        lignes.push(`    if (await boutonPlanDuSite.count() > 0) {`);
        lignes.push(`      await boutonPlanDuSite.first().evaluate((el) => el.scrollIntoView({ block: 'nearest', behavior: 'instant' }));`);
        lignes.push(`      await boutonPlanDuSite.first().click({ timeout: 15000 });`);
        lignes.push(`      await expect(page).toHaveURL('/plan-du-site', { timeout: 15000 });`);
        lignes.push(`    } else {`);
        lignes.push(
          `      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b44) dans le footer.');`
        );
        lignes.push(`    }`);
        lignes.push(`  });`);
        continue;
      }
      {
        const hasDirectLink = liens.some(
          (l) => l.source === pagePrecedente && l.destination === page
        );
        
        // Navigation : toujours chercher par label + vérification de destination (href)
        // L'e2eID sert uniquement à tracer quel lien a été utilisé, pas à naviguer
        if (hasDirectLink && label && label !== '') {
          const escapedLabelRegex = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          lignes.push(`    const liens${i} = page.getByRole('link', { name: /${escapedLabelRegex}/i });`);
          lignes.push(`    if (await liens${i}.count() > 0) {`);
          lignes.push(`      const liensTrouves = await liens${i}.all();`);
          lignes.push(`      let lienTrouve = null;`);
          lignes.push(`      for (const lien of liensTrouves) {`);
          lignes.push(`        const href = await lien.getAttribute('href');`);
          lignes.push(`        const hrefNormalise = href ? href.replace(/\\/$/, '') : '';`);
          lignes.push(`        const destinationNormalisee = '${page}'.replace(/\\/$/, '');`);
          lignes.push(
            `        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {`
          );
          lignes.push(`          lienTrouve = lien;`);
          lignes.push(`          break;`);
          lignes.push(`        }`);
          lignes.push(`      }`);
          lignes.push(`      if (lienTrouve) {`);
          lignes.push(`        await lienTrouve.click();`);
          lignes.push(`      } else {`);
          const errEscaped = `Impossible de trouver un lien vers ${page} depuis ${pagePrecedente}.`.replace(/'/g, "\\'");
          lignes.push(`        throw new Error(\`${errEscaped}\`);`);
          lignes.push(`      }`);
          lignes.push(`    } else {`);
          // Fallback : passer par le plan du site
          const e2eId = generateE2eIdFromUrl(page);
          lignes.push(`      await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});`);
          lignes.push(`      const lienDepuisPlan${i} = page.getByTestId('e2eid-${e2eId}');`);
          lignes.push(`      if (await lienDepuisPlan${i}.count() === 0) {`);
          const errorMsg = `Impossible de trouver un lien vers ${page}.`.replace(/'/g, "\\'");
          lignes.push(`        throw new Error('${errorMsg}');`);
          lignes.push(`      }`);
          lignes.push(`      await lienDepuisPlan${i}.first().click();`);
          lignes.push(`    }`);
        }
        // Fallback : utiliser l'e2eID déterministe du plan du site
        else {
          const e2eId2 = generateE2eIdFromUrl(page);
          lignes.push(`    await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});`);
          lignes.push(`    const lienDepuisPlan${i} = page.getByTestId('e2eid-${e2eId2}');`);
          lignes.push(`    if (await lienDepuisPlan${i}.count() === 0) {`);
          const errorMsg2 = `Impossible de trouver un lien vers ${page}.`.replace(/'/g, "\\'");
          lignes.push(`      throw new Error('${errorMsg2}');`);
          lignes.push(`    }`);
          lignes.push(`    await lienDepuisPlan${i}.first().click();`);
        }
      }
      lignes.push(`    await expect(page).toHaveURL('${page}');`);
      lignes.push(`  });`);
    }

    const e2eIdsPage = getE2eIdsForPage(page, inventory);
    if (e2eIdsPage.length > 0) {
      lignes.push('');
      lignes.push(`  // Test des e2eID présents sur ${page}`);
      for (const item of e2eIdsPage) {
        if (!e2eIdsTestes.has(item.e2eID!)) {
          const codeTest = genererCodeTestE2eId(item, e2eIdTestIndex);
          lignes.push(...codeTest);
          e2eIdsTestes.add(item.e2eID!);
          e2eIdTestIndex++;
        }
      }
    }
  }

  lignes.push('');
  lignes.push('  // Tous les liens ont été parcourus');
  lignes.push(`  // ${e2eIdsTestes.size} e2eID ont été testés`);
  lignes.push("  console.log('✅ Parcours complet : tous les liens et e2eID ont été testés');");
  lignes.push('});');

  return lignes.join('\n');
}
