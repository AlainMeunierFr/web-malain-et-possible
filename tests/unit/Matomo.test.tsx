/**
 * Tests unitaires pour components/Matomo.tsx
 * Couvre le composant de tracking Matomo
 */

import React from 'react';
import { render } from '@testing-library/react';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
  useSearchParams: () => ({
    toString: () => '',
  }),
}));

// Import après les mocks
import Matomo from '../../components/Matomo';

describe('Matomo', () => {
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window._paq
    delete (window as any)._paq;
    // Mock console
    console.warn = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
  });

  it('devrait rendre null (composant invisible)', () => {
    const { container } = render(<Matomo />);
    expect(container.firstChild).toBeNull();
  });

  it('devrait avertir si les variables d\'environnement ne sont pas définies', () => {
    render(<Matomo matomoUrl={undefined} siteId={undefined} />);
    
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('Variables d\'environnement non définies')
    );
  });

  it('devrait initialiser _paq si matomoUrl et siteId sont fournis', () => {
    render(<Matomo matomoUrl="https://matomo.example.com" siteId="1" />);
    
    expect(window._paq).toBeDefined();
    expect(Array.isArray(window._paq)).toBe(true);
  });

  it('devrait configurer le tracker avec les bonnes valeurs', () => {
    render(<Matomo matomoUrl="https://matomo.example.com/" siteId="42" />);
    
    // Vérifier que _paq contient les configurations
    expect(window._paq).toBeDefined();
    const paqCommands = window._paq.map((cmd: unknown[]) => cmd[0]);
    expect(paqCommands).toContain('setTrackerUrl');
    expect(paqCommands).toContain('setSiteId');
    expect(paqCommands).toContain('enableLinkTracking');
  });

  it('devrait retirer le slash final de l\'URL Matomo', () => {
    render(<Matomo matomoUrl="https://matomo.example.com/" siteId="1" />);
    
    const setTrackerUrlCmd = window._paq.find((cmd: unknown[]) => cmd[0] === 'setTrackerUrl');
    expect(setTrackerUrlCmd).toBeDefined();
    expect(setTrackerUrlCmd![1]).toBe('https://matomo.example.com/matomo.php');
  });

  it('devrait tracker les changements de page', () => {
    render(<Matomo matomoUrl="https://matomo.example.com" siteId="1" />);
    
    const paqCommands = window._paq.map((cmd: unknown[]) => cmd[0]);
    expect(paqCommands).toContain('setCustomUrl');
    expect(paqCommands).toContain('trackPageView');
  });
});
