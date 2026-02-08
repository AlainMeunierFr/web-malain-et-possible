/**
 * Config Playwright pour exécuter UNIQUEMENT les tests BDD générés.
 * Utilisé par le script de publication (collect-metrics-simple) sous Windows,
 * où le glob ".features-gen/**" peut ne pas être découvert depuis la config principale.
 *
 * Usage : npx playwright test -c playwright.bdd-only.config.ts
 */
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

// Charger la config BDD (playwright-bdd) pour que les steps soient reconnus
const { defineBddConfig } = require('playwright-bdd');
defineBddConfig({
  features: 'tests/bdd/**/*.feature',
  steps: 'tests/bdd/**/*.steps.ts',
  outputDir: '.features-gen',
  missingSteps: 'skip-scenario',
});

export default defineConfig({
  testDir: path.join(process.cwd(), '.features-gen'),
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html'],
    ['json', { outputFile: 'playwright-report/data.json' }],
  ],
  expect: { timeout: 15000 },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    actionTimeout: 10000,
    navigationTimeout: 30000,
    testIdAttribute: 'e2eid',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  timeout: 60000,
});
