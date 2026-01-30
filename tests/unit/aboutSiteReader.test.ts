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

import path from 'path';
import {
  validerContenuMarkdown,
  ValidationError,
  readPathContentAtRoot,
  readChapitreByPath,
} from '../../utils/aboutSiteReader';

/**
 * readAboutSiteStructure a été supprimé (US-11.3 : bande pilotée par menu.json, contenu par readChapitreByPath).
 * Les tests ci-dessous concernent validerContenuMarkdown et readPathContentAtRoot (US-11.4).
 */

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

describe('readPathContentAtRoot - US-11.4 Path avec dossiers et accordéon', () => {
  it('retourne null quand le chemin n\'existe pas', () => {
    const result = readPathContentAtRoot('data/INEXISTANT_XYZ');
    expect(result).toBeNull();
  });

  it('retourne null quand le chemin pointe vers un fichier (pas un dossier)', () => {
    const result = readPathContentAtRoot(path.join('data', 'A propos de ce site', 'menu.json'));
    expect(result).toBeNull();
  });

  it('retourne dossiers à la racine quand le dossier contient des sous-dossiers', () => {
    const dirWithSubdirs = path.join('data', 'A propos de ce site');
    const result = readPathContentAtRoot(dirWithSubdirs);
    expect(result).not.toBeNull();
    expect(result!.dossiers.length).toBeGreaterThan(0);
    const noms = result!.dossiers.map((d) => d.nom);
    expect(noms).toContain('A propos du projet');
    expect(noms).toContain('Sprints');
    expect(result!.dossiers.every((d) => d.path.length > 0 && d.nom.length > 0)).toBe(true);
  });

  it('retourne fichiers MD à la racine quand le dossier contient des .md', () => {
    const dirWithMd = path.join('data', 'A propos de ce site', 'A propos du projet');
    const result = readPathContentAtRoot(dirWithMd);
    expect(result).not.toBeNull();
    expect(result!.fichiers.length).toBeGreaterThan(0);
    expect(result!.fichiers.every((s) => s.nom && s.contenu && Array.isArray(s.parties))).toBe(true);
  });

  it('retourne à la fois fichiers et dossiers triés par nom', () => {
    const rootAbout = path.join('data', 'A propos de ce site');
    const result = readPathContentAtRoot(rootAbout);
    expect(result).not.toBeNull();
    const nomsDossiers = result!.dossiers.map((d) => d.nom);
    const nomsFichiers = result!.fichiers.map((f) => f.nom);
    expect(nomsDossiers).toEqual([...nomsDossiers].sort((a, b) => a.localeCompare(b)));
    expect(nomsFichiers).toEqual([...nomsFichiers].sort((a, b) => a.localeCompare(b)));
  });

  it('chaque dossier a un path utilisable par readChapitreByPath', () => {
    const rootAbout = path.join('data', 'A propos de ce site');
    const result = readPathContentAtRoot(rootAbout);
    expect(result).not.toBeNull();
    const sousDossier = result!.dossiers.find((d) => d.nom === 'A propos du projet');
    expect(sousDossier).toBeDefined();
    const chapitre = readChapitreByPath(sousDossier!.path);
    expect(chapitre).not.toBeNull();
    expect(chapitre!.sections.length).toBeGreaterThan(0);
  });
});

