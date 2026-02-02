/**
 * Tests pour la page Maintenance - US-Assistant-Scenario
 * En dev : affiche l'assistant ; en prod : redirection si non authentifié, œuf de Pâques si authentifié.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import MaintenancePage from '../../app/(main)/maintenance/page';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockIsDevelopment = jest.fn();
jest.mock('../../utils/environment', () => ({
  isDevelopment: () => mockIsDevelopment(),
}));

const mockIsAuthenticated = jest.fn();
jest.mock('../../contexts/EditingContext', () => ({
  useEditing: () => ({ isAuthenticated: mockIsAuthenticated() }),
  EditingProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../components/AssistantScenario', () => ({
  __esModule: true,
  default: () => <div e2eid="assistant-scenario">Assistant de construction de scénario</div>,
}));

jest.mock('lucide-react', () => ({
  Egg: () => <span data-testid="easter-egg-icon">Egg</span>,
}));

jest.mock('../../components/CallToAction', () => ({
  __esModule: true,
  default: () => <div data-testid="call-to-action">Faisons connaissance</div>,
}));

describe('MaintenancePage', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('en développement affiche l’assistant (sans mot de passe)', () => {
    mockIsDevelopment.mockReturnValue(true);
    mockIsAuthenticated.mockReturnValue(false);
    render(<MaintenancePage />);
    expect(screen.getByTestId('assistant-scenario')).toBeInTheDocument();
    expect(screen.getByText(/Assistant de construction de scénario/i)).toBeInTheDocument();
  });

  it('en production sans authentification ne rend rien et redirige vers /', () => {
    mockIsDevelopment.mockReturnValue(false);
    mockIsAuthenticated.mockReturnValue(false);
    render(<MaintenancePage />);
    expect(screen.queryByTestId('assistant-scenario')).not.toBeInTheDocument();
    expect(screen.queryByTestId('easter-egg-icon')).not.toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('en production avec authentification affiche l’œuf de Pâques', () => {
    mockIsDevelopment.mockReturnValue(false);
    mockIsAuthenticated.mockReturnValue(true);
    render(<MaintenancePage />);
    expect(screen.getByText('Egg')).toBeInTheDocument();
    expect(screen.getByText(/Bravo/i)).toBeInTheDocument();
    expect(screen.getByText(/Faisons connaissance/)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
