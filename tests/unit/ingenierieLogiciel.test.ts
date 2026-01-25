/**
 * Tests unitaires pour la page Ingénierie logiciel
 * Backend pur : testable sans dépendance React/Next.js
 * 
 * APPROCHE TDD : RED → GREEN → REFACTOR
 */

import { readPageData } from '../../utils/indexReader';
import type { PageData } from '../../utils/indexReader';

describe('ingenierie-logiciel - Tests TDD', () => {
  describe('readPageData pour ingenierie-logiciel.json', () => {
    it('devrait lire le fichier ingenierie-logiciel.json et retourner une structure PageData valide', () => {
      // RED : Le fichier n'existe pas encore, ce test va échouer
      const pageData = readPageData('ingenierie-logiciel.json');

      expect(pageData).toBeDefined();
      expect(pageData.contenu).toBeDefined();
      expect(Array.isArray(pageData.contenu)).toBe(true);
    });

    it('devrait contenir un titre "Ingénierie logiciel" en premier élément', () => {
      const pageData = readPageData('ingenierie-logiciel.json');

      expect(pageData.contenu.length).toBeGreaterThan(0);
      const premierElement = pageData.contenu[0];
      expect(premierElement.type).toBe('titre');
      if (premierElement.type === 'titre') {
        expect(premierElement.texte).toBe('Ingénierie logiciel');
      }
    });

    it('devrait contenir 3 domaines de compétences', () => {
      const pageData = readPageData('ingenierie-logiciel.json');

      const domaines = pageData.contenu.filter(
        (element) => element.type === 'domaineDeCompetence'
      );

      expect(domaines.length).toBe(3);
    });

    it('devrait contenir le domaine "Développeur" avec 3 compétences', () => {
      const pageData = readPageData('ingenierie-logiciel.json');

      const domaines = pageData.contenu.filter(
        (element) => element.type === 'domaineDeCompetence'
      ) as Array<{ type: 'domaineDeCompetence'; titre: string; competences: Array<{ titre: string }> }>;

      const domaineDeveloppeur = domaines.find((d) => d.titre === 'Développeur');
      expect(domaineDeveloppeur).toBeDefined();
      expect(domaineDeveloppeur?.competences.length).toBe(3);

      const titresCompetences = domaineDeveloppeur?.competences.map((c) => c.titre) || [];
      expect(titresCompetences).toContain('4D');
      expect(titresCompetences).toContain('no-code');
      expect(titresCompetences).toContain('Vibe Coding');
    });

    it('devrait contenir le domaine "Expérience en équipe" avec 3 compétences', () => {
      const pageData = readPageData('ingenierie-logiciel.json');

      const domaines = pageData.contenu.filter(
        (element) => element.type === 'domaineDeCompetence'
      ) as Array<{ type: 'domaineDeCompetence'; titre: string; competences: Array<{ titre: string }> }>;

      const domaineEquipe = domaines.find((d) => d.titre === 'Expérience en équipe');
      expect(domaineEquipe).toBeDefined();
      expect(domaineEquipe?.competences.length).toBe(3);

      const titresCompetences = domaineEquipe?.competences.map((c) => c.titre) || [];
      expect(titresCompetences).toContain('BDD');
      expect(titresCompetences).toContain('TDD');
      expect(titresCompetences).toContain('CI/CD');
    });

    it('devrait contenir le domaine "Autres pratiques connues" avec 3 compétences', () => {
      const pageData = readPageData('ingenierie-logiciel.json');

      const domaines = pageData.contenu.filter(
        (element) => element.type === 'domaineDeCompetence'
      ) as Array<{ type: 'domaineDeCompetence'; titre: string; competences: Array<{ titre: string }> }>;

      const domaineAutres = domaines.find((d) => d.titre === 'Autres pratiques connues');
      expect(domaineAutres).toBeDefined();
      expect(domaineAutres?.competences.length).toBe(3);

      const titresCompetences = domaineAutres?.competences.map((c) => c.titre) || [];
      expect(titresCompetences).toContain('CleanCode');
      expect(titresCompetences).toContain('Architecture Hexagonale');
      expect(titresCompetences).toContain('CQRS:ES');
    });

    it('devrait avoir un bouton "En savoir plus..." sur la compétence "Vibe Coding" pointant vers /a-propos-du-site', () => {
      const pageData = readPageData('ingenierie-logiciel.json');

      const domaines = pageData.contenu.filter(
        (element) => element.type === 'domaineDeCompetence'
      ) as Array<{ type: 'domaineDeCompetence'; competences: Array<{ titre: string; bouton: { texte: string; action: string } | null }> }>;

      const domaineDeveloppeur = domaines.find((d) => {
        const competences = d.competences || [];
        return competences.some((c) => c.titre === 'Vibe Coding');
      });

      expect(domaineDeveloppeur).toBeDefined();

      const vibeCoding = domaineDeveloppeur?.competences.find((c) => c.titre === 'Vibe Coding');
      expect(vibeCoding).toBeDefined();
      expect(vibeCoding?.bouton).not.toBeNull();
      expect(vibeCoding?.bouton?.texte).toBe('En savoir plus...');
      expect(vibeCoding?.bouton?.action).toBe('/a-propos-du-site');
    });

    it('devrait avoir une description pour chaque domaine de compétence', () => {
      const pageData = readPageData('ingenierie-logiciel.json');

      const domaines = pageData.contenu.filter(
        (element) => element.type === 'domaineDeCompetence'
      ) as Array<{ type: 'domaineDeCompetence'; contenu: string }>;

      domaines.forEach((domaine) => {
        expect(domaine.contenu).toBeDefined();
        expect(typeof domaine.contenu).toBe('string');
      });
    });

    it('devrait avoir une image et une description pour chaque compétence', () => {
      const pageData = readPageData('ingenierie-logiciel.json');

      const domaines = pageData.contenu.filter(
        (element) => element.type === 'domaineDeCompetence'
      ) as Array<{ type: 'domaineDeCompetence'; competences: Array<{ image?: { src: string; alt: string }; description: string }> }>;

      domaines.forEach((domaine) => {
        domaine.competences.forEach((competence) => {
          expect(competence.image).toBeDefined();
          expect(competence.image?.src).toBeDefined();
          expect(competence.image?.alt).toBeDefined();
          expect(competence.description).toBeDefined();
          expect(typeof competence.description).toBe('string');
        });
      });
    });
  });
});
