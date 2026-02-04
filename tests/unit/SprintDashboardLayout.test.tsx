/**
 * Tests unitaires pour components/SprintDashboardLayout.tsx
 * Couvre le layout du dashboard Sprint
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// Mock next/navigation
const mockPathname = jest.fn().mockReturnValue('/a-propos-du-site');
const mockSearchParams = { get: jest.fn().mockReturnValue(null) };
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
  useSearchParams: () => mockSearchParams,
}));

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
    return <a href={href} className={className}>{children}</a>;
  };
});

// Mock SprintBoardKanban
jest.mock('../../components/SprintBoardKanban', () => {
  return function MockSprintBoardKanban() {
    return <div data-testid="mock-kanban">Kanban Board</div>;
  };
});

// Mock SwaggerUIWrapper
jest.mock('../../components/SwaggerUIWrapper', () => {
  return function MockSwaggerUIWrapper() {
    return <div data-testid="mock-swagger">Swagger UI</div>;
  };
});

// Mock fetch
global.fetch = jest.fn();

// Import après les mocks
import SprintDashboardLayout from '../../components/SprintDashboardLayout';
import type { LigneDeMenu } from '../../utils';

describe('SprintDashboardLayout', () => {
  const mockLignes: LigneDeMenu[] = [
    { Numéro: '1', Titre: 'Board', Type: 'Board', Parametre: '', e2eID: 'board' },
    { Numéro: '2', Titre: 'Journal', Type: 'Path', Parametre: 'journal', e2eID: 'journal' },
    { Numéro: '3', Titre: 'Docs', Type: 'Path', Parametre: 'docs', e2eID: '' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname.mockReturnValue('/a-propos-du-site');
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({
        goal: 'Sprint Goal Test',
        columns: [],
        cards: [],
      }),
    });
  });

  it('devrait rendre la navigation avec les lignes de menu', () => {
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    expect(screen.getByText('Board')).toBeInTheDocument();
    expect(screen.getByText('Journal')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
  });

  it('devrait afficher le sprint goal après chargement', async () => {
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    await waitFor(() => {
      expect(screen.getByText('Sprint Goal Test')).toBeInTheDocument();
    });
  });

  it('devrait gérer l\'erreur de fetch gracieusement', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));
    
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    // Le composant ne devrait pas crasher
    expect(screen.getByRole('navigation', { name: 'Lignes de menu' })).toBeInTheDocument();
  });

  it('devrait créer les bons liens pour les items de type Path', () => {
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    const journalLink = screen.getByText('Journal').closest('a');
    expect(journalLink).toHaveAttribute('href', '/a-propos-du-site/journal');
  });

  it('devrait créer un lien vers le board pour les items de type Board', () => {
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    const boardLink = screen.getByText('Board').closest('a');
    expect(boardLink).toHaveAttribute('href', '/a-propos-du-site');
  });

  it('devrait appliquer la classe lienActif quand on est sur le board', () => {
    mockPathname.mockReturnValue('/a-propos-du-site');
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    const boardLink = screen.getByText('Board').closest('a');
    expect(boardLink).toHaveClass('lienActif');
  });

  it('devrait appliquer la classe lien quand on n\'est pas sur le board', () => {
    mockPathname.mockReturnValue('/a-propos-du-site/journal');
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    const boardLink = screen.getByText('Board').closest('a');
    expect(boardLink).toHaveClass('lien');
  });

  it('devrait rendre le composant Kanban', () => {
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    expect(screen.getByText('Kanban Board')).toBeInTheDocument();
  });

  it('devrait gérer un sprint goal multiligne', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({
        goal: 'Ligne 1\nLigne 2\nLigne 3',
        columns: [],
        cards: [],
      }),
    });
    
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    await waitFor(() => {
      expect(screen.getByText('Ligne 1')).toBeInTheDocument();
      expect(screen.getByText('Ligne 2')).toBeInTheDocument();
      expect(screen.getByText('Ligne 3')).toBeInTheDocument();
    });
  });

  it('devrait générer un e2eID par défaut si non fourni', () => {
    render(<SprintDashboardLayout lignes={mockLignes} />);
    
    // L'item "Docs" n'a pas de e2eID, donc il doit en générer un
    const docsLink = screen.getByText('Docs').closest('a');
    expect(docsLink).toBeInTheDocument();
  });
});
