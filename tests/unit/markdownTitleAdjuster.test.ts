/**
 * Tests unitaires pour markdownTitleAdjuster.ts
 * Backend pur : testable sans dépendance React/Next.js
 * 
 * APPROCHE TDD : Les tests montrent la progression du simple au complexe
 * - Test 1 : Le cas le plus simple (juste un titre H2)
 * - Test 2 : Ajouter un titre H1
 * - Test 3 : Ajouter un titre H3
 * - Test 4 : Combiner plusieurs titres
 * - Test 5 : Ajouter des titres H4, H5, H6
 * - Test 6 : Cas limites (lignes vides, texte non-titre, espaces)
 * 
 * ⚠️ OBSOLÈTE : Cette fonction est maintenant obsolète avec US-5.5.
 * Les tests sont conservés pour compatibilité avec d'anciens scripts.
 */

import { adjustMarkdownTitleLevels } from '../../utils/markdownTitleAdjuster';

describe('markdownTitleAdjuster - Approche TDD (simple → complexe)', () => {
  describe('adjustMarkdownTitleLevels', () => {
    // ITÉRATION 1 : Le cas le plus simple - juste un titre H2
    it('should adjust a single H2 title to H3', () => {
      const content = `## Section`;
      
      const result = adjustMarkdownTitleLevels(content);
      
      expect(result).toBe(`### Section`);
    });

    // ITÉRATION 2 : Ajouter un titre H1
    it('should adjust a single H1 title to H2', () => {
      const content = `# Title`;
      
      const result = adjustMarkdownTitleLevels(content);
      
      expect(result).toBe(`## Title`);
    });

    // ITÉRATION 3 : Ajouter un titre H3
    it('should adjust a single H3 title to H4', () => {
      const content = `### Subsection`;
      
      const result = adjustMarkdownTitleLevels(content);
      
      expect(result).toBe(`#### Subsection`);
    });

    // ITÉRATION 4 : Combiner plusieurs titres
    it('should adjust multiple titles of different levels', () => {
      const content = `# Title
## Section
### Subsection`;
      
      const result = adjustMarkdownTitleLevels(content);
      
      expect(result).toBe(`## Title
### Section
#### Subsection`);
    });

    // ITÉRATION 5 : Ajouter des titres H4, H5, H6
    it('should adjust H4, H5, and H6 titles', () => {
      const content = `#### H4 Title
##### H5 Title
###### H6 Title`;
      
      const result = adjustMarkdownTitleLevels(content);
      
      expect(result).toBe(`##### H4 Title
###### H5 Title
###### H6 Title`);
    });

    // ITÉRATION 6 : Cas limites et robustesse
    describe('Edge cases and robustness', () => {
      it('should leave non-title lines unchanged', () => {
        const content = `## Section
This is a paragraph.
Another line.`;
        
        const result = adjustMarkdownTitleLevels(content);
        
        expect(result).toBe(`### Section
This is a paragraph.
Another line.`);
      });

      it('should handle empty lines', () => {
        const content = `## Section

Another section`;
        
        const result = adjustMarkdownTitleLevels(content);
        
        expect(result).toBe(`### Section

Another section`);
      });

      it('should preserve indentation for titles', () => {
        const content = `    ## Indented Title`;
        
        const result = adjustMarkdownTitleLevels(content);
        
        expect(result).toBe(`    ### Indented Title`);
      });

      it('should handle multiple lines with mixed content', () => {
        const content = `# Main Title

## Section 1
Some content here.

### Subsection
More content.

## Section 2
Final content.`;
        
        const result = adjustMarkdownTitleLevels(content);
        
        expect(result).toBe(`## Main Title

### Section 1
Some content here.

#### Subsection
More content.

### Section 2
Final content.`);
      });

      it('should handle H6 title (should not go beyond H6)', () => {
        const content = `###### H6 Title`;
        
        const result = adjustMarkdownTitleLevels(content);
        
        // H6 devrait rester H6 (on ne va pas plus loin)
        expect(result).toBe(`###### H6 Title`);
      });
    });
  });
});
