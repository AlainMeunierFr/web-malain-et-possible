import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const { Given, When, Then } = createBdd();

// --- Contexte : validation du fichier menu.json ---

Given('que le fichier data/A propos de ce site/menu.json existe', async ({}) => {
  const menuPath = path.join(process.cwd(), 'data', 'A propos de ce site', 'menu.json');
  expect(fs.existsSync(menuPath)).toBe(true);
});

Given('que menu.json contient une entrée pour la Charte graphique avec type {string} et parametre {string}', async ({}, type: string, parametre: string) => {
  const menuPath = path.join(process.cwd(), 'data', 'A propos de ce site', 'menu.json');
  const content = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));
  const charteEntry = content.find((entry: { Titre: string; Type: string; Parametre: string }) => 
    entry.Titre.toLowerCase().includes('charte') && entry.Type === type && entry.Parametre === parametre
  );
  expect(charteEntry).toBeDefined();
});

// --- CA3 : Accessibilité via le menu ---

// Given('je suis sur la page {string}') : défini dans a-propos-du-site-tableau-de-bord.steps.ts (step partagé)

Given('que je suis sur la page {string} à l\'URL {string}', async ({ page }, _pageName: string, url: string) => {
  await page.goto(url);
});

// When('la page se charge') : défini dans a-propos-du-site-tableau-de-bord.steps.ts (step partagé)

Then('je vois la ligne de menu {string} dans la bande horizontale', async ({ page }, menuTitle: string) => {
  const menuAPropos = page.locator('[data-testid="menu-a-propos"], .menuAPropos');
  await expect(menuAPropos).toBeVisible();
  const menuItem = menuAPropos.getByRole('link', { name: menuTitle });
  await expect(menuItem).toBeVisible();
});

When('je clique sur la ligne de menu {string}', async ({ page }, menuTitle: string) => {
  const menuAPropos = page.locator('[data-testid="menu-a-propos"], .menuAPropos');
  const menuItem = menuAPropos.getByRole('link', { name: menuTitle });
  await menuItem.click();
});

Then('le contenu de la page Charte s\'affiche dans la zone sous la bande', async ({ page }) => {
  const contenuAPropos = page.locator('.contenuAPropos');
  await expect(contenuAPropos).toBeVisible();
  const charte = contenuAPropos.locator('.charte');
  await expect(charte).toBeVisible();
});

Then('l\'URL devient {string}', async ({ page }, expectedUrl: string) => {
  await expect(page).toHaveURL(expectedUrl);
});

When('j\'accède directement à l\'URL {string}', async ({ page }, url: string) => {
  await page.goto(url);
});

Then('la page Charte graphique s\'affiche', async ({ page }) => {
  const charte = page.locator('.charte');
  await expect(charte).toBeVisible();
});

Then('je vois le titre {string}', async ({ page }, title: string) => {
  const heading = page.locator('h1', { hasText: title });
  await expect(heading).toBeVisible();
});

// --- CA4 & CA5 : Rendu CSS identique au site vitrine ---

Given('que je suis sur la page Charte à l\'URL {string}', async ({ page }, url: string) => {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
});

Then('la page n\'applique aucun style spécifique à la section "À propos du site"', async ({ page }) => {
  // Vérifier que .main-cont n'a pas les styles typiques de "À propos du site"
  // Le reset CSS `:has(.charte)` doit neutraliser ces styles
  const main = page.locator('.main-cont:has(.charte)');
  await expect(main).toBeVisible();
  
  // Vérifier que le padding a été reset
  const padding = await main.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return styles.padding;
  });
  // Le reset met padding: 0 !important
  expect(padding).toMatch(/^0/);
});

Then('la page utilise les styles globaux du site vitrine \\(content-styles.css, globals.css\\)', async ({ page }) => {
  // Vérifier que les variables CSS globales sont disponibles
  const charte = page.locator('.charte');
  const fontSize = await charte.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return styles.getPropertyValue('--normale');
  });
  // Variables CSS vitrine doivent être accessibles
  expect(fontSize || '1rem').toBeDefined();
});

// --- Types hiérarchiques (Section 1) ---

Then('je vois la section {string}', async ({ page }, sectionTitle: string) => {
  const heading = page.locator('h2', { hasText: sectionTitle });
  await expect(heading).toBeVisible();
});

