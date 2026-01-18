/**
 * Tests TDD pour aboutSiteReader.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * Tests de validation des règles métier :
 * - Validation titres H1/H2 interdits
 * - Validation H4 sans H3
 * - Fichiers vides ignorés
 * - Fichiers non-MD ignorés
 * - Dossiers sans fichiers valides non affichés
 * - Dossiers avec un seul fichier valide = erreur
 */

import fs from 'fs';
import path from 'path';
import { readAboutSiteStructure, validerContenuMarkdown, ValidationError } from '../../utils/aboutSiteReader';

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

  describe('Test 1 : Cas simple - un chapitre avec deux sections', () => {
    it('devrait retourner un chapitre avec deux sections', () => {
      // ARRANGE : Simuler un dossier avec deux fichiers MD valides
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/1. A propos du projet';
      const section1Path = '/project/A propos de ce site/1. A propos du projet/Section 1.md';
      const section2Path = '/project/A propos de ce site/1. A propos du projet/Section 2.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)  // Premier appel : aboutSiteDir
        .mockReturnValueOnce(chapterDir)    // Deuxième appel : chapitreDir
        .mockReturnValueOnce(section1Path)  // Troisième appel : section1Path
        .mockReturnValueOnce(section2Path)  // Quatrième appel : section2Path
        .mockReturnValueOnce(section1Path)  // Cinquième appel : section1Path (validation)
        .mockReturnValueOnce(section2Path); // Sixième appel : section2Path (validation)

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false },
          { name: 'Section 2.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync
        .mockReturnValueOnce('### Partie 1\nContenu de la section 1.')
        .mockReturnValueOnce('### Partie 2\nContenu de la section 2.');

      // ACT
      const result = readAboutSiteStructure();

      // ASSERT
      expect(result.chapitres).toHaveLength(1);
      expect(result.chapitres[0].nom).toBe('1. A propos du projet');
      expect(result.chapitres[0].sections).toHaveLength(2);
      expect(result.chapitres[0].sections[0].nom).toBe('Section 1');
      expect(result.chapitres[0].sections[1].nom).toBe('Section 2');
    });
  });

  describe('Test 2 : Cas multiple - un chapitre avec plusieurs sections', () => {
    it('devrait retourner un chapitre avec plusieurs sections triées', () => {
      // ARRANGE : Simuler un dossier avec plusieurs fichiers MD valides
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/2. Definition of Done (DOD)';
      const section1Path = '/project/A propos de ce site/2. Definition of Done (DOD)/1. Règles générales.md';
      const section2Path = '/project/A propos de ce site/2. Definition of Done (DOD)/2. Règles pour les back-end métier.md';
      const section3Path = '/project/A propos de ce site/2. Definition of Done (DOD)/3. Règles pour le back-end Node.js.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)  // Premier appel : aboutSiteDir
        .mockReturnValueOnce(chapterDir)    // Deuxième appel : chapitreDir
        .mockReturnValueOnce(section1Path)  // Troisième appel : section1Path
        .mockReturnValueOnce(section2Path)  // Quatrième appel : section2Path
        .mockReturnValueOnce(section3Path)  // Cinquième appel : section3Path
        .mockReturnValueOnce(section1Path)  // Sixième appel : section1Path (validation)
        .mockReturnValueOnce(section2Path)  // Septième appel : section2Path (validation)
        .mockReturnValueOnce(section3Path); // Huitième appel : section3Path (validation)

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '2. Definition of Done (DOD)', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: '3. Règles pour le back-end Node.js.md', isDirectory: () => false },
          { name: '1. Règles générales.md', isDirectory: () => false },
          { name: '2. Règles pour les back-end métier.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync.mockReturnValue('### Partie\nContenu');

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
      const section1Path = '/project/A propos de ce site/1. A propos du projet/Section 1.md';
      const section2Path = '/project/A propos de ce site/1. A propos du projet/Section 2.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)  // Premier appel : aboutSiteDir
        .mockReturnValueOnce(chapterDir)    // Deuxième appel : chapitreDir
        .mockReturnValueOnce(section1Path)  // Troisième appel : section1Path
        .mockReturnValueOnce(section2Path)  // Quatrième appel : section2Path
        .mockReturnValueOnce(section1Path)  // Cinquième appel : section1Path (validation)
        .mockReturnValueOnce(section2Path); // Sixième appel : section2Path (validation)

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false },
          { name: 'fichier.txt', isDirectory: () => false },
          { name: 'autre.pdf', isDirectory: () => false },
          { name: 'Section 2.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync.mockReturnValue('### Partie\nContenu');

      // ACT
      const result = readAboutSiteStructure();

      // ASSERT
      expect(result.chapitres[0].sections).toHaveLength(2);
      expect(result.chapitres[0].sections[0].nom).toBe('Section 1');
      expect(result.chapitres[0].sections[1].nom).toBe('Section 2');
    });
  });

  describe('Test 4 : Cas avec plusieurs chapitres', () => {
    it('devrait retourner plusieurs chapitres avec leurs sections', () => {
      // ARRANGE : Simuler plusieurs dossiers avec fichiers MD
      const aboutSiteDir = '/project/A propos de ce site';
      const chapter1Dir = '/project/A propos de ce site/1. A propos du projet';
      const chapter2Dir = '/project/A propos de ce site/2. Definition of Done (DOD)';
      const section1Path = '/project/A propos de ce site/1. A propos du projet/Section 1.md';
      const section2Path = '/project/A propos de ce site/1. A propos du projet/Section 2.md';
      const section3Path = '/project/A propos de ce site/2. Definition of Done (DOD)/Section 1.md';
      const section4Path = '/project/A propos de ce site/2. Definition of Done (DOD)/Section 2.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)  // Premier appel : aboutSiteDir
        .mockReturnValueOnce(chapter1Dir)   // Deuxième appel : chapitre1Dir
        .mockReturnValueOnce(section1Path)  // Troisième appel : section1Path
        .mockReturnValueOnce(section2Path)  // Quatrième appel : section2Path
        .mockReturnValueOnce(section1Path)  // Cinquième appel : section1Path (validation)
        .mockReturnValueOnce(section2Path)  // Sixième appel : section2Path (validation)
        .mockReturnValueOnce(chapter2Dir)   // Septième appel : chapitre2Dir
        .mockReturnValueOnce(section3Path)  // Huitième appel : section3Path
        .mockReturnValueOnce(section4Path)  // Neuvième appel : section4Path
        .mockReturnValueOnce(section3Path)  // Dixième appel : section3Path (validation)
        .mockReturnValueOnce(section4Path); // Onzième appel : section4Path (validation)

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
          { name: '2. Definition of Done (DOD)', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false },
          { name: 'Section 2.md', isDirectory: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false },
          { name: 'Section 2.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync.mockReturnValue('### Partie\nContenu');

      // ACT
      const result = readAboutSiteStructure();

      // ASSERT
      expect(result.chapitres).toHaveLength(2);
      expect(result.chapitres[0].nom).toBe('1. A propos du projet');
      expect(result.chapitres[0].sections).toHaveLength(2);
      expect(result.chapitres[1].nom).toBe('2. Definition of Done (DOD)');
      expect(result.chapitres[1].sections).toHaveLength(2);
    });
  });

  describe('Test 5 : Cas vide - chapitre sans sections valides', () => {
    it('devrait ne pas retourner un chapitre sans sections valides', () => {
      // ARRANGE : Simuler un dossier sans fichiers MD valides
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
      expect(result.chapitres).toHaveLength(0);
    });
  });

  describe('Test 6 : Erreur - chapitre avec un seul fichier MD valide', () => {
    it('devrait lever une ValidationError si un chapitre contient un seul fichier MD valide', () => {
      // ARRANGE : Simuler un dossier avec un seul fichier MD valide
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/1. A propos du projet';
      const sectionPath = '/project/A propos de ce site/1. A propos du projet/Section 1.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)
        .mockReturnValueOnce(chapterDir)
        .mockReturnValueOnce(sectionPath)
        .mockReturnValueOnce(sectionPath); // Validation

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync.mockReturnValue('### Partie\nContenu');

      // ACT & ASSERT
      expect(() => readAboutSiteStructure()).toThrow(ValidationError);
      expect(() => readAboutSiteStructure()).toThrow(/au moins 2 sections/);
    });
  });

  describe('Test 7 : Erreur - fichier MD avec titre H1', () => {
    it('devrait lever une ValidationError si un fichier contient un titre H1', () => {
      // ARRANGE : Simuler un fichier avec titre H1
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/1. A propos du projet';
      const section1Path = '/project/A propos de ce site/1. A propos du projet/Section 1.md';
      const section2Path = '/project/A propos de ce site/1. A propos du projet/Section 2.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)
        .mockReturnValueOnce(chapterDir)
        .mockReturnValueOnce(section1Path)
        .mockReturnValueOnce(section2Path)
        .mockReturnValueOnce(section1Path); // Validation qui échoue

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false },
          { name: 'Section 2.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync
        .mockReturnValueOnce('# Titre H1\nContenu') // Fichier invalide avec H1
        .mockReturnValueOnce('### Partie\nContenu');

      // ACT & ASSERT
      expect(() => readAboutSiteStructure()).toThrow(ValidationError);
      expect(() => readAboutSiteStructure()).toThrow(/titre de niveau 1/);
    });
  });

  describe('Test 8 : Erreur - fichier MD avec titre H2', () => {
    it('devrait lever une ValidationError si un fichier contient un titre H2', () => {
      // ARRANGE : Simuler un fichier avec titre H2
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/1. A propos du projet';
      const section1Path = '/project/A propos de ce site/1. A propos du projet/Section 1.md';
      const section2Path = '/project/A propos de ce site/1. A propos du projet/Section 2.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)
        .mockReturnValueOnce(chapterDir)
        .mockReturnValueOnce(section1Path)
        .mockReturnValueOnce(section2Path)
        .mockReturnValueOnce(section1Path); // Validation qui échoue

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false },
          { name: 'Section 2.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync
        .mockReturnValueOnce('## Titre H2\nContenu') // Fichier invalide avec H2
        .mockReturnValueOnce('### Partie\nContenu');

      // ACT & ASSERT
      expect(() => readAboutSiteStructure()).toThrow(ValidationError);
      expect(() => readAboutSiteStructure()).toThrow(/titre de niveau 2/);
    });
  });

  describe('Test 9 : Erreur - fichier MD avec H4 sans H3', () => {
    it('devrait lever une ValidationError si un fichier contient H4 sans H3', () => {
      // ARRANGE : Simuler un fichier avec H4 sans H3
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/1. A propos du projet';
      const section1Path = '/project/A propos de ce site/1. A propos du projet/Section 1.md';
      const section2Path = '/project/A propos de ce site/1. A propos du projet/Section 2.md';
      
      mockPath.join
        .mockReturnValueOnce(aboutSiteDir)
        .mockReturnValueOnce(chapterDir)
        .mockReturnValueOnce(section1Path)
        .mockReturnValueOnce(section2Path)
        .mockReturnValueOnce(section1Path); // Validation qui échoue

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false },
          { name: 'Section 2.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      mockFs.readFileSync
        .mockReturnValueOnce('#### Sous-partie sans partie\nContenu') // Fichier invalide : H4 sans H3
        .mockReturnValueOnce('### Partie\nContenu');

      // ACT & ASSERT
      expect(() => readAboutSiteStructure()).toThrow(ValidationError);
      expect(() => readAboutSiteStructure()).toThrow(/titre de niveau 4.*sans titre de niveau 3/);
    });
  });

  describe('Test 10 : Ignorer fichiers MD vides', () => {
    it('devrait ignorer les fichiers MD vides', () => {
      // ARRANGE : Simuler des fichiers MD dont certains sont vides
      const aboutSiteDir = '/project/A propos de ce site';
      const chapterDir = '/project/A propos de ce site/1. A propos du projet';
      const section1Path = '/project/A propos de ce site/1. A propos du projet/Section 1.md';
      const videPath = '/project/A propos de ce site/1. A propos du projet/vide.md';
      const section2Path = '/project/A propos de ce site/1. A propos du projet/Section 2.md';
      
      let callCount = 0;
      mockPath.join.mockImplementation((...args) => {
        callCount++;
        if (callCount === 1) return aboutSiteDir;
        if (callCount === 2) return chapterDir;
        if (callCount === 3) return section1Path;
        if (callCount === 4) return videPath;
        if (callCount === 5) return section2Path;
        if (callCount === 6) return section1Path; // Validation
        if (callCount === 7) return section2Path; // Validation
        return args.join('/');
      });

      mockFs.readdirSync
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false },
          { name: 'vide.md', isDirectory: () => false },
          { name: 'Section 2.md', isDirectory: () => false },
        ] as fs.Dirent[]);

      let readCount = 0;
      mockFs.readFileSync.mockImplementation((filePath: string) => {
        readCount++;
        if (readCount === 1) return '### Partie 1\nContenu section 1';
        if (readCount === 2) return ''; // Fichier vide
        if (readCount === 3) return '### Partie 2\nContenu section 2';
        return '';
      });

      // ACT
      const result = readAboutSiteStructure();

      // ASSERT : Les fichiers vides doivent être ignorés
      expect(result.chapitres).toHaveLength(1);
      expect(result.chapitres[0].sections).toHaveLength(2);
      expect(result.chapitres[0].sections.map(s => s.nom)).not.toContain('vide');
    });
  });
});

