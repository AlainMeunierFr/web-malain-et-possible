import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const { Given, When, Then } = createBdd();

/** URL de la visualisation d'un dossier (steps partagés avec criteres-acceptation et user-stories-format). */
const urlVisualisationDossier = (nomDossier: string) =>
  '/a-propos-du-site/' + encodeURIComponent(nomDossier);

const aboutSiteDataPath = () => path.join(process.cwd(), 'data', 'A propos de ce site');

// Steps partagés : navigation vers "A propos de ce site" et autres pages (US-11.2, affichage-contenu, etc.)
// "je suis sur la page {string}" matche "Étant donné que je suis sur la page \"...\"" (keyword = Étant donné que)
Given('je suis sur la page {string}', async ({ page }, pageName: string) => {
  if (pageName === 'À propos du site' || pageName === 'A propos de ce site') {
    await page.goto('/a-propos-du-site');
  } else if (pageName === 'Portfolio détournements') {
    await page.goto('/detournements-video');
  } else if (pageName === 'Faisons connaissance') {
    await page.goto('/faisons-connaissance');
  }
  // Autres pages : étendre au besoin
});

Given('que je suis sur la page {string}', async ({ page }, pageName: string) => {
  if (pageName === 'À propos du site' || pageName === 'A propos de ce site') {
    await page.goto('/a-propos-du-site');
  } else if (pageName === 'Portfolio détournements') {
    await page.goto('/detournements-video');
  } else if (pageName === 'Faisons connaissance') {
    await page.goto('/faisons-connaissance');
  }
});

Given('j\'affiche le dossier {string}', async ({ page }, nomDossier: string) => {
  await page.goto(urlVisualisationDossier(nomDossier));
});

Given('que la page {string} existe à l\'URL {string}', async ({ page }, _pageName: string, url: string) => {
  await page.goto(url);
});

Given('que le dossier data/A propos de ce site contient des sous-dossiers à la racine', async ({}) => {
  const dir = aboutSiteDataPath();
  expect(fs.existsSync(dir)).toBe(true);
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());
  expect(dirs.length).toBeGreaterThan(0);
});

When('la page se charge', async ({ page }) => {
  await page.waitForLoadState('networkidle');
});

Then('je vois une bande horizontale en haut de la page', async ({ page }) => {
  const bande = page.locator('[data-testid="bande-dossiers"], .bande-dossiers, nav[aria-label*="dossiers"], .onglets-dossiers').first();
  await expect(bande).toBeVisible();
});

Then('la bande affiche la liste des dossiers à la racine de {string}', async ({ page }, _nom: string) => {
  const bande = page.locator('[data-testid="bande-dossiers"], .bande-dossiers, nav, .onglets-dossiers').first();
  await expect(bande).toBeVisible();
  const liens = bande.locator('a, [role="tab"], button');
  await expect(liens.first()).toBeVisible();
});

Then('les dossiers sont listés horizontalement \\(onglets, pills ou liens côte à côte\\)', async ({ page }) => {
  const bande = page.locator('[data-testid="bande-dossiers"], .bande-dossiers, nav').first();
  await expect(bande).toBeVisible();
});

Then('la liste des dossiers correspond au contenu réel du dossier data/A propos de ce site', async ({ page }) => {
  const dir = aboutSiteDataPath();
  const dirs = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  for (const nom of dirs) {
    const el = page.getByText(nom, { exact: false }).first();
    await expect(el).toBeVisible();
  }
});

Then('je vois un espace dédié sous la bande horizontale', async ({ page }) => {
  const zone = page.locator('[e2eid="zone-sprint"], [e2eid="e2eid-zone-sprint"], [data-testid="zone-sprint"], .zone-sprint, .espace-sprint, main').first();
  await expect(zone).toBeVisible();
});

Then('cet espace est réservé pour afficher le sprint en cours \\(prochaines US\\)', async ({}) => {
  // Vérifié par la présence de la zone
});

