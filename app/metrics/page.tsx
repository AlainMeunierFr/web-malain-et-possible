/**
 * Page de visualisation des métriques de qualité du code
 * Affiche un dashboard avec toutes les métriques collectées
 */

import React from 'react';
import fs from 'fs';
import path from 'path';
import type { MetricsHistory, MetricsSnapshot } from '../../types/metrics';
import styles from './metrics.module.css';
import Tooltip from '../../components/Tooltip';
import CyclomaticComplexityTooltip from '../../components/CyclomaticComplexityTooltip';

// Désactiver le prerendering statique car on lit des fichiers système
export const dynamic = 'force-dynamic';

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
 * Charge la version du site depuis le fichier site-version.json
 */
function loadSiteVersion(): string {
  try {
    const versionFilePath = path.join(process.cwd(), 'site-version.json');
    const versionContent = fs.readFileSync(versionFilePath, 'utf-8');
    const version = JSON.parse(versionContent);
    
    // Validation de la structure des données
    if (typeof version.major !== 'number' || 
        typeof version.minor !== 'number' || 
        typeof version.patch !== 'number') {
      return '1.0.0';
    }
    
    return `${version.major}.${version.minor}.${version.patch}`;
  } catch {
    return '1.0.0';
  }
}

/**
 * Composant Card pour afficher une métrique
 */
function MetricCard({ 
  title, 
  value, 
  unit = '', 
  trend, 
  subtitle,
  tooltip 
}: { 
  title: string; 
  value: number | string; 
  unit?: string; 
  trend?: 'up' | 'down' | 'stable'; 
  subtitle?: string;
  tooltip?: React.ReactNode;
}) {
  const trendIcon = trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→';
  const trendClass = trend === 'up' ? styles.trendUp : trend === 'down' ? styles.trendDown : styles.trendStable;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {tooltip && (
          <Tooltip content={tooltip} position="top">
            <div className={styles.infoIcon} aria-label="Plus d'informations">
              ℹ️
            </div>
          </Tooltip>
        )}
      </div>
      <div className={styles.cardValue}>
        {value}{unit}
        {trend && <span className={`${styles.trend} ${trendClass}`}>{trendIcon}</span>}
      </div>
      {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
    </div>
  );
}

/**
 * Composant Card enrichi pour afficher les métriques de tests avec jauge de réussite
 */
