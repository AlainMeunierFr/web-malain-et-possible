/**
 * Tests TDD pour e2eIdGenerator.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * ITÉRATION 1 : Le cas le plus simple - generateE2eIdsFromAudit avec fichier inexistant
 * ITÉRATION 2 : generateE2eId avec type connu
 * ITÉRATION 3 : updateJsonFile avec chemin simple
 * ITÉRATION 4 : generateE2eIdsFromAudit avec action "add" pour JSON
 * ITÉRATION 5 : generateE2eIdsFromAudit avec action "null" pour JSON
 * ITÉRATION 6 : generateE2eIdsFromAudit avec action "add" pour React
 * ITÉRATION 7 : Cas limites (erreurs, chemins invalides)
 */

import fs from 'fs';
import path from 'path';
import { generateE2eIdsFromAudit } from '../../utils/e2eIdGenerator';
import type { DetectionItem } from '../../utils/e2eIdDetector';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

// Mock e2eIdDetector
jest.mock('../../utils/e2eIdDetector', () => ({
  detectMissingE2eIds: jest.fn(() => ({
    json: [],
    react: [],
    compteurMax: 10,
    prochainIdLibre: 11,
  })),
  generateAuditFile: jest.fn(() => null),
}));

// Mock e2eIdCounter
jest.mock('../../utils/e2eIdCounter', () => ({
  getNextAvailableId: jest.fn(() => 11),
  calculateMaxCounter: jest.fn(() => 10),
}));

describe('e2eIdGenerator - Approche TDD (simple → complexe)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ITÉRATION 1 : Le cas le plus simple - generateE2eIdsFromAudit avec fichier inexistant', () => {
    it('devrait retourner success si le fichier d\'audit n\'existe pas', () => {
      // ARRANGE : Fichier inexistant
      mockFs.existsSync.mockReturnValue(false);

      // ACT
      const result = generateE2eIdsFromAudit();

      // ASSERT
      expect(result.success).toBe(true);
      expect(result.generated).toBe(0);
      expect(result.excluded).toBe(0);
      expect(result.errors).toEqual([]);
    });
  });

  describe('ITÉRATION 2 : generateE2eIdsFromAudit avec action "add" pour JSON', () => {
    it('devrait générer un e2eID pour un élément JSON avec action "add"', () => {
      // ARRANGE : Fichier d'audit avec élément à générer
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'contenu[0]',
            type: 'video',
            action: 'add',
          },
        ],
        react: [],
      };

      const mockJsonData = {
        contenu: [
          {
            type: 'video',
            urlYouTube: 'https://youtube.com/watch?v=abc',
          },
        ],
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test.json');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        if (p.includes('test.json')) {
          return JSON.stringify(mockJsonData);
        }
        return '';
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      // ACT
      const result = generateE2eIdsFromAudit();

      // ASSERT
      expect(result.success).toBe(true);
      expect(result.generated).toBe(1);
      expect(result.excluded).toBe(0);
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });
  });

  describe('ITÉRATION 3 : generateE2eIdsFromAudit avec action "null" pour JSON', () => {
    it('devrait exclure un élément JSON avec action "null"', () => {
      // ARRANGE : Fichier d'audit avec élément à exclure
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'contenu[0]',
            type: 'video',
            action: 'null',
          },
        ],
        react: [],
      };

      const mockJsonData = {
        contenu: [
          {
            type: 'video',
            urlYouTube: 'https://youtube.com/watch?v=abc',
          },
        ],
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test.json');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        if (p.includes('test.json')) {
          return JSON.stringify(mockJsonData);
        }
        return '';
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      // ACT
      const result = generateE2eIdsFromAudit();

      // ASSERT
      expect(result.success).toBe(true);
      expect(result.generated).toBe(0);
      expect(result.excluded).toBe(1);
    });
  });

  describe('ITÉRATION 4 : generateE2eIdsFromAudit ignore les éléments non arbitrés', () => {
    it('devrait ignorer les éléments avec action vide (non arbitrés)', () => {
      // ARRANGE : Fichier d'audit avec élément non arbitré
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'contenu[0]',
            type: 'video',
            action: '', // Non arbitré
          },
        ],
        react: [],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(auditData));

      // ACT
      const result = generateE2eIdsFromAudit();

      // ASSERT : Ne devrait rien générer ni exclure
      expect(result.generated).toBe(0);
      expect(result.excluded).toBe(0);
    });
  });

  describe('ITÉRATION 5 : generateE2eIdsFromAudit avec plusieurs éléments', () => {
    it('devrait traiter plusieurs éléments avec actions différentes', () => {
      // ARRANGE : Plusieurs éléments
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test1.json',
            path: 'contenu[0]',
            type: 'video',
            action: 'add',
          },
          {
            file: 'test2.json',
            path: 'contenu[0]',
            type: 'callToAction',
            action: 'null',
          },
        ],
        react: [],
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return JSON.stringify({ contenu: [{}] });
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      // ACT
      const result = generateE2eIdsFromAudit();

      // ASSERT
      expect(result.generated).toBe(1);
      expect(result.excluded).toBe(1);
    });
  });

  describe('ITÉRATION 6 : Gestion des erreurs', () => {
    it('devrait gérer les erreurs de fichier JSON inexistant', () => {
      // ARRANGE : Fichier JSON inexistant
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'missing.json',
            path: 'contenu[0]',
            type: 'video',
            action: 'add',
          },
        ],
        react: [],
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json');
      });
      mockFs.readFileSync.mockReturnValue(JSON.stringify(auditData));

      // ACT
      const result = generateE2eIdsFromAudit();

      // ASSERT : Devrait avoir une erreur
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('devrait gérer les erreurs de chemin invalide dans JSON', () => {
      // ARRANGE : Chemin invalide
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'contenu[999]', // Index invalide
            type: 'video',
            action: 'add',
          },
        ],
        react: [],
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test.json');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return JSON.stringify({ contenu: [] }); // Tableau vide
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      // ACT
      const result = generateE2eIdsFromAudit();

      // ASSERT : Devrait avoir une erreur
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });
});
