/**
 * Tests unitaires pour journalReader.ts
 * Backend pur : testable sans dépendance React/Next.js
 * 
 * APPROCHE TDD : Les tests montrent la progression du simple au complexe
 * - Test 1 : Le cas le plus simple (lire un seul fichier journal)
 * - Test 2 : Lire plusieurs fichiers journaux
 * - Test 3 : Ignorer README.md et COURS
 * - Test 4 : Extraire la date du nom de fichier
 * - Test 5 : Extraire le titre du contenu
 * - Test 6 : Ajuster les niveaux de titres
 * - Test 7 : Trier les fichiers par date
 * - Test 8 : Lire les fichiers cours
 */

import fs from 'fs';
import path from 'path';
import { readJournalFiles, readCourseFiles, type JournalFile, type CourseFile } from '../../utils/journalReader';
import { adjustMarkdownTitleLevels } from '../../utils/markdownTitleAdjuster';

// Mock fs
jest.mock('fs');
jest.mock('path');
jest.mock('../../utils/markdownTitleAdjuster');

describe('journalReader - Approche TDD (simple → complexe)', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;
  const mockPath = path as jest.Mocked<typeof path>;
  const mockAdjustMarkdownTitleLevels = adjustMarkdownTitleLevels as jest.MockedFunction<typeof adjustMarkdownTitleLevels>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock process.cwd() via jest.spyOn
    jest.spyOn(process, 'cwd').mockReturnValue('/project');
    mockPath.join.mockImplementation((...args) => args.join('/'));
    mockAdjustMarkdownTitleLevels.mockImplementation((content) => content);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('readJournalFiles', () => {
    // ITÉRATION 1 : Le cas le plus simple - lire un seul fichier journal
    it('should read a single journal file', () => {
      const journalDir = 'JOURNAL_DE_BORD';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${journalDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['2026-01-18.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('# Journal du 18 janvier');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('# Journal du 18 janvier');
      
      const result = readJournalFiles();
      
      expect(result).toHaveLength(1);
      expect(result[0].filename).toBe('2026-01-18.md');
    });

    // ITÉRATION 2 : Lire plusieurs fichiers journaux
    it('should read multiple journal files', () => {
      const journalDir = 'JOURNAL_DE_BORD';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${journalDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['2026-01-17.md', '2026-01-18.md'] as any);
      mockFs.readFileSync
        .mockReturnValueOnce('# Journal du 17 janvier')
        .mockReturnValueOnce('# Journal du 18 janvier');
      mockAdjustMarkdownTitleLevels
        .mockReturnValueOnce('# Journal du 17 janvier')
        .mockReturnValueOnce('# Journal du 18 janvier');
      
      const result = readJournalFiles();
      
      expect(result).toHaveLength(2);
      expect(result[0].filename).toBe('2026-01-17.md');
      expect(result[1].filename).toBe('2026-01-18.md');
    });

    // ITÉRATION 3 : Ignorer README.md et COURS
    it('should ignore README.md and COURS directory', () => {
      const journalDir = 'JOURNAL_DE_BORD';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${journalDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['README.md', 'COURS', '2026-01-18.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('# Journal du 18 janvier');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('# Journal du 18 janvier');
      
      const result = readJournalFiles();
      
      expect(result).toHaveLength(1);
      expect(result[0].filename).toBe('2026-01-18.md');
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(1);
    });

    // ITÉRATION 4 : Extraire la date du nom de fichier
    it('should extract date from filename', () => {
      const journalDir = 'JOURNAL_DE_BORD';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${journalDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['2026-01-18.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('# Journal du 18 janvier');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('# Journal du 18 janvier');
      
      const result = readJournalFiles();
      
      expect(result[0].date).toBe('2026-01-18');
    });

    // ITÉRATION 5 : Extraire le titre du contenu
    it('should extract title from content', () => {
      const journalDir = 'JOURNAL_DE_BORD';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${journalDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['2026-01-18.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('## Formation et documentation\n\nContenu du journal...');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('## Formation et documentation\n\nContenu du journal...');
      
      const result = readJournalFiles();
      
      expect(result[0].title).toBe('Formation et documentation');
    });

    // ITÉRATION 6 : Ajuster les niveaux de titres
    it('should adjust markdown title levels', () => {
      const journalDir = 'JOURNAL_DE_BORD';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${journalDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['2026-01-18.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('## Formation');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('### Formation');
      
      const result = readJournalFiles();
      
      expect(result[0].content).toBe('### Formation');
      expect(mockAdjustMarkdownTitleLevels).toHaveBeenCalledWith('## Formation');
    });

    // ITÉRATION 7 : Trier les fichiers par date
    it('should sort files by date', () => {
      const journalDir = 'JOURNAL_DE_BORD';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${journalDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['2026-01-18.md', '2026-01-17.md', '2026-01-19.md'] as any);
      mockFs.readFileSync
        .mockReturnValueOnce('# Journal du 18')
        .mockReturnValueOnce('# Journal du 17')
        .mockReturnValueOnce('# Journal du 19');
      mockAdjustMarkdownTitleLevels
        .mockReturnValueOnce('# Journal du 18')
        .mockReturnValueOnce('# Journal du 17')
        .mockReturnValueOnce('# Journal du 19');
      
      const result = readJournalFiles();
      
      expect(result).toHaveLength(3);
      expect(result[0].date).toBe('2026-01-17');
      expect(result[1].date).toBe('2026-01-18');
      expect(result[2].date).toBe('2026-01-19');
    });

    // ITÉRATION 8 : Retourner un tableau vide si le dossier n'existe pas
    it('should return empty array if directory does not exist', () => {
      const journalDir = 'JOURNAL_DE_BORD';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${journalDir}`);
      mockFs.existsSync.mockReturnValueOnce(false);
      
      const result = readJournalFiles();
      
      expect(result).toHaveLength(0);
      expect(mockFs.readdirSync).not.toHaveBeenCalled();
    });

    // Test couverture : Titre sans markdown (ligne 77)
    it('should extract title from plain text (not markdown)', () => {
      const journalDir = 'JOURNAL_DE_BORD';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${journalDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['2026-01-18.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('Simple plain text title\n\nContenu du journal...');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('Simple plain text title\n\nContenu du journal...');
      
      const result = readJournalFiles();
      
      expect(result[0].title).toBe('Simple plain text title');
    });
  });

  describe('readCourseFiles', () => {
    // ITÉRATION 1 : Le cas le plus simple - lire un seul fichier cours
    it('should read a single course file', () => {
      const coursesDir = 'JOURNAL_DE_BORD/COURS';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${coursesDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['01. Les fondamentaux de Git.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('### Les fondamentaux de Git\n\nContenu...');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('#### Les fondamentaux de Git\n\nContenu...');
      
      const result = readCourseFiles();
      
      expect(result).toHaveLength(1);
      expect(result[0].filename).toBe('01. Les fondamentaux de Git.md');
    });

    // ITÉRATION 2 : Extraire le titre du contenu
    it('should extract title from H4 (after adjustment)', () => {
      const coursesDir = 'JOURNAL_DE_BORD/COURS';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${coursesDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['01. Git.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('### Git');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('#### Git');
      
      const result = readCourseFiles();
      
      expect(result[0].title).toBe('Git');
    });

    // ITÉRATION 3 : Trier les fichiers par nom
    it('should sort files alphabetically by filename', () => {
      const coursesDir = 'JOURNAL_DE_BORD/COURS';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${coursesDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['02. TypeScript.md', '01. Git.md', '03. Next.js.md'] as any);
      mockFs.readFileSync
        .mockReturnValueOnce('### TypeScript')
        .mockReturnValueOnce('### Git')
        .mockReturnValueOnce('### Next.js');
      mockAdjustMarkdownTitleLevels
        .mockReturnValueOnce('#### TypeScript')
        .mockReturnValueOnce('#### Git')
        .mockReturnValueOnce('#### Next.js');
      
      const result = readCourseFiles();
      
      expect(result).toHaveLength(3);
      expect(result[0].filename).toBe('01. Git.md');
      expect(result[1].filename).toBe('02. TypeScript.md');
      expect(result[2].filename).toBe('03. Next.js.md');
    });

    // ITÉRATION 4 : Retourner un tableau vide si le dossier n'existe pas
    it('should return empty array if directory does not exist', () => {
      const coursesDir = 'JOURNAL_DE_BORD/COURS';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${coursesDir}`);
      mockFs.existsSync.mockReturnValueOnce(false);
      
      const result = readCourseFiles();
      
      expect(result).toHaveLength(0);
      expect(mockFs.readdirSync).not.toHaveBeenCalled();
    });

    // NOUVELLE ITÉRATION : Ignorer les fichiers non-.md
    it('should ignore non-.md files', () => {
      const coursesDir = 'JOURNAL_DE_BORD/COURS';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${coursesDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['README.txt', '01. Git.md', 'image.png'] as any);
      mockFs.readFileSync.mockReturnValueOnce('### Git');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('#### Git');
      
      const result = readCourseFiles();
      
      expect(result).toHaveLength(1);
      expect(result[0].filename).toBe('01. Git.md');
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(1);
    });

    // NOUVELLE ITÉRATION : Fallback pour titre H3 (non ajusté)
    it('should extract title from H3 as fallback', () => {
      const coursesDir = 'JOURNAL_DE_BORD/COURS';
      const mockCwd = '/project';
      
      mockPath.join.mockReturnValueOnce(`${mockCwd}/${coursesDir}`);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readdirSync.mockReturnValueOnce(['01. Git.md'] as any);
      mockFs.readFileSync.mockReturnValueOnce('### Git Basics');
      mockAdjustMarkdownTitleLevels.mockReturnValueOnce('### Git Basics\n\nContent...'); // Pas ajusté
      
      const result = readCourseFiles();
      
      expect(result[0].title).toBe('Git Basics');
    });
  });
});
