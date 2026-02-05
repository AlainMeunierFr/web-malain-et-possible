/**
 * Tests unitaires pour DomaineDeCompetences.tsx
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DomaineDeCompetences from '../../components/DomaineDeCompetences';
import type { ElementDomaineDeCompetence } from '../../utils';

/** Ouvre le bloc "Expériences et apprentissages" en cliquant sur le bouton. */
function ouvrirExperiences() {
  const bouton = screen.getByRole('button', { name: /Expériences et apprentissages \(\d+\)/ });
  fireEvent.click(bouton);
}

describe('DomaineDeCompetences', () => {
  describe('Affichage des expériences', () => {
    it('devrait afficher le bouton Expériences et apprentissages (N) et masquer la liste par défaut', () => {
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [],
        experiences: [
          {
            id: '1',
            type: 'Expériences et apprentissages',
            description: 'Une expérience',
            periode: null,
          },
        ],
      };
      render(<DomaineDeCompetences domaine={domaine} />);

      expect(screen.getByRole('button', { name: /Expériences et apprentissages \(1\)/ })).toBeInTheDocument();
      expect(screen.queryByText('Une expérience')).not.toBeInTheDocument();
    });

    it('devrait afficher les expériences avec le format correct : [periode] - description', () => {
      // ARRANGE
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [
          {
            type: 'competence',
            titre: 'Compétence 1',
            description: 'Description compétence 1',
            bouton: null,
          },
        ],
        experiences: [
          {
            id: '1',
            type: 'Expériences et apprentissages',
            description: '**Expérience avec période** - Description de l\'expérience',
            periode: '2020-2023',
          },
        ],
      };

      // ACT
      render(<DomaineDeCompetences domaine={domaine} />);
      ouvrirExperiences();

      // ASSERT
      const experienceItem = screen.getByText(/Expérience avec période/).closest('li');
      expect(experienceItem).toBeInTheDocument();
      
      // Vérifier que la période est affichée dans un em (italique) avec crochets
      const periodeElement = screen.getByText(/\[2020-2023\]/);
      expect(periodeElement).toBeInTheDocument();
      expect(periodeElement.tagName).toBe('EM');
      
      // Vérifier que le texte en gras est affiché
      const titreElement = screen.getByText('Expérience avec période');
      expect(titreElement.tagName).toBe('STRONG'); // <strong> pour gras
      
      // Vérifier que la description est affichée
      expect(screen.getByText(/Description de l'expérience/)).toBeInTheDocument();
    });

    it('devrait afficher les expériences sans période (pas de crochets vides)', () => {
      // ARRANGE
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [],
        experiences: [
          {
            id: '2',
            type: 'Expériences et apprentissages',
            description: '**Expérience sans période** - Description de l\'expérience',
            periode: null,
          },
        ],
      };

      // ACT
      render(<DomaineDeCompetences domaine={domaine} />);
      ouvrirExperiences();

      // ASSERT
      const titreElement = screen.getByText('Expérience sans période');
      expect(titreElement).toBeInTheDocument();
      expect(titreElement.tagName).toBe('STRONG'); // <strong> pour gras
      
      // Vérifier qu'aucune période n'est affichée (pas de crochets)
      const periodeElements = screen.queryAllByText(/\[.*\]/);
      expect(periodeElements.length).toBe(0);
      
      // Vérifier que la description est affichée (peut être dans le même paragraphe)
      expect(screen.getByText(/Description de l'expérience/)).toBeInTheDocument();
    });

    it('devrait afficher les expériences sous le bloc des compétences', () => {
      // ARRANGE
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [
          {
            type: 'competence',
            titre: 'Compétence 1',
            description: 'Description compétence 1',
            bouton: null,
          },
        ],
        experiences: [
          {
            id: '1',
            type: 'Expériences et apprentissages',
            description: 'Description',
            periode: null,
          },
        ],
      };

      // ACT
      const { container } = render(<DomaineDeCompetences domaine={domaine} />);

      // ASSERT
      const competencesContainer = container.querySelector('.competencesContainer');
      const experiencesContainer = container.querySelector('.experiencesContainer');
      
      expect(competencesContainer).toBeInTheDocument();
      expect(experiencesContainer).toBeInTheDocument();
      
      // Vérifier que experiencesContainer vient après competencesContainer dans le DOM
      const domaineElement = container.querySelector('.domaineDeCompetence');
      const competencesIndex = Array.from(domaineElement!.children).indexOf(competencesContainer!);
      const experiencesIndex = Array.from(domaineElement!.children).indexOf(experiencesContainer!);
      
      expect(experiencesIndex).toBeGreaterThan(competencesIndex);
    });

    it('devrait afficher les expériences dans toute la largeur du container', () => {
      // ARRANGE
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [],
        experiences: [
          {
            id: '1',
            type: 'Expériences et apprentissages',
            description: 'Description',
            periode: null,
          },
        ],
      };

      // ACT
      const { container } = render(<DomaineDeCompetences domaine={domaine} />);

      // ASSERT
      const experiencesContainer = container.querySelector('.experiencesContainer');
      
      expect(experiencesContainer).toBeInTheDocument();
      expect(experiencesContainer).toHaveClass('experiencesContainer');
    });

    it('ne devrait pas afficher de section expériences si le domaine n\'a pas d\'expériences', () => {
      // ARRANGE
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [
          {
            type: 'competence',
            titre: 'Compétence 1',
            description: 'Description compétence 1',
            bouton: null,
          },
        ],
      };

      // ACT
      const { container } = render(<DomaineDeCompetences domaine={domaine} />);

      // ASSERT
      const experiencesContainer = container.querySelector('.experiencesContainer');
      expect(experiencesContainer).not.toBeInTheDocument();
    });

    it('ne devrait pas afficher de section expériences si le tableau experiences est vide', () => {
      // ARRANGE
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [],
        experiences: [],
      };

      // ACT
      const { container } = render(<DomaineDeCompetences domaine={domaine} />);

      // ASSERT
      const experiencesContainer = container.querySelector('.experiencesContainer');
      expect(experiencesContainer).not.toBeInTheDocument();
    });

    it('devrait afficher la description avec syntaxe MD', () => {
      // ARRANGE
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [],
        experiences: [
          {
            id: '1',
            type: 'Expériences et apprentissages',
            description: 'Gestion de crise - Réorganisation après départ associé',
            periode: null,
          },
        ],
      };

      // ACT
      render(<DomaineDeCompetences domaine={domaine} />);
      ouvrirExperiences();

      // ASSERT
      const titreElements = screen.queryAllByText('Gestion de crise - Réorganisation après départ associé');
      expect(titreElements.length).toBe(1);
    });

    it('devrait trier les expériences par période décroissante (plus récente en premier)', () => {
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [],
        experiences: [
          {
            id: '1',
            type: 'Expériences et apprentissages',
            description: 'Ancienne',
            periode: '2015-2018',
          },
          {
            id: '2',
            type: 'Expériences et apprentissages',
            description: 'Récente',
            periode: '2020-2023',
          },
          {
            id: '3',
            type: 'Expériences et apprentissages',
            description: 'Depuis 2024',
            periode: 'Depuis 2024',
          },
        ],
      };

      render(<DomaineDeCompetences domaine={domaine} />);
      ouvrirExperiences();

      const experienceItems = screen.getAllByRole('listitem');
      // Les expériences devraient être triées : Depuis 2024, 2020-2023, 2015-2018
      expect(experienceItems[0]).toHaveTextContent('Depuis 2024');
      expect(experienceItems[1]).toHaveTextContent('Récente');
      expect(experienceItems[2]).toHaveTextContent('Ancienne');
    });

    it('devrait placer les expériences sans période en premier', () => {
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [],
        experiences: [
          {
            id: '1',
            type: 'Expériences et apprentissages',
            description: 'Avec période',
            periode: '2020',
          },
          {
            id: '2',
            type: 'Expériences et apprentissages',
            description: 'Sans période',
            periode: null,
          },
        ],
      };

      render(<DomaineDeCompetences domaine={domaine} />);
      ouvrirExperiences();

      const experienceItems = screen.getAllByRole('listitem');
      expect(experienceItems[0]).toHaveTextContent('Sans période');
    });

    it('devrait afficher une description avec liste à puces', () => {
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [
          {
            type: 'competence',
            titre: 'Compétence',
            description: 'Intro\n- Point 1\n- Point 2',
            bouton: null,
          },
        ],
      };

      const { container } = render(<DomaineDeCompetences domaine={domaine} />);
      
      // Vérifier qu'une liste est créée
      const list = container.querySelector('.markdownList');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Protection contre données invalides', () => {
    it('devrait retourner null si items est undefined', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const domaine = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu',
      } as unknown as ElementDomaineDeCompetence;

      const { container } = render(<DomaineDeCompetences domaine={domaine} />);
      
      expect(container.firstChild).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('devrait retourner null si items n\'est pas un tableau', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const domaine = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu',
        items: 'not an array',
      } as unknown as ElementDomaineDeCompetence;

      const { container } = render(<DomaineDeCompetences domaine={domaine} />);
      
      expect(container.firstChild).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Gestion des boutons', () => {
    it('devrait afficher un bouton avec lien interne', () => {
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [
          {
            type: 'competence',
            titre: 'Compétence',
            description: 'Description',
            bouton: {
              texte: 'Voir plus',
              action: '/profil/test',
            },
          },
        ],
      };

      render(<DomaineDeCompetences domaine={domaine} />);
      
      expect(screen.getByText('Voir plus')).toBeInTheDocument();
    });

    it('devrait afficher un bouton avec lien externe', () => {
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu du domaine',
        items: [
          {
            type: 'competence',
            titre: 'Compétence',
            description: 'Description',
            bouton: {
              texte: 'Site externe',
              action: 'https://example.com',
            },
          },
        ],
      };

      render(<DomaineDeCompetences domaine={domaine} />);
      
      const link = screen.getByText('Site externe');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', 'https://example.com');
      expect(link.closest('a')).toHaveAttribute('target', '_blank');
    });
  });

  describe('Couleur de fond', () => {
    it('devrait appliquer la classe light quand backgroundColor est light', () => {
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu',
        items: [],
      };

      const { container } = render(<DomaineDeCompetences domaine={domaine} backgroundColor="light" />);
      
      expect(container.querySelector('.domaineDeCompetence')).toHaveClass('light');
    });

    it('devrait ne pas appliquer la classe light par défaut', () => {
      const domaine: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test Domaine',
        contenu: 'Contenu',
        items: [],
      };

      const { container } = render(<DomaineDeCompetences domaine={domaine} />);
      
      expect(container.querySelector('.domaineDeCompetence')).not.toHaveClass('light');
    });
  });
});
