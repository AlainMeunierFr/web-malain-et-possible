/**
 * Tests pour la refactorisation DDD
 * Tâche 0 : Renommage items → competences et ajout de type aux sous-éléments
 */

import { 
  Competence, 
  DomaineDeCompetences, 
  ElementDomaineDeCompetence,
  BoutonGroupe,
  ElementGroupeBoutons
} from '../../utils/indexReader';

describe('Refactorisation DDD - Domaine de Compétences', () => {
  
  describe('Interface Competence', () => {
    it('devrait avoir un champ type égal à "competence"', () => {
      const competence: Competence = {
        type: 'competence', // ❌ RED : Ce champ n'existe pas encore
        titre: 'Test',
        description: 'Description test',
        bouton: null,
      };
      
      expect(competence.type).toBe('competence');
    });
    
    it('devrait avoir un bouton avec un champ type', () => {
      const competence: Competence = {
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
  
  describe('Interface DomaineDeCompetences', () => {
    it('devrait utiliser le champ "competences" au lieu de "items"', () => {
      // Test que l'interface n'accepte PAS "items"
      // @ts-expect-error - items ne devrait plus exister
      const domaineWithItems: DomaineDeCompetences = {
        titre: 'Test',
        contenu: 'Contenu test',
        competences: [{ titre: 'Test', description: 'Test', bouton: null }],
      };
      
      // Test que l'interface accepte "competences"
      const domaine: DomaineDeCompetences = {
        titre: 'Test',
        contenu: 'Contenu test',
        competences: [
          {
            type: 'competence',
            titre: 'Compétence 1',
            description: 'Description',
            bouton: null,
          },
        ],
      };
      
      expect(domaine.competences).toBeDefined();
      expect(domaine.competences.length).toBe(1);
      expect(domaine.competences[0].type).toBe('competence');
    });
  });
  
  describe('Interface ElementDomaineDeCompetence', () => {
    it('devrait utiliser le champ "competences" au lieu de "items"', () => {
      const element: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: 'Test',
        contenu: 'Contenu test',
        competences: [ // ❌ RED : Le champ s'appelle encore "items"
          {
            type: 'competence',
            titre: 'Compétence 1',
            description: 'Description',
            bouton: null,
          },
        ],
      };
      
      expect(element.competences).toBeDefined();
      expect(element.competences.length).toBe(1);
    });
  });
  
  describe('Interface BoutonGroupe', () => {
    it('devrait avoir un champ type égal à "bouton"', () => {
      const bouton: BoutonGroupe = {
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
  
  describe('Interface ElementGroupeBoutons', () => {
    it('devrait contenir des boutons avec le champ type', () => {
      const element: ElementGroupeBoutons = {
        type: 'groupeBoutons',
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
        competences: [
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
      
      expect(element.competences).toBeDefined();
      expect(element.competences.length).toBe(2);
      
      element.competences.forEach((competence) => {
        expect(competence.type).toBe('competence');
        
        if (competence.bouton) {
          expect(competence.bouton.type).toBe('bouton');
        }
      });
    });
  });
});
