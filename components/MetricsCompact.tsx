'use client';

import React, { useEffect, useState } from 'react';
import Tooltip from './Tooltip';

/**
 * Types pour les métriques
 */
interface MetricsData {
  latest: {
    timestamp: string;
    branch: string;
    commit: string;
    tests: {
      totalTests: number;
      passingTests: number;
      failingTests: number;
      testDuration: number;
      totalTestFiles?: number;
      bddScenarios?: number;
      bddScenariosPassed?: number;
      bddScenariosFailed?: number;
      bddTestDuration?: number;
      bddFeatures?: number;
      unitTests?: number;
      unitTestPassed?: number;
      unitTestFailed?: number;
      unitTestDuration?: number;
      unitTestFiles?: number;
      integrationTests?: number;
      integrationTestPassed?: number;
      integrationTestFailed?: number;
      integrationTestDuration?: number;
      integrationTestFiles?: number;
      e2eSteps?: number;
      e2eStepsPassed?: number;
      e2eStepsFailed?: number;
      e2eScenarioFiles?: number;
      e2eTests?: { duration: number };
    };
    coverage: {
      lines: { percentage: number; total: number; covered: number };
      statements: { percentage: number };
      functions: { percentage: number };
      branches: { percentage: number };
    };
    quality: {
      eslintErrors: number;
      eslintWarnings: number;
      typeCoverage?: number | string;
      cyclomaticComplexity?: number | string;
      maintainabilityIndex?: number | string;
      technicalDebt?: string;
    };
    size: {
      totalFiles: number;
      sourceLines: number;
      components: number;
      pages: number;
    };
    dependencies: {
      total: number;
      production: number;
      development: number;
      vulnerabilities: { total: number; critical: number; high: number };
    };
    performance: {
      bundleSize: number;
      buildTime: number;
      lighthouseScore?: number | string;
    };
    lighthouse?: {
      performance: number | 'NC';
      accessibility: number | 'NC';
      bestPractices: number | 'NC';
      seo: number | 'NC';
    };
  };
  trends: {
    tests?: 'up' | 'down' | 'stable';
    quality?: 'up' | 'down' | 'stable';
  };
  snapshotCount: number;
  siteVersion: string;
}

/**
 * Carte de test avec jauge et détails en colonne (style page Metrics originale)
 */
