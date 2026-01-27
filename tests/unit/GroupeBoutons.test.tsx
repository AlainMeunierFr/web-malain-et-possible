/**
 * Tests unitaires pour le composant GroupeBoutons
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import GroupeBoutons from '../../components/GroupeBoutons';
import type { ElementGroupeBoutons } from '../../utils/indexReader';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock buttonHandlers
jest.mock('../../utils/buttonHandlers', () => ({
  getButtonAction: jest.fn((command: string, url: string | null) => {
    if (command === 'cmd-test') {
      return { type: 'internal', route: '/test' };
    }
    if (url) {
      return { type: 'external', url };
    }
    return { type: 'alert', message: 'test' };
  }),
}));

describe('Composant GroupeBoutons', () => {
  it('devrait afficher les boutons dans un conteneur', () => {
    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'petite',
      boutons: [
        {
          id: 'test1',
          icone: 'Mail',
          texte: null,
          url: 'mailto:test@test.com',
          command: null,
        },
      ],
    };

    const { container } = render(<GroupeBoutons element={element} />);
    const groupeContainer = container.firstChild as HTMLElement;

    expect(groupeContainer).toHaveClass('groupeBoutons');
  });

  it('devrait afficher les boutons horizontalement pour taille "petite"', () => {
    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'petite',
      boutons: [
        {
          id: 'test1',
          icone: 'Mail',
          texte: null,
          url: 'mailto:test@test.com',
          command: null,
        },
      ],
    };

    const { container } = render(<GroupeBoutons element={element} />);
    const groupeContainer = container.firstChild as HTMLElement;

    expect(groupeContainer).toHaveClass('groupeBoutons');
    expect(groupeContainer).toHaveClass('taillePetite');
  });

  it('devrait afficher les boutons verticalement pour taille "grande"', () => {
    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'grande',
      boutons: [
        {
          id: 'test1',
          icone: 'Mail',
          texte: 'Test',
          url: 'mailto:test@test.com',
          command: null,
        },
      ],
    };

    const { container } = render(<GroupeBoutons element={element} />);
    const groupeContainer = container.firstChild as HTMLElement;

    expect(groupeContainer).toHaveClass('groupeBoutons');
    expect(groupeContainer).toHaveClass('tailleGrande');
  });

  it('devrait afficher uniquement les icônes pour taille "petite" (sans texte)', () => {
    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'petite',
      boutons: [
        {
          id: 'test1',
          icone: 'Mail',
          texte: null,
          url: 'mailto:test@test.com',
          command: null,
        },
      ],
    };

    render(<GroupeBoutons element={element} />);

    const icone = screen.getByRole('button');
    expect(icone).toBeInTheDocument();
    // Pas de texte visible pour les boutons "petite"
    expect(icone).not.toHaveTextContent('Test');
  });

  it('devrait afficher icône et texte pour taille "grande"', () => {
    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'grande',
      boutons: [
        {
          id: 'test1',
          icone: 'Mail',
          texte: 'Envoyer email',
          url: 'mailto:test@test.com',
          command: null,
        },
      ],
    };

    render(<GroupeBoutons element={element} />);

    const bouton = screen.getByRole('button');
    expect(bouton).toBeInTheDocument();
    expect(bouton).toHaveTextContent('Envoyer email');
  });

  it('devrait avoir un style transparent pour taille petite', () => {
    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'petite',
      boutons: [
        {
          id: 'test1',
          icone: 'Mail',
          texte: null,
          url: 'mailto:test@test.com',
          command: null,
        },
      ],
    };

    const { container } = render(<GroupeBoutons element={element} />);
    const bouton = container.querySelector('button');

    // Les boutons de taille petite sont transparents (pas de fond, pas de bordure)
    expect(bouton).toHaveClass('bouton');
    // Vérifier que le conteneur a la classe taillePetite
    const groupeContainer = container.firstChild as HTMLElement;
    expect(groupeContainer).toHaveClass('taillePetite');
  });

  it('ne devrait rien afficher si icône inconnue', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'petite',
      boutons: [
        {
          id: 'test1',
          icone: 'IconeInconnue',
          texte: null,
          url: null,
          command: null,
        },
      ],
    };

    const { container } = render(<GroupeBoutons element={element} />);
    const bouton = container.querySelector('button');

    expect(bouton).not.toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Icon "IconeInconnue" not found in iconMap');
    
    consoleErrorSpy.mockRestore();
  });

  it('devrait naviguer en interne via router.push pour command', () => {
    const mockPush = jest.fn();
    const useRouter = require('next/navigation').useRouter;
    useRouter.mockReturnValue({ push: mockPush });

    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'petite',
      boutons: [
        {
          id: 'test1',
          icone: 'Mail',
          texte: null,
          url: null,
          command: 'cmd-test',
        },
      ],
    };

    render(<GroupeBoutons element={element} />);
    const bouton = screen.getByRole('button');
    bouton.click();

    expect(mockPush).toHaveBeenCalledWith('/test');
  });

  it('devrait ouvrir une URL externe via window.open', () => {
    const mockOpen = jest.fn();
    window.open = mockOpen;

    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'petite',
      boutons: [
        {
          id: 'test1',
          icone: 'Youtube',
          texte: null,
          url: 'https://youtube.com',
          command: null,
        },
      ],
    };

    render(<GroupeBoutons element={element} />);
    const bouton = screen.getByRole('button');
    bouton.click();

    expect(mockOpen).toHaveBeenCalledWith('https://youtube.com', '_blank', 'noopener,noreferrer');
  });

  // Note: Tests pour mailto: et tel: (window.location.href) non testables avec JSDOM
  // Ces cas sont couverts par les tests E2E

  it('devrait naviguer en interne pour URL locale commençant par /', () => {
    const mockPush = jest.fn();
    const useRouter = require('next/navigation').useRouter;
    useRouter.mockReturnValue({ push: mockPush });

    // Pour les URLs commençant par /, le composant n'utilise pas window.location.hostname
    // donc pas besoin de le mocker

    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'petite',
      boutons: [
        {
          id: 'test1',
          icone: 'Mail',
          texte: null,
          url: '/about',
          command: null,
        },
      ],
    };

    render(<GroupeBoutons element={element} />);
    const bouton = screen.getByRole('button');
    bouton.click();

    expect(mockPush).toHaveBeenCalledWith('/about');
  });

  it('devrait naviguer en interne pour URL localhost', () => {
    const mockPush = jest.fn();
    const useRouter = require('next/navigation').useRouter;
    useRouter.mockReturnValue({ push: mockPush });

    // Pour les URLs commençant par http://localhost, le composant vérifie d'abord
    // bouton.url.startsWith('http://localhost'), donc pas besoin de mocker window.location.hostname

    const element: ElementGroupeBoutons = {
      type: 'groupeBoutons',
      taille: 'petite',
      boutons: [
        {
          id: 'test1',
          icone: 'Mail',
          texte: null,
          url: 'http://localhost:3000/about',
          command: null,
        },
      ],
    };

    render(<GroupeBoutons element={element} />);
    const bouton = screen.getByRole('button');
    bouton.click();

    expect(mockPush).toHaveBeenCalledWith('/about');
  });
});
