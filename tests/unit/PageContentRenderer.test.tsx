/**
 * Tests pour PageContentRenderer - TDD
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import PageContentRenderer from '../../components/PageContentRenderer';
import type { ElementContenu } from '../../utils/indexReader';

// Mock all child components
jest.mock('../../components/Titre', () => ({
  __esModule: true,
  default: ({ element }: any) => <div data-testid="titre">{element.texte}</div>,
}));

jest.mock('../../components/Video', () => ({
  __esModule: true,
  default: () => <div data-testid="video">Video</div>,
}));

jest.mock('../../components/TexteLarge', () => ({
  __esModule: true,
  default: ({ element }: any) => <div data-testid="texte-large">{element.texte}</div>,
}));

jest.mock('../../components/DomaineDeCompetences', () => ({
  __esModule: true,
  default: ({ domaine }: any) => <div data-testid="domaine">{domaine.titre}</div>,
}));

jest.mock('../../components/CallToAction', () => ({
  __esModule: true,
  default: () => <div data-testid="cta">CTA</div>,
}));

jest.mock('../../components/GroupeBoutons', () => ({
  __esModule: true,
  default: () => <div data-testid="groupe-boutons">Boutons</div>,
}));

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (loader: any) => {
    const Component = (props: any) => {
      const [Comp, setComp] = React.useState<any>(null);
      React.useEffect(() => {
        loader().then((mod: any) => setComp(() => mod.default));
      }, []);
      return Comp ? <Comp {...props} /> : <div>Loading...</div>;
    };
    return Component;
  },
}));

jest.mock('../../components/Temoignages', () => ({
  __esModule: true,
  default: () => <div data-testid="temoignages">Témoignages</div>,
}));

jest.mock('../../components/VideoDetournement', () => ({
  __esModule: true,
  default: () => <div data-testid="video-detournement">Détournements</div>,
}));

describe('PageContentRenderer', () => {
  it('devrait afficher un titre', () => {
    const contenu: ElementContenu[] = [
      { type: 'titre', texte: 'Test Titre' },
    ];

    render(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('titre')).toBeInTheDocument();
    expect(screen.getByText('Test Titre')).toBeInTheDocument();
  });

  it('devrait afficher une vidéo', () => {
    const contenu: ElementContenu[] = [
      { type: 'video', urlYouTube: 'test', lancementAuto: false },
    ];

    render(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  it('devrait afficher un texteLarge', () => {
    const contenu: ElementContenu[] = [
      { type: 'texteLarge', texte: 'Test Text' },
    ];

    render(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('texte-large')).toBeInTheDocument();
  });

  it('devrait afficher un domaine de compétences', () => {
    const contenu: ElementContenu[] = [
      { 
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Description',
        items: [],
      },
    ];

    render(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('domaine')).toBeInTheDocument();
  });

  it('devrait afficher un call-to-action', () => {
    const contenu: ElementContenu[] = [
      { type: 'callToAction', texte: 'Test CTA', url: '#' },
    ];

    render(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('cta')).toBeInTheDocument();
  });

  it('devrait afficher un groupe de boutons', () => {
    const contenu: ElementContenu[] = [
      { type: 'groupeBoutons', groupes: [] },
    ];

    render(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('groupe-boutons')).toBeInTheDocument();
  });

  it('devrait gérer un contenu vide', () => {
    const { container } = render(<PageContentRenderer contenu={[]} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('devrait afficher plusieurs éléments', () => {
    const contenu: ElementContenu[] = [
      { type: 'titre', texte: 'Titre 1' },
      { type: 'texteLarge', texte: 'Text 1' },
      { type: 'video', urlYouTube: 'test', lancementAuto: false },
    ];

    render(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('titre')).toBeInTheDocument();
    expect(screen.getByTestId('texte-large')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