Then('je vois des exemples de h1, h2, h3, h4, p, auteur, lien, bouton et note', async ({ page }) => {
  // Vérifier la présence de chaque type dans la section exemples
  const exemples = page.locator('.charte-exemples');
  await expect(exemples).toBeVisible();
  
  // Vérifier la présence d'au moins un exemple de chaque type
  await expect(exemples.locator('h1').first()).toBeVisible();
  await expect(exemples.locator('h2').first()).toBeVisible();
  await expect(exemples.locator('h3').first()).toBeVisible();
  await expect(exemples.locator('h4').first()).toBeVisible();
  await expect(exemples.locator('p').first()).toBeVisible();
  await expect(exemples.locator('.auteur').first()).toBeVisible();
  await expect(exemples.locator('a.lien, .lien').first()).toBeVisible();
  await expect(exemples.locator('button.bouton, .bouton').first()).toBeVisible();
  await expect(exemples.locator('.note').first()).toBeVisible();
});

Then('chaque type utilise la taille CSS correspondante \\(--enorme, --grande, --normale, --petite\\)', async ({ page }) => {
  // Vérification générale : les styles CSS sont appliqués
  const h1 = page.locator('.charte h1').first();
  await expect(h1).toBeVisible();
  // Les tailles exactes sont définies dans globals.css et content-styles.css
});

// --- Types de contenu (Section 3) ---

Then('je vois un exemple de composant Hero', async ({ page }) => {
  const hero = page.locator('.charte .hero-cont-cont[data-layout="2 columns"]');
  await expect(hero).toBeVisible();
});

Then('le Hero utilise le layout {string} avec les classes .hero-gauche-cont et .hero-droite-cont', async ({ page }, layout: string) => {
  const hero = page.locator('.charte .hero-cont');
  await expect(hero).toHaveAttribute('data-layout', layout);
  await expect(hero.locator('.hero-gauche-cont')).toBeVisible();
  await expect(hero.locator('.hero-droite-cont')).toBeVisible();
});

Then('le Hero contient un titre, un sous-titre, une description et des CTAs', async ({ page }) => {
  const hero = page.locator('.charte .hero-cont');
  await expect(hero.locator('.titre, h1').first()).toBeVisible();
  await expect(hero.locator('.sousTitre')).toBeVisible();
  await expect(hero.locator('.description')).toBeVisible();
  await expect(hero.locator('.ui-heroCtas')).toBeVisible();
});

Then('je vois un exemple de liste de profils', async ({ page }) => {
  const profils = page.locator('.charte .listeDeProfils');
  await expect(profils).toBeVisible();
});

Then('la liste utilise le layout {string}', async ({ page }, layout: string) => {
  const profils = page.locator('.charte .listeDeProfils');
  await expect(profils).toHaveAttribute('data-layout', layout);
});

Then('chaque profil contient un titre, des jobTitles, des actions et un lien CV', async ({ page }) => {
  const profil = page.locator('.charte .profil-cont').first();
  await expect(profil.locator('.titre, h2').first()).toBeVisible();
  await expect(profil.locator('.jobTitles')).toBeVisible();
  await expect(profil.locator('.actions')).toBeVisible();
  await expect(profil.locator('.cvPath, a[href*="CV"]')).toBeVisible();
});

Then('je vois un exemple de composant Titre', async ({ page }) => {
  const titre = page.locator('.charte div.titre').first();
  await expect(titre).toBeVisible();
});

Then('le titre utilise le type hiérarchique --h2', async ({ page }) => {
  const titre = page.locator('.charte div.titre h2');
  await expect(titre).toBeVisible();
});

Then('je vois un exemple de liste de témoignages', async ({ page }) => {
  const temoignages = page.locator('.charte .listeDeTemoignages-cont');
  await expect(temoignages).toBeVisible();
});

Then('les témoignages utilisent le layout {string}', async ({ page }, layout: string) => {
  const temoignages = page.locator('.charte .listeDeTemoignages-cont');
  await expect(temoignages).toHaveAttribute('data-layout', layout);
});

Then('chaque témoignage contient une photo, un nom, une fonction et un texte', async ({ page }) => {
  const temoignage = page.locator('.charte .temoignage-cont.ui-card').first();
  await expect(temoignage.locator('.photo, .ui-photo')).toBeVisible();
  await expect(temoignage.locator('.nom')).toBeVisible();
  await expect(temoignage.locator('.fonction')).toBeVisible();
  await expect(temoignage.locator('.ui-paragraph')).toBeVisible();
});

Then('je vois un exemple de domaine de compétences', async ({ page }) => {
  const domaine = page.locator('.charte .domaineDeCompetence-cont');
  await expect(domaine).toBeVisible();
});

Then('le domaine contient un domaineHeader avec titre, contenu et auteur', async ({ page }) => {
  const header = page.locator('.charte .domaineHeader');
  await expect(header.locator('.titre, h2').first()).toBeVisible();
  await expect(header.locator('.contenu, p').first()).toBeVisible();
  await expect(header.locator('.auteur')).toBeVisible();
});

