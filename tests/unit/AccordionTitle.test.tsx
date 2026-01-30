/**
 * Tests pour AccordionTitle - TDD
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccordionTitle from '../../components/AccordionTitle';

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div e2eid="chevron-down">Down</div>,
  ChevronUp: () => <div e2eid="chevron-up">Up</div>,
}));

describe('AccordionTitle', () => {
  it('devrait afficher le titre', () => {
    render(
      <AccordionTitle title="Test Title" level={1}>
        <div>Content</div>
      </AccordionTitle>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('devrait utiliser h1 pour level=1', () => {
    const { container } = render(
      <AccordionTitle title="Test" level={1}>
        <div>Content</div>
      </AccordionTitle>
    );
    
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('devrait utiliser h2 pour level=2', () => {
    const { container } = render(
      <AccordionTitle title="Test" level={2}>
        <div>Content</div>
      </AccordionTitle>
    );
    
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('devrait être fermé par défaut', () => {
    render(
      <AccordionTitle title="Test" level={1}>
        <div>Content</div>
      </AccordionTitle>
    );
    
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  it('devrait être ouvert si defaultOpen=true', () => {
    render(
      <AccordionTitle title="Test" level={1} defaultOpen={true}>
        <div>Content</div>
      </AccordionTitle>
    );
    
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
  });

  it('devrait ouvrir au clic', () => {
    render(
      <AccordionTitle title="Test" level={1}>
        <div>Content</div>
      </AccordionTitle>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
  });

  it('devrait fermer au second clic', () => {
    render(
      <AccordionTitle title="Test" level={1}>
        <div>Content</div>
      </AccordionTitle>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button); // Ouvrir
    fireEvent.click(button); // Fermer
    
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  it('devrait afficher le contenu enfant', () => {
    render(
      <AccordionTitle title="Test" level={1}>
        <div>Child Content</div>
      </AccordionTitle>
    );
    
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('devrait avoir les attributs ARIA corrects', () => {
    render(
      <AccordionTitle title="Test Title" level={1}>
        <div>Content</div>
      </AccordionTitle>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls');
  });
});
