/**
 * Tests d'accessibilité automatisés avec jest-axe.
 * Vérifie que les composants respectent les règles WCAG.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Étendre les matchers Jest
expect.extend(toHaveNoViolations);

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock contexts
jest.mock('../../contexts/EditingContext', () => ({
  useEditing: () => ({ isAuthenticated: false, setIsAuthenticated: jest.fn() }),
  EditingProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('../../contexts/PageTitleContext', () => ({
  usePageTitle: () => ({ pageTitle: 'Test', setPageTitle: jest.fn() }),
  PageTitleProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock fetch pour Footer
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ version: '1.0.0' }),
  })
) as jest.Mock;

// Import des composants à tester
import Titre from '../../components/Titre';
import CallToAction from '../../components/CallToAction';
import Footer from '../../components/Footer';
import type { ElementTitre, ElementCallToAction } from '../../utils';

describe('Tests d\'accessibilité (jest-axe)', () => {
  describe('Composant Titre', () => {
    it('ne devrait pas avoir de violations d\'accessibilité', async () => {
      const element: ElementTitre = {
        type: 'titre',
        texte: 'Mon titre de section',
      };

      const { container } = render(<Titre element={element} />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('Composant CallToAction', () => {
    it('ne devrait pas avoir de violations d\'accessibilité', async () => {
      const element: ElementCallToAction = {
        type: 'callToAction',
        action: 'Contactez-moi',
      };

      const { container } = render(<CallToAction element={element} />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  describe('Composant Footer', () => {
    it('ne devrait pas avoir de violations d\'accessibilité', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