function TestMetricCard({
  title,
  total,
  passed,
  failed,
  duration,
  containerLabel,
  containerCount,
  trend
}: {
  title: string;
  total: number;
  passed: number;
  failed: number;
  duration: number;
  containerLabel: string;
  containerCount: number;
  trend?: 'up' | 'down' | 'stable';
}) {
  const successRate = total > 0 ? (passed / total) * 100 : 0;
  const trendIcon = trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→';
  const trendClass = trend === 'up' ? styles.trendUp : trend === 'down' ? styles.trendDown : styles.trendStable;
  const progressColorClass = successRate >= 80 ? styles.progressGood : 
                             successRate >= 60 ? styles.progressWarning : styles.progressDanger;

  return (
    <div className={styles.testCard}>
      <h3 className={styles.testCardTitle}>{title}</h3>
      <div className={styles.testCardValue}>
        {total}
        {trend && <span className={`${styles.trend} ${trendClass}`}>{trendIcon}</span>}
      </div>
      
      {/* Jauge de réussite */}
      <div className={styles.testProgressContainer}>
        <div className={styles.testProgressBar}>
          <div 
            className={`${styles.testProgressFill} ${progressColorClass}`}
            style={{ width: `${successRate}%` }}
          />
        </div>
        <span className={styles.testProgressLabel}>{successRate.toFixed(1)}%</span>
      </div>
      
      {/* Détails */}
      <div className={styles.testCardDetails}>
        <div className={styles.testCardDetailRow}>
          <span className={styles.testCardDetailLabel}>✅ Réussis:</span>
          <span className={styles.testCardDetailValue}>{passed}</span>
        </div>
        <div className={styles.testCardDetailRow}>
          <span className={styles.testCardDetailLabel}>❌ Échoués:</span>
          <span className={styles.testCardDetailValue}>{failed}</span>
        </div>
        <div className={styles.testCardDetailRow}>
          <span className={styles.testCardDetailLabel}>⏱️ Durée:</span>
          <span className={styles.testCardDetailValue}>{(duration / 1000).toFixed(2)}s</span>
        </div>
        <div className={styles.testCardDetailRow}>
          <span className={styles.testCardDetailLabel}>📁 {containerLabel}:</span>
          <span className={styles.testCardDetailValue}>{containerCount}</span>
        </div>
      </div>
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
 * Trouve le dernier snapshot avec des données E2E dans l'historique
 */
function findLastE2ERun(history: MetricsHistory): MetricsSnapshot['tests']['e2eTests'] | null {
  // Chercher dans le snapshot actuel d'abord
  if (history.latest?.tests?.e2eTests) {
    return history.latest.tests.e2eTests;
  }
  
  // Chercher dans l'historique (du plus récent au plus ancien)
  if (history.snapshots && Array.isArray(history.snapshots)) {
    for (let i = history.snapshots.length - 1; i >= 0; i--) {
      const snapshot = history.snapshots[i];
      if (snapshot.tests?.e2eTests) {
        return snapshot.tests.e2eTests;
      }
    }
  }
  
  return null;
}

/**
 * Page principale
 */
export default function MetricsPage() {
  const metricsData = loadMetrics();
  const siteVersion = loadSiteVersion();

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
  
  // Trouver le dernier run E2E (actuel ou historique)
  const lastE2ERun = findLastE2ERun(metricsData);

  const latest = metricsData.latest;
  const trends = metricsData.trends;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>📊 Métriques de Qualité du Code</h1>
          <div className={styles.meta}>
            <span>Branche: {latest.branch}</span>
            <span>Commit: {latest.commit}</span>
            <span>Version site: v{siteVersion}</span>
            <span>Mis à jour: {new Date(latest.timestamp).toLocaleString('fr-FR')}</span>
          </div>
        </div>

        {/* Section Tests */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🧪 Tests</h2>
          <div className={styles.gridTests}>
            <TestMetricCard
              title="Total Tests"
              total={latest.tests.totalTests}
              passed={latest.tests.passingTests}
              failed={latest.tests.failingTests}
              duration={latest.tests.testDuration}
              containerLabel="Total"
              containerCount={latest.tests.totalTestFiles || 0}
              trend={trends.tests}
            />
            <TestMetricCard
              title="Scénarios BDD"
              total={latest.tests.bddScenarios || 0}
              passed={latest.tests.bddScenariosPassed || latest.tests.bddScenarios || 0}
              failed={latest.tests.bddScenariosFailed || 0}
              duration={
                lastE2ERun && lastE2ERun.duration > 0
                  ? lastE2ERun.duration
                  : latest.tests.bddTestDuration || latest.tests.e2eTests?.duration || 0
              }
              containerLabel="Features"
              containerCount={latest.tests.bddFeatures || 0}
            />
            <TestMetricCard
              title="Tests Unitaires"
              total={latest.tests.unitTests || 0}
              passed={latest.tests.unitTestPassed || 0}
              failed={latest.tests.unitTestFailed || 0}
              duration={latest.tests.unitTestDuration || 0}
              containerLabel="Fichiers"
              containerCount={latest.tests.unitTestFiles || 0}
            />
            <TestMetricCard
              title="Tests Intégration"
              total={latest.tests.integrationTests || 0}
              passed={latest.tests.integrationTestPassed || 0}
              failed={latest.tests.integrationTestFailed || 0}
              duration={latest.tests.integrationTestDuration || 0}
              containerLabel="Fichiers"
              containerCount={latest.tests.integrationTestFiles || 0}
            />
            <TestMetricCard
              title="Steps E2E"
              total={latest.tests.e2eSteps || 0}
              passed={latest.tests.e2eStepsPassed || latest.tests.e2eSteps || 0}
              failed={latest.tests.e2eStepsFailed || 0}
              duration={
                lastE2ERun && lastE2ERun.duration > 0
                  ? lastE2ERun.duration
                  : latest.tests.e2eTests?.duration || 0
              }
              containerLabel="Fichiers"
              containerCount={latest.tests.e2eScenarioFiles || 0}
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
              tooltip={<CyclomaticComplexityTooltip />}
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
