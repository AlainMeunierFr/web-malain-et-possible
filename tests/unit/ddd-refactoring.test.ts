/**
 * Tests pour la refactorisation DDD
 * Tâche 0 : Renommage items → competences et ajout de type aux sous-éléments
 */

import type { 
  ElementCompetence, 
  ElementDomaineDeCompetence,
  ElementBoutonDeGroupe,
  ElementGroupeDeBoutons
} from '../../utils';

describe('Refactorisation DDD - Domaine de Compétences', () => {
  
  describe('Interface ElementCompetence', () => {
    it('devrait avoir un champ type égal à "competence"', () => {
      const competence: ElementCompetence = {
        type: 'competence', // ❌ RED : Ce champ n'existe pas encore
        titre: 'Test',
        description: 'Description test',
        bouton: null,
      };
      
      expect(competence.type).toBe('competence');
    });
    
    it('devrait avoir un bouton avec un champ type', () => {
      const competence: ElementCompetence = {
        type: 'competence',
        titre: 'Test',
        description: 'Description test',
        bouton: {
          type: 'bouton', // ❌ RED : Ce champ n'existe pas encore
          texte: 'Voir plus',
          action: '/test',
        },
      };
      
      expect(competence.bouton?.type).toBe('bouton');
    });
  });
  
  describe('Interface ElementDomaineDeCompetence', () => {
    it('devrait avoir un champ type et un tableau items', () => {
      const element: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test',
        contenu: 'Contenu test',
        items: [
          {
            type: 'competence',
            titre: 'Compétence 1',
            description: 'Description',
            bouton: null,
          },
        ],
      };

      expect(element.type).toBe('domaineDeCompetence');
      expect(element.items).toBeDefined();
      expect(element.items.length).toBe(1);
    });
  });
  
  describe('Interface ElementBoutonDeGroupe', () => {
    it('devrait avoir un champ type égal à "bouton"', () => {
      const bouton: ElementBoutonDeGroupe = {
        type: 'bouton', // ❌ RED : Ce champ n'existe pas encore
        id: 'test-btn',
        icone: 'Mail',
        texte: 'Email',
        url: 'mailto:test@test.com',
        command: null,
      };
      
      expect(bouton.type).toBe('bouton');
    });
  });
  
  describe('Interface ElementGroupeDeBoutons', () => {
    it('devrait contenir des boutons avec le champ type', () => {
      const element: ElementGroupeDeBoutons = {
        type: 'groupeDeBoutons',
        taille: 'grande',
        boutons: [
          {
            type: 'bouton', // ❌ RED : Ce champ n'existe pas encore
            id: 'email',
            icone: 'Mail',
            texte: 'Email',
            url: 'mailto:test@test.com',
            command: null,
          },
        ],
      };
      
      expect(element.boutons[0].type).toBe('bouton');
    });
  });
  
  describe('Validation de la cohérence DDD', () => {
    it('un domaine de compétences devrait avoir des compétences typées', () => {
      const element: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Développement',
        contenu: 'Expertise en développement',
        items: [
          {
            type: 'competence',
            titre: 'React',
            description: 'Framework moderne',
            bouton: {
              type: 'bouton',
              texte: 'En savoir plus',
              action: '/react',
            },
          },
          {
            type: 'competence',
            titre: 'TypeScript',
            description: 'Langage typé',
            bouton: null,
          },
        ],
      };

      expect(element.items).toBeDefined();
      expect(element.items.length).toBe(2);

      element.items.forEach((competence) => {
        expect(competence.type).toBe('competence');

        if (competence.bouton) {
          expect(competence.bouton.type).toBe('bouton');
        }
      });
    });
  });
});
