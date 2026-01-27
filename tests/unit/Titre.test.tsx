/**
 * Tests unitaires pour le composant Titre
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Titre from '../../components/Titre';
import type { ElementTitre } from '../../utils/indexReader';

describe('Composant Titre', () => {
  it('devrait afficher le texte dans un h1', () => {
    const element: ElementTitre = {
      type: 'titre',
      texte: 'Mon titre de page',
    };

    render(<Titre element={element} />);

    const titre = screen.getByRole('heading', { level: 1 });
    expect(titre).toBeInTheDocument();
    expect(titre).toHaveTextContent('Mon titre de page');
  });

  it('devrait avoir une classe CSS pour la bande bleue', () => {
    const element: ElementTitre = {
      type: 'titre',
      texte: 'Test',
    };

    const { container } = render(<Titre element={element} />);
    const div = container.firstChild as HTMLElement;
    
    expect(div).toHaveClass('titre');
  });
});
