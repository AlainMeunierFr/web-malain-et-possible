/**
 * Tests unitaires pour bibliothequeReader.ts
 * Backend pur : testable sans dépendance React/Next.js
 */

import fs from 'fs';
import path from 'path';
import { readCompetences, readDomaines, readAutres } from '../../utils/bibliothequeReader';

// Mock fs
jest.mock('fs');
jest.mock('path');

describe('bibliothequeReader - Approche TDD', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockPath = path as jest.Mocked<typeof path>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, 'cwd').mockReturnValue('/project');
    mockPath.join.mockImplementation((...args) => args.join('/'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('readCompetences', () => {
    it('devrait lire les compétences depuis competences.json', () => {
      // ARRANGE
      const mockCompetences = {
        competences: {
          'tdd': {
            id: 'tdd',
            titre: 'TDD',
            description: 'Test-Driven Development',
            type: 'competence',
            bouton: null,
          },
          'bdd': {
            id: 'bdd',
            titre: 'BDD',
            description: 'Behavior-Driven Development',
            type: 'competence',
            bouton: null,
          },
        },
      };

      mockPath.join.mockReturnValueOnce('/project/data/bibliotheque/competences.json');
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockCompetences));

      // ACT
      const result = readCompetences();

      // ASSERT
      expect(result.size).toBe(2);
      expect(result.get('tdd')).toBeDefined();
      expect(result.get('tdd')?.titre).toBe('TDD');
      expect(result.get('bdd')).toBeDefined();
      expect(result.get('bdd')?.titre).toBe('BDD');
    });

    it('devrait lever une erreur si le fichier n\'existe pas', () => {
      // ARRANGE
      mockPath.join.mockReturnValueOnce('/project/data/bibliotheque/competences.json');
      mockFs.existsSync.mockReturnValueOnce(false);

      // ACT & ASSERT
      expect(() => readCompetences()).toThrow('Le fichier competences.json n\'existe pas');
    });

    it('devrait lever une erreur si la structure est invalide', () => {
      // ARRANGE
      mockPath.join.mockReturnValueOnce('/project/data/bibliotheque/competences.json');
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify({}));

      // ACT & ASSERT
      expect(() => readCompetences()).toThrow('doit contenir un objet "competences"');
    });
  });

  describe('readDomaines', () => {
    it('devrait lire les domaines depuis domaines.json', () => {
      // ARRANGE
      const mockDomaines = {
        domaines: {
          'experience-equipe': {
            id: 'experience-equipe',
            titre: 'Expérience en équipe',
            contenu: 'Pratiques collaboratives',
            competences: ['tdd', 'bdd'],
          },
        },
      };

      mockPath.join.mockReturnValueOnce('/project/data/bibliotheque/domaines.json');
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockDomaines));

      // ACT
      const result = readDomaines();

      // ASSERT
      expect(result.size).toBe(1);
      expect(result.get('experience-equipe')).toBeDefined();
      expect(result.get('experience-equipe')?.titre).toBe('Expérience en équipe');
      expect(result.get('experience-equipe')?.competences).toEqual(['tdd', 'bdd']);
    });

    it('devrait lire le champ experiences depuis domaines.json', () => {
      // ARRANGE
      const mockDomaines = {
        domaines: {
          'interactions-humaines': {
            id: 'interactions-humaines',
            titre: 'Interactions humaines',
            contenu: 'Citation',
            competences: ['service-client'],
            experiences: ['1', '2', '3'],
          },
        },
      };

      mockPath.join.mockReturnValueOnce('/project/data/bibliotheque/domaines.json');
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockDomaines));

      // ACT
      const result = readDomaines();

      // ASSERT
      expect(result.get('interactions-humaines')?.experiences).toEqual(['1', '2', '3']);
    });

    it('devrait lever une erreur si le fichier n\'existe pas', () => {
      // ARRANGE
      mockPath.join.mockReturnValueOnce('/project/data/bibliotheque/domaines.json');
      mockFs.existsSync.mockReturnValueOnce(false);

      // ACT & ASSERT
      expect(() => readDomaines()).toThrow('Le fichier domaines.json n\'existe pas');
    });
  });

  describe('readAutres', () => {
    it('devrait lire les expériences depuis experienceEtApprentissage.json', () => {
      // ARRANGE
      const mockAutres = {
        experienceEtApprentissage: {
          '1': {
            id: '1',
            type: 'Expériences et apprentissages',
            description: '**Gestion de plateaux d\'assistance technique** - Description de l\'expérience',
            periode: null,
          },
        },
      };

      mockPath.join.mockReturnValueOnce('/project/data/bibliotheque/experienceEtApprentissage.json');
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockAutres));

      // ACT
      const result = readAutres();

      // ASSERT
      expect(result.size).toBe(1);
      expect(result.get('1')).toBeDefined();
      expect(result.get('1')?.description).toContain('Gestion de plateaux d\'assistance technique');
      expect(result.get('1')?.type).toBe('experienceEtApprentissage');
      expect(result.get('1')?.categorie).toBe('Expériences et apprentissages');
    });
  });
});
