/**
 * Tests pour la lecture du JSON avec type "temoignages"
 * Vérifie que readPageData peut lire et parser correctement les éléments de type "temoignages"
 */

import { readPageData } from '../../utils/indexReader';
import type { ElementTemoignages, Temoignage } from '../../utils/indexReader';
import * as fs from 'fs';
import * as path from 'path';

describe('Lecture JSON avec type "temoignages"', () => {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');

  it('devrait pouvoir lire le fichier index.json contenant des témoignages', () => {
    expect(fs.existsSync(indexPath)).toBe(true);

    const pageData = readPageData('index.json');
    expect(pageData).toHaveProperty('contenu');
    expect(Array.isArray(pageData.contenu)).toBe(true);
  });

  it('devrait détecter au moins un élément de type "temoignages" dans index.json', () => {
    const pageData = readPageData('index.json');
    const temoignagesElements = pageData.contenu.filter(
      (element) => element.type === 'temoignages'
    ) as ElementTemoignages[];

    expect(temoignagesElements.length).toBeGreaterThan(0);
  });

  it('devrait avoir une structure valide pour les éléments "temoignages"', () => {
    const pageData = readPageData('index.json');
    const temoignagesElement = pageData.contenu.find(
      (element) => element.type === 'temoignages'
    ) as ElementTemoignages;

    expect(temoignagesElement).toBeDefined();
    expect(temoignagesElement.type).toBe('temoignages');
    expect(temoignagesElement).toHaveProperty('items');
    expect(Array.isArray(temoignagesElement.items)).toBe(true);
  });

  it('devrait avoir des témoignages avec toutes les propriétés requises', () => {
    const pageData = readPageData('index.json');
    const temoignagesElement = pageData.contenu.find(
      (element) => element.type === 'temoignages'
    ) as ElementTemoignages;

    expect(temoignagesElement.items && temoignagesElement.items.length).toBeGreaterThan(0);

    temoignagesElement.items?.forEach((temoignage: Temoignage) => {
      expect(temoignage).toHaveProperty('nom');
      expect(temoignage).toHaveProperty('fonction');
      expect(temoignage).toHaveProperty('photo');
      expect(temoignage).toHaveProperty('temoignage');
      expect(typeof temoignage.nom).toBe('string');
      expect(typeof temoignage.fonction).toBe('string');
      expect(typeof temoignage.photo).toBe('string');
      expect(typeof temoignage.temoignage).toBe('string');
      expect(temoignage.nom.length).toBeGreaterThan(0);
      expect(temoignage.fonction.length).toBeGreaterThan(0);
      expect(temoignage.temoignage.length).toBeGreaterThan(0);
    });
  });

  it('devrait valider le type TypeScript correctement', () => {
    const pageData = readPageData('index.json');
    const temoignagesElement = pageData.contenu.find(
      (element) => element.type === 'temoignages'
    ) as ElementTemoignages;

    // Si TypeScript compile, c'est que la structure est correcte
    expect(temoignagesElement.type satisfies 'temoignages').toBe('temoignages');
    temoignagesElement.items?.forEach((temoignage) => {
      expect(temoignage.nom).toBeDefined();
      expect(temoignage.fonction).toBeDefined();
      expect(temoignage.photo).toBeDefined();
      expect(temoignage.temoignage).toBeDefined();
    });
  });
});
