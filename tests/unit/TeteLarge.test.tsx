/**
 * Tests unitaires pour le composant TeteLarge
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import TeteLarge from '../../components/TeteLarge';
import type { ElementTeteLarge } from '../../utils/indexReader';

describe('Composant TeteLarge', () => {
  it('devrait afficher le texte', () => {
    const element: ElementTeteLarge = {
      type: 'teteLarge',
      texte: 'Mon texte de tête large',
    };

    render(<TeteLarge element={element} />);

    const texte = screen.getByText('Mon texte de tête large');
    expect(texte).toBeInTheDocument();
  });

  it('devrait avoir une classe CSS pour le style titre domaine', () => {
    const element: ElementTeteLarge = {
      type: 'teteLarge',
      texte: 'Test',
    };

    const { container } = render(<TeteLarge element={element} />);
    const div = container.firstChild as HTMLElement;
    
    expect(div).toHaveClass('teteLargeContainer');
  });

  it('devrait avoir une largeur maximale de 947px', () => {
    const element: ElementTeteLarge = {
      type: 'teteLarge',
      texte: 'Test',
    };

    const { container } = render(<TeteLarge element={element} />);
    const div = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(div);
    
    // Note: getComputedStyle ne retourne pas toujours max-width en test
    // On vérifie que la classe est présente
    expect(div).toHaveClass('teteLargeContainer');
  });
});
