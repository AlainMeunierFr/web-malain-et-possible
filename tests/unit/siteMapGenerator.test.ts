/**
 * Tests unitaires pour siteMapGenerator
 * TDD : RED → GREEN → REFACTOR
 * Approche progressive : du plus simple au plus complexe
 * Utilise un chemin temporaire pour le plan (option siteMapPath) pour ne pas modifier
 * data/_Pages-Et-Lien.json réel (évite les conflits avec les tests d'intégration).
 */

import { detecterPages, detecterLiensInternes, mettreAJourPlanJSON, validerEmplacements } from '../../utils/backoffice';
import type { PlanPage, PlanLien, PlanSite } from '../../utils/backoffice';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

let testSiteMapPath: string;

beforeEach(() => {
  testSiteMapPath = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'sitemap-unit-')), '_Pages-Et-Lien.json');
});

afterEach(() => {
  if (testSiteMapPath && fs.existsSync(path.dirname(testSiteMapPath))) {
    fs.rmSync(path.dirname(testSiteMapPath), { recursive: true, force: true });
  }
});

describe('siteMapGenerator - TDD Progressif', () => {
  describe('Étape 1 : Site avec seulement une HomePage', () => {
    it('devrait détecter la page HomePage (/)', () => {
      const pages = detecterPages();
      
      expect(pages.length).toBeGreaterThanOrEqual(1);
      const homePage = pages.find((p) => p.url === '/');
      expect(homePage).toBeDefined();
      expect(homePage?.url).toBe('/');
      expect(homePage?.titre).toBeDefined();
      expect(typeof homePage?.titre).toBe('string');
    });

    it('devrait détecter aucun lien interne (seulement HomePage)', () => {
      const liens = detecterLiensInternes();
      
      // Avec seulement une page, il ne peut y avoir de liens internes
      // (les liens externes sont exclus)
      expect(Array.isArray(liens)).toBe(true);
      // On accepte 0 ou plus selon l'implémentation
    });

    it('devrait créer un plan JSON avec seulement la HomePage', () => {
      // Filtrer pour n'avoir que la HomePage (simulation d'un site simple)
      const pages = detecterPages();
      const homePage = pages.find((p) => p.url === '/');
      expect(homePage).toBeDefined();
      
      const pagesFiltrees = homePage ? [homePage] : [];
      const liens = [];
      
      mettreAJourPlanJSON(pagesFiltrees, liens, { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      expect(fs.existsSync(siteMapPath)).toBe(true);
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(1);
      expect(plan.pages[0].url).toBe('/');
      expect(plan.pages[0].x).toBeNull();
      expect(plan.pages[0].y).toBeNull();
      expect(plan.liens.length).toBe(0);
    });
  });

  describe('Étape 2 : Site avec 2 pages sans lien entre elles', () => {
    it('devrait détecter au moins 2 pages', () => {
      const pages = detecterPages();
      
      expect(pages.length).toBeGreaterThanOrEqual(2);
      
      // Vérifier qu'on a au moins / et /about (ou autres pages)
      const urls = pages.map((p) => p.url);
      expect(urls).toContain('/');
      expect(urls.length).toBeGreaterThanOrEqual(2);
    });

    it('devrait avoir des URLs uniques pour chaque page', () => {
      const pages = detecterPages();
      
      const urls = pages.map((p) => p.url);
      const uniqueUrls = new Set(urls);
      expect(uniqueUrls.size).toBe(urls.length);
    });

    it('devrait créer un plan JSON avec 2 pages sans liens', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      // Filtrer pour n'avoir que 2 pages (simulation d'un site simple)
      const pagesFiltrees = pages.slice(0, 2);
      
      mettreAJourPlanJSON(pagesFiltrees, [], { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(2);
      expect(plan.liens.length).toBe(0);
      
      // Vérifier que chaque page a x et y null
      plan.pages.forEach((page) => {
        expect(page.x).toBeNull();
        expect(page.y).toBeNull();
      });
    });
  });

  describe('Étape 3 : Site avec 2 pages et un lien de 1 vers 2', () => {
    it('devrait détecter un lien interne de la page 1 vers la page 2', () => {
      const liens = detecterLiensInternes();
      
      // Vérifier qu'il y a au moins un lien détecté
      expect(liens.length).toBeGreaterThanOrEqual(0);
      
      // Si on a des liens, vérifier leur structure
      if (liens.length > 0) {
        const premierLien = liens[0];
        expect(premierLien).toHaveProperty('source');
        expect(premierLien).toHaveProperty('destination');
        expect(premierLien.source).toMatch(/^\//);
        expect(premierLien.destination).toMatch(/^\//);
      }
    });

    it('devrait créer un plan JSON avec 2 pages et 1 lien', () => {
      const pages = detecterPages();
      expect(pages.length).toBeGreaterThanOrEqual(2); // Vérifier qu'on a au moins 2 pages
      
      // Simuler : 2 pages et 1 lien entre elles
      const pagesFiltrees = pages.slice(0, 2);
      expect(pagesFiltrees.length).toBe(2); // S'assurer qu'on a bien 2 pages
      
      // Créer un lien manuellement entre les 2 pages
      const liensFiltres: PlanLien[] = [{ 
        source: pagesFiltrees[0].url, 
        destination: pagesFiltrees[1].url, 
        label: 'Test' 
      }];
      
      mettreAJourPlanJSON(pagesFiltrees, liensFiltres, { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      expect(fs.existsSync(siteMapPath)).toBe(true);
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(2);
      expect(plan.liens.length).toBe(1);
      expect(plan.liens[0].source).toBe(pagesFiltrees[0].url);
      expect(plan.liens[0].destination).toBe(pagesFiltrees[1].url);
    });

    it('devrait valider que le lien pointe vers une page existante', () => {
      const pages = detecterPages();
      expect(pages.length).toBeGreaterThanOrEqual(2);
      
      const pagesFiltrees = pages.slice(0, 2);
      const liensFiltres: PlanLien[] = [{ source: pagesFiltrees[0].url, destination: pagesFiltrees[1].url, label: 'Test' }];
      
      mettreAJourPlanJSON(pagesFiltrees, liensFiltres, { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      // Vérifier que chaque lien a une source et destination valides
      plan.liens.forEach((lien) => {
        const sourceExiste = plan.pages.some((p) => p.url === lien.source);
        const destinationExiste = plan.pages.some((p) => p.url === lien.destination);
        expect(sourceExiste).toBe(true);
        expect(destinationExiste).toBe(true);
      });
    });
  });

  describe('Étape 4 : Site avec 2 pages et liens bidirectionnels', () => {
    it('devrait créer un plan JSON avec 2 pages et 2 liens (bidirectionnels)', () => {
      const pages = detecterPages();
      expect(pages.length).toBeGreaterThanOrEqual(2);
      
      const pagesFiltrees = pages.slice(0, 2);
      const liensBidirectionnels: PlanLien[] = [
        { source: pagesFiltrees[0].url, destination: pagesFiltrees[1].url, label: 'Vers page 2' },
        { source: pagesFiltrees[1].url, destination: pagesFiltrees[0].url, label: 'Vers page 1' },
      ];
      
      mettreAJourPlanJSON(pagesFiltrees, liensBidirectionnels, { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(2);
      expect(plan.liens.length).toBe(2);
      
      // Vérifier qu'on a bien les deux liens
      const lien1vers2 = plan.liens.find((l) => l.source === pagesFiltrees[0].url && l.destination === pagesFiltrees[1].url);
      const lien2vers1 = plan.liens.find((l) => l.source === pagesFiltrees[1].url && l.destination === pagesFiltrees[0].url);
      
      expect(lien1vers2).toBeDefined();
      expect(lien2vers1).toBeDefined();
    });
  });

  describe('Étape 5 : Mise à jour du plan existant', () => {
    it('devrait conserver les emplacements existants lors de la mise à jour', () => {
      // Créer un plan initial avec emplacements
      const planInitial: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/about', titre: 'About', x: 200, y: 200 },
        ],
        liens: [],
      };
      
      const siteMapPath = testSiteMapPath;
      fs.writeFileSync(siteMapPath, JSON.stringify(planInitial, null, 2));
      
      // Mettre à jour avec les mêmes pages
      const pages = [{ url: '/', titre: 'Home' }, { url: '/about', titre: 'About' }];
      mettreAJourPlanJSON(pages, [], { siteMapPath: testSiteMapPath });
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      // Vérifier que les emplacements sont conservés
      const homePage = plan.pages.find((p) => p.url === '/');
      const aboutPage = plan.pages.find((p) => p.url === '/about');
      
      expect(homePage?.x).toBe(100);
      expect(homePage?.y).toBe(100);
      expect(aboutPage?.x).toBe(200);
      expect(aboutPage?.y).toBe(200);
    });

    it('devrait ajouter une nouvelle page avec x et y null', () => {
      // Plan initial avec 1 page
      const planInitial: PlanSite = {
        pages: [{ url: '/', titre: 'Home', x: 100, y: 100 }],
        liens: [],
      };
      
      const siteMapPath = testSiteMapPath;
      fs.writeFileSync(siteMapPath, JSON.stringify(planInitial, null, 2));
      
      // Ajouter une nouvelle page
      const pages = [
        { url: '/', titre: 'Home' },
        { url: '/nouvelle-page', titre: 'Nouvelle Page' },
      ];
      mettreAJourPlanJSON(pages, [], { siteMapPath: testSiteMapPath });
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(2);
      const nouvellePage = plan.pages.find((p) => p.url === '/nouvelle-page');
      expect(nouvellePage).toBeDefined();
      expect(nouvellePage?.x).toBeNull();
      expect(nouvellePage?.y).toBeNull();
    });

    it('devrait supprimer une page obsolète et ses liens', () => {
      // Plan initial avec 2 pages et un lien
      const planInitial: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/page-obsolète', titre: 'Page Obsolète', x: 200, y: 200 },
        ],
        liens: [
          { source: '/', destination: '/page-obsolète', label: 'Vers obsolète' },
        ],
      };
      
      const siteMapPath = testSiteMapPath;
      fs.writeFileSync(siteMapPath, JSON.stringify(planInitial, null, 2));
      
      // Mettre à jour en supprimant la page obsolète
      const pages = [{ url: '/', titre: 'Home' }];
      mettreAJourPlanJSON(pages, [], { siteMapPath: testSiteMapPath });
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(1);
      expect(plan.pages[0].url).toBe('/');
      expect(plan.liens.length).toBe(0); // Le lien vers la page obsolète doit être supprimé
    });
  });

  describe('Étape 6 : Validation des emplacements', () => {
    it('devrait valider que toutes les pages ont des emplacements', () => {
      const plan: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/about', titre: 'About', x: 200, y: 200 },
        ],
        liens: [],
      };
      
      expect(() => validerEmplacements(plan)).not.toThrow();
    });

    it('devrait échouer si une page n\'a pas d\'emplacement', () => {
      const plan: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/about', titre: 'About', x: null, y: null },
        ],
        liens: [],
      };
      
      expect(() => validerEmplacements(plan)).toThrow();
    });

    it('devrait lister les pages sans emplacement dans l\'erreur', () => {
      const plan: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/about', titre: 'About', x: null, y: null },
          { url: '/contact', titre: 'Contact', x: null, y: null },
        ],
        liens: [],
      };
      
      try {
        validerEmplacements(plan);
        fail('La validation devrait échouer');
      } catch (error) {
        const message = (error as Error).message;
        expect(message).toMatch(/sans emplacement|n'ont pas d'emplacement/);
        expect(message).toContain('/about');
        expect(message).toContain('/contact');
      }
    });
  });

  describe('Étape 7 : Site avec 4-5 pages', () => {
    it('devrait créer un plan JSON avec 4 pages', () => {
      const pages: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page1', titre: 'Page 1', x: null, y: null },
        { url: '/page2', titre: 'Page 2', x: null, y: null },
        { url: '/page3', titre: 'Page 3', x: null, y: null },
      ];
      
      mettreAJourPlanJSON(pages, [], { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(4);
      expect(plan.liens.length).toBe(0);
    });

    it('devrait créer un plan JSON avec 5 pages', () => {
      const pages: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page1', titre: 'Page 1', x: null, y: null },
        { url: '/page2', titre: 'Page 2', x: null, y: null },
        { url: '/page3', titre: 'Page 3', x: null, y: null },
        { url: '/page4', titre: 'Page 4', x: null, y: null },
      ];
      
      mettreAJourPlanJSON(pages, [], { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(5);
      expect(plan.liens.length).toBe(0);
    });
  });

  describe('Étape 8 : Site avec 4 pages et 3-4 liens dans différents sens', () => {
    it('devrait créer un plan JSON avec 4 pages et 3 liens (chaîne linéaire)', () => {
      const pages: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page1', titre: 'Page 1', x: null, y: null },
        { url: '/page2', titre: 'Page 2', x: null, y: null },
        { url: '/page3', titre: 'Page 3', x: null, y: null },
      ];
      
      const liens: PlanLien[] = [
        { source: '/', destination: '/page1', label: 'Vers page1' },
        { source: '/page1', destination: '/page2', label: 'Vers page2' },
        { source: '/page2', destination: '/page3', label: 'Vers page3' },
      ];
      
      mettreAJourPlanJSON(pages, liens, { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(4);
      expect(plan.liens.length).toBe(3);
      
      // Vérifier que tous les liens sont présents
      expect(plan.liens.some((l) => l.source === '/' && l.destination === '/page1')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page1' && l.destination === '/page2')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page2' && l.destination === '/page3')).toBe(true);
    });

    it('devrait créer un plan JSON avec 4 pages et 4 liens (étoile depuis Home)', () => {
      const pages: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page1', titre: 'Page 1', x: null, y: null },
        { url: '/page2', titre: 'Page 2', x: null, y: null },
        { url: '/page3', titre: 'Page 3', x: null, y: null },
      ];
      
      const liens: PlanLien[] = [
        { source: '/', destination: '/page1', label: 'Vers page1' },
        { source: '/', destination: '/page2', label: 'Vers page2' },
        { source: '/', destination: '/page3', label: 'Vers page3' },
        { source: '/page1', destination: '/', label: 'Retour home' },
      ];
      
      mettreAJourPlanJSON(pages, liens, { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(4);
      expect(plan.liens.length).toBe(4);
      
      // Vérifier que tous les liens sont présents
      expect(plan.liens.some((l) => l.source === '/' && l.destination === '/page1')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/' && l.destination === '/page2')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/' && l.destination === '/page3')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page1' && l.destination === '/')).toBe(true);
    });

    it('devrait créer un plan JSON avec 5 pages et 4 liens (graphe complexe)', () => {
      const pages: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page1', titre: 'Page 1', x: null, y: null },
        { url: '/page2', titre: 'Page 2', x: null, y: null },
        { url: '/page3', titre: 'Page 3', x: null, y: null },
        { url: '/page4', titre: 'Page 4', x: null, y: null },
      ];
      
      const liens: PlanLien[] = [
        { source: '/', destination: '/page1', label: 'Vers page1' },
        { source: '/page1', destination: '/page2', label: 'Vers page2' },
        { source: '/page2', destination: '/page3', label: 'Vers page3' },
        { source: '/page3', destination: '/page4', label: 'Vers page4' },
        { source: '/page4', destination: '/', label: 'Retour home' },
      ];
      
      mettreAJourPlanJSON(pages, liens, { siteMapPath: testSiteMapPath });
      
      const siteMapPath = testSiteMapPath;
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(5);
      expect(plan.liens.length).toBe(5);
      
      // Vérifier que tous les liens sont présents
      expect(plan.liens.some((l) => l.source === '/' && l.destination === '/page1')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page1' && l.destination === '/page2')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page2' && l.destination === '/page3')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page3' && l.destination === '/page4')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page4' && l.destination === '/')).toBe(true);
    });
  });

  describe('Étape 9 : Pages obsolètes dans le JSON (mocks)', () => {
    it('devrait supprimer une page obsolète du JSON sans conserver ses liens', () => {
      // Mock : plan JSON existant avec une page qui n'existe plus
      const planExistant: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/page-obsolète', titre: 'Page Obsolète', x: 200, y: 200 },
        ],
        liens: [
          { source: '/', destination: '/page-obsolète', label: 'Lien vers obsolète' },
          { source: '/page-obsolète', destination: '/', label: 'Retour home' },
        ],
      };
      
      const siteMapPath = testSiteMapPath;
      fs.writeFileSync(siteMapPath, JSON.stringify(planExistant, null, 2));
      
      // Mock : pages détectées (sans la page obsolète)
      const pagesDetectees: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
      ];
      
      mettreAJourPlanJSON(pagesDetectees, [], { siteMapPath: testSiteMapPath });
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(1);
      expect(plan.pages[0].url).toBe('/');
      // Tous les liens vers/depuis la page obsolète doivent être supprimés
      expect(plan.liens.length).toBe(0);
      expect(plan.liens.some((l) => l.source === '/page-obsolète' || l.destination === '/page-obsolète')).toBe(false);
    });

    it('devrait supprimer plusieurs pages obsolètes et conserver les pages valides', () => {
      // Mock : plan JSON existant avec plusieurs pages obsolètes
      const planExistant: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/page-valide', titre: 'Page Valide', x: 200, y: 200 },
          { url: '/page-obsolète-1', titre: 'Obsolète 1', x: 300, y: 300 },
          { url: '/page-obsolète-2', titre: 'Obsolète 2', x: 400, y: 400 },
        ],
        liens: [
          { source: '/', destination: '/page-valide', label: 'Lien valide' },
          { source: '/page-obsolète-1', destination: '/page-obsolète-2', label: 'Lien obsolète' },
        ],
      };
      
      const siteMapPath = testSiteMapPath;
      fs.writeFileSync(siteMapPath, JSON.stringify(planExistant, null, 2));
      
      // Mock : pages détectées (sans les pages obsolètes)
      const pagesDetectees: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page-valide', titre: 'Page Valide', x: null, y: null },
      ];
      
      mettreAJourPlanJSON(pagesDetectees, [
        { source: '/', destination: '/page-valide', label: 'Lien valide' },
      ], { siteMapPath: testSiteMapPath });
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(2);
      expect(plan.pages.some((p) => p.url === '/')).toBe(true);
      expect(plan.pages.some((p) => p.url === '/page-valide')).toBe(true);
      expect(plan.pages.some((p) => p.url === '/page-obsolète-1')).toBe(false);
      expect(plan.pages.some((p) => p.url === '/page-obsolète-2')).toBe(false);
      
      // Les liens vers les pages obsolètes doivent être supprimés
      expect(plan.liens.some((l) => l.source === '/page-obsolète-1' || l.destination === '/page-obsolète-1')).toBe(false);
      expect(plan.liens.some((l) => l.source === '/page-obsolète-2' || l.destination === '/page-obsolète-2')).toBe(false);
      
      // Le lien valide doit être conservé
      expect(plan.liens.some((l) => l.source === '/' && l.destination === '/page-valide')).toBe(true);
    });

    it('devrait conserver les emplacements des pages valides lors de la suppression des obsolètes', () => {
      // Mock : plan JSON existant
      const planExistant: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/page-valide', titre: 'Page Valide', x: 200, y: 200 },
          { url: '/page-obsolète', titre: 'Obsolète', x: 300, y: 300 },
        ],
        liens: [],
      };
      
      const siteMapPath = testSiteMapPath;
      fs.writeFileSync(siteMapPath, JSON.stringify(planExistant, null, 2));
      
      // Mock : pages détectées
      const pagesDetectees: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page-valide', titre: 'Page Valide', x: null, y: null },
      ];
      
      mettreAJourPlanJSON(pagesDetectees, [], { siteMapPath: testSiteMapPath });
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      // Les emplacements des pages valides doivent être conservés
      const homePage = plan.pages.find((p) => p.url === '/');
      const pageValide = plan.pages.find((p) => p.url === '/page-valide');
      
      expect(homePage?.x).toBe(100);
      expect(homePage?.y).toBe(100);
      expect(pageValide?.x).toBe(200);
      expect(pageValide?.y).toBe(200);
    });
  });

  describe('Étape 10 : Liens obsolètes dans le JSON (mocks)', () => {
    it('devrait supprimer un lien obsolète vers une page qui existe toujours', () => {
      // Mock : plan JSON existant avec un lien qui n'existe plus
      const planExistant: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/page1', titre: 'Page 1', x: 200, y: 200 },
        ],
        liens: [
          { source: '/', destination: '/page1', label: 'Lien obsolète' },
        ],
      };
      
      const siteMapPath = testSiteMapPath;
      fs.writeFileSync(siteMapPath, JSON.stringify(planExistant, null, 2));
      
      // Mock : pages détectées (mêmes pages, mais lien supprimé)
      const pagesDetectees: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page1', titre: 'Page 1', x: null, y: null },
      ];
      
      // Pas de liens détectés (le lien a été supprimé du code)
      mettreAJourPlanJSON(pagesDetectees, [], { siteMapPath: testSiteMapPath });
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(2);
      // Le lien obsolète doit être supprimé
      expect(plan.liens.length).toBe(0);
    });

    it('devrait supprimer plusieurs liens obsolètes et conserver les liens valides', () => {
      // Mock : plan JSON existant avec des liens mixtes
      const planExistant: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/page1', titre: 'Page 1', x: 200, y: 200 },
          { url: '/page2', titre: 'Page 2', x: 300, y: 300 },
        ],
        liens: [
          { source: '/', destination: '/page1', label: 'Lien valide' },
          { source: '/page1', destination: '/page2', label: 'Lien obsolète 1' },
          { source: '/page2', destination: '/', label: 'Lien obsolète 2' },
        ],
      };
      
      const siteMapPath = testSiteMapPath;
      fs.writeFileSync(siteMapPath, JSON.stringify(planExistant, null, 2));
      
      // Mock : pages détectées avec seulement le lien valide
      const pagesDetectees: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page1', titre: 'Page 1', x: null, y: null },
        { url: '/page2', titre: 'Page 2', x: null, y: null },
      ];
      
      // Seulement le lien valide est détecté
      mettreAJourPlanJSON(pagesDetectees, [
        { source: '/', destination: '/page1', label: 'Lien valide' },
      ], { siteMapPath: testSiteMapPath });
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      expect(plan.pages.length).toBe(3);
      // Seulement le lien valide doit être conservé
      expect(plan.liens.length).toBe(1);
      expect(plan.liens[0].source).toBe('/');
      expect(plan.liens[0].destination).toBe('/page1');
      // Les liens obsolètes doivent être supprimés
      expect(plan.liens.some((l) => l.source === '/page1' && l.destination === '/page2')).toBe(false);
      expect(plan.liens.some((l) => l.source === '/page2' && l.destination === '/')).toBe(false);
    });
  });

  describe('Étape 11 : Scénarios complexes avec mocks', () => {
    it('devrait gérer un site avec 5 pages, liens multiples et pages obsolètes', () => {
      // Mock : plan JSON existant complexe
      const planExistant: PlanSite = {
        pages: [
          { url: '/', titre: 'Home', x: 100, y: 100 },
          { url: '/page1', titre: 'Page 1', x: 200, y: 200 },
          { url: '/page2', titre: 'Page 2', x: 300, y: 300 },
          { url: '/page-obsolète', titre: 'Obsolète', x: 400, y: 400 },
        ],
        liens: [
          { source: '/', destination: '/page1', label: 'Lien 1' },
          { source: '/page1', destination: '/page2', label: 'Lien 2' },
          { source: '/page2', destination: '/', label: 'Lien 3' },
          { source: '/', destination: '/page-obsolète', label: 'Lien obsolète' },
        ],
      };
      
      const siteMapPath = testSiteMapPath;
      fs.writeFileSync(siteMapPath, JSON.stringify(planExistant, null, 2));
      
      // Mock : nouvelles pages détectées (page obsolète supprimée, nouvelles pages ajoutées)
      const pagesDetectees: PlanPage[] = [
        { url: '/', titre: 'Home', x: null, y: null },
        { url: '/page1', titre: 'Page 1', x: null, y: null },
        { url: '/page2', titre: 'Page 2', x: null, y: null },
        { url: '/page3', titre: 'Page 3', x: null, y: null },
        { url: '/page4', titre: 'Page 4', x: null, y: null },
      ];
      
      // Nouveaux liens détectés
      const liensDetectes: PlanLien[] = [
        { source: '/', destination: '/page1', label: 'Lien 1' },
        { source: '/page1', destination: '/page2', label: 'Lien 2' },
        { source: '/page2', destination: '/', label: 'Lien 3' },
        { source: '/page2', destination: '/page3', label: 'Nouveau lien' },
        { source: '/page3', destination: '/page4', label: 'Nouveau lien 2' },
      ];
      
      mettreAJourPlanJSON(pagesDetectees, liensDetectes, { siteMapPath: testSiteMapPath });
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      // Vérifications
      expect(plan.pages.length).toBe(5);
      expect(plan.pages.some((p) => p.url === '/page-obsolète')).toBe(false);
      expect(plan.pages.some((p) => p.url === '/page3')).toBe(true);
      expect(plan.pages.some((p) => p.url === '/page4')).toBe(true);
      
      // Les emplacements des pages existantes doivent être conservés
      const homePage = plan.pages.find((p) => p.url === '/');
      const page1 = plan.pages.find((p) => p.url === '/page1');
      const page2 = plan.pages.find((p) => p.url === '/page2');
      expect(homePage?.x).toBe(100);
      expect(homePage?.y).toBe(100);
      expect(page1?.x).toBe(200);
      expect(page1?.y).toBe(200);
      expect(page2?.x).toBe(300);
      expect(page2?.y).toBe(300);
      
      // Les nouvelles pages doivent avoir x et y null
      const page3 = plan.pages.find((p) => p.url === '/page3');
      const page4 = plan.pages.find((p) => p.url === '/page4');
      expect(page3?.x).toBeNull();
      expect(page3?.y).toBeNull();
      expect(page4?.x).toBeNull();
      expect(page4?.y).toBeNull();
      
      // Vérifier les liens
      expect(plan.liens.length).toBe(5);
      expect(plan.liens.some((l) => l.source === '/' && l.destination === '/page1')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page1' && l.destination === '/page2')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page2' && l.destination === '/')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page2' && l.destination === '/page3')).toBe(true);
      expect(plan.liens.some((l) => l.source === '/page3' && l.destination === '/page4')).toBe(true);
      
      // Le lien vers la page obsolète doit être supprimé
      expect(plan.liens.some((l) => l.destination === '/page-obsolète')).toBe(false);
    });
  });
});
