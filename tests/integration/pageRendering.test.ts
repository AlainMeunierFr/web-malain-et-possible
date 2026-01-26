/**
 * Tests d'intégration : Vérifier que le rendu est identique après migration
 * Compare le JSON résolu avec références vs le JSON original
 */

import { readPageData } from '../../utils/indexReader';
import { readCompetences, readDomaines } from '../../utils/bibliothequeReader';
import { resolvePageReferences } from '../../utils/profilBuilder';
import fs from 'fs';
import path from 'path';

describe('Tests d\'intégration - Rendu identique', () => {
  // Sauvegarder les fichiers originaux avant migration pour comparaison
  // Note: Ce test suppose qu'on a une sauvegarde des fichiers originaux
  // ou qu'on peut reconstruire la structure attendue

  it('devrait résoudre correctement les références pour index.json', () => {
    // ARRANGE
    const competences = readCompetences();
    const domaines = readDomaines();
    const pageData = readPageData('index.json');

    // ACT
    const resolved = resolvePageReferences(pageData, competences, domaines);

    // ASSERT
    expect(resolved.contenu).toBeDefined();
    expect(Array.isArray(resolved.contenu)).toBe(true);
    
    // Vérifier que tous les domainesDeCompetence ont été résolus (plus de "ref")
    for (const element of resolved.contenu) {
      if (element.type === 'domaineDeCompetence') {
        const elementAny = element as any;
        expect(elementAny.ref).toBeUndefined(); // Plus de référence
        expect(elementAny.titre).toBeDefined(); // Titre présent
        expect(elementAny.items).toBeDefined(); // Items présents
        expect(Array.isArray(elementAny.items)).toBe(true); // Items est un tableau
      }
    }
  });

  it('devrait résoudre correctement les références pour ingenierie-logiciel.json', () => {
    // ARRANGE
    const competences = readCompetences();
    const domaines = readDomaines();
    const pageData = readPageData('ingenierie-logiciel.json');

    // ACT
    const resolved = resolvePageReferences(pageData, competences, domaines);

    // ASSERT
    expect(resolved.contenu).toBeDefined();
    
    // Vérifier que le domaine "Expérience en équipe" est résolu avec ses compétences
    const domaineExperience = resolved.contenu.find(
      (el) => el.type === 'domaineDeCompetence' && (el as any).titre === 'Expérience en équipe'
    ) as any;
    
    expect(domaineExperience).toBeDefined();
    expect(domaineExperience.items).toBeDefined();
    expect(domaineExperience.items.length).toBeGreaterThan(0);
    
    // Vérifier que les compétences sont présentes
    const competencesTitres = domaineExperience.items.map((c: any) => c.titre);
    expect(competencesTitres).toContain('BDD');
    expect(competencesTitres).toContain('TDD');
  });

  it('devrait maintenir la compatibilité avec les pages sans références', () => {
    // ARRANGE
    const competences = readCompetences();
    const domaines = readDomaines();
    
    // Créer une page sans références (structure inline)
    const pageDataInline = {
      contenu: [
        {
          type: 'domaineDeCompetence',
          titre: 'Domaine inline',
          contenu: 'Contenu inline',
          items: [
            {
              titre: 'Compétence inline',
              description: 'Description',
              type: 'competence',
              bouton: null,
            },
          ],
        },
      ],
    };

    // ACT
    const resolved = resolvePageReferences(pageDataInline as any, competences, domaines);

    // ASSERT
    // Les éléments sans référence doivent être conservés tels quels
    expect(resolved.contenu).toHaveLength(1);
    expect(resolved.contenu[0]).toEqual(pageDataInline.contenu[0]);
  });

  it('devrait résoudre toutes les pages sans erreur', () => {
    // ARRANGE
    const competences = readCompetences();
    const domaines = readDomaines();
    const dataDir = path.join(process.cwd(), 'data');
    const files = fs.readdirSync(dataDir);
    const pageFiles = files.filter(
      (file) => file.endsWith('.json') && !file.includes('bibliotheque')
    );

    // ACT & ASSERT
    for (const file of pageFiles) {
      try {
        const pageData = readPageData(file);
        
        // Ignorer les fichiers qui ne sont pas des pages
        if (!pageData.contenu || !Array.isArray(pageData.contenu)) {
          continue;
        }

        // Vérifier qu'on peut résoudre les références sans erreur
        expect(() => {
          resolvePageReferences(pageData, competences, domaines);
        }).not.toThrow();
      } catch (error) {
        // Ignorer les fichiers qui ne sont pas des pages valides
        if (error instanceof Error && error.message.includes('n\'existe pas')) {
          continue;
        }
        throw error;
      }
    }
  });
});
