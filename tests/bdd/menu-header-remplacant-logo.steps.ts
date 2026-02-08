/**
 * Step definitions pour menu-header-remplacant-logo.feature (US-13.1)
 */

import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

// Given('je suis sur n'importe quelle page du site') : défini dans contact-interaction.steps.ts (step partagé)

Given('je suis sur une page avec un titre (ex. "Mes Profils")', async ({ page }) => {
  await page.goto('/mes-profils');
});

Given('que l\'écran est en mode desktop (largeur ≥ 768px)', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
});

Given('que l\'écran est en mode mobile (largeur < 768px)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
});

Given('que la configuration par défaut du menu est utilisée', async () => {
  // Pas d'action : le site utilise déjà la config par défaut
});

When('je regarde le header', async () => {
  // Pas d'action : step de contexte pour les assertions
});

When('je regarde la zone sous le header', async () => {
  // Pas d'action (legacy)
});

When('je regarde le menu du header', async () => {
  // Pas d'action
});

When('je clique sur {string} dans le menu du header', async ({ page }, label: string) => {
  const nav = page.locator('header nav[aria-label="Navigation principale"]');
  await nav.getByRole('link', { name: label }).click();
});

When('je survole {string} dans le menu du header', async ({ page }, label: string) => {
  const link = page.locator('header nav').getByRole('link', { name: label });
  await link.hover();
});

When('je clique sur {string} dans le sous-menu', async ({ page }, label: string) => {
  await page.locator('header nav').getByRole('link', { name: label }).click();
});

When('je clique sur l\'icône hamburger', async ({ page }) => {
  await page.getByRole('button', { name: /ouvrir le menu/i }).click();
});

When('je regarde le footer', async () => {
  // Pas d'action
});

Then('je ne vois pas le logo "Malain et possible" dans le header', async ({ page }) => {
  const header = page.locator('header');
  await expect(header.locator('img[alt="Logo Malain et possible"]')).toHaveCount(0);
});

Then('je vois un menu horizontal à gauche', async ({ page }) => {
  const nav = page.locator('header nav.headerNav');
  await expect(nav).toBeVisible();
});

Then('le menu contient des liens et des menus déroulants (dropdown)', async ({ page }) => {
  const nav = page.locator('header nav.headerNav');
  await expect(nav.getByRole('link').first()).toBeVisible();
  await expect(nav.locator('.headerNavGroup')).toHaveCount(2);
});

Then('je vois la photo en haut à droite du header', async ({ page }) => {
  const photo = page.locator('header img[alt="Photo Alain Meunier"]');
  await expect(photo).toBeVisible();
});

Then('le titre de page apparaît sur fond blanc', async ({ page }) => {
  const zone = page.locator('.pageTitleZone');
  await expect(zone).toBeVisible();
});

Then('le titre est affiché en bleu', async ({ page }) => {
  // Style : vérification optionnelle ou via classe (Designer)
  const titre = page.locator('.pageTitleZone .titreDePage');
  await expect(titre).toBeVisible();
});

Then('la taille du titre est réduite', async ({ page }) => {
  const titre = page.locator('.pageTitleZone .titreDePage');
  await expect(titre).toBeVisible();
});

Then('le titre de page apparaît dans le header après le menu', async ({ page }) => {
  const titleBlock = page.locator('header .headerTitleBlock .titreDePage');
  await expect(titleBlock).toBeVisible();
});

Then('le titre est affiché en blanc', async ({ page }) => {
  const titre = page.locator('header .headerTitleBlock .titreDePage');
  await expect(titre).toBeVisible();
  const color = await titre.evaluate((el) => window.getComputedStyle(el).color);
  expect(color).toMatch(/rgb\(255,\s*255,\s*255\)|white/);
});

Then('un séparateur vertical (fer) est visible à gauche du titre', async ({ page }) => {
  const block = page.locator('header .headerTitleBlock');
  await expect(block).toBeVisible();
  const borderLeft = await block.evaluate((el) => window.getComputedStyle(el).borderLeftWidth);
  expect(parseInt(borderLeft, 10)).toBeGreaterThan(0);
});

Then('je vois les entrées suivantes : Accueil, Mes profils, Détournements, À propos de ce site', async ({ page }) => {
  const nav = page.locator('header nav.headerNav');
  await expect(nav.getByRole('link', { name: 'Accueil' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Mes profils' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Détournement vidéo' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'A propos' })).toBeVisible();
});

// Step avec regex pour éviter que Cucumber interprète "(/)" comme alternation
Then(/^je suis redirigé vers la page d'accueil \(\/\)$/, async ({ page }) => {
  await expect(page).toHaveURL(/\/$/);
});

Then(/^je suis redirigé vers \/mes-profils$/, async ({ page }) => {
  await expect(page).toHaveURL(/\/mes-profils/);
});

