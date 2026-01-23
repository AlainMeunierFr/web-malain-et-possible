import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('je suis sur n\'importe quelle page du site', async ({ page }) => {
  // Aller sur une page quelconque (par exemple la page d'accueil)
  await page.goto('/');
});

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

Then('je suis redirigé vers la page "À propos du site"', async ({ page }) => {
  await page.waitForURL(/\/about|a-propos/i);
  expect(page.url()).toMatch(/\/about|a-propos/i);
});

Then('je suis redirigé vers la page "Plan du site"', async ({ page }) => {
  await page.waitForURL(/\/sitemap|plan/i);
  expect(page.url()).toMatch(/\/sitemap|plan/i);
});

Then('je vois une liste de toutes les pages disponibles avec des boutons cliquables', async ({ page }) => {
  // Vérifier qu'il y a des boutons de navigation
  const buttons = page.getByRole('link', { name: /./ });
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
});

Then('je suis redirigé vers la page "Faisons connaissance"', async ({ page }) => {
  await page.waitForURL(/\/faisons-connaissance|contact/i);
  expect(page.url()).toMatch(/\/faisons-connaissance|contact/i);
});

Then('je vois des boutons de contact organisés en groupes', async ({ page }) => {
  // Vérifier qu'il y a des boutons de contact
  const buttons = page.getByRole('link', { name: /déjeuner|visio|téléphone|email|LinkedIn|YouTube/i });
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
});
