/**
 * Tests TDD pour aboutSiteReader.ts
 * APPROCHE TDD : Du simple au complexe
 * 
 * Tests de validation des règles métier :
 * - Validation H2 sans H1 (hiérarchie)
 * - Fichiers vides ignorés
 * - Fichiers non-MD ignorés
 * - Dossiers sans fichiers valides non affichés
 * - Dossiers avec un seul fichier valide = erreur
 */

import fs from 'fs';
import path from 'path';
import { readAboutSiteStructure, validerContenuMarkdown, ValidationError } from '../../utils/aboutSiteReader';

describe('readAboutSiteStructure', () => {
  let readdirSyncSpy: jest.SpyInstance;
  let readFileSyncSpy: jest.SpyInstance;
  let pathJoinSpy: jest.SpyInstance;
  let cwdSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue('/project');
    pathJoinSpy = jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));
    readdirSyncSpy = jest.spyOn(fs, 'readdirSync');
    readFileSyncSpy = jest.spyOn(fs, 'readFileSync');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Test 1 : Cas simple - un chapitre avec deux sections', () => {
    it('devrait retourner un chapitre avec deux sections', () => {
      // ARRANGE : Simuler un dossier avec deux fichiers MD valides
      pathJoinSpy.mockImplementation((...args) => args.join('/'));

      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false, isFile: () => true },
          { name: 'Section 2.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[]);

      readFileSyncSpy
        .mockReturnValueOnce('# Partie 1\nContenu de la section 1.')
        .mockReturnValueOnce('# Partie 2\nContenu de la section 2.');

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
      pathJoinSpy.mockImplementation((...args) => args.join('/'));

      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '2. Definition of Done (DOD)', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: '3. Règles pour le back-end Node.js.md', isDirectory: () => false, isFile: () => true },
          { name: '1. Règles générales.md', isDirectory: () => false, isFile: () => true },
          { name: '2. Règles pour les back-end métier.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[]);

      readFileSyncSpy.mockReturnValue('# Partie\nContenu');

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
      pathJoinSpy.mockImplementation((...args) => args.join('/'));

      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false, isFile: () => true },
          { name: 'fichier.txt', isDirectory: () => false, isFile: () => true },
          { name: 'autre.pdf', isDirectory: () => false, isFile: () => true },
          { name: 'Section 2.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[]);

      readFileSyncSpy.mockReturnValue('# Partie\nContenu');

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
      pathJoinSpy.mockImplementation((...args) => args.join('/'));

      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true, isFile: () => false },
          { name: '2. Definition of Done (DOD)', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false, isFile: () => true },
          { name: 'Section 2.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false, isFile: () => true },
          { name: 'Section 2.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[]);

      readFileSyncSpy.mockReturnValue('# Partie\nContenu');

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
      pathJoinSpy.mockImplementation((...args) => args.join('/'));

      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true, isFile: () => false },
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
      pathJoinSpy.mockImplementation((...args) => args.join('/'));

      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[]);

      readFileSyncSpy.mockReturnValue('# Partie\nContenu');

      // ACT & ASSERT
      expect(() => {
        readAboutSiteStructure();
      }).toThrow(ValidationError);
      expect(() => {
        // Réinitialiser les mocks pour le deuxième test
        readdirSyncSpy
          .mockReturnValueOnce([
            { name: '1. A propos du projet', isDirectory: () => true, isFile: () => false },
          ] as fs.Dirent[])
          .mockReturnValueOnce([
            { name: 'Section 1.md', isDirectory: () => false, isFile: () => true },
          ] as fs.Dirent[]);
        readFileSyncSpy.mockReturnValue('# Partie\nContenu');
        readAboutSiteStructure();
      }).toThrow(/au moins 2 sections/);
    });
  });


  describe('Test 9 : Erreur - fichier MD avec H2 sans H1', () => {
    it('devrait lever une ValidationError si un fichier contient H2 sans H1', () => {
      // ARRANGE : Simuler un fichier avec H2 sans H1
      pathJoinSpy.mockImplementation((...args) => args.join('/'));

      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false, isFile: () => true },
          { name: 'Section 2.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[]);

      readFileSyncSpy
        .mockReturnValueOnce('## Sous-partie sans partie\nContenu') // Fichier invalide : H2 sans H1
        .mockReturnValueOnce('# Partie\nContenu');

      // ACT & ASSERT
      expect(() => {
        readAboutSiteStructure();
      }).toThrow(ValidationError);
      expect(() => {
        // Réinitialiser les mocks pour le deuxième test
        readdirSyncSpy
          .mockReturnValueOnce([
            { name: '1. A propos du projet', isDirectory: () => true, isFile: () => false },
          ] as fs.Dirent[])
          .mockReturnValueOnce([
            { name: 'Section 1.md', isDirectory: () => false, isFile: () => true },
            { name: 'Section 2.md', isDirectory: () => false, isFile: () => true },
          ] as fs.Dirent[]);
        readFileSyncSpy
          .mockReturnValueOnce('## Sous-partie sans partie\nContenu')
          .mockReturnValueOnce('# Partie\nContenu');
        readAboutSiteStructure();
      }).toThrow(/titre de niveau 2.*sans titre de niveau 1/);
    });
  });

  describe('Test 10 : Ignorer fichiers MD vides', () => {
    it('devrait ignorer les fichiers MD vides', () => {
      // ARRANGE : Simuler des fichiers MD dont certains sont vides
      pathJoinSpy.mockImplementation((...args) => args.join('/'));

      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '1. A propos du projet', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'Section 1.md', isDirectory: () => false, isFile: () => true },
          { name: 'vide.md', isDirectory: () => false, isFile: () => true },
          { name: 'Section 2.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[]);

      let readCount = 0;
      readFileSyncSpy.mockImplementation((filePath: string) => {
        readCount++;
        if (readCount === 1) return '# Partie 1\nContenu section 1';
        if (readCount === 2) return ''; // Fichier vide
        if (readCount === 3) return '# Partie 2\nContenu section 2';
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
 * ITÉRATION 1 : Détecter H2 sans H1 (hiérarchie)
 * ITÉRATION 4 : Ignorer les blocs de code markdown
 * ITÉRATION 5 : Fichier vide ne doit pas lever d'erreur
 */

import { validerContenuMarkdown, ValidationError } from '../../utils/aboutSiteReader';

describe('validerContenuMarkdown - APPROCHE TDD', () => {
  describe('ITÉRATION 1 : H1 est maintenant autorisé', () => {
    it('ne devrait pas lever d\'erreur pour un fichier contenant un titre H1', () => {
      // ARRANGE : H1 est maintenant autorisé (avec décalage +2, H1 → h3 en HTML)
      const contenu = '# Titre H1\nContenu du fichier';
      const filePath = 'test.md';

      // ACT & ASSERT : Ne doit pas lever d'erreur
      expect(() => validerContenuMarkdown(contenu, filePath)).not.toThrow();
    });
  });

  describe('ITÉRATION 2 : H2 est maintenant autorisé s\'il est avec H1', () => {
    it('ne devrait pas lever d\'erreur pour un fichier contenant H2 avec H1', () => {
      // ARRANGE : H2 avec H1 est maintenant autorisé
      const contenu = '# Titre H1\n## Titre H2\nContenu du fichier';
      const filePath = 'test.md';

      // ACT & ASSERT : Ne doit pas lever d'erreur
      expect(() => validerContenuMarkdown(contenu, filePath)).not.toThrow();
    });
  });

  describe('ITÉRATION 1 : Détecter H2 sans H1', () => {
    it('devrait lever une ValidationError si un fichier contient H2 sans H1', () => {
      // ARRANGE : Cas d'erreur avec H2 sans H1 (hiérarchie)
      const contenu = '## Sous-partie\nContenu';
      const filePath = 'test.md';

      // ACT & ASSERT
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(ValidationError);
      expect(() => validerContenuMarkdown(contenu, filePath)).toThrow(/titre de niveau 2.*sans titre de niveau 1/);
    });

    it('ne devrait pas lever d\'erreur si H2 est présent avec H1', () => {
      // ARRANGE : Cas valide - H2 avec H1
      const contenu = '# Partie valide\n## Sous-partie\nContenu';
      const filePath = 'test.md';

      // ACT & ASSERT : Ne doit pas lever d'erreur
      expect(() => validerContenuMarkdown(contenu, filePath)).not.toThrow();
    });
  });

  describe('ITÉRATION 4 : Ignorer les blocs de code markdown', () => {
    it('ne devrait pas détecter les titres dans les blocs de code markdown', () => {
      // ARRANGE : Cas avec H1 dans un bloc de code (ne doit pas lever d'erreur)
      const contenu = `# Partie valide

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

