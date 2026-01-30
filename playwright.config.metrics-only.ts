/**
 * Config Playwright limitée à la feature page-metrics-valeurs-correctes (US-12.1).
 * Permet de générer et exécuter uniquement les scénarios BDD de cette feature
 * sans échouer sur les steps manquants des autres features.
 *
 * Usage:
 *   npx bddgen test -c playwright.config.metrics-only.ts
 *   npx playwright test -c playwright.config.metrics-only.ts
 */
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

defineBddConfig({
  features: 'tests/bdd/page-metrics-valeurs-correctes.feature',
  steps: 'tests/bdd/**/*.steps.ts',
  outputDir: 'tests/bdd-generated',
});

export default defineConfig({
  testMatch: ['tests/bdd-generated/**/*.spec.js'],
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['list']],
  expect: { timeout: 15000 },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    actionTimeout: 10000,
    navigationTimeout: 30000,
    testIdAttribute: 'e2eid',
  },
  /* testDir doit correspondre à l'outputDir BDD pour que la config soit trouvée au runtime */
  projects: [
    { name: 'chromium', testDir: 'tests/bdd-generated', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  timeout: 120000,
});
