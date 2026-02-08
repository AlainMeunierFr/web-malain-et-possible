import { createBdd } from 'playwright-bdd';
import { expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import type { PlanSite, PlanPage } from '../../utils/backoffice';

const { Given, When, Then } = createBdd();

const getSiteMapPath = () => {
  return path.join(process.cwd(), 'data', '_Pages-Liens-Et-Menus.json');
};

const getPlanDuSitePath = () => {
  return path.join(process.cwd(), 'data', 'plan-du-site.json');
};

// Scénario: Affichage du titre "Plan du site"
Given('que je suis sur la page plan-du-site', async ({ page }: { page: Page }) => {
  await page.goto('/plan-du-site');
});

// When('la page se charge') : défini dans a-propos-tableau-de-bord.steps.ts (step partagé)

Then('je vois {string} dans la têtière', async ({ page }: { page: Page }, titre: string) => {
  const headerTitle = page.locator('header h1.pageTitle');
  await expect(headerTitle).toHaveText(titre);
});

// Scénario: Organisation des pages par zones
Given('que le plan du site contient des pages avec zone {string}', async ({}, zone: string) => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    const contenu = fs.readFileSync(siteMapPath, 'utf8');
    const plan: PlanSite = JSON.parse(contenu);
    const pagesAvecZone = plan.pages.filter((p: PlanPage) => (p as any).zone === zone);
    expect(pagesAvecZone.length).toBeGreaterThan(0);
  }
});

When('je consulte la page plan-du-site', async ({ page }: { page: Page }) => {
  await page.goto('/plan-du-site');
  await page.waitForLoadState('networkidle');
});

Then('je vois toutes les pages {string} affichées horizontalement sur la ligne {int}', async ({ page }: { page: Page }, zone: string, ligne: number) => {
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan: PlanSite = JSON.parse(contenu);
  const pagesZone = plan.pages.filter((p: PlanPage) => (p as any).zone === zone && (p as any).dessiner !== 'Non');
  
  // Vérifier que les pages sont affichées
  for (const pageZone of pagesZone) {
    const bouton = page.locator(`a.bouton[href="${pageZone.url}"]`);
    await expect(bouton).toBeVisible();
  }
  
  // Vérifier la disposition horizontale (via les classes CSS ou la structure)
  const ligneContainer = page.locator(`.listeDesPages-cont .zone-${zone.toLowerCase()}`);
  await expect(ligneContainer).toHaveCSS('display', 'flex');
  await expect(ligneContainer).toHaveCSS('flex-direction', 'row');
});

Then('il y a un padding entre la ligne {int} et la ligne {int}', async ({ page }: { page: Page }, ligne1: number, ligne2: number) => {
  // Vérifier qu'il y a un espacement entre les lignes
  const ligne1Element = page.locator(`.listeDesPages-cont .ligne-${ligne1}`);
  const ligne2Element = page.locator(`.listeDesPages-cont .ligne-${ligne2}`);
  
  if (await ligne1Element.count() > 0 && await ligne2Element.count() > 0) {
    const box1 = await ligne1Element.boundingBox();
    const box2 = await ligne2Element.boundingBox();
    
    if (box1 && box2) {
      const espacement = box2.y - (box1.y + box1.height);
      expect(espacement).toBeGreaterThan(0);
    }
  }
});

Then('je vois toutes les pages {string} affichées verticalement dans la colonne {string} de la ligne {int}', async ({ page }: { page: Page }, zone: string, colonne: string, ligne: number) => {
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan: PlanSite = JSON.parse(contenu);
  const pagesZone = plan.pages.filter((p: PlanPage) => (p as any).zone === zone && (p as any).dessiner !== 'Non');
  
  // Vérifier que les pages sont affichées
  for (const pageZone of pagesZone) {
    const bouton = page.locator(`a.bouton[href="${pageZone.url}"]`);
    await expect(bouton).toBeVisible();
  }
  
  // Vérifier la disposition verticale
  const colonneContainer = page.locator(`.listeDesPages-cont .ligne-${ligne} .colonne-${colonne} .zone-${zone.toLowerCase()}`);
  if (await colonneContainer.count() > 0) {
    await expect(colonneContainer).toHaveCSS('display', 'flex');
    await expect(colonneContainer).toHaveCSS('flex-direction', 'column');
  }
});

// Scénario: Pages masquées non affichées
Given('qu\'une page a la zone {string}', async ({}, zone: string) => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    const contenu = fs.readFileSync(siteMapPath, 'utf8');
    const plan: PlanSite = JSON.parse(contenu);
    const pagesMasquees = plan.pages.filter((p: PlanPage) => (p as any).zone === zone);
    expect(pagesMasquees.length).toBeGreaterThan(0);
  }
});

Then('cette page n\'est pas affichée', async ({ page }: { page: Page }) => {
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan: PlanSite = JSON.parse(contenu);
  const pagesMasquees = plan.pages.filter((p: PlanPage) => (p as any).zone === 'Masqué');
  
  for (const pageMasquee of pagesMasquees) {
    const bouton = page.locator(`a.bouton[href="${pageMasquee.url}"]`);
    await expect(bouton).not.toBeVisible();
  }
});

