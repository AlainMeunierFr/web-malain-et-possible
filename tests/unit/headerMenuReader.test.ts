/**
 * Tests TDD pour headerMenuReader.ts (US-13.1)
 * RED : écrire les tests d'abord, puis implémenter.
 */

import fs from 'fs';
import path from 'path';
import { readHeaderMenu, readExclusHeader } from '../../utils/vitrine/headerMenuReader';

describe('headerMenuReader', () => {
  let readFileSyncSpy: jest.SpyInstance;
  let existsSyncSpy: jest.SpyInstance;
  let pathJoinSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, 'cwd').mockReturnValue('/project');
    pathJoinSpy = jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));
    readFileSyncSpy = jest.spyOn(fs, 'readFileSync');
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('readHeaderMenu', () => {
    it('retourne la configuration par défaut quand menus est absent', () => {
      const planSansMenus = {
        pages: [
          { url: '/', titre: 'Home' },
          { url: '/mes-profils', titre: 'Mes Profils' },
          { url: '/detournement-video', titre: 'Détournement de scènes cultes du cinéma' },
          { url: '/a-propos-du-site', titre: 'À propos de ce site' },
          { url: '/profil/cpo', titre: 'Produit logiciel' },
          { url: '/profil/coo', titre: 'Opérations' },
          { url: '/profil/agile', titre: 'Transformation Agile' },
          { url: '/profil/cto', titre: 'Technologie' },
          { url: '/portfolio-detournements', titre: 'Portfolio de detournements vidéos' },
        ],
      };
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(JSON.stringify(planSansMenus));

      const result = readHeaderMenu();

      expect(result).toHaveLength(4);
      expect(result[0]).toMatchObject({ id: 'accueil', label: 'Accueil', url: '/' });
      expect(result[1]).toMatchObject({ id: 'mes-profils', label: 'Mes profils', url: '/mes-profils' });
      expect(result[1].sousMenu).toHaveLength(4);
      expect(result[1].sousMenu).toContainEqual({ label: 'Produit logiciel', url: '/profil/cpo' });
      expect(result[2]).toMatchObject({ id: 'detournements', label: 'Détournement vidéo', url: '/detournement-video' });
      expect(result[2].sousMenu).toContainEqual({ label: 'Portfolio', url: '/portfolio-detournements' });
      expect(result[3]).toMatchObject({ id: 'a-propos', label: 'A propos', url: '/a-propos-du-site' });
    });

    it('utilise menus.header quand présent', () => {
      const planAvecMenus = {
        pages: [
          { url: '/', titre: 'Accueil' },
          { url: '/a-propos-du-site', titre: 'À propos' },
        ],
        menus: {
          header: [
            { id: 'accueil', pageUrl: '/' },
            { id: 'a-propos', pageUrl: '/a-propos-du-site' },
          ],
        },
      };
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(JSON.stringify(planAvecMenus));

      const result = readHeaderMenu();

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({ id: 'accueil', label: 'Accueil', url: '/' });
      expect(result[1]).toMatchObject({ id: 'a-propos', label: 'A propos', url: '/a-propos-du-site' });
    });

    it('résout les titres depuis pages par URL', () => {
      const plan = {
        pages: [{ url: '/page-x', titre: 'Mon Titre Personnalisé' }],
        menus: { header: [{ id: 'x', pageUrl: '/page-x' }] },
      };
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(JSON.stringify(plan));

      const result = readHeaderMenu();

      expect(result[0].label).toBe('Mon Titre Personnalisé');
    });

    it('lit _Pages-Liens-Et-Menus.json (seul fichier plan pour le menu)', () => {
      existsSyncSpy.mockImplementation((p: string) => p.includes('_Pages-Liens-Et-Menus'));
      readFileSyncSpy.mockReturnValue(JSON.stringify({
        pages: [{ url: '/', titre: 'Home' }],
        menus: { header: [{ id: 'accueil', pageUrl: '/' }] },
      }));

      readHeaderMenu();

      const pathRead = readFileSyncSpy.mock.calls[0][0];
      expect(pathRead).toContain('_Pages-Liens-Et-Menus');
    });

    it('lance une erreur quand aucun fichier plan n\'existe', () => {
      existsSyncSpy.mockReturnValue(false);

      expect(() => readHeaderMenu()).toThrow(/introuvable|_Pages/i);
    });
  });

  describe('readExclusHeader', () => {
    it('retourne un tableau vide quand menus.exclusHeader est absent', () => {
      const plan = { pages: [], menus: {} };
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(JSON.stringify(plan));

      const result = readExclusHeader();

      expect(result).toEqual([]);
    });

    it('retourne les URLs de menus.exclusHeader quand présent', () => {
      const plan = {
        pages: [],
        menus: { exclusHeader: ['/pour-aller-plus-loin', '/faisons-connaissance'] },
      };
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(JSON.stringify(plan));

      const result = readExclusHeader();

      expect(result).toEqual(['/pour-aller-plus-loin', '/faisons-connaissance']);
    });
  });
});
