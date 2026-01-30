/**
 * Tests unitaires pour la construction du contenu du spec E2E (liste d'étapes → contenu)
 * US-Assistant-Scenario : E1/E2 - même format et emplacement que le scénario actuel
 * TDD : RED → GREEN → REFACTOR
 */

import {
  getE2eIdsForPage,
  genererCodeTestE2eId,
  genererContenuSpecE2E,
} from '../../utils/e2eScenarioBuilder';
import type { PlanLien } from '../../utils/siteMapGenerator';
import type { E2eIdInventoryItem } from '../../utils/e2eIdInventory';

describe('e2eScenarioBuilder', () => {
  describe('getE2eIdsForPage', () => {
    it('retourne les éléments footer, header et autres dédupliqués par e2eID', () => {
      const inventory: E2eIdInventoryItem[] = [
        { e2eID: 'b13', source: 'json', file: '_footerButtons.json', type: 'bouton' },
        { e2eID: 'h1', source: 'constant', file: 'constants', type: 'link' },
        { e2eID: 'b13', source: 'json', file: '_footerButtons.json', type: 'bouton' }, // doublon
      ];
      const result = getE2eIdsForPage('/', inventory);
      expect(result).toHaveLength(2);
      const ids = result.map((r) => r.e2eID).sort();
      expect(ids).toEqual(['b13', 'h1']);
    });

    it('retourne un tableau vide si inventory est vide', () => {
      expect(getE2eIdsForPage('/', [])).toEqual([]);
    });
  });

  describe('genererCodeTestE2eId', () => {
    it('génère des lignes avec getByTestId et expect toBeVisible', () => {
      const item: E2eIdInventoryItem = {
        e2eID: 'b13',
        source: 'json',
        file: '_footerButtons.json',
        type: 'bouton',
      };
      const lignes = genererCodeTestE2eId(item, 0);
      expect(lignes.some((l) => l.includes("getByTestId('e2eid-b13')"))).toBe(true);
      expect(lignes.some((l) => l.includes('toBeVisible()'))).toBe(true);
    });

    it('ajoute le commentaire élément externe pour description email/youtube/linkedin', () => {
      const item: E2eIdInventoryItem = {
        e2eID: 'mail',
        source: 'json',
        file: 'index.json',
        type: 'link',
        description: 'email contact',
      };
      const lignes = genererCodeTestE2eId(item, 1);
      expect(lignes.some((l) => l.includes('Élément externe, vérification de présence uniquement'))).toBe(true);
    });

    it('génère toBeVisible pour type autre que link/bouton/react', () => {
      const item: E2eIdInventoryItem = {
        e2eID: 'img1',
        source: 'json',
        file: 'index.json',
        type: 'image',
      };
      const lignes = genererCodeTestE2eId(item, 0);
      expect(lignes.some((l) => l.includes('toBeVisible()'))).toBe(true);
    });
  });

  describe('genererContenuSpecE2E', () => {
    it('retourne un spec Playwright avec import et test parcours complet', () => {
      const chemin = ['/'];
      const liens: PlanLien[] = [];
      const pages = [{ url: '/', titre: 'Accueil' }];
      const inventory: E2eIdInventoryItem[] = [];
      const result = genererContenuSpecE2E(chemin, liens, pages, inventory);
      expect(result).toContain("import { test, expect } from '@playwright/test';");
      expect(result).toContain("test('parcours complet de tous les liens du site et test de tous les e2eID'");
      expect(result).toContain("await page.goto('/');");
      expect(result).toContain("await expect(page).toHaveURL('/');");
    });

    it('génère une étape de navigation pour / vers /metrics avec le lien correspondant', () => {
      const chemin = ['/', '/metrics'];
      const liens: PlanLien[] = [{ source: '/', destination: '/metrics', label: 'Metrics' }];
      const pages = [
        { url: '/', titre: 'Accueil' },
        { url: '/metrics', titre: 'Metrics' },
      ];
      const inventory: E2eIdInventoryItem[] = [];
      const result = genererContenuSpecE2E(chemin, liens, pages, inventory);
      expect(result).toContain('Étape 2: Navigation de / vers /metrics');
      expect(result).toContain("await expect(page).toHaveURL('/metrics');");
    });

    it('génère step accueil puis toHaveURL quand page courante = page précédente (même page)', () => {
      const chemin = ['/', '/'];
      const liens: PlanLien[] = [];
      const pages = [{ url: '/', titre: 'Accueil' }];
      const result = genererContenuSpecE2E(chemin, liens, pages, []);
      expect(result).toContain('Étape 2: Navigation de / vers /');
      expect(result).toContain("await expect(page).toHaveURL('/');");
    });

    it('génère navigation vers accueil (logo h1) quand destination est /', () => {
      const chemin = ['/metrics', '/'];
      const liens: PlanLien[] = [{ source: '/metrics', destination: '/', label: 'Accueil' }];
      const pages = [{ url: '/', titre: 'Accueil' }, { url: '/metrics', titre: 'Metrics' }];
      const result = genererContenuSpecE2E(chemin, liens, pages, []);
      expect(result).toContain("getByTestId('e2eid-h1')");
      expect(result).toContain("toHaveURL('/')");
    });

    it('génère navigation vers plan-du-site (b13) quand destination est /plan-du-site', () => {
      const chemin = ['/', '/plan-du-site'];
      const liens: PlanLien[] = [{ source: '/', destination: '/plan-du-site', label: 'Plan du site' }];
      const pages = [{ url: '/', titre: 'Accueil' }, { url: '/plan-du-site', titre: 'Plan' }];
      const result = genererContenuSpecE2E(chemin, liens, pages, []);
      expect(result).toContain("e2eid-b13");
      expect(result).toContain("toHaveURL('/plan-du-site')");
    });

    it('génère navigation vers /metrics via footer (b14) quand pas de lien direct', () => {
      const chemin = ['/a-propos-du-site', '/metrics'];
      const liens: PlanLien[] = [];
      const pages = [{ url: '/a-propos-du-site', titre: 'À propos' }, { url: '/metrics', titre: 'Metrics' }];
      const result = genererContenuSpecE2E(chemin, liens, pages, []);
      expect(result).toContain('e2eid-b14');
      expect(result).toContain("toHaveURL('/metrics')");
    });

    it('chemin vide avec inventory non vide utilise / comme première page', () => {
      const chemin: string[] = [];
      const inventory: E2eIdInventoryItem[] = [
        { e2eID: 'h1', source: 'constant', file: 'constants', type: 'link' },
      ];
      const result = genererContenuSpecE2E(chemin, [], [{ url: '/', titre: 'Accueil' }], inventory);
      expect(result).toContain("await page.goto('/');");
      expect(result).toContain('Test des e2eID présents sur /');
    });

    it('injecte les tests e2eID pour chaque page visitée', () => {
      const chemin = ['/'];
      const inventory: E2eIdInventoryItem[] = [
        { e2eID: 'b13', source: 'json', file: '_footerButtons.json', type: 'bouton' },
      ];
      const result = genererContenuSpecE2E(chemin, [], [{ url: '/', titre: 'Accueil' }], inventory);
      expect(result).toContain('Test des e2eID présents sur /');
      expect(result).toContain("getByTestId('e2eid-b13')");
    });

    it('lien direct présent mais non trouvé vers autre page : génère plan-du-site puis e2eID', () => {
      const chemin = ['/', '/detournement-video'];
      const liens: PlanLien[] = [{ source: '/', destination: '/detournement-video', label: 'Détournement' }];
      const pages = [{ url: '/', titre: 'Accueil' }, { url: '/detournement-video', titre: 'Détournement' }];
      const result = genererContenuSpecE2E(chemin, liens, pages, []);
      expect(result).toContain("getByRole('link', { name: /");
      expect(result).toContain("toHaveURL('/plan-du-site')");
      expect(result).toMatch(/getByTestId\('e2eid-[a-z0-9-]+'\)/);
    });

    it('lien direct présent mais lien non trouvé : génère fallback a-propos (b15)', () => {
      const chemin = ['/', '/a-propos-du-site'];
      const liens: PlanLien[] = [{ source: '/', destination: '/a-propos-du-site', label: 'À propos' }];
      const pages = [{ url: '/', titre: 'Accueil' }, { url: '/a-propos-du-site', titre: 'À propos' }];
      const result = genererContenuSpecE2E(chemin, liens, pages, []);
      expect(result).toContain('e2eid-b15');
      expect(result).toContain("toHaveURL('/a-propos-du-site')");
    });

    it('pas de lien direct : génère navigation vers a-propos via footer (b15)', () => {
      const chemin = ['/', '/a-propos-du-site'];
      const liens: PlanLien[] = [];
      const pages = [{ url: '/', titre: 'Accueil' }, { url: '/a-propos-du-site', titre: 'À propos' }];
      const result = genererContenuSpecE2E(chemin, liens, pages, []);
      expect(result).toContain('e2eid-b15');
      expect(result).toContain("toHaveURL('/a-propos-du-site')");
    });

    it('pas de lien direct : génère navigation vers plan-du-site via footer (b13)', () => {
      const chemin = ['/', '/metrics', '/plan-du-site'];
      const liens: PlanLien[] = [{ source: '/', destination: '/metrics', label: 'Metrics' }];
      const pages = [
        { url: '/', titre: 'Accueil' },
        { url: '/metrics', titre: 'Metrics' },
        { url: '/plan-du-site', titre: 'Plan' },
      ];
      const result = genererContenuSpecE2E(chemin, liens, pages, []);
      expect(result).toContain('e2eid-b13');
      expect(result).toContain("toHaveURL('/plan-du-site')");
    });

    it('pas de lien direct vers autre page : génère plan-du-site puis e2eID depuis URL', () => {
      const chemin = ['/', '/detournement-video'];
      const liens: PlanLien[] = [];
      const pages = [{ url: '/', titre: 'Accueil' }, { url: '/detournement-video', titre: 'Détournement' }];
      const result = genererContenuSpecE2E(chemin, liens, pages, []);
      expect(result).toContain("toHaveURL('/plan-du-site')");
      expect(result).toMatch(/getByTestId\('e2eid-[a-z0-9-]+'\)/);
      expect(result).toContain("toHaveURL('/detournement-video')");
    });
  });
});
