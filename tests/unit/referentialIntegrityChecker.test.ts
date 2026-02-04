/**
 * Tests unitaires pour referentialIntegrityChecker.ts
 * Backend pur : testable sans dépendance React/Next.js
 */

import fs from 'fs';
import { checkReferentialIntegrity, checkAllPagesIntegrity } from '../../utils/backoffice';
import type { PageData, CompetenceBibliotheque, DomaineBibliotheque } from '../../utils';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

// Mock pageReader
jest.mock('../../utils/vitrine/pageReader', () => ({
  readPageData: jest.fn(),
}));
import { readPageData } from '../../utils/vitrine/pageReader';
const mockReadPageData = readPageData as jest.MockedFunction<typeof readPageData>;

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

  describe('checkAllPagesIntegrity', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('devrait valider tous les fichiers JSON du répertoire data', () => {
      // ARRANGE
      mockFs.readdirSync.mockReturnValue(['page1.json', 'page2.json'] as any);
      mockReadPageData.mockReturnValue({
        contenu: [{ type: 'titre', niveau: 1, texte: 'Test' }],
      });

      const competences = new Map<string, CompetenceBibliotheque>();
      const domaines = new Map<string, DomaineBibliotheque>();

      // ACT
      const result = checkAllPagesIntegrity(competences, domaines);

      // ASSERT
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('devrait ignorer les fichiers bibliotheque', () => {
      // ARRANGE
      mockFs.readdirSync.mockReturnValue(['bibliotheque-competences.json', 'page.json'] as any);
      mockReadPageData.mockReturnValue({
        contenu: [],
      });

      const competences = new Map<string, CompetenceBibliotheque>();
      const domaines = new Map<string, DomaineBibliotheque>();

      // ACT
      const result = checkAllPagesIntegrity(competences, domaines);

      // ASSERT
      // Seul page.json doit être traité
      expect(mockReadPageData).toHaveBeenCalledWith('page.json');
      expect(mockReadPageData).not.toHaveBeenCalledWith('bibliotheque-competences.json');
    });

    it('devrait détecter les erreurs d\'intégrité dans les pages', () => {
      // ARRANGE
      mockFs.readdirSync.mockReturnValue(['page-avec-erreur.json'] as any);
      mockReadPageData.mockReturnValue({
        contenu: [
          { type: 'domaineDeCompetence', ref: 'domaine-inexistant' },
        ],
      });

      const competences = new Map<string, CompetenceBibliotheque>();
      const domaines = new Map<string, DomaineBibliotheque>();

      // ACT
      const result = checkAllPagesIntegrity(competences, domaines);

      // ASSERT
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('devrait ignorer les fichiers sans contenu valide', () => {
      // ARRANGE
      mockFs.readdirSync.mockReturnValue(['page-sans-contenu.json'] as any);
      mockReadPageData.mockReturnValue({
        titre: 'Page sans contenu',
      } as any);

      const competences = new Map<string, CompetenceBibliotheque>();
      const domaines = new Map<string, DomaineBibliotheque>();

      // ACT
      const result = checkAllPagesIntegrity(competences, domaines);

      // ASSERT
      expect(result.valid).toBe(true);
    });

    it('devrait gérer les erreurs de lecture de fichier', () => {
      // ARRANGE
      mockFs.readdirSync.mockReturnValue(['page-erreur.json'] as any);
      mockReadPageData.mockImplementation(() => {
        throw new Error('Erreur de lecture');
      });

      const competences = new Map<string, CompetenceBibliotheque>();
      const domaines = new Map<string, DomaineBibliotheque>();

      // ACT
      const result = checkAllPagesIntegrity(competences, domaines);

      // ASSERT
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Erreur lors de la vérification'))).toBe(true);
    });

    it('devrait ignorer les erreurs "n\'existe pas"', () => {
      // ARRANGE
      mockFs.readdirSync.mockReturnValue(['page-inexistante.json'] as any);
      mockReadPageData.mockImplementation(() => {
        throw new Error('Le fichier n\'existe pas');
      });

      const competences = new Map<string, CompetenceBibliotheque>();
      const domaines = new Map<string, DomaineBibliotheque>();

      // ACT
      const result = checkAllPagesIntegrity(competences, domaines);

      // ASSERT
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('devrait ignorer les erreurs "is not iterable"', () => {
      // ARRANGE
      mockFs.readdirSync.mockReturnValue(['page-non-iterable.json'] as any);
      mockReadPageData.mockImplementation(() => {
        throw new Error('contenu is not iterable');
      });

      const competences = new Map<string, CompetenceBibliotheque>();
      const domaines = new Map<string, DomaineBibliotheque>();

      // ACT
      const result = checkAllPagesIntegrity(competences, domaines);

      // ASSERT
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('devrait ignorer les fichiers non-JSON', () => {
      // ARRANGE
      mockFs.readdirSync.mockReturnValue(['readme.md', 'page.json'] as any);
      mockReadPageData.mockReturnValue({
        contenu: [],
      });

      const competences = new Map<string, CompetenceBibliotheque>();
      const domaines = new Map<string, DomaineBibliotheque>();

      // ACT
      const result = checkAllPagesIntegrity(competences, domaines);

      // ASSERT
      expect(mockReadPageData).toHaveBeenCalledWith('page.json');
      expect(mockReadPageData).not.toHaveBeenCalledWith('readme.md');
    });
  });
});
