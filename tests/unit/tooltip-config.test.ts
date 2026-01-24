/**
 * Tests unitaires TDD pour la configuration des tooltips - CA1
 * Validation du fichier JSON et de l'utilitaire de chargement
 */

import { loadTooltipsConfig, getTooltipConfig, hasTooltipConfig, clearTooltipsCache } from '../../utils/tooltipsConfig';

describe('Configuration des Tooltips - CA1', () => {
  describe('Structure du fichier JSON', () => {
    it('doit charger la configuration depuis data/tooltips-metrics.json', () => {
      const config = loadTooltipsConfig();
      expect(config).toBeDefined();
      expect(typeof config).toBe('object');
    });

    it('doit contenir exactement 20 métriques configurées', () => {
      const config = loadTooltipsConfig();
      const keys = Object.keys(config);
      expect(keys).toHaveLength(20);
    });

    it('doit avoir toutes les métriques attendues', () => {
      const config = loadTooltipsConfig();
      const expectedMetrics = [
        'cyclomaticComplexity', 'bddScenarios', 'unitTests', 'integrationTests',
        'e2eSteps', 'eslintErrors', 'eslintWarnings', 'typeCoverage',
        'coverageLines', 'coverageStatements', 'coverageFunctions', 'coverageBranches',
        'totalFiles', 'sourceLines', 'components', 'pages',
        'totalDependencies', 'vulnerabilities', 'bundleSize', 'buildTime'
      ];

      expectedMetrics.forEach(metric => {
        expect(config[metric]).toBeDefined();
      });
    });

    it('chaque métrique doit avoir les champs obligatoires', () => {
      const config = loadTooltipsConfig();
      
      Object.entries(config).forEach(([key, metricConfig]) => {
        expect(metricConfig.title).toBeDefined();
        expect(typeof metricConfig.title).toBe('string');
        expect(metricConfig.title.length).toBeGreaterThan(0);

        expect(metricConfig.description).toBeDefined();
        expect(typeof metricConfig.description).toBe('string');
        expect(metricConfig.description.length).toBeGreaterThan(10);

        expect(metricConfig.interpretation).toBeDefined();
        expect(Array.isArray(metricConfig.interpretation)).toBe(true);
        expect(metricConfig.interpretation.length).toBeGreaterThan(0);
      });
    });

    it('les descriptions doivent commencer par "**Terme technique** :"', () => {
      const config = loadTooltipsConfig();
      
      Object.entries(config).forEach(([key, metricConfig]) => {
        expect(metricConfig.description).toMatch(/^\*\*Terme technique\*\* :/);
      });
    });

    it('les interprétations doivent avoir une structure cohérente', () => {
      const config = loadTooltipsConfig();
      
      Object.entries(config).forEach(([key, metricConfig]) => {
        metricConfig.interpretation.forEach((item: any) => {
          expect(typeof item).toBe('object');
          expect(item.range).toBeDefined();
          expect(item.level).toBeDefined();
          expect(item.description).toBeDefined();
        });
      });
    });
  });

  describe('Utilitaires de configuration', () => {
    it('getTooltipConfig doit retourner la config d\'une métrique existante', () => {
      const cyclomaticConfig = getTooltipConfig('cyclomaticComplexity');
      
      expect(cyclomaticConfig).toBeDefined();
      expect(cyclomaticConfig?.title).toContain('Complexité');
      expect(cyclomaticConfig?.description).toContain('**Terme technique**');
    });

    it('getTooltipConfig doit retourner null pour une métrique inexistante', () => {
      const invalidConfig = getTooltipConfig('nonExistentMetric');
      expect(invalidConfig).toBeNull();
    });

    it('hasTooltipConfig doit indiquer si une métrique a une config', () => {
      expect(hasTooltipConfig('cyclomaticComplexity')).toBe(true);
      expect(hasTooltipConfig('bddScenarios')).toBe(true);
      expect(hasTooltipConfig('nonExistentMetric')).toBe(false);
    });

    it('doit gérer les erreurs de fichier manquant gracieusement', () => {
      // Vider le cache d'abord pour forcer une nouvelle lecture
      clearTooltipsCache();
      
      // Mock fs.readFileSync pour simuler un fichier manquant
      const fs = require('fs');
      const originalReadFileSync = fs.readFileSync;
      
      fs.readFileSync = jest.fn(() => {
        throw new Error('ENOENT: no such file');
      });

      expect(() => loadTooltipsConfig()).toThrow();
      
      // Restaurer la fonction originale et vider le cache
      fs.readFileSync = originalReadFileSync;
      clearTooltipsCache();
    });
  });

  describe('Validation du contenu', () => {
    it('les titres doivent être en français et lisibles', () => {
      const config = loadTooltipsConfig();
      
      Object.entries(config).forEach(([key, metricConfig]) => {
        expect(metricConfig.title).not.toMatch(/[{}[\]]/); // Pas de syntaxe technique
        expect(metricConfig.title.length).toBeGreaterThan(5);
        expect(metricConfig.title.length).toBeLessThan(100);
      });
    });

    it('les descriptions doivent être pédagogiques et accessibles', () => {
      const config = loadTooltipsConfig();
      
      Object.entries(config).forEach(([key, metricConfig]) => {
        // Doit être descriptif et informatif
        expect(metricConfig.description).toContain('**Terme technique**');
        
        // Longueur raisonnable pour être informatif
        expect(metricConfig.description.length).toBeGreaterThan(50);
        expect(metricConfig.description.length).toBeLessThan(1000);
        
        // Pas trop technique (éviter les mots-clés de programmation exacts)
        expect(metricConfig.description).not.toMatch(/\b(function|import|export|const|let|var)\b/i);
      });
    });

    it('les niveaux d\'interprétation doivent couvrir différents seuils', () => {
      const config = loadTooltipsConfig();
      
      Object.entries(config).forEach(([key, metricConfig]) => {
        const levels = metricConfig.interpretation.map((item: any) => item.level);
        
        // Doit avoir au moins 3 niveaux différents
        const uniqueLevels = new Set(levels);
        expect(uniqueLevels.size).toBeGreaterThanOrEqual(3);
        
        // Doit contenir des niveaux variés (pas tous identiques)
        const uniqueLevelsSet = new Set(levels);
        expect(uniqueLevelsSet.size).toBeGreaterThanOrEqual(3);
        
        // Au moins un niveau doit suggérer une qualité (positif ou négatif)  
        const hasVariedLevels = levels.some((level: string) => 
          level.length > 0 && level !== 'N/A'
        );
        expect(hasVariedLevels).toBe(true);
      });
    });
  });

  describe('Performance et cache', () => {
    it('le chargement de config doit être rapide', () => {
      const startTime = Date.now();
      loadTooltipsConfig();
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(10); // Moins de 10ms
    });

    it('les appels répétés doivent utiliser le cache', () => {
      const config1 = loadTooltipsConfig();
      const config2 = loadTooltipsConfig();
      
      // Même référence d'objet = cache utilisé
      expect(config1).toBe(config2);
    });
  });
});