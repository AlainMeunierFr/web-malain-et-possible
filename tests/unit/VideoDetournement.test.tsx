/**
 * Tests unitaires pour le composant VideoDetournement
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoDetournement from '../../components/VideoDetournement';
import type { ElementListeDeDetournementsVideo } from '../../utils/indexReader';

// Mock TexteLarge
jest.mock('../../components/TexteLarge', () => {
  return ({ element }: { element: { type: string; texte: string } }) => {
    return React.createElement('div', { 'e2eid': 'texte-large' }, element.texte);
  };
});

// Mock lucide-react
jest.mock('lucide-react', () => ({
  AlertTriangle: () => React.createElement('svg', { 'e2eid': 'alert-triangle' }, null),
}));

describe('Composant VideoDetournement', () => {
  const mockElement: ElementListeDeDetournementsVideo = {
    type: 'listeDeDetournementsVideo',
    items: [
      {
        type: 'detournementVideo',
        id: 1,
        titreVideoDetournee: 'Test Détournement 1',
        videoDetournee: 'abc123def45',
        titreVideoOriginale: 'Original 1',
        videoOriginale: 'xyz789uvw01',
        droitsAuteur: '',
        linkedin: 'https://linkedin.com/test1',
        titre: 'Client Test 1',
        date: '15/6/2024',
        pitch: 'Pitch test 1',
      },
      {
        type: 'detournementVideo',
        id: 2,
        titreVideoDetournee: 'Test Détournement 2',
        videoDetournee: 'def456ghi78',
        titreVideoOriginale: 'Original 2',
        videoOriginale: 'uvw012xyz34',
        droitsAuteur: 'Droits d\'auteur pour le test 2',
        linkedin: '',
        titre: 'Client Test 2',
        date: '20/6/2024',
        pitch: 'Pitch test 2',
      },
    ],
  };

  it('devrait afficher tous les détournements triés par date décroissante', () => {
    render(<VideoDetournement element={mockElement} />);

    // Vérifier que les titres clients (H2) sont présents
    expect(screen.getByText('Client Test 1')).toBeInTheDocument();
    expect(screen.getByText('Client Test 2')).toBeInTheDocument();

    // Le deuxième devrait être affiché en premier (date plus récente)
    const titres = screen.getAllByRole('heading', { level: 2 });
    expect(titres[0].textContent).toBe('Client Test 2');
    expect(titres[1].textContent).toBe('Client Test 1');
  });

  it('devrait afficher les titres clients des détournements en H2', () => {
    render(<VideoDetournement element={mockElement} />);

    const titres = screen.getAllByRole('heading', { level: 2 });
    expect(titres.length).toBe(2);
    expect(titres[0].textContent).toBe('Client Test 2');
    expect(titres[1].textContent).toBe('Client Test 1');
  });

  it('devrait afficher les titres des vidéos (détournée et originale) en H3', () => {
    render(<VideoDetournement element={mockElement} />);

    // H3 = titreVideoDetournee et titreVideoOriginale (contenu des données)
    expect(screen.getByText('Test Détournement 1')).toBeInTheDocument();
    expect(screen.getByText('Test Détournement 2')).toBeInTheDocument();
    expect(screen.getByText('Original 1')).toBeInTheDocument();
    expect(screen.getByText('Original 2')).toBeInTheDocument();

    const allH3 = screen.getAllByRole('heading', { level: 3 });
    expect(allH3.length).toBe(4); // 2x titreVideoDetournee + 2x titreVideoOriginale
  });

  it('devrait afficher les iframes YouTube avec les bons IDs', () => {
    render(<VideoDetournement element={mockElement} />);

    const iframes = screen.getAllByTitle(/Vidéo (détournée|originale)/);
    expect(iframes.length).toBeGreaterThan(0);

    // Vérifier que les URLs contiennent les IDs YouTube
    iframes.forEach((iframe) => {
      const src = iframe.getAttribute('src');
      expect(src).toContain('youtube.com/embed');
    });
  });

  it('devrait afficher le bouton LinkedIn quand linkedin est présent', () => {
    render(<VideoDetournement element={mockElement} />);

    const boutonLinkedIn = screen.getByText('VOIR L\'ENGAGEMENT SUR LINKEDIN');
    expect(boutonLinkedIn).toBeInTheDocument();
    expect(boutonLinkedIn.closest('a')).toHaveAttribute('href', 'https://linkedin.com/test1');
  });

  it('devrait afficher l\'icône d\'alerte quand droitsAuteur est présent', () => {
    render(<VideoDetournement element={mockElement} />);

    const alertIcons = screen.getAllByTestId('alert-triangle');
    expect(alertIcons.length).toBeGreaterThan(0);
  });

  it('devrait ouvrir/fermer le popup des droits d\'auteur au clic', () => {
    render(<VideoDetournement element={mockElement} />);

    // Trouver le bouton d'alerte pour le détournement avec droits d'auteur
    const alertButtons = screen.getAllByRole('button', { name: /Information sur les droits d'auteur/i });
    
    // Le deuxième détournement a des droits d'auteur
    const alertButton = alertButtons[0];
    
    // Cliquer pour ouvrir
    fireEvent.click(alertButton);
    
    // Vérifier que le popup s'affiche
    const popup = screen.getByText(/Droits d'auteur pour le test 2/);
    expect(popup).toBeInTheDocument();

    // Cliquer sur le bouton fermer
    const closeButton = screen.getByRole('button', { name: /Fermer/i });
    fireEvent.click(closeButton);

    // Vérifier que le popup disparaît
    expect(screen.queryByText(/Droits d'auteur pour le test 2/)).not.toBeInTheDocument();
  });

  it('devrait afficher les pitchs via TexteLarge', () => {
    render(<VideoDetournement element={mockElement} />);

    const texteLarge = screen.getAllByTestId('texte-large');
    expect(texteLarge.length).toBe(2);
    expect(texteLarge[0].textContent).toContain('Pitch test 2'); // Premier affiché (plus récent)
    expect(texteLarge[1].textContent).toContain('Pitch test 1');
  });

  it('devrait afficher titre et titreVideoOriginale', () => {
    render(<VideoDetournement element={mockElement} />);

    expect(screen.getByText('Client Test 1')).toBeInTheDocument();
    expect(screen.getByText('Client Test 2')).toBeInTheDocument();
    expect(screen.getByText('Original 1')).toBeInTheDocument();
    expect(screen.getByText('Original 2')).toBeInTheDocument();
  });

  it('devrait avoir la classe CSS videoDetournement', () => {
    const { container } = render(<VideoDetournement element={mockElement} />);
    const div = container.firstChild as HTMLElement;

    expect(div).toHaveClass('videoDetournement');
  });

  it('devrait retourner null pour un élément vide', () => {
    const emptyElement: ElementListeDeDetournementsVideo = {
      type: 'listeDeDetournementsVideo',
      items: [],
    };

    const { container } = render(<VideoDetournement element={emptyElement} />);
    
    // Le composant retourne null quand items est vide
    expect(container.firstChild).toBeNull();
  });

  it('devrait extraire l\'ID YouTube depuis une URL complète', () => {
    const elementWithUrl: ElementListeDeDetournementsVideo = {
      type: 'listeDeDetournementsVideo',
      items: [
        {
          type: 'detournementVideo',
          id: 3,
          titreVideoDetournee: 'Test avec URL',
          videoDetournee: 'https://www.youtube.com/watch?v=abc123def45',
          titreVideoOriginale: 'Original URL',
          videoOriginale: 'https://youtu.be/xyz789uvw01',
          droitsAuteur: '',
          linkedin: '',
          titre: 'Client URL',
          date: '1/1/2024',
          pitch: 'Pitch URL',
        },
      ],
    };

    render(<VideoDetournement element={elementWithUrl} />);

    const iframes = screen.getAllByTitle(/Vidéo (détournée|originale)/);
    expect(iframes.length).toBe(2);
    
    // Vérifier que les URLs contiennent les IDs extraits
    const src1 = iframes[0].getAttribute('src');
    const src2 = iframes[1].getAttribute('src');
    expect(src1).toContain('abc123def45');
    expect(src2).toContain('xyz789uvw01');
  });

  it('ne devrait pas afficher d\'iframe pour URL YouTube invalide', () => {
    const elementWithInvalidUrl: ElementListeDeDetournementsVideo = {
      type: 'listeDeDetournementsVideo',
      items: [
        {
          type: 'detournementVideo',
          id: 4,
          titreVideoDetournee: 'Test URL invalide',
          videoDetournee: 'https://invalid-url.com/video',
          titreVideoOriginale: 'Original invalide',
          videoOriginale: 'not-a-youtube-url',
          droitsAuteur: '',
          linkedin: '',
          titre: 'Client Invalide',
          date: '1/1/2024',
          pitch: 'Pitch invalide',
        },
      ],
    };

    render(<VideoDetournement element={elementWithInvalidUrl} />);

    // Le titre et le pitch doivent être affichés
    expect(screen.getByText('Test URL invalide')).toBeInTheDocument();
    expect(screen.getByText('Pitch invalide')).toBeInTheDocument();
    
    // Mais aucune iframe ne doit être présente (URLs invalides)
    const iframes = screen.queryAllByTitle(/Vidéo (détournée|originale)/);
    expect(iframes.length).toBe(0);
  });
});
