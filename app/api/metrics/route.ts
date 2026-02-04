/**
 * API Route pour les métriques de qualité
 * GET /api/metrics - Retourne les dernières métriques
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { MetricsHistory } from '../../../types/metrics';

export async function GET() {
  try {
    const metricsPath = path.join(process.cwd(), 'public', 'metrics', 'history.json');
    
    if (!fs.existsSync(metricsPath)) {
      return NextResponse.json({ error: 'Métriques non disponibles' }, { status: 404 });
    }
    
    const data = fs.readFileSync(metricsPath, 'utf-8');
    const metrics: MetricsHistory = JSON.parse(data);
    
    // Charger aussi la version du site
    let siteVersion = '1.0.0';
    try {
      const versionPath = path.join(process.cwd(), 'site-version.json');
      const versionData = JSON.parse(fs.readFileSync(versionPath, 'utf-8'));
      siteVersion = `${versionData.major}.${versionData.minor}.${versionData.patch}`;
    } catch {
      // Ignorer les erreurs de version
    }
    
    // S'assurer que lighthouse existe avec valeurs NC par défaut
    const latestWithLighthouse = {
      ...metrics.latest,
      lighthouse: metrics.latest.lighthouse || {
        performance: 'NC' as const,
        accessibility: 'NC' as const,
        bestPractices: 'NC' as const,
        seo: 'NC' as const,
      },
    };
    
    return NextResponse.json({
      latest: latestWithLighthouse,
      trends: metrics.trends,
      snapshotCount: metrics.snapshots?.length || 0,
      siteVersion,
    });
  } catch (error) {
    console.error('Erreur API métriques:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
