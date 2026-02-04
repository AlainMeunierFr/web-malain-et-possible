/**
 * Tests pour MarkdownRenderer - TDD
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import MarkdownRenderer from '../../components/MarkdownRenderer';

// Mock parseJournalMarkdown
jest.mock('../../utils/projet/journalMarkdownParser', () => ({
  parseJournalMarkdown: jest.fn((content: string) => ({
    parties: [
      {
        titre: 'Partie 1',
        contenuParse: [{ type: 'paragraph', content: 'Contenu partie' }],
        sousParties: [
          {
            titre: 'Sous-partie 1',
            contenuParse: [{ type: 'paragraph', content: 'Contenu sous-partie' }],
            blocs: [
              {
                titre: 'Bloc 1',
                typeDeContenu: null,
                contenuParse: [{ type: 'paragraph', content: 'Contenu bloc' }],
              },
            ],
          },
        ],
      },
    ],
  })),
}));

// Mock AboutSiteContentRenderer
jest.mock('../../components/AboutSiteContentRenderer', () => ({
  __esModule: true,
  default: ({ elements }: any) => (
    <div e2eid="about-site-renderer">
      {elements.map((el: any, i: number) => (
        <div key={i}>{el.content}</div>
      ))}
    </div>
  ),
}));

describe('MarkdownRenderer', () => {
  it('devrait afficher le contenu', () => {
    render(<MarkdownRenderer content="Test content" />);
    
    expect(screen.getByText('Partie 1')).toBeInTheDocument();
  });

  it('devrait afficher les titres h3 pour les parties', () => {
    const { container } = render(<MarkdownRenderer content="Test" />);
    
    const h3 = container.querySelector('h3');
    expect(h3).toBeInTheDocument();
    expect(h3?.textContent).toBe('Partie 1');
  });

  it('devrait afficher les titres h4 pour les sous-parties', () => {
    const { container } = render(<MarkdownRenderer content="Test" />);
    
    const h4 = container.querySelector('h4');
    expect(h4).toBeInTheDocument();
    expect(h4?.textContent).toBe('Sous-partie 1');
  });

  it('devrait afficher les titres h5 pour les blocs', () => {
    const { container } = render(<MarkdownRenderer content="Test" />);
    
    const h5 = container.querySelector('h5');
    expect(h5).toBeInTheDocument();
    expect(h5?.textContent).toBe('Bloc 1');
  });

  it('devrait afficher le contenu des parties', () => {
    render(<MarkdownRenderer content="Test" />);
    
    expect(screen.getByText('Contenu partie')).toBeInTheDocument();
  });

  it('devrait afficher le contenu des sous-parties', () => {
    render(<MarkdownRenderer content="Test" />);
    
    expect(screen.getByText('Contenu sous-partie')).toBeInTheDocument();
  });

  it('devrait afficher le contenu des blocs', () => {
    render(<MarkdownRenderer content="Test" />);
    
    expect(screen.getByText('Contenu bloc')).toBeInTheDocument();
  });

  it('devrait avoir la classe CSS markdownContent', () => {
    const { container } = render(<MarkdownRenderer content="Test" />);
    
    expect(container.querySelector('.markdownContent')).toBeInTheDocument();
  });
});
