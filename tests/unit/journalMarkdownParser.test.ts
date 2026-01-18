/**
 * Tests unitaires pour le parser de markdown des journaux
 * Approche TDD : les tests définissent le comportement attendu
 */

import { parseJournalMarkdown } from '../../utils/journalMarkdownParser';
import { adjustMarkdownTitleLevels } from '../../utils/markdownTitleAdjuster';

describe('parseJournalMarkdown', () => {
  describe('Test 1 - Une section', () => {
    it('devrait parser une section simple (niveaux après ajustement)', () => {
      // Après ajustement, ## devient ###
      const markdown = `### Ma section 1`;
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].title).toBe('Ma section 1');
      expect(result.sections[0].prompts).toHaveLength(0);
    });
  });

  describe('Test 2 - Une section et un titre de prompt', () => {
    it('devrait parser une section avec un titre de prompt (niveaux après ajustement)', () => {
      // Après ajustement, ## devient ###, ### devient ####
      const markdown = `### Ma section 2
#### Mon titre de prompte 1`;
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].title).toBe('Ma section 2');
      expect(result.sections[0].prompts).toHaveLength(1);
      expect(result.sections[0].prompts[0].title).toBe('Mon titre de prompte 1');
      expect(result.sections[0].prompts[0].text).toBe('');
      expect(result.sections[0].prompts[0].technicalResult).toBe('');
    });
  });

  describe('Test 3 - Une section, un titre de prompt et le prompt', () => {
    it('devrait parser une section avec un prompt complet (niveaux après ajustement)', () => {
      // Format AVANT ajustement : ## devient ###, ### devient ####, ##### devient ######
      const markdownBeforeAdjust = `## Ma section 3
### Mon titre de prompte 2
##### Prompt
Mon prompt 2`;
      // Après ajustement
      const markdown = adjustMarkdownTitleLevels(markdownBeforeAdjust);
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].title).toBe('Ma section 3');
      expect(result.sections[0].prompts).toHaveLength(1);
      expect(result.sections[0].prompts[0].title).toBe('Mon titre de prompte 2');
      expect(result.sections[0].prompts[0].text).toBe('Mon prompt 2');
      expect(result.sections[0].prompts[0].technicalResult).toBe('');
    });
  });

  describe('Test 4 - Une section, un titre de prompt, le prompt et le résultat technique', () => {
    it('devrait parser une section avec un prompt et un résultat technique (niveaux après ajustement)', () => {
      // Format AVANT ajustement : ## devient ###, ### devient ####, ##### devient ######
      const markdownBeforeAdjust = `## Ma section 4
### Mon titre de prompte 3
##### Prompt
Mon prompt 3
##### Résultat technique
Mon résultat technique 3`;
      // Après ajustement
      const markdown = adjustMarkdownTitleLevels(markdownBeforeAdjust);
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].title).toBe('Ma section 4');
      expect(result.sections[0].prompts).toHaveLength(1);
      expect(result.sections[0].prompts[0].title).toBe('Mon titre de prompte 3');
      expect(result.sections[0].prompts[0].text).toBe('Mon prompt 3');
      expect(result.sections[0].prompts[0].technicalResult).toBe('Mon résultat technique 3');
    });
  });

  describe('Test 5 - Une section et 2 prompts', () => {
    it('devrait parser une section avec plusieurs prompts (niveaux après ajustement)', () => {
      // Format AVANT ajustement : ## devient ###, ### devient ####, ##### devient ######
      const markdownBeforeAdjust = `## Ma section 5
### Mon titre de prompte 4
##### Prompt
Mon prompt 4
##### Résultat technique
Mon résultat technique 4
### Mon titre de prompte 5
##### Prompt
Mon prompt 5
##### Résultat technique
Mon résultat technique 5`;
      // Après ajustement
      const markdown = adjustMarkdownTitleLevels(markdownBeforeAdjust);
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].title).toBe('Ma section 5');
      expect(result.sections[0].prompts).toHaveLength(2);
      
      // Premier prompt
      expect(result.sections[0].prompts[0].title).toBe('Mon titre de prompte 4');
      expect(result.sections[0].prompts[0].text).toBe('Mon prompt 4');
      expect(result.sections[0].prompts[0].technicalResult).toBe('Mon résultat technique 4');
      
      // Deuxième prompt
      expect(result.sections[0].prompts[1].title).toBe('Mon titre de prompte 5');
      expect(result.sections[0].prompts[1].text).toBe('Mon prompt 5');
      expect(result.sections[0].prompts[1].technicalResult).toBe('Mon résultat technique 5');
    });
  });

  describe('Test 6 - Cas réel avec lignes vides', () => {
    it('devrait parser un prompt avec des lignes vides dans le contenu', () => {
      // Format AVANT ajustement
      const markdownBeforeAdjust = `## Ma section 6
### Mon titre de prompte 6
##### Prompt
Mon prompt 6 avec plusieurs lignes

Et une ligne vide au milieu
##### Résultat technique
Mon résultat technique 6`;
      // Après ajustement
      const markdown = adjustMarkdownTitleLevels(markdownBeforeAdjust);
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].prompts).toHaveLength(1);
      expect(result.sections[0].prompts[0].text).toContain('Mon prompt 6');
      expect(result.sections[0].prompts[0].text).toContain('ligne vide');
      expect(result.sections[0].prompts[0].technicalResult).toBe('Mon résultat technique 6');
    });
  });

  describe('Test 7 - Cas réel du fichier journal', () => {
    it('devrait parser un exemple réel du journal', () => {
      // Format AVANT ajustement
      const markdownBeforeAdjust = `## Refactorisation de la couleur en variable CSS
##### Prompt
Faire en sorte que la couleur bleue ne soit pas évoquée directement dans le code par #0070C0 mais plutôt par une variable qui soit nommée "BleuFoncé". Ainsi, si je veux changer la couleur elle sera cohérente sur tout le site.

##### Résultat technique
(commit \`a78db21\`) : Refactorisation de la couleur bleue en variable CSS \`--BleuFonce\` dans \`globals.css\``;
      // Après ajustement
      const markdown = adjustMarkdownTitleLevels(markdownBeforeAdjust);
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.sections).toHaveLength(1);
      expect(result.sections[0].title).toBe('Refactorisation de la couleur en variable CSS');
      expect(result.sections[0].prompts).toHaveLength(1);
      expect(result.sections[0].prompts[0].text).toContain('Faire en sorte');
      expect(result.sections[0].prompts[0].text).toContain('BleuFoncé');
      expect(result.sections[0].prompts[0].technicalResult).toContain('commit');
      expect(result.sections[0].prompts[0].technicalResult).toContain('a78db21');
    });
  });
});