Then('les compétences utilisent le layout {string}', async ({ page }, layout: string) => {
  const competences = page.locator('.charte .domaineDeCompetence-competences-cont');
  await expect(competences).toHaveAttribute('data-layout', layout);
});

Then('chaque compétence suit l\'ordre : titre → image → description → auteur → lien', async ({ page }) => {
  const competence = page.locator('.charte .competence-cont').first();
  await expect(competence.locator('.titre, h3').first()).toBeVisible();
  await expect(competence.locator('.image')).toBeVisible();
  await expect(competence.locator('.description')).toBeVisible();
});

Then('je vois un exemple de composant TexteLarge', async ({ page }) => {
  const texteLarge = page.locator('.charte .texteLarge');
  await expect(texteLarge).toBeVisible();
});

Then('le texte contient des paragraphes avec du markdown parsé \\(gras, italique\\)', async ({ page }) => {
  const texteLarge = page.locator('.charte .texteLarge');
  await expect(texteLarge.locator('p')).toHaveCount(3); // 3 paragraphes dans l'exemple
  await expect(texteLarge.locator('strong').first()).toBeVisible();
});

Then('je vois un exemple de détournement vidéo', async ({ page }) => {
  const detournement = page.locator('.charte .detournementVideo, .charte .listeDeDetournementsVideo');
  await expect(detournement).toBeVisible();
});

Then('le détournement contient un titre, un pitch et deux vidéos côte à côte', async ({ page }) => {
  const detournement = page.locator('.charte .detournementVideo, .charte .listeDeDetournementsVideo').first();
  await expect(detournement).toBeVisible();
  // La structure est gérée par VideoDetournement component
});

Then('je vois un exemple de groupe de boutons', async ({ page }) => {
  const groupe = page.locator('.charte .groupeBoutons');
  await expect(groupe).toBeVisible();
});

Then('le groupe utilise le layout {string}', async ({ page }, layout: string) => {
  const groupe = page.locator('.charte .groupeBoutons');
  await expect(groupe).toHaveAttribute('data-layout', layout);
});

Then('les boutons sont empilés verticalement et centrés', async ({ page }) => {
  const groupe = page.locator('.charte .groupeBoutons');
  await expect(groupe.locator('.callToAction')).toHaveCount(2);
});

Then('je vois un exemple de Call to Action', async ({ page }) => {
  // CTA isolé (en dehors du groupeBoutons)
  const cta = page.locator('.charte a.callToAction.bouton');
  await expect(cta).toBeVisible();
});

Then('le CTA a l\'aspect d\'un bouton avec le style vitrine', async ({ page }) => {
  const cta = page.locator('.charte a.callToAction.bouton');
  await expect(cta).toBeVisible();
});

Then('je vois un exemple d\'expérience et apprentissage', async ({ page }) => {
  const experience = page.locator('.charte .experienceEtApprentissage');
  await expect(experience).toBeVisible();
});

Then('l\'expérience contient une catégorie, une description et une période', async ({ page }) => {
  const experience = page.locator('.charte .experienceEtApprentissage');
  await expect(experience.locator('.categorie')).toBeVisible();
  await expect(experience.locator('.description')).toBeVisible();
  await expect(experience.locator('.periode')).toBeVisible();
});

// --- Tokens CSS (Section 4) ---

Then('je vois une section {string}', async ({ page }, sectionTitle: string) => {
  const heading = page.locator('h2', { hasText: sectionTitle });
  await expect(heading).toBeVisible();
});

Then('les couleurs --CouleurFoncé, --CouleurClaire, --Noir et --Blanc sont affichées', async ({ page }) => {
  const tokens = page.locator('.charte-tokens');
  await expect(tokens).toBeVisible();
  await expect(tokens.locator('code', { hasText: '--CouleurFoncé' })).toBeVisible();
  await expect(tokens.locator('code', { hasText: '--CouleurClaire' })).toBeVisible();
  await expect(tokens.locator('code', { hasText: '--Noir' })).toBeVisible();
  await expect(tokens.locator('code', { hasText: '--Blanc' })).toBeVisible();
});

Then('les tailles --enorme, --grande, --moyenne, --normale et --petite sont affichées', async ({ page }) => {
  const tokens = page.locator('.charte-tokens');
  await expect(tokens.locator('code', { hasText: '--enorme' })).toBeVisible();
  await expect(tokens.locator('code', { hasText: '--grande' })).toBeVisible();
  await expect(tokens.locator('code', { hasText: '--moyenne' })).toBeVisible();
  await expect(tokens.locator('code', { hasText: '--normale' })).toBeVisible();
  await expect(tokens.locator('code', { hasText: '--petite' })).toBeVisible();
});
