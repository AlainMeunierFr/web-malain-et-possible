/**
 * Tests unitaires pour le composant Temoignages
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Temoignages from '../../components/Temoignages';
import type { ElementTemoignages } from '../../utils/indexReader';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: { 
    src: string; 
    alt: string; 
    width: number; 
    height: number; 
    className?: string;
  }) => {
    return React.createElement('img', { src, alt, width, height, className, 'data-testid': 'next-image' });
  },
}));

describe('Composant Temoignages', () => {
  const mockElement: ElementTemoignages = {
    type: 'temoignages',
    items: [
      {
        nom: 'Test Nom',
        fonction: 'Test Fonction',
        photo: '/images/test.jpg',
        temoignage: 'Premier paragraphe.\n\nDeuxième paragraphe.',
      },
      {
        nom: 'Test Nom 2',
        fonction: 'Test Fonction 2',
        photo: '/images/test2.jpg',
        temoignage: 'Un seul paragraphe.',
      },
    ],
  };

  it('devrait afficher tous les témoignages', () => {
    render(<Temoignages element={mockElement} />);

    expect(screen.getByText('Test Nom')).toBeInTheDocument();
    expect(screen.getByText('Test Fonction')).toBeInTheDocument();
    expect(screen.getByText('Test Nom 2')).toBeInTheDocument();
    expect(screen.getByText('Test Fonction 2')).toBeInTheDocument();
  });

  it('devrait afficher les noms en tant que h2', () => {
    render(<Temoignages element={mockElement} />);

    const nom1 = screen.getByText('Test Nom');
    expect(nom1.tagName).toBe('H2');

    const nom2 = screen.getByText('Test Nom 2');
    expect(nom2.tagName).toBe('H2');
  });

  it('devrait afficher les photos avec les bons attributs', () => {
    render(<Temoignages element={mockElement} />);

    const images = screen.getAllByTestId('next-image');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/images/test.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Test Nom');
    expect(images[1]).toHaveAttribute('src', '/images/test2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Test Nom 2');
  });

  it('devrait séparer les témoignages en paragraphes', () => {
    render(<Temoignages element={mockElement} />);

    // Vérifier que les paragraphes sont bien séparés
    const paragraphes = screen.getAllByText(/Premier paragraphe|Deuxième paragraphe|Un seul paragraphe/);
    expect(paragraphes.length).toBeGreaterThanOrEqual(3);
  });

  it('devrait avoir la classe CSS container', () => {
    const { container } = render(<Temoignages element={mockElement} />);
    const div = container.firstChild as HTMLElement;

    expect(div).toHaveClass('container');
  });

  it('devrait gérer un témoignage vide', () => {
    const emptyElement: ElementTemoignages = {
      type: 'temoignages',
      items: [],
    };

    const { container } = render(<Temoignages element={emptyElement} />);
    
    // Vérifier que le composant se rend sans erreur
    expect(container.firstChild).toBeInTheDocument();
    expect(container.querySelector('.container')).toBeInTheDocument();
  });
});
