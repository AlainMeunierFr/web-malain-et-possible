/**
 * Tests pour Prompt - TDD
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Prompt from '../../components/Prompt';

// Mock SimpleMarkdownRenderer
jest.mock('../../components/SimpleMarkdownRenderer', () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => <div data-e2eid="markdown-content">{content}</div>,
}));

describe('Prompt', () => {
  it('devrait afficher le contenu', () => {
    render(<Prompt content="Test content" />);
    
    expect(screen.getByTestId('markdown-content')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('devrait avoir la classe CSS prompt', () => {
    const { container } = render(<Prompt content="Test" />);
    
    expect(container.firstChild).toHaveClass('prompt');
  });

  it('devrait gérer du contenu vide', () => {
    const { container } = render(<Prompt content="" />);
    
    expect(container.firstChild).toBeInTheDocument();
  });
});
