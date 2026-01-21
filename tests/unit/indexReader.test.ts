/**
 * Tests pour indexReader.ts
 * TDD: Couvrir les fonctions non testées
 */

import fs from 'fs';
import path from 'path';
import {
  convertirIndexDataEnPageData,
  readIndexData,
  readDetournementsVideo,
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

  describe('readDetournementsVideo', () => {
    it('devrait lire les détournements vidéo', () => {
      const mockData = {
        détournements: [
          {
            id: 'det1',
            titre: 'Détournement 1',
            description: 'Description 1',
            urlYouTube: 'https://youtube.com/watch?v=abc',
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readDetournementsVideo();

      expect(result).toEqual(mockData.détournements);
      expect(mockFs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining('Détournements vidéo.json')
      );
    });

    it('devrait lever une erreur si fichier inexistant', () => {
      mockFs.existsSync.mockReturnValue(false);

      expect(() => readDetournementsVideo()).toThrow(
        "Le fichier Détournements vidéo.json n'existe pas"
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

      const mockTemoignagesData = {
        items: [
          {
            id: 'tem1',
            nom: 'Test',
            fonction: 'Fonction',
            citation: 'Citation',
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

      expect(result.contenu[0].items).toEqual(mockTemoignagesData.items);
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

      const mockDetournementsData = {
        détournements: [
          {
            id: 'det1',
            titre: 'Détournement',
            urlYouTube: 'https://youtube.com/watch?v=xyz',
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

      expect(result.contenu[0].items).toEqual(mockDetournementsData.détournements);
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
