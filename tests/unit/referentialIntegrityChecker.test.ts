/**
 * Tests unitaires pour referentialIntegrityChecker.ts
 * Backend pur : testable sans dépendance React/Next.js
 */

import { checkReferentialIntegrity } from '../../utils/referentialIntegrityChecker';
import type { PageData } from '../../utils/indexReader';
import type { CompetenceBibliotheque, DomaineBibliotheque } from '../../utils/bibliothequeReader';

describe('referentialIntegrityChecker - Approche TDD', () => {
  describe('checkReferentialIntegrity', () => {
    it('devrait valider une page avec des références valides', () => {
      // ARRANGE
      const competences = new Map<string, CompetenceBibliotheque>();
      competences.set('tdd', {
        id: 'tdd',
        titre: 'TDD',
        description: 'Test-Driven Development',
        type: 'competence',
        bouton: null,
      });

      const domaines = new Map<string, DomaineBibliotheque>();
      domaines.set('experience-equipe', {
        id: 'experience-equipe',
        titre: 'Expérience en équipe',
        contenu: '',
        competences: ['tdd'],
      });

      const pageData: PageData = {
        contenu: [
          { type: 'domaineDeCompetence', ref: 'experience-equipe' } as any,
        ],
      };

      // ACT
      const result = checkReferentialIntegrity(pageData, competences, domaines);

      // ASSERT
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('devrait détecter un domaine référencé introuvable', () => {
      // ARRANGE
      const competences = new Map();
      const domaines = new Map();

      const pageData: PageData = {
        contenu: [
          { type: 'domaineDeCompetence', ref: 'domaine-inexistant' } as any,
        ],
      };

      // ACT
      const result = checkReferentialIntegrity(pageData, competences, domaines);

      // ASSERT
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Domaine référencé introuvable: "domaine-inexistant"');
    });

    it('devrait détecter une compétence référencée introuvable', () => {
      // ARRANGE
      const competences = new Map();
      const domaines = new Map<string, DomaineBibliotheque>();
      domaines.set('experience-equipe', {
        id: 'experience-equipe',
        titre: 'Expérience en équipe',
        contenu: '',
        competences: ['competence-inexistante'],
      });

      const pageData: PageData = {
        contenu: [
          { type: 'domaineDeCompetence', ref: 'experience-equipe' } as any,
        ],
      };

      // ACT
      const result = checkReferentialIntegrity(pageData, competences, domaines);

      // ASSERT
      expect(result.valid).toBe(false);
      expect(result.errors).toContain(
        'Compétence référencée introuvable: "competence-inexistante" dans le domaine "experience-equipe"'
      );
    });

    it('devrait ignorer les domaines sans référence', () => {
      // ARRANGE
      const competences = new Map();
      const domaines = new Map();

      const pageData: PageData = {
        contenu: [
          {
            type: 'domaineDeCompetence',
            titre: 'Domaine inline',
            contenu: '',
            items: [],
          },
        ],
      };

      // ACT
      const result = checkReferentialIntegrity(pageData, competences, domaines);

      // ASSERT
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
