/**
 * Page de visualisation des métriques de qualité du code
 * Affiche un dashboard avec toutes les métriques collectées
 */

import fs from 'fs';
import path from 'path';
import type { MetricsHistory, MetricsSnapshot } from '../../types/metrics';
import styles from './metrics.module.css';

/**
 * Charge les métriques depuis le fichier JSON
 */
function loadMetrics(): MetricsHistory | null {
  try {
    const metricsPath = path.join(process.cwd(), 'public', 'metrics', 'history.json');
    if (fs.existsSync(metricsPath)) {
      const data = fs.readFileSync(metricsPath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Erreur lors du chargement des métriques:', error);
  }
  return null;
}

/**
 * Composant Card pour afficher une métrique
 */
function MetricCard({ 
  title, 
  value, 
  unit = '', 
  trend, 
  subtitle 
}: { 
  title: string; 
  value: number | string; 
  unit?: string; 
  trend?: 'up' | 'down' | 'stable'; 
  subtitle?: string;
}) {
  const trendIcon = trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→';
  const trendClass = trend === 'up' ? styles.trendUp : trend === 'down' ? styles.trendDown : styles.trendStable;

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <div className={styles.cardValue}>
        {value}{unit}
        {trend && <span className={`${styles.trend} ${trendClass}`}>{trendIcon}</span>}
      </div>
      {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
    </div>
  );
}

/**
 * Composant ProgressBar
 */
function ProgressBar({ 
  value, 
  max = 100, 
  label 
}: { 
  value: number; 
  max?: number; 
  label: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const colorClass = percentage >= 80 ? styles.progressGood : 
                     percentage >= 60 ? styles.progressWarning : styles.progressDanger;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressLabel}>
        <span>{label}</span>
        <span>{percentage.toFixed(1)}%</span>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={`${styles.progressFill} ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Page principale
 */
export default function MetricsPage() {
  const metricsData = loadMetrics();

  if (!metricsData) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>📊 Métriques de Qualité</h1>
          <div className={styles.emptyState}>
            <p>Aucune métrique disponible pour le moment.</p>
            <p>Exécutez <code>npm run metrics:collect</code> pour générer les métriques.</p>
          </div>
        </div>
      </main>
    );
  }

  const latest = metricsData.latest;
  const trends = metricsData.trends;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>📊 Métriques de Qualité du Code</h1>
          <div className={styles.meta}>
            <span>Version: {latest.version}</span>
            <span>Branche: {latest.branch}</span>
            <span>Commit: {latest.commit}</span>
            <span>Mis à jour: {new Date(latest.timestamp).toLocaleString('fr-FR')}</span>
          </div>
        </div>

        {/* Section Tests */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🧪 Tests</h2>
          <div className={styles.grid}>
            <MetricCard 
              title="Total Tests" 
              value={latest.tests.totalTests} 
              trend={trends.tests}
              subtitle={`${latest.tests.passingTests} réussis, ${latest.tests.failingTests} échoués`}
            />
            <MetricCard 
              title="Tests Unitaires" 
              value={latest.tests.unitTests}
            />
            <MetricCard 
              title="Tests Intégration" 
              value={latest.tests.integrationTests}
            />
            <MetricCard 
              title="Features BDD" 
              value={latest.tests.bddFeatures}
              subtitle={`${latest.tests.bddScenarios} scénarios, ${latest.tests.bddSteps} steps`}
            />
          </div>
        </section>

        {/* Section Couverture */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎯 Couverture de Code</h2>
          <div className={styles.coverageGrid}>
            <ProgressBar 
              label="Lignes" 
              value={latest.coverage.lines.percentage} 
            />
            <ProgressBar 
              label="Statements" 
              value={latest.coverage.statements.percentage} 
            />
            <ProgressBar 
              label="Fonctions" 
              value={latest.coverage.functions.percentage} 
            />
            <ProgressBar 
              label="Branches" 
              value={latest.coverage.branches.percentage} 
            />
          </div>
          <div className={styles.coverageStats}>
            <span>Total: {latest.coverage.lines.total} lignes</span>
            <span>Couvertes: {latest.coverage.lines.covered} lignes</span>
          </div>
        </section>

        {/* Section Qualité */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>✨ Qualité du Code</h2>
          <div className={styles.grid}>
            <MetricCard 
              title="Erreurs ESLint" 
              value={latest.quality.eslintErrors}
              trend={trends.quality}
            />
            <MetricCard 
              title="Warnings ESLint" 
              value={latest.quality.eslintWarnings}
            />
            <MetricCard 
              title="Type Coverage" 
              value={latest.quality.typeCoverage}
              unit="%"
            />
            <MetricCard 
              title="Complexité Cyclomatique" 
              value={latest.quality.cyclomaticComplexity}
            />
          </div>
        </section>

        {/* Section Taille */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📏 Taille du Code</h2>
          <div className={styles.grid}>
            <MetricCard 
              title="Fichiers Total" 
              value={latest.size.totalFiles}
            />
            <MetricCard 
              title="Lignes de Code" 
              value={latest.size.sourceLines}
            />
            <MetricCard 
              title="Composants" 
              value={latest.size.components}
            />
            <MetricCard 
              title="Pages" 
              value={latest.size.pages}
            />
          </div>
        </section>

        {/* Section Dépendances */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📦 Dépendances</h2>
          <div className={styles.grid}>
            <MetricCard 
              title="Total" 
              value={latest.dependencies.total}
              subtitle={`${latest.dependencies.production} prod, ${latest.dependencies.development} dev`}
            />
            <MetricCard 
              title="Vulnérabilités" 
              value={latest.dependencies.vulnerabilities.total}
              subtitle={`${latest.dependencies.vulnerabilities.critical} critiques, ${latest.dependencies.vulnerabilities.high} hautes`}
            />
          </div>
        </section>

        {/* Section Performance */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>⚡ Performance</h2>
          <div className={styles.grid}>
            <MetricCard 
              title="Taille Bundle" 
              value={latest.performance.bundleSize}
              unit=" KB"
            />
            <MetricCard 
              title="Temps de Build" 
              value={(latest.performance.buildTime / 1000).toFixed(2)}
              unit="s"
            />
            {latest.performance.lighthouseScore && (
              <MetricCard 
                title="Score Lighthouse" 
                value={latest.performance.lighthouseScore}
                unit="/100"
              />
            )}
          </div>
        </section>

        {/* Historique */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📈 Historique</h2>
          <p className={styles.historyInfo}>
            {metricsData.snapshots.length} mesures enregistrées
          </p>
        </section>
      </div>
    </main>
  );
}
