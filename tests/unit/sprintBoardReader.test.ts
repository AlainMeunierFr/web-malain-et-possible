/**
 * Tests TDD pour sprintBoardReader.ts (US-11.5)
 * Board KanBan du sprint en cours : Sprint Goal, colonnes (A faire / agents / Fait), cartes US.
 */

import fs from 'fs';
import path from 'path';
import {
  readSprintGoal,
  readAgentsFromCursorAgents,
  readUsEnCours,
  getSprintFolderContainingUs,
  readSprintUsCards,
  getSprintBoardData,
  readUsContent,
} from '../../utils/sprintBoardReader';

describe('sprintBoardReader', () => {
  let readFileSyncSpy: jest.SpyInstance;
  let readdirSyncSpy: jest.SpyInstance;
  let pathJoinSpy: jest.SpyInstance;
  let cwdSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue('/project');
    pathJoinSpy = jest.spyOn(path, 'join').mockImplementation((...args) => args.join('/'));
    readFileSyncSpy = jest.spyOn(fs, 'readFileSync');
    readdirSyncSpy = jest.spyOn(fs, 'readdirSync');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('readSprintGoal', () => {
    it('retourne le contenu après "# Sprint Goal" jusqu\'au premier "---"', () => {
      const content = `# Sprint Goal

Améliorer le back-office du projet.
- point 1
- point 2

---
### Contexte
`;
      readFileSyncSpy.mockReturnValue(content);

      const result = readSprintGoal('data/A propos de ce site/Sprints/2026-01-28 - Evolution');

      expect(result).toContain('Améliorer le back-office');
      expect(result).toContain('- point 1');
      expect(result).not.toContain('---');
      expect(result).not.toContain('Contexte');
    });

    it('retourne une chaîne vide si le fichier est absent', () => {
      readFileSyncSpy.mockImplementation(() => {
        throw new Error('ENOENT');
      });

      const result = readSprintGoal('data/A propos de ce site/Sprints/UnSprint');

      expect(result).toBe('');
    });

    it('lit le fichier 00 - Sprint goal et contexte.md dans le dossier sprint', () => {
      readFileSyncSpy.mockReturnValue('# Sprint Goal\n\nUn goal.\n---');

      readSprintGoal('data/A propos de ce site/Sprints/MonSprint');

      const callPath = readFileSyncSpy.mock.calls[0][0];
      expect(callPath).toContain('MonSprint');
      expect(callPath).toContain('00 - Sprint goal et contexte.md');
    });
  });

  describe('readAgentsFromCursorAgents', () => {
    it('retourne les agents dans l\'ordre du préfixe numérique des fichiers', () => {
      readdirSyncSpy.mockReturnValue([
        { name: '4. TDD-back-end.md', isFile: () => true },
        { name: '2. US.md', isFile: () => true },
        { name: '3. BDD.md', isFile: () => true },
      ] as fs.Dirent[]);

      const result = readAgentsFromCursorAgents();

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('US');
      expect(result[1].id).toBe('BDD');
      expect(result[2].id).toBe('TDD-back-end');
    });

    it('retourne un tableau vide si le dossier .cursor/agents est absent', () => {
      readdirSyncSpy.mockImplementation(() => {
        throw new Error('ENOENT');
      });

      const result = readAgentsFromCursorAgents();

      expect(result).toEqual([]);
    });

    it('ignore les fichiers non .md et les dossiers', () => {
      readdirSyncSpy.mockReturnValue([
        { name: '1. Lead-dev.md', isFile: () => true },
        { name: 'readme.txt', isFile: () => true },
        { name: 'sous-dossier', isFile: () => false },
      ] as fs.Dirent[]);

      const result = readAgentsFromCursorAgents();

      expect(result).toHaveLength(1);
      expect(result[0].label).toBe('Lead-dev');
    });
  });

  describe('readUsEnCours', () => {
    it('parse usId, titre et étape après le séparateur ---', () => {
      const content = `### US en cours

Description.

---

US-11.5
Définition du board KanBan
TDD-back-end
`;
      readFileSyncSpy.mockReturnValue(content);

      const result = readUsEnCours();

      expect(result).toEqual({
        usId: 'US-11.5',
        titre: 'Définition du board KanBan',
        etape: 'TDD-back-end',
      });
    });

    it('retourne null si le fichier est absent', () => {
      readFileSyncSpy.mockImplementation(() => {
        throw new Error('ENOENT');
      });

      const result = readUsEnCours();

      expect(result).toBeNull();
    });

    it('retourne null si la référence n\'est pas un id US valide (US-X.Y)', () => {
      readFileSyncSpy.mockReturnValue('---\nPasUneUS\nTitre\nBDD');

      const result = readUsEnCours();

      expect(result).toBeNull();
    });
  });

  describe('getSprintFolderContainingUs', () => {
    it('retourne le chemin relatif du dossier sprint qui contient l\'US', () => {
      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '2026-01-28 - Evolution', isDirectory: () => true, isFile: () => false },
          { name: 'autre-sprint', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'US-11.5 - Definition du board KanBan.md', isDirectory: () => false, isFile: () => true },
          { name: '00 - Sprint goal et contexte.md', isDirectory: () => false, isFile: () => true },
        ] as fs.Dirent[]);

      const result = getSprintFolderContainingUs('US-11.5');

      expect(result).toContain('2026-01-28');
      expect(result).toContain('Evolution');
    });

    it('retourne null si aucun dossier ne contient l\'US', () => {
      readdirSyncSpy
        .mockReturnValueOnce([{ name: 'un-sprint', isDirectory: () => true, isFile: () => false }] as fs.Dirent[])
        .mockReturnValueOnce([{ name: 'US-11.1 - Autre.md', isDirectory: () => false, isFile: () => true }] as fs.Dirent[]);

      const result = getSprintFolderContainingUs('US-11.5');

      expect(result).toBeNull();
    });
  });

  describe('readSprintUsCards', () => {
    it('retourne les cartes US avec état fait si le nom contient "✅ COMPLÉTÉ"', () => {
      readFileSyncSpy.mockReturnValue('---\nUS-11.4\nTitre\nBDD');
      readdirSyncSpy.mockReturnValue([
        { name: 'US-11.1 - Assistant ✅ COMPLÉTÉ.md', isFile: () => true },
      ] as fs.Dirent[]);

      const result = readSprintUsCards('data/A propos de ce site/Sprints/UnSprint');

      expect(result).toHaveLength(1);
      expect(result[0].state).toBe('fait');
      expect(result[0].id).toBe('US-11.1');
    });

    it('retourne la carte en_cours avec agentColumn quand l\'US est dans US en cours', () => {
      readFileSyncSpy.mockReturnValue('---\nUS-11.5\nDefinition board\nTDD-back-end');
      readdirSyncSpy.mockReturnValue([
        { name: 'US-11.5 - Definition du board KanBan pour le sprint en cours.md', isFile: () => true },
      ] as fs.Dirent[]);

      const result = readSprintUsCards('data/A propos de ce site/Sprints/UnSprint');

      expect(result).toHaveLength(1);
      expect(result[0].state).toBe('en_cours');
      expect(result[0].agentColumn).toBe('TDD-back-end');
    });

    it('retourne les cartes a_faire pour les US ni fait ni en cours', () => {
      readFileSyncSpy.mockReturnValue('---\nUS-11.5\nTitre\nTDD-back-end');
      readdirSyncSpy.mockReturnValue([
        { name: 'US-11.3 - Bande horizontale.md', isFile: () => true },
      ] as fs.Dirent[]);

      const result = readSprintUsCards('data/A propos de ce site/Sprints/UnSprint');

      expect(result).toHaveLength(1);
      expect(result[0].state).toBe('a_faire');
    });

    it('ignore les fichiers qui ne matchent pas US-X.Y - ...', () => {
      readFileSyncSpy.mockReturnValue('---\nUS-11.5\nTitre\nBDD');
      readdirSyncSpy.mockReturnValue([
        { name: '00 - Sprint goal et contexte.md', isFile: () => true },
        { name: 'US-11.5 - Definition.md', isFile: () => true },
      ] as fs.Dirent[]);

      const result = readSprintUsCards('data/A propos de ce site/Sprints/UnSprint');

      expect(result).toHaveLength(1);
      expect(result[0].filename).toBe('US-11.5 - Definition.md');
    });
  });

  describe('getSprintBoardData', () => {
    it('retourne goal, colonnes (A faire + agents + Fait) et cartes', () => {
      readFileSyncSpy
        .mockReturnValueOnce('# Sprint Goal\n\nMon goal.\n---')
        .mockReturnValueOnce('---\nUS-11.5\nDefinition\nTDD-back-end');
      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '2. US.md', isFile: () => true },
          { name: '4. TDD-back-end.md', isFile: () => true },
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'US-11.4 - Affichage Path ✅ COMPLÉTÉ.md', isFile: () => true },
          { name: 'US-11.5 - Definition du board.md', isFile: () => true },
        ] as fs.Dirent[]);

      const result = getSprintBoardData('data/A propos de ce site/Sprints/UnSprint');

      expect(result.goal).toContain('Mon goal');
      expect(result.columns[0]).toMatchObject({ id: 'a_faire', label: 'A faire', type: 'a_faire' });
      expect(result.columns[0].count).toBe(0);
      const agentCols = result.columns.filter((c) => c.type === 'agent');
      expect(agentCols.length).toBe(2);
      const tddCol = agentCols.find((c) => c.id === 'TDD-back-end');
      expect(tddCol?.wipLimit).toBe('1/1');
      expect(tddCol?.count).toBe(1);
      expect(result.columns[result.columns.length - 1]).toMatchObject({ id: 'fait', label: 'Fait', type: 'fait', count: 1 });
      expect(result.cards).toHaveLength(2);
    });

    it('décompte A faire et Fait et WIP 0/1 pour les colonnes agent sans carte', () => {
      readFileSyncSpy
        .mockReturnValueOnce('# Sprint Goal\n\nGoal.\n---')
        .mockReturnValueOnce('---\nUS-11.4\nTitre\ndone');
      readdirSyncSpy
        .mockReturnValueOnce([{ name: '3. BDD.md', isFile: () => true }] as fs.Dirent[])
        .mockReturnValueOnce([
          { name: 'US-11.1 - Un ✅ COMPLÉTÉ.md', isFile: () => true },
          { name: 'US-11.2 - Deux.md', isFile: () => true },
        ] as fs.Dirent[]);

      const result = getSprintBoardData('data/A propos de ce site/Sprints/UnSprint');

      expect(result.columns[0].count).toBe(1); // A faire : 1
      expect(result.columns[1].wipLimit).toBe('0/1'); // agent sans carte en cours
      expect(result.columns[2].count).toBe(1); // Fait : 1
    });
  });

  describe('readUsContent (US-11.6)', () => {
    const usFileEntry = { name: 'US-11.5 - Definition du board KanBan pour le sprint en cours.md', isDirectory: () => false, isFile: () => true } as fs.Dirent;

    it('retourne id, titre et contenu brut du fichier US quand l\'US existe dans un sprint', () => {
      const mdContent = `#### US-11.5 : Définition du board KanBan

- **En tant que** visiteur
- **Je souhaite** un board KanBan
- **Afin de** visualiser l'état

- **Critères d'acceptation** :
- **CA1** : Colonnes A faire / agents / Fait
`;
      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '2026-01-28 - Evolution', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([usFileEntry])
        .mockReturnValueOnce([usFileEntry]);
      readFileSyncSpy.mockReturnValue(mdContent);

      const result = readUsContent('US-11.5');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('US-11.5');
      expect(result?.titre).toContain('Definition du board KanBan');
      expect(result?.content).toBe(mdContent);
    });

    it('retourne null si aucun dossier sprint ne contient l\'US', () => {
      readdirSyncSpy
        .mockReturnValueOnce([{ name: 'autre-sprint', isDirectory: () => true, isFile: () => false }] as fs.Dirent[])
        .mockReturnValueOnce([{ name: 'US-11.1 - Autre.md', isDirectory: () => false, isFile: () => true }] as fs.Dirent[]);

      const result = readUsContent('US-11.5');

      expect(result).toBeNull();
    });

    it('retourne null si le fichier US est absent du dossier sprint', () => {
      readdirSyncSpy
        .mockReturnValueOnce([
          { name: '2026-01-28 - Evolution', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([usFileEntry])
        .mockReturnValueOnce([{ name: '00 - Sprint goal et contexte.md', isDirectory: () => false, isFile: () => true }] as fs.Dirent[]);

      const result = readUsContent('US-11.5');

      expect(result).toBeNull();
    });

    it('nettoie le titre du nom de fichier (sans .md, sans préfixe US-X.Y, sans COMPLÉTÉ)', () => {
      const entry = { name: 'US-11.4 - Affichage Path avec accordéon ✅ COMPLÉTÉ.md', isDirectory: () => false, isFile: () => true } as fs.Dirent;
      readdirSyncSpy
        .mockReturnValueOnce([
          { name: 'Sprint', isDirectory: () => true, isFile: () => false },
        ] as fs.Dirent[])
        .mockReturnValueOnce([entry])
        .mockReturnValueOnce([entry]);
      readFileSyncSpy.mockReturnValue('# US-11.4\n\nContenu.');

      const result = readUsContent('US-11.4');

      expect(result?.titre).toBe('Affichage Path avec accordéon');
    });
  });
});
