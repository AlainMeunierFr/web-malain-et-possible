/**
 * Steps BDD pour la feature Modal US (clic sur carte du board) — US-11.6.
 * Contexte partagé avec board-kanban : "je suis sur la page", "menu.json", "j'ai cliqué sur la ligne de menu",
 * "le contenu du container sprintEnCours s'affiche", "le board affiche au moins une carte US" dans a-propos-du-site-board-kanban.steps.ts / tableau-de-bord.steps.ts
 */

import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

const modalLocator = (page: { locator: (s: string) => { first: () => Promise<unknown> } }) =>
  page.locator('[e2eid="us-detail-modal"], [role="dialog"].usDetailModalOverlay, .usDetailModalOverlay').first();

When('je clique sur une carte du board KanBan', async ({ page }) => {
  const card = page.locator('.sprintBoardCard').first();
  await expect(card).toBeVisible({ timeout: 10000 });
  await card.click();
  await page.locator('[e2eid="us-detail-modal"], [role="dialog"]').first().waitFor({ state: 'visible', timeout: 15000 });
});

Then('une modal \\(ou overlay) s\'affiche', async ({ page }) => {
  const modal = modalLocator(page);
  await expect(modal).toBeVisible({ timeout: 10000 });
});

Then('la modal affiche l\'US correspondant à la carte cliquée', async ({ page }) => {
  const modal = modalLocator(page);
  await expect(modal).toBeVisible();
  await expect(modal.locator('.usDetailModalTitle, [id="us-detail-title"]')).toBeVisible();
  await expect(modal.locator('.usDetailModalScroll, .usDetailModalFixed')).toBeVisible();
});

Then('une modal s\'affiche', async ({ page }) => {
  const modal = modalLocator(page);
  await expect(modal).toBeVisible({ timeout: 10000 });
});

Then('en haut de la modal je vois l\'ID de l\'US en gras', async ({ page }) => {
  const modal = modalLocator(page);
  await expect(modal.locator('header strong')).toBeVisible();
  await expect(modal.locator('header strong')).toContainText(/^US-\d+\.\d+$/);
});

Then('en haut de la modal je vois le titre de l\'US correspondant à la carte cliquée', async ({ page }) => {
  const modal = modalLocator(page);
  const title = modal.locator('.usDetailModalTitle, [id="us-detail-title"]');
  await expect(title).toBeVisible();
  await expect(title).not.toHaveText(/^\s*$/);
});

Then('dans la modal je vois le bloc "En tant que" avec le rôle', async ({ page }) => {
  const modal = modalLocator(page);
  await expect(modal.getByText(/En tant que/i)).toBeVisible();
});

Then('dans la modal je vois "Je souhaite" et "Afin de" avec le bénéfice', async ({ page }) => {
  const modal = modalLocator(page);
  await expect(modal.getByText(/Je souhaite/i)).toBeVisible();
  await expect(modal.getByText(/Afin de/i)).toBeVisible();
});

Then('la modal affiche le contenu de l\'US \\(critères d\'acceptation, etc.) au format Markdown', async ({ page }) => {
  const modal = modalLocator(page);
  const content = modal.locator('.usDetailModalScroll, .usDetailModalFixed');
  await expect(content).toBeVisible();
  await expect(content).not.toHaveText(/^\s*$/);
});

Then('une zone défilable \\(ascenseur) permet de scroller ce contenu', async ({ page }) => {
  const modal = modalLocator(page);
  const scrollZone = modal.locator('.usDetailModalScroll');
  await expect(scrollZone).toBeVisible();
  await expect(scrollZone).toHaveAttribute('class', /usDetailModalScroll/);
});

Then('le titre de l\'US \\(ID et titre) reste visible en haut de la modal', async ({ page }) => {
  const modal = modalLocator(page);
  const header = modal.locator('.usDetailModalHeader, header');
  await expect(header).toBeVisible();
  await expect(header.locator('.usDetailModalTitle, h2')).toBeVisible();
});

Then('le bloc "En tant que … Je souhaite … Afin de …" reste visible en haut de la modal', async ({ page }) => {
  const modal = modalLocator(page);
  const fixed = modal.locator('.usDetailModalFixed');
  await expect(fixed).toBeVisible();
  await expect(fixed.getByText(/En tant que/i)).toBeVisible();
});

Then('seul le contenu des critères d\'acceptation \\(et le reste du Markdown) défile', async ({ page }) => {
  const modal = modalLocator(page);
  const scrollZone = modal.locator('.usDetailModalScroll');
  await expect(scrollZone).toBeVisible();
});

Then('je vois en haut à droite de la modal une icône vectorielle de case à cocher pour fermer', async ({ page }) => {
  const closeBtn = page.getByRole('button', { name: /Fermer la modal/i });
  await expect(closeBtn).toBeVisible();
  await expect(page.locator('[e2eid="us-detail-modal-close"]')).toBeVisible();
});

When('je clique sur l\'icône de fermeture \\(case à cocher) de la modal', async ({ page }) => {
  const closeBtn = page.getByRole('button', { name: /Fermer la modal/i });
  await closeBtn.click();
});

Then('la modal se ferme', async ({ page }) => {
  await expect(page.locator('[e2eid="us-detail-modal"]')).not.toBeVisible({ timeout: 5000 });
});

Then('je revois le board KanBan', async ({ page }) => {
  const board = page.locator('.sprintBoard');
  await expect(board).toBeVisible({ timeout: 5000 });
  await expect(page.locator('.sprintBoardCard').first()).toBeVisible();
});

Then('la modal occupe une grande surface de l\'écran \\(quasi plein écran ou largeur et hauteur majoritaires)', async ({ page }) => {
  const modal = page.locator('.usDetailModalOverlay [class*="usDetailModal"]');
  await expect(modal).toBeVisible();
  const box = await modal.boundingBox();
  expect(box).toBeTruthy();
  expect(box!.width).toBeGreaterThan(400);
  expect(box!.height).toBeGreaterThan(300);
});

Then('le contenu affiché dans la modal utilise la police Clint Marker', async ({ page }) => {
  const modal = modalLocator(page);
  const content = modal.locator('.usDetailModalScroll, .usDetailModalFixed');
  await expect(content).toBeVisible();
  const fontFamily = await content.evaluate((el) => window.getComputedStyle(el).fontFamily);
  expect(fontFamily).toMatch(/Clint Marker|Marker/i);
});
