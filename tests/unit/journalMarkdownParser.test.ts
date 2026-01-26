/**
 * Tests unitaires pour le parser de markdown des journaux
 * Approche TDD : les tests définissent le comportement attendu
 */

import { parseJournalMarkdown } from '../../utils/journalMarkdownParser';

describe('parseJournalMarkdown', () => {
  describe('Test 1 - Une partie', () => {
    it('devrait parser une partie simple (nouveaux niveaux)', () => {
      // Avec décalage +2 : # dans MD → h3 en HTML
      const markdown = `# Ma partie 1`;
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].titre).toBe('Ma partie 1');
      expect(result.parties[0].sousParties).toHaveLength(0);
    });
  });

  describe('Test 2 - Une partie et une sous-partie', () => {
    it('devrait parser une partie avec une sous-partie (nouveaux niveaux)', () => {
      // Avec décalage +2 : # dans MD → h3, ## dans MD → h4
      const markdown = `# Ma partie 2
## Ma sous-partie 1`;
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].titre).toBe('Ma partie 2');
      expect(result.parties[0].sousParties).toHaveLength(1);
      expect(result.parties[0].sousParties[0].titre).toBe('Ma sous-partie 1');
      expect(result.parties[0].sousParties[0].blocs).toHaveLength(0);
    });
  });

  describe('Test 3 - Une partie, une sous-partie et un bloc Prompt', () => {
    it('devrait parser une partie avec une sous-partie et un bloc Prompt (nouveaux niveaux)', () => {
      // Avec décalage +2 : # dans MD → h3, ## dans MD → h4, ### dans MD → h5
      const markdown = `# Ma partie 3
## Ma sous-partie 2
### Prompt
Mon prompt 2`;
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].titre).toBe('Ma partie 3');
      expect(result.parties[0].sousParties).toHaveLength(1);
      expect(result.parties[0].sousParties[0].titre).toBe('Ma sous-partie 2');
      expect(result.parties[0].sousParties[0].blocs).toHaveLength(1);
      expect(result.parties[0].sousParties[0].blocs[0].titre).toBe('Prompt');
      expect(result.parties[0].sousParties[0].blocs[0].typeDeContenu).toBe('Prompt');
      expect(result.parties[0].sousParties[0].blocs[0].contenuParse[0].content).toBe('Mon prompt 2');
    });
  });

  describe('Test 4 - Une partie, une sous-partie, un bloc Prompt et un bloc Résultat technique', () => {
    it('devrait parser une partie avec une sous-partie, un bloc Prompt et un bloc Résultat technique (nouveaux niveaux)', () => {
      // Avec décalage +2 : # dans MD → h3, ## dans MD → h4, ### dans MD → h5
      const markdown = `# Ma partie 4
## Ma sous-partie 3
### Prompt
Mon prompt 3
### Résultat technique
Mon résultat technique 3`;
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].titre).toBe('Ma partie 4');
      expect(result.parties[0].sousParties).toHaveLength(1);
      expect(result.parties[0].sousParties[0].titre).toBe('Ma sous-partie 3');
      expect(result.parties[0].sousParties[0].blocs).toHaveLength(2);
      expect(result.parties[0].sousParties[0].blocs[0].titre).toBe('Prompt');
      expect(result.parties[0].sousParties[0].blocs[0].typeDeContenu).toBe('Prompt');
      expect(result.parties[0].sousParties[0].blocs[0].contenuParse[0].content).toBe('Mon prompt 3');
      expect(result.parties[0].sousParties[0].blocs[1].titre).toBe('Résultat technique');
      expect(result.parties[0].sousParties[0].blocs[1].typeDeContenu).toBe('Résultat technique');
      expect(result.parties[0].sousParties[0].blocs[1].contenuParse[0].content).toBe('Mon résultat technique 3');
    });
  });

  describe('Test 5 - Une partie et 2 sous-parties avec blocs', () => {
    it('devrait parser une partie avec plusieurs sous-parties et blocs (nouveaux niveaux)', () => {
      // Avec décalage +2 : # dans MD → h3, ## dans MD → h4, ### dans MD → h5
      const markdown = `# Ma partie 5
## Ma sous-partie 4
### Prompt
Mon prompt 4
### Résultat technique
Mon résultat technique 4
## Ma sous-partie 5
### Prompt
Mon prompt 5
### Résultat technique
Mon résultat technique 5`;
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].titre).toBe('Ma partie 5');
      expect(result.parties[0].sousParties).toHaveLength(2);
      
      // Première sous-partie
      expect(result.parties[0].sousParties[0].titre).toBe('Ma sous-partie 4');
      expect(result.parties[0].sousParties[0].blocs).toHaveLength(2);
      expect(result.parties[0].sousParties[0].blocs[0].contenuParse[0].content).toBe('Mon prompt 4');
      expect(result.parties[0].sousParties[0].blocs[1].contenuParse[0].content).toBe('Mon résultat technique 4');
      
      // Deuxième sous-partie
      expect(result.parties[0].sousParties[1].titre).toBe('Ma sous-partie 5');
      expect(result.parties[0].sousParties[1].blocs).toHaveLength(2);
      expect(result.parties[0].sousParties[1].blocs[0].contenuParse[0].content).toBe('Mon prompt 5');
      expect(result.parties[0].sousParties[1].blocs[1].contenuParse[0].content).toBe('Mon résultat technique 5');
    });
  });

  describe('Test 6 - Cas réel avec lignes vides', () => {
    it('devrait parser un bloc Prompt avec des lignes vides dans le contenu', () => {
      // Avec décalage +2 : # dans MD → h3, ## dans MD → h4, ### dans MD → h5
      const markdown = `# Ma partie 6
## Ma sous-partie 6
### Prompt
Mon prompt 6 avec plusieurs lignes

Et une ligne vide au milieu
### Résultat technique
Mon résultat technique 6`;
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      expect(result.parties[0].sousParties[0].blocs).toHaveLength(2);
      // Vérifier que le contenu du bloc Prompt contient les deux paragraphes (ligne vide = 2 paragraphes)
      expect(result.parties[0].sousParties[0].blocs[0].contenuParse.length).toBeGreaterThanOrEqual(1);
      const promptContent = result.parties[0].sousParties[0].blocs[0].contenuParse.map(e => e.content).join(' ');
      expect(promptContent).toContain('Mon prompt 6');
      expect(promptContent).toContain('ligne vide');
      expect(result.parties[0].sousParties[0].blocs[1].contenuParse[0].content).toBe('Mon résultat technique 6');
    });
  });

  describe('Test 7 - Cas réel du fichier journal', () => {
    it('devrait parser un exemple réel du journal', () => {
      // Avec décalage +2 : # dans MD → h3, ## dans MD → h4, ### dans MD → h5
      const markdown = `# Refactorisation de la couleur en variable CSS
## Refactorisation de la couleur en variable CSS
### Prompt
Faire en sorte que la couleur bleue ne soit pas évoquée directement dans le code par #0070C0 mais plutôt par une variable qui soit nommée "BleuFoncé". Ainsi, si je veux changer la couleur elle sera cohérente sur tout le site.

### Résultat technique
(commit \`a78db21\`) : Refactorisation de la couleur bleue en variable CSS \`--BleuFonce\` dans \`globals.css\``;
      
      const result = parseJournalMarkdown(markdown);
      
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].titre).toBe('Refactorisation de la couleur en variable CSS');
      expect(result.parties[0].sousParties).toHaveLength(1);
      expect(result.parties[0].sousParties[0].blocs).toHaveLength(2);
      expect(result.parties[0].sousParties[0].blocs[0].contenuParse[0].content).toContain('Faire en sorte');
      expect(result.parties[0].sousParties[0].blocs[0].contenuParse[0].content).toContain('BleuFoncé');
      expect(result.parties[0].sousParties[0].blocs[1].contenuParse[0].content).toContain('commit');
      expect(result.parties[0].sousParties[0].blocs[1].contenuParse[0].content).toContain('a78db21');
    });
  });
});
