/**
 * Tests unitaires pour MetricsCompact
 * US-12.5 : Layout 2 colonnes (gauche: Tests+Couverture, droite: Autres)
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MetricsCompact from '../../components/MetricsCompact';

// Mock fetch pour les métriques
const mockMetricsData = {
  latest: {
    timestamp: '2026-02-04T12:00:00Z',
    branch: 'main',
    commit: 'abc123',
    tests: {
      totalTests: 100,
      passingTests: 95,
      failingTests: 5,
      testDuration: 5000,
      totalTestFiles: 20,
      bddScenariosTotal: 30,
      bddScenariosTestable: 28,
      bddScenariosNonTestable: 2,
      bddTestDuration: 2000,
      bddFeatures: 10,
      bddStepsTotal: 100,
      bddStepsImplemented: 85,
      bddStepsMissing: 15,
      unitTests: 50,
      unitTestPassed: 48,
      unitTestFailed: 2,
      unitTestDuration: 1500,
      unitTestFiles: 15,
      integrationTests: 15,
      integrationTestPassed: 14,
      integrationTestFailed: 1,
      integrationTestDuration: 1000,
      integrationTestFiles: 5,
      e2eSteps: 5,
      e2eStepsPassed: 5,
      e2eStepsFailed: 0,
      e2eScenarioFiles: 3,
      e2eTests: { duration: 500 },
    },
    coverage: {
      lines: { percentage: 85.5, total: 1000, covered: 855 },
      statements: { percentage: 82.3 },
      functions: { percentage: 78.1 },
      branches: { percentage: 65.2 },
    },
    quality: {
      eslintErrors: 0,
      eslintWarnings: 5,
      typeCoverage: 90,
      cyclomaticComplexity: 15,
      maintainabilityIndex: 80,
      technicalDebt: '2h',
    },
    size: {
      totalFiles: 150,
      sourceLines: 12000,
      components: 45,
      pages: 12,
    },
    dependencies: {
      total: 85,
      production: 35,
      development: 50,
      vulnerabilities: { total: 0, critical: 0, high: 0 },
    },
    performance: {
      bundleSize: 450,
      buildTime: 12000,
      lighthouseScore: 95,
    },
  },
  trends: {
    tests: 'up' as const,
    quality: 'stable' as const,
  },
  snapshotCount: 10,
  siteVersion: '1.2.3',
};

// Mock fetch avant les tests
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockMetricsData),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('MetricsCompact', () => {
  describe('Layout 2 colonnes (CA7)', () => {
    it('devrait avoir un conteneur principal avec classe metricsCompact', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        expect(container.querySelector('.metricsCompact')).toBeInTheDocument();
      });
    });

    it('devrait avoir un layout 2 colonnes avec metricsMainLayout', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const mainLayout = container.querySelector('.metricsMainLayout');
        expect(mainLayout).toBeInTheDocument();
      });
    });

    it('devrait avoir une colonne gauche avec Tests et Couverture', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const leftColumn = container.querySelector('.metricsLeftColumn');
        expect(leftColumn).toBeInTheDocument();
        
        // Tests et Couverture dans la colonne gauche
        const testsSection = leftColumn?.querySelector('.metricsTests');
        const coverageSection = leftColumn?.querySelector('.metricsCoverage');
        expect(testsSection).toBeInTheDocument();
        expect(coverageSection).toBeInTheDocument();
      });
    });

    it('devrait avoir une colonne droite avec Autres indicateurs', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const rightColumn = container.querySelector('.metricsRightColumn');
        expect(rightColumn).toBeInTheDocument();
        
        const otherSection = rightColumn?.querySelector('.metricsOther');
        expect(otherSection).toBeInTheDocument();
      });
    });
  });

  describe('Bloc Tests (CA4)', () => {
    it('devrait afficher 5 cartes de tests', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const testCards = container.querySelectorAll('.metricsTestCard');
        expect(testCards).toHaveLength(5);
      });
    });

    it('devrait afficher les titres corrects pour chaque carte', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const testsSection = container.querySelector('.metricsTests');
        expect(testsSection).toBeInTheDocument();
        
        // Vérifier les titres dans la section Tests spécifiquement
        const cardTitles = testsSection?.querySelectorAll('.metricsCardTitle');
        const titles = Array.from(cardTitles || []).map(el => el.textContent);
        expect(titles).toContain('Total');
        expect(titles).toContain('BDD');
        expect(titles).toContain('Unitaires');
        expect(titles).toContain('Intégration');
        expect(titles).toContain('E2E');
      });
    });

    it('devrait afficher une infobulle sur chaque carte', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const infos = container.querySelectorAll('.metricsInfo');
        expect(infos.length).toBeGreaterThanOrEqual(5);
      });
    });

    it('devrait afficher les 4 détails en colonne (Réussis, Échoués, Durée, Fichiers)', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        // Vérifie que les lignes de détails sont présentes
        const detailRows = container.querySelectorAll('.metricsDetailRow');
        expect(detailRows.length).toBeGreaterThan(0);
        
        // Vérifie les labels
        const labels = container.querySelectorAll('.metricsDetailLabel');
        const labelTexts = Array.from(labels).map(l => l.textContent);
        expect(labelTexts.some(t => t?.includes('Réussis'))).toBe(true);
        expect(labelTexts.some(t => t?.includes('Échoués'))).toBe(true);
        expect(labelTexts.some(t => t?.includes('Durée'))).toBe(true);
      });
    });

    it('devrait afficher le nombre de fichiers pour chaque carte', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const labels = container.querySelectorAll('.metricsDetailLabel');
        const labelTexts = Array.from(labels).map(l => l.textContent);
        expect(labelTexts.some(t => t?.includes('Fichiers'))).toBe(true);
      });
    });
  });

  describe('Bloc Couverture (CA5)', () => {
    it('devrait afficher 4 cartes de couverture', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const coverageCards = container.querySelectorAll('.metricsCoverageCard');
        expect(coverageCards).toHaveLength(4);
      });
    });

    it('devrait afficher les titres corrects pour la couverture', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const coverageSection = container.querySelector('.metricsCoverage');
        expect(coverageSection).toBeInTheDocument();
        
        // Vérifier les titres dans la section Couverture spécifiquement
        const cardTitles = coverageSection?.querySelectorAll('.metricsCardTitle');
        const titles = Array.from(cardTitles || []).map(el => el.textContent);
        expect(titles).toContain('Lignes');
        expect(titles).toContain('Statements');
        expect(titles).toContain('Fonctions');
        expect(titles).toContain('Branches');
      });
    });

    it('devrait avoir le même style visuel que les cartes Tests', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const coverageCards = container.querySelectorAll('.metricsCoverageCard');
        // Les cartes de couverture doivent avoir les mêmes classes de base
        coverageCards.forEach(card => {
          expect(card.querySelector('.metricsGauge')).toBeInTheDocument();
        });
      });
    });
  });

  describe('Bloc Autres indicateurs (CA6)', () => {
    it('devrait afficher les catégories attendues', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        // Vérifier la présence des 4 catégories fixes via les titres h3
        const categoryTitles = container.querySelectorAll('.metricsOtherCategoryTitle');
        const titles = Array.from(categoryTitles).map(el => el.textContent);
        expect(titles).toContain('Qualité (ESLint)');
        expect(titles).toContain('Taille');
        expect(titles).toContain('Dépendances');
        expect(titles).toContain('Performance');
      });
    });

    it('devrait avoir une présentation en liste structurée', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const otherSection = container.querySelector('.metricsOther');
        expect(otherSection).toBeInTheDocument();
        
        // Vérifier la présence des catégories (au moins 4 : Qualité, Taille, Dépendances, Performance)
        const categories = otherSection?.querySelectorAll('.metricsOtherCategory');
        expect(categories?.length).toBeGreaterThanOrEqual(4);
      });
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait afficher un message si les métriques ne sont pas disponibles', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
        })
      );

      render(<MetricsCompact />);
      
      await waitFor(() => {
        expect(screen.getByText(/Métriques non disponibles/)).toBeInTheDocument();
      });
    });

    it('devrait afficher un loader pendant le chargement', () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        new Promise(() => {}) // Never resolves
      );

      render(<MetricsCompact />);
      
      expect(screen.getByText(/Chargement/)).toBeInTheDocument();
    });
  });

  describe('Jauges et couleurs', () => {
    it('devrait colorer les jauges en vert pour ≥80%', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        // Coverage lines = 85.5% -> devrait être vert
        const goodGauges = container.querySelectorAll('.metricsGaugeFill.good');
        expect(goodGauges.length).toBeGreaterThan(0);
      });
    });

    it('devrait colorer les jauges en orange pour 60-80%', async () => {
      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        // Branches = 65.2% -> devrait être warning
        const warningGauges = container.querySelectorAll('.metricsGaugeFill.warning');
        expect(warningGauges.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Scores Web (CA5 US-12.7)', () => {
    it('devrait afficher les 4 scores Web quand disponibles', async () => {
      // Mock avec scores Lighthouse
      const mockWithLighthouse = {
        ...mockMetricsData,
        latest: {
          ...mockMetricsData.latest,
          lighthouse: {
            performance: 95,
            accessibility: 88,
            bestPractices: 100,
            seo: 92,
          },
        },
      };
      
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWithLighthouse),
        })
      );

      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        // Vérifier qu'il y a un titre h2 "Scores Web" (section dédiée)
        expect(screen.getByText('🌐 Scores Web')).toBeInTheDocument();
        
        // Vérifier les 4 cartes dans la section Scores Web
        const webScoresSection = container.querySelector('.metricsWebScores');
        expect(webScoresSection).not.toBeNull();
        expect(webScoresSection?.textContent).toContain('Performance');
        expect(webScoresSection?.textContent).toContain('Accessibilité');
        expect(webScoresSection?.textContent).toContain('Bonnes pratiques');
        expect(webScoresSection?.textContent).toContain('SEO');
      });
    });

    it('devrait afficher NC pour les scores non disponibles', async () => {
      // Mock avec certains scores NC
      const mockWithNC = {
        ...mockMetricsData,
        latest: {
          ...mockMetricsData.latest,
          lighthouse: {
            performance: 95,
            accessibility: 'NC' as const,
            bestPractices: 'NC' as const,
            seo: 92,
          },
        },
      };
      
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWithNC),
        })
      );

      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        // La section Scores Web doit être présente
        expect(screen.getByText('🌐 Scores Web')).toBeInTheDocument();
        
        // Toutes les cartes doivent être présentes (4 cartes)
        const webScoresSection = container.querySelector('.metricsWebScores');
        const cards = webScoresSection?.querySelectorAll('.metricsCoverageCard');
        expect(cards?.length).toBe(4);
        
        // Les scores NC affichent "NC"
        expect(webScoresSection?.textContent).toContain('NC');
      });
    });

    it('devrait appliquer la classe vert (good) pour score ≥90', async () => {
      const mockWithLighthouse = {
        ...mockMetricsData,
        latest: {
          ...mockMetricsData.latest,
          lighthouse: {
            performance: 95,
            accessibility: 90,
            bestPractices: 100,
            seo: 92,
          },
        },
      };
      
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWithLighthouse),
        })
      );

      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        // Trouver les jauges dans la section Scores Web
        const webScoresSection = container.querySelector('.metricsWebScores');
        const goodGauges = webScoresSection?.querySelectorAll('.metricsGaugeFill.good');
        expect(goodGauges?.length).toBe(4); // Tous les scores sont ≥90
      });
    });

    it('devrait appliquer la classe orange (warning) pour score 50-89', async () => {
      const mockWithLighthouse = {
        ...mockMetricsData,
        latest: {
          ...mockMetricsData.latest,
          lighthouse: {
            performance: 75,
            accessibility: 50,
            bestPractices: 89,
            seo: 60,
          },
        },
      };
      
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWithLighthouse),
        })
      );

      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const webScoresSection = container.querySelector('.metricsWebScores');
        const warningGauges = webScoresSection?.querySelectorAll('.metricsGaugeFill.warning');
        expect(warningGauges?.length).toBe(4); // Tous les scores sont entre 50 et 89
      });
    });

    it('devrait appliquer la classe rouge (danger) pour score <50', async () => {
      const mockWithLighthouse = {
        ...mockMetricsData,
        latest: {
          ...mockMetricsData.latest,
          lighthouse: {
            performance: 45,
            accessibility: 30,
            bestPractices: 49,
            seo: 10,
          },
        },
      };
      
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWithLighthouse),
        })
      );

      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        const webScoresSection = container.querySelector('.metricsWebScores');
        const dangerGauges = webScoresSection?.querySelectorAll('.metricsGaugeFill.danger');
        expect(dangerGauges?.length).toBe(4); // Tous les scores sont <50
      });
    });

    it('devrait afficher la section Scores Web même si tous les scores sont NC', async () => {
      const mockAllNC = {
        ...mockMetricsData,
        latest: {
          ...mockMetricsData.latest,
          lighthouse: {
            performance: 'NC' as const,
            accessibility: 'NC' as const,
            bestPractices: 'NC' as const,
            seo: 'NC' as const,
          },
        },
      };
      
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAllNC),
        })
      );

      const { container } = render(<MetricsCompact />);
      
      await waitFor(() => {
        // La section Scores Web doit apparaître avec NC
        expect(screen.getByText('🌐 Scores Web')).toBeInTheDocument();
        
        // Toutes les cartes sont présentes avec NC
        const webScoresSection = container.querySelector('.metricsWebScores');
        const cards = webScoresSection?.querySelectorAll('.metricsCoverageCard');
        expect(cards?.length).toBe(4);
      });
    });

    it('ne devrait pas afficher la section Scores Web si lighthouse est absent', async () => {
      // Mock sans lighthouse (métriques par défaut)
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMetricsData),
        })
      );

      render(<MetricsCompact />);
      
      await waitFor(() => {
        // La section Scores Web ne devrait pas apparaître
        expect(screen.queryByText('🌐 Scores Web')).not.toBeInTheDocument();
      });
    });
  });
});
