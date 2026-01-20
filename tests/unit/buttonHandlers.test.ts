/**
 * Tests unitaires pour buttonHandlers.ts
 * Backend pur : testable sans dépendance React/Next.js
 * 
 * APPROCHE TDD : Les tests montrent la progression du simple au complexe
 * - Test 1 : Le cas le plus simple (une commande → une route)
 * - Test 2 : Ajouter une deuxième commande
 * - Test 3 : Gérer les commandes inconnues
 * - Test 4 : Ajouter la logique de navigation interne/externe
 * - Test 5 : Ajouter les actions (internal, external, alert)
 * - Test 6 : Cas limites et combinaisons complexes
 */

import {
  getRouteForCommand,
  isInternalNavigation,
  getButtonAction,
  type ButtonAction,
} from '../../utils/buttonHandlers';
import { COMMANDS, ROUTES } from '../../constants/routes';

describe('buttonHandlers - Approche TDD (simple → complexe)', () => {
  describe('getRouteForCommand', () => {
    // ITÉRATION 1 : Le cas le plus simple - une commande mappe à une route
    it('should return route for one known command', () => {
      const route = getRouteForCommand(COMMANDS.SITEMAP);
      
      expect(route).toBe(ROUTES.SITEMAP);
    });

    // ITÉRATION 2 : Ajouter une deuxième commande
    it('should return route for multiple known commands', () => {
      expect(getRouteForCommand(COMMANDS.SITEMAP)).toBe(ROUTES.SITEMAP);
      expect(getRouteForCommand(COMMANDS.ABOUT_SITE)).toBe(ROUTES.ABOUT);
      expect(getRouteForCommand(COMMANDS.METRICS)).toBe(ROUTES.METRICS);
    });

    // ITÉRATION 3 : Gérer les commandes inconnues
    it('should return null for unknown command', () => {
      const route = getRouteForCommand('cmd-Unknown');
      
      expect(route).toBeNull();
    });

    // ITÉRATION 4 : Gérer les commandes externes (pas de route interne)
    it('should return null for external link commands', () => {
      expect(getRouteForCommand(COMMANDS.EMAIL)).toBeNull();
      expect(getRouteForCommand(COMMANDS.YOUTUBE)).toBeNull();
      expect(getRouteForCommand(COMMANDS.LINKEDIN)).toBeNull();
    });
  });

  describe('isInternalNavigation', () => {
    // ITÉRATION 1 : Le cas le plus simple - une commande interne
    it('should return true for one internal navigation command', () => {
      expect(isInternalNavigation(COMMANDS.SITEMAP)).toBe(true);
    });

    // ITÉRATION 2 : Ajouter plusieurs commandes internes
    it('should return true for all internal navigation commands', () => {
      expect(isInternalNavigation(COMMANDS.SITEMAP)).toBe(true);
      expect(isInternalNavigation(COMMANDS.ABOUT_SITE)).toBe(true);
    });

    // ITÉRATION 3 : Gérer les commandes externes
    it('should return false for external link commands', () => {
      expect(isInternalNavigation(COMMANDS.EMAIL)).toBe(false);
      expect(isInternalNavigation(COMMANDS.YOUTUBE)).toBe(false);
      expect(isInternalNavigation(COMMANDS.LINKEDIN)).toBe(false);
    });

    // ITÉRATION 4 : Gérer les commandes inconnues
    it('should return false for unknown commands', () => {
      expect(isInternalNavigation('cmd-Unknown')).toBe(false);
    });
  });

  describe('getButtonAction', () => {
    // ITÉRATION 1 : Le cas le plus simple - action interne avec une commande
    it('should return internal action for one known command', () => {
      const action = getButtonAction(COMMANDS.SITEMAP, null);

      expect(action.type).toBe('internal');
      if (action.type === 'internal') {
        expect(action.route).toBe(ROUTES.SITEMAP);
      }
    });

    // ITÉRATION 2 : Ajouter plusieurs commandes internes
    it('should return internal action for all internal commands', () => {
      const action1 = getButtonAction(COMMANDS.SITEMAP, null);
      expect(action1.type).toBe('internal');
      if (action1.type === 'internal') {
        expect(action1.route).toBe(ROUTES.SITEMAP);
      }

      const action2 = getButtonAction(COMMANDS.ABOUT_SITE, null);
      expect(action2.type).toBe('internal');
      if (action2.type === 'internal') {
        expect(action2.route).toBe(ROUTES.ABOUT);
      }
    });

    // ITÉRATION 3 : Ajouter l'action externe (avec URL)
    it('should return external action when URL is provided', () => {
      const url = 'mailto:test@example.com';
      const action = getButtonAction(COMMANDS.EMAIL, url);
      
      expect(action.type).toBe('external');
      if (action.type === 'external') {
        expect(action.url).toBe(url);
      }
    });

    // ITÉRATION 4 : Ajouter l'action alert (commande inconnue sans URL)
    it('should return alert action for unknown command without URL', () => {
      const action = getButtonAction('cmd-Unknown', null);
      
      expect(action.type).toBe('alert');
      if (action.type === 'alert') {
        expect(action.message).toBe('Commande: cmd-Unknown');
      }
    });

    // ITÉRATION 5 : Prioriser la navigation interne sur l'URL externe
    it('should prioritize internal navigation over URL', () => {
      const action = getButtonAction(COMMANDS.SITEMAP, 'https://external.com');
      
      // Internal navigation should take priority
      expect(action.type).toBe('internal');
      if (action.type === 'internal') {
        expect(action.route).toBe(ROUTES.SITEMAP);
      }
    });

    // ITÉRATION 6 : Cas limites et combinaisons complexes
    describe('Edge cases and complex combinations', () => {
      it('should return external action for external link commands with URL', () => {
        const youtubeUrl = 'https://www.youtube.com/@channel';
        const action = getButtonAction(COMMANDS.YOUTUBE, youtubeUrl);
        
        expect(action.type).toBe('external');
        if (action.type === 'external') {
          expect(action.url).toBe(youtubeUrl);
        }
      });

      it('should return external action for unknown command with URL', () => {
        const url = 'https://example.com';
        const action = getButtonAction('cmd-Unknown', url);
        
        expect(action.type).toBe('external');
        if (action.type === 'external') {
          expect(action.url).toBe(url);
        }
      });

      it('should handle empty string command', () => {
        const action = getButtonAction('', null);
        
        expect(action.type).toBe('alert');
        if (action.type === 'alert') {
          expect(action.message).toBe('Commande: ');
        }
      });

      it('should handle all command types correctly in integration', () => {
        // Test d'intégration : vérifier tous les cas possibles
        const testCases: Array<{
          command: string;
          url: string | null;
          expectedType: ButtonAction['type'];
        }> = [
          { command: COMMANDS.SITEMAP, url: null, expectedType: 'internal' },
          { command: COMMANDS.ABOUT_SITE, url: null, expectedType: 'internal' },
          { command: COMMANDS.EMAIL, url: 'mailto:test@example.com', expectedType: 'external' },
          { command: COMMANDS.YOUTUBE, url: 'https://youtube.com', expectedType: 'external' },
          { command: COMMANDS.LINKEDIN, url: 'https://linkedin.com', expectedType: 'external' },
          { command: 'cmd-Unknown', url: null, expectedType: 'alert' },
        ];

        testCases.forEach(({ command, url, expectedType }) => {
          const action = getButtonAction(command, url);
          expect(action.type).toBe(expectedType);
        });
      });
    });
  });
});
