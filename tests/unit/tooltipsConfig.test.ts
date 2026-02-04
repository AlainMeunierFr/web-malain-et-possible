/**
 * Tests unitaires pour utils/tooltipsConfig.ts
 * Couvre les fonctions de configuration des info-bulles
 */

import fs from 'fs';
import {
  creerMapInfoBulles,
  validateInfoBulle,
  clearTooltipsCache,
  loadInfoBullesConfig,
  loadTooltipsConfig,
  getTooltipConfig,
  hasTooltipConfig,
  getAvailableMetrics,
  validateInfoBullesConfig,
} from '../../utils/server';
import type { ConfigurationInfoBulles, InfoBulle } from '../../utils';

// Mock fs
jest.mock('fs');

describe('tooltipsConfig', () => {
  beforeEach(() => {
    clearTooltipsCache();
  });

  describe('creerMapInfoBulles', () => {
    it('devrait créer une map vide pour une config sans infoBulles', () => {
      const config: ConfigurationInfoBulles = {
        page: 'test',
        version: '1.0',
        infoBulles: [],
      };

      const result = creerMapInfoBulles(config);
      expect(result).toEqual({});
    });

    it('devrait créer une map indexée par id', () => {
      const config: ConfigurationInfoBulles = {
        page: 'test',
        version: '1.0',
        infoBulles: [
          { id: 'metric1', title: 'Métrique 1', description: 'Description 1' },
          { id: 'metric2', title: 'Métrique 2', description: 'Description 2' },
        ],
      };

      const result = creerMapInfoBulles(config);
      expect(Object.keys(result)).toHaveLength(2);
      expect(result['metric1'].title).toBe('Métrique 1');
      expect(result['metric2'].title).toBe('Métrique 2');
    });
  });

  describe('validateInfoBulle', () => {
    it('devrait retourner false pour null', () => {
      expect(validateInfoBulle(null)).toBe(false);
    });

    it('devrait retourner false pour undefined', () => {
      expect(validateInfoBulle(undefined)).toBe(false);
    });

    it('devrait retourner false pour une chaîne', () => {
      expect(validateInfoBulle('string')).toBe(false);
    });

    it('devrait retourner false si id est manquant', () => {
      expect(validateInfoBulle({ title: 'Test', description: 'Desc' })).toBe(false);
    });

    it('devrait retourner false si id est vide', () => {
      expect(validateInfoBulle({ id: '', title: 'Test', description: 'Desc' })).toBe(false);
    });

    it('devrait retourner false si title est manquant', () => {
      expect(validateInfoBulle({ id: 'test', description: 'Desc' })).toBe(false);
    });

    it('devrait retourner false si title est vide', () => {
      expect(validateInfoBulle({ id: 'test', title: '', description: 'Desc' })).toBe(false);
    });

    it('devrait retourner false si description est manquante', () => {
      expect(validateInfoBulle({ id: 'test', title: 'Test' })).toBe(false);
    });

    it('devrait retourner false si description est vide', () => {
      expect(validateInfoBulle({ id: 'test', title: 'Test', description: '' })).toBe(false);
    });

    it('devrait retourner true pour une info-bulle valide minimale', () => {
      const infoBulle: InfoBulle = {
        id: 'test',
        title: 'Test Title',
        description: 'Test Description',
      };
      expect(validateInfoBulle(infoBulle)).toBe(true);
    });

    it('devrait retourner true pour une info-bulle avec interprétations valides', () => {
      const infoBulle = {
        id: 'test',
        title: 'Test',
        description: 'Desc',
        interpretation: [
          { range: '0-50', level: 'low', description: 'Faible' },
          { range: '51-100', level: 'high', description: 'Élevé' },
        ],
      };
      expect(validateInfoBulle(infoBulle)).toBe(true);
    });

    it('devrait retourner false pour des interprétations invalides', () => {
      const infoBulle = {
        id: 'test',
        title: 'Test',
        description: 'Desc',
        interpretation: [
          { range: '0-50' }, // manque level et description
        ],
      };
      expect(validateInfoBulle(infoBulle)).toBe(false);
    });

    it('devrait retourner true avec type optionnel', () => {
      const infoBulle: InfoBulle = {
        id: 'test',
        title: 'Test',
        description: 'Desc',
        type: 'metric',
      };
      expect(validateInfoBulle(infoBulle)).toBe(true);
    });
  });

  describe('clearTooltipsCache', () => {
    it('devrait vider le cache sans erreur', () => {
      expect(() => clearTooltipsCache()).not.toThrow();
    });
  });

  describe('loadInfoBullesConfig', () => {
    const mockFs = fs as jest.Mocked<typeof fs>;

    beforeEach(() => {
      clearTooltipsCache();
      jest.clearAllMocks();
    });

    it('devrait charger la configuration depuis le fichier', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [
          { id: 'test', title: 'Test', description: 'Description' },
        ],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      const result = loadInfoBullesConfig();
      expect(result.page).toBe('metrics');
      expect(result.infoBulles).toHaveLength(1);
    });

    it('devrait utiliser le cache pour les appels répétés', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      loadInfoBullesConfig();
      loadInfoBullesConfig();
      // Le fichier ne devrait être lu qu'une seule fois grâce au cache
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(1);
    });

    it('devrait lever une erreur si le fichier est invalide', () => {
      clearTooltipsCache();
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Fichier non trouvé');
      });

      expect(() => loadInfoBullesConfig()).toThrow('Impossible de charger la configuration des info-bulles');
    });
  });

  describe('loadTooltipsConfig', () => {
    const mockFs = fs as jest.Mocked<typeof fs>;

    beforeEach(() => {
      clearTooltipsCache();
      jest.clearAllMocks();
    });

    it('devrait retourner une map des info-bulles', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [
          { id: 'metric1', title: 'Metric 1', description: 'Desc 1' },
          { id: 'metric2', title: 'Metric 2', description: 'Desc 2' },
        ],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      const result = loadTooltipsConfig();
      expect(result['metric1']).toBeDefined();
      expect(result['metric2']).toBeDefined();
    });
  });

  describe('getTooltipConfig', () => {
    const mockFs = fs as jest.Mocked<typeof fs>;

    beforeEach(() => {
      clearTooltipsCache();
      jest.clearAllMocks();
    });

    it('devrait retourner la config d\'une métrique existante', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [
          { id: 'coverage', title: 'Couverture', description: 'Taux de couverture' },
        ],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      const result = getTooltipConfig('coverage');
      expect(result).not.toBeNull();
      expect(result?.title).toBe('Couverture');
    });

    it('devrait retourner null pour une métrique inexistante', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      const result = getTooltipConfig('inexistant');
      expect(result).toBeNull();
    });

    it('devrait retourner null en cas d\'erreur', () => {
      clearTooltipsCache();
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Erreur de lecture');
      });

      const result = getTooltipConfig('test');
      expect(result).toBeNull();
    });
  });

  describe('hasTooltipConfig', () => {
    const mockFs = fs as jest.Mocked<typeof fs>;

    beforeEach(() => {
      clearTooltipsCache();
      jest.clearAllMocks();
    });

    it('devrait retourner true pour une métrique existante', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [
          { id: 'coverage', title: 'Couverture', description: 'Desc' },
        ],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      expect(hasTooltipConfig('coverage')).toBe(true);
    });

    it('devrait retourner false pour une métrique inexistante', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      expect(hasTooltipConfig('inexistant')).toBe(false);
    });

    it('devrait retourner false en cas d\'erreur', () => {
      clearTooltipsCache();
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Erreur');
      });

      expect(hasTooltipConfig('test')).toBe(false);
    });
  });

  describe('getAvailableMetrics', () => {
    const mockFs = fs as jest.Mocked<typeof fs>;

    beforeEach(() => {
      clearTooltipsCache();
      jest.clearAllMocks();
    });

    it('devrait retourner la liste des clés de métriques', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [
          { id: 'metric1', title: 'M1', description: 'D1' },
          { id: 'metric2', title: 'M2', description: 'D2' },
        ],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      const result = getAvailableMetrics();
      expect(result).toContain('metric1');
      expect(result).toContain('metric2');
    });

    it('devrait retourner un tableau vide en cas d\'erreur', () => {
      clearTooltipsCache();
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Erreur');
      });

      const result = getAvailableMetrics();
      expect(result).toEqual([]);
    });
  });

  describe('validateInfoBullesConfig', () => {
    const mockFs = fs as jest.Mocked<typeof fs>;

    beforeEach(() => {
      clearTooltipsCache();
      jest.clearAllMocks();
    });

    it('devrait retourner true pour une config valide', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [
          { id: 'test', title: 'Test', description: 'Description' },
        ],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      expect(validateInfoBullesConfig()).toBe(true);
    });

    it('devrait retourner false si page est manquant', () => {
      const mockConfig = {
        version: '1.0',
        infoBulles: [],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      expect(validateInfoBullesConfig()).toBe(false);
    });

    it('devrait retourner false si infoBulles n\'est pas un tableau', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: 'invalid',
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      expect(validateInfoBullesConfig()).toBe(false);
    });

    it('devrait retourner false si une info-bulle est invalide', () => {
      const mockConfig = {
        page: 'metrics',
        version: '1.0',
        infoBulles: [
          { id: 'test' }, // Manque title et description
        ],
      };
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

      expect(validateInfoBullesConfig()).toBe(false);
    });

    it('devrait retourner false en cas d\'erreur de lecture', () => {
      clearTooltipsCache();
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('Erreur');
      });

      expect(validateInfoBullesConfig()).toBe(false);
    });
  });
});
