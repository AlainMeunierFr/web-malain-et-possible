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
} from '../../utils/server';
import type { IndexData, PageData } from '../../utils';

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
            type: 'listeDeTemoignages',
            source: '_temoignages.json',
          },
        ],
      };

      // Structure réelle : le fichier source a contenu[] avec un élément listeDeTemoignages qui a items[]
      const mockTemoignagesData = {
        contenu: [
          {
            type: 'listeDeTemoignages',
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
        return p.includes('test.json') || p.includes('_temoignages.json');
      });

      mockFs.readFileSync.mockImplementation((p: any) => {
        if (p.includes('test.json')) {
          return JSON.stringify(mockPageData);
        }
        if (p.includes('_temoignages.json')) {
          return JSON.stringify(mockTemoignagesData);
        }
        return '';
      });

      const result = readPageData('test.json');

      // readPageData normalise les items témoignages avec type: 'temoignage'
      const expectedItems = mockTemoignagesData.contenu[0].items.map((item: { nom: string; fonction: string; photo: string; temoignage: string }) => ({
        type: 'temoignage',
        ...item,
      }));
      expect(result.contenu[0].items).toEqual(expectedItems);
    });

    it('devrait résoudre les références externes pour détournements', () => {
      const mockPageData = {
        contenu: [
          {
            type: 'listeDeDetournementsVideo',
            source: 'detournements.json',
          },
        ],
      };

      // Structure réelle : le fichier source a contenu[] avec un élément listeDeDetournementsVideo qui a items[]
      const mockDetournementsData = {
        contenu: [
          {
            type: 'listeDeDetournementsVideo',
            items: [
              {
                id: 1,
                titreVideoDetournee: 'Détournement',
                videoDetournee: 'abc123',
                titreVideoOriginale: 'Original',
                videoOriginale: 'xyz789',
                titre: 'Client',
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

      // readPageData normalise les items avec type: 'detournementVideo'
      const expectedItems = mockDetournementsData.contenu[0].items.map((item: any) =>
        item.type != null ? item : { type: 'detournementVideo', ...item }
      );
      expect(result.contenu[0].items).toEqual(expectedItems);
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

  describe('readPageData avec type hero', () => {
    it('devrait lire un élément de type hero', () => {
      const mockData: PageData = {
        contenu: [
          {
            type: 'hero',
            titre: 'Alain Meunier',
            sousTitre: 'Je recherche un projet stimulant (CDI ou freelance)',
            description: 'Description de la valeur...',
            callToAction: {
              texte: 'On discute ?',
              action: '/faisons-connaissance',
            },
            ensavoirplus: '/mes-profils',
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readPageData('test.json');

      expect(result.contenu).toHaveLength(1);
      expect(result.contenu[0].type).toBe('hero');
      const hero = result.contenu[0] as any;
      expect(hero.titre).toBe('Alain Meunier');
      expect(hero.ensavoirplus).toBe('/mes-profils');
    });
  });

  describe('readPageData - normalisation des domaines de compétences', () => {
    it('devrait convertir competences en items si items absent', () => {
      // Cas: rawElement.competences existe mais pas rawElement.items
      const mockData = {
        contenu: [
          {
            type: 'domaineDeCompetence',
            titre: 'Domaine Test',
            contenu: 'Description',
            competences: [
              { titre: 'Compétence A', description: 'Desc A' },
              { titre: 'Compétence B', description: 'Desc B' },
            ],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readPageData('test-competences.json');

      expect(result.contenu[0].type).toBe('domaineDeCompetence');
      const domaine = result.contenu[0] as any;
      expect(domaine.items).toHaveLength(2);
      expect(domaine.items[0].type).toBe('competence');
      expect(domaine.items[0].titre).toBe('Compétence A');
    });

    it('devrait normaliser les items sans type explicite', () => {
      // Cas: rawElement.items existe mais les items n'ont pas de type
      const mockData = {
        contenu: [
          {
            type: 'domaineDeCompetence',
            titre: 'Domaine Test',
            contenu: 'Description',
            items: [
              { titre: 'Compétence sans type', description: 'Desc' },
            ],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readPageData('test-items-sans-type.json');

      const domaine = result.contenu[0] as any;
      expect(domaine.items[0].type).toBe('competence');
    });

    it('devrait normaliser les experiences dans un domaine', () => {
      // Cas: rawElement.experiences existe
      const mockData = {
        contenu: [
          {
            type: 'domaineDeCompetence',
            titre: 'Domaine avec experiences',
            contenu: 'Description',
            items: [{ type: 'competence', titre: 'Test', description: 'Desc' }],
            experiences: [
              { id: 'exp1', categorie: 'formation', description: 'Formation', periode: '2020-2023' },
              { type: 'experienceEtApprentissage', id: 'exp2', categorie: 'projet', description: 'Projet' },
            ],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readPageData('test-experiences.json');

      const domaine = result.contenu[0] as any;
      expect(domaine.experiences).toHaveLength(2);
      expect(domaine.experiences[0].type).toBe('experienceEtApprentissage');
      expect(domaine.experiences[1].type).toBe('experienceEtApprentissage');
    });

    it('devrait conserver le type existant sur les items', () => {
      // Cas: les items ont déjà un type
      const mockData = {
        contenu: [
          {
            type: 'domaineDeCompetence',
            titre: 'Domaine',
            contenu: 'Desc',
            items: [
              { type: 'competence', titre: 'Avec type', description: 'Desc' },
            ],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readPageData('test-items-avec-type.json');

      const domaine = result.contenu[0] as any;
      expect(domaine.items[0].type).toBe('competence');
    });
  });

  describe('readPageData - portfolio détournements avec clé detournementVideo', () => {
    it('devrait convertir la clé detournementVideo en listeDeDetournementsVideo', () => {
      // Cas: rawElement.detournementVideo existe (sans type)
      const mockData = {
        contenu: [
          {
            detournementVideo: [
              { id: 1, titre: 'Client 1', date: '2023-01-01' },
              { id: 2, titre: 'Client 2', date: '2023-06-15' },
            ],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readPageData('portfolio.json');

      expect(result.contenu[0].type).toBe('listeDeDetournementsVideo');
      const liste = result.contenu[0] as any;
      expect(liste.items).toHaveLength(2);
      expect(liste.items[0].type).toBe('detournementVideo');
    });

    it('devrait conserver le type existant sur les détournements', () => {
      const mockData = {
        contenu: [
          {
            detournementVideo: [
              { type: 'detournementVideo', id: 1, titre: 'Avec type' },
            ],
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockData));

      const result = readPageData('portfolio-typed.json');

      const liste = result.contenu[0] as any;
      expect(liste.items[0].type).toBe('detournementVideo');
    });
  });
});
