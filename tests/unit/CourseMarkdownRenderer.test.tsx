/**
 * Tests pour CourseMarkdownRenderer - TDD (tests basiques)
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseMarkdownRenderer from '../../components/CourseMarkdownRenderer';

describe('CourseMarkdownRenderer', () => {
  it('devrait afficher un paragraphe simple', () => {
    render(<CourseMarkdownRenderer content="Simple text" />);
    
    expect(screen.getByText('Simple text')).toBeInTheDocument();
  });

  it('devrait afficher un titre h3 pour # (décalage +2)', () => {
    const { container } = render(<CourseMarkdownRenderer content="# Titre niveau 1 MD" />);
    
    const h3 = container.querySelector('h3');
    expect(h3).toBeInTheDocument();
    expect(h3?.textContent).toBe('Titre niveau 1 MD');
  });

  it('devrait afficher un titre h4 pour ## (décalage +2)', () => {
    const { container } = render(<CourseMarkdownRenderer content="## Titre niveau 2 MD" />);
    
    const h4 = container.querySelector('h4');
    expect(h4).toBeInTheDocument();
    expect(h4?.textContent).toBe('Titre niveau 2 MD');
  });

  it('devrait afficher un titre h5 pour ### (décalage +2)', () => {
    const { container } = render(<CourseMarkdownRenderer content="### Titre niveau 3 MD" />);
    
    const h5 = container.querySelector('h5');
    expect(h5).toBeInTheDocument();
    expect(h5?.textContent).toBe('Titre niveau 3 MD');
  });

  it('devrait afficher un titre h6 pour #### (décalage +2)', () => {
    const { container } = render(<CourseMarkdownRenderer content="#### Titre niveau 4 MD" />);
    
    const h6 = container.querySelector('h6');
    expect(h6).toBeInTheDocument();
    expect(h6?.textContent).toBe('Titre niveau 4 MD');
  });

  it('devrait afficher une liste', () => {
    const content = '- Item 1\n- Item 2';
    const { container } = render(<CourseMarkdownRenderer content={content} />);
    
    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('devrait afficher du texte en gras', () => {
    const { container } = render(<CourseMarkdownRenderer content="Text with **bold** content" />);
    
    const strong = container.querySelector('strong');
    expect(strong).toBeInTheDocument();
    expect(strong?.textContent).toBe('bold');
  });

  it('devrait afficher un bloc de code', () => {
    const content = '```\nconst x = 1;\n```';
    const { container } = render(<CourseMarkdownRenderer content={content} />);
    
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
  });

  it('devrait afficher une citation', () => {
    const { container } = render(<CourseMarkdownRenderer content="> Quote text" />);
    
    const blockquote = container.querySelector('blockquote');
    expect(blockquote).toBeInTheDocument();
    expect(screen.getByText('Quote text')).toBeInTheDocument();
  });

  it('devrait gérer du contenu vide', () => {
    const { container } = render(<CourseMarkdownRenderer content="" />);
    
    expect(container.querySelector('.markdownContent')).toBeInTheDocument();
  });

  it('devrait gérer plusieurs paragraphes', () => {
    const content = 'Para 1\n\nPara 2';
    render(<CourseMarkdownRenderer content={content} />);
    
    expect(screen.getByText('Para 1')).toBeInTheDocument();
    expect(screen.getByText('Para 2')).toBeInTheDocument();
  });

  describe('mots-clés US', () => {
    it('devrait rendre "En tant que" en gras, pas comme titre', () => {
      const { container } = render(<CourseMarkdownRenderer content="## En tant que développeur" />);
      
      // Pas de h4 (## + 2 = h4)
      expect(container.querySelector('h4')).not.toBeInTheDocument();
      // Un paragraphe avec le mot-clé en gras
      const p = container.querySelector('p.usKeyword');
      expect(p).toBeInTheDocument();
      expect(p?.querySelector('strong')?.textContent).toBe('En tant que');
      expect(p?.textContent).toContain('développeur');
    });

    it('devrait rendre "Je souhaite" en gras, pas comme titre', () => {
      const { container } = render(<CourseMarkdownRenderer content="## Je souhaite avoir un script" />);
      
      expect(container.querySelector('h4')).not.toBeInTheDocument();
      const p = container.querySelector('p.usKeyword');
      expect(p).toBeInTheDocument();
      expect(p?.querySelector('strong')?.textContent).toBe('Je souhaite');
    });

    it('devrait rendre "Afin de" en gras, pas comme titre', () => {
      const { container } = render(<CourseMarkdownRenderer content="## Afin de faciliter les tests" />);
      
      expect(container.querySelector('h4')).not.toBeInTheDocument();
      const p = container.querySelector('p.usKeyword');
      expect(p).toBeInTheDocument();
      expect(p?.querySelector('strong')?.textContent).toBe('Afin de');
    });

    it('devrait rendre "Je veux" en gras comme variante de "Je souhaite"', () => {
      const { container } = render(<CourseMarkdownRenderer content="## Je veux avoir un outil" />);
      
      expect(container.querySelector('h4')).not.toBeInTheDocument();
      const p = container.querySelector('p.usKeyword');
      expect(p).toBeInTheDocument();
      expect(p?.querySelector('strong')?.textContent).toBe('Je veux');
    });
  });
});
