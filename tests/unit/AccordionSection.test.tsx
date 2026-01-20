/**
 * Tests pour AccordionSection - TDD
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccordionSection from '../../components/AccordionSection';

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down">Down</div>,
  ChevronUp: () => <div data-testid="chevron-up">Up</div>,
}));

describe('AccordionSection', () => {
  it('devrait afficher le titre', () => {
    render(<AccordionSection title="Test Title">Content</AccordionSection>);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('devrait être fermé par défaut', () => {
    const { container } = render(<AccordionSection title="Test">Content</AccordionSection>);
    
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    expect(container.querySelector('.closed')).toBeInTheDocument();
  });

  it('devrait pouvoir être ouvert par défaut', () => {
    const { container } = render(<AccordionSection title="Test" defaultOpen={true}>Content</AccordionSection>);
    
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
    expect(container.querySelector('.open')).toBeInTheDocument();
  });

  it('devrait s\ouvrir au clic', () => {
    render(<AccordionSection title="Test">Content</AccordionSection>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
  });

  it('devrait se fermer au clic quand ouvert', () => {
    render(<AccordionSection title="Test" defaultOpen={true}>Content</AccordionSection>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  it('devrait afficher le contenu enfant', () => {
    render(<AccordionSection title="Test"><div>Child content</div></AccordionSection>);
    
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
