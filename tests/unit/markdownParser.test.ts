/**
 * Tests unitaires pour markdownParser.ts
 * Backend pur : testable sans dépendance React/Next.js
 * 
 * APPROCHE TDD : Les tests montrent la progression du simple au complexe
 * - Test 1 : Le cas le plus simple (juste un titre)
 * - Test 2 : Ajout de la description
 * - Test 3 : Ajout d'un thème avec un item
 * - Test 4 : Ajout de plusieurs items dans un thème
 * - Test 5 : Ajout de plusieurs thèmes
 * - Test 6 : Cas limites et edge cases
 */

import { parseMarkdownDOD, type ParsedDOD } from '../../utils/markdownParser';

describe('markdownParser - Approche TDD (simple → complexe)', () => {
  describe('parseMarkdownDOD', () => {
    // ITÉRATION 1 : Le cas le plus simple - juste extraire le titre
    it('should parse title from markdown with only a title', () => {
      const markdown = `# My Title`;

      const result = parseMarkdownDOD(markdown);

      expect(result.title).toBe('My Title');
      expect(result.description).toBe('');
      expect(result.themes).toHaveLength(0);
    });

    // ITÉRATION 2 : Ajouter l'extraction de la description
    it('should parse title and description', () => {
      const markdown = `# My Title

This is a description.`;

      const result = parseMarkdownDOD(markdown);

      expect(result.title).toBe('My Title');
      expect(result.description).toBe('This is a description.');
      expect(result.themes).toHaveLength(0);
    });

    // ITÉRATION 3 : Ajouter l'extraction d'un thème avec un seul item
    it('should parse title, description and one theme with one item', () => {
      const markdown = `# My Title

This is a description.

## 1. First Theme

- Item 1`;

      const result = parseMarkdownDOD(markdown);

      expect(result.title).toBe('My Title');
      expect(result.description).toBe('This is a description.');
      expect(result.themes).toHaveLength(1);
      expect(result.themes[0].theme).toBe('1. First Theme');
      expect(result.themes[0].items).toEqual(['Item 1']);
    });

    // ITÉRATION 4 : Ajouter plusieurs items dans un thème
    it('should parse one theme with multiple items', () => {
      const markdown = `# My Title

This is a description.

## 1. First Theme

- Item 1
- Item 2
- Item 3`;

      const result = parseMarkdownDOD(markdown);

      expect(result.title).toBe('My Title');
      expect(result.description).toBe('This is a description.');
      expect(result.themes).toHaveLength(1);
      expect(result.themes[0].theme).toBe('1. First Theme');
      expect(result.themes[0].items).toEqual(['Item 1', 'Item 2', 'Item 3']);
    });

    // ITÉRATION 5 : Ajouter plusieurs thèmes
    it('should parse multiple themes with multiple items', () => {
      const markdown = `# My Title

This is a description.

## 1. First Theme

- Item A
- Item B

## 2. Second Theme

- Item C
- Item D`;

      const result = parseMarkdownDOD(markdown);

      expect(result.title).toBe('My Title');
      expect(result.description).toBe('This is a description.');
      expect(result.themes).toHaveLength(2);
      expect(result.themes[0].theme).toBe('1. First Theme');
      expect(result.themes[0].items).toEqual(['Item A', 'Item B']);
      expect(result.themes[1].theme).toBe('2. Second Theme');
      expect(result.themes[1].items).toEqual(['Item C', 'Item D']);
    });

    // ITÉRATION 6 : Cas limites et robustesse
    describe('Edge cases and robustness', () => {
      it('should handle empty markdown with default title', () => {
        const result = parseMarkdownDOD('');

        expect(result.title).toBe('Definition of Done');
        expect(result.description).toBe('');
        expect(result.themes).toHaveLength(0);
      });

      it('should handle markdown without description', () => {
        const markdown = `# My Title

## 1. Theme

- Item 1`;

        const result = parseMarkdownDOD(markdown);

        expect(result.title).toBe('My Title');
        expect(result.description).toBe('');
        expect(result.themes).toHaveLength(1);
      });

      it('should handle markdown without themes', () => {
        const markdown = `# My Title

This is a description.`;

        const result = parseMarkdownDOD(markdown);

        expect(result.title).toBe('My Title');
        expect(result.description).toBe('This is a description.');
        expect(result.themes).toHaveLength(0);
      });

      it('should trim whitespace from items', () => {
        const markdown = `# Test

## 1. Theme

-   Item with spaces   
- Another item`;

        const result = parseMarkdownDOD(markdown);

        expect(result.themes[0].items[0]).toBe('Item with spaces');
        expect(result.themes[0].items[1]).toBe('Another item');
      });

      it('should handle complex real-world DOD structure', () => {
        const markdown = `# Definition of Done (DOD)

This DOD structures the best practices.

## 1. Structure et Organisation

- First practice
- Second practice

## 2. Types et Interfaces

- Type practice one
- Type practice two`;

        const result = parseMarkdownDOD(markdown);

        expect(result.title).toBe('Definition of Done (DOD)');
        expect(result.description).toBe('This DOD structures the best practices.');
        expect(result.themes).toHaveLength(2);
        expect(result.themes[0].theme).toBe('1. Structure et Organisation');
        expect(result.themes[1].theme).toBe('2. Types et Interfaces');
      });
    });
  });
});
