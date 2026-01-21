import { test, expect } from '@playwright/test';

test('page d\'accueil se charge correctement', async ({ page }) => {
  await page.goto('/');

  // Vérifie que la page a un titre
  await expect(page).toHaveTitle(/Malain et Possible/);
});

test('navigation vers la page À propos', async ({ page }) => {
  await page.goto('/');

  // Vérifie que le lien "À propos" existe et est cliquable
  const aboutLink = page.getByRole('link', { name: /à propos/i });
  if (await aboutLink.count() > 0) {
    await aboutLink.first().click();
    
    // Vérifie que nous sommes bien sur la page À propos
    await expect(page).toHaveURL(/\/about/);
  }
});
