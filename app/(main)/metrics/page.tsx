/**
 * Page de visualisation des métriques de qualité du code
 * Affiche un dashboard avec toutes les métriques collectées
 */

import React from 'react';
import fs from 'fs';
import path from 'path';
import type { MetricsHistory, MetricsSnapshot } from '../../../types/metrics';
import Tooltip from '../../../components/Tooltip';
import { parseInlineMarkdown } from '../../../utils/markdownInlineParser';

/** Styles dédiés : app/metrics/metrics.css (chargés via layout) */
import { getTooltipConfig } from '../../../utils/tooltipsConfig';

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
  metricKey,
}: { 
  title: string; 
  value: number | string; 
  unit?: string;
  trend?: 'up' | 'down' | 'stable'; 
  subtitle?: string;
  metricKey?: string;
}) {
  const trendIcon = trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→';
  const trendClass = trend === 'up' ? 'trendUp' : trend === 'down' ? 'trendDown' : 'trendStable';

  return (
    <div className="card">
      <div className="cardHeader">
        <h3 className="cardTitle">{title}</h3>
        {metricKey && (
          <Tooltip content={
            <div>
              {getTooltipConfig(metricKey) ? (
                <div>{parseInlineMarkdown(getTooltipConfig(metricKey)?.description || '')}</div>
              ) : (
                <p>Information à venir pour cette métrique</p>
              )}
            </div>
          }>
            <div className="infoIcon" aria-label="Plus d'informations">
              ℹ️
            </div>
          </Tooltip>
        )}
      </div>
      <div className="cardValue">
        {value}{unit}
        {trend && <span className={`trend ${trendClass}`}>{trendIcon}</span>}
      </div>
      {subtitle && <p className="cardSubtitle">{subtitle}</p>}
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
  trend,
  metricKey,
}: {
  title: string;
  total: number;
  passed: number;
  failed: number;
  duration: number;
  containerLabel: string;
  containerCount: number;
  trend?: 'up' | 'down' | 'stable';
  metricKey?: string;
}) {
  const successRate = total > 0 ? (passed / total) * 100 : 0;
  const trendIcon = trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '→';
  const trendClass = trend === 'up' ? 'trendUp' : trend === 'down' ? 'trendDown' : 'trendStable';
  const progressColorClass = successRate >= 80 ? 'progressGood' : 
                             successRate >= 60 ? 'progressWarning' : 'progressDanger';

  return (
    <div className="testCard">
      <div className="cardHeader">
        <h3 className="testCardTitle">{title}</h3>
        {metricKey && (
          <Tooltip content={
            <div>{parseInlineMarkdown(getTooltipConfig(metricKey)?.description || '')}</div>
          }>
            <div className="infoIcon" aria-label="Plus d'informations">
              ℹ️
            </div>
          </Tooltip>
        )}
      </div>
      <div className="testCardValue">
        {total}
        {trend && <span className={`trend ${trendClass}`}>{trendIcon}</span>}
      </div>
      
      {/* Jauge de réussite */}
      <div className="testProgressContainer">
        <div className="testProgressBar">
          <div 
            className={`testProgressFill ${progressColorClass}`}
            style={{ width: `${successRate}%` }}
          />
        </div>
        <span className="testProgressLabel">{successRate.toFixed(1)}%</span>
      </div>
      
      {/* Détails */}
      <div className="testCardDetails">
        <div className="testCardDetailRow">
          <span className="testCardDetailLabel">✅ Réussis:</span>
          <span className="testCardDetailValue">{passed}</span>
        </div>
        <div className="testCardDetailRow">
          <span className="testCardDetailLabel">❌ Échoués:</span>
          <span className="testCardDetailValue">{failed}</span>
        </div>
        <div className="testCardDetailRow">
          <span className="testCardDetailLabel">⏱️ Durée:</span>
          <span className="testCardDetailValue">{(duration / 1000).toFixed(2)}s</span>
        </div>
        <div className="testCardDetailRow">
          <span className="testCardDetailLabel">📁 {containerLabel}:</span>
          <span className="testCardDetailValue">{containerCount}</span>
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
  label,
  metricKey
}: { 
  value: number; 
  max?: number; 
  label: string;
  metricKey?: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const colorClass = percentage >= 80 ? 'progressGood' : 
                     percentage >= 60 ? 'progressWarning' : 'progressDanger';

  return (
    <div className="progressContainer">
      <div className="progressLabel">
        <div className="cardHeader">
          <span>{label}</span>
          {metricKey && (
            <Tooltip content={
              <div>
                {getTooltipConfig(metricKey) ? (
                  <div>{parseInlineMarkdown(getTooltipConfig(metricKey)?.description || '')}</div>
                ) : (
                  <p>Information à venir pour cette métrique</p>
                )}
              </div>
            }>
              <div className="infoIcon" aria-label="Plus d'informations">
                ℹ️
              </div>
            </Tooltip>
          )}
        </div>
        <span>{percentage.toFixed(1)}%</span>
      </div>
      <div className="progressBar">
        <div 
          className={`progressFill ${colorClass}`}
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
      <main className="main">
        <div className="container">
          <h1 className="title">📊 Métriques de Qualité</h1>
          <div className="emptyState">
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
    <main className="main">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">📊 Métriques de Qualité du Code</h1>
          <div className="meta">
            <span>Branche: {latest.branch}</span>
            <span>Commit: {latest.commit}</span>
            <span>Version site: v{siteVersion}</span>
            <span>Mis à jour: {new Date(latest.timestamp).toLocaleString('fr-FR')}</span>
          </div>
        </div>

        {/* Section Tests */}
        <section className="section">
          <h2 className="sectionTitle">🧪 Tests</h2>
          <div className="gridTests">
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
              duration={latest.tests.bddTestDuration || 0}
              containerLabel="Features"
              containerCount={latest.tests.bddFeatures || 0}
              metricKey="bddScenarios"
            />
            <TestMetricCard
              title="Tests Unitaires"
              total={latest.tests.unitTests || 0}
              passed={latest.tests.unitTestPassed || 0}
              failed={latest.tests.unitTestFailed || 0}
              duration={latest.tests.unitTestDuration || 0}
              containerLabel="Fichiers"
              containerCount={latest.tests.unitTestFiles || 0}
              metricKey="unitTests"
            />
            <TestMetricCard
              title="Tests Intégration"
              total={latest.tests.integrationTests || 0}
              passed={latest.tests.integrationTestPassed || 0}
              failed={latest.tests.integrationTestFailed || 0}
              duration={latest.tests.integrationTestDuration || 0}
              containerLabel="Fichiers"
              containerCount={latest.tests.integrationTestFiles || 0}
              metricKey="integrationTests"
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
              metricKey="e2eSteps"
            />
          </div>
        </section>

        {/* Section Couverture */}
        <section className="section">
          <h2 className="sectionTitle">🎯 Couverture de Code</h2>
          <div className="coverageGrid">
            <ProgressBar 
              label="Lignes" 
              value={latest.coverage.lines.percentage}
              metricKey="codeLinesPercentage"
            />
            <ProgressBar 
              label="Statements" 
              value={latest.coverage.statements.percentage}
              metricKey="statementsPercentage"
            />
            <ProgressBar 
              label="Fonctions" 
              value={latest.coverage.functions.percentage}
              metricKey="functionsPercentage"
            />
            <ProgressBar 
              label="Branches" 
              value={latest.coverage.branches.percentage}
              metricKey="branchesPercentage"
            />
          </div>
          <div className="coverageStats">
            <span>Total: {latest.coverage.lines.total} lignes</span>
            <span>Couvertes: {latest.coverage.lines.covered} lignes</span>
          </div>
        </section>

        {/* Section Qualité */}
        <section className="section">
          <h2 className="sectionTitle">✨ Qualité du Code</h2>
          <div className="grid">
            <MetricCard 
              title="Erreurs ESLint" 
              value={latest.quality.eslintErrors}
              trend={trends.quality}
              metricKey="eslintErrors"
            />
            <MetricCard 
              title="Warnings ESLint" 
              value={latest.quality.eslintWarnings}
              metricKey="eslintWarnings"
            />
            {latest.quality.typeCoverage !== "NC" && (
              <MetricCard 
                title="Type Coverage" 
                value={latest.quality.typeCoverage}
                unit="%"
                metricKey="typeCoverage"
              />
            )}
            {latest.quality.cyclomaticComplexity !== "NC" && (
              <MetricCard 
                title="Complexité Cyclomatique" 
                value={latest.quality.cyclomaticComplexity}
                metricKey="cyclomaticComplexity"
              />
            )}
            {latest.quality.maintainabilityIndex !== "NC" && (
              <MetricCard 
                title="Index de Maintenabilité" 
                value={latest.quality.maintainabilityIndex}
                metricKey="maintainabilityIndex"
              />
            )}
            {latest.quality.technicalDebt !== "NC" && (
              <MetricCard 
                title="Dette Technique" 
                value={latest.quality.technicalDebt}
                metricKey="technicalDebt"
              />
            )}
          </div>
        </section>

        {/* Section Taille */}
        <section className="section">
          <h2 className="sectionTitle">📏 Taille du Code</h2>
          <div className="grid">
            <MetricCard 
              title="Fichiers Total" 
              value={latest.size.totalFiles}
              metricKey="totalFiles"
            />
            <MetricCard 
              title="Lignes de Code" 
              value={latest.size.sourceLines}
              metricKey="sourceLines"
            />
            <MetricCard 
              title="Composants" 
              value={latest.size.components}
              metricKey="components"
            />
            <MetricCard 
              title="Pages" 
              value={latest.size.pages}
              metricKey="pages"
            />
          </div>
        </section>

        {/* Section Dépendances */}
        <section className="section">
          <h2 className="sectionTitle">📦 Dépendances</h2>
          <div className="grid">
            <MetricCard 
              title="Total" 
              value={latest.dependencies.total}
              subtitle={`${latest.dependencies.production} prod, ${latest.dependencies.development} dev`}
              metricKey="dependenciesTotal"
            />
            <MetricCard 
              title="Vulnérabilités" 
              value={latest.dependencies.vulnerabilities.total}
              subtitle={`${latest.dependencies.vulnerabilities.critical} critiques, ${latest.dependencies.vulnerabilities.high} hautes`}
              metricKey="vulnerabilities"
            />
          </div>
        </section>

        {/* Section Performance */}
        <section className="section">
          <h2 className="sectionTitle">⚡ Performance</h2>
          <div className="grid">
            <MetricCard 
              title="Taille Bundle" 
              value={latest.performance.bundleSize}
              unit=" KB"
              metricKey="bundleSize"
            />
            <MetricCard 
              title="Temps de Build" 
              value={(latest.performance.buildTime / 1000).toFixed(2)}
              unit="s"
              metricKey="buildTime"
            />
            {latest.performance.lighthouseScore && latest.performance.lighthouseScore !== "NC" && (
              <MetricCard 
                title="Score Lighthouse" 
                value={latest.performance.lighthouseScore}
                unit="/100"
              />
            )}
          </div>
        </section>

        {/* Historique */}
        <section className="section">
          <h2 className="sectionTitle">📈 Historique</h2>
          <p className="historyInfo">
            {metricsData.snapshots.length} mesures enregistrées
          </p>
        </section>
      </div>
    </main>
  );
}
