/**
 * Tests pour utils/siteHierarchyGenerator.ts
 * Génération de la hiérarchie du site (ASCII) à partir de la spec canonique, sans IA.
 */

import {
  buildHierarchyTree,
  buildHierarchyFromPageContenu,
  contenuToAsciiArt,
  renderContainersOnlyToAscii,
  renderHierarchyToAscii,
  generateHierarchyMarkdown,
  type TreeContainer,
} from '../../utils/backoffice';
import { CANONICAL_SPEC_ORDER } from '../../constants/canonicalSpec';

describe('siteHierarchyGenerator', () => {
  describe('buildHierarchyTree', () => {
    it('devrait retourner une racine body avec au moins un enfant (main-content-cont)', () => {
      const tree = buildHierarchyTree(CANONICAL_SPEC_ORDER);
      expect(tree.type).toBe('container');
      expect(tree.id).toBe('body');
      expect(tree.label).toBe('body');
      expect(tree.children.length).toBeGreaterThanOrEqual(1);
      const pageContainer = tree.children.find((c) => c.type === 'container' && c.id === 'main-content-cont');
      expect(pageContainer).toBeDefined();
    });

    it('devrait contenir hero sous main-content-cont', () => {
      const tree = buildHierarchyTree(CANONICAL_SPEC_ORDER);
      const pageContainer = tree.children.find((c) => c.type === 'container' && c.id === 'main-content-cont') as TreeContainer | undefined;
      expect(pageContainer).toBeDefined();
      const heroContainer = pageContainer?.children.find((c) => c.type === 'container' && c.id === 'hero.cont');
      expect(heroContainer).toBeDefined();
    });
  });

  describe('renderHierarchyToAscii', () => {
    it('devrait produire des lignes commençant par body/ puis branches', () => {
      const tree = buildHierarchyTree(CANONICAL_SPEC_ORDER);
      const ascii = renderHierarchyToAscii(tree);
      expect(ascii).toContain('body/');
      expect(ascii).toMatch(/└──|├──/);
      expect(ascii).toContain('main-content-cont');
    });
  });

  describe('generateHierarchyMarkdown', () => {
    it('devrait retourner un document Markdown avec titre et bloc ASCII', () => {
      const markdown = generateHierarchyMarkdown();
      expect(markdown).toContain('# Hiérarchie du site (ASCII Art)');
      expect(markdown).toContain('```');
      expect(markdown).toContain('body/');
      expect(markdown).toContain('hero');
      expect(markdown).toContain('Légende');
      expect(markdown).toContain('Racine');
    });

    it('devrait accepter une liste d’entrées optionnelle', () => {
      const minimal = [
        { nomCanonique: 'page', typeHierarchique: '--c', containerParent: 'body', containerLayout: 'main-content-cont' },
        { nomCanonique: 'header', typeHierarchique: '--c', containerParent: 'main-content-cont', containerLayout: 'header' },
      ];
      const markdown = generateHierarchyMarkdown(minimal);
      expect(markdown).toContain('body/');
      expect(markdown).toContain('main-content-cont');
    });
  });

  describe('buildHierarchyFromPageContenu', () => {
    it('devrait retourner un tree avec body comme racine pour hero et texteLarge', () => {
      const contenu = [{ type: 'hero' }, { type: 'texteLarge' }];
      const tree = buildHierarchyFromPageContenu(contenu);
      expect(tree.type).toBe('container');
      expect(tree.id).toBe('body');
      expect(tree.label).toBe('body');
      expect(tree.children.length).toBeGreaterThan(0);
      const mainContent = tree.children.find((c) => c.type === 'container' && c.id === 'main-content-cont');
      expect(mainContent).toBeDefined();
    });

    it('devrait inclure le container profil pour listeDeProfils (type enfant implicite)', () => {
      const contenu = [{ type: 'listeDeProfils' }];
      const tree = buildHierarchyFromPageContenu(contenu);
      expect(tree.type).toBe('container');
      expect(tree.id).toBe('body');
      const ascii = renderHierarchyToAscii(tree);
      expect(ascii).toContain('listeDeProfils');
      expect(ascii).toContain('profil');
    });

    it('devrait retourner un tree body minimal pour un contenu vide', () => {
      const contenu: Array<{ type?: string }> = [];
      const tree = buildHierarchyFromPageContenu(contenu);
      expect(tree.type).toBe('container');
      expect(tree.id).toBe('body');
      expect(tree.label).toBe('body');
      expect(tree.children.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('contenuToAsciiArt', () => {
    it('devrait retourner une string contenant body/ et hero pour un contenu avec hero', () => {
      const contenu = [{ type: 'hero' }];
      const ascii = contenuToAsciiArt(contenu);
      expect(ascii).toContain('body/');
      expect(ascii).toContain('hero');
    });

    it('devrait retourner une string contenant les containers attendus pour domaineDeCompetence', () => {
      const contenu = [{ type: 'domaineDeCompetence' }];
      const ascii = contenuToAsciiArt(contenu);
      expect(ascii).toContain('body/');
      expect(ascii).toContain('domaineDeCompetence');
      expect(ascii).toContain('competence');
    });
  });

  describe('renderContainersOnlyToAscii', () => {
    it('devrait rendre l\'ASCII pour un TreeContainer simple créé manuellement', () => {
      const tree: TreeContainer = {
        type: 'container',
        id: 'body',
        label: 'body',
        children: [
          {
            type: 'container',
            id: 'main-content-cont',
            label: 'main-content-cont',
            children: [
              {
                type: 'container',
                id: 'hero.cont',
                label: 'hero.cont',
                children: [],
              },
            ],
          },
        ],
      };
      const ascii = renderContainersOnlyToAscii(tree);
      expect(ascii).toContain('body/');
      expect(ascii).toContain('main-content-cont');
      expect(ascii).toContain('hero');
    });

    it('devrait exclure les feuilles et ne montrer que les containers', () => {
      const tree: TreeContainer = {
        type: 'container',
        id: 'body',
        label: 'body',
        children: [
          {
            type: 'container',
            id: 'main-content-cont',
            label: 'main-content-cont',
            children: [
              {
                type: 'leaf',
                label: 'hero.titre',
                typeHierarchique: '--h1',
              },
              {
                type: 'container',
                id: 'hero.cont',
                label: 'hero.cont',
                children: [],
              },
            ],
          },
        ],
      };
      const ascii = renderContainersOnlyToAscii(tree);
      expect(ascii).toContain('body/');
      expect(ascii).toContain('main-content-cont');
      expect(ascii).toContain('hero');
      expect(ascii).not.toContain('hero.titre');
      expect(ascii).not.toContain('--h1');
    });
  });
});
