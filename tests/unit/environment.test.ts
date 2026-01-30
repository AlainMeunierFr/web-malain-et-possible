/**
 * Tests unitaires pour la détection d'environnement (prod / dev)
 * US-Assistant-Scenario : B1 - Le système distingue production et développement
 * TDD : RED → GREEN → REFACTOR
 */

import { isProduction, isDevelopment } from '../../utils/environment';

describe('environment', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('isProduction', () => {
    it('retourne true quand NODE_ENV vaut "production"', () => {
      process.env.NODE_ENV = 'production';
      expect(isProduction()).toBe(true);
    });

    it('retourne false quand NODE_ENV vaut "development"', () => {
      process.env.NODE_ENV = 'development';
      expect(isProduction()).toBe(false);
    });

    it('retourne false quand NODE_ENV vaut "test"', () => {
      process.env.NODE_ENV = 'test';
      expect(isProduction()).toBe(false);
    });
  });

  describe('isDevelopment', () => {
    it('retourne false quand NODE_ENV vaut "production"', () => {
      process.env.NODE_ENV = 'production';
      expect(isDevelopment()).toBe(false);
    });

    it('retourne true quand NODE_ENV vaut "development"', () => {
      process.env.NODE_ENV = 'development';
      expect(isDevelopment()).toBe(true);
    });

    it('retourne true quand NODE_ENV vaut "test" (assistant accessible comme en dev)', () => {
      process.env.NODE_ENV = 'test';
      expect(isDevelopment()).toBe(true);
    });
  });
});
