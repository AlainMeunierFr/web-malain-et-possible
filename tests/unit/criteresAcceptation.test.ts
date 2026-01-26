/**
 * Tests TDD pour la détection et le parsing des "Critères d'acceptation" dans les User Stories
 * APPROCHE TDD : Du simple au complexe
 * 
 * US-3.6 : Amélioration de l'affichage des "Critères d'acceptation" dans le wiki
 */

import { parseSectionContent } from '../../utils/aboutSiteReader';
import type { ContenuElement } from '../../utils/aboutSiteReader';

describe('Détection et parsing des Critères d\'acceptation - US-3.6', () => {
  describe('ITÉRATION 1 : Détection de la section "Critères d\'acceptation"', () => {
    it('devrait détecter la ligne "- **Critères d\'acceptation** :" comme début de section', () => {
      // ARRANGE : Ajouter une partie (###) avant la sous-partie (####)
      const contenu = `# Partie 1
## US-3.1 : Test
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- Un critère normal
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      const contenuParse = result.parties[0].sousParties[0].contenuParse;
      
      const criteresAcceptation = contenuParse.find(e => 
        e.type === 'ul' && e.typeDeContenu === "Critères d'acceptation"
      );
      expect(criteresAcceptation).toBeDefined();
      expect(criteresAcceptation?.items?.[0]).toContain("Critères d'acceptation");
    });
  });

  describe('ITÉRATION 2 : Fin de section à la prochaine US', () => {
    it('devrait terminer la section "Critères d\'acceptation" à la prochaine US', () => {
      // ARRANGE : Ajouter une partie (###) avant les sous-parties (####)
      const contenu = `# Partie 1
## US-3.1 : Test
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- Un critère normal
## US-3.2 : Autre test
- **En tant que** User
- **Je souhaite** Faire autre chose
- **Afin de** Atteindre un objectif
- **Critères d'acceptation** :
- Un autre critère
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(2);
      
      // La section "Critères d'acceptation" doit se terminer avant US-3.2
      const us31 = result.parties[0].sousParties[0].contenuParse;
      const criteres = us31.filter(e => 
        e.type === 'ul' && 
        (e.typeDeContenu === 'themeCritere' || e.typeDeContenu === 'critere')
      );
      expect(criteres.length).toBe(1); // Seulement le critère avant la prochaine US
    });
  });

  describe('ITÉRATION 3 : Fin de section à un séparateur ---', () => {
    it('devrait terminer la section "Critères d\'acceptation" à un séparateur ---', () => {
      // ARRANGE : Ajouter une partie (###) avant la sous-partie (####)
      const contenu = `# Partie 1
## US-3.1 : Test
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- Un critère normal
---
Autre contenu après le séparateur
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      const us31 = result.parties[0].sousParties[0].contenuParse;
      const criteres = us31.filter(e => 
        e.type === 'ul' && 
        (e.typeDeContenu === 'themeCritere' || e.typeDeContenu === 'critere')
      );
      expect(criteres.length).toBe(1); // Seulement le critère avant le séparateur
    });
  });

  describe('ITÉRATION 4 : Détection d\'un thème de critère', () => {
    it('devrait détecter une ligne commençant par "- **" comme thème de critère', () => {
      // ARRANGE : Ajouter une partie (###) avant la sous-partie (####)
      const contenu = `# Partie 1
## US-3.1 : Test
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **CSS responsive** :
- Un critère normal
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      const us31 = result.parties[0].sousParties[0].contenuParse;
      const theme = us31.find(e => 
        e.type === 'ul' && e.typeDeContenu === 'themeCritere'
      );
      expect(theme).toBeDefined();
      expect(theme?.items?.[0]).toContain('CSS responsive');
    });
  });

  describe('ITÉRATION 5 : Détection d\'un critère normal', () => {
    it('devrait détecter une ligne commençant par "- " (sans **) comme critère normal', () => {
      // ARRANGE : Ajouter une partie (###) avant la sous-partie (####)
      const contenu = `# Partie 1
## US-3.1 : Test
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- Un critère normal sans gras
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      const us31 = result.parties[0].sousParties[0].contenuParse;
      const critere = us31.find(e => 
        e.type === 'ul' && e.typeDeContenu === 'critere'
      );
      expect(critere).toBeDefined();
      expect(critere?.items?.[0]).toBe('Un critère normal sans gras');
    });
  });

  describe('ITÉRATION 6 : Hiérarchie thème-critères', () => {
    it('devrait associer les critères au dernier thème rencontré', () => {
      // ARRANGE : Ajouter une partie (###) avant la sous-partie (####)
      const contenu = `# Partie 1
## US-3.1 : Test
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **Thème 1** :
- Critère 1 sous thème 1
- Critère 2 sous thème 1
- **Thème 2** :
- Critère 1 sous thème 2
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      const us31 = result.parties[0].sousParties[0].contenuParse;
      
      const themes = us31.filter(e => 
        e.type === 'ul' && e.typeDeContenu === 'themeCritere'
      );
      const criteres = us31.filter(e => 
        e.type === 'ul' && e.typeDeContenu === 'critere'
      );
      
      expect(themes).toHaveLength(2);
      expect(criteres).toHaveLength(3);
      
      // Vérifier l'ordre : Thème 1, Critères 1-2, Thème 2, Critère 3
      const elements = us31.filter(e => 
        e.type === 'ul' && 
        (e.typeDeContenu === 'themeCritere' || e.typeDeContenu === 'critere')
      );
      
      expect(elements[0].typeDeContenu).toBe('themeCritere');
      expect(elements[0].items?.[0]).toContain('Thème 1');
      expect(elements[1].typeDeContenu).toBe('critere');
      expect(elements[2].typeDeContenu).toBe('critere');
      expect(elements[3].typeDeContenu).toBe('themeCritere');
      expect(elements[3].items?.[0]).toContain('Thème 2');
      expect(elements[4].typeDeContenu).toBe('critere');
    });
  });

  describe('ITÉRATION 7 : Cas complexe avec plusieurs thèmes et critères', () => {
    it('devrait parser correctement une section complète de critères d\'acceptation', () => {
      // ARRANGE : Ajouter une partie (###) avant la sous-partie (####)
      const contenu = `# Partie 1
## US-3.1 : Test
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **Détection du format** :
- Le parseur détecte...
- La section commence par...
- **Structure de données** :
- Les éléments sont enrichis...
- Les thèmes sont distingués...
- **Affichage CSS** :
- Les thèmes s'affichent en gras
- Les critères s'affichent normal
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      const us31 = result.parties[0].sousParties[0].contenuParse;
      
      const themes = us31.filter(e => 
        e.type === 'ul' && e.typeDeContenu === 'themeCritere'
      );
      
      expect(themes).toHaveLength(3);
      expect(themes[0].items?.[0]).toContain('Détection du format');
      expect(themes[1].items?.[0]).toContain('Structure de données');
      expect(themes[2].items?.[0]).toContain('Affichage CSS');
    });
  });

  describe('ITÉRATION 8 : Fin de section à la fin de la sous-partie', () => {
    it('devrait terminer la section "Critères d\'acceptation" à la fin de la sous-partie (H4)', () => {
      // ARRANGE
      const contenu = `# Partie 1
## US-3.1 : Test
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- Un critère normal
## US-3.2 : Autre US
- **En tant que** User
`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      const us31 = result.parties[0].sousParties[0].contenuParse;
      const criteres = us31.filter(e => 
        e.type === 'ul' && 
        (e.typeDeContenu === 'themeCritere' || e.typeDeContenu === 'critere')
      );
      expect(criteres.length).toBe(1); // Seulement le critère avant la fin de sous-partie
    });
  });
});
