/**
 * Tests pour Header - TDD
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import Header from '../../components/Header';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('devrait afficher le header', () => {
    const { container } = render(<Header />);
    
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('devrait afficher le logo', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    expect(logo).toBeInTheDocument();
  });

  it('devrait naviguer vers HOME au clic sur le logo', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    fireEvent.click(logo);
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('devrait naviguer vers HOME avec Enter sur le logo', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    fireEvent.keyDown(logo, { key: 'Enter' });
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('devrait naviguer vers HOME avec Space sur le logo', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    fireEvent.keyDown(logo, { key: ' ' });
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('ne devrait pas naviguer avec une autre touche', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    fireEvent.keyDown(logo, { key: 'a' });
    
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('devrait avoir un z-index minimum de 1000 pour rester au-dessus du contenu (US-1.2)', () => {
    // ARRANGE - Lire le fichier CSS du Header
    const cssPath = path.join(__dirname, '../../components/Header.module.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // ACT - Extraire la valeur du z-index du CSS
    const zIndexMatch = cssContent.match(/\.header\s*\{[^}]*z-index:\s*(\d+);/s);
    
    // ASSERT - Vérifier que le z-index est défini et >= 1000
    expect(zIndexMatch).not.toBeNull();
    const zIndexValue = parseInt(zIndexMatch![1], 10);
    expect(zIndexValue).toBeGreaterThanOrEqual(1000);
  });

  it('devrait avoir un arrière-plan opaque pour masquer le contenu qui scroll (US-1.2)', () => {
    // ARRANGE - Lire le fichier CSS du Header
    const cssPath = path.join(__dirname, '../../components/Header.module.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // ACT - Extraire la valeur du background-color du CSS
    const backgroundColorMatch = cssContent.match(/\.header\s*\{[^}]*background-color:\s*([^;]+);/s);
    
    // ASSERT - Vérifier qu'il y a une background-color définie et qu'elle n'est pas transparent
    expect(backgroundColorMatch).not.toBeNull();
    const backgroundColor = backgroundColorMatch![1].trim();
    expect(backgroundColor).not.toBe('transparent');
    expect(backgroundColor).toBeTruthy();
  });

  it('devrait rester fixe au-dessus du contenu qui scroll (US-1.2)', () => {
    // ARRANGE - Lire le fichier CSS du Header
    const cssPath = path.join(__dirname, '../../components/Header.module.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // ACT - Extraire la valeur de position du CSS
    const positionMatch = cssContent.match(/\.header\s*\{[^}]*position:\s*([^;]+);/s);
    
    // ASSERT - Vérifier que position est fixed
    expect(positionMatch).not.toBeNull();
    const position = positionMatch![1].trim();
    expect(position).toBe('fixed');
  });

  // ITÉRATION 1 : Test tooltip logo (US-1.4b)
  it('devrait afficher un tooltip "Accueil" au survol du logo (US-1.4b)', () => {
    // ARRANGE
    render(<Header />);
    
    // ACT - Le logo a role="button"
    const logo = screen.getByRole('button');
    
    // ASSERT - Vérifier la présence du tooltip
    expect(logo).toHaveAttribute('title', 'Accueil');
  });

  // ITÉRATION 2 : Test tooltip photo (US-1.4a)
  it('devrait afficher un tooltip "À propos de moi" au survol de la photo (US-1.4a)', () => {
    // ARRANGE
    render(<Header />);
    
    // ACT - Chercher la photo par son alt
    const photo = screen.getByAltText('Photo Alain Meunier');
    
    // ASSERT - Vérifier la présence du tooltip
    expect(photo).toHaveAttribute('title', 'À propos de moi');
  });
});
