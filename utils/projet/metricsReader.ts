/**
 * Backend pur : lecture du fichier public/metrics/history.json (US-12.5).
 * Expose les métriques formatées pour l'API et les composants.
 */

import fs from 'fs';
import path from 'path';
import type { MetricsHistory, MetricsSnapshot } from '../../types/metrics';

const METRICS_RELATIVE_PATH = path.join('public', 'metrics', 'history.json');
const VERSION_RELATIVE_PATH = 'site-version.json';

/**
 * Réponse de l'API /api/metrics
 */
export interface MetricsApiResponse {
  latest: MetricsSnapshot;
  trends: MetricsHistory['trends'];
  snapshotCount: number;
  siteVersion: string;
}

/**
 * Lit le fichier history.json et retourne l'historique complet des métriques.
 * @returns L'historique des métriques ou null si le fichier n'existe pas
 * @throws Si le JSON est invalide
 */
export function readMetricsHistory(): MetricsHistory | null {
  const metricsPath = path.join(process.cwd(), METRICS_RELATIVE_PATH);

  if (!fs.existsSync(metricsPath)) {
    return null;
  }

  const raw = fs.readFileSync(metricsPath, 'utf-8');
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`history.json : JSON invalide - ${message}`);
  }

  return data as MetricsHistory;
}

/**
 * Lit les dernières métriques avec la version du site.
 * @returns Les métriques formatées pour l'API ou null si les métriques n'existent pas
 */
export function readLatestMetrics(): MetricsApiResponse | null {
  const history = readMetricsHistory();

  if (!history) {
    return null;
  }

  // Lire la version du site
  let siteVersion = '1.0.0';
  try {
    const versionPath = path.join(process.cwd(), VERSION_RELATIVE_PATH);
    if (fs.existsSync(versionPath)) {
      const versionData = JSON.parse(fs.readFileSync(versionPath, 'utf-8'));
      siteVersion = `${versionData.major}.${versionData.minor}.${versionData.patch}`;
    }
  } catch {
    // Ignorer les erreurs de version, garder la valeur par défaut
  }

  return {
    latest: history.latest,
    trends: history.trends,
    snapshotCount: history.snapshots?.length || 0,
    siteVersion,
  };
}
