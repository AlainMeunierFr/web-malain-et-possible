/**
 * Collecteur de métriques pour les tests E2E Playwright
 * Extrait les statistiques depuis e2e-results.json
 */

import fs from 'fs';
import path from 'path';

/**
 * Interface pour les métriques E2E
 */
export interface E2EMetrics {
  total: number;
  passed: number;
  failed: number;
  duration: number;
}

/**
 * Collecte les métriques E2E depuis les résultats Playwright
 * @returns Les métriques E2E ou undefined si le fichier n'existe pas ou est invalide
 */
export function collectE2EMetrics(): E2EMetrics | undefined {
  const e2eResultsPath = path.join(process.cwd(), 'test-results', 'e2e-results.json');
  
  if (!fs.existsSync(e2eResultsPath)) {
    return undefined;
  }
  
  try {
    const content = fs.readFileSync(e2eResultsPath, 'utf-8');
    const results = JSON.parse(content);
    
    if (!results.stats) {
      return undefined;
    }
    
    const { expected = 0, unexpected = 0, skipped = 0, flaky = 0, duration = 0 } = results.stats;
    const total = expected + unexpected + skipped + flaky;
    
    return {
      total,
      passed: expected,
      failed: unexpected,
      duration: Math.round(duration),
    };
  } catch (e) {
    return undefined;
  }
}
