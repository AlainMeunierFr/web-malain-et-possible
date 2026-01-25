/**
 * Tests pour indexReader.ts
 * TDD: Couvrir les fonctions non testées
 */

import fs from 'fs';
import path from 'path';
import {
  convertirIndexDataEnPageData,
  readIndexData,
  readPageData,
  readDomaineData,
  type IndexData,
  type PageData,
} from '../../utils/indexReader';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('indexReader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('convertirIndexDataEnPageData', () => {
    it('devrait convertir IndexData en PageData', () => {
      const indexData: IndexData = {
        domainesDeCompetences: [
          {
            titre: 'Domaine 1',
            contenu: 'Contenu 1',
            items: [
              {
                titre: 'Compétence 1',
                description: 'Description 1',
                bouton: null,
              },
            ],
          },
        ],
      };

      const result = convertirIndexDataEnPageData(indexData);

      expect(result.contenu).toHaveLength(1);
      expect(result.contenu[0].type).toBe('domaineDeCompetence');
      expect(result.contenu[0].titre).toBe('Domaine 1');
    });

    it('devrait convertir plusieurs domaines', () => {
      const indexData: IndexData = {
        domainesDeCompetences: [
          {
            titre: 'Domaine 1',
            contenu: 'Contenu 1',
            items: [],
          },
          {
            titre: 'Domaine 2',
            contenu: 'Contenu 2',
            items: [],
          },
        ],
      };

      const result = convertirIndexDataEnPageData(indexData);

      expect(result.contenu).toHaveLength(2);
    });
  });

  describe('readIndexData', () => {
    it('devrait lire le fichier index.json', () => {
      const mockData: IndexData = {
        domainesDeCompetences: [
          {
            titre: 'Test',
            contenu: 'Content',
            items: [],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readIndexData();

      expect(result).toEqual(mockData);
      expect(mockFs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining('index.json')
      );
    });

    it('devrait lever une erreur si fichier inexistant', () => {
      mockFs.existsSync.mockReturnValue(false);

      expect(() => readIndexData()).toThrow(
        "Le fichier index.json n'existe pas"
      );
    });
  });


  describe('readPageData', () => {
    it('devrait lire PageData avec nouvelle structure', () => {
      const mockData: PageData = {
        contenu: [
          {
            type: 'titre',
            texte: 'Test',
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readPageData('test.json');

      expect(result).toEqual(mockData);
    });

    it('devrait convertir ancienne structure en nouvelle', () => {
      const mockData: IndexData = {
        domainesDeCompetences: [
          {
            titre: 'Domaine',
            contenu: 'Contenu',
            items: [],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readPageData('old.json');

      expect(result.contenu).toHaveLength(1);
      expect(result.contenu[0].type).toBe('domaineDeCompetence');
    });

    it('devrait lever une erreur si fichier inexistant', () => {
      mockFs.existsSync.mockReturnValue(false);

      expect(() => readPageData('missing.json')).toThrow(
        "Le fichier missing.json n'existe pas"
      );
    });

    it('devrait résoudre les références externes pour témoignages', () => {
      const mockPageData = {
        contenu: [
          {
            type: 'temoignages',
            source: 'temoignages.json',
          },
        ],
      };

      // Structure réelle : le fichier source a contenu[] avec un élément temoignages qui a items[]
      const mockTemoignagesData = {
        contenu: [
          {
            type: 'temoignages',
            items: [
              {
                nom: 'Test',
                fonction: 'Fonction',
                photo: 'test.jpeg',
                temoignage: 'Citation',
              },
            ],
          },
        ],
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('test.json') || p.includes('temoignages.json');
      });

      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('test.json')) {
          return JSON.stringify(mockPageData);
        }
        if (p.includes('temoignages.json')) {
          return JSON.stringify(mockTemoignagesData);
        }
        return '';
      });

      const result = readPageData('test.json');

      expect(result.contenu[0].items).toEqual(mockTemoignagesData.contenu[0].items);
    });

    it('devrait résoudre les références externes pour détournements', () => {
      const mockPageData = {
        contenu: [
          {
            type: 'videoDetournement',
            source: 'detournements.json',
          },
        ],
      };

      // Structure réelle : le fichier source a contenu[] avec un élément videoDetournement qui a items[]
      const mockDetournementsData = {
        contenu: [
          {
            type: 'videoDetournement',
            items: [
              {
                id: 1,
                titreVideoDetournee: 'Détournement',
                videoDetournee: 'abc123',
                titreVideoOriginale: 'Original',
                videoOriginale: 'xyz789',
                pourLeCompteDe: 'Client',
                date: '2023-01-01',
                pitch: 'Description',
              },
            ],
          },
        ],
      };

      mockFs.existsSync.mockImplementation((p: any) => {
        return p.includes('test.json') || p.includes('detournements.json');
      });

      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('test.json')) {
          return JSON.stringify(mockPageData);
        }
        if (p.includes('detournements.json')) {
          return JSON.stringify(mockDetournementsData);
        }
        return '';
      });

      const result = readPageData('test.json');

      expect(result.contenu[0].items).toEqual(mockDetournementsData.contenu[0].items);
    });
  });

  describe('readDomaineData', () => {
    it('devrait lire un fichier de domaine', () => {
      const mockData: IndexData = {
        domainesDeCompetences: [
          {
            titre: 'Domaine Test',
            contenu: 'Contenu test',
            items: [],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readDomaineData('test-domaine.json');

      expect(result).toEqual(mockData);
      expect(mockFs.readFileSync).toHaveBeenCalledWith(
        expect.stringContaining('test-domaine.json'),
        'utf8'
      );
    });

    it('devrait lever une erreur si fichier inexistant', () => {
      mockFs.existsSync.mockReturnValue(false);

      expect(() => readDomaineData('missing.json')).toThrow(
        "Le fichier missing.json n'existe pas"
      );
    });
  });
});
