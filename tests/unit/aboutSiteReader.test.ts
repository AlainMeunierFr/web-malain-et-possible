/**
 * Tests TDD pour aboutSiteReader.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * Test 1 : Lister les dossiers (chapitres) dans "A propos de ce site"
 * Test 2 : Lister les fichiers MD (sections) dans chaque dossier
 * Test 3 : Extraire le contenu des fichiers MD
 */

import fs from 'fs';
import path from 'path';
import { readAboutSiteStructure } from '../../utils/aboutSiteReader';

// Mock fs
jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('readAboutSiteStructure', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, 'cwd').mockReturnValue('/project');
    // Mock path.join pour concaténer les arguments avec '/'
    mockPath.join.mockImplementation((...args) => args.join('/'));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Test 1 : Cas simple - un chapitre avec une section', () => {
    it('devrait retourner un chapitre avec une section', () => {
      // ARRANGE : Simuler un dossier avec un fichier MD
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/1. A propos du projet';
      const sectionPath = '/project/A propos de ce site/1. A propos du projet/A propos du projet.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir) // Premier appel : aboutSiteDir
        .mockReturnValueOnce(chapterDir)   // Deuxième appel : chapitreDir
        .mockReturnValueOnce(sectionPath); // Troisième appel : sectionPath

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'A propos du projet.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync.mockReturnValue('# Titre\n\nContenu du fichier');

      // ACT
      const result = readAboutSiteStructure();

      // ASSERT
      expect(result.chapitres).toHaveLength(1);
      expect(result.chapitres[0].nom).toBe('1. A propos du projet');
      expect(result.chapitres[0].sections).toHaveLength(1);
      expect(result.chapitres[0].sections[0].nom).toBe('A propos du projet');
      expect(mockFs.readdirSync).toHaveBeenCalledWith(aboutSiteDir, { withFileTypes: true });
      expect(mockFs.readdirSync).toHaveBeenCalledWith(chapterDir, { withFileTypes: true });
      expect(mockFs.readFileSync).toHaveBeenCalledWith(sectionPath, 'utf8');
    });
  });

  describe('Test 2 : Cas multiple - un chapitre avec plusieurs sections', () => {
    it('devrait retourner un chapitre avec plusieurs sections triées', () => {
      // ARRANGE : Simuler un dossier avec plusieurs fichiers MD
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/2. Definition of Done (DOD)';
      const section1Path = '/project/A propos de ce site/2. Definition of Done (DOD)/1. Règles générales.md';
      const section2Path = '/project/A propos de ce site/2. Definition of Done (DOD)/2. Règles pour les back-end métier.md';
      const section3Path = '/project/A propos de ce site/2. Definition of Done (DOD)/3. Règles pour le back-end Node.js.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir) // Premier appel : aboutSiteDir
        .mockReturnValueOnce(chapterDir)   // Deuxième appel : chapitreDir
        .mockReturnValueOnce(section1Path) // Troisième appel : section1Path
        .mockReturnValueOnce(section2Path) // Quatrième appel : section2Path
        .mockReturnValueOnce(section3Path); // Cinquième appel : section3Path

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '2. Definition of Done (DOD)', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: '3. Règles pour le back-end Node.js.md', isDirectory: () => false },
          { name: '1. Règles générales.md', isDirectory: () => false },
          { name: '2. Règles pour les back-end métier.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync.mockReturnValue('# Contenu\n\nTexte');

      // ACT
      const result = readAboutSiteStructure();

      // ASSERT
      expect(result.chapitres[0].sections).toHaveLength(3);
      expect(result.chapitres[0].sections[0].nom).toBe('1. Règles générales');
      expect(result.chapitres[0].sections[1].nom).toBe('2. Règles pour les back-end métier');
      expect(result.chapitres[0].sections[2].nom).toBe('3. Règles pour le back-end Node.js');
    });
  });

  describe('Test 3 : Cas avec fichiers non-MD mélangés', () => {
    it('devrait ignorer les fichiers non-MD', () => {
      // ARRANGE : Simuler des fichiers MD et non-MD mélangés
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/1. A propos du projet';
      const sectionPath = '/project/A propos de ce site/1. A propos du projet/A propos du projet.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir) // Premier appel : aboutSiteDir
        .mockReturnValueOnce(chapterDir)   // Deuxième appel : chapitreDir
        .mockReturnValueOnce(sectionPath); // Troisième appel : sectionPath

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'A propos du projet.md', isDirectory: () => false },
          { name: 'fichier.txt', isDirectory: () => false },
          { name: 'autre.pdf', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync.mockReturnValue('# Contenu\n\nTexte');

      // ACT
      const result = readAboutSiteStructure();

      // ASSERT
      expect(result.chapitres[0].sections).toHaveLength(1);
      expect(result.chapitres[0].sections[0].nom).toBe('A propos du projet');
    });
  });

  describe('Test 4 : Cas avec plusieurs chapitres', () => {
    it('devrait retourner plusieurs chapitres avec leurs sections', () => {
      // ARRANGE : Simuler plusieurs dossiers avec fichiers MD
      const aboutSiteDir = '/project/A propos de ce site';
      const chapter1Dir = '/project/A propos de ce site/1. A propos du projet';
      const chapter2Dir = '/project/A propos de ce site/2. Definition of Done (DOD)';
      const section1Path = '/project/A propos de ce site/1. A propos du projet/A propos du projet.md';
      const section2Path = '/project/A propos de ce site/2. Definition of Done (DOD)/1. Règles générales.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)  // Premier appel : aboutSiteDir
        .mockReturnValueOnce(chapter1Dir)   // Deuxième appel : chapitre1Dir
        .mockReturnValueOnce(section1Path)  // Troisième appel : section1Path
        .mockReturnValueOnce(chapter2Dir)   // Quatrième appel : chapitre2Dir
        .mockReturnValueOnce(section2Path); // Cinquième appel : section2Path

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
          { name: '2. Definition of Done (DOD)', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'A propos du projet.md', isDirectory: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: '1. Règles générales.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync.mockReturnValue('# Contenu\n\nTexte');

      // ACT
      const result = readAboutSiteStructure();

      // ASSERT
      expect(result.chapitres).toHaveLength(2);
      expect(result.chapitres[0].nom).toBe('1. A propos du projet');
      expect(result.chapitres[0].sections).toHaveLength(1);
      expect(result.chapitres[1].nom).toBe('2. Definition of Done (DOD)');
      expect(result.chapitres[1].sections).toHaveLength(1);
    });
  });

  describe('Test 5 : Cas vide - chapitre sans sections', () => {
    it('devrait retourner un chapitre avec un tableau de sections vide', () => {
      // ARRANGE : Simuler un dossier sans fichiers MD
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/1. A propos du projet';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)
        .mockReturnValueOnce(chapterDir);

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([] as fs.Dirent[]);

      // ACT
      const result = readAboutSiteStructure();

      // ASSERT
      expect(result.chapitres[0].sections).toEqual([]);
    });
  });
});
