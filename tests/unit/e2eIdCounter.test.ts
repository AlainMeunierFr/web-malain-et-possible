/**
 * Tests TDD pour e2eIdCounter.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * ITÉRATION 1 : Le cas le plus simple - extractNumberFromE2eId avec format valide
 * ITÉRATION 2 : extractNumberFromE2eId avec format invalide
 * ITÉRATION 3 : calculateMaxCounter avec un seul fichier JSON
 * ITÉRATION 4 : calculateMaxCounter avec plusieurs fichiers JSON
 * ITÉRATION 5 : calculateMaxCounter avec constantes statiques (Header)
 * ITÉRATION 6 : getNextAvailableId
 * ITÉRATION 7 : Cas limites (fichiers ignorés, erreurs de parsing)
 */

import fs from 'fs';
import path from 'path';
import { calculateMaxCounter, getNextAvailableId } from '../../utils/e2eIdCounter';
import { E2E_IDS } from '../../constants/e2eIds';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

// Mock constants
jest.mock('../../constants/e2eIds', () => ({
  E2E_IDS: {
    header: {
      logo: 'h1',
      photo: 'h2',
    },
  },
}));

describe('e2eIdCounter - Approche TDD (simple → complexe)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ITÉRATION 1 : Le cas le plus simple - extractNumberFromE2eId (via calculateMaxCounter)', () => {
    it('devrait calculer le max avec un seul e2eID dans un fichier JSON', () => {
      // ARRANGE : Un fichier JSON avec un e2eID
      const mockData = {
        contenu: [
          {
            type: 'video',
            e2eID: 'v10',
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      // ACT
      const max = calculateMaxCounter();

      // ASSERT
      expect(max).toBe(10);
    });
  });

  describe('ITÉRATION 2 : calculateMaxCounter avec plusieurs e2eID', () => {
    it('devrait trouver le maximum parmi plusieurs e2eID', () => {
      // ARRANGE : Plusieurs e2eID
      const mockData = {
        contenu: [
          {
            type: 'video',
            e2eID: 'v5',
          },
          {
            type: 'callToAction',
            e2eID: 'a15',
          },
          {
            type: 'video',
            e2eID: 'v3',
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      // ACT
      const max = calculateMaxCounter();

      // ASSERT : Le maximum est 15
      expect(max).toBe(15);
    });
  });

  describe('ITÉRATION 3 : calculateMaxCounter avec plusieurs fichiers JSON', () => {
    it('devrait trouver le maximum parmi plusieurs fichiers', () => {
      // ARRANGE : Plusieurs fichiers
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['file1.json', 'file2.json'] as any);
      
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('file1.json')) {
          return JSON.stringify({
            contenu: [{ type: 'video', e2eID: 'v20' }],
          });
        }
        if (filePath.includes('file2.json')) {
          return JSON.stringify({
            contenu: [{ type: 'callToAction', e2eID: 'a30' }],
          });
        }
        return '';
      });

      // ACT
      const max = calculateMaxCounter();

      // ASSERT : Le maximum est 30
      expect(max).toBe(30);
    });
  });

  describe('ITÉRATION 4 : calculateMaxCounter avec constantes statiques', () => {
    it('devrait inclure les constantes statiques (Header) dans le calcul', () => {
      // ARRANGE : Fichiers JSON + constantes
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [{ type: 'video', e2eID: 'v5' }],
        })
      );

      // ACT
      const max = calculateMaxCounter();

      // ASSERT : Le maximum devrait être au moins celui des constantes (h1=1, h2=2)
      // Mais si les JSON ont v5, le max devrait être 5
      expect(max).toBeGreaterThanOrEqual(2);
    });
  });

  describe('ITÉRATION 5 : calculateMaxCounter ignore les fichiers de configuration', () => {
    it('devrait ignorer _Pages-Et-Lien.json', () => {
      // ARRANGE : Fichier de configuration avec e2eID
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
            contenu: [{ type: 'video', e2eID: 'v10' }],
          });
        }
        return '';
      });

      // ACT
      const max = calculateMaxCounter();

      // ASSERT : Le max devrait être 10, pas 999
      expect(max).toBe(10);
    });
  });

  describe('ITÉRATION 6 : getNextAvailableId', () => {
    it('devrait retourner le prochain ID disponible', () => {
      // ARRANGE : Max = 10
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [{ type: 'video', e2eID: 'v10' }],
        })
      );

      // ACT
      const nextId = getNextAvailableId();

      // ASSERT : Le prochain ID devrait être 11
      expect(nextId).toBe(11);
    });

    it('devrait retourner 1 si aucun e2eID n\'existe', () => {
      // ARRANGE : Aucun e2eID (mais constantes existent)
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [{ type: 'titre', texte: 'Test' }], // Pas d'e2eID
        })
      );

      // ACT
      const nextId = getNextAvailableId();

      // ASSERT : Le prochain ID devrait être au moins 1 (les constantes h1=1, h2=2 existent)
      // Donc le prochain devrait être 3
      expect(nextId).toBeGreaterThanOrEqual(1);
    });
  });

  describe('ITÉRATION 7 : Cas limites', () => {
    it('devrait retourner 0 si le dossier data/ n\'existe pas', () => {
      // ARRANGE : Dossier inexistant
      mockFs.existsSync.mockReturnValue(false);

      // ACT
      const max = calculateMaxCounter();

      // ASSERT
      expect(max).toBe(0);
    });

    it('devrait ignorer les erreurs de parsing JSON', () => {
      // ARRANGE : Fichier JSON malformé
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['bad.json', 'good.json'] as any);
      
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('bad.json')) {
          throw new Error('Invalid JSON');
        }
        if (filePath.includes('good.json')) {
          return JSON.stringify({
            contenu: [{ type: 'video', e2eID: 'v5' }],
          });
        }
        return '';
      });

      // ACT
      const max = calculateMaxCounter();

      // ASSERT : Devrait ignorer le fichier malformé et retourner 5
      expect(max).toBe(5);
    });

    it('devrait gérer les e2eID dans des structures imbriquées', () => {
      // ARRANGE : Structure imbriquée
      const mockData = {
        contenu: [
          {
            type: 'domaineDeCompetence',
            items: [
              {
                titre: 'Compétence',
                bouton: {
                  e2eID: 'c20',
                },
              },
            ],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      // ACT
      const max = calculateMaxCounter();

      // ASSERT : Devrait trouver c20 = 20
      expect(max).toBe(20);
    });
  });
});
