/**
 * Tests unitaires pour utils/jsonLdBuilder.ts
 * Couvre les fonctions de génération JSON-LD pour le SEO
 */

import fs from 'fs';
import {
  buildPersonJsonLd,
  buildWebSiteJsonLd,
  buildBreadcrumbJsonLd,
  buildHomePageJsonLd,
  buildProfilPageJsonLd,
  buildStandardPageJsonLd,
} from '../../utils/server';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

const mockSiteIdentity = {
  person: {
    name: 'Alain Meunier',
    jobTitle: 'Chief Product Officer',
    description: 'Expert en transformation digitale',
    knowsAbout: ['Agilité', 'Product Management'],
    sameAs: ['https://linkedin.com/in/alain', 'https://github.com/alain'],
  },
  website: {
    name: 'Malain et Possible',
    url: 'https://malainetpossible.fr',
    description: 'Site personnel de Alain Meunier',
    language: 'fr-FR',
  },
};

describe('jsonLdBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFs.readFileSync.mockReturnValue(JSON.stringify(mockSiteIdentity));
  });

  describe('buildPersonJsonLd', () => {
    it('devrait générer un schéma Person valide', () => {
      const result = buildPersonJsonLd();

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('Person');
      expect(result.name).toBe('Alain Meunier');
      expect(result.jobTitle).toBe('Chief Product Officer');
      expect(result.description).toBe('Expert en transformation digitale');
      expect(result.knowsAbout).toEqual(['Agilité', 'Product Management']);
      expect(result.sameAs).toHaveLength(2);
    });

    it('devrait inclure l\'URL du site', () => {
      const result = buildPersonJsonLd();
      expect(result.url).toBe('https://malainetpossible.fr');
    });
  });

  describe('buildWebSiteJsonLd', () => {
    it('devrait générer un schéma WebSite valide', () => {
      const result = buildWebSiteJsonLd();

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('WebSite');
      expect(result.name).toBe('Malain et Possible');
      expect(result.url).toBe('https://malainetpossible.fr');
      expect(result.description).toBe('Site personnel de Alain Meunier');
      expect(result.inLanguage).toBe('fr-FR');
    });

    it('devrait inclure l\'auteur', () => {
      const result = buildWebSiteJsonLd();
      expect(result.author['@type']).toBe('Person');
      expect(result.author.name).toBe('Alain Meunier');
    });
  });

  describe('buildBreadcrumbJsonLd', () => {
    it('devrait générer un schéma BreadcrumbList vide', () => {
      const result = buildBreadcrumbJsonLd([]);

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('BreadcrumbList');
      expect(result.itemListElement).toHaveLength(0);
    });

    it('devrait générer un fil d\'Ariane avec plusieurs éléments', () => {
      const items = [
        { name: 'Accueil', url: '/' },
        { name: 'Profils', url: '/mes-profils' },
        { name: 'CPO', url: '/profil/cpo' },
      ];

      const result = buildBreadcrumbJsonLd(items);

      expect(result.itemListElement).toHaveLength(3);
      expect(result.itemListElement[0].position).toBe(1);
      expect(result.itemListElement[0].name).toBe('Accueil');
      expect(result.itemListElement[0].item).toBe('https://malainetpossible.fr/');
      expect(result.itemListElement[2].position).toBe(3);
      expect(result.itemListElement[2].name).toBe('CPO');
    });
  });

  describe('buildHomePageJsonLd', () => {
    it('devrait retourner un tableau avec Person et WebSite', () => {
      const result = buildHomePageJsonLd();

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0]['@type']).toBe('Person');
      expect(result[1]['@type']).toBe('WebSite');
    });
  });

  describe('buildProfilPageJsonLd', () => {
    it('devrait générer un fil d\'Ariane pour une page profil', () => {
      const result = buildProfilPageJsonLd('Produit logiciel', 'cpo');

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0]['@type']).toBe('BreadcrumbList');
      expect(result[0].itemListElement).toHaveLength(3);
      expect(result[0].itemListElement[0].name).toBe('Accueil');
      expect(result[0].itemListElement[1].name).toBe('Mes profils');
      expect(result[0].itemListElement[2].name).toBe('Produit logiciel');
    });
  });

  describe('buildStandardPageJsonLd', () => {
    it('devrait générer un fil d\'Ariane pour une page standard', () => {
      const result = buildStandardPageJsonLd('À propos', '/a-propos');

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0]['@type']).toBe('BreadcrumbList');
      expect(result[0].itemListElement).toHaveLength(2);
      expect(result[0].itemListElement[0].name).toBe('Accueil');
      expect(result[0].itemListElement[1].name).toBe('À propos');
      expect(result[0].itemListElement[1].item).toBe('https://malainetpossible.fr/a-propos');
    });
  });
});
