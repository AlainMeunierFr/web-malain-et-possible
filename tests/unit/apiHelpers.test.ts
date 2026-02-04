/**
 * Tests unitaires pour les fonctions utilitaires de l'API Vitrine
 * TDD Baby Steps - US-12.6
 */

import {
  validateModeParameter,
  convertToRefs,
  type ApiError,
} from '../../utils/vitrine/apiHelpers';

describe('apiHelpers', () => {
  describe('validateModeParameter', () => {
    describe('mode valide', () => {
      it('retourne valid=true pour mode "refs"', () => {
        const result = validateModeParameter('refs');
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      it('retourne valid=true pour mode "full"', () => {
        const result = validateModeParameter('full');
        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    describe('mode manquant', () => {
      it('retourne valid=false avec erreur pour mode null', () => {
        const result = validateModeParameter(null);
        expect(result.valid).toBe(false);
        expect(result.error).toBeDefined();
        expect(result.error?.error).toBe('Missing required parameter: mode');
        expect(result.error?.hint).toBe('Use ?mode=refs or ?mode=full');
      });

      it('retourne valid=false avec erreur pour mode chaîne vide', () => {
        const result = validateModeParameter('');
        expect(result.valid).toBe(false);
        expect(result.error?.error).toBe('Missing required parameter: mode');
      });
    });

    describe('mode invalide', () => {
      it('retourne valid=false avec erreur pour mode "invalid"', () => {
        const result = validateModeParameter('invalid');
        expect(result.valid).toBe(false);
        expect(result.error?.error).toBe('Invalid mode parameter: invalid');
        expect(result.error?.hint).toBe('Use ?mode=refs or ?mode=full');
      });

      it('retourne valid=false avec erreur pour mode "complete"', () => {
        const result = validateModeParameter('complete');
        expect(result.valid).toBe(false);
        expect(result.error?.error).toBe('Invalid mode parameter: complete');
      });

      it('retourne valid=false avec erreur pour mode "all"', () => {
        const result = validateModeParameter('all');
        expect(result.valid).toBe(false);
        expect(result.error?.error).toBe('Invalid mode parameter: all');
      });
    });
  });

  describe('convertToRefs', () => {
    describe('extraction des slugs depuis un tableau d\'objets', () => {
      it('extrait les slugs d\'un tableau de domaines', () => {
        const profil = {
          slug: 'agile',
          titre: 'Transformation Agile',
          domaines: [
            { slug: 'strategie-et-transformations', titre: 'Stratégie' },
            { slug: 'faire-avec-les-equipes', titre: 'Faire avec' },
          ],
        };

        const result = convertToRefs(profil, 'domaines', 'slug');
        expect(result.domaines).toEqual(['strategie-et-transformations', 'faire-avec-les-equipes']);
        expect(result.slug).toBe('agile'); // Autres propriétés préservées
        expect(result.titre).toBe('Transformation Agile');
      });

      it('extrait les slugs d\'un tableau de compétences', () => {
        const domaine = {
          slug: 'strategie-et-transformations',
          titre: 'Stratégie et transformations',
          competences: [
            { slug: 'conduite-du-changement', titre: 'Conduite du changement' },
            { slug: 'management-agile', titre: 'Management agile' },
          ],
        };

        const result = convertToRefs(domaine, 'competences', 'slug');
        expect(result.competences).toEqual(['conduite-du-changement', 'management-agile']);
      });

      it('extrait les ids d\'un tableau d\'expériences', () => {
        const competence = {
          slug: 'conduite-du-changement',
          titre: 'Conduite du changement',
          experiences: [
            { id: '11', description: 'Formation 1' },
            { id: '12', description: 'Formation 2' },
          ],
        };

        const result = convertToRefs(competence, 'experiences', 'id');
        expect(result.experiences).toEqual(['11', '12']);
      });
    });

    describe('cas limites', () => {
      it('retourne un tableau vide si le champ FK est un tableau vide', () => {
        const profil = {
          slug: 'agile',
          domaines: [],
        };

        const result = convertToRefs(profil, 'domaines', 'slug');
        expect(result.domaines).toEqual([]);
      });

      it('retourne l\'objet inchangé si le champ FK n\'existe pas', () => {
        const profil = {
          slug: 'agile',
          titre: 'Transformation Agile',
        };

        const result = convertToRefs(profil, 'domaines', 'slug');
        expect(result).toEqual(profil);
      });

      it('retourne l\'objet inchangé si le champ FK est déjà un tableau de strings', () => {
        const profil = {
          slug: 'agile',
          domaines: ['strategie-et-transformations', 'faire-avec-les-equipes'],
        };

        const result = convertToRefs(profil, 'domaines', 'slug');
        expect(result.domaines).toEqual(['strategie-et-transformations', 'faire-avec-les-equipes']);
      });

      it('retourne l\'objet inchangé si le champ FK n\'est pas un tableau', () => {
        const profil = {
          slug: 'agile',
          domaines: 'not-an-array',
        };

        const result = convertToRefs(profil, 'domaines', 'slug');
        expect(result.domaines).toBe('not-an-array');
      });

      it('retourne chaîne vide pour les items sans le keyField', () => {
        const profil = {
          slug: 'agile',
          domaines: [
            { slug: 'valid-slug' },
            { titre: 'sans-slug' }, // pas de propriété slug
            null,
          ],
        };

        const result = convertToRefs(profil, 'domaines', 'slug');
        expect(result.domaines).toEqual(['valid-slug', '', '']);
      });
    });
  });
});
