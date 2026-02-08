/**
 * Tests pour Footer - TDD
 */

import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import Footer from '../../components/Footer';

// Données mockées (objet créé dans la factory pour éviter "before initialization")
jest.mock('../../data/_footerButtons.json', () => ({
  __esModule: true,
  default: {
    type: 'groupeDeBoutons',
    boutons: [
      { type: 'bouton', id: 'calendar', icone: 'Calendar', command: 'cmd-FaisonsConnaissance', e2eID: 'b40' },
      { type: 'bouton', id: 'email', icone: 'Mail', command: 'cmd-email', url: 'mailto:x', e2eID: 'b41' },
    ],
  },
}));
jest.mock('../../data/_e2eIds-mapping.json', () => ({
  __esModule: true,
  default: {
    'footer:calendar': 'b40',
    'footer:email': 'b41',
    'footer:sans-e2e': 'b99',
  },
}));

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock FooterButton (e2eID pour tester getFooterE2eId)
jest.mock('../../components/FooterButton', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ id, e2eID, onButtonClick }: any) => (
    <button
      e2eid={e2eID ? `e2eid-${e2eID}` : `footer-button-${id}`}
      onClick={() => onButtonClick?.('cmd-test', null)}
    >
      {id}
    </button>
  ),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports -- mock JSON en test
const getMockFooterData = () => require('../../data/_footerButtons.json').default;

const validBoutons = [
  { type: 'bouton', id: 'calendar', icone: 'Calendar', command: 'cmd-FaisonsConnaissance', e2eID: 'b40' },
  { type: 'bouton', id: 'email', icone: 'Mail', command: 'cmd-email', url: 'mailto:x', e2eID: 'b41' },
];

describe('Footer', () => {
  beforeEach(() => {
    mockPush.mockClear();
    jest.clearAllMocks();
    const mockData = getMockFooterData();
    mockData.type = 'groupeDeBoutons';
    mockData.boutons = [...validBoutons];

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

  it('ne devrait pas afficher le logo dans le footer', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
    const logoInFooter = footer!.querySelector('img[alt="Logo Malain et possible"]');
    expect(logoInFooter).toBeNull();
  });

  it('devrait afficher le footer', async () => {
    let container: HTMLElement;
    await act(async () => {
      const result = render(<Footer />);
      container = result.container;
    });
    
    expect(container!.querySelector('footer')).toBeInTheDocument();
  });

  it('devrait afficher des boutons ou liens dans le footer', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const container = document.querySelector('footer .boutonsContainer');
    expect(container).toBeInTheDocument();
    const interactive = container!.querySelectorAll('a, button');
    expect(interactive.length).toBeGreaterThan(0);
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

  it('retourne null quand les données des boutons sont invalides', async () => {
    getMockFooterData().boutons = null as unknown as typeof validBoutons;
    const { container } = render(<Footer />);
    expect(container.firstChild).toBeNull();
  });

  it('ignore les boutons invalides (sans id, icone ou command)', async () => {
    getMockFooterData().boutons = [
      { type: 'bouton', id: 'ok', icone: 'Mail', command: 'c', e2eID: 'b1' },
      { type: 'bouton', id: '', icone: 'Mail', command: 'c' }, // pas d'id
    ];
    await act(async () => {
      render(<Footer />);
    });
    const container = document.querySelector('footer .boutonsContainer');
    expect(container).toBeInTheDocument();
    expect(container!.querySelectorAll('button').length).toBe(1);
  });

  it('utilise le mapping e2eID quand un bouton n\'a pas d\'e2eID', async () => {
    getMockFooterData().boutons = [
      { type: 'bouton', id: 'sans-e2e', icone: 'Mail', command: 'cmd-x' },
    ];
    await act(async () => {
      render(<Footer />);
    });
    const btn = document.querySelector('[e2eid="e2eid-b99"]');
    expect(btn).toBeInTheDocument();
  });
});
