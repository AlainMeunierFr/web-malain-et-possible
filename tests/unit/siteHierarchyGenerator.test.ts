/**
 * Tests pour utils/siteHierarchyGenerator.ts
 * Génération de la hiérarchie du site (ASCII) à partir de la spec canonique, sans IA.
 */

import {
  buildHierarchyTree,
  renderHierarchyToAscii,
  generateHierarchyMarkdown,
  type TreeContainer,
} from '../../utils/siteHierarchyGenerator';
import { CANONICAL_SPEC_ORDER } from '../../constants/canonicalSpec';

describe('siteHierarchyGenerator', () => {
  describe('buildHierarchyTree', () => {
    it('devrait retourner une racine body avec au moins un enfant (boby.count)', () => {
      const tree = buildHierarchyTree(CANONICAL_SPEC_ORDER);
      expect(tree.type).toBe('container');
      expect(tree.id).toBe('body');
      expect(tree.label).toBe('body');
      expect(tree.children.length).toBeGreaterThanOrEqual(1);
      const pageContainer = tree.children.find((c) => c.type === 'container' && c.id === 'boby.count');
      expect(pageContainer).toBeDefined();
    });

    it('devrait contenir hero sous boby.count', () => {
      const tree = buildHierarchyTree(CANONICAL_SPEC_ORDER);
      const pageContainer = tree.children.find((c) => c.type === 'container' && c.id === 'boby.count') as TreeContainer | undefined;
      expect(pageContainer).toBeDefined();
      const heroContainer = pageContainer?.children.find((c) => c.type === 'container' && c.id === 'hero.cont');
      expect(heroContainer).toBeDefined();
    });
  });

  describe('renderHierarchyToAscii', () => {
    it('devrait produire des lignes commençant par body/ puis branches', () => {
      const tree = buildHierarchyTree(CANONICAL_SPEC_ORDER);
      const ascii = renderHierarchyToAscii(tree);
      expect(ascii).toContain('body/');
      expect(ascii).toMatch(/└──|├──/);
      expect(ascii).toContain('boby.count');
    });
  });

  describe('generateHierarchyMarkdown', () => {
    it('devrait retourner un document Markdown avec titre et bloc ASCII', () => {
      const markdown = generateHierarchyMarkdown();
      expect(markdown).toContain('# Hiérarchie du site (ASCII Art)');
      expect(markdown).toContain('```');
      expect(markdown).toContain('body/');
      expect(markdown).toContain('hero');
      expect(markdown).toContain('Légende');
      expect(markdown).toContain('Racine');
    });

    it('devrait accepter une liste d’entrées optionnelle', () => {
      const minimal = [
        { nomCanonique: 'page', typeHierarchique: '--c', containerParent: 'body', containerLayout: 'boby.count' },
        { nomCanonique: 'header', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'header' },
      ];
      const markdown = generateHierarchyMarkdown(minimal);
      expect(markdown).toContain('body/');
      expect(markdown).toContain('boby.count');
    });
  });
});
