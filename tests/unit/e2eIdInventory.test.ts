/**
 * Tests TDD pour e2eIdInventory.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * ITÉRATION 1 : Le cas le plus simple - extractE2eIdsFromConstants
 * ITÉRATION 2 : extractE2eIdsFromJson avec un seul e2eID
 * ITÉRATION 3 : extractE2eIdsFromJson avec plusieurs e2eID
 * ITÉRATION 4 : extractE2eIdsFromReact avec data-e2eid string
 * ITÉRATION 5 : extractE2eIdsFromReact avec constante E2E_IDS
 * ITÉRATION 6 : generateE2eIdInventory combine toutes les sources
 * ITÉRATION 7 : extractE2eIdsFromTestFile avec différents patterns
 */

import fs from 'fs';
import path from 'path';
import { generateE2eIdInventory, extractE2eIdsFromTestFile } from '../../utils/e2eIdInventory';
import { E2E_IDS } from '../../constants/e2eIds';

// Mock fs
jest.mock('fs');
const mockFs = fs as jest.Mocked<typeof fs>;

// Mock constants
jest.mock('../../constants/e2eIds', () => ({
  E2E_IDS: {
    header: {
      logo: 'h1',
      photo: 'h2',
    },
  },
}));

describe('e2eIdInventory - Approche TDD (simple → complexe)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ITÉRATION 1 : Le cas le plus simple - generateE2eIdInventory avec constantes', () => {
    it('devrait inclure les constantes dans l\'inventaire', () => {
      // ARRANGE : Aucun fichier JSON ou React
      mockFs.existsSync.mockReturnValue(false);

      // ACT
      const inventory = generateE2eIdInventory();

      // ASSERT : Devrait inclure au moins les constantes
      const constantItems = inventory.filter((item) => item.source === 'constant');
      expect(constantItems.length).toBeGreaterThan(0);
      expect(constantItems.some((item) => item.e2eID === 'h1')).toBe(true);
      expect(constantItems.some((item) => item.e2eID === 'h2')).toBe(true);
    });
  });

  describe('ITÉRATION 2 : extractE2eIdsFromJson avec un seul e2eID', () => {
    it('devrait extraire un e2eID depuis un fichier JSON', () => {
      // ARRANGE : Fichier JSON avec e2eID
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'video',
              e2eID: 'v10',
            },
          ],
        })
      );

      // ACT
      const inventory = generateE2eIdInventory();

      // ASSERT
      const jsonItems = inventory.filter((item) => item.source === 'json');
      expect(jsonItems.length).toBeGreaterThan(0);
      expect(jsonItems.some((item) => item.e2eID === 'v10')).toBe(true);
    });
  });

  describe('ITÉRATION 3 : extractE2eIdsFromJson avec plusieurs e2eID', () => {
    it('devrait extraire plusieurs e2eID depuis un fichier JSON', () => {
      // ARRANGE : Plusieurs e2eID
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['test.json'] as any);
      mockFs.readFileSync.mockReturnValue(
        JSON.stringify({
          contenu: [
            {
              type: 'video',
              e2eID: 'v10',
            },
            {
              type: 'callToAction',
              e2eID: 'a5',
            },
            {
              type: 'groupeBoutons',
              boutons: [
                {
                  id: 'email',
                  e2eID: 'b3',
                },
              ],
            },
          ],
        })
      );

      // ACT
      const inventory = generateE2eIdInventory();

      // ASSERT
      const jsonItems = inventory.filter((item) => item.source === 'json');
      expect(jsonItems.length).toBeGreaterThanOrEqual(3);
      expect(jsonItems.some((item) => item.e2eID === 'v10')).toBe(true);
      expect(jsonItems.some((item) => item.e2eID === 'a5')).toBe(true);
      expect(jsonItems.some((item) => item.e2eID === 'b3')).toBe(true);
    });
  });

  describe('ITÉRATION 4 : extractE2eIdsFromReact avec data-e2eid string', () => {
    it('devrait extraire un e2eID depuis un composant React avec data-e2eid string', () => {
      // ARRANGE : Composant React avec data-e2eid
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['TestComponent.tsx'] as any);
      mockFs.readFileSync.mockReturnValue(
        '<button data-e2eid="b10">Click</button>'
      );

      // ACT
      const inventory = generateE2eIdInventory();

      // ASSERT
      const reactItems = inventory.filter((item) => item.source === 'react');
      expect(reactItems.some((item) => item.e2eID === 'b10')).toBe(true);
    });
  });

  describe('ITÉRATION 5 : extractE2eIdsFromReact avec constante E2E_IDS', () => {
    it('devrait extraire un e2eID depuis un composant React avec constante E2E_IDS', () => {
      // ARRANGE : Composant React avec constante
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['TestComponent.tsx'] as any);
      mockFs.readFileSync.mockReturnValue(
        '<Image data-e2eid={E2E_IDS.header.logo} />'
      );

      // ACT
      const inventory = generateE2eIdInventory();

      // ASSERT
      const reactItems = inventory.filter((item) => item.source === 'react');
      expect(reactItems.some((item) => item.e2eID === 'h1')).toBe(true);
    });
  });

  describe('ITÉRATION 6 : generateE2eIdInventory combine toutes les sources', () => {
    it('devrait combiner les e2eID de toutes les sources', () => {
      // ARRANGE : JSON + React + constantes
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockImplementation((dir: any) => {
        if (dir.includes('data')) {
          return ['test.json'] as any;
        }
        if (dir.includes('components')) {
          return ['TestComponent.tsx'] as any;
        }
        return [] as any;
      });
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('test.json')) {
          return JSON.stringify({
            contenu: [{ type: 'video', e2eID: 'v10' }],
          });
        }
        if (filePath.includes('TestComponent.tsx')) {
          return '<button data-e2eid="b5">Click</button>';
        }
        return '';
      });

      // ACT
      const inventory = generateE2eIdInventory();

      // ASSERT : Devrait avoir des items de toutes les sources
      const jsonItems = inventory.filter((item) => item.source === 'json');
      const reactItems = inventory.filter((item) => item.source === 'react');
      const constantItems = inventory.filter((item) => item.source === 'constant');

      expect(jsonItems.length).toBeGreaterThan(0);
      expect(reactItems.length).toBeGreaterThan(0);
      expect(constantItems.length).toBeGreaterThan(0);
    });
  });

  describe('ITÉRATION 7 : extractE2eIdsFromTestFile', () => {
    it('devrait extraire les e2eID depuis un fichier de test avec getByTestId', () => {
      // ARRANGE : Fichier de test
      const testContent = `
        await page.getByTestId('e2eid-v10').click();
        await page.getByTestId('e2eid-a5').click();
      `;

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(testContent);

      // ACT
      const e2eIds = extractE2eIdsFromTestFile('test.spec.ts');

      // ASSERT
      expect(e2eIds).toContain('v10');
      expect(e2eIds).toContain('a5');
    });

    it('devrait extraire les e2eID depuis un fichier de test avec locator', () => {
      // ARRANGE : Fichier de test avec locator
      const testContent = `
        await page.locator('[data-e2eid="v10"]').click();
        await page.locator('[data-e2eid="b5"]').click();
      `;

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(testContent);

      // ACT
      const e2eIds = extractE2eIdsFromTestFile('test.spec.ts');

      // ASSERT
      expect(e2eIds).toContain('v10');
      expect(e2eIds).toContain('b5');
    });

    it('devrait dédupliquer les e2eID', () => {
      // ARRANGE : Fichier de test avec e2eID dupliqué
      const testContent = `
        await page.getByTestId('e2eid-v10').click();
        await page.getByTestId('e2eid-v10').click();
      `;

      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(testContent);

      // ACT
      const e2eIds = extractE2eIdsFromTestFile('test.spec.ts');

      // ASSERT : Devrait être dédupliqué
      expect(e2eIds.filter((id) => id === 'v10').length).toBe(1);
    });

    it('devrait retourner un tableau vide si le fichier n\'existe pas', () => {
      // ARRANGE : Fichier inexistant
      mockFs.existsSync.mockReturnValue(false);

      // ACT
      const e2eIds = extractE2eIdsFromTestFile('missing.spec.ts');

      // ASSERT
      expect(e2eIds).toEqual([]);
    });
  });

  describe('ITÉRATION 8 : Ignorer les fichiers de configuration', () => {
    it('devrait ignorer Pages-Et-Lien.json', () => {
      // ARRANGE : Fichier de configuration
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue(['Pages-Et-Lien.json', 'test.json'] as any);
      
      mockFs.readFileSync.mockImplementation((filePath: any) => {
        if (filePath.includes('Pages-Et-Lien.json')) {
          return JSON.stringify({
            pages: [{ e2eID: 'v999' }], // Devrait être ignoré
          });
        }
        if (filePath.includes('test.json')) {
          return JSON.stringify({
            contenu: [{ type: 'video', e2eID: 'v10' }],
          });
        }
        return '';
      });

      // ACT
      const inventory = generateE2eIdInventory();

      // ASSERT : Ne devrait pas inclure v999
      expect(inventory.some((item) => item.e2eID === 'v999')).toBe(false);
      expect(inventory.some((item) => item.e2eID === 'v10')).toBe(true);
    });
  });
});
