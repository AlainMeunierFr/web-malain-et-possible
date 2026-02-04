/**
 * Tests pour PageContentRenderer - TDD
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import PageContentRenderer from '../../components/PageContentRenderer';
import type { ElementContenu } from '../../utils';
import { PageTitleProvider } from '../../contexts/PageTitleContext';

// Mock all child components
jest.mock('../../components/Titre', () => ({
  __esModule: true,
  default: ({ element }: any) => <div e2eid="titre">{element.texte}</div>,
}));

jest.mock('../../components/Video', () => ({
  __esModule: true,
  default: () => <div e2eid="video">Video</div>,
}));

jest.mock('../../components/TexteLarge', () => ({
  __esModule: true,
  default: ({ element }: any) => <div e2eid="texte-large">{element.texte}</div>,
}));

jest.mock('../../components/DomaineDeCompetences', () => ({
  __esModule: true,
  default: ({ domaine }: any) => <div e2eid="domaine">{domaine.titre}</div>,
}));

jest.mock('../../components/CallToAction', () => ({
  __esModule: true,
  default: () => <div e2eid="cta">CTA</div>,
}));

jest.mock('../../components/GroupeBoutons', () => ({
  __esModule: true,
  default: () => <div e2eid="groupe-boutons">Boutons</div>,
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
  default: () => <div e2eid="temoignages">Témoignages</div>,
}));

jest.mock('../../components/VideoDetournement', () => ({
  __esModule: true,
  default: () => <div e2eid="video-detournement">Détournements</div>,
}));

jest.mock('../../components/HeroSection', () => ({
  __esModule: true,
  default: ({ element }: any) => <div e2eid="hero">{element.titre}</div>,
}));

jest.mock('../../components/BlocsProfils', () => ({
  __esModule: true,
  default: ({ element }: any) => (
    <div e2eid="blocs-profils">
      {element.profils?.length ?? 0} profils
    </div>
  ),
}));

describe('PageContentRenderer', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<PageTitleProvider>{component}</PageTitleProvider>);
  };

  it('devrait afficher un titre', () => {
    const contenu: ElementContenu[] = [
      { type: 'titre', texte: 'Test Titre' },
    ];

    renderWithProvider(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('titre')).toBeInTheDocument();
    expect(screen.getByText('Test Titre')).toBeInTheDocument();
  });

  it('devrait afficher une vidéo', () => {
    const contenu: ElementContenu[] = [
      { type: 'video', urlYouTube: 'test', lancementAuto: false },
    ];

    renderWithProvider(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  it('devrait afficher un texteLarge', () => {
    const contenu: ElementContenu[] = [
      { type: 'texteLarge', texte: 'Test Text' },
    ];

    renderWithProvider(<PageContentRenderer contenu={contenu} />);
    
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

    renderWithProvider(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('domaine')).toBeInTheDocument();
  });

  it('devrait afficher un call-to-action', () => {
    const contenu: ElementContenu[] = [
      { type: 'callToAction', texte: 'Test CTA', url: '#' },
    ];

    renderWithProvider(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('cta')).toBeInTheDocument();
  });

  it('devrait afficher un groupe de boutons', () => {
    const contenu: ElementContenu[] = [
      { type: 'groupeDeBoutons', taille: 'petite', boutons: [] },
    ];

    renderWithProvider(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('groupe-boutons')).toBeInTheDocument();
  });

  it('devrait gérer un contenu vide', () => {
    const { container } = renderWithProvider(<PageContentRenderer contenu={[]} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('devrait afficher plusieurs éléments', () => {
    const contenu: ElementContenu[] = [
      { type: 'titre', texte: 'Titre 1' },
      { type: 'texteLarge', texte: 'Text 1' },
      { type: 'video', urlYouTube: 'test', lancementAuto: false },
    ];

    renderWithProvider(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('titre')).toBeInTheDocument();
    expect(screen.getByTestId('texte-large')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  it('devrait afficher un élément de type hero', () => {
    const contenu: ElementContenu[] = [
      {
        type: 'hero',
        titre: 'Alain Meunier',
        sousTitre: 'Je recherche un projet stimulant',
        description: 'Description...',
        callToAction: {
          texte: 'On discute ?',
          action: '/faisons-connaissance',
        },
        profils: [],
      },
    ];

    renderWithProvider(<PageContentRenderer contenu={contenu} />);
    
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByText('Alain Meunier')).toBeInTheDocument();
  });

  it('devrait afficher un élément de type profils (page Mes Profils)', () => {
    const contenu: ElementContenu[] = [
      {
        type: 'listeDeProfils',
        profils: [
          {
            type: 'profil',
            titre: 'Produit logiciel',
            jobTitles: ['CPO'],
            slug: 'cpo',
            route: '/profil/cpo',
            cvPath: '/CV/cpo.pdf',
          },
        ],
      },
    ];

    renderWithProvider(<PageContentRenderer contenu={contenu} />);

    expect(screen.getByTestId('blocs-profils')).toBeInTheDocument();
    expect(screen.getByText('1 profils')).toBeInTheDocument();
  });
});
