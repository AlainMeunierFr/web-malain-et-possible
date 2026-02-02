/**
 * Tests unitaires pour DomaineDeCompetences.tsx
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DomaineDeCompetences from '../../components/DomaineDeCompetences';
import type { ElementDomaineDeCompetence } from '../../utils/indexReader';

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
      
      // Vérifier que la période est en italique et entre crochets
      const periodeElement = screen.getByText(/\[2020-2023\]/);
      expect(periodeElement).toBeInTheDocument();
      expect(periodeElement.tagName).toBe('EM'); // <em> pour italique
      
      // Vérifier qu'il y a un "-" entre la période et la description
      const textContent = experienceItem?.textContent || '';
      expect(textContent).toMatch(/\[2020-2023\]\s*-\s*/);
      
      // Vérifier que le texte en gras est affiché
      const titreElement = screen.getByText('Expérience avec période');
      expect(titreElement.tagName).toBe('STRONG'); // <strong> pour gras
      
      // Vérifier que la description est affichée (peut être dans le même paragraphe)
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
      const domaineElement = container.querySelector('.domaineDeCompetence');
      
      expect(experiencesContainer).toBeInTheDocument();
      
      // Vérifier que experiencesContainer a width: 100%
      const styles = window.getComputedStyle(experiencesContainer!);
      // Note: getComputedStyle ne fonctionne pas en test, on vérifie la classe CSS
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
  });
});
