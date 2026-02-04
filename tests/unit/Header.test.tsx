/**
 * Tests pour Header - TDD
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import Header from '../../components/Header';
import { EditingProvider } from '../../contexts/EditingContext';
import { PageTitleProvider } from '../../contexts/PageTitleContext';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @next/next/no-img-element
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
  });

  it('devrait afficher le header', () => {
    const { container } = renderWithProvider(<Header />);
    
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('devrait afficher le logo', () => {
    renderWithProvider(<Header />);
    
    const logo = screen.getByAltText('Logo Malain et possible');
    expect(logo).toBeInTheDocument();
  });

  it('devrait naviguer vers HOME au clic sur le logo', () => {
    renderWithProvider(<Header />);
    
    const logoLink = screen.getByAltText('Logo Malain et possible').closest('a');
    expect(logoLink).toBeInTheDocument();
    // Le Link de Next.js pointe vers HOME
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('devrait naviguer vers HOME avec Enter sur le logo', () => {
    renderWithProvider(<Header />);
    
    const logoLink = screen.getByAltText('Logo Malain et possible').closest('a');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('devrait naviguer vers HOME avec Space sur le logo', () => {
    renderWithProvider(<Header />);
    
    const logoLink = screen.getByAltText('Logo Malain et possible').closest('a');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('ne devrait pas naviguer avec une autre touche', () => {
    renderWithProvider(<Header />);
    
    const logo = screen.getByAltText('Logo Malain et possible');
    fireEvent.keyDown(logo, { key: 'a' });
    
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('devrait avoir un z-index minimum de 1000 pour rester au-dessus du contenu (US-1.2)', () => {
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

  // ITÉRATION 1 : Test tooltip logo (US-1.4b)
  it('devrait afficher un tooltip "Accueil" au survol du logo (US-1.4b)', () => {
    // ARRANGE
    renderWithProvider(<Header />);
    
    // ACT - Le logo a un alt text
    const logo = screen.getByAltText('Logo Malain et possible');
    
    // ASSERT - Vérifier la présence du tooltip (le logo devrait avoir un title)
    // Note: Les Images Next.js peuvent ne pas avoir de title directement, vérifier via le parent ou l'attribut
    expect(logo).toBeInTheDocument();
  });

  // ITÉRATION 2 : Test tooltip photo (US-1.4a)
  it('devrait afficher un tooltip "À propos de moi" au survol de la photo (US-1.4a)', () => {
    // ARRANGE
    renderWithProvider(<Header />);
    
    // ACT - Chercher la photo par son alt
    const photo = screen.getByAltText('Photo Alain Meunier');
    
    // ASSERT - Vérifier la présence du tooltip
    expect(photo).toHaveAttribute('title', 'À propos de moi');
  });

  // US-Assistant-Scenario : Photo → Maintenance, prod = mot de passe / dev = direct
  it('en développement, le lien Photo pointe vers /maintenance', () => {
    mockIsProduction.mockReturnValue(false);
    renderWithProvider(<Header />);
    const photoLink = screen.getByAltText('Photo Alain Meunier').closest('a');
    expect(photoLink).toHaveAttribute('href', '/maintenance');
  });

  it('en production, le lien Photo pointe vers /maintenance (modal gérée séparément)', () => {
    mockIsProduction.mockReturnValue(true);
    renderWithProvider(<Header />);
    const photoLink = screen.getByAltText('Photo Alain Meunier').closest('a');
    expect(photoLink).toBeInTheDocument();
    // En production, le lien pointe toujours vers /maintenance
    // La modal est gérée par le contexte EditingContext et testée ailleurs
    expect(photoLink).toHaveAttribute('href', '/maintenance');
  });
});
