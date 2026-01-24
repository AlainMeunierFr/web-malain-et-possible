/**
 * Tests d'intégration pour le tooltip de Complexité Cyclomatique
 * Vérifie l'intégration complète dans la page metrics
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock des modules fs et path pour Next.js
jest.mock('fs', () => ({
  existsSync: jest.fn(() => true),
  readFileSync: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
}));

// Mock des données de métriques
const mockMetricsData = {
  latest: {
    timestamp: '2024-01-01T12:00:00Z',
    branch: 'main',
    commit: 'abc123',
    tests: {
      totalTests: 100,
      passingTests: 98,
      failingTests: 2,
      testDuration: 5000,
      totalTestFiles: 50,
      bddScenarios: 20,
      bddScenariosPassed: 19,
      bddScenariosFailed: 1,
      bddFeatures: 5,
      unitTests: 60,
      unitTestPassed: 59,
      unitTestFailed: 1,
      integrationTests: 20,
      integrationTestPassed: 20,
      integrationTestFailed: 0,
      e2eSteps: 100,
      e2eStepsPassed: 99,
      e2eStepsFailed: 1
    },
    coverage: {
      lines: { percentage: 95.5, total: 1000, covered: 955 },
      statements: { percentage: 96.2, total: 1200, covered: 1154 },
      functions: { percentage: 94.8, total: 250, covered: 237 },
      branches: { percentage: 92.3, total: 500, covered: 461 }
    },
    quality: {
      eslintErrors: 0,
      eslintWarnings: 3,
      typeCoverage: 98.5,
      cyclomaticComplexity: 15
    },
    size: {
      totalFiles: 150,
      sourceLines: 8500,
      components: 45,
      pages: 12
    },
    dependencies: {
      total: 85,
      production: 25,
      development: 60,
      vulnerabilities: {
        total: 2,
        critical: 0,
        high: 1
      }
    },
    performance: {
      bundleSize: 256,
      buildTime: 12000,
      lighthouseScore: 92
    }
  },
  trends: {
    tests: 'up' as const,
    quality: 'stable' as const
  },
  snapshots: []
};

const mockSiteVersion = {
  major: 1,
  minor: 54,
  patch: 19
};

// Mock des fonctions du module metrics
jest.mock('../../app/metrics/page', () => {
  const originalModule = jest.requireActual('../../app/metrics/page');
  return {
    ...originalModule,
    __esModule: true,
    default: originalModule.default,
    dynamic: 'force-dynamic'
  };
});

// Importation dynamique après les mocks
let MetricsPage: any;

beforeAll(async () => {
  const fs = require('fs');
  fs.readFileSync.mockImplementation((path: string) => {
    if (path.includes('history.json')) {
      return JSON.stringify(mockMetricsData);
    }
    if (path.includes('site-version.json')) {
      return JSON.stringify(mockSiteVersion);
    }
    return '{}';
  });

  // Import dynamique pour s'assurer que les mocks sont en place
  MetricsPage = (await import('../../app/metrics/page')).default;
});

describe('Integration: Tooltip Complexité Cyclomatique', () => {
  it('affiche le tooltip au survol de l\'icône d\'information', async () => {
    render(<MetricsPage />);

    // Vérifier que la métrique est présente
    const cyclomaticCard = screen.getByText('Complexité Cyclomatique');
    expect(cyclomaticCard).toBeInTheDocument();

    // Trouver l'icône d'information
    const infoIcon = screen.getByLabelText('Plus d\'informations');
    expect(infoIcon).toBeInTheDocument();

    // Survol de l'icône
    fireEvent.mouseEnter(infoIcon);

    // Vérifier que le tooltip s'affiche
    await waitFor(() => {
      expect(screen.getByText("Guide d'interprétation")).toBeInTheDocument();
    });

    // Vérifier le contenu du tableau d'interprétation
    expect(screen.getByText('1–10')).toBeInTheDocument();
    expect(screen.getByText('Excellente')).toBeInTheDocument();
    expect(screen.getByText('11–20')).toBeInTheDocument();
    expect(screen.getByText('Modérée')).toBeInTheDocument();
    expect(screen.getByText('21–50')).toBeInTheDocument();
    expect(screen.getByText('Élevée')).toBeInTheDocument();
    expect(screen.getByText('+50')).toBeInTheDocument();
    expect(screen.getByText('Très élevée')).toBeInTheDocument();

    // Vérifier la note de conseil
    expect(screen.getByText(/💡 Conseil/)).toBeInTheDocument();
    expect(screen.getByText(/Visez une complexité cyclomatique ≤ 10/)).toBeInTheDocument();
  });

  it('cache le tooltip quand on arrête le survol', async () => {
    render(<MetricsPage />);

    const infoIcon = screen.getByLabelText('Plus d\'informations');

    // Afficher le tooltip
    fireEvent.mouseEnter(infoIcon);
    
    await waitFor(() => {
      expect(screen.getByText("Guide d'interprétation")).toBeInTheDocument();
    });

    // Cacher le tooltip
    fireEvent.mouseLeave(infoIcon);

    await waitFor(() => {
      expect(screen.queryByText("Guide d'interprétation")).not.toBeInTheDocument();
    });
  });

  it('affiche le tooltip au focus clavier', async () => {
    render(<MetricsPage />);

    const infoIcon = screen.getByLabelText('Plus d\'informations');

    // Focus sur l'icône
    fireEvent.focus(infoIcon);

    // Vérifier que le tooltip s'affiche
    await waitFor(() => {
      expect(screen.getByText("Guide d'interprétation")).toBeInTheDocument();
    });
  });

  it('a les attributs ARIA corrects', async () => {
    render(<MetricsPage />);

    const infoIcon = screen.getByLabelText('Plus d\'informations');
    
    // Vérifications initiales
    expect(infoIcon.closest('[role="button"]')).toBeInTheDocument();
    expect(infoIcon.closest('[role="button"]')).toHaveAttribute('tabIndex', '0');
    expect(infoIcon.closest('[role="button"]')).toHaveAttribute('aria-expanded', 'false');

    // Afficher le tooltip
    fireEvent.mouseEnter(infoIcon);

    await waitFor(() => {
      const trigger = infoIcon.closest('[role="button"]');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('aria-describedby', 'tooltip-content');
      
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveAttribute('id', 'tooltip-content');
      expect(tooltip).toHaveAttribute('aria-live', 'polite');
    });
  });

  it('affiche la valeur de complexité cyclomatique correcte', () => {
    render(<MetricsPage />);

    // Vérifier que la valeur 15 (du mock) est affichée
    const cyclomaticCard = screen.getByText('Complexité Cyclomatique').closest('.card');
    expect(cyclomaticCard).toBeInTheDocument();
    expect(cyclomaticCard).toHaveTextContent('15');
  });

  it('le tooltip contient tous les niveaux d\'interprétation', async () => {
    render(<MetricsPage />);

    const infoIcon = screen.getByLabelText('Plus d\'informations');
    fireEvent.mouseEnter(infoIcon);

    await waitFor(() => {
      // Vérifier tous les textes d'interprétation
      expect(screen.getByText(/Code simple, facile à tester et maintenir/)).toBeInTheDocument();
      expect(screen.getByText(/attention accrue pour les tests/)).toBeInTheDocument();
      expect(screen.getByText(/difficile à tester exhaustivement/)).toBeInTheDocument();
      expect(screen.getByText(/considéré comme non maintenable/)).toBeInTheDocument();
    });
  });

  it('ne casse pas le design de la carte existante', () => {
    render(<MetricsPage />);

    const cyclomaticCard = screen.getByText('Complexité Cyclomatique').closest('.card');
    expect(cyclomaticCard).toBeInTheDocument();
    
    // Vérifier que les éléments de la carte sont présents (titre et valeur)
    expect(cyclomaticCard).toHaveTextContent('Complexité Cyclomatique'); // Titre
    expect(cyclomaticCard).toHaveTextContent('15'); // Valeur
    expect(cyclomaticCard).toHaveTextContent('ℹ️'); // Icône d'information
  });
});