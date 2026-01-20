/**
 * Test d'intégration pour vérifier la conformité de tous les JSON avec les types de contenu connus
 * Vérifie que tous les fichiers JSON dans data/ respectent les interfaces TypeScript définies
 */

import { readPageData, TypeElementContenu, ElementContenu } from '../../utils/indexReader';
import * as fs from 'fs';
import * as path from 'path';

describe('Conformité JSON - Tous les fichiers', () => {
  const dataDir = path.join(process.cwd(), 'data');
  const jsonFiles = fs.readdirSync(dataDir).filter((file) => file.endsWith('.json'));

  // Fichiers à ignorer (non conformes à la structure PageData)
  const filesToIgnore = ['footerButtons.json', 'Détournements vidéo.json']; // Détournements vidéo.json a une structure différente (lu via readDetournementsVideo)

  // Types de contenu valides
  const validTypes: TypeElementContenu[] = [
    'titre',
    'video',
    'texteLarge',
    'domaineDeCompetence',
    'callToAction',
    'groupeBoutons',
    'temoignages',
    'videoDetournement',
  ];

  it('devrait lire tous les fichiers JSON du dossier data/', () => {
    expect(jsonFiles.length).toBeGreaterThan(0);
    console.log(`Fichiers JSON trouvés : ${jsonFiles.length}`);
  });

  jsonFiles.forEach((filename) => {
    // Ignorer les fichiers spécifiés
    if (filesToIgnore.includes(filename)) {
      return;
    }

    describe(`Fichier ${filename}`, () => {
      it(`devrait pouvoir être lu par readPageData`, () => {
        expect(() => {
          readPageData(filename);
        }).not.toThrow();
      });

      it(`devrait avoir une structure PageData valide`, () => {
        const pageData = readPageData(filename);

        expect(pageData).toHaveProperty('contenu');
        expect(Array.isArray(pageData.contenu)).toBe(true);
        expect(pageData.contenu.length).toBeGreaterThan(0);
      });

      it(`devrait contenir uniquement des types de contenu valides`, () => {
        const pageData = readPageData(filename);

        pageData.contenu.forEach((element: ElementContenu, index: number) => {
          expect(element).toHaveProperty('type');
          expect(validTypes).toContain(element.type);
          expect(typeof element.type).toBe('string');

          // Vérifier que le type correspond bien au type TypeScript
          switch (element.type) {
            case 'titre':
              expect(element).toHaveProperty('texte');
              expect(typeof (element as any).texte).toBe('string');
              break;
            case 'video':
              expect(element).toHaveProperty('urlYouTube');
              expect(element).toHaveProperty('lancementAuto');
              expect(typeof (element as any).urlYouTube).toBe('string');
              expect(typeof (element as any).lancementAuto).toBe('boolean');
              break;
            case 'texteLarge':
              expect(element).toHaveProperty('texte');
              expect(typeof (element as any).texte).toBe('string');
              break;
            case 'domaineDeCompetence':
              expect(element).toHaveProperty('titre');
              expect(element).toHaveProperty('contenu');
              expect(element).toHaveProperty('items');
              expect(typeof (element as any).titre).toBe('string');
              expect(typeof (element as any).contenu).toBe('string');
              expect(Array.isArray((element as any).items)).toBe(true);
              break;
            case 'callToAction':
              expect(element).toHaveProperty('action');
              expect(typeof (element as any).action).toBe('string');
              break;
            case 'groupeBoutons':
              expect(element).toHaveProperty('taille');
              expect(element).toHaveProperty('boutons');
              expect(['petite', 'grande']).toContain((element as any).taille);
              expect(Array.isArray((element as any).boutons)).toBe(true);
              break;
            case 'temoignages':
              expect(element).toHaveProperty('items');
              expect(Array.isArray((element as any).items)).toBe(true);
              (element as any).items.forEach((item: any) => {
                expect(item).toHaveProperty('nom');
                expect(item).toHaveProperty('fonction');
                expect(item).toHaveProperty('photo');
                expect(item).toHaveProperty('temoignage');
              });
              break;
            case 'videoDetournement':
              expect(element).toHaveProperty('items');
              expect(Array.isArray((element as any).items)).toBe(true);
              (element as any).items.forEach((item: any) => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('titreVideoDetournee');
                expect(item).toHaveProperty('videoDetournee');
                expect(item).toHaveProperty('titreVideoOriginale');
                expect(item).toHaveProperty('videoOriginale');
                expect(item).toHaveProperty('pourLeCompteDe');
                expect(item).toHaveProperty('date');
                expect(item).toHaveProperty('pitch');
              });
              break;
          }
        });
      });

      it(`devrait avoir des éléments de contenu avec les propriétés requises`, () => {
        const pageData = readPageData(filename);

        pageData.contenu.forEach((element: ElementContenu, index: number) => {
          // Chaque élément doit avoir au minimum un type
          expect(element).toHaveProperty('type');
          expect(element.type).toBeDefined();
          expect(element.type.length).toBeGreaterThan(0);
        });
      });

      it(`devrait pouvoir être validé par TypeScript (pas d'erreur de type)`, () => {
        const pageData = readPageData(filename);

        // Si TypeScript compile, c'est que la structure est correcte
        pageData.contenu.forEach((element: ElementContenu) => {
          // Vérification que l'élément est bien un ElementContenu valide
          expect(validTypes).toContain(element.type);
        });
      });
    });
  });

  it('devrait avoir au moins un fichier JSON principal (index.json)', () => {
    const indexPath = path.join(dataDir, 'index.json');
    expect(fs.existsSync(indexPath)).toBe(true);
  });

  it('devrait détecter tous les types de contenu utilisés dans les fichiers', () => {
    const typesUtilises = new Set<TypeElementContenu>();

    jsonFiles.forEach((filename) => {
      if (filesToIgnore.includes(filename)) {
        return;
      }

      try {
        const pageData = readPageData(filename);
        pageData.contenu.forEach((element: ElementContenu) => {
          typesUtilises.add(element.type);
        });
      } catch (error) {
        // Ignorer les erreurs pour les fichiers non conformes
      }
    });

    expect(typesUtilises.size).toBeGreaterThan(0);
    console.log(`Types de contenu utilisés : ${Array.from(typesUtilises).join(', ')}`);
  });
});
