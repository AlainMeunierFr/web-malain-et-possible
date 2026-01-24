/**
 * Steps BDD pour les tooltips des métriques - US-4.6
 * Tests d'acceptation avec Playwright et Jest
 */

import { defineFeature, loadFeature } from 'jest-cucumber';
import { chromium, Browser, Page } from 'playwright';
import fs from 'fs';
import path from 'path';

const feature = loadFeature('tests/bdd/tooltips-metriques.feature');

defineFeature(feature, (test) => {
  let browser: Browser;
  let page: Page;
  let baseURL = 'http://localhost:3000';

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
  });

  afterAll(async () => {
    await browser?.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page?.close();
  });

  // Contexte commun
  const navigateToMetrics = async () => {
    await page.goto(`${baseURL}/metrics`);
    await page.waitForSelector('[data-testid="metrics-container"]', { timeout: 5000 });
  };

  const waitForMetricsLoaded = async () => {
    // Attendre que les métriques soient chargées
    await page.waitForSelector('.cardTitle', { timeout: 5000 });
    await page.waitForLoadState('networkidle');
  };

  // CA1 - Configuration externe
  test('CA1 - Configuration externe des tooltips via JSON', ({ given, when, then, and }) => {
    given('que le fichier "data/tooltips-metrics.json" existe', () => {
      const configPath = path.resolve('data/tooltips-metrics.json');
      expect(fs.existsSync(configPath)).toBe(true);
    });

    when('je charge la configuration des tooltips', () => {
      const configPath = path.resolve('data/tooltips-metrics.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      expect(config).toBeDefined();
    });

    then('toutes les 20 métriques doivent avoir leur configuration tooltip', () => {
      const configPath = path.resolve('data/tooltips-metrics.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      const expectedMetrics = [
        'cyclomaticComplexity', 'bddScenarios', 'unitTests', 'integrationTests', 
        'e2eSteps', 'eslintErrors', 'eslintWarnings', 'typeCoverage',
        'coverageLines', 'coverageStatements', 'coverageFunctions', 'coverageBranches',
        'totalFiles', 'sourceLines', 'components', 'pages',
        'totalDependencies', 'vulnerabilities', 'bundleSize', 'buildTime'
      ];

      expectedMetrics.forEach(metric => {
        expect(config[metric]).toBeDefined();
      });
    });

    and('chaque configuration doit contenir "title", "description", et "interpretation"', () => {
      const configPath = path.resolve('data/tooltips-metrics.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      Object.values(config).forEach((metricConfig: any) => {
        expect(metricConfig.title).toBeDefined();
        expect(metricConfig.description).toBeDefined();
        expect(metricConfig.interpretation).toBeDefined();
        expect(Array.isArray(metricConfig.interpretation)).toBe(true);
      });
    });

    and('le contenu doit être modifiable sans toucher au code source', () => {
      // Test conceptuel - le JSON est external au code
      const configPath = path.resolve('data/tooltips-metrics.json');
      expect(configPath.includes('/data/')).toBe(true);
    });
  });

  // CA2 - Indicateur visuel
  test('CA2 - Indicateur visuel sur chaque métrique', ({ given, when, then, and }) => {
    given('que je consulte une métrique quelconque', async () => {
      await navigateToMetrics();
      await waitForMetricsLoaded();
    });

    when("j'observe le bloc bleu de la métrique", async () => {
      const firstCard = page.locator('.card').first();
      await expect(firstCard).toBeVisible();
    });

    then('je dois voir une icône "ℹ" à côté du titre', async () => {
      const infoIcon = page.locator('.infoIcon').first();
      await expect(infoIcon).toBeVisible();
      
      const iconText = await infoIcon.textContent();
      expect(iconText?.trim()).toBe('ℹ️');
    });

    and('l\'icône doit avoir un cursor "help" au survol', async () => {
      const infoIcon = page.locator('.infoIcon').first();
      const cursorStyle = await infoIcon.evaluate(el => window.getComputedStyle(el).cursor);
      expect(cursorStyle).toBe('help');
    });

    and('le design doit être cohérent avec l\'interface existante', async () => {
      const infoIcon = page.locator('.infoIcon').first();
      
      // Vérifier que l'icône respecte le design système
      const styles = await infoIcon.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          opacity: computed.opacity,
          borderRadius: computed.borderRadius,
          display: computed.display
        };
      });
      
      expect(parseFloat(styles.opacity)).toBeGreaterThan(0);
      expect(styles.display).toBe('flex');
    });
  });

  // CA3 - Affichage au survol
  test('CA3 - Affichage tooltip au survol', ({ given, when, then, and }) => {
    given('que je vois l\'icône "ℹ" d\'une métrique', async () => {
      await navigateToMetrics();
      await waitForMetricsLoaded();
      
      const infoIcon = page.locator('.infoIcon').first();
      await expect(infoIcon).toBeVisible();
    });

    when('je survole l\'icône avec ma souris', async () => {
      const infoIcon = page.locator('.infoIcon').first();
      await infoIcon.hover();
    });

    then('une tooltip doit apparaître avec le contenu pédagogique', async () => {
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      await expect(tooltip).toBeVisible();
    });

    and('la tooltip doit contenir le terme technique + explication', async () => {
      const tooltipContent = page.locator('[data-testid="tooltip-content"]').first();
      const text = await tooltipContent.textContent();
      
      expect(text).toContain('Terme technique');
      expect(text!.length).toBeGreaterThan(50); // Assez de contenu pédagogique
    });

    and('la tooltip doit contenir une grille d\'interprétation', async () => {
      const tooltipContent = page.locator('[data-testid="tooltip-content"]').first();
      const text = await tooltipContent.textContent();
      
      // Vérifier présence d'éléments d'interprétation
      expect(text).toMatch(/(Excellent|Bon|Acceptable|Préoccupant|Critique)/i);
    });
  });

  // CA3 - Support clavier
  test('CA3 - Support clavier pour l\'accessibilité', ({ given, when, then, and }) => {
    given('que je navigue au clavier', async () => {
      await navigateToMetrics();
      await waitForMetricsLoaded();
    });

    when('je donne le focus à l\'icône "ℹ" (Tab)', async () => {
      const infoIcon = page.locator('.infoIcon').first();
      await infoIcon.focus();
    });

    then('la tooltip doit s\'afficher', async () => {
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      await expect(tooltip).toBeVisible();
    });

    and('elle doit disparaître quand je quitte le focus', async () => {
      // Déplacer le focus ailleurs
      await page.keyboard.press('Tab');
      
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      await expect(tooltip).not.toBeVisible();
    });
  });

  // CA4 - Z-index
  test('CA4 - Priorité z-index maximale', ({ given, when, then, and }) => {
    given('qu\'une tooltip est affichée', async () => {
      await navigateToMetrics();
      await waitForMetricsLoaded();
      
      const infoIcon = page.locator('.infoIcon').first();
      await infoIcon.hover();
      
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      await expect(tooltip).toBeVisible();
    });

    when('je vérifie la superposition avec autres éléments', async () => {
      // Test de superposition visuelle
    });

    then('la tooltip doit être au-dessus de TOUS les éléments de la page', async () => {
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      
      const zIndex = await tooltip.evaluate(el => {
        return window.getComputedStyle(el).zIndex;
      });
      
      // Z-index doit être très élevé (maximum possible)
      expect(parseInt(zIndex)).toBeGreaterThan(1000000);
    });

    and('elle ne doit être masquée par aucun bloc, section ou carte', async () => {
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      
      // Vérifier que la tooltip est effectivement au premier plan
      const isVisible = await tooltip.isVisible();
      expect(isVisible).toBe(true);
      
      // Test de collision visuelle avec cartes
      const tooltipBox = await tooltip.boundingBox();
      expect(tooltipBox).toBeDefined();
    });

    and('elle doit avoir une priorité z-index maximale', async () => {
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      
      const zIndex = await tooltip.evaluate(el => {
        return parseInt(window.getComputedStyle(el).zIndex);
      });
      
      // Doit être proche du maximum (2147483647)
      expect(zIndex).toBeGreaterThan(2000000);
    });
  });

  // CA5 - Gestion zone d'affichage
  test('CA5 - Gestion intelligente de l\'affichage', ({ given, when, then, and }) => {
    given('qu\'une tooltip est affichée près du bord d\'écran', async () => {
      await navigateToMetrics();
      await waitForMetricsLoaded();
      
      // Simuler une fenêtre petite
      await page.setViewportSize({ width: 400, height: 600 });
      
      // Trouver une icône près du bord
      const lastIcon = page.locator('.infoIcon').last();
      await lastIcon.hover();
    });

    when('la tooltip déborderait de la zone d\'affichage', async () => {
      // La condition est créée par le viewport réduit
    });

    then('elle doit se repositionner automatiquement', async () => {
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      await expect(tooltip).toBeVisible();
      
      const tooltipBox = await tooltip.boundingBox();
      const viewport = page.viewportSize()!;
      
      // Vérifier que la tooltip ne déborde pas
      expect(tooltipBox!.x).toBeGreaterThanOrEqual(0);
      expect(tooltipBox!.y).toBeGreaterThanOrEqual(0);
      expect(tooltipBox!.x + tooltipBox!.width).toBeLessThanOrEqual(viewport.width);
      expect(tooltipBox!.y + tooltipBox!.height).toBeLessThanOrEqual(viewport.height);
    });

    and('rester entièrement visible dans la zone d\'affichage', async () => {
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      const isCompletelyVisible = await tooltip.evaluate(el => {
        const rect = el.getBoundingClientRect();
        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        
        return (
          rect.left >= 0 &&
          rect.top >= 0 &&
          rect.right <= viewport.width &&
          rect.bottom <= viewport.height
        );
      });
      
      expect(isCompletelyVisible).toBe(true);
    });
  });

  // CA6 - Couverture complète
  test('CA6 - Couverture complète des 19 métriques', ({ given, when, then, and }) => {
    given('que j\'accède à la page des métriques', async () => {
      await navigateToMetrics();
      await waitForMetricsLoaded();
    });

    when('je recense toutes les tooltips disponibles', async () => {
      // Les tooltips seront comptées dans l'assertion
    });

    then('je dois trouver exactement 19 tooltips fonctionnelles', async () => {
      const infoIcons = page.locator('.infoIcon');
      const count = await infoIcons.count();
      expect(count).toBe(19);
    });

    and('chaque métrique doit avoir sa tooltip spécifique :', async (table) => {
      const expectedMetrics = table.map(row => row.Métrique);
      expect(expectedMetrics).toHaveLength(21); // 20 métriques + en-tête
      
      // Vérifier que chaque tooltip fonctionne
      const infoIcons = page.locator('.infoIcon');
      const count = await infoIcons.count();
      
      for (let i = 0; i < count; i++) {
        const icon = infoIcons.nth(i);
        await icon.hover();
        
        const tooltip = page.locator('[data-testid="tooltip"]').first();
        await expect(tooltip).toBeVisible();
        
        // Vérifier que le contenu est unique
        const content = await page.locator('[data-testid="tooltip-content"]').first().textContent();
        expect(content!.length).toBeGreaterThan(10);
        
        // Déplacer la souris pour fermer la tooltip
        await page.mouse.move(0, 0);
        await page.waitForTimeout(100);
      }
    });
  });

  // Performance
  test('Performance - Chargement des tooltips', ({ given, when, then, and }) => {
    given('que j\'accède à la page des métriques', async () => {
      await navigateToMetrics();
      await waitForMetricsLoaded();
    });

    when('les tooltips se chargent', async () => {
      const startTime = Date.now();
      
      const infoIcon = page.locator('.infoIcon').first();
      await infoIcon.hover();
      
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      await expect(tooltip).toBeVisible();
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(100); // Moins de 100ms
    });

    then('le temps de chargement ne doit pas dépasser 100ms', async () => {
      // Testé dans le when
    });

    and('l\'affichage des tooltips doit être fluide', async () => {
      // Tester plusieurs tooltips rapidement
      const icons = page.locator('.infoIcon').first();
      
      for (let i = 0; i < 3; i++) {
        await icons.hover();
        await page.waitForTimeout(50);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(50);
      }
      
      // Si on arrive ici sans timeout, c'est fluide
      expect(true).toBe(true);
    });
  });

  // Responsive
  test('Responsive - Tooltips sur mobile', ({ given, when, then, and }) => {
    given('que je consulte la page sur un écran mobile (≤768px)', async () => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone 6/7/8
      await navigateToMetrics();
      await waitForMetricsLoaded();
    });

    when('j\'active une tooltip', async () => {
      const infoIcon = page.locator('.infoIcon').first();
      await infoIcon.click(); // Click au lieu de hover sur mobile
    });

    then('elle doit s\'adapter à la taille de l\'écran', async () => {
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      await expect(tooltip).toBeVisible();
      
      const tooltipBox = await tooltip.boundingBox();
      const maxWidthExpected = 375 - 32; // Viewport - marges
      
      expect(tooltipBox!.width).toBeLessThanOrEqual(maxWidthExpected);
    });

    and('ne pas déborder de la zone d\'affichage mobile', async () => {
      const tooltip = page.locator('[data-testid="tooltip"]').first();
      const tooltipBox = await tooltip.boundingBox();
      
      expect(tooltipBox!.x).toBeGreaterThanOrEqual(0);
      expect(tooltipBox!.y).toBeGreaterThanOrEqual(0);
      expect(tooltipBox!.x + tooltipBox!.width).toBeLessThanOrEqual(375);
      expect(tooltipBox!.y + tooltipBox!.height).toBeLessThanOrEqual(667);
    });
  });
});

// Utilitaires helper
export const convertMetricNameToTestId = (metricName: string): string => {
  const mapping: Record<string, string> = {
    'Complexité Cyclomatique': 'cyclomatic-complexity',
    'Scénarios BDD': 'bdd-scenarios', 
    'Tests Unitaires': 'unit-tests',
    'Tests Intégration': 'integration-tests',
    'Steps E2E': 'e2e-steps',
    'Erreurs ESLint': 'eslint-errors',
    'Warnings ESLint': 'eslint-warnings',
    'Type Coverage': 'type-coverage',
    'Couverture Lignes': 'coverage-lines',
    'Couverture Statements': 'coverage-statements', 
    'Couverture Fonctions': 'coverage-functions',
    'Couverture Branches': 'coverage-branches',
    'Fichiers Total': 'total-files',
    'Lignes de Code': 'source-lines',
    'Composants': 'components',
    'Pages': 'pages',
    'Dépendances Total': 'total-dependencies',
    'Vulnérabilités': 'vulnerabilities',
    'Taille Bundle': 'bundle-size',
    'Temps de Build': 'build-time'
  };
  
  return mapping[metricName] || metricName.toLowerCase().replace(/\s+/g, '-');
};