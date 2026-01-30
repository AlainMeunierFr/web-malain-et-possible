/**
 * Tests pour JournalList - TDD
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JournalList from '../../components/JournalList';
import type { JournalFile } from '../../utils/journalReader';

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div e2eid="chevron-down">Down</div>,
  ChevronUp: () => <div e2eid="chevron-up">Up</div>,
}));

// Mock MarkdownRenderer
jest.mock('../../components/MarkdownRenderer', () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => <div e2eid="journal-content">{content}</div>,
}));

describe('JournalList', () => {
  const mockJournals: JournalFile[] = [
    { filename: '2024-01-01.md', content: 'Journal 1 content' },
    { filename: '2024-01-02.md', content: 'Journal 2 content' },
  ];

  it('devrait afficher un message si aucun journal', () => {
    render(<JournalList journals={[]} />);
    
    expect(screen.getByText('Aucun journal disponible.')).toBeInTheDocument();
  });

  it('devrait afficher tous les journaux', () => {
    render(<JournalList journals={mockJournals} />);
    
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('2024-01-02')).toBeInTheDocument();
  });

  it('devrait retirer .md du nom de fichier', () => {
    render(<JournalList journals={mockJournals} />);
    
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.queryByText('2024-01-01.md')).not.toBeInTheDocument();
  });

  it('devrait être fermé par défaut', () => {
    const { container } = render(<JournalList journals={mockJournals} />);
    
    const closedElements = container.querySelectorAll('.closed');
    expect(closedElements.length).toBeGreaterThan(0);
  });

  it('devrait ouvrir un journal au clic', () => {
    render(<JournalList journals={mockJournals} />);
    
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    
    const chevronUp = screen.getAllByTestId('chevron-up');
    expect(chevronUp.length).toBeGreaterThan(0);
  });

  it('devrait fermer un journal ouvert au clic', () => {
    render(<JournalList journals={mockJournals} />);
    
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); // Ouvrir
    fireEvent.click(buttons[0]); // Fermer
    
    const chevronDown = screen.getAllByTestId('chevron-down');
    expect(chevronDown.length).toBe(2); // Les 2 journaux fermés
  });

  it('devrait afficher le contenu du journal', () => {
    render(<JournalList journals={mockJournals} />);
    
    expect(screen.getByText('Journal 1 content')).toBeInTheDocument();
    expect(screen.getByText('Journal 2 content')).toBeInTheDocument();
  });
});
