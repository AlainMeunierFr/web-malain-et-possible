/**
 * Tests unitaires pour l'assistant de construction de scénario E2E
 * US-Assistant-Scenario : listes "Liens à parcourir", "pages accessibles", "Chemin parcouru"
 * TDD : RED → GREEN → REFACTOR
 */

import {
  getPagesExclues,
  getLiensAParcourirInitial,
  getPagesAccessiblesDepuis,
  retirerLienUtilise,
  pageAccueil,
} from '../../utils/assistantScenario';
import type { PlanPage, PlanLien, PlanSite } from '../../utils/siteMapGenerator';

describe('assistantScenario', () => {
  describe('getPagesExclues', () => {
    it('retourne les URLs des pages en zone Masqué sauf /plan-du-site', () => {
      const pages: PlanPage[] = [
        { url: '/', titre: 'Home', x: 0, y: 0, zone: 'HomePage' },
        { url: '/maintenance', titre: 'Maintenance', x: null, y: null, zone: 'Masqué' },
        { url: '/plan-du-site', titre: 'Plan du site', x: null, y: null, zone: 'Masqué' },
      ];
      expect(getPagesExclues(pages)).toEqual(['/maintenance']);
    });

    it('retourne un tableau vide si aucune page Masqué (hors plan-du-site)', () => {
      const pages: PlanPage[] = [
        { url: '/', titre: 'Home', x: 0, y: 0, zone: 'HomePage' },
        { url: '/plan-du-site', titre: 'Plan', x: null, y: null, zone: 'Masqué' },
      ];
      expect(getPagesExclues(pages)).toEqual([]);
    });

    it('retourne un tableau vide si pages est vide', () => {
      expect(getPagesExclues([])).toEqual([]);
    });

    it('gère pages null ou undefined (retourne [])', () => {
      expect(getPagesExclues(null as unknown as PlanPage[])).toEqual([]);
      expect(getPagesExclues(undefined as unknown as PlanPage[])).toEqual([]);
    });
  });

  describe('getLiensAParcourirInitial', () => {
    it('retourne les liens du plan dont source et destination ne sont pas exclues', () => {
      const plan: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 0, y: 0, zone: 'HomePage' },
          { url: '/metrics', titre: 'Metrics', x: 0, y: 0, zone: 'Footer' },
          { url: '/maintenance', titre: 'Maintenance', x: null, y: null, zone: 'Masqué' },
        ],
        liens: [
          { source: '/', destination: '/metrics', label: 'Metrics' },
          { source: '/', destination: '/maintenance', label: 'Maintenance' },
        ],
      };
      const result = getLiensAParcourirInitial(plan);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ source: '/', destination: '/metrics', label: 'Metrics' });
    });

    it('retourne tous les liens si aucune page exclue', () => {
      const plan: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 0, y: 0, zone: 'HomePage' },
          { url: '/metrics', titre: 'Metrics', x: 0, y: 0, zone: 'Footer' },
        ],
        liens: [
          { source: '/', destination: '/metrics', label: 'Metrics' },
        ],
      };
      const result = getLiensAParcourirInitial(plan);
      expect(result).toHaveLength(1);
      expect(result[0].source).toBe('/');
      expect(result[0].destination).toBe('/metrics');
    });

    it('ne met qu’un seul lien par destination footer/header (Plan du site, Metrics, A propos, Home)', () => {
      const plan: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 0, y: 0, zone: 'HomePage' },
          { url: '/plan-du-site', titre: 'Plan du site', x: 0, y: 0, zone: 'Masqué' },
          { url: '/metrics', titre: 'Metrics', x: 0, y: 0, zone: 'Footer' },
        ],
        liens: [
          { source: '/', destination: '/plan-du-site', label: 'Plan du site' },
          { source: '/metrics', destination: '/plan-du-site', label: 'Plan du site' },
          { source: '/', destination: '/metrics', label: 'Metrics' },
          { source: '/plan-du-site', destination: '/metrics', label: 'Metrics' },
        ],
      };
      const result = getLiensAParcourirInitial(plan);
      expect(result.filter((l) => l.destination === '/plan-du-site')).toHaveLength(1);
      expect(result.filter((l) => l.destination === '/metrics')).toHaveLength(1);
      expect(result).toHaveLength(2);
    });
  });

  describe('getPagesAccessiblesDepuis', () => {
    it('retourne les liens dont la source est la page courante', () => {
      const liens: PlanLien[] = [
        { source: '/', destination: '/metrics', label: 'Metrics' },
        { source: '/', destination: '/a-propos-du-site', label: 'À propos' },
        { source: '/metrics', destination: '/', label: 'Accueil' },
      ];
      const result = getPagesAccessiblesDepuis('/', liens);
      expect(result).toHaveLength(2);
      expect(result.map((l) => l.destination)).toEqual(['/metrics', '/a-propos-du-site']);
    });

    it('retourne un tableau vide si aucune liaison depuis la page courante', () => {
      const liens: PlanLien[] = [
        { source: '/', destination: '/metrics', label: 'Metrics' },
      ];
      expect(getPagesAccessiblesDepuis('/metrics', liens)).toEqual([]);
    });
  });

  describe('retirerLienUtilise', () => {
    it('retire le lien (même source et destination) de la liste', () => {
      const liens: PlanLien[] = [
        { source: '/', destination: '/metrics', label: 'Metrics' },
        { source: '/', destination: '/a-propos-du-site', label: 'À propos' },
      ];
      const result = retirerLienUtilise(liens, { source: '/', destination: '/metrics', label: 'Metrics' });
      expect(result).toHaveLength(1);
      expect(result[0].destination).toBe('/a-propos-du-site');
    });

    it('retourne une copie sans modifier la liste d’origine', () => {
      const liens: PlanLien[] = [{ source: '/', destination: '/metrics', label: 'Metrics' }];
      const result = retirerLienUtilise(liens, liens[0]);
      expect(liens).toHaveLength(1);
      expect(result).toHaveLength(0);
    });
  });

  describe('pageAccueil', () => {
    it('retourne l’URL de la page d’accueil', () => {
      expect(pageAccueil()).toBe('/');
    });
  });
});
