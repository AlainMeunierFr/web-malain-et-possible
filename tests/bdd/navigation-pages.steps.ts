import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

// Given('je suis sur n\'importe quelle page du site') : défini dans contact-interaction.steps.ts (step partagé)

Given('je suis sur une page avec un bouton "Faisons connaissance..."', async ({ page }) => {
  await page.goto('/');
  // Vérifier qu'il y a un bouton "Faisons connaissance..."
  const button = page.getByRole('link', { name: /Faisons connaissance/i });
  await expect(button.first()).toBeVisible();
});

When('je clique sur le logo en haut à gauche', async ({ page }) => {
  const logo = page.locator('header a[href="/"], header img').first();
  await logo.click();
});

When('je clique sur la photo en haut à droite', async ({ page }) => {
  const photo = page.locator('header img[alt*="Alain"], header a[href*="about"]').first();
  await photo.click();
});

When('je clique sur le bouton "Plan du site" dans le footer', async ({ page }) => {
  const button = page.getByRole('link', { name: /Plan du site/i });
  await button.click();
});

When('je clique sur ce bouton', async ({ page }) => {
  // Cliquer sur le bouton "Faisons connaissance..."
  const button = page.getByRole('link', { name: /Faisons connaissance/i }).first();
  await button.click();
});

Then('je suis redirigé vers la page d\'accueil', async ({ page }) => {
  await page.waitForURL('/');
  expect(page.url()).toBe('http://localhost:3000/');
});

// Step générique : nom de page (libellé) ou chemin (ex. /profil/cpo)
const pathForPageName = (name: string): string => {
  if (name.startsWith('/')) return name;
  const map: Record<string, string> = {
    'A propos': '/a-propos',
    'À propos du site': '/a-propos',
    'A propos': '/a-propos',
    'Plan du site': '/plan-du-site',
    'Faisons connaissance': '/faisons-connaissance',
    'Mes Profils': '/mes-profils',
  };
  return map[name] ?? name;
};

Then('je suis redirigé vers la page {string}', async ({ page }, nameOrPath: string) => {
  const path = pathForPageName(nameOrPath);
  const pattern = path.startsWith('/') ? new RegExp(path.replace(/\//g, '\\/')) : new RegExp(path.replace(/\//g, '\\/'), 'i');
  await page.waitForURL(pattern, { timeout: 5000 });
  expect(page.url()).toMatch(pattern);
});

Then('je vois une liste de toutes les pages disponibles avec des boutons cliquables', async ({ page }) => {
  // Vérifier qu'il y a des boutons de navigation
  const buttons = page.getByRole('link', { name: /./ });
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
});

// Then('je vois des boutons de contact organisés en groupes') : défini dans contact-interaction.steps.ts (step partagé)
