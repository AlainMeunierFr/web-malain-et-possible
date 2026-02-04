/**
 * Tests unitaires pour le composant Temoignages
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Temoignages from '../../components/Temoignages';
import type { ElementListeDeTemoignages } from '../../utils';

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
    return React.createElement('img', { src, alt, width, height, className, 'e2eid': 'next-image' });
  },
}));

describe('Composant Temoignages', () => {
  const mockElement: ElementListeDeTemoignages = {
    type: 'listeDeTemoignages',
    items: [
      {
        type: 'temoignage',
        nom: 'Test Nom',
        fonction: 'Test Fonction',
        photo: 'test.jpg',
        temoignage: 'Premier paragraphe.\n\nDeuxième paragraphe.',
      },
      {
        type: 'temoignage',
        nom: 'Test Nom 2',
        fonction: 'Test Fonction 2',
        photo: 'test2.jpg',
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

  it('devrait afficher les noms en tant que h3', () => {
    render(<Temoignages element={mockElement} />);

    const nom1 = screen.getByText('Test Nom');
    expect(nom1.tagName).toBe('H3');

    const nom2 = screen.getByText('Test Nom 2');
    expect(nom2.tagName).toBe('H3');
  });

  it('devrait afficher les photos avec les bons attributs', () => {
    render(<Temoignages element={mockElement} />);

    const images = screen.getAllByTestId('next-image');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/api/images/json/test.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Test Nom');
    expect(images[1]).toHaveAttribute('src', '/api/images/json/test2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Test Nom 2');
  });

  it('devrait séparer les témoignages en paragraphes', () => {
    render(<Temoignages element={mockElement} />);

    // Vérifier que les paragraphes sont bien séparés
    const paragraphes = screen.getAllByText(/Premier paragraphe|Deuxième paragraphe|Un seul paragraphe/);
    expect(paragraphes.length).toBeGreaterThanOrEqual(3);
  });

  it('devrait avoir la classe CSS temoignages', () => {
    const { container } = render(<Temoignages element={mockElement} />);
    const div = container.firstChild as HTMLElement;

    expect(div).toHaveClass('temoignages');
  });

  it('devrait gérer un témoignage vide', () => {
    const emptyElement: ElementListeDeTemoignages = {
      type: 'listeDeTemoignages',
      items: [],
    };

    const { container } = render(<Temoignages element={emptyElement} />);
    
    // Le composant retourne null quand items est vide
    expect(container.firstChild).toBeNull();
  });
});
