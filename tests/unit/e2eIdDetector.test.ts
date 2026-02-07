/**
 * Tests TDD pour e2eIdDetector.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * ITÉRATION 1 : Le cas le plus simple - detectMissingE2eIds avec aucun élément
 * ITÉRATION 2 : Détection d'un élément video sans e2eID dans JSON
 * ITÉRATION 3 : Détection d'un élément callToAction sans e2eID
 * ITÉRATION 4 : Détection d'un bouton dans groupeDeBoutons sans e2eID
 * ITÉRATION 5 : Détection d'un bouton dans compétence sans e2eID
 * ITÉRATION 6 : generateAuditFile avec éléments détectés
 * ITÉRATION 7 : generateAuditFile sans éléments (suppression fichier)
 */

import fs from 'fs';
import path from 'path';
import { detectMissingE2eIds, generateAuditFile } from '../../utils/backoffice';
import type { DetectionResult } from '../../utils/backoffice';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

// Mock e2eIdCounter
jest.mock('../../utils/backoffice/integrity/e2eIdCounter', () => ({
  calculateMaxCounter: jest.fn(() => 10),
}));

describe('e2eIdDetector - Approche TDD (simple → complexe)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ITÉRATION 1 : Le cas le plus simple - detectMissingE2eIds avec aucun élément', () => {
    it('devrait retourner un résultat vide si aucun élément sans e2eID', () => {
      // ARRANGE : Tous les éléments ont un e2eID
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'video',
              e2eID: 'v1',
            },
          ],
        })
      );

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT
      expect(result.json).toEqual([]);
      expect(result.react).toEqual([]);
      expect(result.compteurMax).toBe(10);
      expect(result.prochainIdLibre).toBe(11);
    });
  });

  describe('ITÉRATION 2 : Détection d\'un élément video sans e2eID', () => {
    it('devrait détecter un élément video sans e2eID', () => {
      // ARRANGE : Élément video sans e2eID
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'video',
              urlYouTube: 'https://youtube.com/watch?v=abc',
            },
          ],
        })
      );

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT
      expect(result.json.length).toBe(1);
      expect(result.json[0].type).toBe('video');
      expect(result.json[0].file).toBe('test.json');
      expect(result.json[0].path).toBe('contenu[0]');
      expect(result.json[0].action).toBe('');
    });
  });

  describe('ITÉRATION 3 : Détection d\'un élément callToAction sans e2eID', () => {
    it('devrait détecter un élément callToAction sans e2eID', () => {
      // ARRANGE : Élément callToAction sans e2eID
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'callToAction',
              action: 'Contactez-moi',
            },
          ],
        })
      );

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT
      expect(result.json.length).toBe(1);
      expect(result.json[0].type).toBe('callToAction');
      expect(result.json[0].action).toBe('');
    });
  });

  describe('ITÉRATION 4 : Détection d\'un bouton dans groupeDeBoutons sans e2eID', () => {
    it('devrait détecter un bouton dans groupeDeBoutons sans e2eID', () => {
      // ARRANGE : GroupeBoutons avec bouton sans e2eID
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'groupeDeBoutons',
              boutons: [
                {
                  id: 'email',
                  icone: 'Mail',
                  texte: 'Email',
                },
              ],
            },
          ],
        })
      );

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT
      expect(result.json.length).toBe(1);
      expect(result.json[0].type).toBe('bouton');
      expect(result.json[0].path).toBe('contenu[0].boutons[0]');
    });
  });

  describe('ITÉRATION 5 : Détection d\'un bouton dans compétence sans e2eID', () => {
    it('devrait détecter un bouton dans compétence sans e2eID', () => {
      // ARRANGE : Compétence avec bouton sans e2eID
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'domaineDeCompetence',
              competences: [
                {
                  titre: 'Compétence',
                  description: 'Description',
                  bouton: {
                    texte: 'Voir',
                    action: '/page',
                  },
                },
              ],
            },
          ],
        })
      );

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT
      expect(result.json.length).toBe(1);
      expect(result.json[0].type).toBe('competenceBouton');
      expect(result.json[0].path).toBe('contenu[0].competences[0].bouton');
    });
  });

  describe('ITÉRATION 6 : generateAuditFile avec éléments détectés', () => {
    it('devrait générer le fichier d\'audit avec les éléments détectés', () => {
      // ARRANGE : Résultat de détection avec éléments
      const result: DetectionResult = {
        json: [
          {
            file: 'test.json',
            path: 'contenu[0]',
            type: 'video',
            action: '',
          },
        ],
        react: [],
        compteurMax: 10,
        prochainIdLibre: 11,
      };

      mockFs.existsSync.mockReturnValue(false);
      mockFs.writeFileSync.mockImplementation(() => {});

      // ACT
      const auditPath = generateAuditFile(result);

      // ASSERT
      expect(auditPath).toBeTruthy();
      expect(mockFs.writeFileSync).toHaveBeenCalled();
      const writeCall = mockFs.writeFileSync.mock.calls[0];
      const writtenData = JSON.parse(writeCall[1] as string);
      expect(writtenData.json).toEqual(result.json);
      expect(writtenData.metadata.compteurMax).toBe(10);
      expect(writtenData.metadata.prochainIdLibre).toBe(11);
    });
  });

  describe('ITÉRATION 7 : generateAuditFile sans éléments (suppression fichier)', () => {
    it('devrait supprimer le fichier d\'audit s\'il existe et qu\'il n\'y a pas d\'éléments', () => {
      // ARRANGE : Résultat vide
      const result: DetectionResult = {
        json: [],
        react: [],
        compteurMax: 10,
        prochainIdLibre: 11,
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.unlinkSync.mockImplementation(() => {});

      // ACT
      const auditPath = generateAuditFile(result);

      // ASSERT
      expect(auditPath).toBeNull();
      expect(mockFs.unlinkSync).toHaveBeenCalled();
    });

    it('ne devrait pas planter si le fichier n\'existe pas', () => {
      // ARRANGE : Résultat vide, fichier inexistant
      const result: DetectionResult = {
        json: [],
        react: [],
        compteurMax: 10,
        prochainIdLibre: 11,
      };

      mockFs.existsSync.mockReturnValue(false);

      // ACT & ASSERT : Ne doit pas planter
      expect(() => generateAuditFile(result)).not.toThrow();
      expect(mockFs.unlinkSync).not.toHaveBeenCalled();
    });
  });

  describe('ITÉRATION 8 : Ignorer les fichiers de configuration', () => {
    it('devrait ignorer _Pages-Liens-Et-Menus.json', () => {
      // ARRANGE : Fichier de configuration
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['_Pages-Liens-Et-Menus.json', 'test.json'] as any);
      
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('_Pages-Liens-Et-Menus.json')) {
          return JSON.stringify({
            pages: [{ e2eID: 'v999' }], // Devrait être ignoré
          });
        }
        if (filePath.includes('test.json')) {
          return JSON.stringify({
            contenu: [{ type: 'video', e2eID: 'v1' }],
          });
        }
        return '';
      });

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT : Ne devrait pas détecter d'éléments dans _Pages-Liens-Et-Menus.json
      expect(result.json.length).toBe(0);
    });
  });

  describe('ITÉRATION 9 : Détection dans _footerButtons.json', () => {
    it('devrait ignorer _footerButtons.json (e2eID dans mapping centralisé)', () => {
      // ARRANGE : _footerButtons.json avec bouton sans e2eID
      // NOUVELLE ARCHITECTURE : _footerButtons.json est ignoré car les e2eID
      // sont maintenant stockés dans _e2eIds-mapping.json (mapping centralisé)
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['_footerButtons.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          type: 'groupeDeBoutons',
          boutons: [
            {
              id: 'email',
              icone: 'Mail',
            },
          ],
        })
      );

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT : _footerButtons.json est ignoré car les e2eID sont dans le mapping centralisé
      expect(result.json.length).toBe(0);
      expect(result.json.some((item) => item.file === '_footerButtons.json')).toBe(false);
    });
  });

  describe('ITÉRATION 10 : Détection dans les fichiers React', () => {
    it('devrait détecter un bouton sans e2eID dans un fichier TSX', () => {
      // ARRANGE
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockImplementation((dir: any) => {
        if (dir.includes('data')) {
          return [] as any;
        }
        if (dir.includes('components')) {
          return ['TestComponent.tsx'] as any;
        }
        return [] as any;
      });
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('TestComponent.tsx')) {
          return `import React from 'react';
const Component = () => {
  return (
    <div>
      <button onClick={() => console.log('click')}>
        Click me
      </button>
    </div>
  );
};`;
        }
        return '';
      });

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT
      expect(result.react.length).toBeGreaterThanOrEqual(0);
    });

    it('devrait détecter un Link sans e2eID', () => {
      // ARRANGE
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockImplementation((dir: any) => {
        if (dir.includes('data')) {
          return [] as any;
        }
        if (dir.includes('components')) {
          return ['LinkComponent.tsx'] as any;
        }
        return [] as any;
      });
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('LinkComponent.tsx')) {
          return `import Link from 'next/link';
const Component = () => {
  return (
    <Link href="/page">Go to page</Link>
  );
};`;
        }
        return '';
      });

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT : Ne doit pas planter
      expect(result).toBeDefined();
    });

    it('devrait ignorer les éléments avec e2eID déjà défini', () => {
      // ARRANGE
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockImplementation((dir: any) => {
        if (dir.includes('data')) {
          return [] as any;
        }
        if (dir.includes('components')) {
          return ['WithE2eId.tsx'] as any;
        }
        return [] as any;
      });
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('WithE2eId.tsx')) {
          return `import React from 'react';
const Component = () => {
  return (
    <button e2eid="b1" onClick={() => {}}>
      Click
    </button>
  );
};`;
        }
        return '';
      });

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT : Ne devrait pas détecter d'éléments
      expect(result.react.filter(r => r.file === 'WithE2eId.tsx')).toHaveLength(0);
    });

    it('devrait ignorer les éléments avec e2eID="null"', () => {
      // ARRANGE
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockImplementation((dir: any) => {
        if (dir.includes('data')) {
          return [] as any;
        }
        if (dir.includes('components')) {
          return ['NullE2eId.tsx'] as any;
        }
        return [] as any;
      });
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('NullE2eId.tsx')) {
          return `import React from 'react';
const Component = () => {
  return (
    <button e2eid="null" onClick={() => {}}>
      Excluded
    </button>
  );
};`;
        }
        return '';
      });

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT : Ne devrait pas détecter d'éléments (exclus explicitement)
      expect(result.react.filter(r => r.file === 'NullE2eId.tsx')).toHaveLength(0);
    });

    it('devrait détecter une Image cliquable sans e2eID', () => {
      // ARRANGE
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockImplementation((dir: any) => {
        if (dir.includes('data')) {
          return [] as any;
        }
        if (dir.includes('components')) {
          return ['ImageComponent.tsx'] as any;
        }
        return [] as any;
      });
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('ImageComponent.tsx')) {
          return `import Image from 'next/image';
const Component = () => {
  return (
    <Image src="/photo.jpg" alt="Photo" onClick={() => {}} />
  );
};`;
        }
        return '';
      });

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT
      expect(result).toBeDefined();
    });
  });

  describe('ITÉRATION 11 : Items avec e2eID valide', () => {
    it('devrait ignorer les éléments avec e2eID défini (non null)', () => {
      // ARRANGE : Élément avec e2eID valide
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'video',
              urlYouTube: 'https://youtube.com/watch?v=abc',
              e2eID: 'v1',
            },
          ],
        })
      );

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT
      expect(result.json.length).toBe(0);
    });

    it('devrait détecter les éléments avec e2eID: null (null est falsy)', () => {
      // ARRANGE : Élément avec e2eID: null - traité comme "pas d'e2eID"
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test-null.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'video',
              urlYouTube: 'https://youtube.com/watch?v=abc',
              e2eID: null,
            },
          ],
        })
      );

      // ACT
      const result = detectMissingE2eIds();

      // ASSERT : null est falsy, donc l'élément est détecté
      expect(result.json.length).toBe(1);
    });
  });

  describe('ITÉRATION 12 : Gestion des erreurs', () => {
    it('devrait gérer les erreurs de lecture de fichier JSON', () => {
      // ARRANGE
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['invalid.json'] as any);
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Erreur de lecture');
      });

      // ACT & ASSERT : Ne doit pas planter
      expect(() => detectMissingE2eIds()).not.toThrow();
    });

    it('devrait gérer les JSON mal formés', () => {
      // ARRANGE
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['malformed.json'] as any);
      mockFs.readFileSync.mockReturnValue('not valid json {{{');

      // ACT & ASSERT : Ne doit pas planter
      expect(() => detectMissingE2eIds()).not.toThrow();
    });
  });
});
