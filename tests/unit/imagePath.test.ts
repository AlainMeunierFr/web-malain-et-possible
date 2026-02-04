/**
 * Tests unitaires pour utils/imagePath.ts
 * Couvre les fonctions de construction de chemins d'images
 */

import {
  getJsonImagePath,
  getMdImagePath,
  getStaticImagePath,
} from '../../utils';

describe('imagePath', () => {
  describe('getJsonImagePath', () => {
    it('devrait construire le chemin pour une image JSON simple', () => {
      const result = getJsonImagePath('Logo.png');
      expect(result).toBe('/api/images/json/Logo.png');
    });

    it('devrait encoder les espaces dans le nom de fichier', () => {
      const result = getJsonImagePath('Mon Image.png');
      expect(result).toBe('/api/images/json/Mon%20Image.png');
    });

    it('devrait encoder les caractères spéciaux', () => {
      const result = getJsonImagePath('Image#1.png');
      expect(result).toBe('/api/images/json/Image%231.png');
    });

    it('devrait retourner le chemin tel quel si déjà complet', () => {
      const existingPath = '/api/images/json/Existing.png';
      const result = getJsonImagePath(existingPath);
      expect(result).toBe(existingPath);
    });

    it('devrait retourner le chemin tel quel pour un autre type d\'image API', () => {
      const existingPath = '/api/images/md/SomeImage.png';
      const result = getJsonImagePath(existingPath);
      expect(result).toBe(existingPath);
    });
  });

  describe('getMdImagePath', () => {
    it('devrait construire le chemin pour une image Markdown simple', () => {
      const result = getMdImagePath('capture.jpg');
      expect(result).toBe('/api/images/md/capture.jpg');
    });

    it('devrait encoder les espaces dans le nom de fichier', () => {
      const result = getMdImagePath('2026-01-24 Capture 1.jpg');
      expect(result).toBe('/api/images/md/2026-01-24%20Capture%201.jpg');
    });

    it('devrait encoder les caractères accentués', () => {
      const result = getMdImagePath('Événement.png');
      expect(result).toBe('/api/images/md/%C3%89v%C3%A9nement.png');
    });

    it('devrait retourner le chemin tel quel si déjà complet', () => {
      const existingPath = '/api/images/md/Existing.png';
      const result = getMdImagePath(existingPath);
      expect(result).toBe(existingPath);
    });
  });

  describe('getStaticImagePath', () => {
    it('devrait construire le chemin pour une image statique simple', () => {
      const result = getStaticImagePath('header.png');
      expect(result).toBe('/api/images/static/header.png');
    });

    it('devrait encoder les espaces', () => {
      const result = getStaticImagePath('Photo Profile.jpg');
      expect(result).toBe('/api/images/static/Photo%20Profile.jpg');
    });

    it('devrait retourner le chemin tel quel si déjà complet', () => {
      const existingPath = '/api/images/static/Logo.png';
      const result = getStaticImagePath(existingPath);
      expect(result).toBe(existingPath);
    });

    it('devrait gérer les noms de fichiers avec points multiples', () => {
      const result = getStaticImagePath('image.v2.final.png');
      expect(result).toBe('/api/images/static/image.v2.final.png');
    });
  });
});
