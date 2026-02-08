/**
 * Config Playwright pour exécuter UNIQUEMENT les tests E2E (tests/end-to-end/*.spec.ts).
 * Sans chargement de playwright-bdd, évite l'erreur "no BDD configs found" sous Windows
 * lorsque la config principale est chargée par les workers.
 *
 * Usage : npx playwright test -c playwright.e2e-only.config.ts
 */
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: path.join(process.cwd(), 'tests', 'end-to-end'),
  testMatch: '**/*.spec.ts',
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