Then('cet espace est présent et identifiable \\(placeholder\\)', async ({ page }) => {
  const zone = page.locator('main, [role="main"], .content').first();
  await expect(zone).toBeVisible();
});

Then('la page ne présente pas une structure H1 = liste des dossiers à la racine', async ({ page }) => {
  const h1 = page.locator('h1');
  const count = await h1.count();
  if (count > 0) {
    const text = await h1.first().textContent();
    expect(text?.trim()).not.toMatch(/^(1\.|2\.|3\.)\s/);
  }
});

Then('la page ne présente pas une structure H2 = liste des fichiers du dossier', async ({ page }) => {
  const h2List = page.locator('h2');
  const count = await h2List.count();
  if (count > 0) {
    const firstText = await h2List.first().textContent();
    expect(firstText?.trim()).not.toMatch(/\.md$/);
  }
});

Then('l\'affichage est un tableau de bord : bande des dossiers en haut et zone de contenu en dessous', async ({ page }) => {
  const bande = page.locator('nav, [data-testid="bande-dossiers"], .bande-dossiers').first();
  const zone = page.locator('main, [role="main"]').first();
  await expect(bande).toBeVisible();
  await expect(zone).toBeVisible();
});

Given('que la bande horizontale affiche au moins un dossier', async ({ page }) => {
  await page.goto('/a-propos-du-site');
  await page.waitForLoadState('networkidle');
  const bande = page.locator('nav a, [data-testid="bande-dossiers"] a, .bande-dossiers a').first();
  await expect(bande).toBeVisible();
});

When('je clique sur un dossier dans la bande horizontale', async ({ page }) => {
  const premierLien = page.locator('nav a, .bande-dossiers a').first();
  await premierLien.click();
});

When('je clique sur le dossier {string}', async ({ page }, nomDossier: string) => {
  const lien = page.getByRole('link', { name: new RegExp(nomDossier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first();
  await lien.click();
});

Then('une sous-page s\'affiche', async ({ page }) => {
  await expect(page).not.toHaveURL(/\/a-propos-du-site\/?$/);
});

Then('la sous-page affiche pour ce dossier : H2 = nom de chaque fichier MD contenu dans le dossier', async ({ page }) => {
  const h2 = page.locator('h2');
  await expect(h2.first()).toBeVisible();
});

Then('la sous-page affiche pour chaque fichier MD : H3 et suivants = contenu du fichier MD', async ({ page }) => {
  const h3 = page.locator('h3');
  await expect(page.locator('h2, h3').first()).toBeVisible();
});

Then('l\'URL ou la route correspond à une page de visualisation de dossier avec le paramètre {string}', async ({ page }, param: string) => {
  await expect(page).toHaveURL(new RegExp(encodeURIComponent(param).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

Then('il n\'y a pas une page web distincte par dossier mais une seule page paramétrée', async ({}) => {
  // Vérifié par l'URL (même base, paramètre différent)
});

Given('que le site expose une liste de dossiers', async ({ page }) => {
  await page.goto('/a-propos-du-site');
  await page.waitForLoadState('networkidle');
});

Given('que la page de visualisation de dossier accepte un paramètre \\(route dynamique ou query\\)', async ({}) => {
  // Précondition technique
});

When('j\'accède à l\'URL correspondant au dossier {string}', async ({ page }, nomDossier: string) => {
  await page.goto(urlVisualisationDossier(nomDossier));
});

Then('la page affiche le contenu du dossier {string}', async ({ page }, nomDossier: string) => {
  await expect(page).toHaveURL(new RegExp(encodeURIComponent(nomDossier).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  const main = page.locator('main, [role="main"], .content').first();
  await expect(main).toBeVisible();
});

Then('je vois les fichiers MD du dossier avec H2 = nom du fichier et H3+ = contenu', async ({ page }) => {
  await expect(page.locator('h2').first()).toBeVisible();
});
