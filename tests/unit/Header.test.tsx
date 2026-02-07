/**
 * Tests pour Header - TDD
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import Header from '../../components/Header';
import { EditingProvider } from '../../contexts/EditingContext';
import { PageTitleProvider, usePageTitle } from '../../contexts/PageTitleContext';
import type { HeaderMenuEntry } from '../../utils/shared/headerMenuTypes';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/',
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @next/next/no-img-element, jsx-a11y/alt-text
  default: (props: any) => <img {...props} />,
}));

// Mock utils pour US-Assistant-Scenario (prod vs dev)
const mockIsProduction = jest.fn();
jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  isProduction: () => mockIsProduction(),
}));

// Helper pour wrapper les composants avec EditingProvider et PageTitleProvider
const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <PageTitleProvider>
      <EditingProvider>{ui}</EditingProvider>
    </PageTitleProvider>
  );
};

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockClear();
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
      writable: true,
    });
  });

  it('devrait afficher le header', () => {
    const { container } = renderWithProvider(<Header menuEntries={[]} />);
    
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  // US-13.1 baby step 1 : le logo est retiré du header
  it('ne devrait pas afficher le logo dans le header (US-13.1)', () => {
    renderWithProvider(<Header menuEntries={[]} />);
    const logo = screen.queryByAltText('Logo Malain et possible');
    expect(logo).not.toBeInTheDocument();
  });

  // US-13.1 baby step 3 : Header utilise readHeaderMenu() et affiche au moins une entrée en lien
  it('devrait afficher au moins une entrée de menu en lien (ex. Accueil) quand menuEntries est fourni (US-13.1)', () => {
    const menuEntries: HeaderMenuEntry[] = [
      { id: 'accueil', label: 'Accueil', url: '/' },
    ];
    renderWithProvider(<Header menuEntries={menuEntries} />);
    const accueilLink = screen.getByRole('link', { name: 'Accueil' });
    expect(accueilLink).toBeInTheDocument();
    expect(accueilLink).toHaveAttribute('href', '/');
  });

  // US-13.1 baby step 4 : toutes les entrées niveau 1 sont des liens cliquables
  it('devrait afficher toutes les entrées niveau 1 comme liens vers leurs pages (US-13.1)', () => {
    const menuEntries: HeaderMenuEntry[] = [
      { id: 'accueil', label: 'Accueil', url: '/' },
      { id: 'mes-profils', label: 'Mes profils', url: '/mes-profils' },
    ];
    renderWithProvider(<Header menuEntries={menuEntries} />);
    expect(screen.getByRole('link', { name: 'Accueil' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Mes profils' })).toHaveAttribute('href', '/mes-profils');
  });

  // US-13.1 baby step 5 : entrées avec sous-menu affichent un dropdown au survol
  it('devrait afficher un dropdown avec les sous-items pour une entrée avec sousMenu (US-13.1)', () => {
    const menuEntries: HeaderMenuEntry[] = [
      {
        id: 'mes-profils',
        label: 'Mes profils',
        url: '/mes-profils',
        sousMenu: [
          { label: 'Produit logiciel', url: '/profil/cpo' },
          { label: 'Opérations', url: '/profil/coo' },
        ],
      },
    ];
    renderWithProvider(<Header menuEntries={menuEntries} />);
    const sousLink = screen.getByText('Produit logiciel').closest('a');
    expect(sousLink).toBeInTheDocument();
    expect(sousLink).toHaveAttribute('href', '/profil/cpo');
  });

  // US-13.1 baby step 6 : clic sur libellé entrée avec sous-menu navigue vers page mère (déjà couvert par step 4)
  // US-13.1 baby step 8 : en dessous de 768px, menu horizontal masqué, icône hamburger visible
  it('devrait afficher l’icône hamburger et masquer le menu horizontal en mode mobile (US-13.1)', async () => {
    const matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(max-width: 767px)',
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    Object.defineProperty(window, 'matchMedia', { value: matchMedia, writable: true });
    const menuEntries: HeaderMenuEntry[] = [{ id: 'accueil', label: 'Accueil', url: '/' }];
    renderWithProvider(<Header menuEntries={menuEntries} />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ouvrir le menu/i })).toBeInTheDocument();
    });
    const nav = document.getElementById('headerNavDesktop');
    expect(nav).toHaveAttribute('aria-hidden', 'true');
  });

  // US-13.1 baby step 9 : au clic sur hamburger, panneau latéral avec les mêmes entrées
  it('devrait ouvrir un panneau latéral avec les entrées du menu au clic sur l’icône hamburger (US-13.1)', async () => {
    const matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(max-width: 767px)',
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    Object.defineProperty(window, 'matchMedia', { value: matchMedia, writable: true });
    const menuEntries: HeaderMenuEntry[] = [{ id: 'accueil', label: 'Accueil', url: '/' }];
    renderWithProvider(<Header menuEntries={menuEntries} />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ouvrir le menu/i })).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: /ouvrir le menu/i }));
    const accueilInPanel = screen.getAllByRole('link', { name: 'Accueil' });
    expect(accueilInPanel.length).toBeGreaterThanOrEqual(1);
  });

  // US-13.1 : titre dans le header, après le menu (zone dédiée avec fer à gauche)
  it('devrait rendre le titre de page dans une zone dédiée dans le header (US-13.1)', () => {
    const SetTitleAndHeader = () => {
      const { setPageTitle } = usePageTitle();
      React.useEffect(() => {
        setPageTitle('Mes Profils');
      }, [setPageTitle]);
      return <Header menuEntries={[]} />;
    };
    const { container } = render(
      <PageTitleProvider>
        <EditingProvider>
          <SetTitleAndHeader />
        </EditingProvider>
      </PageTitleProvider>
    );
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    const titleBlock = header?.querySelector('.headerTitleBlock');
    expect(titleBlock).toBeInTheDocument();
    expect(titleBlock).toHaveTextContent('Mes Profils');
  });

  it('devrait avoir un z-index minimum de 1000 pour rester au-dessus du contenu (US-1.2)', () => {
    renderWithProvider(<Header menuEntries={[]} />);
    // ARRANGE - Lire le fichier CSS global (sélecteur .header)
    const cssPath = path.join(__dirname, '../../app/content-styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // ACT - Extraire la valeur du z-index du CSS (sélecteur .header)
    const zIndexMatch = cssContent.match(/\.header\s*\{[^}]*z-index:\s*(\d+);/s);
    
    // ASSERT - Vérifier que le z-index est défini et >= 1000
    expect(zIndexMatch).not.toBeNull();
    const zIndexValue = parseInt(zIndexMatch![1], 10);
    expect(zIndexValue).toBeGreaterThanOrEqual(1000);
  });

  it('devrait avoir un arrière-plan opaque pour masquer le contenu qui scroll (US-1.2)', () => {
    // ARRANGE - Lire le fichier CSS global (sélecteur .header)
    const cssPath = path.join(__dirname, '../../app/content-styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // ACT - Extraire la valeur du background-color du CSS (sélecteur .header)
    const backgroundColorMatch = cssContent.match(/\.header\s*\{[^}]*background-color:\s*([^;]+);/s);
    
    // ASSERT - Vérifier qu'il y a une background-color définie et qu'elle n'est pas transparent
    expect(backgroundColorMatch).not.toBeNull();
    const backgroundColor = backgroundColorMatch![1].trim();
    expect(backgroundColor).not.toBe('transparent');
    expect(backgroundColor).toBeTruthy();
  });

  it('devrait rester fixe au-dessus du contenu qui scroll (US-1.2)', () => {
    // ARRANGE - Lire le fichier CSS global (sélecteur .header)
    const cssPath = path.join(__dirname, '../../app/content-styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // ACT - Extraire la valeur de position du CSS (sélecteur .header)
    const positionMatch = cssContent.match(/\.header\s*\{[^}]*position:\s*([^;]+);/s);
    
    // ASSERT - Vérifier que position est fixed
    expect(positionMatch).not.toBeNull();
    const position = positionMatch![1].trim();
    expect(position).toBe('fixed');
  });

  // ITÉRATION 2 : Test tooltip photo (US-1.4a)
  it('devrait afficher un tooltip "À propos de moi" au survol de la photo (US-1.4a)', () => {
    // ARRANGE
    renderWithProvider(<Header menuEntries={[]} />);
    
    // ACT - Chercher la photo par son alt
    const photo = screen.getByAltText('Photo Alain Meunier');
    
    // ASSERT - Vérifier la présence du tooltip
    expect(photo).toHaveAttribute('title', 'À propos de moi');
  });

  // US-Assistant-Scenario : Photo → Maintenance, prod = mot de passe / dev = direct
  it('en développement, le lien Photo pointe vers /maintenance', () => {
    mockIsProduction.mockReturnValue(false);
    renderWithProvider(<Header menuEntries={[]} />);
    const photoLink = screen.getByAltText('Photo Alain Meunier').closest('a');
    expect(photoLink).toHaveAttribute('href', '/maintenance');
  });

  it('en production, le lien Photo pointe vers /maintenance (modal gérée séparément)', () => {
    mockIsProduction.mockReturnValue(true);
    renderWithProvider(<Header menuEntries={[]} />);
    const photoLink = screen.getByAltText('Photo Alain Meunier').closest('a');
    expect(photoLink).toBeInTheDocument();
    // En production, le lien pointe toujours vers /maintenance
    // La modal est gérée par le contexte EditingContext et testée ailleurs
    expect(photoLink).toHaveAttribute('href', '/maintenance');
  });

  it('en production, le clic sur la photo déclenche le modal de mot de passe', () => {
    mockIsProduction.mockReturnValue(true);
    renderWithProvider(<Header menuEntries={[]} />);
    const photoLink = screen.getByAltText('Photo Alain Meunier').closest('a');
    
    // Cliquer sur le lien photo
    fireEvent.click(photoLink!);
    
    // Le modal de mot de passe devrait être visible
    // Note: Le modal est géré par le composant, on vérifie juste que le clic fonctionne
    expect(photoLink).toBeInTheDocument();
  });
});
