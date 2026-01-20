/**
 * Tests pour DomaineDeCompetences - TDD
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import DomaineDeCompetences from '../../components/DomaineDeCompetences';
import type { DomaineDeCompetences as DomaineType } from '../../utils/indexReader';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Rocket: () => <div data-testid="icon-rocket">Rocket</div>,
  Globe: () => <div data-testid="icon-globe">Globe</div>,
  MessageCircle: () => <div data-testid="icon-message">Message</div>,
  Puzzle: () => <div data-testid="icon-puzzle">Puzzle</div>,
  Binoculars: () => <div data-testid="icon-binoculars">Binoculars</div>,
  Users: () => <div data-testid="icon-users">Users</div>,
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('DomaineDeCompetences', () => {
  const mockDomaine: DomaineType = {
    titre: 'Test Domaine',
    contenu: 'Description test',
    items: [
      { 
        titre: 'Compétence 1',
        icon: 'Rocket',
        description: 'Description 1',
        bouton: { texte: 'En savoir plus', action: '/test1' },
      },
      { 
        titre: 'Compétence 2',
        icon: 'Globe',
        description: 'Description 2',
        bouton: { texte: 'En savoir plus', action: '/test2' },
      },
    ],
  };

  it('devrait afficher le titre du domaine', () => {
    render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    expect(screen.getByText('Test Domaine')).toBeInTheDocument();
  });

  it('devrait afficher le contenu du domaine', () => {
    render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    expect(screen.getByText('Description test')).toBeInTheDocument();
  });

  it('devrait afficher tous les items', () => {
    render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    expect(screen.getByText('Compétence 1')).toBeInTheDocument();
    expect(screen.getByText('Compétence 2')).toBeInTheDocument();
  });

  it('devrait afficher les icônes', () => {
    render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    expect(screen.getByTestId('icon-rocket')).toBeInTheDocument();
    expect(screen.getByTestId('icon-globe')).toBeInTheDocument();
  });

  it('devrait créer des liens vers les pages', () => {
    const { container } = render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    const links = container.querySelectorAll('a');
    expect(links.length).toBe(2);
    expect(links[0]).toHaveAttribute('href', '/test1');
    expect(links[1]).toHaveAttribute('href', '/test2');
  });

  it('devrait parser le markdown bold dans les descriptions', () => {
    const domaineWithBold: DomaineType = {
      titre: 'Test',
      contenu: 'Description',
      items: [
        {
          titre: 'Compétence',
          description: 'Text with **bold** content',
        },
      ],
    };

    const { container } = render(<DomaineDeCompetences domaine={domaineWithBold} />);
    
    const strong = container.querySelector('strong');
    expect(strong).toBeInTheDocument();
    expect(strong?.textContent).toBe('bold');
  });

  it('devrait gérer un domaine sans items', () => {
    const domaineEmpty: DomaineType = {
      titre: 'Empty',
      contenu: 'No items',
      items: [],
    };

    const { container } = render(<DomaineDeCompetences domaine={domaineEmpty} />);
    
    expect(container.querySelector('h2')).toBeInTheDocument();
  });
});