/**
 * Tests TDD pour validerContenuMarkdown
 * APPROCHE TDD : Du simple au complexe
 * 
 * ÉTAPE 1 (RED) : Écrire le test, constater qu'il échoue
 * ÉTAPE 2 (GREEN) : Écrire le code minimal pour faire passer le test
 * ÉTAPE 3 (REFACTOR) : Améliorer le code si nécessaire
 * 
 * ITÉRATION 1 : Détecter un titre H1 (le cas le plus simple)
 * ITÉRATION 2 : Détecter un titre H2
 * ITÉRATION 3 : Détecter H4 sans H3
 * ITÉRATION 4 : Ignorer les blocs de code markdown
 * ITÉRATION 5 : Fichier vide ne doit pas lever d'erreur
 */

import { validerContenuMarkdown, ValidationError } from '../../utils/aboutSiteReader';

describe('validerContenuMarkdown - APPROCHE TDD', () => {
  describe('ITÉRATION 1 : Le cas le plus simple - détecter un titre H1', () => {
    it('devrait lever une ValidationError pour un fichier contenant un titre H1', () => {
      // ARRANGE : Cas d'erreur le plus simple
      const contenu = '# Titre H1\nContenu du fichier';
      const filePath = 'test.md';

      // ACT & ASSERT : Constater que la fonction lance une ValidationError
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(ValidationError);
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(/titre de niveau 1/);
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(/doivent commencer au niveau 3/);
    });
  });

  describe('ITÉRATION 2 : Détecter un titre H2', () => {
    it('devrait lever une ValidationError pour un fichier contenant un titre H2', () => {
      // ARRANGE : Cas d'erreur avec H2
      const contenu = '## Titre H2\nContenu du fichier';
      const filePath = 'test.md';

      // ACT & ASSERT
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(ValidationError);
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(/titre de niveau 2/);
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(/doivent commencer au niveau 3/);
    });
  });

  describe('ITÉRATION 3 : Détecter H4 sans H3', () => {
    it('devrait lever une ValidationError si un fichier contient H4 sans H3', () => {
      // ARRANGE : Cas d'erreur avec H4 sans H3
      const contenu = '#### Sous-partie\nContenu';
      const filePath = 'test.md';

      // ACT & ASSERT
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(ValidationError);
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(/titre de niveau 4.*sans titre de niveau 3/);
    });

    it('ne devrait pas lever d\'erreur si H4 est présent avec H3', () => {
      // ARRANGE : Cas valide - H4 avec H3
      const contenu = '### Partie\n#### Sous-partie\nContenu';
      const filePath = 'test.md';

      // ACT & ASSERT : Ne doit pas lever d'erreur
      expect(() => validerContenuMarkdown(contenu, filePath)).not.toThrow();
    });
  });

  describe('ITÉRATION 4 : Ignorer les blocs de code markdown', () => {
    it('ne devrait pas détecter les titres dans les blocs de code markdown', () => {
      // ARRANGE : Cas avec H1 dans un bloc de code (ne doit pas lever d'erreur)
      const contenu = `### Partie valide

\`\`\`bash
# 1. Commande git
git status
\`\`\`

Contenu normal.`;
      const filePath = 'test.md';

      // ACT & ASSERT : Ne doit pas lever d'erreur car le H1 est dans un bloc de code
      expect(() => validerContenuMarkdown(contenu, filePath)).not.toThrow();
    });
  });

  describe('ITÉRATION 5 : Fichier vide ne doit pas lever d\'erreur', () => {
    it('ne devrait pas lever d\'erreur pour un fichier vide', () => {
      // ARRANGE : Cas fichier vide
      const contenu = '';
      const filePath = 'test.md';

      // ACT & ASSERT : Ne doit pas lever d'erreur
      expect(() => validerContenuMarkdown(contenu, filePath)).not.toThrow();
    });

    it('ne devrait pas lever d\'erreur pour un fichier avec uniquement des espaces', () => {
      // ARRANGE : Cas fichier avec uniquement des espaces
      const contenu = '   \n\n  \n';
      const filePath = 'test.md';

      // ACT & ASSERT : Ne doit pas lever d'erreur
      expect(() => validerContenuMarkdown(contenu, filePath)).not.toThrow();
    });
  });
});
