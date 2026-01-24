/**
 * Tests d'intégration pour les utilitaires tooltip avec le JSON existant
 * Validation que les utilitaires fonctionnent avec les vraies données
 */

import { loadTooltipsConfig, getTooltipConfig, hasTooltipConfig, validateTooltipsConfig } from '../../utils/tooltipsConfig';

describe('Intégration Utilitaires ↔ Configuration JSON', () => {
  describe('Chargement avec le vrai fichier JSON', () => {
    it('doit charger la configuration existante sans erreur', () => {
      expect(() => loadTooltipsConfig()).not.toThrow();
    });

    it('doit valider complètement la configuration existante', () => {
      const isValid = validateTooltipsConfig();
      expect(isValid).toBe(true);
    });

    it('doit charger exactement les métriques attendues', () => {
      const config = loadTooltipsConfig();
      
      // Vérifier quelques métriques clés du fichier existant
      expect(hasTooltipConfig('cyclomaticComplexity')).toBe(true);
      expect(hasTooltipConfig('bddScenarios')).toBe(true);
      expect(hasTooltipConfig('unitTests')).toBe(true);
      
      // Vérifier qu'une métrique inexistante retourne false
      expect(hasTooltipConfig('fakeMetric')).toBe(false);
    });

    it('les configurations chargées doivent respecter le format attendu', () => {
      const cyclomaticConfig = getTooltipConfig('cyclomaticComplexity');
      
      expect(cyclomaticConfig).toBeTruthy();
      expect(cyclomaticConfig!.title).toContain('Complexité');
      expect(cyclomaticConfig!.description).toMatch(/^\*\*Terme technique\*\*/);
      expect(cyclomaticConfig!.interpretation).toHaveLength(4);
      
      // Vérifier la structure d'une interprétation
      const firstInterpretation = cyclomaticConfig!.interpretation[0];
      expect(firstInterpretation.range).toBeDefined();
      expect(firstInterpretation.level).toBeDefined();
      expect(firstInterpretation.description).toBeDefined();
    });
  });

  describe('Cohérence avec les attentes métier', () => {
    it('les descriptions doivent être pédagogiques', () => {
      const config = loadTooltipsConfig();
      
      Object.entries(config).forEach(([key, metricConfig]) => {
        // Doit expliquer le concept de manière accessible
        expect(metricConfig.description).toMatch(/mesure|indique|permet|aide|évalue|détermine/i);
        
        // Doit avoir une longueur suffisante pour être informatif
        expect(metricConfig.description.length).toBeGreaterThan(100);
      });
    });

    it('les interprétations doivent couvrir différents niveaux de qualité', () => {
      const config = loadTooltipsConfig();
      
      Object.entries(config).forEach(([key, metricConfig]) => {
        const levels = metricConfig.interpretation.map(item => item.level.toLowerCase());
        
        // Doit avoir des niveaux variés (excellent, bon, préoccupant, etc.)
        const hasVariety = levels.some(level => 
          level.toLowerCase().includes('excellent') || level.toLowerCase().includes('bon')
        ) && levels.some(level => 
          level.toLowerCase().includes('critique') || level.toLowerCase().includes('insuffisant')
        );
        
        expect(hasVariety).toBe(true);
      });
    });

    it('les plages d\'interprétation doivent être numériques cohérentes', () => {
      const cyclomaticConfig = getTooltipConfig('cyclomaticComplexity');
      
      expect(cyclomaticConfig).toBeTruthy();
      
      // Vérifier que les plages sont logiques pour la complexité cyclomatique
      const ranges = cyclomaticConfig!.interpretation.map(item => item.range);
      expect(ranges.some(range => range.includes('1') || range.includes('10'))).toBe(true);
      expect(ranges.some(range => range.includes('50') || range.includes('+'))).toBe(true);
    });
  });

  describe('Performance avec les vraies données', () => {
    it('le chargement doit être rapide même avec 19 métriques', () => {
      const startTime = Date.now();
      
      // Charger plusieurs fois pour tester le cache
      for (let i = 0; i < 10; i++) {
        loadTooltipsConfig();
      }
      
      const totalTime = Date.now() - startTime;
      expect(totalTime).toBeLessThan(50); // 50ms pour 10 chargements
    });

    it('les accès répétés doivent utiliser le cache efficacement', () => {
      const config1 = loadTooltipsConfig();
      const config2 = loadTooltipsConfig();
      const config3 = getTooltipConfig('cyclomaticComplexity');
      
      // Le cache doit retourner la même référence
      expect(config1).toBe(config2);
      expect(config3).toBeTruthy();
    });
  });

  describe('Compatibilité avec l\'existant', () => {
    it('doit être compatible avec l\'ancien format si présent', () => {
      const config = loadTooltipsConfig();
      
      // Vérifier que les clés correspondent aux attentes du système
      expect(config.cyclomaticComplexity).toBeDefined();
      
      // Si d'autres formats existaient, les tester ici
      Object.keys(config).forEach(key => {
        expect(key).toMatch(/^[a-zA-Z][a-zA-Z0-9]*$/); // PascalCase ou camelCase
      });
    });

    it('tous les mappings de métriques attendus doivent être présents', () => {
      const expectedMappings = {
        'cyclomaticComplexity': 'Complexité Cyclomatique',
        'bddScenarios': 'Scénarios BDD',
        'unitTests': 'Tests Unitaires',
        'integrationTests': 'Tests Intégration',
        'e2eSteps': 'Steps E2E',
        'eslintErrors': 'Erreurs ESLint',
        'eslintWarnings': 'Warnings ESLint',
        'typeCoverage': 'Type Coverage',
        'coverageLines': 'Couverture Lignes',
        'coverageStatements': 'Couverture Statements',
        'coverageFunctions': 'Couverture Fonctions',
        'coverageBranches': 'Couverture Branches',
        'totalFiles': 'Fichiers Total',
        'sourceLines': 'Lignes de Code',
        'components': 'Composants',
        'pages': 'Pages',
        'totalDependencies': 'Dépendances Total',
        'vulnerabilities': 'Vulnérabilités',
        'bundleSize': 'Taille Bundle',
        'buildTime': 'Temps de Build'
      };

      Object.keys(expectedMappings).forEach(key => {
        expect(hasTooltipConfig(key)).toBe(true);
      });
    });
  });
});