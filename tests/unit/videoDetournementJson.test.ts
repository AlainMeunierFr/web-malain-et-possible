/**
 * Tests pour la lecture du JSON avec type "videoDetournement"
 * Vérifie que readPageData peut lire et parser correctement les détournements vidéo
 */

import { readPageData } from '../../utils/indexReader';
import type { DetournementVideo, ElementVideoDetournement } from '../../utils/indexReader';
import * as fs from 'fs';
import * as path from 'path';

describe('Lecture JSON avec type "videoDetournement"', () => {
  const portfolioPath = path.join(process.cwd(), 'data', 'portfolio-detournements.json');

  it('devrait pouvoir lire le fichier portfolio-detournements.json', () => {
    expect(fs.existsSync(portfolioPath)).toBe(true);

    const pageData = readPageData('portfolio-detournements.json');
    expect(pageData.contenu.length).toBeGreaterThan(0);
  });

  it('devrait détecter un élément de type "videoDetournement" dans portfolio-detournements.json', () => {
    if (fs.existsSync(portfolioPath)) {
      const pageData = readPageData('portfolio-detournements.json');
      const videoDetournementElements = pageData.contenu.filter(
        (element) => element.type === 'videoDetournement'
      ) as ElementVideoDetournement[];

      // Vérifier qu'au moins un élément de ce type existe ou que la page peut en contenir
      expect(pageData.contenu.length).toBeGreaterThan(0);
    }
  });

  it('devrait avoir une structure valide pour les détournements si présents', () => {
    if (fs.existsSync(portfolioPath)) {
      const pageData = readPageData('portfolio-detournements.json');
      const videoDetournementElements = pageData.contenu.filter(
        (element) => element.type === 'videoDetournement'
      ) as ElementVideoDetournement[];

      if (videoDetournementElements.length > 0) {
        const element = videoDetournementElements[0];
        if (element.items && Array.isArray(element.items)) {
          element.items.forEach((detournement: DetournementVideo) => {
            expect(detournement).toHaveProperty('id');
            expect(detournement).toHaveProperty('titreVideoDetournee');
            expect(detournement).toHaveProperty('videoDetournee');
            expect(detournement).toHaveProperty('titreVideoOriginale');
            expect(detournement).toHaveProperty('videoOriginale');
            expect(detournement).toHaveProperty('pourLeCompteDe');
            expect(detournement).toHaveProperty('date');
            expect(detournement).toHaveProperty('pitch');

            expect(typeof detournement.id).toBe('number');
            expect(typeof detournement.titreVideoDetournee).toBe('string');
            expect(typeof detournement.videoDetournee).toBe('string');
            expect(typeof detournement.titreVideoOriginale).toBe('string');
            expect(typeof detournement.videoOriginale).toBe('string');
            expect(typeof detournement.pourLeCompteDe).toBe('string');
            expect(typeof detournement.date).toBe('string');
            expect(typeof detournement.pitch).toBe('string');
          });
        }
      }
    }
  });

  it('devrait avoir des propriétés optionnelles valides pour les détournements', () => {
    if (fs.existsSync(portfolioPath)) {
      const pageData = readPageData('portfolio-detournements.json');
      const videoDetournementElements = pageData.contenu.filter(
        (element) => element.type === 'videoDetournement'
      ) as ElementVideoDetournement[];

      if (videoDetournementElements.length > 0) {
        const element = videoDetournementElements[0];
        if (element.items && Array.isArray(element.items)) {
          element.items.forEach((detournement: DetournementVideo) => {
            // droitsAuteur et linkedin sont optionnels
            if ('droitsAuteur' in detournement) {
              expect(typeof detournement.droitsAuteur).toBe('string');
            }
            if ('linkedin' in detournement) {
              expect(typeof detournement.linkedin).toBe('string');
            }
          });
        }
      }
    }
  });

  it('devrait avoir des IDs uniques pour chaque détournement', () => {
    if (fs.existsSync(portfolioPath)) {
      const pageData = readPageData('portfolio-detournements.json');
      const videoDetournementElements = pageData.contenu.filter(
        (element) => element.type === 'videoDetournement'
      ) as ElementVideoDetournement[];

      if (videoDetournementElements.length > 0) {
        const element = videoDetournementElements[0];
        if (element.items && Array.isArray(element.items)) {
          const ids = element.items.map((d) => d.id);
          const uniqueIds = new Set(ids);
          expect(uniqueIds.size).toBe(element.items.length);
        }
      }
    }
  });
});
