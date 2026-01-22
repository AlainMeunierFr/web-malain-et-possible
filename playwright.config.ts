import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Configuration BDD avec playwright-bdd
 * Les fichiers .feature sont réutilisables avec d'autres outils (C#, Python, etc.)
 * 
 * COMPORTEMENT AUTOMATIQUE : Tous les fichiers .feature dans tests/bdd/ sont automatiquement testés
 * (comme Cucumber qui testait tous les .feature dans le dossier)
 * 
 * NOTE : Les tests E2E (navigation, about-site, faisons-connaissance, call-to-action, page-content-types)
 * ont été déplacés vers tests/end-to-end/ en syntaxe Playwright standard (.spec.ts)
 */
defineBddConfig({
  // Charger AUTOMATIQUEMENT tous les fichiers .feature dans tests/bdd/
  // Pattern glob : tous les fichiers .feature dans tests/bdd/ et ses sous-dossiers
  // EXCLUS : navigation, about-site, faisons-connaissance, call-to-action, page-content-types (déplacés vers E2E)
  features: 'tests/bdd/**/*.feature',
  // Charger AUTOMATIQUEMENT tous les fichiers .steps.ts dans tests/bdd/
  // Pattern glob : tous les fichiers .steps.ts dans tests/bdd/ et ses sous-dossiers
  steps: 'tests/bdd/**/*.steps.ts',
  outputDir: '.features-gen',
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Tests BDD générés dans .features-gen/ + Tests E2E dans tests/end-to-end/
  // Utiliser testMatch pour inclure les deux types de tests
  testMatch: [
    '.features-gen/**/*.spec.js',
    'tests/end-to-end/**/*.spec.ts',
  ],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Timeout pour les actions (augmenté pour les tests longs) */
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  
  /* Timeout global pour les tests (augmenté pour le test long) */
  timeout: 300000, // 5 minutes pour le test complet
});
