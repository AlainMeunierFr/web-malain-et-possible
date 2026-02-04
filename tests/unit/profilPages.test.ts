/**
 * Tests unitaires pour les pages de profils (US-7.3)
 * Backend pur : testable sans dépendance React/Next.js
 * 
 * APPROCHE TDD : Les tests montrent la progression du simple au complexe
 * - Test 1 : Le cas le plus simple (lire un fichier profil avec vidéo et titre)
 * - Test 2 : Résoudre les références vers les domaines
 * - Test 3 : Vérifier l'intégrité référentielle
 * - Test 4 : Gérer plusieurs vidéos (profil Agile)
 */

import fs from 'fs';
import path from 'path';
import { readPageData, readCompetences, readDomaines } from '../../utils/server';
import { checkReferentialIntegrity } from '../../utils/backoffice';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('profilPages - Approche TDD', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Lecture d\'une page profil CPO', () => {
    it('devrait lire le fichier profil-cpo.json avec vidéo et titre', () => {
      // ARRANGE
      const mockPageData = {
        contenu: [
          {
            type: 'video',
            urlYouTube: 'https://youtu.be/iUv6e256AVk',
            lancementAuto: true,
            e2eID: 'v10-profil-cpo',
          },
          {
            type: 'titre',
            texte: 'Produit logiciel',
          },
        ],
      };

      const filePath = path.join(process.cwd(), 'data', 'profil-cpo.json');
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      // ACT
      const result = readPageData('profil-cpo.json');

      // ASSERT
      expect(result.contenu).toHaveLength(2);
      expect(result.contenu[0].type).toBe('video');
      expect((result.contenu[0] as any).urlYouTube).toBe('https://youtu.be/iUv6e256AVk');
      expect((result.contenu[0] as any).lancementAuto).toBe(true);
      expect(result.contenu[1].type).toBe('titre');
      expect((result.contenu[1] as any).texte).toBe('Produit logiciel');
    });

    it('devrait résoudre les références vers les domaines de la bibliothèque', () => {
      // ARRANGE
      const mockPageData = {
        contenu: [
          {
            type: 'video',
            urlYouTube: 'https://youtu.be/iUv6e256AVk',
            lancementAuto: true,
          },
          {
            type: 'titre',
            texte: 'Produit logiciel',
          },
          {
            type: 'domaineDeCompetence',
            ref: 'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur',
          },
          {
            type: 'domaineDeCompetence',
            ref: 'developpement-informatique',
          },
        ],
      };

      const competencesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'competences.json');
      const domainesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'domaines.json');
      const profilPath = path.join(process.cwd(), 'data', 'profil-cpo.json');

      mockFs.existsSync.mockImplementation((filePath: string) => {
        return filePath === profilPath || 
               filePath === competencesPath || 
               filePath === domainesPath ||
               filePath.includes('experienceEtApprentissage.json');
      });

      mockFs.readFileSync.mockImplementation((file: string) => {
        if (file === profilPath || file.includes('profil-cpo.json')) {
          return JSON.stringify(mockPageData);
        }
        if (file === domainesPath || file.includes('bibliotheque/domaines.json')) {
          return JSON.stringify({
            domaines: {
              'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur': {
                id: 'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur',
                titre: 'Bien appliqué, l\'agilité est un cadre puissant pour délivrer de la valeur.',
                contenu: '',
                competences: ['vision-produit', 'empirisme', 'excellence-technique'],
              },
              'developpement-informatique': {
                id: 'developpement-informatique',
                titre: 'Développement informatique',
                contenu: '',
                competences: ['management-de-produit-logiciel', 'ingenierie-logicielle', 'data-et-business-intelligence'],
              },
            },
          });
        }
        if (file === competencesPath || file.includes('bibliotheque/competences.json')) {
          return JSON.stringify({
            competences: {
              'vision-produit': {
                id: 'vision-produit',
                titre: 'Vision produit',
                type: 'competence',
                bouton: null,
              },
              'empirisme': {
                id: 'empirisme',
                titre: 'Empirisme',
                type: 'competence',
                bouton: null,
              },
              'excellence-technique': {
                id: 'excellence-technique',
                titre: 'Excellence technique',
                type: 'competence',
                bouton: null,
              },
              'management-de-produit-logiciel': {
                id: 'management-de-produit-logiciel',
                titre: 'Management de produit logiciel',
                type: 'competence',
                bouton: null,
              },
              'ingenierie-logicielle': {
                id: 'ingenierie-logicielle',
                titre: 'Ingénierie logicielle',
                type: 'competence',
                bouton: null,
              },
              'data-et-business-intelligence': {
                id: 'data-et-business-intelligence',
                titre: 'Data et Business Intelligence',
                type: 'competence',
                bouton: null,
              },
            },
          });
        }
        if (file.includes('experienceEtApprentissage.json')) {
          return JSON.stringify({
            experienceEtApprentissage: {},
          });
        }
        return '{}';
      });

      // ACT
      const result = readPageData('profil-cpo.json');

      // ASSERT
      expect(result.contenu).toHaveLength(4);
      expect(result.contenu[0].type).toBe('video');
      expect(result.contenu[1].type).toBe('titre');
      expect(result.contenu[2].type).toBe('domaineDeCompetence');
      expect((result.contenu[2] as any).ref).toBeUndefined(); // La référence doit être résolue
      expect((result.contenu[2] as any).titre).toBe('Bien appliqué, l\'agilité est un cadre puissant pour délivrer de la valeur.');
      expect((result.contenu[3] as any).titre).toBe('Développement informatique');
    });
  });

  describe('Lecture d\'une page profil COO', () => {
    it('devrait lire le fichier profil-coo.json avec la vidéo spécifique', () => {
      // ARRANGE
      const mockPageData = {
        contenu: [
          {
            type: 'video',
            urlYouTube: 'https://youtu.be/9rwtuxXiKC0',
            lancementAuto: true,
            e2eID: 'v10-profil-coo',
          },
          {
            type: 'titre',
            texte: 'Opérations',
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      // ACT
      const result = readPageData('profil-coo.json');

      // ASSERT
      expect(result.contenu[0].type).toBe('video');
      expect((result.contenu[0] as any).urlYouTube).toBe('https://youtu.be/9rwtuxXiKC0');
      expect(result.contenu[1].type).toBe('titre');
      expect((result.contenu[1] as any).texte).toBe('Opérations');
    });
  });

  describe('Lecture d\'une page profil Agile avec deux vidéos', () => {
    it('devrait lire le fichier profil-agile.json avec deux vidéos', () => {
      // ARRANGE
      const mockPageData = {
        contenu: [
          {
            type: 'video',
            urlYouTube: 'https://youtu.be/XoruJezxpsI',
            lancementAuto: true,
            e2eID: 'v11',
          },
          {
            type: 'titre',
            texte: 'Transformation Agile',
          },
          {
            type: 'domaineDeCompetence',
            ref: 'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur',
          },
          {
            type: 'video',
            urlYouTube: 'https://youtu.be/mPif5EjzFYg',
            lancementAuto: false,
            e2eID: 'v12',
          },
          {
            type: 'callToAction',
            action: 'On discute ?',
            e2eID: 'a-profil-agile',
          },
        ],
      };

      // Mock competences.json avec la structure correcte
      const mockCompetences = {
        competences: {
          'test-competence': {
            id: 'test-competence',
            titre: 'Test',
            type: 'competence',
          },
        },
      };

      // Mock domaines.json
      const mockDomaines = {
        domaines: {
          'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur': {
            id: 'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur',
            titre: 'Test Domaine',
            competences: [],
          },
        },
      };

      mockFs.existsSync.mockImplementation((filePath: string) => {
        if (filePath.includes('profil-agile.json')) return true;
        if (filePath.includes('competences.json')) return true;
        if (filePath.includes('domaines.json')) return true;
        if (filePath.includes('experienceEtApprentissage.json')) return true;
        return false;
      });

      mockFs.readFileSync.mockImplementation((filePath: string) => {
        if (filePath.includes('profil-agile.json')) {
          return JSON.stringify(mockPageData);
        }
        if (filePath.includes('competences.json')) {
          return JSON.stringify(mockCompetences);
        }
        if (filePath.includes('domaines.json')) {
          return JSON.stringify(mockDomaines);
        }
        if (filePath.includes('experienceEtApprentissage.json')) {
          return JSON.stringify({ experienceEtApprentissage: {} });
        }
        return '{}';
      });

      // ACT
      const result = readPageData('profil-agile.json');

      // ASSERT
      expect(result.contenu).toHaveLength(5);
      expect(result.contenu[0].type).toBe('video');
      expect((result.contenu[0] as any).urlYouTube).toBe('https://youtu.be/XoruJezxpsI');
      expect((result.contenu[0] as any).lancementAuto).toBe(true);
      expect(result.contenu[3].type).toBe('video');
      expect((result.contenu[3] as any).urlYouTube).toBe('https://youtu.be/mPif5EjzFYg');
      expect((result.contenu[3] as any).lancementAuto).toBe(false);
    });
  });

  describe('Lecture d\'une page profil CTO', () => {
    it('devrait lire le fichier profil-cto.json avec vidéo et titre', () => {
      // ARRANGE
      const mockPageData = {
        contenu: [
          {
            type: 'video',
            urlYouTube: 'https://youtu.be/iUv6e256AVk',
            lancementAuto: true,
            e2eID: 'v10-profil-cto',
          },
          {
            type: 'titre',
            texte: 'Technologie',
          },
        ],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      // ACT
      const result = readPageData('profil-cto.json');

      // ASSERT
      expect(result.contenu[0].type).toBe('video');
      expect((result.contenu[0] as any).urlYouTube).toBe('https://youtu.be/iUv6e256AVk');
      expect(result.contenu[1].type).toBe('titre');
      expect((result.contenu[1] as any).texte).toBe('Technologie');
    });
  });

  describe('CallToAction sur les pages de profils', () => {
    it('devrait avoir un CallToAction "On discute ?" en fin de page profil CPO', () => {
      // ARRANGE
      const mockPageData = {
        contenu: [
          {
            type: 'video',
            urlYouTube: 'https://youtu.be/iUv6e256AVk',
            lancementAuto: true,
          },
          {
            type: 'titre',
            texte: 'Produit logiciel',
          },
          {
            type: 'domaineDeCompetence',
            ref: 'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur',
          },
          {
            type: 'callToAction',
            action: 'On discute ?',
            e2eID: 'a-profil-cpo',
          },
        ],
      };

      const competencesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'competences.json');
      const domainesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'domaines.json');
      const autresPath = path.join(process.cwd(), 'data', 'bibliotheque', 'experienceEtApprentissage.json');
      const profilPath = path.join(process.cwd(), 'data', 'profil-cpo.json');

      mockFs.existsSync.mockImplementation((filePath: string) => {
        return filePath === profilPath || 
               filePath === competencesPath || 
               filePath === domainesPath || 
               filePath === autresPath ||
               filePath.includes('experienceEtApprentissage.json');
      });

      mockFs.readFileSync.mockImplementation((file: string) => {
        if (file === profilPath || file.includes('profil-cpo.json')) {
          return JSON.stringify(mockPageData);
        }
        if (file === domainesPath || file.includes('bibliotheque/domaines.json')) {
          return JSON.stringify({
            domaines: {
              'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur': {
                id: 'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur',
                titre: 'Bien appliqué, l\'agilité est un cadre puissant pour délivrer de la valeur.',
                contenu: '',
                competences: [],
              },
            },
          });
        }
        if (file === competencesPath || file.includes('bibliotheque/competences.json')) {
          return JSON.stringify({
            competences: {},
          });
        }
        if (file === autresPath || file.includes('experienceEtApprentissage.json')) {
          return JSON.stringify({ experienceEtApprentissage: {} });
        }
        return '{}';
      });

      // ACT
      const result = readPageData('profil-cpo.json');

      // ASSERT
      const lastElement = result.contenu[result.contenu.length - 1];
      expect(lastElement.type).toBe('callToAction');
      expect((lastElement as any).action).toBe('On discute ?');
    });
  });

  describe('Intégrité référentielle des pages de profils', () => {
    it('devrait détecter une référence cassée dans profil-cpo.json', () => {
      // ARRANGE
      // Créer directement les données sans passer par readPageData qui lance une erreur pour les références cassées
      const pageData = {
        contenu: [
          {
            type: 'domaineDeCompetence',
            ref: 'domaine-inexistant',
          },
        ],
      };

      const competences = new Map();
      const domaines = new Map();

      // ACT
      const integrityCheck = checkReferentialIntegrity(pageData, competences, domaines);

      // ASSERT
      expect(integrityCheck.valid).toBe(false);
      expect(integrityCheck.errors.length).toBeGreaterThan(0);
      expect(integrityCheck.errors[0]).toContain('domaine-inexistant');
    });

    it('devrait valider l\'intégrité référentielle si toutes les références sont valides', () => {
      // ARRANGE
      const mockPageData = {
        contenu: [
          {
            type: 'domaineDeCompetence',
            ref: 'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur',
          },
        ],
      };

      const competences = new Map();
      competences.set('vision-produit', {
        id: 'vision-produit',
        titre: 'Vision produit',
        type: 'competence',
        bouton: null,
      } as any);

      const domaines = new Map();
      domaines.set('bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur', {
        id: 'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur',
        titre: 'Bien appliqué, l\'agilité...',
        contenu: '',
        competences: ['vision-produit'],
      } as any);

      const competencesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'competences.json');
      const domainesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'domaines.json');
      const autresPath = path.join(process.cwd(), 'data', 'bibliotheque', 'experienceEtApprentissage.json');
      const profilPath = path.join(process.cwd(), 'data', 'profil-cpo.json');

      mockFs.existsSync.mockImplementation((filePath: string) => {
        return filePath === profilPath || filePath === competencesPath || filePath === domainesPath || filePath === autresPath;
      });

      mockFs.readFileSync.mockImplementation((file: string) => {
        if (file === profilPath || file.includes('profil-cpo.json')) {
          return JSON.stringify(mockPageData);
        }
        if (file === domainesPath || file.includes('bibliotheque/domaines.json')) {
          return JSON.stringify({
            domaines: {
              'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur': {
                id: 'bien-applique-l-agilite-est-un-cadre-puissant-pour-delivrer-de-la-valeur',
                titre: 'Bien appliqué, l\'agilité...',
                contenu: '',
                competences: ['vision-produit'],
              },
            },
          });
        }
        if (file === competencesPath || file.includes('bibliotheque/competences.json')) {
          return JSON.stringify({
            competences: {
              'vision-produit': {
                id: 'vision-produit',
                titre: 'Vision produit',
                type: 'competence',
                bouton: null,
              },
            },
          });
        }
        if (file === autresPath || file.includes('experienceEtApprentissage.json')) {
          return JSON.stringify({ experienceEtApprentissage: {} });
        }
        return '{}';
      });

      // ACT
      const pageData = readPageData('profil-cpo.json');
      const integrityCheck = checkReferentialIntegrity(pageData, competences, domaines);

      // ASSERT
      expect(integrityCheck.valid).toBe(true);
      expect(integrityCheck.errors).toHaveLength(0);
    });
  });
});
