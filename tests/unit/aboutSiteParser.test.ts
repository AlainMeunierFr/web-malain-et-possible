/**
 * Tests TDD pour le parsing des parties (#) et sous-parties (##) dans aboutSiteReader.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * Test 1 : Parser une section avec une seule partie (#)
 * Test 2 : Parser une section avec plusieurs parties (#)
 * Test 3 : Parser une partie avec une sous-partie (##)
 * Test 4 : Parser une partie avec plusieurs sous-parties (##)
 * Test 5 : Parser du contenu avant la première partie
 * Test 6 : Parser du contenu entre les parties
 */

import { parseSectionContent } from '../../utils/aboutSiteReader';

describe('parseSectionContent', () => {
  describe('Test 1 : Cas simple - une seule partie', () => {
    it('devrait parser une section avec une seule partie', () => {
      // ARRANGE
      const contenu = '# Titre Partie 1\n\nContenu de la partie 1.';

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].titre).toBe('Titre Partie 1');
      expect(result.parties[0].contenu).toContain('Contenu de la partie 1');
      expect(result.parties[0].sousParties).toEqual([]);
    });
  });

  describe('Test 2 : Cas multiple - plusieurs parties', () => {
    it('devrait parser une section avec plusieurs parties', () => {
      // ARRANGE
      const contenu = `# Titre Partie 1
Contenu partie 1.

# Titre Partie 2
Contenu partie 2.`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(2);
      expect(result.parties[0].titre).toBe('Titre Partie 1');
      expect(result.parties[0].contenu).toContain('Contenu partie 1');
      expect(result.parties[1].titre).toBe('Titre Partie 2');
      expect(result.parties[1].contenu).toContain('Contenu partie 2');
    });
  });

  describe('Test 3 : Cas avec sous-partie - une partie avec une sous-partie', () => {
    it('devrait parser une partie avec une sous-partie', () => {
      // ARRANGE
      const contenu = `# Titre Partie 1
Contenu avant sous-partie.

## Titre Sous-partie 1
Contenu sous-partie 1.`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].titre).toBe('Titre Partie 1');
      expect(result.parties[0].sousParties).toHaveLength(1);
      expect(result.parties[0].sousParties[0].titre).toBe('Titre Sous-partie 1');
      expect(result.parties[0].sousParties[0].contenu).toContain('Contenu sous-partie 1');
    });
  });

  describe('Test 4 : Cas complexe - partie avec plusieurs sous-parties', () => {
    it('devrait parser une partie avec plusieurs sous-parties', () => {
      // ARRANGE
      const contenu = `# Titre Partie 1
Contenu avant.

## Sous-partie 1
Contenu 1.

## Sous-partie 2
Contenu 2.`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties[0].sousParties).toHaveLength(2);
      expect(result.parties[0].sousParties[0].titre).toBe('Sous-partie 1');
      expect(result.parties[0].sousParties[1].titre).toBe('Sous-partie 2');
    });
  });

  describe('Test 5 : Cas avec contenu avant la première partie', () => {
    it('devrait conserver le contenu avant la première partie', () => {
      // ARRANGE
      const contenu = `Introduction avant la première partie.

# Titre Partie 1
Contenu partie 1.`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.contenuInitial.trim()).toBe('Introduction avant la première partie.');
      expect(result.parties).toHaveLength(1);
    });
  });

  describe('Test 6 : Cas avec contenu entre les parties', () => {
    it('devrait conserver le contenu entre les parties', () => {
      // ARRANGE
      const contenu = `# Titre Partie 1
Contenu partie 1.

Texte entre les parties.

# Titre Partie 2
Contenu partie 2.`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(2);
      expect(result.parties[0].contenu).toContain('Texte entre les parties');
    });
  });
});
