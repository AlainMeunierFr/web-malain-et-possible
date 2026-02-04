/**
 * Tests TDD pour menuReader.ts (US-11.3)
 * Lit data/A propos de ce site/menu.json et expose les lignes de menu triées par Numéro.
 */

import fs from 'fs';
import path from 'path';
import { readMenu } from '../../utils/server';
import type { LigneDeMenu } from '../../utils';

describe('menuReader', () => {
  let readFileSyncSpy: jest.SpyInstance;
  let pathJoinSpy: jest.SpyInstance;
  let cwdSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue('/project');
    pathJoinSpy = jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));
    readFileSyncSpy = jest.spyOn(fs, 'readFileSync');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('readMenu', () => {
    it('retourne un tableau de lignes de menu avec Titre, Numéro, Type, Parametre', () => {
      const menuJson = [
        { Titre: 'A propos du projet', Numéro: 1, Type: 'Path', Parametre: 'data/A propos de ce site/md/A propos du projet' },
      ];
      readFileSyncSpy.mockReturnValue(JSON.stringify(menuJson));

      const result = readMenu();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        Titre: 'A propos du projet',
        Numéro: 1,
        Type: 'Path',
        Parametre: 'data/A propos de ce site/md/A propos du projet',
      });
    });

    it('retourne les lignes triées par Numéro', () => {
      const menuJson = [
        { Titre: 'Trois', Numéro: 3, Type: 'Path', Parametre: 'path3' },
        { Titre: 'Un', Numéro: 1, Type: 'Path', Parametre: 'path1' },
        { Titre: 'Deux', Numéro: 2, Type: 'container', Parametre: 'sprintEnCours' },
      ];
      readFileSyncSpy.mockReturnValue(JSON.stringify(menuJson));

      const result = readMenu();

      expect(result.map((l) => l.Numéro)).toEqual([1, 2, 3]);
      expect(result[0].Titre).toBe('Un');
      expect(result[1].Titre).toBe('Deux');
      expect(result[2].Titre).toBe('Trois');
    });

    it('lit le fichier data/A propos de ce site/menu.json depuis la racine du projet', () => {
      readFileSyncSpy.mockReturnValue('[]');

      readMenu();

      expect(pathJoinSpy).toHaveBeenCalled();
      const pathRead = readFileSyncSpy.mock.calls[0][0];
      expect(pathRead).toContain('data');
      expect(pathRead).toContain('A propos de ce site');
      expect(pathRead).toContain('menu.json');
      expect(readFileSyncSpy).toHaveBeenCalledWith(expect.any(String), 'utf-8');
    });

    it('lance une erreur si le fichier est absent', () => {
      readFileSyncSpy.mockImplementation(() => {
        const err = new Error('ENOENT: no such file or directory') as NodeJS.ErrnoException;
        err.code = 'ENOENT';
        throw err;
      });

      expect(() => readMenu()).toThrow(/menu\.json|ENOENT|introuvable/i);
    });

    it('lance une erreur si le JSON est invalide', () => {
      readFileSyncSpy.mockReturnValue('{ invalid json }');

      expect(() => readMenu()).toThrow(/JSON|invalide|parse/i);
    });

    it('retourne un tableau vide si le fichier contient un tableau vide', () => {
      readFileSyncSpy.mockReturnValue('[]');

      const result = readMenu();

      expect(result).toEqual([]);
    });

    it('lance une erreur si le contenu JSON n\'est pas un tableau', () => {
      readFileSyncSpy.mockReturnValue('{"Titre": "seul"}');

      expect(() => readMenu()).toThrow(/tableau|contenu attendu/i);
    });
  });
});
