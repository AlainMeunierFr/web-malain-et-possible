/**
 * Tests TDD pour metricsSnapshotBuilder.ts (US-12.1)
 * Permet de construire un MetricsSnapshot pour les steps BDD (données de test).
 */

import {
  buildMetricsSnapshot,
  buildMetricsHistory,
} from '../../utils/metricsSnapshotBuilder';
import type { MetricsSnapshot } from '../../types/metrics';

describe('buildMetricsSnapshot', () => {
  it('retourne un snapshot avec des valeurs par défaut et quality.typeCoverage à "NC"', () => {
    const snapshot = buildMetricsSnapshot();
    expect(snapshot.quality.typeCoverage).toBe('NC');
    expect(snapshot.quality.cyclomaticComplexity).toBe('NC');
    expect(snapshot.quality.maintainabilityIndex).toBe('NC');
    expect(snapshot.quality.technicalDebt).toBe('NC');
    expect(snapshot.performance.lighthouseScore).toBe('NC');
  });

  it('applique typeCoverage numérique quand fourni', () => {
    const snapshot = buildMetricsSnapshot({ typeCoverage: 85 });
    expect(snapshot.quality.typeCoverage).toBe(85);
  });

  it('applique typeCoverage "NC" quand fourni explicitement', () => {
    const snapshot = buildMetricsSnapshot({ typeCoverage: 'NC' });
    expect(snapshot.quality.typeCoverage).toBe('NC');
  });

  it('applique lighthouseScore numérique quand fourni', () => {
    const snapshot = buildMetricsSnapshot({ lighthouseScore: 72 });
    expect(snapshot.performance.lighthouseScore).toBe(72);
  });

  it('applique lighthouseScore "NC" quand fourni explicitement', () => {
    const snapshot = buildMetricsSnapshot({ lighthouseScore: 'NC' });
    expect(snapshot.performance.lighthouseScore).toBe('NC');
  });

  it('applique cyclomaticComplexity, maintainabilityIndex, technicalDebt à "NC"', () => {
    const snapshot = buildMetricsSnapshot({
      cyclomaticComplexity: 'NC',
      maintainabilityIndex: 'NC',
      technicalDebt: 'NC',
    });
    expect(snapshot.quality.cyclomaticComplexity).toBe('NC');
    expect(snapshot.quality.maintainabilityIndex).toBe('NC');
    expect(snapshot.quality.technicalDebt).toBe('NC');
  });

  it('retourne un snapshot valide (structure complète)', () => {
    const snapshot = buildMetricsSnapshot({ typeCoverage: 90, lighthouseScore: 88 });
    expect(snapshot.timestamp).toBeDefined();
    expect(snapshot.branch).toBeDefined();
    expect(snapshot.commit).toBeDefined();
    expect(snapshot.tests).toBeDefined();
    expect(snapshot.coverage).toBeDefined();
    expect(snapshot.quality).toBeDefined();
    expect(snapshot.size).toBeDefined();
    expect(snapshot.dependencies).toBeDefined();
    expect(snapshot.performance).toBeDefined();
    expect(snapshot.quality.typeCoverage).toBe(90);
    expect(snapshot.performance.lighthouseScore).toBe(88);
  });
});

describe('buildMetricsHistory', () => {
  it('retourne un MetricsHistory avec latest et snapshots contenant le snapshot', () => {
    const snapshot = buildMetricsSnapshot({ typeCoverage: 75 });
    const history = buildMetricsHistory(snapshot);
    expect(history.latest).toBe(snapshot);
    expect(history.snapshots).toHaveLength(1);
    expect(history.snapshots[0]).toBe(snapshot);
    expect(history.trends).toEqual({ tests: 'stable', coverage: 'stable', quality: 'stable' });
  });
});