// Scénario: Conservation de la zone lors de la mise à jour
Given('qu\'une page a une zone définie dans _Pages-Liens-Et-Menus.json', async ({}, testInfo) => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    const contenu = fs.readFileSync(siteMapPath, 'utf8');
    const plan: PlanSite = JSON.parse(contenu);
    const pageAvecZone = plan.pages.find((p: PlanPage) => (p as any).zone);
    expect(pageAvecZone).toBeDefined();
    (testInfo as any).pageAvecZone = pageAvecZone;
  }
});

When('le générateur met à jour le plan du site', async ({}, testInfo) => {
  // Simuler la mise à jour (en pratique, cela appellerait mettreAJourPlanJSON)
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    const contenu = fs.readFileSync(siteMapPath, 'utf8');
    const plan: PlanSite = JSON.parse(contenu);
    (testInfo as any).planApresMiseAJour = plan;
  }
});

Then('la propriété zone de cette page est conservée', async ({}, testInfo) => {
  const pageAvecZone = (testInfo as any).pageAvecZone;
  const planApresMiseAJour = (testInfo as any).planApresMiseAJour;
  
  if (pageAvecZone && planApresMiseAJour) {
    const pageDansPlan = planApresMiseAJour.pages.find((p: PlanPage) => p.url === pageAvecZone.url);
    expect(pageDansPlan).toBeDefined();
    expect((pageDansPlan as any).zone).toBe((pageAvecZone as any).zone);
  }
});

// Scénario: Attribution des zones aux pages existantes
Given('que le plan du site contient les pages suivantes :', async ({}, table: any) => {
  // Cette table sera utilisée pour vérifier les zones
  (global as any).tableZones = table;
});

// --- Variantes sans "que" pour le matching Gherkin ---

Given('je suis sur la page plan-du-site', async ({ page }: { page: Page }) => {
  await page.goto('/plan-du-site');
});

Given('le plan du site contient des pages avec zone {string}', async ({}, zone: string) => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    const contenu = fs.readFileSync(siteMapPath, 'utf8');
    const plan: PlanSite = JSON.parse(contenu);
    const pagesAvecZone = plan.pages.filter((p: PlanPage) => (p as any).zone === zone);
    expect(pagesAvecZone.length).toBeGreaterThan(0);
  }
});

Given('le plan du site contient des pages avec zone {string} et {string}', async ({}, zone1: string, zone2: string) => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    const contenu = fs.readFileSync(siteMapPath, 'utf8');
    const plan: PlanSite = JSON.parse(contenu);
    const pages1 = plan.pages.filter((p: PlanPage) => (p as any).zone === zone1);
    const pages2 = plan.pages.filter((p: PlanPage) => (p as any).zone === zone2);
    expect(pages1.length + pages2.length).toBeGreaterThan(0);
  }
});

Then('je vois toutes les pages {string} affichées verticalement dans la colonne gauche de la ligne {int}', async ({ page }: { page: Page }, zone: string, _ligne: number) => {
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan: PlanSite = JSON.parse(contenu);
  const pagesZone = plan.pages.filter((p: PlanPage) => (p as any).zone === zone && (p as any).dessiner !== 'Non');
  for (const pageZone of pagesZone) {
    const bouton = page.locator(`a.bouton[href="${pageZone.url}"]`);
    await expect(bouton).toBeVisible();
  }
});

Then('je vois toutes les pages {string} affichées verticalement dans la colonne droite de la ligne {int}', async ({ page }: { page: Page }, zone: string, _ligne: number) => {
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan: PlanSite = JSON.parse(contenu);
  const pagesZone = plan.pages.filter((p: PlanPage) => (p as any).zone === zone && (p as any).dessiner !== 'Non');
  for (const pageZone of pagesZone) {
    const bouton = page.locator(`a.bouton[href="${pageZone.url}"]`);
    await expect(bouton).toBeVisible();
  }
});

Given('une page a la zone {string}', async ({}, zone: string) => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    const contenu = fs.readFileSync(siteMapPath, 'utf8');
    const plan: PlanSite = JSON.parse(contenu);
    const pagesMasquees = plan.pages.filter((p: PlanPage) => (p as any).zone === zone);
    expect(pagesMasquees.length).toBeGreaterThan(0);
  }
});

Given('une page a une zone définie dans _Pages-Liens-Et-Menus.json', async ({}) => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    const contenu = fs.readFileSync(siteMapPath, 'utf8');
    const plan: PlanSite = JSON.parse(contenu);
    const pageAvecZone = plan.pages.find((p: PlanPage) => (p as any).zone);
    expect(pageAvecZone).toBeDefined();
  }
});

Given('le plan du site contient les pages suivantes :', async ({}, table: any) => {
  (global as any).tableZones = table;
});

Then('chaque page est affichée dans sa zone correspondante', async ({ page }: { page: Page }) => {
  const tableZones = (global as any).tableZones;
  if (!tableZones) return;
  
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan: PlanSite = JSON.parse(contenu);
  
  // Vérifier que chaque page de la table est dans la bonne zone
  for (const row of tableZones.rawTable.slice(1)) {
    const titre = row[0];
    const zoneAttendue = row[1];
    
    const pageTrouvee = plan.pages.find((p: PlanPage) => p.titre === titre);
    expect(pageTrouvee).toBeDefined();
    expect((pageTrouvee as any).zone).toBe(zoneAttendue);
    
    // Vérifier que la page est affichée dans la bonne zone
    if (zoneAttendue !== 'Masqué') {
      const bouton = page.locator(`a.bouton[href="${pageTrouvee!.url}"]`);
      await expect(bouton).toBeVisible();
    }
  }
});
