/**
 * Tests pour la page Maintenance
 * Sans authentification : redirection vers / ; avec authentification : œuf de Pâques.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import MaintenancePage from '../../app/(main)/maintenance/page';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockIsAuthenticated = jest.fn();
jest.mock('../../contexts/EditingContext', () => ({
  useEditing: () => ({ isAuthenticated: mockIsAuthenticated() }),
  EditingProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('lucide-react', () => ({
  Egg: () => <span data-testid="easter-egg-icon">Egg</span>,
}));

jest.mock('../../components/CallToAction', () => ({
  __esModule: true,
  default: () => <div data-testid="call-to-action">Faisons connaissance</div>,
}));

const mockIsDevelopment = jest.fn();
jest.mock('../../utils/client', () => ({
  ...jest.requireActual('../../utils/client'),
  isDevelopment: () => mockIsDevelopment(),
}));

describe('MaintenancePage', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockIsDevelopment.mockReturnValue(false);
  });

  it('sans authentification ne rend rien et redirige vers /', () => {
    mockIsAuthenticated.mockReturnValue(false);
    render(<MaintenancePage />);
    expect(screen.queryByTestId('easter-egg-icon')).not.toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('avec authentification affiche oeuf de Paques', () => {
    mockIsAuthenticated.mockReturnValue(true);
    render(<MaintenancePage />);
    expect(screen.getByText('Egg')).toBeInTheDocument();
    expect(screen.getByText(/Bravo/i)).toBeInTheDocument();
    expect(screen.getByText(/Faisons connaissance/)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
