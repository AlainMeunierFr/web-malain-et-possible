/**
 * Tests pour AboutSiteContentRenderer
 * Approche TDD : Tests pour atteindre 100% de couverture
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutSiteContentRenderer from '../../components/AboutSiteContentRenderer';
import type { ContenuElement } from '../../utils/aboutSiteReader';

describe('AboutSiteContentRenderer', () => {
  it('devrait rendre un paragraphe simple', () => {
    // ARRANGE
    const elements: ContenuElement[] = [
      {
        type: 'paragraph',
        content: 'Texte de test',
      },
    ];

    // ACT
    render(<AboutSiteContentRenderer elements={elements} />);
    
    // ASSERT
    expect(screen.getByText('Texte de test')).toBeInTheDocument();
  });

  it('devrait rendre du texte en gras (**bold**) dans une liste avec typeDeContenu', () => {
    // ARRANGE
    const elements: ContenuElement[] = [
      {
        type: 'ul',
        typeDeContenu: 'En tant que',
        items: ['Texte avec **gras** dedans'],
      },
    ];

    // ACT
    const { container } = render(<AboutSiteContentRenderer elements={elements} />);
    
    // ASSERT
    const strong = container.querySelector('strong');
    expect(strong).toBeInTheDocument();
    expect(strong?.textContent).toBe('gras');
  });

  it('devrait rendre une liste ordonnée', () => {
    // ARRANGE
    const elements: ContenuElement[] = [
      {
        type: 'ol',
        items: ['Premier élément', 'Deuxième élément'],
      },
    ];

    // ACT
    render(<AboutSiteContentRenderer elements={elements} />);
    
    // ASSERT
    expect(screen.getByText('Premier élément')).toBeInTheDocument();
    expect(screen.getByText('Deuxième élément')).toBeInTheDocument();
  });

  it('devrait rendre une liste avec typeDeContenu', () => {
    // ARRANGE
    const elements: ContenuElement[] = [
      {
        type: 'ul',
        typeDeContenu: 'En tant que',
        items: ['Utilisateur du site'],
      },
    ];

    // ACT
    const { container } = render(<AboutSiteContentRenderer elements={elements} />);
    
    // ASSERT
    const ul = container.querySelector('ul[data-type-contenu="En tant que"]');
    expect(ul).toBeInTheDocument();
  });

  it('devrait rendre une liste à puces', () => {
    // ARRANGE
    const elements: ContenuElement[] = [
      {
        type: 'ul',
        items: ['Item de liste 1', 'Item de liste 2'],
      },
    ];

    // ACT
    const { container } = render(<AboutSiteContentRenderer elements={elements} />);
    
    // ASSERT
    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
  });

  it('devrait utiliser un conteneur Prompt quand typeDeContenu="Prompt"', () => {
    // ARRANGE
    const elements: ContenuElement[] = [
      {
        type: 'paragraph',
        content: 'Contenu',
      },
    ];

    // ACT
    const { container } = render(
      <AboutSiteContentRenderer elements={elements} typeDeContenu="Prompt" />
    );
    
    // ASSERT
    expect(container.querySelector('.promptContainer')).toBeInTheDocument();
  });

  it('devrait gérer des éléments vides', () => {
    // ARRANGE
    const elements: ContenuElement[] = [];

    // ACT
    const { container } = render(<AboutSiteContentRenderer elements={elements} />);
    
    // ASSERT
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('devrait gérer plusieurs éléments de types différents', () => {
    // ARRANGE
    const elements: ContenuElement[] = [
      {
        type: 'paragraph',
        content: 'Paragraphe',
      },
      {
        type: 'ul',
        items: ['Item liste'],
      },
      {
        type: 'ol',
        items: ['Item numéroté'],
      },
    ];

    // ACT
    render(<AboutSiteContentRenderer elements={elements} />);
    
    // ASSERT
    expect(screen.getByText('Paragraphe')).toBeInTheDocument();
    expect(screen.getByText('Item liste')).toBeInTheDocument();
    expect(screen.getByText('Item numéroté')).toBeInTheDocument();
  });
});
