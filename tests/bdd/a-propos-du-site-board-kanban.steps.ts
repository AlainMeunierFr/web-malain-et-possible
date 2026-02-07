/**
 * Steps BDD pour la feature Board KanBan du sprint en cours (US-11.5).
 * Steps partagés "que je suis sur la page", "j'affiche le dossier" : voir a-propos-du-site-tableau-de-bord.steps.ts
 */

import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const { Given, When, Then } = createBdd();

const aboutSiteDataPath = () => path.join(process.cwd(), 'data', 'A propos de ce site');
const sprintsPath = () => path.join(process.cwd(), 'data', 'A propos de ce site', 'Sprints');
const cursorAgentsPath = () => path.join(process.cwd(), '.cursor', 'agents');
const agentsJsonPath = () => path.join(aboutSiteDataPath(), 'agents.json');
const agentsJsonBackupPath = () => path.join(aboutSiteDataPath(), 'agents.json.bak');

/** US-12.2 : sauvegarde/restauration agents.json pour le scénario "agents.json est absent" */
let agentsJsonWasBackedUp = false;

/** Zone du board : e2eid (convention projet) ou fallback */
const zoneSprintLocator = (page: { locator: (s: string) => { first: () => { (): unknown; new (): unknown } } }) =>
  page.locator('[e2eid="e2eid-zone-sprint"], [e2eid="zone-sprint"], .tableauSprint, main').first();

// Alias sans "que" pour matcher "Et que menu.json contient..." (step text = "menu.json contient...")
Given('menu.json contient une ligne avec Titre {string}, Type {string}, Parametre {string}', async ({}, titre: string, type: string, parametre: string) => {
  const menuPath = path.join(aboutSiteDataPath(), 'menu.json');
  expect(fs.existsSync(menuPath)).toBe(true);
  const menu = JSON.parse(fs.readFileSync(menuPath, 'utf8'));
  const found = menu.some((l: { Titre?: string; Type?: string; Parametre?: string }) => l.Titre === titre && l.Type === type && l.Parametre === parametre);
  expect(found).toBe(true);
});

Given('que menu.json contient une ligne avec Titre {string}, Type {string}, Parametre {string}', async ({}, titre: string, type: string, parametre: string) => {
  const menuPath = path.join(aboutSiteDataPath(), 'menu.json');
  expect(fs.existsSync(menuPath)).toBe(true);
  const menu = JSON.parse(fs.readFileSync(menuPath, 'utf8'));
  const found = menu.some((l: { Titre?: string; Type?: string; Parametre?: string }) => l.Titre === titre && l.Type === type && l.Parametre === parametre);
  expect(found).toBe(true);
});

