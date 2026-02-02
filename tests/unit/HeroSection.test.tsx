/**
 * Tests unitaires pour le composant HeroSection
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from '../../components/HeroSection';
import type { ElementHero, ElementVideo } from '../../utils/indexReader';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
    return React.createElement('a', { href, className }, children);
  };
});

// Mock ProfilContainer
jest.mock('../../components/ProfilContainer', () => {
  return function ProfilContainer({ profil }: { profil: any }) {
    return <div data-testid={`profil-${profil.slug}`}>{profil.titre}</div>;
  };
});

// Mock Video (e2eid = testIdAttribute du projet)
jest.mock('../../components/Video', () => {
  return function Video({ element }: { element: ElementVideo }) {
    return <div e2eid="hero-video" data-url={element.urlYouTube}>Video</div>;
  };
});

describe('Composant HeroSection', () => {
  it('devrait afficher le titre depuis le JSON', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Alain Meunier',
      sousTitre: 'Je recherche un projet stimulant (CDI ou freelance)',
      description: 'Description de la valeur...',
      callToAction: {
        texte: 'On discute ?',
        action: '/faisons-connaissance',
      },
      ensavoirplus: '/mes-profils',
    };

    render(<HeroSection element={hero} />);

    expect(screen.getByText('Alain Meunier')).toBeInTheDocument();
  });

  it('devrait afficher le sous-titre depuis le JSON', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Alain Meunier',
      sousTitre: 'Je recherche un projet stimulant (CDI ou freelance)',
      description: 'Description...',
      callToAction: {
        texte: 'On discute ?',
        action: '/faisons-connaissance',
      },
      profils: [],
    };

    render(<HeroSection element={hero} />);

    expect(screen.getByText('Je recherche un projet stimulant (CDI ou freelance)')).toBeInTheDocument();
  });

  it('devrait afficher la description depuis le JSON', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Alain Meunier',
      sousTitre: 'Sous-titre',
      description: 'Description de la valeur apportée',
      callToAction: {
        texte: 'On discute ?',
        action: '/faisons-connaissance',
      },
      ensavoirplus: '/mes-profils',
    };

    render(<HeroSection element={hero} />);

    expect(screen.getByText('Description de la valeur apportée')).toBeInTheDocument();
  });

  it('devrait afficher le bouton principal avec le texte et l\'action depuis le JSON', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Alain Meunier',
      sousTitre: 'Sous-titre',
      description: 'Description',
      callToAction: {
        texte: 'On discute ?',
        action: '/faisons-connaissance',
      },
      ensavoirplus: '/mes-profils',
    };

    render(<HeroSection element={hero} />);

    const bouton = screen.getByText('On discute ?');
    expect(bouton).toBeInTheDocument();
    expect(bouton.closest('a')).toHaveAttribute('href', '/faisons-connaissance');
  });

  it('devrait afficher un lien "Télécharger mon CV" vers la page Mes Profils (href depuis JSON ensavoirplus)', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Alain Meunier',
      sousTitre: 'Sous-titre',
      description: 'Description',
      callToAction: {
        texte: 'Discutons',
        action: '/faisons-connaissance',
      },
      ensavoirplus: '/mes-profils',
    };

    render(<HeroSection element={hero} />);

    const linkCV = screen.getByText('Télécharger mon CV');
    expect(linkCV).toBeInTheDocument();
    expect(linkCV.closest('a')).toHaveAttribute('href', '/mes-profils');
  });

  it('devrait utiliser ensavoirplus du JSON pour le lien Télécharger mon CV', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Alain Meunier',
      sousTitre: 'Sous-titre',
      description: 'Description',
      callToAction: {
        texte: 'Discutons',
        action: '/faisons-connaissance',
      },
      ensavoirplus: '/custom-mes-profils',
    };

    render(<HeroSection element={hero} />);

    expect(screen.queryByText('Produit logiciel')).not.toBeInTheDocument();
    expect(screen.getByText('Alain Meunier')).toBeInTheDocument();
  });

  it('affiche la vidéo dans la zone droite quand hero.video est fourni (US-7.11)', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Alain Meunier',
      sousTitre: 'Disponible pour…',
      description: 'Résumé',
      callToAction: { texte: 'Discutons', action: '/faisons-connaissance' },
      video: { urlYouTube: 'https://youtu.be/wcvG-WfKckU', lancementAuto: false },
      profils: [],
    };

    render(<HeroSection element={hero} />);

    expect(screen.getByTestId('hero-video')).toBeInTheDocument();
    expect(screen.getByTestId('hero-video')).toHaveAttribute('data-url', hero.video!.urlYouTube);
    expect(document.querySelector('.ui-heroDroite')).toBeInTheDocument();
    expect(document.querySelector('.ui-heroGauche')).toBeInTheDocument();
  });

  it('devrait parser le markdown **gras** dans le titre', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Alain **Meunier**',
      sousTitre: 'Sous-titre',
      description: 'Description',
      callToAction: {
        texte: 'On discute ?',
        action: '/faisons-connaissance',
      },
      profils: [],
    };

    const { container } = render(<HeroSection element={hero} />);

    const strong = container.querySelector('h1 strong');
    expect(strong).toBeInTheDocument();
    expect(strong?.textContent).toBe('Meunier');
  });

  it('devrait parser le markdown **gras** dans le sous-titre', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Titre',
      sousTitre: 'Je recherche un projet **stimulant**',
      description: 'Description',
      callToAction: {
        texte: 'On discute ?',
        action: '/faisons-connaissance',
      },
      profils: [],
    };

    const { container } = render(<HeroSection element={hero} />);

    const strong = container.querySelector('h2 strong');
    expect(strong).toBeInTheDocument();
    expect(strong?.textContent).toBe('stimulant');
  });

  it('devrait parser le markdown **gras** dans la description', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Titre',
      sousTitre: 'Sous-titre',
      description: '25 ans d\'expérience à **transformer des idées** en produits logiciels',
      callToAction: {
        texte: 'On discute ?',
        action: '/faisons-connaissance',
      },
      profils: [],
    };

    const { container } = render(<HeroSection element={hero} />);

    const strong = container.querySelector('p.description strong');
    expect(strong).toBeInTheDocument();
    expect(strong?.textContent).toBe('transformer des idées');
  });

  it('devrait parser plusieurs occurrences de **gras** dans la description', () => {
    const hero: ElementHero = {
      type: 'hero',
      titre: 'Titre',
      sousTitre: 'Sous-titre',
      description: 'Passionné par la **résolution de problèmes complexes**, je combine **rigueur technique et leadership humain**.',
      callToAction: {
        texte: 'On discute ?',
        action: '/faisons-connaissance',
      },
      profils: [],
    };

    const { container } = render(<HeroSection element={hero} />);

    const strongElements = container.querySelectorAll('p.description strong');
    expect(strongElements).toHaveLength(2);
    expect(strongElements[0].textContent).toBe('résolution de problèmes complexes');
    expect(strongElements[1].textContent).toBe('rigueur technique et leadership humain');
  });
});
