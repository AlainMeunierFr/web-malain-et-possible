/**
 * Tests unitaires pour le composant CallToAction
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import CallToAction from '../../components/CallToAction';
import type { ElementCallToAction } from '../../utils/indexReader';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
    return React.createElement('a', { href, className }, children);
  };
});

describe('Composant CallToAction', () => {
  it('devrait afficher le texte du bouton depuis element.action', () => {
    const element: ElementCallToAction = {
      type: 'callToAction',
      action: 'Faisons connaissance...',
    };

    render(<CallToAction element={element} />);

    const bouton = screen.getByText('Faisons connaissance...');
    expect(bouton).toBeInTheDocument();
  });

  it('devrait créer un lien vers /faisons-connaissance', () => {
    const element: ElementCallToAction = {
      type: 'callToAction',
      action: 'Faisons connaissance...',
    };

    render(<CallToAction element={element} />);

    const lien = screen.getByRole('link');
    expect(lien).toHaveAttribute('href', '/faisons-connaissance');
  });

  it('devrait avoir la classe CSS callToActionContainer', () => {
    const element: ElementCallToAction = {
      type: 'callToAction',
      action: 'Test',
    };

    const { container } = render(<CallToAction element={element} />);
    const div = container.firstChild as HTMLElement;

    expect(div).toHaveClass('callToActionContainer');
  });

  it('devrait avoir la classe CSS callToActionButton sur le lien', () => {
    const element: ElementCallToAction = {
      type: 'callToAction',
      action: 'Test',
    };

    render(<CallToAction element={element} />);

    const lien = screen.getByRole('link');
    expect(lien).toHaveClass('callToActionButton');
  });
});
