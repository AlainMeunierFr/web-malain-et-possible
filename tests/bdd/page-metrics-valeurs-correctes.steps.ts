/**
 * Steps BDD pour la page Metrics - US-12.1
 * Affichage des valeurs correctes (Type Coverage, Score Lighthouse, métriques NC sans valeur inventée).
 */

import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { buildMetricsSnapshot, buildMetricsHistory } from '../../utils/metricsSnapshotBuilder';

const { Given, When, Then } = createBdd();

const HISTORY_JSON_PATH = path.join(process.cwd(), 'public', 'metrics', 'history.json');

function writeHistoryJson(history: ReturnType<typeof buildMetricsHistory>) {
  const dir = path.dirname(HISTORY_JSON_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(HISTORY_JSON_PATH, JSON.stringify(history, null, 2), 'utf-8');
}

/** Section "Qualité du code" (h2 contient "Qualité du Code") */
function sectionQualiteCode(page: import('@playwright/test').Page) {
  return page.locator('section').filter({
    has: page.getByRole('heading', { level: 2, name: /Qualité du [Cc]ode/ }),
  });
}

/** Section "Performance" (h2 contient "Performance") */
function sectionPerformance(page: import('@playwright/test').Page) {
  return page.locator('section').filter({
    has: page.getByRole('heading', { level: 2, name: /Performance/ }),
  });
}

// --- Étant donné : métriques avec valeur numérique pour Type Coverage ---
Given(
  'les métriques collectées contiennent une valeur numérique pour Type Coverage',
  async () => {
    const snapshot = buildMetricsSnapshot({ typeCoverage: 85 });
    const history = buildMetricsHistory(snapshot);
    writeHistoryJson(history);
  }
);

// --- Étant donné : métriques avec "NC" pour Type Coverage ---
Given(
  'les métriques collectées contiennent {string} pour Type Coverage',
  async ({}, value: string) => {
    const snapshot = buildMetricsSnapshot({
      typeCoverage: value === 'NC' ? 'NC' : parseInt(value, 10),
    });
    const history = buildMetricsHistory(snapshot);
    writeHistoryJson(history);
  }
);

// --- Étant donné : métriques avec valeur numérique pour le score Lighthouse ---
Given(
  'les métriques collectées contiennent une valeur numérique pour le score Lighthouse',
  async () => {
    const snapshot = buildMetricsSnapshot({ lighthouseScore: 92 });
    const history = buildMetricsHistory(snapshot);
    writeHistoryJson(history);
  }
);

// --- Étant donné : métriques avec "NC" pour le score Lighthouse ---
Given(
  'les métriques collectées contiennent {string} pour le score Lighthouse',
  async ({}, value: string) => {
    const snapshot = buildMetricsSnapshot({
      lighthouseScore: value === 'NC' ? 'NC' : parseInt(value, 10),
    });
    const history = buildMetricsHistory(snapshot);
    writeHistoryJson(history);
  }
);

// --- Étant donné : métriques avec "NC" pour Complexité cyclomatique, Index de maintenabilité, Dette technique ---
Given(
  'les métriques collectées contiennent {string} pour Complexité cyclomatique, Index de maintenabilité et Dette technique',
  async ({}, value: string) => {
    const snapshot = buildMetricsSnapshot({
      cyclomaticComplexity: value === 'NC' ? 'NC' : undefined,
      maintainabilityIndex: value === 'NC' ? 'NC' : undefined,
      technicalDebt: value === 'NC' ? 'NC' : undefined,
    });
    const history = buildMetricsHistory(snapshot);
    writeHistoryJson(history);
  }
);

// --- Quand : accès à la page /metrics ---
When('j\'accède à la page {string}', async ({ page }, pathArg: string) => {
  await page.goto(pathArg);
  await page.waitForLoadState('networkidle');
});

// --- Alors : carte Type Coverage visible dans Qualité du code ---
Then(
  'je vois dans la section "Qualité du code" une carte "Type Coverage"',
  async ({ page }) => {
    const section = sectionQualiteCode(page);
    const cardTitle = section.getByRole('heading', {
      level: 3,
      name: 'Type Coverage',
    });
    await expect(cardTitle).toBeVisible();
  }
);

Then(
  'la carte affiche un pourcentage entier \\(valeur réelle, pas un placeholder)',
  async ({ page }) => {
    const section = sectionQualiteCode(page);
    const heading = section.getByRole('heading', { level: 3, name: 'Type Coverage' });
    await expect(heading).toBeVisible();
    const card = heading.locator('xpath=../..');
    const cardValue = card.locator('[class*="cardValue"]');
    await expect(cardValue).toBeVisible();
    const text = await cardValue.textContent();
    expect(text).toMatch(/^\d+%$/);
  }
);

// --- Alors : carte Type Coverage absente ---
Then(
  'la section "Qualité du code" n\'affiche pas la carte "Type Coverage"',
  async ({ page }) => {
    const section = sectionQualiteCode(page);
    const cardTitle = section.getByRole('heading', {
      level: 3,
      name: 'Type Coverage',
    });
    await expect(cardTitle).not.toBeVisible();
  }
);

// --- Alors : carte Score Lighthouse visible dans Performance ---
Then(
  'je vois dans la section "Performance" une carte "Score Lighthouse"',
  async ({ page }) => {
    const section = sectionPerformance(page);
    const cardTitle = section.getByRole('heading', {
      level: 3,
      name: 'Score Lighthouse',
    });
    await expect(cardTitle).toBeVisible();
  }
);

Then(
  'la carte affiche un nombre entre {int} et {int} \\(valeur réelle, pas un placeholder)',
  async ({ page }, minVal: number, maxVal: number) => {
    const section = sectionPerformance(page);
    const heading = section.getByRole('heading', {
      level: 3,
      name: 'Score Lighthouse',
    });
    await expect(heading).toBeVisible();
    const card = heading.locator('xpath=../..');
    const cardValue = card.locator('[class*="cardValue"]');
    await expect(cardValue).toBeVisible();
    const text = await cardValue.textContent();
    const match = text?.match(/(\d+)/);
    expect(match).toBeTruthy();
    const value = parseInt(match![1], 10);
    expect(value).toBeGreaterThanOrEqual(minVal);
    expect(value).toBeLessThanOrEqual(maxVal);
  }
);

// --- Alors : carte Score Lighthouse absente ---
Then(
  'la section "Performance" n\'affiche pas la carte "Score Lighthouse"',
  async ({ page }) => {
    const section = sectionPerformance(page);
    const cardTitle = section.getByRole('heading', {
      level: 3,
      name: 'Score Lighthouse',
    });
    await expect(cardTitle).not.toBeVisible();
  }
);

// --- Alors : cartes Complexité cyclomatique, Index de maintenabilité, Dette technique absentes ---
Then(
  'les cartes "Complexité cyclomatique", "Index de maintenabilité" et "Dette technique" sont absentes de la section "Qualité du code"',
  async ({ page }) => {
    const section = sectionQualiteCode(page);
    const titles = [
      'Complexité Cyclomatique',
      'Index de Maintenabilité',
      'Dette Technique',
    ];
    for (const title of titles) {
      const cardTitle = section.getByRole('heading', {
        level: 3,
        name: title,
      });
      await expect(cardTitle).not.toBeVisible();
    }
  }
);

Then(
  'aucune de ces cartes n\'affiche de valeur inventée \\(absente ou affichant "NC"\\)',
  async ({ page }) => {
    const section = sectionQualiteCode(page);
    const titles = [
      'Complexité Cyclomatique',
      'Index de Maintenabilité',
      'Dette Technique',
    ];
    for (const title of titles) {
      const cardTitle = section.getByRole('heading', {
        level: 3,
        name: title,
      });
      await expect(cardTitle).not.toBeVisible();
    }
  }
);
