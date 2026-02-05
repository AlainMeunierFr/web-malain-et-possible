/**
 * Tests unitaires pour lighthouseCollector (US-12.7)
 * TDD Baby Steps : Score Lighthouse conditionnel
 */

import {
  shouldRunLighthouse,
  fetchLighthouseScores,
  collectLighthouseScores,
  PROD_URL,
  MIN_DELAY_MS,
  type LighthouseScores,
  type LighthouseResult,
} from '../../utils/projet/lighthouseCollector';

// Mock de fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock console pour éviter les logs pendant les tests
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation();

describe('lighthouseCollector', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('constantes exportées', () => {
    it('exporte PROD_URL avec la bonne valeur', () => {
      expect(PROD_URL).toBe('https://m-alain-et-possible.fr');
    });

    it('exporte MIN_DELAY_MS correspondant à 7 jours', () => {
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      expect(MIN_DELAY_MS).toBe(sevenDaysInMs);
    });
  });

  describe('shouldRunLighthouse', () => {
    it('retourne true si lastRun est undefined (première exécution)', () => {
      expect(shouldRunLighthouse(undefined)).toBe(true);
    });

    it('retourne true si lastRun est une chaîne vide', () => {
      expect(shouldRunLighthouse('')).toBe(true);
    });

    it('retourne true si lastRun date de plus de 7 jours', () => {
      // Fixer la date actuelle
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);

      // lastRun = 8 jours avant
      const lastRun = new Date('2026-01-27T12:00:00.000Z').toISOString();
      expect(shouldRunLighthouse(lastRun)).toBe(true);
    });

    it('retourne true si lastRun date exactement de 7 jours', () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);

      // lastRun = exactement 7 jours avant
      const lastRun = new Date('2026-01-28T12:00:00.000Z').toISOString();
      expect(shouldRunLighthouse(lastRun)).toBe(true);
    });

    it('retourne false si lastRun date de moins de 7 jours', () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);

      // lastRun = 3 jours avant
      const lastRun = new Date('2026-02-01T12:00:00.000Z').toISOString();
      expect(shouldRunLighthouse(lastRun)).toBe(false);
    });

    it('retourne false si lastRun est la date actuelle', () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);

      const lastRun = now.toISOString();
      expect(shouldRunLighthouse(lastRun)).toBe(false);
    });

    it('retourne true pour une date invalide (traitement comme première exécution)', () => {
      expect(shouldRunLighthouse('invalid-date')).toBe(true);
    });
  });

  describe('fetchLighthouseScores', () => {
    const mockApiResponse = {
      lighthouseResult: {
        categories: {
          performance: { score: 0.92 },
          accessibility: { score: 1.0 },
          'best-practices': { score: 0.95 },
          seo: { score: 0.98 },
        },
      },
    };

    it('appelle l\'API PageSpeed Insights avec l\'URL de production par défaut', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      await fetchLighthouseScores();

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const callUrl = mockFetch.mock.calls[0][0];
      expect(callUrl).toContain('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
      expect(callUrl).toContain(`url=${encodeURIComponent(PROD_URL)}`);
      expect(callUrl).toContain('category=performance');
      expect(callUrl).toContain('category=accessibility');
      expect(callUrl).toContain('category=best-practices');
      expect(callUrl).toContain('category=seo');
    });

    it('appelle l\'API avec une URL personnalisée si fournie', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const customUrl = 'https://example.com';
      await fetchLighthouseScores(customUrl);

      const callUrl = mockFetch.mock.calls[0][0];
      expect(callUrl).toContain(`url=${encodeURIComponent(customUrl)}`);
    });

    it('retourne les scores convertis en pourcentage (0-100)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const scores = await fetchLighthouseScores();

      expect(scores).toEqual({
        performance: 92,
        accessibility: 100,
        bestPractices: 95,
        seo: 98,
      });
    });

    it('arrondit les scores à l\'entier le plus proche', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          lighthouseResult: {
            categories: {
              performance: { score: 0.925 },
              accessibility: { score: 0.994 },
              'best-practices': { score: 0.501 },
              seo: { score: 0.499 },
            },
          },
        }),
      });

      const scores = await fetchLighthouseScores();

      expect(scores).toEqual({
        performance: 93, // 92.5 arrondi à 93
        accessibility: 99, // 99.4 arrondi à 99
        bestPractices: 50, // 50.1 arrondi à 50
        seo: 50, // 49.9 arrondi à 50
      });
    });

    it('retourne NC pour tous les scores si la réponse HTTP n\'est pas OK', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Server error details',
      });

      const scores = await fetchLighthouseScores();

      expect(scores).toEqual({
        performance: 'NC',
        accessibility: 'NC',
        bestPractices: 'NC',
        seo: 'NC',
      });
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('PageSpeed Insights API error')
      );
    });

    it('retourne NC pour tous les scores si fetch rejette', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const scores = await fetchLighthouseScores();

      expect(scores).toEqual({
        performance: 'NC',
        accessibility: 'NC',
        bestPractices: 'NC',
        seo: 'NC',
      });
      expect(mockConsoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('Lighthouse fetch failed'),
        expect.any(Error)
      );
    });

    it('retourne NC pour les scores manquants dans la réponse', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          lighthouseResult: {
            categories: {
              performance: { score: 0.9 },
              // accessibility manquant
              'best-practices': { score: 0.8 },
              // seo manquant
            },
          },
        }),
      });

      const scores = await fetchLighthouseScores();

      expect(scores).toEqual({
        performance: 90,
        accessibility: 'NC',
        bestPractices: 80,
        seo: 'NC',
      });
    });

    it('retourne NC si lighthouseResult est absent', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const scores = await fetchLighthouseScores();

      expect(scores).toEqual({
        performance: 'NC',
        accessibility: 'NC',
        bestPractices: 'NC',
        seo: 'NC',
      });
    });

    it('retourne NC si categories est absent', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          lighthouseResult: {},
        }),
      });

      const scores = await fetchLighthouseScores();

      expect(scores).toEqual({
        performance: 'NC',
        accessibility: 'NC',
        bestPractices: 'NC',
        seo: 'NC',
      });
    });
  });

  describe('collectLighthouseScores', () => {
    const mockSuccessResponse = {
      lighthouseResult: {
        categories: {
          performance: { score: 0.92 },
          accessibility: { score: 1.0 },
          'best-practices': { score: 0.95 },
          seo: { score: 0.98 },
        },
      },
    };

    it('exécute Lighthouse si lastRun est undefined (première exécution)', async () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      });

      const result = await collectLighthouseScores(undefined);

      expect(result.skipped).toBe(false);
      expect(result.lastRun).toBe(now.toISOString());
      expect(result.scores).toEqual({
        performance: 92,
        accessibility: 100,
        bestPractices: 95,
        seo: 98,
      });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringContaining('Lighthouse running')
      );
    });

    it('exécute Lighthouse si lastRun date de plus de 7 jours', async () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);
      const lastRun = new Date('2026-01-20T12:00:00.000Z').toISOString(); // 15 jours avant

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      });

      const result = await collectLighthouseScores(lastRun);

      expect(result.skipped).toBe(false);
      expect(result.lastRun).toBe(now.toISOString());
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringMatching(/Lighthouse running: last run \d+ days ago/)
      );
    });

    it('n\'exécute pas Lighthouse si lastRun date de moins de 7 jours et conserve les scores existants', async () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);
      const lastRun = new Date('2026-02-01T12:00:00.000Z').toISOString(); // 3 jours avant

      const existingScores: LighthouseScores = {
        performance: 85,
        accessibility: 90,
        bestPractices: 80,
        seo: 95,
      };

      const result = await collectLighthouseScores(lastRun, existingScores);

      expect(result.skipped).toBe(true);
      expect(result.lastRun).toBe(lastRun); // Pas de mise à jour
      expect(result.scores).toEqual(existingScores); // Scores conservés
      expect(mockFetch).not.toHaveBeenCalled();
      expect(mockConsoleLog).toHaveBeenCalledWith(
        expect.stringMatching(/Lighthouse skipped: last run \d+ days ago/)
      );
    });

    it('retourne des scores NC si skipped mais pas de scores existants', async () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);
      const lastRun = new Date('2026-02-01T12:00:00.000Z').toISOString();

      const result = await collectLighthouseScores(lastRun, undefined);

      expect(result.skipped).toBe(true);
      expect(result.scores).toEqual({
        performance: 'NC',
        accessibility: 'NC',
        bestPractices: 'NC',
        seo: 'NC',
      });
    });

    it('log le nombre de jours depuis le dernier run', async () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);
      const lastRun = new Date('2026-02-01T12:00:00.000Z').toISOString(); // 3 jours

      await collectLighthouseScores(lastRun);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        'Lighthouse skipped: last run 3 days ago'
      );
    });

    it('log correctement pour un premier run', async () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSuccessResponse,
      });

      await collectLighthouseScores(undefined);

      expect(mockConsoleLog).toHaveBeenCalledWith(
        'Lighthouse running: first execution'
      );
    });

    it('continue sans erreur si l\'API échoue (CA6 - fallback)', async () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);

      mockFetch.mockRejectedValueOnce(new Error('API unavailable'));

      const result = await collectLighthouseScores(undefined);

      // Pas d'exception levée
      expect(result.skipped).toBe(false);
      // lastRun n'est pas mis à jour en cas d'échec (tous scores NC)
      expect(result.lastRun).toBe('');
      expect(result.scores).toEqual({
        performance: 'NC',
        accessibility: 'NC',
        bestPractices: 'NC',
        seo: 'NC',
      });
    });

    it('conserve l\'ancienne date lastRun si l\'API échoue mais qu\'il y avait un run précédent', async () => {
      const now = new Date('2026-02-04T12:00:00.000Z');
      jest.setSystemTime(now);
      const previousRun = new Date('2026-01-01T12:00:00.000Z').toISOString();

      mockFetch.mockRejectedValueOnce(new Error('API unavailable'));

      const result = await collectLighthouseScores(previousRun);

      expect(result.skipped).toBe(false);
      // lastRun conserve l'ancienne date en cas d'échec
      expect(result.lastRun).toBe(previousRun);
      expect(result.scores).toEqual({
        performance: 'NC',
        accessibility: 'NC',
        bestPractices: 'NC',
        seo: 'NC',
      });
    });
  });

  describe('types exportés', () => {
    it('LighthouseScores accepte des nombres ou NC', () => {
      const scoresWithNumbers: LighthouseScores = {
        performance: 92,
        accessibility: 100,
        bestPractices: 95,
        seo: 98,
      };
      expect(scoresWithNumbers.performance).toBe(92);

      const scoresWithNC: LighthouseScores = {
        performance: 'NC',
        accessibility: 'NC',
        bestPractices: 'NC',
        seo: 'NC',
      };
      expect(scoresWithNC.performance).toBe('NC');
    });

    it('LighthouseResult a la bonne structure', () => {
      const result: LighthouseResult = {
        scores: {
          performance: 92,
          accessibility: 100,
          bestPractices: 95,
          seo: 98,
        },
        lastRun: '2026-02-04T12:00:00.000Z',
        skipped: false,
      };
      expect(result.skipped).toBe(false);
      expect(result.lastRun).toBeDefined();
      expect(result.scores).toBeDefined();
    });
  });
});