function TestCard({
  title,
  total,
  passed,
  failed,
  duration,
  files,
  tooltip,
}: {
  title: string;
  total: number;
  passed: number;
  failed: number;
  duration: number;
  files?: number;
  tooltip?: string;
}) {
  const rate = total > 0 ? (passed / total) * 100 : 0;
  const colorClass = rate >= 80 ? 'good' : rate >= 60 ? 'warning' : 'danger';

  return (
    <div className="metricsTestCard">
      <div className="metricsCardHeader">
        <h3 className="metricsCardTitle">{title}</h3>
        {tooltip && (
          <Tooltip content={<span>{tooltip}</span>}>
            <span className="metricsInfo">ℹ️</span>
          </Tooltip>
        )}
      </div>
      <p className="metricsCardValue">{total}</p>
      <div className="metricsGauge">
        <div className={`metricsGaugeFill ${colorClass}`} style={{ width: `${rate}%` }} />
      </div>
      <p className="metricsGaugeLabel">{rate.toFixed(0)}%</p>
      {/* Détails en colonne avec titres */}
      <div className="metricsCardDetails">
        <div className="metricsDetailRow">
          <span className="metricsDetailLabel">✅ Réussis</span>
          <span className="metricsDetailValue">{passed}</span>
        </div>
        <div className="metricsDetailRow">
          <span className="metricsDetailLabel">❌ Échoués</span>
          <span className="metricsDetailValue">{failed}</span>
        </div>
        <div className="metricsDetailRow">
          <span className="metricsDetailLabel">⏱️ Durée</span>
          <span className="metricsDetailValue">{(duration / 1000).toFixed(2)}s</span>
        </div>
        {files !== undefined && (
          <div className="metricsDetailRow">
            <span className="metricsDetailLabel">📁 Fichiers</span>
            <span className="metricsDetailValue">{files}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Carte de couverture avec jauge (même style que TestCard)
 */
function CoverageCard({
  title,
  value,
  tooltip,
}: {
  title: string;
  value: number;
  tooltip?: string;
}) {
  const colorClass = value >= 80 ? 'good' : value >= 60 ? 'warning' : 'danger';

  return (
    <div className="metricsCoverageCard">
      <div className="metricsCardHeader">
        <h3 className="metricsCardTitle">{title}</h3>
        {tooltip && (
          <Tooltip content={<span>{tooltip}</span>}>
            <span className="metricsInfo">ℹ️</span>
          </Tooltip>
        )}
      </div>
      <p className="metricsCardValue">{value.toFixed(1)}%</p>
      <div className="metricsGauge">
        <div className={`metricsGaugeFill ${colorClass}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

/**
 * Carte de score web (PageSpeed) avec jauge - seuils 90/50
 * Affiche "NC" si le score n'est pas disponible
 */
function WebScoreCard({
  title,
  value,
  tooltip,
}: {
  title: string;
  value: number | 'NC';
  tooltip?: string;
}) {
  const isNC = value === 'NC';
  // Seuils Lighthouse : vert ≥90, orange 50-89, rouge <50
  const colorClass = isNC ? 'nc' : (value >= 90 ? 'good' : value >= 50 ? 'warning' : 'danger');
  const displayValue = isNC ? 'NC' : `${value}%`;
  const gaugeWidth = isNC ? 0 : value;

  return (
    <div className="metricsCoverageCard">
      <div className="metricsCardHeader">
        <h3 className="metricsCardTitle">{title}</h3>
        {tooltip && (
          <Tooltip content={<span>{tooltip}</span>}>
            <span className="metricsInfo">ℹ️</span>
          </Tooltip>
        )}
      </div>
      <p className="metricsCardValue">{displayValue}</p>
      <div className="metricsGauge">
        <div className={`metricsGaugeFill ${colorClass}`} style={{ width: `${gaugeWidth}%` }} />
      </div>
    </div>
  );
}

/**
 * Composant principal - Métriques compactes
 */
export default function MetricsCompact() {
  const [data, setData] = useState<MetricsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/metrics')
      .then((res) => {
        if (!res.ok) throw new Error('Métriques non disponibles');
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="metricsCompact">
        <div className="metricsEmpty">
          <p>📊 {error}</p>
          <p>Exécutez <code>npm run metrics:collect</code> pour générer les métriques.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="metricsCompact">
        <div className="metricsLoading">Chargement des métriques...</div>
      </div>
    );
  }

  const { latest } = data;

  return (
    <div className="metricsCompact">
      {/* Layout 2 colonnes : gauche (Tests + Couverture), droite (Autres) */}
      <div className="metricsMainLayout">
        {/* Colonne gauche : Tests + Couverture */}
        <div className="metricsLeftColumn">
          {/* Bloc Tests */}
          <section className="metricsSection metricsTests">
            <h2 className="metricsSectionTitle">🧪 Tests</h2>
            <div className="metricsTestsGrid">
              <TestCard
                title="Total"
                total={latest.tests.totalTests}
                passed={latest.tests.passingTests}
                failed={latest.tests.failingTests}
                duration={latest.tests.testDuration}
                files={latest.tests.totalTestFiles}
                tooltip="Nombre total de tests exécutés"
              />
              <TestCard
                title="BDD"
                total={latest.tests.bddScenarios || 0}
                passed={latest.tests.bddScenariosPassed || latest.tests.bddScenarios || 0}
                failed={latest.tests.bddScenariosFailed || 0}
                duration={latest.tests.bddTestDuration || 0}
                files={latest.tests.bddFeatures}
                tooltip="Scénarios Gherkin (Behavior Driven Development)"
              />
              <TestCard
                title="Unitaires"
                total={latest.tests.unitTests || 0}
                passed={latest.tests.unitTestPassed || 0}
                failed={latest.tests.unitTestFailed || 0}
                duration={latest.tests.unitTestDuration || 0}
                files={latest.tests.unitTestFiles}
                tooltip="Tests unitaires Jest"
              />
              <TestCard
                title="Intégration"
                total={latest.tests.integrationTests || 0}
                passed={latest.tests.integrationTestPassed || 0}
                failed={latest.tests.integrationTestFailed || 0}
                duration={latest.tests.integrationTestDuration || 0}
                files={latest.tests.integrationTestFiles}
                tooltip="Tests d'intégration"
              />
              <TestCard
                title="E2E"
                total={latest.tests.e2eSteps || 0}
                passed={latest.tests.e2eStepsPassed || latest.tests.e2eSteps || 0}
                failed={latest.tests.e2eStepsFailed || 0}
                duration={latest.tests.e2eTests?.duration || 0}
                files={latest.tests.e2eScenarioFiles}
                tooltip="Steps Playwright end-to-end"
              />
            </div>
          </section>

          {/* Bloc Couverture - même style que Tests */}
          <section className="metricsSection metricsCoverage">
            <h2 className="metricsSectionTitle">🎯 Couverture</h2>
            <div className="metricsCoverageGrid">
              <CoverageCard
                title="Lignes"
                value={latest.coverage.lines.percentage}
                tooltip="Pourcentage de lignes de code couvertes par les tests"
              />
              <CoverageCard
                title="Statements"
                value={latest.coverage.statements.percentage}
                tooltip="Pourcentage de déclarations couvertes"
              />
              <CoverageCard
                title="Fonctions"
                value={latest.coverage.functions.percentage}
                tooltip="Pourcentage de fonctions testées"
              />
              <CoverageCard
                title="Branches"
                value={latest.coverage.branches.percentage}
                tooltip="Pourcentage de branches conditionnelles couvertes"
              />
            </div>
          </section>

          {/* Bloc Scores Web (PageSpeed) - toujours affiché si lighthouse existe */}
          {latest.lighthouse && (
            <section className="metricsSection metricsWebScores">
              <h2 className="metricsSectionTitle">🌐 Scores Web</h2>
              <div className="metricsCoverageGrid">
                <WebScoreCard
                  title="Performance"
                  value={latest.lighthouse!.performance}
                  tooltip="Score PageSpeed : vitesse de chargement et interactivité"
                />
                <WebScoreCard
                  title="Accessibilité"
                  value={latest.lighthouse!.accessibility}
                  tooltip="Conformité aux standards d'accessibilité (WCAG)"
                />
                <WebScoreCard
                  title="Bonnes pratiques"
                  value={latest.lighthouse!.bestPractices}
                  tooltip="Respect des bonnes pratiques web (sécurité, APIs)"
                />
                <WebScoreCard
                  title="SEO"
                  value={latest.lighthouse!.seo}
                  tooltip="Optimisation pour les moteurs de recherche"
                />
              </div>
            </section>
          )}
        </div>

        {/* Colonne droite : Autres indicateurs (pleine hauteur) */}
        <div className="metricsRightColumn">
          <section className="metricsSection metricsOther">
            <h2 className="metricsSectionTitle">📊 Autres indicateurs</h2>
            
            {/* Qualité (ESLint) */}
            <div className="metricsOtherCategory">
              <h3 className="metricsOtherCategoryTitle">Qualité (ESLint)</h3>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Erreurs</span>
                <span className="metricsOtherValue">
                  {latest.quality.eslintErrors === 0 ? '✅' : '❌'} {latest.quality.eslintErrors}
                </span>
              </div>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Warnings</span>
                <span className="metricsOtherValue">⚠️ {latest.quality.eslintWarnings}</span>
              </div>
            </div>

            {/* Taille */}
            <div className="metricsOtherCategory">
              <h3 className="metricsOtherCategoryTitle">Taille</h3>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Fichiers</span>
                <span className="metricsOtherValue">{latest.size.totalFiles}</span>
              </div>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Lignes</span>
                <span className="metricsOtherValue">{(latest.size.sourceLines / 1000).toFixed(1)}k</span>
              </div>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Composants</span>
                <span className="metricsOtherValue">{latest.size.components}</span>
              </div>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Pages</span>
                <span className="metricsOtherValue">{latest.size.pages}</span>
              </div>
            </div>

            {/* Dépendances */}
            <div className="metricsOtherCategory">
              <h3 className="metricsOtherCategoryTitle">Dépendances</h3>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Total</span>
                <span className="metricsOtherValue">{latest.dependencies.total}</span>
              </div>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Production</span>
                <span className="metricsOtherValue">{latest.dependencies.production}</span>
              </div>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Dev</span>
                <span className="metricsOtherValue">{latest.dependencies.development}</span>
              </div>
              {latest.dependencies.vulnerabilities.total > 0 && (
                <div className="metricsOtherItem">
                  <span className="metricsOtherLabel">Vulnérabilités</span>
                  <span className="metricsOtherValue metricsVuln">
                    ⚠️ {latest.dependencies.vulnerabilities.total}
                  </span>
                </div>
              )}
            </div>

            {/* Performance (Build) */}
            <div className="metricsOtherCategory">
              <h3 className="metricsOtherCategoryTitle">Performance</h3>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Build</span>
                <span className="metricsOtherValue">{(latest.performance.buildTime / 1000).toFixed(1)}s</span>
              </div>
              <div className="metricsOtherItem">
                <span className="metricsOtherLabel">Bundle</span>
                <span className="metricsOtherValue">{latest.performance.bundleSize}KB</span>
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
  );
}
