/**
 * Tests TDD pour headerMenuIntegrityChecker.ts (US-13.1 CA7)
 * RED : écrire les tests d'abord, puis implémenter.
 */

import fs from 'fs';
import path from 'path';
import { checkMenuIntegrity } from '../../utils/vitrine/headerMenuIntegrityChecker';

describe('headerMenuIntegrityChecker', () => {
  let readFileSyncSpy: jest.SpyInstance;
  let existsSyncSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, 'cwd').mockReturnValue('/project');
    jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));
    readFileSyncSpy = jest.spyOn(fs, 'readFileSync');
    existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('checkMenuIntegrity', () => {
    it('retourne valid: true quand toutes les URLs du menu existent dans pages', () => {
      const plan = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
          { url: '/mes-profils', titre: 'Mes Profils', dessiner: 'Oui', zone: 'HomePage' },
        ],
        menus: {
          header: [
            { id: 'accueil', pageUrl: '/' },
            { id: 'mes-profils', pageUrl: '/mes-profils' },
          ],
        },
      };
      readFileSyncSpy.mockReturnValue(JSON.stringify(plan));

      const result = checkMenuIntegrity();

      expect(result.valid).toBe(true);
      expect(result.urlsManquantes).toEqual([]);
      expect(result.pagesPotentiellementOubliees).toEqual([]);
    });

    it('signale les URLs de menus.header qui ne sont pas dans pages', () => {
      const plan = {
        pages: [{ url: '/', titre: 'Home' }],
        menus: {
          header: [
            { id: 'accueil', pageUrl: '/' },
            { id: 'inexistant', pageUrl: '/page-inexistante' },
          ],
        },
      };
      readFileSyncSpy.mockReturnValue(JSON.stringify(plan));

      const result = checkMenuIntegrity();

      expect(result.valid).toBe(false);
      expect(result.urlsManquantes).toContain('/page-inexistante');
    });

    it('signale les URLs de sousmenuPageUrls qui ne sont pas dans pages', () => {
      const plan = {
        pages: [
          { url: '/mes-profils', titre: 'Mes Profils' },
          { url: '/profil/cpo', titre: 'CPO' },
        ],
        menus: {
          header: [{
            id: 'mes-profils',
            pageUrl: '/mes-profils',
            sousmenuPageUrls: ['/profil/cpo', '/profil/inexistant'],
          }],
        },
      };
      readFileSyncSpy.mockReturnValue(JSON.stringify(plan));

      const result = checkMenuIntegrity();

      expect(result.valid).toBe(false);
      expect(result.urlsManquantes).toContain('/profil/inexistant');
    });

    it('signale les pages visibles (dessiner Oui, zone ≠ Masqué) non présentes dans header ni exclusHeader', () => {
      const plan = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
          { url: '/page-oubliee', titre: 'Oubliée', dessiner: 'Oui', zone: 'Autres' },
        ],
        menus: {
          header: [{ id: 'accueil', pageUrl: '/' }],
          exclusHeader: [],
        },
      };
      readFileSyncSpy.mockReturnValue(JSON.stringify(plan));

      const result = checkMenuIntegrity();

      expect(result.pagesPotentiellementOubliees).toContain('/page-oubliee');
    });

    it('ne signale pas les pages dans exclusHeader comme oubliées', () => {
      const plan = {
        pages: [
          { url: '/', titre: 'Home', dessiner: 'Oui', zone: 'HomePage' },
          { url: '/faisons-connaissance', titre: 'Faisons connaissance', dessiner: 'Oui', zone: 'Footer' },
        ],
        menus: {
          header: [{ id: 'accueil', pageUrl: '/' }],
          exclusHeader: ['/faisons-connaissance'],
        },
      };
      readFileSyncSpy.mockReturnValue(JSON.stringify(plan));

      const result = checkMenuIntegrity();

      expect(result.pagesPotentiellementOubliees).not.toContain('/faisons-connaissance');
    });

    it('ne signale pas les pages zone Masqué comme oubliées', () => {
      const plan = {
        pages: [
          { url: '/maintenance', titre: 'Maintenance', dessiner: 'Non', zone: 'Masqué' },
        ],
        menus: { header: [], exclusHeader: [] },
      };
      readFileSyncSpy.mockReturnValue(JSON.stringify(plan));

      const result = checkMenuIntegrity();

      expect(result.pagesPotentiellementOubliees).not.toContain('/maintenance');
    });
  });
});
