/**
 * Tests unitaires pour utils/metadataBuilder.ts
 * Couvre la génération des metadata Next.js
 */

import fs from 'fs';
import { buildPageMetadata, buildProfilMetadata } from '../../utils/server';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

describe('metadataBuilder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('buildPageMetadata', () => {
    it('devrait générer les metadata à partir d\'un fichier JSON avec metadata', () => {
      const mockPageData = {
        metadata: {
          title: 'Page Test',
          description: 'Description test',
          keywords: ['mot1', 'mot2'],
          ogType: 'article',
        },
        contenu: [],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      const result = buildPageMetadata('test.json', '/test');

      expect(result.title).toBe('Page Test');
      expect(result.description).toBe('Description test');
      expect(result.keywords).toEqual(['mot1', 'mot2']);
      expect(result.openGraph?.type).toBe('article');
    });

    it('devrait utiliser le fallback si pas de metadata dans le JSON', () => {
      const mockPageData = {
        contenu: [],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      const result = buildPageMetadata('test.json', '/test');

      expect(result.title).toBe('Malain et possible');
      expect(result.description).toContain('Conduite du changement');
    });

    it('devrait construire l\'URL canonique correctement pour la racine', () => {
      const mockPageData = {
        metadata: {
          title: 'Home',
          description: 'Home page',
        },
        contenu: [],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      const result = buildPageMetadata('index.json', '/');

      expect(result.alternates?.canonical).toBe('https://web-malain-et-possible.vercel.app');
    });

    it('devrait construire l\'URL canonique correctement pour les sous-pages', () => {
      const mockPageData = {
        metadata: {
          title: 'Sub Page',
          description: 'Sub page',
        },
        contenu: [],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      const result = buildPageMetadata('subpage.json', '/subpage');

      expect(result.alternates?.canonical).toBe('https://web-malain-et-possible.vercel.app/subpage');
    });

    it('devrait utiliser website comme type OG par défaut', () => {
      const mockPageData = {
        metadata: {
          title: 'Test',
          description: 'Test',
        },
        contenu: [],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      const result = buildPageMetadata('test.json', '/test');

      expect(result.openGraph?.type).toBe('website');
    });

    it('devrait inclure les informations OpenGraph', () => {
      const mockPageData = {
        metadata: {
          title: 'OG Test',
          description: 'OG Description',
        },
        contenu: [],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      const result = buildPageMetadata('test.json', '/test');

      expect(result.openGraph?.title).toBe('OG Test');
      expect(result.openGraph?.description).toBe('OG Description');
      expect(result.openGraph?.siteName).toBe('Malain et possible');
      expect(result.openGraph?.locale).toBe('fr_FR');
    });

    it('devrait inclure les informations Twitter Card', () => {
      const mockPageData = {
        metadata: {
          title: 'Twitter Test',
          description: 'Twitter Description',
        },
        contenu: [],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(JSON.stringify(mockPageData));

      const result = buildPageMetadata('test.json', '/test');

      expect(result.twitter?.card).toBe('summary');
      expect(result.twitter?.title).toBe('Twitter Test');
      expect(result.twitter?.description).toBe('Twitter Description');
    });
  });

  describe('buildProfilMetadata', () => {
    it('devrait construire le nom de fichier et l\'URL correctement', () => {
      const mockPageData = {
        metadata: {
          title: 'Profil CPO',
          description: 'Chief Product Officer',
        },
        contenu: [],
      };

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('profil-cpo.json')) {
          return JSON.stringify(mockPageData);
        }
        return '{}';
      });

      const result = buildProfilMetadata('cpo');

      expect(result.title).toBe('Profil CPO');
      expect(result.alternates?.canonical).toContain('/profil/cpo');
    });
  });
});
