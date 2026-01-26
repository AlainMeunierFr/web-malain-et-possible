/**
 * Tests unitaires pour profilBuilder.ts
 * Backend pur : testable sans dépendance React/Next.js
 */

import { resolvePageReferences } from '../../utils/profilBuilder';
import type { PageData } from '../../utils/indexReader';
import type { CompetenceBibliotheque, DomaineBibliotheque } from '../../utils/bibliothequeReader';

describe('profilBuilder - Approche TDD', () => {
  describe('resolvePageReferences', () => {
    it('devrait résoudre une référence simple vers un domaine', () => {
      // ARRANGE
      const competences = new Map<string, CompetenceBibliotheque>();
      competences.set('tdd', {
        id: 'tdd',
        titre: 'TDD',
        description: 'Test-Driven Development',
        type: 'competence',
        bouton: null,
      });
      competences.set('bdd', {
        id: 'bdd',
        titre: 'BDD',
        description: 'Behavior-Driven Development',
        type: 'competence',
        bouton: null,
      });

      const domaines = new Map<string, DomaineBibliotheque>();
      domaines.set('experience-equipe', {
        id: 'experience-equipe',
        titre: 'Expérience en équipe',
        contenu: 'Pratiques collaboratives',
        competences: ['tdd', 'bdd'],
      });

      const pageData: PageData = {
        contenu: [
          { type: 'titre', texte: 'Test' },
          { type: 'domaineDeCompetence', ref: 'experience-equipe' } as any,
        ],
      };

      // ACT
      const result = resolvePageReferences(pageData, competences, domaines);

      // ASSERT
      expect(result.contenu).toHaveLength(2);
      expect(result.contenu[0]).toEqual({ type: 'titre', texte: 'Test' });
      
      const domaineResolu = result.contenu[1] as any;
      expect(domaineResolu.type).toBe('domaineDeCompetence');
      expect(domaineResolu.titre).toBe('Expérience en équipe');
      expect(domaineResolu.contenu).toBe('Pratiques collaboratives');
      expect(domaineResolu.items).toHaveLength(2);
      expect(domaineResolu.items[0].titre).toBe('TDD');
      expect(domaineResolu.items[1].titre).toBe('BDD');
    });

    it('devrait conserver les éléments sans référence', () => {
      // ARRANGE
      const competences = new Map();
      const domaines = new Map();

      const pageData: PageData = {
        contenu: [
          { type: 'titre', texte: 'Test' },
          { type: 'video', urlYouTube: 'https://youtu.be/test', lancementAuto: false },
        ],
      };

      // ACT
      const result = resolvePageReferences(pageData, competences, domaines);

      // ASSERT
      expect(result.contenu).toHaveLength(2);
      expect(result.contenu[0]).toEqual({ type: 'titre', texte: 'Test' });
      expect(result.contenu[1]).toEqual({
        type: 'video',
        urlYouTube: 'https://youtu.be/test',
        lancementAuto: false,
      });
    });

    it('devrait lever une erreur si le domaine référencé n\'existe pas', () => {
      // ARRANGE
      const competences = new Map();
      const domaines = new Map();

      const pageData: PageData = {
        contenu: [
          { type: 'domaineDeCompetence', ref: 'domaine-inexistant' } as any,
        ],
      };

      // ACT & ASSERT
      expect(() => resolvePageReferences(pageData, competences, domaines)).toThrow(
        'Domaine référencé introuvable: "domaine-inexistant"'
      );
    });

    it('devrait lever une erreur si une compétence référencée n\'existe pas', () => {
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

      // ACT & ASSERT
      expect(() => resolvePageReferences(pageData, competences, domaines)).toThrow(
        'Compétence référencée introuvable: "competence-inexistante" dans le domaine "experience-equipe"'
      );
    });
  });
});
