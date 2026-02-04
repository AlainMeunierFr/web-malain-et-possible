/**
 * Tests unitaires pour markdownFormatter.ts
 * Backend pur : testable sans dépendance React/Next.js
 * 
 * APPROCHE TDD : Les tests montrent la progression du simple au complexe
 * - Test 1 : Le cas le plus simple (remplacer **Résultat technique** par ### Résultat technique)
 * - Test 2 : Ajouter ### Prompt avant le contenu après un H2
 * - Test 3 : Gérer plusieurs prompts
 * - Test 4 : Gérer le résultat technique sur la même ligne que du texte
 * - Test 5 : Cas limites (lignes vides, plusieurs lignes)
 */

import { formatJournalMarkdown, formatAllJournalFiles } from '../../utils/server';
import fs from 'fs';
import path from 'path';

// Mock fs
jest.mock('fs');
jest.mock('path');

describe('markdownFormatter - Approche TDD (simple → complexe)', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockPath = path as jest.Mocked<typeof path>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPath.join.mockImplementation((...args) => args.join('/'));
  });

  describe('formatJournalMarkdown', () => {
    // ITÉRATION 1 : Le cas le plus simple - remplacer **Résultat technique**
    it('should replace **Résultat technique** with ### Résultat technique', () => {
      const content = `## Section
# Titre prompt
**Résultat technique** : Mon résultat`;
      
      const result = formatJournalMarkdown(content);
      
      expect(result).toContain('### Résultat technique');
      expect(result).toContain('Mon résultat');
      expect(result).not.toContain('**Résultat technique**');
    });

    // ITÉRATION 2 : Ajouter ##### Prompt avant le contenu après un H4
    it('should add ##### Prompt before content after H4', () => {
      const content = `## Section
#### Titre prompt
Mon prompt texte`;
      
      const result = formatJournalMarkdown(content);
      
      expect(result).toContain('##### Prompt');
      expect(result).toContain('Mon prompt texte');
    });

    // ITÉRATION 3 : Gérer plusieurs prompts
    it('should handle multiple prompts', () => {
      const content = `## Section
#### Titre prompt 1
Mon prompt 1
**Résultat technique** : Mon résultat 1
#### Titre prompt 2
Mon prompt 2
**Résultat technique** : Mon résultat 2`;
      
      const result = formatJournalMarkdown(content);
      
      expect(result).toContain('##### Prompt');
      expect(result).toContain('Mon prompt 1');
      expect(result).toContain('Mon prompt 2');
      expect(result).toContain('##### Résultat technique');
      expect(result).toContain('Mon résultat 1');
      expect(result).toContain('Mon résultat 2');
    });

    // ITÉRATION 4 : Gérer le résultat technique sur la même ligne que du texte
    it('should handle **Résultat technique** on the same line as text', () => {
      const content = `## Section
# Titre
Mon texte **Résultat technique** : Mon résultat`;
      
      const result = formatJournalMarkdown(content);
      
      expect(result).toContain('### Résultat technique');
      expect(result).toContain('Mon résultat');
    });

    // ITÉRATION 5 : Cas limites
    describe('Edge cases', () => {
      it('should handle empty lines', () => {
        const content = `## Section
#### Titre

Mon prompt`;
        
        const result = formatJournalMarkdown(content);
        
        // ##### Prompt devrait être ajouté avant "Mon prompt" car il suit un H4
        expect(result).toContain('##### Prompt');
        expect(result).toContain('Mon prompt');
        // Vérifier que ##### Prompt vient avant Mon prompt
        const promptIndex = result.indexOf('##### Prompt');
        const contentIndex = result.indexOf('Mon prompt');
        expect(promptIndex).toBeLessThan(contentIndex);
      });

      it('should not add Prompt for H4 that contains "Résultat technique"', () => {
        const content = `## Section
#### Titre
Mon prompt
##### Résultat technique`;
        
        const result = formatJournalMarkdown(content);
        
        // Ne doit pas ajouter un deuxième Prompt
        const promptCount = (result.match(/##### Prompt/g) || []).length;
        expect(promptCount).toBe(1);
      });
    });
  });

  describe('formatAllJournalFiles', () => {
    // ITÉRATION 1 : Le cas le plus simple - formater un fichier
    it('should format a single journal file', () => {
      const journalDir = '/project/JOURNAL_DE_BORD';
      const filePath = '/project/JOURNAL_DE_BORD/2026-01-18.md';
      
      // path.join est appelé une fois dans la boucle pour créer le chemin du fichier
      mockPath.join.mockReturnValueOnce(filePath); // path.join(journalDir, file)
      mockFs.readdirSync.mockReturnValueOnce(['2026-01-18.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('## Section\n**Résultat technique** : Test');
      mockFs.writeFileSync.mockImplementationOnce(() => {});
      
      formatAllJournalFiles(journalDir);
      
      expect(mockFs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
      expect(mockFs.writeFileSync).toHaveBeenCalled();
    });

    // ITÉRATION 2 : Ignorer README.md et COURS
    it('should ignore README.md and COURS', () => {
      const journalDir = '/project/JOURNAL_DE_BORD';
      const filePath = '/project/JOURNAL_DE_BORD/2026-01-18.md';
      
      // path.join est appelé une fois dans la boucle pour créer le chemin du fichier
      mockPath.join.mockReturnValueOnce(filePath); // path.join(journalDir, file)
      mockFs.readdirSync.mockReturnValueOnce(['README.md', 'COURS', '2026-01-18.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('## Section\n**Résultat technique** : Test');
      mockFs.writeFileSync.mockImplementationOnce(() => {});
      
      formatAllJournalFiles(journalDir);
      
      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(1);
      expect(mockFs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
    });
  });
});
