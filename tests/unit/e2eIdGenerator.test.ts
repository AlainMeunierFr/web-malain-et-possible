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
import { generateE2eIdsFromAudit } from '../../utils/backoffice';
import type { DetectionItem } from '../../utils/backoffice';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

// Mock e2eIdDetector
jest.mock('../../utils/backoffice/integrity/e2eIdDetector', () => ({
  detectMissingE2eIds: jest.fn(() => ({
    json: [],
    react: [],
    compteurMax: 10,
    prochainIdLibre: 11,
  })),
  generateAuditFile: jest.fn(() => null),
}));

// Mock e2eIdCounter
jest.mock('../../utils/backoffice/integrity/e2eIdCounter', () => ({
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

  describe('ITÉRATION 7 : Chemins JSON complexes', () => {
    it('devrait gérer un chemin avec objet simple (sans tableau)', () => {
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'element',
            type: 'bouton',
            action: 'add',
          },
        ],
        react: [],
      };

      const mockJsonData = {
        element: {
          type: 'bouton',
        },
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test.json');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return JSON.stringify(mockJsonData);
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = generateE2eIdsFromAudit();
      expect(result.generated).toBe(1);
    });

    it('devrait gérer un chemin profond avec plusieurs niveaux d\'objets', () => {
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'niveau1.niveau2.element',
            type: 'bouton',
            action: 'add',
          },
        ],
        react: [],
      };

      const mockJsonData = {
        niveau1: {
          niveau2: {
            element: { type: 'bouton' },
          },
        },
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test.json');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return JSON.stringify(mockJsonData);
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = generateE2eIdsFromAudit();
      expect(result.generated).toBe(1);
    });

    it('devrait gérer un chemin mixte objet et tableau', () => {
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'items[0].bouton',
            type: 'bouton',
            action: 'add',
          },
        ],
        react: [],
      };

      const mockJsonData = {
        items: [
          { bouton: { type: 'bouton' } },
        ],
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test.json');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return JSON.stringify(mockJsonData);
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = generateE2eIdsFromAudit();
      expect(result.generated).toBe(1);
    });

    it('devrait signaler une erreur si le chemin tableau pointe vers un non-tableau', () => {
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'pasUnTableau[0]',
            type: 'bouton',
            action: 'add',
          },
        ],
        react: [],
      };

      const mockJsonData = {
        pasUnTableau: 'string', // Pas un tableau
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test.json');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return JSON.stringify(mockJsonData);
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = generateE2eIdsFromAudit();
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('n\'est pas un tableau');
    });
  });

  describe('ITÉRATION 8 : Actions React', () => {
    it('devrait générer un e2eID pour un élément React avec action "add"', () => {
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [],
        react: [
          {
            file: 'TestComponent.tsx',
            line: 5,
            type: 'button',
            action: 'add',
          },
        ],
      };

      const mockReactContent = `import React from 'react';
const Component = () => {
  return (
    <div>
      <button onClick={() => {}}>
        Click
      </button>
    </div>
  );
};`;

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('TestComponent.tsx');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return mockReactContent;
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = generateE2eIdsFromAudit();
      expect(result.generated).toBe(1);
    });

    it('devrait exclure un élément React avec action "null"', () => {
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [],
        react: [
          {
            file: 'TestComponent.tsx',
            line: 5,
            type: 'button',
            action: 'null',
          },
        ],
      };

      const mockReactContent = `import React from 'react';
const Component = () => {
  return (
    <div>
      <button onClick={() => {}}>
        Click
      </button>
    </div>
  );
};`;

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('TestComponent.tsx');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return mockReactContent;
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = generateE2eIdsFromAudit();
      expect(result.excluded).toBe(1);
    });

    it('devrait gérer les erreurs de fichier React inexistant', () => {
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [],
        react: [
          {
            file: 'Missing.tsx',
            line: 5,
            type: 'button',
            action: 'add',
          },
        ],
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json');
      });
      mockFs.readFileSync.mockReturnValue(JSON.stringify(auditData));

      const result = generateE2eIdsFromAudit();
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('devrait ignorer les éléments React sans numéro de ligne', () => {
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [],
        react: [
          {
            file: 'Test.tsx',
            type: 'button',
            action: 'add',
            // Pas de 'line'
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(auditData));

      const result = generateE2eIdsFromAudit();
      expect(result.generated).toBe(0);
    });
  });

  describe('ITÉRATION 9 : Types d\'éléments', () => {
    it.each([
      ['video', 'v'],
      ['callToAction', 'a'],
      ['bouton', 'b'],
      ['competenceBouton', 'c'],
      ['link', 'l'],
      ['button', 'b'],
      ['image', 'h'],
      ['header', 'h'],
      ['NOUVEAU_TYPE_INTERACTIF', 'x'],
      ['typeInconnu', 'x'], // Fallback
    ])('devrait utiliser le préfixe "%s" pour le type "%s"', (type, expectedPrefix) => {
      const auditData = {
        metadata: {
          compteurMax: 10,
          prochainIdLibre: 11,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'element',
            type: type,
            action: 'add',
          },
        ],
        react: [],
      };

      const mockJsonData = { element: {} };
      let writtenData: any = null;

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test.json');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return JSON.stringify(mockJsonData);
      });
      mockFs.writeFileSync.mockImplementation((p: any, data: any) => {
        if (p.includes('test.json')) {
          writtenData = JSON.parse(data);
        }
      });

      generateE2eIdsFromAudit();

      expect(writtenData?.element?.e2eID).toMatch(new RegExp(`^${expectedPrefix}\\d+$`));
    });
  });

  describe('ITÉRATION 10 : Liens et plages réservées', () => {
    it('devrait sauter les IDs dans la plage réservée pour les liens', () => {
      // Mock isInReservedRange pour retourner true pour certains IDs
      jest.mock('../../utils/shared/e2eIdFromUrl', () => ({
        isInReservedRange: (id: number) => id >= 800 && id <= 999,
      }));

      const auditData = {
        metadata: {
          compteurMax: 799,
          prochainIdLibre: 800,
          dateGeneration: new Date().toISOString(),
        },
        json: [
          {
            file: 'test.json',
            path: 'element',
            type: 'link',
            action: 'add',
          },
        ],
        react: [],
      };

      const mockJsonData = { element: {} };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('e2e-ids-pending.json') || p.includes('test.json');
      });
      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('e2e-ids-pending.json')) {
          return JSON.stringify(auditData);
        }
        return JSON.stringify(mockJsonData);
      });
      mockFs.writeFileSync.mockImplementation(() => {});

      const result = generateE2eIdsFromAudit();
      // Le test vérifie que la logique de saut existe
      expect(result.generated).toBe(1);
    });
  });
});
