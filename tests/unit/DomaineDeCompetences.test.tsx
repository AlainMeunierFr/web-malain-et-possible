/**
 * Tests pour DomaineDeCompetences - TDD
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import DomaineDeCompetences from '../../components/DomaineDeCompetences';
import type { DomaineDeCompetences as DomaineType } from '../../utils/indexReader';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Rocket: () => <div data-testid="icon-rocket">Rocket</div>,
  Globe: () => <div data-testid="icon-globe">Globe</div>,
  MessageCircle: () => <div data-testid="icon-message">Message</div>,
  Puzzle: () => <div data-testid="icon-puzzle">Puzzle</div>,
  Binoculars: () => <div data-testid="icon-binoculars">Binoculars</div>,
  Users: () => <div data-testid="icon-users">Users</div>,
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('DomaineDeCompetences', () => {
  const mockDomaine: DomaineType = {
    titre: 'Test Domaine',
    contenu: 'Description test',
    items: [
      { 
        titre: 'Compétence 1',
        icon: 'Rocket',
        description: 'Description 1',
        bouton: { texte: 'En savoir plus', action: '/test1' },
      },
      { 
        titre: 'Compétence 2',
        icon: 'Globe',
        description: 'Description 2',
        bouton: { texte: 'En savoir plus', action: '/test2' },
      },
    ],
  };

  it('devrait afficher le titre du domaine', () => {
    render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    expect(screen.getByText('Test Domaine')).toBeInTheDocument();
  });

  it('devrait afficher le contenu du domaine', () => {
    render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    expect(screen.getByText('Description test')).toBeInTheDocument();
  });

  it('devrait afficher tous les items', () => {
    render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    expect(screen.getByText('Compétence 1')).toBeInTheDocument();
    expect(screen.getByText('Compétence 2')).toBeInTheDocument();
  });

  it('devrait afficher les icônes', () => {
    render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    expect(screen.getByTestId('icon-rocket')).toBeInTheDocument();
    expect(screen.getByTestId('icon-globe')).toBeInTheDocument();
  });

  it('devrait créer des liens vers les pages', () => {
    const { container } = render(<DomaineDeCompetences domaine={mockDomaine} />);
    
    const links = container.querySelectorAll('a');
    expect(links.length).toBe(2);
    expect(links[0]).toHaveAttribute('href', '/test1');
    expect(links[1]).toHaveAttribute('href', '/test2');
  });

  it('devrait parser le markdown bold dans les descriptions', () => {
    const domaineWithBold: DomaineType = {
      titre: 'Test',
      contenu: 'Description',
      items: [
        {
          titre: 'Compétence',
          description: 'Text with **bold** content',
        },
      ],
    };

    const { container } = render(<DomaineDeCompetences domaine={domaineWithBold} />);
    
    const strong = container.querySelector('strong');
    expect(strong).toBeInTheDocument();
    expect(strong?.textContent).toBe('bold');
  });

  it('devrait gérer un domaine sans items', () => {
    const domaineEmpty: DomaineType = {
      titre: 'Empty',
      contenu: 'No items',
      items: [],
    };

    const { container } = render(<DomaineDeCompetences domaine={domaineEmpty} />);
    
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('devrait aligner les boutons "EN SAVOIR PLUS..." horizontalement sur la même ligne (US-3.1)', () => {
    // ARRANGE - Importer les modules nécessaires
    const fs = require('fs');
    const path = require('path');
    
    // ARRANGE - Lire le fichier CSS
    const cssPath = path.join(__dirname, '../../components/DomaineDeCompetences.module.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // ACT - Vérifier que le conteneur des compétences utilise flex ou grid
    const competencesContainerMatch = cssContent.match(/\.competencesContainer\s*\{[^}]*display:\s*([^;]+);/s);
    
    // ASSERT - Vérifier flex ou grid pour l'alignement
    expect(competencesContainerMatch).not.toBeNull();
    const display = competencesContainerMatch![1].trim();
    expect(['grid', 'flex']).toContain(display);
    
    // ACT - Vérifier que les compétences utilisent flexbox avec column
    const competenceMatch = cssContent.match(/\.competence\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;/s);
    expect(competenceMatch).not.toBeNull();
    
    // ACT - Vérifier que les boutons ont margin-top: auto pour alignement en bas
    const boutonMatch = cssContent.match(/\.competenceBouton\s*\{[^}]*margin-top:\s*auto;/s);
    expect(boutonMatch).not.toBeNull();
  });

  it('devrait limiter la largeur du texte d\'introduction à 80% sur desktop (US-3.1)', () => {
    // ARRANGE - Importer les modules nécessaires
    const fs = require('fs');
    const path = require('path');
    
    // ARRANGE - Lire le fichier CSS
    const cssPath = path.join(__dirname, '../../components/DomaineDeCompetences.module.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    // ACT - Vérifier que dans @media (min-width: 769px), .domaineContenu a width: 80%
    const hasWidth80 = cssContent.includes('@media (min-width: 769px)') && 
                       cssContent.match(/@media[\s\S]*?\.domaineContenu[\s\S]*?width:\s*80%/);
    
    // ASSERT - Vérifier que la largeur 80% existe dans la media query desktop
    expect(hasWidth80).not.toBeNull();
    
    // ACT - Vérifier que .domaineContenu a margin: 0 auto dans la media query
    const hasMarginAuto = cssContent.match(/@media[\s\S]*?\.domaineContenu[\s\S]*?margin:\s*0\s+auto/);
    
    // ASSERT - Vérifier que le centrage existe
    expect(hasMarginAuto).not.toBeNull();
  });

  it('devrait formater les citations avec auteur en italique aligné à droite (US-3.1)', () => {
    // ARRANGE
    const fs = require('fs');
    const path = require('path');
    
    const competence = {
      titre: 'Test',
      description: '"Ceci est une citation\n*Nom de l\'auteur*"',
      bouton: null,
    };
    
    const domaine = {
      titre: 'Test',
      contenu: '',
      items: [competence],
    };
    
    // ACT
    render(<DomaineDeCompetences domaine={domaine} />);
    
    // ASSERT - Vérifier que l'auteur est affiché
    const auteur = screen.queryByText(/Nom de l'auteur/i);
    expect(auteur).toBeInTheDocument();
    
    // Vérifier que l'élément a la classe CSS pour auteur
    expect(auteur?.className).toContain('competenceAuteur');
    
    // Vérifier le CSS pour italique et alignement à droite
    const cssPath = path.join(__dirname, '../../components/DomaineDeCompetences.module.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    const auteurStyleMatch = cssContent.match(/\.competenceAuteur[\s\S]*?font-style:\s*italic;/);
    expect(auteurStyleMatch).not.toBeNull();
    
    const auteurAlignMatch = cssContent.match(/\.competenceAuteur[\s\S]*?text-align:\s*right;/);
    expect(auteurAlignMatch).not.toBeNull();
  });
});
