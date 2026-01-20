/**
 * Tests pour SimpleMarkdownRenderer - TDD
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SimpleMarkdownRenderer from '../../components/SimpleMarkdownRenderer';

describe('SimpleMarkdownRenderer', () => {
  it('devrait rendre un paragraphe simple', () => {
    render(<SimpleMarkdownRenderer content="Simple text" />);
    
    expect(screen.getByText('Simple text')).toBeInTheDocument();
  });

  it('devrait rendre une liste à puces', () => {
    const content = '- Item 1\n- Item 2\n- Item 3';
    const { container } = render(<SimpleMarkdownRenderer content={content} />);
    
    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('devrait gérer des paragraphes multiples', () => {
    const content = 'Para 1\n\nPara 2';
    render(<SimpleMarkdownRenderer content={content} />);
    
    expect(screen.getByText('Para 1')).toBeInTheDocument();
    expect(screen.getByText('Para 2')).toBeInTheDocument();
  });

  it('devrait gérer du contenu vide', () => {
    const { container } = render(<SimpleMarkdownRenderer content="" />);
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('devrait rendre des listes et paragraphes mélangés', () => {
    const content = 'Intro\n\n- Item 1\n- Item 2\n\nConclusion';
    const { container } = render(<SimpleMarkdownRenderer content={content} />);
    
    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(container.querySelector('ul')).toBeInTheDocument();
    expect(screen.getByText('Conclusion')).toBeInTheDocument();
  });
});
