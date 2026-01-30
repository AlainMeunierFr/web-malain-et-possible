/**
 * Tests unitaires pour ListeDesPages.tsx
 * Objectif : Atteindre 100% de couverture branches
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListeDesPages from '../../components/ListeDesPages';

// Mock next/link
jest.mock('next/link', () => {
  const React = require('react');
  return function MockLink({ children, href, ...props }: any) {
    return React.createElement('a', { href, ...props }, children);
  };
});

// Mock generateE2eIdFromUrl
jest.mock('../../utils/e2eIdFromUrl', () => ({
  generateE2eIdFromUrl: jest.fn((url: string) => {
    // Simuler la génération d'e2eID basée sur l'URL
    if (url === '/') return 'l1';
    if (url === '/profil/cpo') return 'l2';
    if (url === '/metrics') return 'l3';
    return `l${url.length}`;
  }),
}));

describe('ListeDesPages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch par défaut
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('État de chargement', () => {
    it('devrait afficher "Chargement..." pendant le chargement', async () => {
      (global.fetch as jest.Mock).mockImplementation(
        () => new Promise(() => {}) // Promise qui ne se résout jamais
      );

      await act(async () => {
        render(<ListeDesPages />);
      });

      expect(screen.getByText('Chargement...')).toBeInTheDocument();
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait gérer les erreurs de fetch', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Erreur lors du chargement du plan du site:',
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });

    it('devrait gérer les erreurs HTTP (status non-OK)', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Filtrage des pages', () => {
    it('devrait exclure les pages avec zone "Masqué"', async () => {
      const mockData = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
          { url: '/masque', titre: 'Masqué', dessiner: 'Oui', zone: 'Masqué' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.queryByText('Masqué')).not.toBeInTheDocument();
      });
    });

    it('devrait exclure les pages avec dessiner "Non"', async () => {
      const mockData = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
          { url: '/cache', titre: 'Caché', dessiner: 'Non', zone: 'Autres' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.queryByText('Caché')).not.toBeInTheDocument();
      });
    });

    it('devrait exclure les pages avec zone "Masqué" ET dessiner "Non"', async () => {
      const mockData = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
          { url: '/double-exclu', titre: 'Double exclu', dessiner: 'Non', zone: 'Masqué' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.queryByText('Double exclu')).not.toBeInTheDocument();
      });
    });
  });

  describe('Organisation par zones', () => {
    it('devrait afficher les pages HomePage dans la ligne 1', async () => {
      const mockData = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        const homeButton = screen.getByText('Home');
        expect(homeButton).toBeInTheDocument();
        expect(homeButton.closest('.ligne-1')).toBeInTheDocument();
        expect(homeButton.closest('.zone-homepage')).toBeInTheDocument();
      });
    });

    it('devrait afficher les pages Profils dans la ligne 2', async () => {
      const mockData = {
        pages: [
          { url: '/profil/cpo', titre: 'CPO', dessiner: 'Oui', zone: 'Profils' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        const cpoButton = screen.getByText('CPO');
        expect(cpoButton).toBeInTheDocument();
        expect(cpoButton.closest('.ligne-2')).toBeInTheDocument();
        expect(cpoButton.closest('.zone-profils')).toBeInTheDocument();
      });
    });

    it('devrait afficher les pages Autres dans la colonne gauche de la ligne 3', async () => {
      const mockData = {
        pages: [
          { url: '/autre', titre: 'Autre', dessiner: 'Oui', zone: 'Autres' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        const autreButton = screen.getByText('Autre');
        expect(autreButton).toBeInTheDocument();
        expect(autreButton.closest('.colonne-gauche')).toBeInTheDocument();
        expect(autreButton.closest('.zone-autres')).toBeInTheDocument();
      });
    });

    it('devrait afficher les pages Footer dans la colonne droite de la ligne 3', async () => {
      const mockData = {
        pages: [
          { url: '/metrics', titre: 'Metrics', dessiner: 'Oui', zone: 'Footer' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        const metricsButton = screen.getByText('Metrics');
        expect(metricsButton).toBeInTheDocument();
        expect(metricsButton.closest('.colonne-droite')).toBeInTheDocument();
        expect(metricsButton.closest('.zone-footer')).toBeInTheDocument();
      });
    });
  });

  describe('Affichage conditionnel des zones', () => {
    it('ne devrait pas afficher la ligne 1 si aucune page HomePage', async () => {
      const mockData = {
        pages: [
          { url: '/profil/cpo', titre: 'CPO', dessiner: 'Oui', zone: 'Profils' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
        expect(document.querySelector('.ligne-1')).not.toBeInTheDocument();
      });
    });

    it('ne devrait pas afficher la ligne 2 si aucune page Profils', async () => {
      const mockData = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(document.querySelector('.ligne-2')).not.toBeInTheDocument();
      });
    });

    it('ne devrait pas afficher la ligne 3 si aucune page Autres ni Footer', async () => {
      const mockData = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(document.querySelector('.ligne-3')).not.toBeInTheDocument();
      });
    });

    it('devrait afficher la ligne 3 si au moins une page Autres ou Footer', async () => {
      const mockData = {
        pages: [
          { url: '/autre', titre: 'Autre', dessiner: 'Oui', zone: 'Autres' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(document.querySelector('.ligne-3')).toBeInTheDocument();
      });
    });

    it('ne devrait pas afficher la colonne gauche si aucune page Autres', async () => {
      const mockData = {
        pages: [
          { url: '/metrics', titre: 'Metrics', dessiner: 'Oui', zone: 'Footer' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(document.querySelector('.colonne-gauche')).not.toBeInTheDocument();
        expect(document.querySelector('.colonne-droite')).toBeInTheDocument();
      });
    });

    it('ne devrait pas afficher la colonne droite si aucune page Footer', async () => {
      const mockData = {
        pages: [
          { url: '/autre', titre: 'Autre', dessiner: 'Oui', zone: 'Autres' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(document.querySelector('.colonne-gauche')).toBeInTheDocument();
        expect(document.querySelector('.colonne-droite')).not.toBeInTheDocument();
      });
    });
  });

  describe('Cas où aucune page à afficher', () => {
    it('devrait afficher "Aucune page à afficher" si totalPages === 0', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const mockData = {
        pages: [
          { url: '/masque', titre: 'Masqué', dessiner: 'Oui', zone: 'Masqué' },
          { url: '/cache', titre: 'Caché', dessiner: 'Non', zone: 'Autres' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(screen.getByText('Aucune page à afficher.')).toBeInTheDocument();
        expect(consoleLogSpy).toHaveBeenCalled();
      });

      consoleLogSpy.mockRestore();
    });

    it('devrait afficher "Aucune page à afficher" si pages est vide', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const mockData = {
        pages: [],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(screen.getByText('Aucune page à afficher.')).toBeInTheDocument();
      });

      consoleLogSpy.mockRestore();
    });
  });

  describe('Génération des e2eID', () => {
    it('devrait générer les e2eID correctement pour chaque page', async () => {
      const mockData = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
          { url: '/profil/cpo', titre: 'CPO', dessiner: 'Oui', zone: 'Profils' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        const homeLink = screen.getByText('Home').closest('a');
        expect(homeLink).toHaveAttribute('e2eid', 'e2eid-l1');
        
        const cpoLink = screen.getByText('CPO').closest('a');
        expect(cpoLink).toHaveAttribute('e2eid', 'e2eid-l2');
      });
    });
  });

  describe('Scénarios complexes', () => {
    it('devrait afficher toutes les zones avec plusieurs pages', async () => {
      const mockData = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
          { url: '/profil/cpo', titre: 'CPO', dessiner: 'Oui', zone: 'Profils' },
          { url: '/profil/coo', titre: 'COO', dessiner: 'Oui', zone: 'Profils' },
          { url: '/autre', titre: 'Autre', dessiner: 'Oui', zone: 'Autres' },
          { url: '/metrics', titre: 'Metrics', dessiner: 'Oui', zone: 'Footer' },
        ],
        liens: [],
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      });

      await act(async () => {
        render(<ListeDesPages />);
      });

      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('CPO')).toBeInTheDocument();
        expect(screen.getByText('COO')).toBeInTheDocument();
        expect(screen.getByText('Autre')).toBeInTheDocument();
        expect(screen.getByText('Metrics')).toBeInTheDocument();
        
        expect(document.querySelector('.ligne-1')).toBeInTheDocument();
        expect(document.querySelector('.ligne-2')).toBeInTheDocument();
        expect(document.querySelector('.ligne-3')).toBeInTheDocument();
        expect(document.querySelector('.colonne-gauche')).toBeInTheDocument();
        expect(document.querySelector('.colonne-droite')).toBeInTheDocument();
      });
    });
  });
});
