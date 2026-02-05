/**
 * Tests pour AccordionDossier
 * Composant accordéon qui charge le contenu d'un chapitre au dépliage (lazy loading)
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccordionDossier from '../../components/AccordionDossier';
import type { DossierRacine } from '../../utils';

// Mock des composants enfants
jest.mock('../../components/AccordionTitle', () => {
  return function MockAccordionTitle({ 
    title, 
    children, 
    onOpenChange 
  }: { 
    title: string; 
    children: React.ReactNode; 
    onOpenChange?: (open: boolean) => void;
  }) {
    return (
      <div e2eid="accordion-title">
        <button 
          onClick={() => onOpenChange?.(true)}
          e2eid="accordion-toggle"
        >
          {title}
        </button>
        <div e2eid="accordion-content">{children}</div>
      </div>
    );
  };
});

jest.mock('../../components/AboutSiteContent', () => {
  return function MockAboutSiteContent({ structure }: { structure: { chapitres: unknown[] } }) {
    return (
      <div e2eid="about-site-content">
        Chapitres: {structure.chapitres.length}
      </div>
    );
  };
});

// Mock fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('AccordionDossier', () => {
  const mockDossier: DossierRacine = {
    nom: 'Test Dossier',
    path: 'test/path',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le titre du dossier', () => {
    render(<AccordionDossier dossier={mockDossier} />);
    
    expect(screen.getByText('Test Dossier')).toBeInTheDocument();
  });

  it('charge le chapitre au clic sur le titre', async () => {
    const mockChapitre = {
      titre: 'Chapitre Test',
      sections: [],
    };
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockChapitre,
    });

    render(<AccordionDossier dossier={mockDossier} />);
    
    // Cliquer pour ouvrir l'accordéon
    fireEvent.click(screen.getByTestId('accordion-toggle'));

    // Attendre le chargement
    await waitFor(() => {
      expect(screen.getByTestId('about-site-content')).toBeInTheDocument();
    });

    // Vérifier que fetch a été appelé avec le bon URL
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/a-propos-chapitre?path=test%2Fpath'
    );
  });

  it('affiche un message de chargement pendant le fetch', async () => {
    // Créer une promesse qui ne se résout jamais immédiatement
    let resolvePromise: (value: unknown) => void;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    
    mockFetch.mockReturnValueOnce(pendingPromise);

    render(<AccordionDossier dossier={mockDossier} />);
    
    fireEvent.click(screen.getByTestId('accordion-toggle'));

    // Le message de chargement devrait apparaître
    expect(screen.getByText('Chargement…')).toBeInTheDocument();

    // Résoudre la promesse pour éviter les warnings
    resolvePromise!({
      ok: true,
      json: async () => ({ titre: 'Test', sections: [] }),
    });
  });

  it('affiche une erreur si le fetch échoue', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Erreur serveur' }),
    });

    render(<AccordionDossier dossier={mockDossier} />);
    
    fireEvent.click(screen.getByTestId('accordion-toggle'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Erreur serveur');
    });
  });

  it('affiche une erreur générique si le JSON est invalide', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => { throw new Error('Invalid JSON'); },
    });

    render(<AccordionDossier dossier={mockDossier} />);
    
    fireEvent.click(screen.getByTestId('accordion-toggle'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Erreur 404');
    });
  });

  it('affiche une erreur générique pour les exceptions non-Error', async () => {
    mockFetch.mockRejectedValueOnce('String error');

    render(<AccordionDossier dossier={mockDossier} />);
    
    fireEvent.click(screen.getByTestId('accordion-toggle'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Erreur de chargement');
    });
  });

  it('ne recharge pas le chapitre si déjà chargé', async () => {
    const mockChapitre = {
      titre: 'Chapitre Test',
      sections: [],
    };
    
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockChapitre,
    });

    render(<AccordionDossier dossier={mockDossier} />);
    
    // Premier clic
    fireEvent.click(screen.getByTestId('accordion-toggle'));
    
    await waitFor(() => {
      expect(screen.getByTestId('about-site-content')).toBeInTheDocument();
    });

    // Deuxième clic - ne devrait pas refetch
    fireEvent.click(screen.getByTestId('accordion-toggle'));

    // fetch ne devrait avoir été appelé qu'une seule fois
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
