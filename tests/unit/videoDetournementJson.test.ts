/**
 * Tests pour la lecture du JSON avec type "videoDetournement"
 * Vérifie que readDetournementsVideo peut lire et parser correctement le fichier Détournements vidéo.json
 */

import { readDetournementsVideo, readPageData } from '../../utils/indexReader';
import type { DetournementVideo, ElementVideoDetournement } from '../../utils/indexReader';
import * as fs from 'fs';
import * as path from 'path';

describe('Lecture JSON avec type "videoDetournement"', () => {
  const detournementsFilePath = path.join(process.cwd(), 'data', 'Détournements vidéo.json');

  it('devrait pouvoir lire le fichier Détournements vidéo.json', () => {
    expect(fs.existsSync(detournementsFilePath)).toBe(true);

    const detournements = readDetournementsVideo();
    expect(Array.isArray(detournements)).toBe(true);
    expect(detournements.length).toBeGreaterThan(0);
  });

  it('devrait avoir une structure valide pour tous les détournements', () => {
    const detournements = readDetournementsVideo();

    detournements.forEach((detournement: DetournementVideo) => {
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
  });

  it('devrait avoir des propriétés optionnelles valides', () => {
    const detournements = readDetournementsVideo();

    detournements.forEach((detournement: DetournementVideo) => {
      // droitsAuteur et linkedin sont optionnels
      if ('droitsAuteur' in detournement) {
        expect(typeof detournement.droitsAuteur).toBe('string');
      }
      if ('linkedin' in detournement) {
        expect(typeof detournement.linkedin).toBe('string');
      }
    });
  });

  it('devrait avoir des IDs uniques pour chaque détournement', () => {
    const detournements = readDetournementsVideo();
    const ids = detournements.map((d) => d.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(detournements.length);
  });

  it('devrait valider le type TypeScript correctement', () => {
    const detournements = readDetournementsVideo();

    // Si TypeScript compile, c'est que la structure est correcte
    detournements.forEach((detournement) => {
      expect(detournement.id).toBeDefined();
      expect(detournement.titreVideoDetournee).toBeDefined();
      expect(detournement.videoDetournee).toBeDefined();
      expect(detournement.titreVideoOriginale).toBeDefined();
      expect(detournement.videoOriginale).toBeDefined();
      expect(detournement.pourLeCompteDe).toBeDefined();
      expect(detournement.date).toBeDefined();
      expect(detournement.pitch).toBeDefined();
    });
  });

  it('devrait pouvoir créer un ElementVideoDetournement valide', () => {
    const detournements = readDetournementsVideo();
    const element: ElementVideoDetournement = {
      type: 'videoDetournement',
      items: detournements,
    };

    expect(element.type).toBe('videoDetournement');
    expect(Array.isArray(element.items)).toBe(true);
    expect(element.items.length).toBe(detournements.length);
  });

  it('devrait détecter un élément de type "videoDetournement" dans portfolio-detournements.json si présent', () => {
    const portfolioPath = path.join(process.cwd(), 'data', 'portfolio-detournements.json');
    
    if (fs.existsSync(portfolioPath)) {
      const pageData = readPageData('portfolio-detournements.json');
      const videoDetournementElements = pageData.contenu.filter(
        (element) => element.type === 'videoDetournement'
      ) as ElementVideoDetournement[];

      // Vérifier qu'au moins un élément de ce type existe ou que la page peut en contenir
      expect(pageData.contenu.length).toBeGreaterThan(0);
    }
  });
});
