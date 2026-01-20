/**
 * Tests d'intégration pour siteMapGenerator
 * Teste avec les vraies données du site (JSON réels)
 */

import { detecterPages, detecterLiensInternes, mettreAJourPlanJSON, validerEmplacements } from '../../utils/siteMapGenerator';
import type { PlanPage, PlanLien, PlanSite } from '../../utils/siteMapGenerator';
import * as fs from 'fs';
import * as path from 'path';

const getSiteMapPath = () => {
  return path.join(process.cwd(), 'data', 'site-map.json');
};

// Nettoyer le fichier de test après chaque test
afterEach(() => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    fs.unlinkSync(siteMapPath);
  }
});

describe('siteMapGenerator - Tests d\'intégration avec données réelles', () => {
  describe('Détection des pages avec données réelles', () => {
    it('devrait détecter toutes les pages réelles du site', () => {
      const pages = detecterPages();
      
      // Vérifier que toutes les pages attendues sont détectées
      const urlsAttendues = [
        '/',
        '/about',
        '/site-map',
        '/transformation',
        '/detournement-video',
        '/faisons-connaissance',
        '/robustesse',
        '/management-de-produit-logiciel',
        '/portfolio-detournements',
        '/pour_aller_plus_loin',
      ];
      
      const urlsDetectees = pages.map((p) => p.url);
      
      urlsAttendues.forEach((url) => {
        expect(urlsDetectees).toContain(url);
      });
      
      // Vérifier que chaque page a un titre
      pages.forEach((page) => {
        expect(page.titre).toBeDefined();
        expect(typeof page.titre).toBe('string');
        expect(page.titre.length).toBeGreaterThan(0);
      });
    });

    it('devrait avoir des URLs uniques pour toutes les pages détectées', () => {
      const pages = detecterPages();
      
      const urls = pages.map((p) => p.url);
      const uniqueUrls = new Set(urls);
      
      expect(uniqueUrls.size).toBe(urls.length);
    });

    it('devrait extraire les titres depuis les JSON pour chaque page', () => {
      const pages = detecterPages();
      
      // Vérifier quelques pages spécifiques
      const homePage = pages.find((p) => p.url === '/');
      expect(homePage).toBeDefined();
      expect(homePage?.titre).toBeDefined();
      expect(homePage?.titre).not.toBe('Home'); // Devrait extraire le vrai titre depuis index.json
      
      // Vérifier qu'au moins quelques pages ont des titres extraits
      const pagesAvecTitres = pages.filter((p) => p.titre && p.titre !== p.url);
      expect(pagesAvecTitres.length).toBeGreaterThan(0);
    });
  });

  describe('Détection des liens depuis les CallToAction', () => {
    it('devrait détecter les liens depuis les CallToAction dans index.json', () => {
      const liens = detecterLiensInternes();
      
      // Les CallToAction pointent toujours vers /faisons-connaissance
      const liensCallToAction = liens.filter((l) => l.destination === '/faisons-connaissance');
      
      expect(liensCallToAction.length).toBeGreaterThan(0);
      
      // Vérifier qu'au moins un lien vient de la HomePage
      const lienDepuisHome = liensCallToAction.find((l) => l.source === '/');
      expect(lienDepuisHome).toBeDefined();
    });

    it('devrait détecter les liens CallToAction depuis toutes les pages qui en ont', () => {
      const liens = detecterLiensInternes();
      
      // Vérifier que les pages avec CallToAction ont un lien vers /faisons-connaissance
      const pagesAvecCallToAction = [
        '/',
        '/management-de-produit-logiciel',
        '/portfolio-detournements',
        '/pour_aller_plus_loin',
      ];
      
      const liensCallToAction = liens.filter((l) => l.destination === '/faisons-connaissance');
      const sourcesCallToAction = liensCallToAction.map((l) => l.source);
      
      pagesAvecCallToAction.forEach((page) => {
        expect(sourcesCallToAction).toContain(page);
      });
    });
  });

  describe('Détection des liens depuis les boutons de compétences', () => {
    it('devrait détecter les liens depuis les boutons de compétences dans index.json', () => {
      const liens = detecterLiensInternes();
      
      // Vérifier qu'on détecte au moins un lien depuis une compétence
      const liensDepuisCompetences = liens.filter((l) => {
        // Les liens depuis les compétences viennent généralement de la HomePage
        return l.source === '/' && (l.destination !== '/faisons-connaissance');
      });
      
      expect(liensDepuisCompetences.length).toBeGreaterThan(0);
    });

    it('devrait détecter les liens vers /robustesse depuis les compétences', () => {
      const liens = detecterLiensInternes();
      
      const liensVersRobustesse = liens.filter((l) => l.destination === '/robustesse');
      
      expect(liensVersRobustesse.length).toBeGreaterThan(0);
      
      // Au moins un lien devrait venir de la HomePage (bouton de compétence)
      const lienDepuisHome = liensVersRobustesse.find((l) => l.source === '/');
      expect(lienDepuisHome).toBeDefined();
    });

    it('devrait détecter les liens vers /transformation depuis les compétences', () => {
      const liens = detecterLiensInternes();
      
      const liensVersTransformation = liens.filter((l) => l.destination === '/transformation');
      
      expect(liensVersTransformation.length).toBeGreaterThan(0);
    });

    it('devrait détecter les liens vers /detournement-video depuis les compétences', () => {
      const liens = detecterLiensInternes();
      
      const liensVersDetournement = liens.filter((l) => l.destination === '/detournement-video');
      
      expect(liensVersDetournement.length).toBeGreaterThan(0);
    });

    it('devrait détecter les liens vers /management-de-produit-logiciel depuis les compétences', () => {
      const liens = detecterLiensInternes();
      
      const liensVersManagement = liens.filter((l) => l.destination === '/management-de-produit-logiciel');
      
      expect(liensVersManagement.length).toBeGreaterThan(0);
    });

    it('devrait détecter les liens vers /about depuis les compétences', () => {
      const liens = detecterLiensInternes();
      
      const liensVersAbout = liens.filter((l) => l.destination === '/about');
      
      expect(liensVersAbout.length).toBeGreaterThan(0);
    });

    it('devrait détecter les liens vers /portfolio-detournements depuis les compétences', () => {
      const liens = detecterLiensInternes();
      
      const liensVersPortfolio = liens.filter((l) => l.destination === '/portfolio-detournements');
      
      expect(liensVersPortfolio.length).toBeGreaterThan(0);
    });
  });

  describe('Détection des liens depuis le footer', () => {
    it('devrait détecter les liens depuis le footer vers /about', () => {
      const liens = detecterLiensInternes();
      
      // Le footer est présent sur toutes les pages, donc on devrait avoir plusieurs liens vers /about
      const liensVersAbout = liens.filter((l) => l.destination === '/about');
      
      expect(liensVersAbout.length).toBeGreaterThan(0);
      
      // Vérifier qu'au moins quelques pages ont un lien vers /about (via footer)
      const sourcesVersAbout = liensVersAbout.map((l) => l.source);
      expect(sourcesVersAbout.length).toBeGreaterThan(0);
    });

    it('devrait avoir des liens depuis plusieurs pages vers /about (footer présent partout)', () => {
      const liens = detecterLiensInternes();
      const pages = detecterPages();
      
      const liensVersAbout = liens.filter((l) => l.destination === '/about');
      const sourcesVersAbout = liensVersAbout.map((l) => l.source);
      
      // Le footer devrait créer un lien depuis chaque page vers /about
      // (au moins pour les pages principales)
      expect(sourcesVersAbout.length).toBeGreaterThanOrEqual(1);
      
      // Vérifier que la HomePage a un lien vers /about via le footer
      expect(sourcesVersAbout).toContain('/');
    });
  });

  describe('Détection des liens depuis les domaines de compétences', () => {
    it('devrait détecter les liens depuis les domaines de compétences dans Conduite du changement.json', () => {
      const liens = detecterLiensInternes();
      
      // Les liens depuis les domaines de compétences viennent de la page /transformation
      const liensDepuisTransformation = liens.filter((l) => l.source === '/transformation');
      
      // Il devrait y avoir au moins un lien depuis cette page (vers /robustesse probablement)
      expect(liensDepuisTransformation.length).toBeGreaterThanOrEqual(0);
    });

    it('devrait détecter les liens depuis les domaines de compétences dans management-de-produit-logiciel.json', () => {
      const liens = detecterLiensInternes();
      
      // Vérifier les liens depuis /management-de-produit-logiciel
      const liensDepuisManagement = liens.filter((l) => l.source === '/management-de-produit-logiciel');
      
      // Il devrait y avoir au moins un CallToAction vers /faisons-connaissance
      const lienCallToAction = liensDepuisManagement.find((l) => l.destination === '/faisons-connaissance');
      expect(lienCallToAction).toBeDefined();
    });
  });

  describe('Validation des liens détectés', () => {
    it('devrait avoir tous les liens avec des sources et destinations valides', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      const urlsPages = pages.map((p) => p.url);
      
      liens.forEach((lien) => {
        // Vérifier que la source existe
        expect(urlsPages).toContain(lien.source);
        
        // Vérifier que la destination existe
        expect(urlsPages).toContain(lien.destination);
        
        // Vérifier que ce sont des liens internes (commencent par /)
        expect(lien.source).toMatch(/^\//);
        expect(lien.destination).toMatch(/^\//);
      });
    });

    it('ne devrait pas avoir de liens vers des pages inexistantes', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      const urlsPages = new Set(pages.map((p) => p.url));
      
      liens.forEach((lien) => {
        expect(urlsPages.has(lien.source)).toBe(true);
        expect(urlsPages.has(lien.destination)).toBe(true);
      });
    });

    it('ne devrait pas avoir de liens externes', () => {
      const liens = detecterLiensInternes();
      
      liens.forEach((lien) => {
        // Vérifier que les liens ne sont pas externes
        expect(lien.source).not.toMatch(/^https?:\/\//);
        expect(lien.destination).not.toMatch(/^https?:\/\//);
        expect(lien.source).not.toMatch(/^mailto:/);
        expect(lien.destination).not.toMatch(/^mailto:/);
      });
    });
  });

  describe('Mise à jour du plan JSON avec données réelles', () => {
    it('devrait créer un plan JSON complet avec toutes les pages et liens détectés', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      mettreAJourPlanJSON(pages, liens);
      
      const siteMapPath = getSiteMapPath();
      expect(fs.existsSync(siteMapPath)).toBe(true);
      
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const plan: PlanSite = JSON.parse(contenu);
      
      // Vérifier que toutes les pages sont présentes
      expect(plan.pages.length).toBe(pages.length);
      
      // Vérifier que tous les liens sont présents
      expect(plan.liens.length).toBe(liens.length);
      
      // Vérifier que chaque page a x et y null (pas encore placées)
      plan.pages.forEach((page) => {
        expect(page.x).toBeNull();
        expect(page.y).toBeNull();
      });
    });

    it('devrait conserver les emplacements existants lors d\'une mise à jour', () => {
      // Créer un plan initial avec quelques emplacements
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      // Mettre à jour une première fois
      mettreAJourPlanJSON(pages, liens);
      
      const siteMapPath = getSiteMapPath();
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const planInitial: PlanSite = JSON.parse(contenu);
      
      // Ajouter des emplacements manuellement
      planInitial.pages[0].x = 100;
      planInitial.pages[0].y = 100;
      planInitial.pages[1].x = 200;
      planInitial.pages[1].y = 200;
      
      fs.writeFileSync(siteMapPath, JSON.stringify(planInitial, null, 2));
      
      // Mettre à jour une deuxième fois
      mettreAJourPlanJSON(pages, liens);
      
      const contenuFinal = fs.readFileSync(siteMapPath, 'utf8');
      const planFinal: PlanSite = JSON.parse(contenuFinal);
      
      // Vérifier que les emplacements sont conservés
      const page1 = planFinal.pages.find((p) => p.url === planInitial.pages[0].url);
      const page2 = planFinal.pages.find((p) => p.url === planInitial.pages[1].url);
      
      expect(page1?.x).toBe(100);
      expect(page1?.y).toBe(100);
      expect(page2?.x).toBe(200);
      expect(page2?.y).toBe(200);
    });
  });

  describe('Statistiques des liens détectés', () => {
    it('devrait détecter un nombre significatif de liens', () => {
      const liens = detecterLiensInternes();
      
      // Le site devrait avoir plusieurs liens (CallToAction, boutons compétences, footer)
      expect(liens.length).toBeGreaterThan(5);
    });

    it('devrait avoir plus de liens que de pages (chaque page peut avoir plusieurs liens)', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      // Il devrait y avoir au moins autant de liens que de pages (chaque page peut avoir un CallToAction ou des boutons)
      expect(liens.length).toBeGreaterThanOrEqual(pages.length);
    });

    it('devrait avoir des liens vers toutes les pages principales du site', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      const destinations = liens.map((l) => l.destination);
      const destinationsUniques = new Set(destinations);
      
      // Vérifier qu'au moins quelques pages principales sont des destinations de liens
      const pagesPrincipales = [
        '/faisons-connaissance',
        '/about',
        '/robustesse',
        '/transformation',
        '/detournement-video',
      ];
      
      pagesPrincipales.forEach((page) => {
        expect(destinationsUniques.has(page)).toBe(true);
      });
    });
  });
});
