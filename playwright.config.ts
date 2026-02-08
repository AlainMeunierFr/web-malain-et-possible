import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Configuration BDD avec playwright-bdd
 * 
 * IMPORTANT : defineBddConfig() est coÃ»teux (parse 30 features + compile 19 steps).
 * On ne l'exÃ©cute QUE quand c'est nÃ©cessaire (pas pour les tests E2E seuls).
 * La gÃ©nÃ©ration BDD est dÃ©clenchÃ©e explicitement par `npm run test:bdd:generate` (bddgen test).
 * 
 * Les fichiers .feature sont rÃ©utilisables avec d'autres outils (C#, Python, etc.)
 * Les tests E2E sont dans tests/end-to-end/ en syntaxe Playwright standard (.spec.ts)
 */
// Sous Windows, argv peut contenir "tests\end-to-end" → accepter les deux séparateurs
const skipBddGen = process.env.SKIP_BDD_GEN === '1' ||
  process.argv.some(arg => arg.includes('end-to-end'));

if (!skipBddGen) {
  // Import dynamique conditionnel â€” ne charge playwright-bdd que si nÃ©cessaire
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { defineBddConfig } = require('playwright-bdd');
  defineBddConfig({
    features: 'tests/bdd/**/*.feature',
    steps: 'tests/bdd/**/*.steps.ts',
    outputDir: '.features-gen',
    // 352 steps sans dÃ©finition (dette BDD connue).
    // skip-scenario : les scÃ©narios avec steps manquants sont gÃ©nÃ©rÃ©s en
    // test.fixme() (ignorÃ©s Ã  l'exÃ©cution), les autres s'exÃ©cutent normalement.
    // Remettre Ã  'fail-on-gen' (dÃ©faut) une fois la dette rÃ©sorbÃ©e.
    missingSteps: 'skip-scenario',
  });
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Tests BDD générés dans .features-gen/ + Tests E2E dans tests/end-to-end/
  // Sous Windows, le glob .features-gen/**/*.spec.js peut ignorer les dossiers cachés.
  // Utiliser une regex qui matche tout fichier .spec.js (BDD) ou .spec.ts (E2E).
  testMatch: [
    /\.features-gen[\\/].*[\\/].*\.spec\.js$/,
    /\.features-gen[\\/].*\.spec\.js$/,
    /tests[\\/]end-to-end[\\/].*\.spec\.ts$/,
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
  reporter: [
    ['list'], // une ligne par test dans le terminal (progression visible)
    ['html'],
    ['json', { outputFile: 'playwright-report/data.json' }],
  ],
  /* Timeout des assertions (dÃ©faut 5s) : WebKit peut Ãªtre plus lent Ã  considÃ©rer un Ã©lÃ©ment visible */
  expect: {
    timeout: 15000,
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Timeout pour les actions (augmentÃ© pour les tests longs) */
    actionTimeout: 10000,
    navigationTimeout: 30000,
    
    /* Utiliser e2eid pour les identifiants E2E (attribut e2eid="...") */
    testIdAttribute: 'e2eid',
  },

  /* Configure projects for major browsers.
   * En local : chromium uniquement (rapiditÃ©). En CI : 3 navigateurs (cross-browser). */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    ...(process.env.CI ? [
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },

      {
        name: 'webkit',
        use: {
          ...devices['Desktop Safari'],
          /* WebKit peut Ãªtre plus lent (paint, layout) ; timeouts augmentÃ©s pour limiter les Ã©checs prÃ©coces */
          actionTimeout: 15000,
          navigationTimeout: 40000,
        },
      },
    ] : []),

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
  
  /* Timeout global par test */
  timeout: 60000, // 1 minute par test (largement suffisant pour un site de 10 pages)
});









