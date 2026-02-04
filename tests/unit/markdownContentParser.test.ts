/**
 * Tests TDD pour le parsing du contenu markdown dans aboutSiteReader.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * Test 1 : Parser du texte normal simple
 * Test 2 : Parser une liste à puce (-)
 * Test 3 : Parser une liste numérotée (1.)
 * Test 4 : Parser du texte avec plusieurs paragraphes
 * Test 5 : Parser du texte mixte (texte + liste)
 */

import { parseMarkdownContent } from '../../utils/server';

describe('parseMarkdownContent', () => {
  describe('Test 1 : Cas simple - texte normal', () => {
    it('devrait parser du texte normal simple', () => {
      // ARRANGE
      const contenu = 'Ceci est un texte normal.';

      // ACT
      const result = parseMarkdownContent(contenu);

      // ASSERT
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('paragraph');
      expect(result[0].content).toBe('Ceci est un texte normal.');
    });
  });

  describe('Test 2 : Cas avec liste à puce', () => {
    it('devrait parser une liste à puce', () => {
      // ARRANGE
      const contenu = `- Item 1
- Item 2
- Item 3`;

      // ACT
      const result = parseMarkdownContent(contenu);

      // ASSERT
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('ul');
      expect(result[0].items).toEqual(['Item 1', 'Item 2', 'Item 3']);
    });
  });

  describe('Test 3 : Cas avec liste numérotée', () => {
    it('devrait parser une liste numérotée', () => {
      // ARRANGE
      const contenu = `1. Premier élément
2. Deuxième élément
3. Troisième élément`;

      // ACT
      const result = parseMarkdownContent(contenu);

      // ASSERT
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('ol');
      expect(result[0].items).toEqual(['Premier élément', 'Deuxième élément', 'Troisième élément']);
    });
  });

  describe('Test 4 : Cas avec plusieurs paragraphes', () => {
    it('devrait parser plusieurs paragraphes séparés par des lignes vides', () => {
      // ARRANGE
      const contenu = `Premier paragraphe.

Deuxième paragraphe.`;

      // ACT
      const result = parseMarkdownContent(contenu);

      // ASSERT
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('paragraph');
      expect(result[0].content).toBe('Premier paragraphe.');
      expect(result[1].type).toBe('paragraph');
      expect(result[1].content).toBe('Deuxième paragraphe.');
    });
  });

  describe('Test 5 : Cas mixte - texte et liste', () => {
    it('devrait parser du texte suivi d\'une liste', () => {
      // ARRANGE
      const contenu = `Voici une liste :

- Item 1
- Item 2`;

      // ACT
      const result = parseMarkdownContent(contenu);

      // ASSERT
      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('paragraph');
      expect(result[0].content).toBe('Voici une liste :');
      expect(result[1].type).toBe('ul');
      expect(result[1].items).toEqual(['Item 1', 'Item 2']);
    });
  });
});