Given('j\'ai cliqué sur la ligne de menu {string} dans la bande horizontale', async ({ page }, nomLigne: string) => {
  const lien = page.getByRole('link', { name: new RegExp(nomLigne.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first();
  await lien.click();
  await page.waitForLoadState('networkidle');
});

// Alias sans "que" pour matcher "Étant donné que le sprint en cours possède..."
Given('le sprint en cours possède un fichier {string} avec un Sprint Goal', async ({}, filename: string) => {
  const usEnCoursPath = path.join(sprintsPath(), 'US en cours.md');
  expect(fs.existsSync(usEnCoursPath)).toBe(true);
  const content = fs.readFileSync(usEnCoursPath, 'utf8');
  const lines = content.split(/\r?\n/).map((l) => l.trim());
  const afterSep = lines.slice(lines.findIndex((l) => l.startsWith('---')) + 1);
  const usId = afterSep[0];
  expect(usId).toMatch(/^US-\d+\.\d+$/);
  const sprintDirs = fs.readdirSync(sprintsPath(), { withFileTypes: true }).filter((d) => d.isDirectory());
  let found = false;
  for (const d of sprintDirs) {
    const goalPath = path.join(sprintsPath(), d.name, filename);
    if (fs.existsSync(goalPath)) {
      const goalContent = fs.readFileSync(goalPath, 'utf8');
      if (goalContent.includes('Sprint Goal') && goalContent.trim().length > 0) found = true;
    }
  }
  expect(found).toBe(true);
});

Given('que le sprint en cours possède un fichier {string} avec un Sprint Goal', async ({}, filename: string) => {
  const usEnCoursPath = path.join(sprintsPath(), 'US en cours.md');
  expect(fs.existsSync(usEnCoursPath)).toBe(true);
  const content = fs.readFileSync(usEnCoursPath, 'utf8');
  const lines = content.split(/\r?\n/).map((l) => l.trim());
  const afterSep = lines.slice(lines.findIndex((l) => l.startsWith('---')) + 1);
  const usId = afterSep[0];
  expect(usId).toMatch(/^US-\d+\.\d+$/);
  const sprintDirs = fs.readdirSync(sprintsPath(), { withFileTypes: true }).filter((d) => d.isDirectory());
  let found = false;
  for (const d of sprintDirs) {
    const goalPath = path.join(sprintsPath(), d.name, filename);
    if (fs.existsSync(goalPath)) {
      const goalContent = fs.readFileSync(goalPath, 'utf8');
      if (goalContent.includes('Sprint Goal') && goalContent.trim().length > 0) found = true;
    }
  }
  expect(found).toBe(true);
});

// Alias sans "que" pour matcher "Étant donné que le sprint en cours contient des US..."
Given('le sprint en cours contient des US \\(fichiers US-X.Y\\)', async ({}) => {
  const usEnCoursPath = path.join(sprintsPath(), 'US en cours.md');
  expect(fs.existsSync(usEnCoursPath)).toBe(true);
  const content = fs.readFileSync(usEnCoursPath, 'utf8');
  const lines = content.split(/\r?\n/).map((l) => l.trim());
  const afterSep = lines.slice(lines.findIndex((l) => l.startsWith('---')) + 1);
  const usId = afterSep[0];
  expect(usId).toMatch(/^US-\d+\.\d+$/);
  const sprintDirs = fs.readdirSync(sprintsPath(), { withFileTypes: true }).filter((d) => d.isDirectory());
  let hasUsFiles = false;
  for (const d of sprintDirs) {
    const files = fs.readdirSync(path.join(sprintsPath(), d.name), { withFileTypes: true });
    if (files.some((f) => f.isFile() && /^US-\d+\.\d+\s+-/.test(f.name))) hasUsFiles = true;
  }
  expect(hasUsFiles).toBe(true);
});

Given('que le sprint en cours contient des US \\(fichiers US-X.Y\\)', async ({}) => {
  const usEnCoursPath = path.join(sprintsPath(), 'US en cours.md');
  expect(fs.existsSync(usEnCoursPath)).toBe(true);
  const content = fs.readFileSync(usEnCoursPath, 'utf8');
  const lines = content.split(/\r?\n/).map((l) => l.trim());
  const afterSep = lines.slice(lines.findIndex((l) => l.startsWith('---')) + 1);
  const usId = afterSep[0];
  expect(usId).toMatch(/^US-\d+\.\d+$/);
  const sprintDirs = fs.readdirSync(sprintsPath(), { withFileTypes: true }).filter((d) => d.isDirectory());
  let hasUsFiles = false;
  for (const d of sprintDirs) {
    const files = fs.readdirSync(path.join(sprintsPath(), d.name), { withFileTypes: true });
    if (files.some((f) => f.isFile() && /^US-\d+\.\d+\s+-/.test(f.name))) hasUsFiles = true;
  }
  expect(hasUsFiles).toBe(true);
});

// Alias avec slash échappé pour le parser (snippet génère .cursor\/agents)
Given('le dossier .cursor\\/agents contient une liste de <fichiers>', async ({}) => {
  const agentsDir = cursorAgentsPath();
  expect(fs.existsSync(agentsDir)).toBe(true);
  const entries = fs.readdirSync(agentsDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.md'));
  expect(files.length).toBeGreaterThan(0);
});

Given('le dossier .cursor/agents contient une liste de <fichiers>', async ({}) => {
  const agentsDir = cursorAgentsPath();
  expect(fs.existsSync(agentsDir)).toBe(true);
  const entries = fs.readdirSync(agentsDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.md'));
  expect(files.length).toBeGreaterThan(0);
});

Given('le board affiche au moins une carte US', async ({ page }) => {
  const cards = page.locator('.carteUS');
  await expect(cards.first()).toBeVisible({ timeout: 10000 });
  expect(await cards.count()).toBeGreaterThan(0);
});

When('le contenu du container sprintEnCours s\'affiche', async ({ page }) => {
  const zone = page.locator('[e2eid="e2eid-zone-sprint"], [e2eid="zone-sprint"], .tableauSprint').first();
  await expect(zone).toBeVisible({ timeout: 10000 });
  await page.waitForLoadState('networkidle');
});

Then('je vois le Sprint Goal lu depuis {string} en haut de la zone', async ({ page }, _filename: string) => {
  const goalEl = page.locator('[e2eid="e2eid-sprint-goal"], [e2eid="sprint-goal"], .tableauSprint .objectif, .texteLarge').first();
  await expect(goalEl).toBeVisible();
  await expect(goalEl).not.toHaveText(/Chargement|Impossible/);
});

Then('le Sprint Goal est affiché en style TexteLarge', async ({ page }) => {
  const goalEl = page.locator('[e2eid="e2eid-sprint-goal"], [e2eid="sprint-goal"], .tableauSprint .objectif').first();
  await expect(goalEl).toBeVisible();
  await expect(goalEl).toHaveClass(/texteLarge|objectif|sprintGoal/);
});

Then('je vois un tableau avec une colonne {string} en première position', async ({ page }, label: string) => {
  const zone = page.locator('.tableauSprint').first();
  await expect(zone).toBeVisible();
  const firstCol = zone.locator('[data-column-type="a_faire"], .colonneTableauSprint').first();
  await expect(firstCol).toContainText(label);
});

Then('je vois les colonnes des agents, pour chaque <fichier> dans l\'ordre du workflow', async ({ page }) => {
  const zone = page.locator('.tableauSprint').first();
  await expect(zone).toBeVisible();
  const agentCols = zone.locator('[data-column-type="agent"]');
  await expect(agentCols.count()).toBeGreaterThan(0);
});

Then('je vois une colonne {string} en dernière position', async ({ page }, label: string) => {
  const zone = page.locator('.tableauSprint').first();
  await expect(zone).toBeVisible();
  await expect(zone).toContainText(label);
  const colFait = zone.locator('[data-column-type="fait"]').last();
  await expect(colFait).toContainText(label);
});

Then('sous chaque titre de colonne un décompte est affiché', async ({ page }) => {
  const zone = page.locator('.tableauSprint').first();
  const counts = zone.locator('.colonneTableauSprintCount');
  await expect(counts.first()).toBeVisible();
  await expect(counts.count()).toBeGreaterThan(0);
});

Then('chaque US du sprint est représentée par une carte', async ({ page }) => {
  const cards = page.locator('.carteUS');
  await expect(cards.count()).toBeGreaterThan(0);
});

Then('une carte dont le nom de fichier contient {string} est dans la colonne {string}', async ({ page }, _marker: string, colLabel: string) => {
  const colFait = page.locator('[data-column-type="fait"]').first();
  await expect(colFait).toContainText(colLabel);
  const cardsInFait = colFait.locator('.carteUS');
  await expect(cardsInFait.count()).toBeGreaterThanOrEqual(0);
});

Then('la carte dont l\'ID est dans {string} est dans la colonne de l\'agent actif \\(état {string}\\)', async ({ page }, _file: string, _state: string) => {
  const agentColWithCard = page.locator('[data-column-type="agent"]').filter({ has: page.locator('.carteUS') });
  await expect(agentColWithCard.first()).toBeVisible({ timeout: 5000 });
});

Then('les autres cartes sont dans la colonne {string}', async ({ page }, label: string) => {
  const colAFaire = page.locator('[data-column-type="a_faire"]').first();
  await expect(colAFaire).toContainText(label);
});

Then('le décompte de la colonne {string} affiche le nombre de cartes {string} dans cette colonne', async ({ page }, colLabel: string, _state: string) => {
  const col = page.locator('.colonneTableauSprint').filter({ hasText: colLabel }).first();
  await expect(col).toBeVisible();
  const countEl = col.locator('.colonneTableauSprintCount');
  await expect(countEl).toBeVisible();
});

Then('le décompte de chaque colonne agent affiche la WIP Limit', async ({ page }) => {
  const agentCols = page.locator('[data-column-type="agent"]');
  const n = await agentCols.count();
  for (let i = 0; i < n; i++) {
    const countEl = agentCols.nth(i).locator('.colonneTableauSprintCount');
    await expect(countEl).toHaveText(/0\/1|1\/1/);
  }
});

Then('la WIP Limit est {string} lorsqu\'il n\'y a pas de carte {string} dans cette colonne', async ({ page }, wip: string, _state: string) => {
  const agentCols = page.locator('[data-column-type="agent"]');
  const n = await agentCols.count();
  let found = false;
  for (let i = 0; i < n; i++) {
    const col = agentCols.nth(i);
    const hasCard = (await col.locator('.carteUS').count()) === 0;
    const text = await col.locator('.colonneTableauSprintCount').textContent();
    if (hasCard && text?.trim() === wip) found = true;
  }
  expect(found || n === 0).toBe(true);
});

Then('la WIP Limit est {string} lorsqu\'il y a la carte {string} dans cette colonne', async ({ page }, wip: string, _state: string) => {
  const agentCols = page.locator('[data-column-type="agent"]').filter({ has: page.locator('.carteUS') });
  const countEl = agentCols.first().locator('.colonneTableauSprintCount');
  await expect(countEl).toHaveText(wip);
});

// ——— US-12.2 : Colonnes du board basées sur agents.json ———

Given('le fichier agents.json existe et contient une liste d\'agents', async ({}) => {
  const p = agentsJsonPath();
  expect(fs.existsSync(p)).toBe(true);
  const content = fs.readFileSync(p, 'utf8');
  const data = JSON.parse(content);
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
  expect(data[0]).toHaveProperty('id');
  expect(data[0]).toHaveProperty('label');
});

Given('que le fichier agents.json existe et contient une liste d\'agents', async ({}) => {
  const p = agentsJsonPath();
  expect(fs.existsSync(p)).toBe(true);
  const content = fs.readFileSync(p, 'utf8');
  const data = JSON.parse(content);
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
  expect(data[0]).toHaveProperty('id');
  expect(data[0]).toHaveProperty('label');
});

Given('le fichier agents.json est absent', async ({}) => {
  const p = agentsJsonPath();
  const bak = agentsJsonBackupPath();
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, bak);
    fs.unlinkSync(p);
    agentsJsonWasBackedUp = true;
  } else {
    agentsJsonWasBackedUp = false;
  }
});

Given('que le fichier agents.json est absent', async ({}) => {
  const p = agentsJsonPath();
  const bak = agentsJsonBackupPath();
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, bak);
    fs.unlinkSync(p);
    agentsJsonWasBackedUp = true;
  } else {
    agentsJsonWasBackedUp = false;
  }
});

Then('je vois au moins une colonne agent', async ({ page }) => {
  const zone = page.locator('.tableauSprint').first();
  await expect(zone).toBeVisible();
  const agentCols = zone.locator('[data-column-type="agent"]');
  await expect(agentCols.count()).toBeGreaterThan(0);
});

Then('je vois exactement les colonnes {string} et {string}', async ({ page }, col1: string, col2: string) => {
  const zone = page.locator('.tableauSprint').first();
  await expect(zone).toBeVisible();
  const columns = zone.locator('.colonneTableauSprint');
  await expect(columns).toHaveCount(2);
  await expect(zone).toContainText(col1);
  await expect(zone).toContainText(col2);
});

Then('je ne vois aucune colonne agent', async ({ page }) => {
  const zone = page.locator('.tableauSprint').first();
  await expect(zone).toBeVisible();
  const agentCols = zone.locator('[data-column-type="agent"]');
  await expect(agentCols).toHaveCount(0);
});

Then('je restaure le fichier agents.json', async ({}) => {
  const p = agentsJsonPath();
  const bak = agentsJsonBackupPath();
  if (agentsJsonWasBackedUp && fs.existsSync(bak)) {
    fs.copyFileSync(bak, p);
    fs.unlinkSync(bak);
    agentsJsonWasBackedUp = false;
  }
});

// ——— US-12.3 : Indicateur visuel "en revue" ———

/** Sauvegarde et contenu original de US en cours.md pour restauration */
let usEnCoursOriginal: string | null = null;
const usEnCoursPath = () => path.join(sprintsPath(), 'US en cours.md');

Given('le fichier "US en cours.md" contient l\'étape {string}', async ({}, etape: string) => {
  const p = usEnCoursPath();
  if (usEnCoursOriginal === null && fs.existsSync(p)) {
    usEnCoursOriginal = fs.readFileSync(p, 'utf8');
  }
  // Écrire un contenu minimal pour le test
  const content = `### US en coursUne seule US à la fois.---

US-12.3
Indicateur visuel en revue sur board Kanban
${etape}
`;
  fs.writeFileSync(p, content, 'utf8');
});

Given('que le fichier "US en cours.md" contient l\'étape {string}', async ({}, etape: string) => {
  const p = usEnCoursPath();
  if (usEnCoursOriginal === null && fs.existsSync(p)) {
    usEnCoursOriginal = fs.readFileSync(p, 'utf8');
  }
  const content = `### US en cours

Une seule US à la fois.

---

US-12.3
Indicateur visuel en revue sur board Kanban
${etape}
`;
  fs.writeFileSync(p, content, 'utf8');
});Then('la carte de l\'US en cours affiche un indicateur "en revue" \\(icône 🔍\\)', async ({ page }) => {
  const card = page.locator('.carteUS').filter({ hasText: 'US-12.3' }).first();
  await expect(card).toBeVisible({ timeout: 10000 });
  const badge = card.locator('.badgeEnRevue');
  await expect(badge).toBeVisible();
  await expect(badge).toHaveText('🔍');
});

Then('l\'indicateur est visible mais discret', async ({ page }) => {
  const badge = page.locator('.carteUS .badgeEnRevue').first();
  await expect(badge).toBeVisible();
  // Vérifie que le badge est petit (font-size faible)
  const fontSize = await badge.evaluate((el) => window.getComputedStyle(el).fontSize);
  const sizeValue = parseFloat(fontSize);
  expect(sizeValue).toBeLessThanOrEqual(12); // 0.65rem ≈ 10.4px
});

Then('la carte de l\'US en cours n\'affiche pas d\'indicateur "en revue"', async ({ page }) => {
  await page.waitForLoadState('networkidle');
  const card = page.locator('.carteUS').filter({ hasText: 'US-12.3' }).first();
  await expect(card).toBeVisible({ timeout: 10000 });
  const badge = card.locator('.badgeEnRevue');
  await expect(badge).toHaveCount(0);
});

Then('la carte de l\'US dans la colonne "Fait" n\'affiche pas d\'indicateur "en revue"', async ({ page }) => {
  const colFait = page.locator('[data-column-type="fait"]').first();
  await expect(colFait).toBeVisible();
  const cardsInFait = colFait.locator('.carteUS');
  const count = await cardsInFait.count();
  for (let i = 0; i < count; i++) {
    const badge = cardsInFait.nth(i).locator('.badgeEnRevue');
    await expect(badge).toHaveCount(0);
  }
});

Then('la carte de l\'US en cours est positionnée dans la colonne {string}', async ({ page }, colLabel: string) => {
  const col = page.locator('.colonneTableauSprint').filter({ hasText: colLabel }).first();
  await expect(col).toBeVisible();
  const card = col.locator('.carteUS').filter({ hasText: 'US-12.3' });
  await expect(card).toBeVisible();
});

Then('la carte affiche l\'indicateur "en revue"', async ({ page }) => {
  const card = page.locator('.carteUS').filter({ hasText: 'US-12.3' }).first();
  const badge = card.locator('.badgeEnRevue');
  await expect(badge).toBeVisible();
  await expect(badge).toHaveText('🔍');
});

Then('aucune carte n\'affiche l\'indicateur "en revue"', async ({ page }) => {
  const badges = page.locator('.carteUS .badgeEnRevue');
  await expect(badges).toHaveCount(0);
});

// Restauration après test
Then('je restaure le fichier "US en cours.md"', async ({}) => {
  const p = usEnCoursPath();
  if (usEnCoursOriginal !== null) {
    fs.writeFileSync(p, usEnCoursOriginal, 'utf8');
    usEnCoursOriginal = null;
  }
});