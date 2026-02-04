/**
 * Tests TDD pour la détection des User Stories et attribution typeDeContenu
 * APPROCHE TDD : Du simple au complexe
 * 
 * ITÉRATION 1 : Détecter une User Story complète avec les 4 éléments
 * ITÉRATION 2 : Ne pas attribuer typeDeContenu si les 4 éléments ne sont pas présents
 * ITÉRATION 3 : Ne pas attribuer typeDeContenu si les éléments ne sont pas sous un H4
 * ITÉRATION 4 : Gérer plusieurs User Stories dans un même fichier
 */

import { parseSectionContent } from '../../utils/server';

describe('parseSectionContent - Détection User Stories', () => {
  describe('ITÉRATION 1 : Détecter une User Story complète avec les 4 éléments', () => {
    it('devrait détecter une User Story et attribuer les typeDeContenu', () => {
      // ARRANGE : User Story complète avec les 4 éléments
      const contenu = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Visiteur du site
- **Je souhaite** Voir une page s'afficher
- **Afin de** Vérifier que le site fonctionne
- **Critères d'acceptation** :
  - La page affiche "Hello World"
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      const sousPartie = result.parties[0].sousParties[0];
      expect(sousPartie.titre).toBe('US-1.1 : Affichage initial');
      
      // Vérifier que les éléments de liste ont le bon typeDeContenu
      expect(sousPartie.contenuParse).toBeDefined();
      expect(sousPartie.contenuParse.length).toBeGreaterThan(0);
      
      // Vérifier que les 4 typeDeContenu sont attribués
      const typeDeContenus = sousPartie.contenuParse
        .filter(e => e.typeDeContenu)
        .map(e => e.typeDeContenu);
      
      expect(typeDeContenus).toContain('En tant que');
      expect(typeDeContenus).toContain('Je souhaite');
      expect(typeDeContenus).toContain('Afin de');
      expect(typeDeContenus).toContain('Critères d\'acceptation');
    });
  });

  describe('ITÉRATION 2 : Ne pas attribuer typeDeContenu si les 4 éléments ne sont pas présents', () => {
    it('ne devrait pas attribuer typeDeContenu si seulement 2 éléments sont présents', () => {
      // ARRANGE : User Story incomplète
      const contenu = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Visiteur du site
- **Je souhaite** Voir une page s'afficher
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      const sousPartie = result.parties[0].sousParties[0];
      
      // Les éléments ne doivent pas avoir de typeDeContenu car les 4 ne sont pas présents
      const typeDeContenus = sousPartie.contenuParse
        .filter(e => e.typeDeContenu)
        .map(e => e.typeDeContenu);
      
      expect(typeDeContenus.length).toBe(0);
    });
  });

  describe('ITÉRATION 3 : Ne pas attribuer typeDeContenu aux listes normales', () => {
    it('ne devrait pas attribuer typeDeContenu aux listes sans format US', () => {
      // ARRANGE : Listes normales (sans format US)
      const contenu = `# Partie normale
- Premier élément
- Deuxième élément
- Troisième élément
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      // Les éléments ne doivent pas avoir de typeDeContenu car ce ne sont pas des US
      const partie = result.parties[0];
      const typeDeContenus = partie.contenuParse
        .filter(e => e.typeDeContenu)
        .map(e => e.typeDeContenu);
      
      expect(typeDeContenus.length).toBe(0);
    });
  });

  describe('ITÉRATION 4 : Gérer plusieurs User Stories dans un même fichier', () => {
    it('devrait détecter plusieurs User Stories et attribuer les typeDeContenu à chacune', () => {
      // ARRANGE : Plusieurs User Stories
      const contenu = `# Epic 1
## US-1.1 : Première US
- **En tant que** Visiteur
- **Je souhaite** Voir quelque chose
- **Afin de** Faire quelque chose
- **Critères d'acceptation** :
  - Critère 1

## US-1.2 : Deuxième US
- **En tant que** Utilisateur
- **Je souhaite** Faire autre chose
- **Afin de** Atteindre un objectif
- **Critères d'acceptation** :
  - Critère 2
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(2);
      
      // Les deux User Stories doivent avoir leurs typeDeContenu attribués
      const us1 = result.parties[0].sousParties[0];
      const us2 = result.parties[0].sousParties[1];
      
      const typeDeContenus1 = us1.contenuParse
        .filter(e => e.typeDeContenu)
        .map(e => e.typeDeContenu);
      const typeDeContenus2 = us2.contenuParse
        .filter(e => e.typeDeContenu)
        .map(e => e.typeDeContenu);
      
      // Vérifier que les 4 éléments de base sont présents (les thèmes/critères sont des éléments supplémentaires)
      expect(typeDeContenus1).toContain('En tant que');
      expect(typeDeContenus1).toContain('Je souhaite');
      expect(typeDeContenus1).toContain('Afin de');
      expect(typeDeContenus1).toContain('Critères d\'acceptation');
      
      expect(typeDeContenus2).toContain('En tant que');
      expect(typeDeContenus2).toContain('Je souhaite');
      expect(typeDeContenus2).toContain('Afin de');
      expect(typeDeContenus2).toContain('Critères d\'acceptation');
    });
  });
});
