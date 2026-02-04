/**
 * Tests TDD pour metricsReader.ts (US-12.5)
 * Lit public/metrics/history.json et retourne les métriques formatées.
 */

import fs from 'fs';
import path from 'path';
import { readMetricsHistory, readLatestMetrics, type MetricsApiResponse } from '../../utils/projet/metricsReader';
import type { MetricsHistory, MetricsSnapshot } from '../../types/metrics';
import { buildMetricsSnapshot, buildMetricsHistory } from '../../utils/projet/metricsSnapshotBuilder';

describe('metricsReader', () => {
  let readFileSyncSpy: jest.SpyInstance;
  let existsSyncSpy: jest.SpyInstance;
  let cwdSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue('/project');
    jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));
    readFileSyncSpy = jest.spyOn(fs, 'readFileSync');
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('readMetricsHistory', () => {
    it('retourne l\'historique complet des métriques', () => {
      const snapshot = buildMetricsSnapshot({ typeCoverage: 95 });
      const history = buildMetricsHistory(snapshot);
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(JSON.stringify(history));

      const result = readMetricsHistory();

      expect(result).toEqual(history);
      expect(result.latest).toEqual(snapshot);
      expect(result.snapshots).toHaveLength(1);
    });

    it('lit le fichier public/metrics/history.json depuis la racine du projet', () => {
      const history = buildMetricsHistory(buildMetricsSnapshot());
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue(JSON.stringify(history));

      readMetricsHistory();

      const pathRead = readFileSyncSpy.mock.calls[0][0];
      expect(pathRead).toContain('public');
      expect(pathRead).toContain('metrics');
      expect(pathRead).toContain('history.json');
    });

    it('retourne null si le fichier n\'existe pas', () => {
      existsSyncSpy.mockReturnValue(false);

      const result = readMetricsHistory();

      expect(result).toBeNull();
    });

    it('lance une erreur si le JSON est invalide', () => {
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue('{ invalid json }');

      expect(() => readMetricsHistory()).toThrow(/JSON|invalide|parse/i);
    });

    it('gère une erreur de parsing qui n\'est pas une instance de Error', () => {
      existsSyncSpy.mockReturnValue(true);
      readFileSyncSpy.mockReturnValue('valid json string');
      // Mock JSON.parse to throw a non-Error value
      const originalParse = JSON.parse;
      JSON.parse = jest.fn().mockImplementation(() => {
        throw 'string error';
      });

      expect(() => readMetricsHistory()).toThrow(/JSON|invalide|string error/i);

      JSON.parse = originalParse;
    });
  });

  describe('readLatestMetrics', () => {
    it('retourne les dernières métriques avec la version du site', () => {
      const snapshot = buildMetricsSnapshot({ typeCoverage: 95 });
      const history = buildMetricsHistory(snapshot);
      existsSyncSpy.mockImplementation((p: string) => {
        if (p.includes('history.json')) return true;
        if (p.includes('site-version.json')) return true;
        return false;
      });
      readFileSyncSpy.mockImplementation((p: string) => {
        if (p.includes('history.json')) return JSON.stringify(history);
        if (p.includes('site-version.json')) return JSON.stringify({ major: 1, minor: 2, patch: 3 });
        return '';
      });

      const result = readLatestMetrics();

      expect(result).not.toBeNull();
      expect(result!.latest).toEqual(snapshot);
      expect(result!.siteVersion).toBe('1.2.3');
    });

    it('retourne null si les métriques n\'existent pas', () => {
      existsSyncSpy.mockReturnValue(false);

      const result = readLatestMetrics();

      expect(result).toBeNull();
    });

    it('utilise la version par défaut si site-version.json n\'existe pas', () => {
      const snapshot = buildMetricsSnapshot();
      const history = buildMetricsHistory(snapshot);
      existsSyncSpy.mockImplementation((p: string) => {
        if (p.includes('history.json')) return true;
        return false;
      });
      readFileSyncSpy.mockReturnValue(JSON.stringify(history));

      const result = readLatestMetrics();

      expect(result).not.toBeNull();
      expect(result!.siteVersion).toBe('1.0.0');
    });

    it('retourne le nombre de snapshots dans snapshotCount', () => {
      const snapshot1 = buildMetricsSnapshot();
      const snapshot2 = buildMetricsSnapshot({ typeCoverage: 80 });
      const history: MetricsHistory = {
        snapshots: [snapshot1, snapshot2],
        latest: snapshot2,
        trends: { tests: 'stable', coverage: 'stable', quality: 'stable' },
      };
      existsSyncSpy.mockImplementation((p: string) => p.includes('history.json'));
      readFileSyncSpy.mockReturnValue(JSON.stringify(history));

      const result = readLatestMetrics();

      expect(result).not.toBeNull();
      expect(result!.snapshotCount).toBe(2);
    });

    it('retourne les trends', () => {
      const history = buildMetricsHistory(buildMetricsSnapshot());
      history.trends = { tests: 'up', coverage: 'down', quality: 'stable' };
      existsSyncSpy.mockImplementation((p: string) => p.includes('history.json'));
      readFileSyncSpy.mockReturnValue(JSON.stringify(history));

      const result = readLatestMetrics();

      expect(result).not.toBeNull();
      expect(result!.trends).toEqual({ tests: 'up', coverage: 'down', quality: 'stable' });
    });

    it('retourne 0 pour snapshotCount si snapshots est undefined', () => {
      const history = {
        latest: buildMetricsSnapshot(),
        trends: { tests: 'stable', coverage: 'stable', quality: 'stable' },
        // snapshots intentionnellement omis
      };
      existsSyncSpy.mockImplementation((p: string) => p.includes('history.json'));
      readFileSyncSpy.mockReturnValue(JSON.stringify(history));

      const result = readLatestMetrics();

      expect(result).not.toBeNull();
      expect(result!.snapshotCount).toBe(0);
    });

    it('gère une erreur lors de la lecture de site-version.json', () => {
      const history = buildMetricsHistory(buildMetricsSnapshot());
      existsSyncSpy.mockImplementation((p: string) => {
        if (p.includes('history.json')) return true;
        if (p.includes('site-version.json')) return true;
        return false;
      });
      readFileSyncSpy.mockImplementation((p: string) => {
        if (p.includes('history.json')) return JSON.stringify(history);
        if (p.includes('site-version.json')) throw new Error('Read error');
        return '';
      });

      const result = readLatestMetrics();

      expect(result).not.toBeNull();
      expect(result!.siteVersion).toBe('1.0.0'); // Version par défaut
    });
  });
});
