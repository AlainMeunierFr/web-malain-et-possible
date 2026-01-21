/**
 * Tests unitaires pour collectE2EMetrics()
 * Approche TDD : progression du simple au complexe
 */

import fs from 'fs';
import path from 'path';
import { collectE2EMetrics } from '../../utils/e2eMetricsCollector';

// Mock fs
jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('collectE2EMetrics', () => {
  const mockE2EResultsPath = path.join(process.cwd(), 'test-results', 'e2e-results.json');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // ITÉRATION 1 : Cas le plus simple - fichier inexistant
  // ==========================================
  describe('ITÉRATION 1 : Gestion du fichier inexistant', () => {
    it('devrait retourner undefined si le fichier e2e-results.json n\'existe pas', () => {
      mockedFs.existsSync.mockReturnValue(false);

      const result = collectE2EMetrics();

      expect(result).toBeUndefined();
      expect(mockedFs.existsSync).toHaveBeenCalledWith(mockE2EResultsPath);
    });
  });

  // ==========================================
  // ITÉRATION 2 : Fichier avec résultats simples valides
  // ==========================================
  describe('ITÉRATION 2 : Lecture de résultats E2E valides simples', () => {
    it('devrait extraire les métriques E2E depuis un fichier JSON valide', () => {
      const mockResults = {
        stats: {
          expected: 6,
          unexpected: 0,
          skipped: 0,
          flaky: 0,
          duration: 16824.847
        }
      };

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockResults));

      const result = collectE2EMetrics();

      expect(result).toEqual({
        total: 6,
        passed: 6,
        failed: 0,
        duration: 16825, // Arrondi
      });
    });
  });

  // ==========================================
  // ITÉRATION 3 : Fichier avec tests échoués
  // ==========================================
  describe('ITÉRATION 3 : Gestion des tests échoués', () => {
    it('devrait compter correctement les tests échoués', () => {
      const mockResults = {
        stats: {
          expected: 4,
          unexpected: 2,  // Tests échoués
          skipped: 0,
          flaky: 0,
          duration: 10000
        }
      };

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockResults));

      const result = collectE2EMetrics();

      expect(result).toEqual({
        total: 6,
        passed: 4,
        failed: 2,
        duration: 10000,
      });
    });
  });

  // ==========================================
  // ITÉRATION 4 : Fichier avec tests skippés et flaky
  // ==========================================
  describe('ITÉRATION 4 : Gestion des tests skippés et flaky', () => {
    it('devrait inclure les tests skippés et flaky dans le total', () => {
      const mockResults = {
        stats: {
          expected: 5,
          unexpected: 1,
          skipped: 2,   // Tests ignorés
          flaky: 1,     // Tests instables
          duration: 8500.5
        }
      };

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockResults));

      const result = collectE2EMetrics();

      expect(result).toEqual({
        total: 9,  // 5 + 1 + 2 + 1
        passed: 5,
        failed: 1,
        duration: 8501,
      });
    });
  });

  // ==========================================
  // ITÉRATION 5 : Cas limites - valeurs par défaut
  // ==========================================
  describe('ITÉRATION 5 : Valeurs par défaut pour propriétés manquantes', () => {
    it('devrait utiliser 0 comme valeur par défaut si propriétés stats manquantes', () => {
      const mockResults = {
        stats: {
          // expected manquant
          unexpected: 1,
          // skipped manquant
          // flaky manquant
          // duration manquant
        }
      };

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockResults));

      const result = collectE2EMetrics();

      expect(result).toEqual({
        total: 1,  // 0 + 1 + 0 + 0
        passed: 0,
        failed: 1,
        duration: 0,
      });
    });
  });

  // ==========================================
  // ITÉRATION 6 : Cas d'erreur et robustesse
  // ==========================================
  describe('ITÉRATION 6 : Gestion des erreurs', () => {
    it('devrait retourner undefined si le fichier JSON est malformé', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('{ invalid json');

      const result = collectE2EMetrics();

      expect(result).toBeUndefined();
    });

    it('devrait retourner undefined si la propriété "stats" est absente', () => {
      const mockResults = {
        config: {},
        suites: []
        // stats manquant
      };

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockResults));

      const result = collectE2EMetrics();

      expect(result).toBeUndefined();
    });

    it('devrait retourner undefined si readFileSync lance une erreur', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = collectE2EMetrics();

      expect(result).toBeUndefined();
    });
  });
});
