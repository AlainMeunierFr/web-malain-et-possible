/**
 * Tests unitaires pour markdownParser.ts
 * Backend pur : testable sans dépendance React/Next.js
 */

import { parseMarkdownDOD, type ParsedDOD } from '../../utils/markdownParser';

describe('markdownParser', () => {
  describe('parseMarkdownDOD', () => {
    it('should parse a simple markdown DOD with title and description', () => {
      const markdown = `# My Title

This is a description.

## 1. First Theme

- Item 1
- Item 2
`;

      const result = parseMarkdownDOD(markdown);

      expect(result.title).toBe('My Title');
      expect(result.description).toBe('This is a description.');
      expect(result.themes).toHaveLength(1);
      expect(result.themes[0].theme).toBe('1. First Theme');
      expect(result.themes[0].items).toEqual(['Item 1', 'Item 2']);
    });

    it('should parse multiple themes', () => {
      const markdown = `# Test Title

Description here.

## 1. Theme One

- Item A
- Item B

## 2. Theme Two

- Item C
- Item D
`;

      const result = parseMarkdownDOD(markdown);

      expect(result.themes).toHaveLength(2);
      expect(result.themes[0].theme).toBe('1. Theme One');
      expect(result.themes[0].items).toEqual(['Item A', 'Item B']);
      expect(result.themes[1].theme).toBe('2. Theme Two');
      expect(result.themes[1].items).toEqual(['Item C', 'Item D']);
    });

    it('should handle empty markdown with default title', () => {
      const result = parseMarkdownDOD('');

      expect(result.title).toBe('Definition of Done');
      expect(result.description).toBe('');
      expect(result.themes).toHaveLength(0);
    });

    it('should handle markdown without description', () => {
      const markdown = `# My Title

## 1. Theme

- Item 1
`;

      const result = parseMarkdownDOD(markdown);

      expect(result.title).toBe('My Title');
      expect(result.description).toBe('');
      expect(result.themes).toHaveLength(1);
    });

    it('should handle markdown without themes', () => {
      const markdown = `# My Title

This is a description.
`;

      const result = parseMarkdownDOD(markdown);

      expect(result.title).toBe('My Title');
      expect(result.description).toBe('This is a description.');
      expect(result.themes).toHaveLength(0);
    });

    it('should trim whitespace from items', () => {
      const markdown = `# Test

## 1. Theme

-   Item with spaces   
- Another item
`;

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
- Type practice two
`;

      const result = parseMarkdownDOD(markdown);

      expect(result.title).toBe('Definition of Done (DOD)');
      expect(result.description).toBe('This DOD structures the best practices.');
      expect(result.themes).toHaveLength(2);
      expect(result.themes[0].theme).toBe('1. Structure et Organisation');
      expect(result.themes[1].theme).toBe('2. Types et Interfaces');
    });
  });
});
