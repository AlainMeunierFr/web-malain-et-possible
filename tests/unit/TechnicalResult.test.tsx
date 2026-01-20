/**
 * Tests pour TechnicalResult - TDD
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import TechnicalResult from '../../components/TechnicalResult';

// Mock SimpleMarkdownRenderer
jest.mock('../../components/SimpleMarkdownRenderer', () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => <div data-testid="markdown-content">{content}</div>,
}));

describe('TechnicalResult', () => {
  it('devrait afficher le contenu', () => {
    render(<TechnicalResult content="Test result" />);
    
    expect(screen.getByTestId('markdown-content')).toBeInTheDocument();
    expect(screen.getByText('Test result')).toBeInTheDocument();
  });

  it('devrait avoir la classe CSS technicalResult', () => {
    const { container } = render(<TechnicalResult content="Test" />);
    
    expect(container.firstChild).toHaveClass('technicalResult');
  });

  it('devrait gérer du contenu vide', () => {
    const { container } = render(<TechnicalResult content="" />);
    
    expect(container.firstChild).toBeInTheDocument();
  });
});
