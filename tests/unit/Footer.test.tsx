/**
 * Tests pour Footer - TDD
 */

import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import Footer from '../../components/Footer';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock FooterButton
jest.mock('../../components/FooterButton', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ id, onButtonClick }: any) => (
    <button e2eid={`footer-button-${id}`} onClick={() => onButtonClick('cmd-test', null)}>
      {id}
    </button>
  ),
}));

// Mock next/image pour le bouton logo (US-13.1)
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

describe('Footer', () => {
  beforeEach(() => {
    mockPush.mockClear();
    jest.clearAllMocks();
    
    // Mock fetch global
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ version: '1.0.0' }),
      })
    ) as jest.Mock;
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // US-13.1 baby step 2 : bouton logo dans le footer, visible, sans action
  it('devrait afficher un bouton avec le logo Malain et possible dans le footer (US-13.1)', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const logo = screen.getByAltText('Logo Malain et possible');
    expect(logo).toBeInTheDocument();
    const logoButton = logo.closest('button');
    expect(logoButton).toBeInTheDocument();
  });

  it('devrait ne pas déclencher de navigation au clic sur le bouton logo du footer (US-13.1)', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const logo = screen.getByAltText('Logo Malain et possible');
    const logoButton = logo.closest('button');
    expect(logoButton).toBeInTheDocument();
    logoButton!.click();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('devrait placer le bouton logo entre Plan du site et À propos de ce site (US-13.1)', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const boutonsContainer = document.querySelector('.boutonsContainer');
    expect(boutonsContainer).toBeInTheDocument();
    const children = Array.from(boutonsContainer!.children);
    const indexOfLogo = children.findIndex((el) => el.querySelector('img[alt="Logo Malain et possible"]'));
    const indexOfSitemap = children.findIndex((el) => el.textContent?.trim() === 'sitemap');
    const indexOfAboutSite = children.findIndex((el) => el.textContent?.trim() === 'about-site');
    expect(indexOfSitemap).toBeGreaterThanOrEqual(0);
    expect(indexOfLogo).toBeGreaterThanOrEqual(0);
    expect(indexOfAboutSite).toBeGreaterThanOrEqual(0);
    expect(indexOfSitemap).toBeLessThan(indexOfLogo);
    expect(indexOfLogo).toBeLessThan(indexOfAboutSite);
  });

  it('devrait afficher le footer', async () => {
    let container: HTMLElement;
    await act(async () => {
      const result = render(<Footer />);
      container = result.container;
    });
    
    expect(container!.querySelector('footer')).toBeInTheDocument();
  });

  it('devrait afficher des boutons', async () => {
    await act(async () => {
      render(<Footer />);
    });
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('devrait avoir la classe CSS footer', async () => {
    let container: HTMLElement;
    await act(async () => {
      const result = render(<Footer />);
      container = result.container;
    });
    
    expect(container!.querySelector('footer')).toHaveClass('footer');
  });

  it('devrait gérer une erreur de fetch pour la version', async () => {
    // Mock fetch qui échoue
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;
    
    let container: HTMLElement;
    await act(async () => {
      const result = render(<Footer />);
      container = result.container;
    });
    
    // Le footer devrait quand même s'afficher
    expect(container!.querySelector('footer')).toBeInTheDocument();
    // La version devrait être vide (espace insécable)
    const versionDiv = container!.querySelector('.version');
    expect(versionDiv).toBeInTheDocument();
  });

  it('devrait afficher la version quand elle est chargée', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ version: '2.5.0' }),
      })
    ) as jest.Mock;
    
    await act(async () => {
      render(<Footer />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('v2.5.0')).toBeInTheDocument();
    });
  });
});
