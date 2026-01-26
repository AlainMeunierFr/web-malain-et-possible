/**
 * Tests TDD pour e2eIdDetector.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * ITÉRATION 1 : Le cas le plus simple - detectMissingE2eIds avec aucun élément
 * ITÉRATION 2 : Détection d'un élément video sans e2eID dans JSON
 * ITÉRATION 3 : Détection d'un élément callToAction sans e2eID
 * ITÉRATION 4 : Détection d'un bouton dans groupeBoutons sans e2eID
 * ITÉRATION 5 : Détection d'un bouton dans compétence sans e2eID
 * ITÉRATION 6 : generateAuditFile avec éléments détectés
 * ITÉRATION 7 : generateAuditFile sans éléments (suppression fichier)
 */

import fs from 'fs';
import path from 'path';
import { detectMissingE2eIds, generateAuditFile } from '../../utils/e2eIdDetector';
import type { DetectionResult } from '../../utils/e2eIdDetector';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

// Mock e2eIdCounter
jest.mock('../../utils/e2eIdCounter', () => ({
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

  describe('ITÉRATION 4 : Détection d\'un bouton dans groupeBoutons sans e2eID', () => {
    it('devrait détecter un bouton dans groupeBoutons sans e2eID', () => {
      // ARRANGE : GroupeBoutons avec bouton sans e2eID
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'groupeBoutons',
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
    it('devrait ignorer _Pages-Et-Lien.json', () => {
      // ARRANGE : Fichier de configuration
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['_Pages-Et-Lien.json', 'test.json'] as any);
      
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('_Pages-Et-Lien.json')) {
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

      // ASSERT : Ne devrait pas détecter d'éléments dans Pages-Et-Lien.json
      expect(result.json.length).toBe(0);
    });
  });

  describe('ITÉRATION 9 : Détection dans _footerButtons.json', () => {
    it('devrait détecter les boutons sans e2eID dans _footerButtons.json', () => {
      // ARRANGE : _footerButtons.json avec bouton sans e2eID
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['_footerButtons.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          type: 'groupeBoutons',
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

      // ASSERT
      expect(result.json.length).toBeGreaterThan(0);
      expect(result.json.some((item) => item.file === '_footerButtons.json')).toBe(true);
    });
  });
});
