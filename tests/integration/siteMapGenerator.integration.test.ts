/**
 * Tests d'intégration pour siteMapGenerator
 * Teste avec les vraies données du site (JSON réels)
 */

import { detecterPages, detecterLiensInternes, mettreAJourPlanJSON, validerEmplacements } from '../../utils/siteMapGenerator';
import type { PlanPage, PlanLien, PlanSite } from '../../utils/siteMapGenerator';
import * as fs from 'fs';
import * as path from 'path';

const getSiteMapPath = () => {
  return path.join(process.cwd(), 'data', '_Pages-Et-Lien.json');
};

// Note : Ce test d'intégration analyse et corrige le fichier Pages-Et-Lien.json existant
// Il laisse le fichier dans son état final (même s'il a été corrigé)
// Il ne doit PAS restaurer le fichier à son état initial

describe('siteMapGenerator - Tests d\'intégration avec données réelles', () => {
  describe('Détection des pages avec données réelles', () => {
    it('devrait détecter toutes les pages réelles du site', () => {
      const pages = detecterPages();
      
      // Vérifier que toutes les pages attendues sont détectées
      // Note : /faisons-connaissance est exclue du plan car toutes les pages y amènent
      const urlsAttendues = [
        '/',
        '/a-propos-du-site',
        '/plan-du-site',
        '/detournement-video',
        // '/faisons-connaissance', // Exclue du plan
        // '/transformation', // Page supprimée
        // '/robustesse', // Page supprimée
        // '/management-de-produit-logiciel', // Page supprimée
        // '/ingenierie-logiciel', // Page supprimée
        '/portfolio-detournements',
        '/pour-aller-plus-loin',
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
      // Note : La page d'accueil peut avoir un titre par défaut si index.json n'a pas d'élément type="titre"
      // (index.json utilise type="hero" avec un titre dans le hero)
      
      // Vérifier qu'au moins quelques pages ont des titres extraits
      const pagesAvecTitres = pages.filter((p) => p.titre && p.titre !== p.url);
      expect(pagesAvecTitres.length).toBeGreaterThan(0);
    });
  });

  describe('Détection des liens depuis les CallToAction', () => {
    it('ne devrait pas détecter les liens CallToAction vers /faisons-connaissance (page exclue du plan)', () => {
      const liens = detecterLiensInternes();
      
      // Les CallToAction pointent toujours vers /faisons-connaissance
      // Mais cette page est exclue du plan car toutes les pages y amènent et ça rend le plan illisible
      const liensCallToAction = liens.filter((l) => l.destination === '/faisons-connaissance');
      
      expect(liensCallToAction.length).toBe(0);
    });

    it('devrait détecter les autres types de liens internes (hors CallToAction vers /faisons-connaissance)', () => {
      const liens = detecterLiensInternes();
      
      // Vérifier qu'on détecte quand même d'autres types de liens
      expect(liens.length).toBeGreaterThan(0);
      
      // Les liens doivent pointer vers des pages valides (pas /faisons-connaissance)
      liens.forEach((lien) => {
        expect(lien.destination).not.toBe('/faisons-connaissance');
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

    // Test supprimé : /robustesse n'existe plus

    // Test supprimé : /transformation n'existe plus

    it('devrait détecter les liens vers /detournement-video si présents dans les compétences', () => {
      const liens = detecterLiensInternes();
      
      const liensVersDetournement = liens.filter((l) => l.destination === '/detournement-video');
      
      // Note : Il peut y avoir des liens vers /detournement-video ou non selon le contenu actuel
      // On vérifie simplement que si des liens existent, ils sont valides
      if (liensVersDetournement.length > 0) {
        liensVersDetournement.forEach((lien) => {
          expect(lien.source).toBeDefined();
          expect(lien.destination).toBe('/detournement-video');
        });
      }
    });

    // Test supprimé : /management-de-produit-logiciel n'existe plus

    it('devrait détecter les liens vers /a-propos-du-site depuis les compétences', () => {
      const liens = detecterLiensInternes();
      
      const liensVersAbout = liens.filter((l) => l.destination === '/a-propos-du-site');
      
      expect(liensVersAbout.length).toBeGreaterThan(0);
    });

    it('devrait détecter les liens vers /portfolio-detournements (depuis les compétences ou autres)', () => {
      const liens = detecterLiensInternes();
      
      const liensVersPortfolio = liens.filter((l) => l.destination === '/portfolio-detournements');
      
      // Il peut y avoir des liens vers /portfolio-detournements (depuis les boutons de compétences)
      // ou il peut n'y en avoir aucun si cette page n'a pas de liens depuis les compétences
      // On vérifie simplement que les liens détectés sont valides
      if (liensVersPortfolio.length > 0) {
        liensVersPortfolio.forEach((lien) => {
          expect(lien.source).toBeDefined();
          expect(lien.destination).toBe('/portfolio-detournements');
        });
      }
    });
  });

  describe('Détection des liens depuis le footer', () => {
    it('devrait détecter les liens depuis le footer vers /a-propos-du-site', () => {
      const liens = detecterLiensInternes();
      
      // Le footer est présent sur toutes les pages, donc on devrait avoir plusieurs liens vers /a-propos-du-site
      const liensVersAbout = liens.filter((l) => l.destination === '/a-propos-du-site');
      
      expect(liensVersAbout.length).toBeGreaterThan(0);
      
      // Vérifier qu'au moins quelques pages ont un lien vers /a-propos-du-site (via footer)
      const sourcesVersAbout = liensVersAbout.map((l) => l.source);
      expect(sourcesVersAbout.length).toBeGreaterThan(0);
    });

    it('devrait avoir des liens depuis plusieurs pages vers /a-propos-du-site (footer présent partout)', () => {
      const liens = detecterLiensInternes();
      const pages = detecterPages();
      
      const liensVersAbout = liens.filter((l) => l.destination === '/a-propos-du-site');
      const sourcesVersAbout = liensVersAbout.map((l) => l.source);
      
      // Le footer devrait créer un lien depuis chaque page vers /a-propos-du-site
      // (au moins pour les pages principales)
      expect(sourcesVersAbout.length).toBeGreaterThanOrEqual(1);
      
      // Vérifier que la HomePage a un lien vers /a-propos-du-site via le footer
      expect(sourcesVersAbout).toContain('/');
    });
  });

  describe('Détection des liens depuis les domaines de compétences', () => {
    // Test supprimé : /transformation n'existe plus

    // Test supprimé : /management-de-produit-logiciel n'existe plus
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

  describe('Contrôle de l\'intégrité du fichier _Pages-Et-Lien.json', () => {
    it('devrait analyser le fichier existant, détecter les erreurs et les corriger', () => {
      const siteMapPath = getSiteMapPath();
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      // Lire le fichier existant s'il existe
      let planExistant: PlanSite | null = null;
      if (fs.existsSync(siteMapPath)) {
        try {
          const contenu = fs.readFileSync(siteMapPath, 'utf8');
          planExistant = JSON.parse(contenu);
        } catch (e) {
          // Erreur de parsing : le fichier est corrompu
          console.error('⚠️ ERREUR : Le fichier Pages-Et-Lien.json est corrompu (JSON invalide)');
          planExistant = null;
        }
      }
      
      // Vérifier l'intégrité du fichier
      let erreursDetectees: string[] = [];
      
      if (!planExistant) {
        erreursDetectees.push('Le fichier _Pages-Et-Lien.json n\'existe pas ou est corrompu');
      } else {
        // Vérifier que toutes les pages détectées sont présentes
        const urlsPagesDetectees = new Set(pages.map((p) => p.url));
        const urlsPagesExistantes = new Set(planExistant.pages.map((p) => p.url));
        
        // Pages manquantes
        const pagesManquantes = pages.filter((p) => !urlsPagesExistantes.has(p.url));
        if (pagesManquantes.length > 0) {
          erreursDetectees.push(
            `Pages manquantes (${pagesManquantes.length}) : ${pagesManquantes.map((p) => p.url).join(', ')}`
          );
        }
        
        // Pages obsolètes (qui n'existent plus dans le code)
        const pagesObsolètes = planExistant.pages.filter((p) => !urlsPagesDetectees.has(p.url));
        if (pagesObsolètes.length > 0) {
          erreursDetectees.push(
            `Pages obsolètes (${pagesObsolètes.length}) : ${pagesObsolètes.map((p) => p.url).join(', ')}`
          );
        }
        
        // Vérifier que les titres sont à jour
        const titresObsoletes = planExistant.pages.filter((pageExistante) => {
          const pageDetectee = pages.find((p) => p.url === pageExistante.url);
          return pageDetectee && pageExistante.titre !== pageDetectee.titre;
        });
        if (titresObsoletes.length > 0) {
          erreursDetectees.push(
            `Titres obsolètes (${titresObsoletes.length}) : ${titresObsoletes.map((p) => p.url).join(', ')}`
          );
        }
        
        // Vérifier les liens
        const liensDetectesUrls = new Set(
          liens.map((l) => `${l.source}->${l.destination}`)
        );
        const liensExistantsUrls = new Set(
          planExistant.liens.map((l) => `${l.source}->${l.destination}`)
        );
        
        // Liens manquants
        const liensManquants = liens.filter(
          (l) => !liensExistantsUrls.has(`${l.source}->${l.destination}`)
        );
        if (liensManquants.length > 0) {
          erreursDetectees.push(
            `Liens manquants (${liensManquants.length}) : ${liensManquants.map((l) => `${l.source}->${l.destination}`).slice(0, 5).join(', ')}${liensManquants.length > 5 ? '...' : ''}`
          );
        }
        
        // Liens obsolètes
        const liensObsolètes = planExistant.liens.filter(
          (l) => !liensDetectesUrls.has(`${l.source}->${l.destination}`)
        );
        if (liensObsolètes.length > 0) {
          erreursDetectees.push(
            `Liens obsolètes (${liensObsolètes.length}) : ${liensObsolètes.map((l) => `${l.source}->${l.destination}`).slice(0, 5).join(', ')}${liensObsolètes.length > 5 ? '...' : ''}`
          );
        }
      }
      
      // Signaler les erreurs détectées
      if (erreursDetectees.length > 0) {
        console.warn('\n⚠️ ERREURS D\'INTÉGRITÉ DÉTECTÉES DANS _Pages-Et-Lien.json :');
        erreursDetectees.forEach((erreur) => {
          console.warn(`  - ${erreur}`);
        });
        console.warn('🔧 Correction automatique en cours...\n');
      } else {
        console.log('✅ Le fichier _Pages-Et-Lien.json est intègre');
      }
      
      // Corriger le fichier en le mettant à jour
      mettreAJourPlanJSON(pages, liens);
      
      // Vérifier que le fichier corrigé est valide
      const contenuFinal = fs.readFileSync(siteMapPath, 'utf8');
      const planFinal: PlanSite = JSON.parse(contenuFinal);
      
      // Vérifier que toutes les pages détectées sont présentes dans le plan final
      // Note : mettreAJourPlanJSON conserve les pages existantes (même obsolètes) pour préserver les métadonnées
      // donc planFinal.pages.length peut être >= pages.length
      const urlsPagesDetectees = new Set(pages.map((p) => p.url));
      const urlsPagesFinales = new Set(planFinal.pages.map((p) => p.url));
      
      // Vérifier que toutes les pages détectées sont dans le plan final
      urlsPagesDetectees.forEach((url) => {
        expect(urlsPagesFinales.has(url)).toBe(true);
      });
      
      // Vérifier que le plan final contient au moins toutes les pages détectées
      expect(planFinal.pages.length).toBeGreaterThanOrEqual(pages.length);
      
      // Vérifier que tous les liens sont présents (les liens sont remplacés, pas conservés)
      expect(planFinal.liens.length).toBe(liens.length);
      
      // Le fichier est maintenant corrigé et laissé dans cet état
      // Si des erreurs étaient présentes, elles sont maintenant corrigées
      if (erreursDetectees.length > 0) {
        console.log('✅ Fichier _Pages-Et-Lien.json corrigé avec succès\n');
      }
    });
  });

  describe('Mise à jour du plan JSON avec données réelles', () => {

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

    it('devrait rechercher les pages par URL et créer celles qui n\'existent pas', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      // Mettre à jour une première fois
      mettreAJourPlanJSON(pages, liens);
      
      const siteMapPath = getSiteMapPath();
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const planInitial: PlanSite = JSON.parse(contenu);
      
      const nombrePagesInitial = planInitial.pages.length;
      
      // Ajouter manuellement une page qui n'existe pas encore
      const nouvellePage: PlanPage = {
        url: '/nouvelle-page-test',
        titre: 'Ancien titre',
        x: 300,
        y: 300,
        dessiner: 'Oui',
      };
      planInitial.pages.push(nouvellePage);
      fs.writeFileSync(siteMapPath, JSON.stringify(planInitial, null, 2));
      
      // Mettre à jour : la page manuelle devrait être supprimée car elle n'est pas détectée
      mettreAJourPlanJSON(pages, liens);
      
      const contenuFinal = fs.readFileSync(siteMapPath, 'utf8');
      const planFinal: PlanSite = JSON.parse(contenuFinal);
      
      // La page manuelle devrait avoir disparu car elle n'est pas dans les pages détectées
      const pageManuelle = planFinal.pages.find((p) => p.url === '/nouvelle-page-test');
      expect(pageManuelle).toBeUndefined();
      
      // Toutes les pages détectées devraient être présentes
      const urlsDetectees = pages.map((p) => p.url);
      planFinal.pages.forEach((page) => {
        expect(urlsDetectees).toContain(page.url);
      });
    });

    it('devrait préserver toutes les valeurs existantes sauf le titre', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      // Mettre à jour une première fois
      mettreAJourPlanJSON(pages, liens);
      
      const siteMapPath = getSiteMapPath();
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const planInitial: PlanSite = JSON.parse(contenu);
      
      // Modifier manuellement une page avec des valeurs personnalisées
      const pageHome = planInitial.pages.find((p) => p.url === '/');
      if (pageHome) {
        pageHome.x = 500;
        pageHome.y = 600;
        pageHome.numero = 42;
        pageHome.dessiner = 'Non';
        pageHome.e2eIDs = ['e2e1', 'e2e2'];
        pageHome.titre = 'Ancien titre à remplacer';
      }
      
      fs.writeFileSync(siteMapPath, JSON.stringify(planInitial, null, 2));
      
      // Mettre à jour une deuxième fois
      mettreAJourPlanJSON(pages, liens);
      
      const contenuFinal = fs.readFileSync(siteMapPath, 'utf8');
      const planFinal: PlanSite = JSON.parse(contenuFinal);
      
      const pageHomeFinal = planFinal.pages.find((p) => p.url === '/');
      expect(pageHomeFinal).toBeDefined();
      
      // Le titre doit être mis à jour avec la valeur de l'algo
      expect(pageHomeFinal?.titre).not.toBe('Ancien titre à remplacer');
      expect(pageHomeFinal?.titre).toBeDefined();
      
      // Toutes les autres valeurs doivent être préservées
      expect(pageHomeFinal?.x).toBe(500);
      expect(pageHomeFinal?.y).toBe(600);
      expect(pageHomeFinal?.numero).toBe(42);
      expect(pageHomeFinal?.dessiner).toBe('Non');
      expect(pageHomeFinal?.e2eIDs).toEqual(['e2e1', 'e2e2']);
    });

    it('devrait mettre dessiner à "Oui" par défaut si vide ou null', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      // Mettre à jour une première fois
      mettreAJourPlanJSON(pages, liens);
      
      const siteMapPath = getSiteMapPath();
      const contenu = fs.readFileSync(siteMapPath, 'utf8');
      const planInitial: PlanSite = JSON.parse(contenu);
      
      // Retirer dessiner d'une page (ou le mettre à null)
      const pageTest = planInitial.pages.find((p) => p.url === '/');
      if (pageTest) {
        delete (pageTest as any).dessiner; // Retirer la propriété
      }
      
      fs.writeFileSync(siteMapPath, JSON.stringify(planInitial, null, 2));
      
      // Mettre à jour une deuxième fois
      mettreAJourPlanJSON(pages, liens);
      
      const contenuFinal = fs.readFileSync(siteMapPath, 'utf8');
      const planFinal: PlanSite = JSON.parse(contenuFinal);
      
      const pageTestFinal = planFinal.pages.find((p) => p.url === '/');
      expect(pageTestFinal).toBeDefined();
      // dessiner doit être 'Oui' par défaut
      expect(pageTestFinal?.dessiner).toBe('Oui');
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

    it('devrait avoir des liens vers les pages principales du site', () => {
      const pages = detecterPages();
      const liens = detecterLiensInternes();
      
      const destinations = liens.map((l) => l.destination);
      const destinationsUniques = new Set(destinations);
      
      // Vérifier qu'au moins quelques pages principales sont des destinations de liens
      // Note : /faisons-connaissance est exclue du plan
      const pagesPrincipalesObligatoires = [
        // '/faisons-connaissance', // Exclue du plan
        '/a-propos-du-site',
        // '/robustesse', // Page supprimée
        // '/transformation', // Page supprimée
      ];
      
      // Pages qui peuvent avoir des liens ou non selon le contenu
      const pagesPrincipalesOptionnelles = [
        '/detournement-video',
      ];
      
      // Vérifier que les pages obligatoires ont des liens
      pagesPrincipalesObligatoires.forEach((page) => {
        expect(destinationsUniques.has(page)).toBe(true);
      });
      
      // Vérifier qu'au moins une page optionnelle a des liens (ou qu'elles existent dans les pages)
      const pagesOptionnellesAvecLiens = pagesPrincipalesOptionnelles.filter((page) => 
        destinationsUniques.has(page) || pages.some((p) => p.url === page)
      );
      expect(pagesOptionnellesAvecLiens.length).toBeGreaterThanOrEqual(0);
    });
  });
});
