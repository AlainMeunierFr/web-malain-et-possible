/**
 * Tests TDD pour la détection des thèmes et critères dans la section "Critères d'acceptation"
 * APPROCHE TDD : Red → Green → Refactor
 */

import { parseSectionContent } from '../../utils/aboutSiteReader';
import type { ContenuElement } from '../../utils/aboutSiteReader';

describe('Détection des thèmes et critères dans "Critères d\'acceptation"', () => {
  describe('Détection de la section "Critères d\'acceptation"', () => {
    it('devrait détecter la ligne "- **Critères d\'acceptation** :" comme début de section', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **CSS responsive** :
- Un bloc conteneur...
`;

      const result = parseSectionContent(markdown);

      // Accéder aux éléments via la sous-partie
      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(1);
      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      // Trouver l'élément "Critères d'acceptation"
      const criteresElement = elements.find(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );

      expect(criteresElement).toBeDefined();
      expect(criteresElement?.typeDeContenu).toBe("Critères d'acceptation");
      expect(criteresElement?.items?.[0]).toContain("Critères d'acceptation");
    });
  });

  describe('Détection des thèmes de critères', () => {
    it('devrait détecter une ligne commençant par "- **" comme un thème de critère', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **CSS responsive** :
- Un bloc conteneur...
`;

      const result = parseSectionContent(markdown);

      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      // Trouver l'élément après "Critères d'acceptation"
      const criteresIndex = elements.findIndex(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );
      const themeElement = elements[criteresIndex + 1];

      expect(themeElement).toBeDefined();
      expect(themeElement?.typeDeContenu).toBe('themeCritere');
      expect(themeElement?.items?.[0]).toContain('CSS responsive');
    });

    it('devrait extraire le texte entre `**` comme titre du thème', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **Détection du format** :
`;

      const result = parseSectionContent(markdown);

      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      const criteresIndex = elements.findIndex(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );
      const themeElement = elements[criteresIndex + 1];

      expect(themeElement?.items?.[0]).toMatch(/\*\*Détection du format\*\*/);
    });
  });

  describe('Détection des critères normaux', () => {
    it('devrait détecter une ligne commençant par "- " (sans `**`) comme un critère', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **CSS responsive** :
- Un bloc conteneur principal...
`;

      const result = parseSectionContent(markdown);

      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      const criteresIndex = elements.findIndex(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );
      const themeElement = elements[criteresIndex + 1];
      const critereElement = elements[criteresIndex + 2];

      expect(critereElement).toBeDefined();
      expect(critereElement?.typeDeContenu).toBe('critere');
      expect(critereElement?.items?.[0]).toContain('Un bloc conteneur principal');
    });

    it('devrait extraire le texte après "- " comme contenu du critère', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **CSS responsive** :
- Premier sous-bloc horizontal...
`;

      const result = parseSectionContent(markdown);

      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      const criteresIndex = elements.findIndex(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );
      const critereElement = elements[criteresIndex + 2];

      expect(critereElement?.items?.[0]).toBe('Premier sous-bloc horizontal...');
      expect(critereElement?.items?.[0]).not.toMatch(/^\*\*/);
    });
  });

  describe('Hiérarchie thème-critères', () => {
    it('devrait associer les critères au dernier thème rencontré', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
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

      const result = parseSectionContent(markdown);

      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      const criteresIndex = elements.findIndex(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );

      // Thème 1
      const theme1 = elements[criteresIndex + 1];
      expect(theme1?.typeDeContenu).toBe('themeCritere');
      expect(theme1?.items?.[0]).toContain('Thème 1');

      // Critère 1 sous thème 1
      const critere1 = elements[criteresIndex + 2];
      expect(critere1?.typeDeContenu).toBe('critere');
      expect(critere1?.items?.[0]).toBe('Critère 1 sous thème 1');

      // Critère 2 sous thème 1
      const critere2 = elements[criteresIndex + 3];
      expect(critere2?.typeDeContenu).toBe('critere');
      expect(critere2?.items?.[0]).toBe('Critère 2 sous thème 1');

      // Thème 2
      const theme2 = elements[criteresIndex + 4];
      expect(theme2?.typeDeContenu).toBe('themeCritere');
      expect(theme2?.items?.[0]).toContain('Thème 2');

      // Critère 1 sous thème 2
      const critere3 = elements[criteresIndex + 5];
      expect(critere3?.typeDeContenu).toBe('critere');
      expect(critere3?.items?.[0]).toBe('Critère 1 sous thème 2');
    });
  });

  describe('Fin de la section "Critères d\'acceptation"', () => {
    it('devrait terminer la section à la prochaine US (## US-)', () => {
      const markdown = `# Epic 1
## US-1.1 : Première US
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **CSS responsive** :
- Un bloc conteneur...
## US-1.2 : Autre US
- **En tant que** Visiteur
`;

      const result = parseSectionContent(markdown);

      expect(result.parties).toHaveLength(1);
      expect(result.parties[0].sousParties).toHaveLength(2);
      
      // Vérifier que la première US a bien ses critères
      const sousPartie1 = result.parties[0].sousParties[0];
      const elements1 = sousPartie1.contenuParse;
      const criteresIndex = elements1.findIndex(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );

      // Les éléments après "Critères d'acceptation" devraient être les thèmes et critères
      // Mais pas les éléments de la nouvelle US
      const elementsAfterCriteres = elements1.slice(criteresIndex + 1);
      const hasNewUS = elementsAfterCriteres.some((el) =>
        el.items?.[0]?.includes('US-1.2')
      );

      // La nouvelle US ne devrait pas être dans les critères de la première US
      expect(hasNewUS).toBe(false);
      
      // Vérifier que la deuxième US existe
      const sousPartie2 = result.parties[0].sousParties[1];
      expect(sousPartie2.titre).toBe('US-1.2 : Autre US');
    });

    it('devrait terminer la section à un séparateur (---)', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **CSS responsive** :
- Un bloc conteneur...
---
#### Autre section
`;

      const result = parseSectionContent(markdown);

      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      // La section devrait se terminer avant "---"
      // Vérifier que les éléments sont bien détectés jusqu'au séparateur
      const criteresIndex = elements.findIndex(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );

      // Les éléments après "Critères d'acceptation" devraient être les thèmes et critères
      const elementsAfterCriteres = elements.slice(criteresIndex + 1);
      const hasSeparator = elementsAfterCriteres.some((el) =>
        el.items?.[0]?.includes('---')
      );

      // Le séparateur ne devrait pas être dans les critères (car il marque la fin)
      // En fait, le séparateur devrait être ignoré dans le parsing
      expect(hasSeparator).toBe(false);
    });
  });

  describe('Cas limites', () => {
    it('devrait gérer une section "Critères d\'acceptation" vide', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
`;

      const result = parseSectionContent(markdown);

      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      const criteresElement = elements.find(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );

      expect(criteresElement).toBeDefined();
      expect(criteresElement?.typeDeContenu).toBe("Critères d'acceptation");
    });

    it('devrait gérer une section avec uniquement des thèmes (sans critères)', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- **Thème 1** :
- **Thème 2** :
`;

      const result = parseSectionContent(markdown);

      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      const criteresIndex = elements.findIndex(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );

      const theme1 = elements[criteresIndex + 1];
      const theme2 = elements[criteresIndex + 2];

      expect(theme1?.typeDeContenu).toBe('themeCritere');
      expect(theme2?.typeDeContenu).toBe('themeCritere');
    });

    it('devrait gérer une section avec uniquement des critères (sans thème)', () => {
      const markdown = `# Epic 1
## US-1.1 : Affichage initial
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher...
- **Afin de** Valider...
- **Critères d'acceptation** :
- Critère 1
- Critère 2
`;

      const result = parseSectionContent(markdown);

      const sousPartie = result.parties[0].sousParties[0];
      const elements = sousPartie.contenuParse;

      const criteresIndex = elements.findIndex(
        (el) => el.typeDeContenu === "Critères d'acceptation"
      );

      const critere1 = elements[criteresIndex + 1];
      const critere2 = elements[criteresIndex + 2];

      expect(critere1?.typeDeContenu).toBe('critere');
      expect(critere2?.typeDeContenu).toBe('critere');
    });
  });
});