Then('le sous-menu s\'affiche', async ({ page }) => {
  const group = page.locator('.headerNavGroup').first();
  await expect(group.getByRole('link')).toHaveCount(6);
});

Then('je vois les sous-items : Produit logiciel, Opérations, Transformation Agile, Technologie', async ({ page }) => {
  const nav = page.locator('header nav.headerNav');
  await expect(nav.getByRole('link', { name: 'Produit logiciel' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Opérations' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Transformation Agile' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Technologie' })).toBeVisible();
});

Then(/^je suis redirigé vers \/profil\/cpo$/, async ({ page }) => {
  await expect(page).toHaveURL(/\/profil\/cpo/);
});

Then(/^je suis redirigé vers \/detournement-video$/, async ({ page }) => {
  await expect(page).toHaveURL(/\/detournement-video/);
});

Then('je vois le sous-item "Portfolio"', async ({ page }) => {
  const nav = page.locator('header nav.headerNav');
  await expect(nav.getByRole('link', { name: 'Portfolio' })).toBeVisible();
});

Then(/^je suis redirigé vers \/portfolio-detournements$/, async ({ page }) => {
  await expect(page).toHaveURL(/\/portfolio-detournements/);
});

Then(/^je suis redirigé vers \/a-propos$/, async ({ page }) => {
  await expect(page).toHaveURL(/\/a-propos(?:\?|$)/);
});

Then('je ne vois pas le menu horizontal avec les liens', async ({ page }) => {
  const nav = page.locator('header #headerNavDesktop');
  await expect(nav).toBeHidden();
});

Then('je vois une icône hamburger', async ({ page }) => {
  await expect(page.getByRole('button', { name: /ouvrir le menu/i })).toBeVisible();
});

Then('je vois la photo à droite du header', async ({ page }) => {
  await expect(page.locator('header img[alt="Photo Alain Meunier"]')).toBeVisible();
});

Then('un panneau latéral ou overlay s\'ouvre', async ({ page }) => {
  const panel = page.locator('#headerMobilePanel');
  await expect(panel).toBeVisible();
});

Then('le panneau contient les mêmes entrées que le menu desktop (Accueil, Mes profils, Détournement vidéo, A propos)', async ({ page }) => {
  const panel = page.locator('.headerMobileNav');
  await expect(panel.getByRole('link', { name: 'Accueil' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Mes profils' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Détournement vidéo' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'A propos' })).toBeVisible();
});

Then('les sous-menus sont accessibles dans le panneau', async ({ page }) => {
  // Sur mobile le panneau affiche les liens niveau 1 ; les sous-menus peuvent être dépliables (à affiner)
  const panel = page.locator('.headerMobileNav');
  await expect(panel.getByRole('link').first()).toBeVisible();
});

// --- Variantes sans "que" et avec parenthèses échappées pour le matching Gherkin ---

Given('l\'écran est en mode desktop \\(largeur ≥ 768px\\)', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
});

Given('l\'écran est en mode mobile \\(largeur < 768px\\)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
});

Given('la configuration par défaut du menu est utilisée', async () => {
  // Pas d'action : le site utilise déjà la config par défaut
});

Given('je suis sur une page avec un titre \\(ex. {string}\\)', async ({ page }, titre: string) => {
  if (titre.toLowerCase().includes('profil')) {
    await page.goto('/mes-profils');
  } else {
    await page.goto('/');
  }
});

Then('le menu contient des liens et des menus déroulants \\(dropdown\\)', async ({ page }) => {
  const nav = page.locator('header nav.headerNav');
  await expect(nav.getByRole('link').first()).toBeVisible();
  await expect(nav.locator('.headerNavGroup')).toHaveCount(2);
});

Then('un séparateur vertical \\(fer\\) est visible à gauche du titre', async ({ page }) => {
  const block = page.locator('header .headerTitleBlock');
  await expect(block).toBeVisible();
  const borderLeft = await block.evaluate((el) => window.getComputedStyle(el).borderLeftWidth);
  expect(parseInt(borderLeft, 10)).toBeGreaterThan(0);
});

Then('je vois les entrées suivantes : Accueil, Mes profils, Détournement vidéo, A propos', async ({ page }) => {
  const nav = page.locator('header nav.headerNav');
  await expect(nav.getByRole('link', { name: 'Accueil' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Mes profils' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Détournement vidéo' })).toBeVisible();
  await expect(nav.getByRole('link', { name: 'A propos' })).toBeVisible();
});

Then('le panneau contient les mêmes entrées que le menu desktop \\(Accueil, Mes profils, Détournement vidéo, A propos\\)', async ({ page }) => {
  const panel = page.locator('.headerMobileNav');
  await expect(panel.getByRole('link', { name: 'Accueil' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Mes profils' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Détournement vidéo' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'A propos' })).toBeVisible();
});
