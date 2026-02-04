/**
 * Tests pour la lecture du JSON avec type "listeDeTemoignages"
 * Vérifie que readPageData peut lire et parser correctement les éléments de type "listeDeTemoignages"
 * Les témoignages sont dans mes-profils.json (et _temoignages.json pour les items) ; plus dans les fichiers profil-*.json.
 */

import { readPageData } from '../../utils/server';
import type { ElementListeDeTemoignages, ElementTemoignage } from '../../utils';
import * as fs from 'fs';
import * as path from 'path';

describe('Lecture JSON avec type "listeDeTemoignages"', () => {
  const temoignagesPath = path.join(process.cwd(), 'data', '_temoignages.json');

  it('devrait pouvoir lire le fichier _temoignages.json', () => {
    expect(fs.existsSync(temoignagesPath)).toBe(true);

    const temoignagesContent = fs.readFileSync(temoignagesPath, 'utf8');
    const temoignagesData = JSON.parse(temoignagesContent);
    expect(temoignagesData).toHaveProperty('contenu');
    expect(Array.isArray(temoignagesData.contenu)).toBe(true);
  });

  it('devrait détecter au moins un élément de type "listeDeTemoignages" dans mes-profils.json', () => {
    const pageData = readPageData('mes-profils.json');
    const temoignagesElements = pageData.contenu.filter(
      (element) => element.type === 'listeDeTemoignages'
    ) as ElementListeDeTemoignages[];

    expect(temoignagesElements.length).toBeGreaterThan(0);
  });

  it('devrait avoir une structure valide pour les éléments "listeDeTemoignages"', () => {
    const pageData = readPageData('mes-profils.json');
    const temoignagesElement = pageData.contenu.find(
      (element) => element.type === 'listeDeTemoignages'
    ) as ElementListeDeTemoignages;

    expect(temoignagesElement).toBeDefined();
    expect(temoignagesElement.type).toBe('listeDeTemoignages');
    // Les témoignages peuvent avoir soit items soit source
    expect(temoignagesElement).toHaveProperty('source');
    expect(temoignagesElement.source).toBe('_temoignages.json');
  });

  it('devrait avoir des témoignages avec toutes les propriétés requises dans _temoignages.json', () => {
    const temoignagesContent = fs.readFileSync(temoignagesPath, 'utf8');
    const temoignagesData = JSON.parse(temoignagesContent);
    const temoignagesElement = temoignagesData.contenu.find(
      (element: any) => element.type === 'listeDeTemoignages'
    ) as ElementListeDeTemoignages;

    expect(temoignagesElement.items && temoignagesElement.items.length).toBeGreaterThan(0);

    temoignagesElement.items?.forEach((temoignage: ElementTemoignage) => {
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
    const temoignagesContent = fs.readFileSync(temoignagesPath, 'utf8');
    const temoignagesData = JSON.parse(temoignagesContent);
    const temoignagesElement = temoignagesData.contenu.find(
      (element: any) => element.type === 'listeDeTemoignages'
    ) as ElementListeDeTemoignages;

    // Si TypeScript compile, c'est que la structure est correcte
    expect(temoignagesElement.type satisfies 'listeDeTemoignages').toBe('listeDeTemoignages');
    temoignagesElement.items?.forEach((temoignage) => {
      expect(temoignage.nom).toBeDefined();
      expect(temoignage.fonction).toBeDefined();
      expect(temoignage.photo).toBeDefined();
      expect(temoignage.temoignage).toBeDefined();
    });
  });
});
