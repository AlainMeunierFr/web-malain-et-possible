/**
 * Tests unitaires pour les types hero et profil
 * TDD: Tests d'abord pour valider la structure
 */

import type { ElementHero, ElementProfil } from '../../utils';

describe('Types hero et profil - TDD', () => {
  describe('Type ElementProfil', () => {
    it('devrait avoir la structure correcte', () => {
      // ARRANGE & ACT
      const profil: ElementProfil = {
        type: 'profil',
        titre: 'Produit logiciel',
        jobTitles: ['CPO - Chief Product Officer', 'HOP - Head of Product'],
        slug: 'cpo',
        route: '/profil/cpo',
        cvPath: '/data/CV/cpo.pdf',
      };

      // ASSERT
      expect(profil.type).toBe('profil');
      expect(profil.titre).toBe('Produit logiciel');
      expect(Array.isArray(profil.jobTitles)).toBe(true);
      expect(profil.jobTitles.length).toBeGreaterThan(0);
      expect(profil.slug).toBe('cpo');
      expect(profil.route).toBe('/profil/cpo');
      expect(profil.cvPath).toBe('/data/CV/cpo.pdf');
    });

    it('devrait accepter plusieurs job titles', () => {
      // ARRANGE & ACT
      const profil: ElementProfil = {
        type: 'profil',
        titre: 'Produit logiciel',
        jobTitles: [
          'CPO - Chief Product Officer',
          'HOP - Head of Product',
          'Product Manager',
          'Product Owner',
        ],
        slug: 'cpo',
        route: '/profil/cpo',
        cvPath: '/data/CV/cpo.pdf',
      };

      // ASSERT
      expect(profil.jobTitles).toHaveLength(4);
    });
  });

  describe('Type ElementHero', () => {
    it('devrait avoir la structure correcte', () => {
      // ARRANGE & ACT
      const hero: ElementHero = {
        type: 'hero',
        titre: 'Alain Meunier',
        sousTitre: 'Je recherche un projet stimulant (CDI ou freelance)',
        description: 'Description de la valeur...',
        callToAction: {
          texte: 'On discute ?',
          action: '/faisons-connaissance',
        },
        profils: [
          {
            type: 'profil',
            titre: 'Produit logiciel',
            jobTitles: ['CPO - Chief Product Officer'],
            slug: 'cpo',
            route: '/profil/cpo',
            cvPath: '/data/CV/cpo.pdf',
          },
        ],
      };

      // ASSERT
      expect(hero.type).toBe('hero');
      expect(hero.titre).toBe('Alain Meunier');
      expect(hero.sousTitre).toBe('Je recherche un projet stimulant (CDI ou freelance)');
      expect(hero.description).toBeDefined();
      expect(hero.callToAction.texte).toBe('On discute ?');
      expect(hero.callToAction.action).toBe('/faisons-connaissance');
      expect(Array.isArray(hero.profils)).toBe(true);
      expect(hero.profils.length).toBeGreaterThan(0);
    });

    it('devrait accepter plusieurs profils', () => {
      // ARRANGE & ACT
      const hero: ElementHero = {
        type: 'hero',
        titre: 'Alain Meunier',
        sousTitre: 'Je recherche un projet stimulant (CDI ou freelance)',
        description: 'Description...',
        callToAction: {
          texte: 'On discute ?',
          action: '/faisons-connaissance',
        },
        profils: [
          {
            type: 'profil',
            titre: 'Produit logiciel',
            jobTitles: [],
            slug: 'cpo',
            route: '/profil/cpo',
            cvPath: '/data/CV/cpo.pdf',
          },
          {
            type: 'profil',
            titre: 'Opérations',
            jobTitles: [],
            slug: 'coo',
            route: '/profil/coo',
            cvPath: '/data/CV/coo.pdf',
          },
        ],
      };

      // ASSERT
      expect(hero.profils).toHaveLength(2);
    });
  });
});
