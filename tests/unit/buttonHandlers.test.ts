/**
 * Tests unitaires pour buttonHandlers.ts
 * Backend pur : testable sans dépendance React/Next.js
 */

import {
  getRouteForCommand,
  isInternalNavigation,
  getButtonAction,
  type ButtonAction,
} from '../../utils/buttonHandlers';
import { COMMANDS, ROUTES } from '../../constants/routes';

describe('buttonHandlers', () => {
  describe('getRouteForCommand', () => {
    it('should return route for SITEMAP command', () => {
      const route = getRouteForCommand(COMMANDS.SITEMAP);
      expect(route).toBe(ROUTES.SITEMAP);
    });

    it('should return route for ABOUT_SITE command', () => {
      const route = getRouteForCommand(COMMANDS.ABOUT_SITE);
      expect(route).toBe(ROUTES.ABOUT_SITE);
    });

    it('should return null for unknown command', () => {
      const route = getRouteForCommand('cmd-Unknown');
      expect(route).toBeNull();
    });

    it('should return null for external link commands (email, youtube, linkedin)', () => {
      expect(getRouteForCommand(COMMANDS.EMAIL)).toBeNull();
      expect(getRouteForCommand(COMMANDS.YOUTUBE)).toBeNull();
      expect(getRouteForCommand(COMMANDS.LINKEDIN)).toBeNull();
    });
  });

  describe('isInternalNavigation', () => {
    it('should return true for internal navigation commands', () => {
      expect(isInternalNavigation(COMMANDS.SITEMAP)).toBe(true);
      expect(isInternalNavigation(COMMANDS.ABOUT_SITE)).toBe(true);
    });

    it('should return false for external link commands', () => {
      expect(isInternalNavigation(COMMANDS.EMAIL)).toBe(false);
      expect(isInternalNavigation(COMMANDS.YOUTUBE)).toBe(false);
      expect(isInternalNavigation(COMMANDS.LINKEDIN)).toBe(false);
    });

    it('should return false for unknown commands', () => {
      expect(isInternalNavigation('cmd-Unknown')).toBe(false);
    });
  });

  describe('getButtonAction', () => {
    it('should return internal action for SITEMAP command', () => {
      const action = getButtonAction(COMMANDS.SITEMAP, null);
      
      expect(action.type).toBe('internal');
      if (action.type === 'internal') {
        expect(action.route).toBe(ROUTES.SITEMAP);
      }
    });

    it('should return internal action for ABOUT_SITE command', () => {
      const action = getButtonAction(COMMANDS.ABOUT_SITE, null);
      
      expect(action.type).toBe('internal');
      if (action.type === 'internal') {
        expect(action.route).toBe(ROUTES.ABOUT_SITE);
      }
    });

    it('should return external action when URL is provided', () => {
      const url = 'mailto:test@example.com';
      const action = getButtonAction(COMMANDS.EMAIL, url);
      
      expect(action.type).toBe('external');
      if (action.type === 'external') {
        expect(action.url).toBe(url);
      }
    });

    it('should prioritize internal navigation over URL', () => {
      const action = getButtonAction(COMMANDS.SITEMAP, 'https://external.com');
      
      // Internal navigation should take priority
      expect(action.type).toBe('internal');
      if (action.type === 'internal') {
        expect(action.route).toBe(ROUTES.SITEMAP);
      }
    });

    it('should return external action for external link commands with URL', () => {
      const youtubeUrl = 'https://www.youtube.com/@channel';
      const action = getButtonAction(COMMANDS.YOUTUBE, youtubeUrl);
      
      expect(action.type).toBe('external');
      if (action.type === 'external') {
        expect(action.url).toBe(youtubeUrl);
      }
    });

    it('should return alert action for unknown command without URL', () => {
      const action = getButtonAction('cmd-Unknown', null);
      
      expect(action.type).toBe('alert');
      if (action.type === 'alert') {
        expect(action.message).toBe('Commande: cmd-Unknown');
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

    it('should handle all command types correctly', () => {
      // Test all known commands
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
