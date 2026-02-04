/**
 * Tests unitaires pour la spécification OpenAPI
 * US-12.6 - CA6 : Documentation Swagger
 */

import { generateOpenApiSpec } from '../../utils/vitrine/openApiSpec';

describe('generateOpenApiSpec', () => {
  const spec = generateOpenApiSpec();

  it('retourne une spécification OpenAPI 3.0 valide', () => {
    // Vérifier les champs obligatoires OpenAPI 3.0
    expect(spec.openapi).toMatch(/^3\.0\./);
    expect(spec.info).toBeDefined();
    expect(spec.info.title).toBeDefined();
    expect(spec.info.version).toBeDefined();
    expect(spec.paths).toBeDefined();
  });

  it('documente les endpoints principaux de l\'API Vitrine', () => {
    // Vérifier que les endpoints sont documentés
    expect(spec.paths['/api/vitrine/pages']).toBeDefined();
    expect(spec.paths['/api/vitrine/profils']).toBeDefined();
    expect(spec.paths['/api/vitrine/domaines']).toBeDefined();
    expect(spec.paths['/api/vitrine/competences']).toBeDefined();
    expect(spec.paths['/api/vitrine/experiences']).toBeDefined();
    expect(spec.paths['/api/vitrine/temoignages']).toBeDefined();
    expect(spec.paths['/api/vitrine/detournements']).toBeDefined();
    expect(spec.paths['/api/vitrine/version']).toBeDefined();
  });

  it('documente les endpoints avec paramètres slug/id', () => {
    // Vérifier les endpoints avec paramètres
    expect(spec.paths['/api/vitrine/pages/{slug}']).toBeDefined();
    expect(spec.paths['/api/vitrine/profils/{slug}']).toBeDefined();
    expect(spec.paths['/api/vitrine/domaines/{slug}']).toBeDefined();
    expect(spec.paths['/api/vitrine/competences/{slug}']).toBeDefined();
    expect(spec.paths['/api/vitrine/experiences/{id}']).toBeDefined();
  });

  it('documente le paramètre mode pour les endpoints non-feuilles', () => {
    // Vérifier que le paramètre mode est documenté
    const pagesPath = spec.paths['/api/vitrine/pages'] as {
      get: {
        parameters: Array<{
          name: string;
          required: boolean;
          schema: { enum: string[] };
        }>;
      };
    };
    expect(pagesPath.get.parameters).toBeDefined();

    const modeParam = pagesPath.get.parameters.find((p) => p.name === 'mode');
    expect(modeParam).toBeDefined();
    expect(modeParam!.required).toBe(true);
    expect(modeParam!.schema.enum).toContain('refs');
    expect(modeParam!.schema.enum).toContain('full');
  });

  it('indique que le mode est optionnel pour les endpoints feuilles', () => {
    // Vérifier que le paramètre mode est optionnel ou absent pour les feuilles
    const experiencesPath = spec.paths['/api/vitrine/experiences'] as {
      get: {
        parameters?: Array<{ name: string; required: boolean }>;
      };
    };
    const modeParam = experiencesPath.get.parameters?.find(
      (p) => p.name === 'mode',
    );

    // Le mode est soit absent, soit optionnel
    if (modeParam) {
      expect(modeParam.required).toBeFalsy();
    } else {
      expect(modeParam).toBeUndefined();
    }
  });

  it('inclut les schémas de données (ProfilAPI, DomaineAPI, etc.)', () => {
    // Vérifier que les schémas sont définis
    expect(spec.components).toBeDefined();
    expect(spec.components.schemas).toBeDefined();
    expect(spec.components.schemas.ProfilAPI).toBeDefined();
    expect(spec.components.schemas.DomaineAPI).toBeDefined();
    expect(spec.components.schemas.CompetenceAPI).toBeDefined();
    expect(spec.components.schemas.ExperienceAPI).toBeDefined();
  });

  it('inclut des exemples de réponses pour les profils', () => {
    // Vérifier qu'au moins un endpoint a des exemples
    const profilsPath = spec.paths['/api/vitrine/profils/{slug}'] as {
      get: {
        responses: Record<
          string,
          {
            content?: {
              'application/json'?: {
                examples?: Record<string, unknown>;
              };
            };
          }
        >;
      };
    };
    const getOperation = profilsPath.get;

    expect(getOperation.responses).toBeDefined();
    expect(getOperation.responses['200']).toBeDefined();
    expect(
      getOperation.responses['200'].content?.['application/json']?.examples,
    ).toBeDefined();
  });

  it('inclut les tags pour organiser les endpoints', () => {
    expect(spec.tags).toBeDefined();
    expect(spec.tags.length).toBeGreaterThan(0);

    const tagNames = spec.tags.map((t) => t.name);
    expect(tagNames).toContain('Pages');
    expect(tagNames).toContain('Profils');
    expect(tagNames).toContain('Domaines');
    expect(tagNames).toContain('Compétences');
    expect(tagNames).toContain('Expériences');
  });

  it('inclut les réponses d\'erreur communes', () => {
    expect(spec.components.responses.MissingMode).toBeDefined();
    expect(spec.components.responses.NotFound).toBeDefined();
  });
});
