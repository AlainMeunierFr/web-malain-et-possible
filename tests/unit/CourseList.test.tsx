/**
 * Tests pour CourseList - TDD
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseList from '../../components/CourseList';
import type { CourseFile } from '../../utils/journalReader';

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down">Down</div>,
  ChevronUp: () => <div data-testid="chevron-up">Up</div>,
}));

// Mock CourseMarkdownRenderer
jest.mock('../../components/CourseMarkdownRenderer', () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => <div data-testid="course-content">{content}</div>,
}));

describe('CourseList', () => {
  const mockCourses: CourseFile[] = [
    { filename: 'course1.md', content: 'Course 1 content' },
    { filename: 'course2.md', content: 'Course 2 content' },
  ];

  it('devrait afficher un message si aucun cours', () => {
    render(<CourseList courses={[]} />);
    
    expect(screen.getByText('Aucun cours disponible.')).toBeInTheDocument();
  });

  it('devrait afficher tous les cours', () => {
    render(<CourseList courses={mockCourses} />);
    
    expect(screen.getByText('course1')).toBeInTheDocument();
    expect(screen.getByText('course2')).toBeInTheDocument();
  });

  it('devrait retirer .md du nom de fichier', () => {
    render(<CourseList courses={mockCourses} />);
    
    expect(screen.getByText('course1')).toBeInTheDocument();
    expect(screen.queryByText('course1.md')).not.toBeInTheDocument();
  });

  it('devrait être fermé par défaut', () => {
    const { container } = render(<CourseList courses={mockCourses} />);
    
    const closedElements = container.querySelectorAll('.closed');
    expect(closedElements.length).toBeGreaterThan(0);
  });

  it('devrait ouvrir un cours au clic', () => {
    render(<CourseList courses={mockCourses} />);
    
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    
    const chevronUp = screen.getAllByTestId('chevron-up');
    expect(chevronUp.length).toBeGreaterThan(0);
  });

  it('devrait fermer un cours ouvert au clic', () => {
    render(<CourseList courses={mockCourses} />);
    
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); // Ouvrir
    fireEvent.click(buttons[0]); // Fermer
    
    const chevronDown = screen.getAllByTestId('chevron-down');
    expect(chevronDown.length).toBe(2); // Les 2 cours fermés
  });

  it('devrait afficher le contenu du cours', () => {
    render(<CourseList courses={mockCourses} />);
    
    expect(screen.getByText('Course 1 content')).toBeInTheDocument();
    expect(screen.getByText('Course 2 content')).toBeInTheDocument();
  });
});
