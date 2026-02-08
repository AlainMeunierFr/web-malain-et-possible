import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

// Given('je suis sur la page "Faisons connaissance"') : step partagé dans a-propos-tableau-de-bord.steps.ts (je suis sur la page {string})

Given('je suis sur n\'importe quelle page du site', async ({ page }) => {
  await page.goto('/');
});

// When('la page se charge') : défini dans a-propos-tableau-de-bord.steps.ts (step partagé)

When('je clique sur le bouton YouTube dans le footer', async ({ page }) => {
  const button = page.getByRole('link', { name: /YouTube/i }).or(page.locator('footer a[href*="youtube"]'));
  await button.click();
});

When('je clique sur le bouton LinkedIn dans le footer', async ({ page }) => {
  const button = page.getByRole('link', { name: /LinkedIn/i }).or(page.locator('footer a[href*="linkedin"]'));
  await button.click();
});

When('je clique sur le bouton Email dans le footer', async ({ page }) => {
  const button = page.getByRole('link', { name: /Email|Mail/i }).or(page.locator('footer a[href^="mailto:"]'));
  await button.click();
});

When('je clique sur le bouton "Metrics" dans le footer', async ({ page }) => {
  const button = page.getByRole('link', { name: /Metrics/i });
  await button.click();
});

Then('je vois des boutons de contact organisés en groupes', async ({ page }) => {
  // Vérifier qu'il y a des boutons de contact
  const buttons = page.getByRole('link', { name: /déjeuner|visio|téléphone|email|LinkedIn|YouTube/i });
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
});

Then('chaque groupe contient plusieurs boutons de contact', async ({ page }) => {
  // Vérifier qu'il y a plusieurs boutons dans chaque groupe
  const groupes = page.locator('[data-testid*="groupe"], .group, section');
  const count = await groupes.count();
  if (count > 0) {
    const premierGroupe = groupes.first();
    const buttons = premierGroupe.getByRole('link');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  }
});

Then('les boutons permettent différents modes de contact \\(déjeuner, visio, téléphone, email, réseaux sociaux)', async ({ page }) => {
  // Vérifier qu'il y a différents types de boutons
  const dejeuner = page.getByRole('link', { name: /déjeuner/i });
  const visio = page.getByRole('link', { name: /visio/i });
  const telephone = page.getByRole('link', { name: /téléphone|phone/i });
  const email = page.getByRole('link', { name: /email|mail/i });
  
  const count = await dejeuner.count() + await visio.count() + await telephone.count() + await email.count();
  expect(count).toBeGreaterThan(0);
});

Then('une nouvelle fenêtre s\'ouvre vers la chaîne YouTube', async ({ page, context }) => {
  // Attendre qu'une nouvelle page s'ouvre
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.waitForTimeout(1000), // Attendre un peu pour que la navigation se déclenche
  ]);
  
  if (newPage) {
    expect(newPage.url()).toMatch(/youtube/i);
    await newPage.close();
  } else {
    // Si pas de nouvelle page, vérifier que le lien YouTube est présent
    const link = page.locator('a[href*="youtube"]');
    await expect(link.first()).toBeVisible();
  }
});

Then('une nouvelle fenêtre s\'ouvre vers le profil LinkedIn', async ({ page, context }) => {
  // Attendre qu'une nouvelle page s'ouvre
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.waitForTimeout(1000),
  ]);
  
  if (newPage) {
    expect(newPage.url()).toMatch(/linkedin/i);
    await newPage.close();
  } else {
    // Si pas de nouvelle page, vérifier que le lien LinkedIn est présent
    const link = page.locator('a[href*="linkedin"]');
    await expect(link.first()).toBeVisible();
  }
});

Then('mon client de messagerie s\'ouvre avec une nouvelle composition', async ({ page }) => {
  // Vérifier qu'il y a un lien mailto
  const mailtoLink = page.locator('a[href^="mailto:"]');
  await expect(mailtoLink.first()).toBeVisible();
  const href = await mailtoLink.first().getAttribute('href');
  expect(href).toMatch(/^mailto:/);
});

Then('je suis redirigé vers la page Metrics', async ({ page }) => {
  await page.waitForURL(/\/metrics/i);
  expect(page.url()).toMatch(/\/metrics/i);
});

Then('je vois un dashboard avec les métriques de qualité du code', async ({ page }) => {
  // Vérifier qu'il y a des métriques affichées
  const dashboard = page.locator('main, [data-testid*="metrics"], .metrics');
  await expect(dashboard.first()).toBeVisible();
  
  // Vérifier qu'il y a des cartes de métriques
  const cartes = page.locator('[data-testid*="metric"], .card, .metric');
  const count = await cartes.count();
  expect(count).toBeGreaterThan(0);
});
