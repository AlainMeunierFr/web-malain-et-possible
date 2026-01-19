/**
 * Tests TDD pour les sous-parties spéciales (Prompt et Résultat technique)
 * APPROCHE TDD : Du simple au complexe
 * 
 * Test 1 : Détecter une sous-partie "#### Prompt"
 * Test 2 : Détecter une sous-partie "#### Résultat technique"
 * Test 3 : Les sous-parties spéciales doivent avoir typeDeContenu = "Prompt" ou "Résultat technique"
 * Test 4 : Les autres sous-parties ne doivent pas avoir typeDeContenu
 */

import { parseSectionContent } from '../../utils/aboutSiteReader';

describe('parseSectionContent - Sous-parties spéciales', () => {
  describe('Test 1 : Détecter "#### Prompt"', () => {
    it('devrait détecter une sous-partie "Prompt" comme spéciale', () => {
      // ARRANGE
      const contenu = `### Titre Partie
#### Prompt
Contenu du prompt.`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties[0].sousParties).toHaveLength(1);
      expect(result.parties[0].sousParties[0].titre).toBe('Prompt');
      expect(result.parties[0].sousParties[0].typeDeContenu).toBe('Prompt');
    });
  });

  describe('Test 2 : Détecter "#### Résultat technique"', () => {
    it('devrait détecter une sous-partie "Résultat technique" comme spéciale', () => {
      // ARRANGE
      const contenu = `### Titre Partie
#### Résultat technique
Contenu du résultat technique.`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties[0].sousParties).toHaveLength(1);
      expect(result.parties[0].sousParties[0].titre).toBe('Résultat technique');
      expect(result.parties[0].sousParties[0].typeDeContenu).toBe('Résultat technique');
    });
  });

  describe('Test 3 : Sous-partie normale ne doit pas être spéciale', () => {
    it('devrait ne pas marquer une sous-partie normale comme spéciale', () => {
      // ARRANGE
      const contenu = `### Titre Partie
#### Autre sous-partie
Contenu normal.`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties[0].sousParties).toHaveLength(1);
      expect(result.parties[0].sousParties[0].titre).toBe('Autre sous-partie');
      expect(result.parties[0].sousParties[0].typeDeContenu).toBeUndefined();
    });
  });

  describe('Test 4 : Détection insensible à la casse', () => {
    it('devrait détecter "#### prompt" (minuscule) comme spéciale', () => {
      // ARRANGE
      const contenu = `### Titre Partie
#### prompt
Contenu.`;

      // ACT
      const result = parseSectionContent(contenu);

      // ASSERT
      expect(result.parties[0].sousParties[0].typeDeContenu).toBe('Prompt');
    });
  });
});
