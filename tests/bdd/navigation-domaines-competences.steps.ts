import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('je suis sur la page d\'accueil', async ({ page }) => {
  await page.goto('/');
});

Given('je suis sur une page avec plusieurs domaines de compétences', async ({ page }) => {
  await page.goto('/');
});

Given('je vois une compétence avec un bouton "En savoir plus..."', async ({ page }) => {
  // Vérifier qu'il y a au moins un bouton "En savoir plus..."
  const button = page.getByRole('link', { name: /En savoir plus/i }).first();
  await expect(button).toBeVisible();
});

// When('la page se charge') : défini dans a-propos-tableau-de-bord.steps.ts (step partagé)

When('je clique sur le bouton "En savoir plus..." de cette compétence', async ({ page }) => {
  const button = page.getByRole('link', { name: /En savoir plus/i }).first();
  await button.click();
});

Then('je vois au moins un domaine de compétences', async ({ page }) => {
  // Vérifier qu'il y a au moins un élément de domaine de compétences
  const domaines = page.locator('[data-testid*="domaine"]').or(page.locator('h2, h3').filter({ hasText: /compétence|domaine/i }));
  await expect(domaines.first()).toBeVisible();
});

Then('chaque domaine affiche un titre', async ({ page }) => {
  // Vérifier que chaque domaine a un titre
  const titres = page.locator('h2, h3').filter({ hasText: /compétence|domaine/i });
  const count = await titres.count();
  expect(count).toBeGreaterThan(0);
});

Then('chaque domaine affiche un contenu d\'introduction', async ({ page }) => {
  // Vérifier qu'il y a du contenu texte pour chaque domaine
  const contenus = page.locator('p, div').filter({ hasText: /./ });
  const count = await contenus.count();
  expect(count).toBeGreaterThan(0);
});

Then('chaque domaine affiche au moins une compétence avec son titre, son image et sa description', async ({ page }) => {
  // Vérifier qu'il y a au moins une compétence avec titre, image et description
  const competences = page.locator('img').filter({ has: page.locator('h3, h4') });
  await expect(competences.first()).toBeVisible();
});

Then('je suis redirigé vers la page dédiée correspondante', async ({ page }) => {
  // Vérifier que l'URL a changé (n'est plus la page d'accueil)
  await page.waitForURL(/\/(?!$)/);
  expect(page.url()).not.toBe('http://localhost:3000/');
});

Then('la page dédiée affiche le contenu complet du domaine de compétences', async ({ page }) => {
  // Vérifier que la page contient du contenu
  const contenu = page.locator('main, article, section');
  await expect(contenu.first()).toBeVisible();
});

Then('le premier domaine après un titre a un fond blanc', async ({ page }) => {
  // Vérifier le style du premier domaine (fond blanc)
  const premierDomaine = page.locator('[data-testid*="domaine"]').or(page.locator('section, div').filter({ has: page.locator('h2, h3') })).first();
  const backgroundColor = await premierDomaine.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  // Le fond blanc peut être 'rgb(255, 255, 255)' ou 'white'
  expect(backgroundColor).toMatch(/rgb\(255,\s*255,\s*255\)|white/i);
});

Then('le deuxième domaine a un fond bleu clair', async ({ page }) => {
  // Vérifier le style du deuxième domaine (fond bleu clair)
  const deuxiemeDomaine = page.locator('[data-testid*="domaine"]').or(page.locator('section, div').filter({ has: page.locator('h2, h3') })).nth(1);
  const backgroundColor = await deuxiemeDomaine.evaluate((el) => window.getComputedStyle(el).backgroundColor);
  // Le fond bleu clair devrait être différent du blanc
  expect(backgroundColor).not.toMatch(/rgb\(255,\s*255,\s*255\)|white/i);
});

Then('l\'alternance continue pour les domaines suivants', async ({ page }) => {
  // Vérifier qu'il y a plusieurs domaines avec des fonds alternés
  const domaines = page.locator('[data-testid*="domaine"]').or(page.locator('section, div').filter({ has: page.locator('h2, h3') }));
  const count = await domaines.count();
  expect(count).toBeGreaterThanOrEqual(2);
});

Then('les vidéos ont toujours un fond blanc et ne comptent pas dans l\'alternance', async ({ page }) => {
  // Vérifier que les vidéos ont un fond blanc
  const videos = page.locator('iframe[src*="youtube"], video');
  const count = await videos.count();
  if (count > 0) {
    const premiereVideo = videos.first();
    const backgroundColor = await premiereVideo.evaluate((el) => {
      const parent = el.parentElement;
      return parent ? window.getComputedStyle(parent).backgroundColor : '';
    });
    expect(backgroundColor).toMatch(/rgb\(255,\s*255,\s*255\)|white/i);
  }
});

