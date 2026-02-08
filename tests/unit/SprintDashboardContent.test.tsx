/**
 * Tests pour SprintDashboardContent (contenu page A propos : sprint / openapi / metrics)
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SprintDashboardContent from '../../components/SprintDashboardContent';

const mockGet = jest.fn();
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: mockGet }),
}));

jest.mock('../../components/SprintBoardKanban', () => ({
  __esModule: true,
  default: () => <div data-testid="sprint-board">SprintBoard</div>,
}));

jest.mock('../../components/SwaggerUIWrapper', () => ({
  __esModule: true,
  default: () => <section aria-label="Documentation API">Swagger</section>,
}));

jest.mock('../../components/MetricsCompact', () => ({
  __esModule: true,
  default: () => <section aria-label="Métriques de qualité">Métriques</section>,
}));

const mockFetch = jest.fn();
beforeEach(() => {
  mockGet.mockReturnValue(null);
  mockFetch.mockResolvedValue({
    json: () => Promise.resolve({ goal: 'Objectif sprint', columns: [], cards: [] }),
  });
  global.fetch = mockFetch;
});

describe('SprintDashboardContent', () => {
  it('affiche la zone Sprint par défaut et charge le board', async () => {
    render(<SprintDashboardContent />);
    expect(await screen.findByText('Objectif sprint')).toBeInTheDocument();
    expect(screen.getByText('SprintBoard')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /sprint en cours/i })).toBeInTheDocument();
  });

  it('affiche la zone OpenAPI quand view=openapi', () => {
    mockGet.mockImplementation((key: string) => (key === 'view' ? 'openapi' : null));
    render(<SprintDashboardContent />);
    expect(screen.getByText('Swagger')).toBeInTheDocument();
  });

  it('affiche la zone Métriques quand view=metrics', () => {
    mockGet.mockImplementation((key: string) => (key === 'view' ? 'metrics' : null));
    render(<SprintDashboardContent />);
    expect(screen.getByText('Métriques')).toBeInTheDocument();
  });

  it('gère l\'échec du fetch du sprint board', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    render(<SprintDashboardContent />);
    await waitFor(() => {
      expect(screen.getByText('SprintBoard')).toBeInTheDocument();
    });
  });
});
