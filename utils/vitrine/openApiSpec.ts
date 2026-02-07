/**
 * Génération de la spécification OpenAPI pour l'API Vitrine
 * US-12.6 - CA6 : Documentation Swagger
 */

export interface OpenApiSpec {
  openapi: string;
  info: {
    title: string;
    description: string;
    version: string;
    contact?: {
      name: string;
      url: string;
    };
  };
  servers: Array<{ url: string; description: string }>;
  tags: Array<{ name: string; description: string }>;
  paths: Record<string, unknown>;
  components: {
    schemas: Record<string, unknown>;
    responses: Record<string, unknown>;
  };
}

/**
 * Génère le paramètre mode pour les endpoints non-feuilles
 */
function getModeParameter(required: boolean) {
  return {
    name: 'mode',
    in: 'query',
    required,
    description:
      'Mode de réponse : `refs` (clés étrangères) ou `full` (arbre complet)',
    schema: {
      type: 'string',
      enum: ['refs', 'full'],
    },
  };
}

/**
 * Génère le paramètre slug pour les endpoints avec paramètre
 */
function getSlugParameter(resourceName: string) {
  return {
    name: 'slug',
    in: 'path',
    required: true,
    description: `Identifiant unique de la ressource ${resourceName}`,
    schema: { type: 'string' },
  };
}

/**
 * Paramètre format pour les endpoints Pages (optionnel).
 * Les deux formats appellent le même code (readPageData).
 */
function getFormatParameter() {
  return {
    name: 'format',
    in: 'query',
    required: false,
    description:
      'Format de sortie : `json` (défaut) ou `ascii` (hiérarchie containers en ASCII Art). Même code appelé pour les deux.',
    schema: { type: 'string', enum: ['json', 'ascii'], default: 'json' },
  };
}

/**
 * Génère la spécification OpenAPI 3.0 pour l'API Vitrine
 */
export function generateOpenApiSpec(): OpenApiSpec {
  return {
    openapi: '3.0.3',
    info: {
      title: 'API du site',
      description:
        "API REST pour accéder aux données du site vitrine. Deux modes de réponse : `refs` (clés étrangères) ou `full` (arbre complet embarqué).",
      version: '1.0.0',
    },
    servers: [
      {
        url: '/',
        description: 'Serveur courant',
      },
    ],
    tags: [
      { name: 'Pages', description: 'Gestion des pages du site' },
      { name: 'Menu', description: 'Menu header (entrées et sous-menus)' },
      { name: 'Profils', description: 'Profils professionnels' },
      { name: 'Domaines', description: 'Domaines de compétences' },
      { name: 'Compétences', description: 'Compétences détaillées' },
      { name: 'Expériences', description: 'Expériences professionnelles' },
      { name: 'Témoignages', description: 'Témoignages clients' },
      { name: 'Détournements', description: 'Détournements vidéo' },
      { name: 'Système', description: 'Informations système' },
    ],
    paths: {
      // Endpoints Pages
      '/api/vitrine/pages': {
        get: {
          tags: ['Pages'],
          summary: 'Liste des pages',
          description: 'Retourne la liste des pages du site',
          parameters: [getModeParameter(true)],
          responses: {
            '200': {
              description: 'Liste des pages',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/PageAPI' },
                  },
                },
              },
            },
            '400': { $ref: '#/components/responses/MissingMode' },
          },
        },
      },
      '/api/vitrine/pages/{slug}': {
        get: {
          tags: ['Pages'],
          summary: "Détail d'une page",
          description: "Retourne le contenu d'une page spécifique",
          parameters: [getSlugParameter('Page'), getModeParameter(true)],
          responses: {
            '200': {
              description: 'Contenu de la page',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/PageContentAPI' },
                },
              },
            },
            '400': { $ref: '#/components/responses/MissingMode' },
            '404': { $ref: '#/components/responses/NotFound' },
          },
        },
      },

      // Endpoints Profils
      '/api/vitrine/profils': {
        get: {
          tags: ['Profils'],
          summary: 'Liste des profils',
          description: 'Retourne la liste des profils professionnels',
          parameters: [getModeParameter(true)],
          responses: {
            '200': {
              description: 'Liste des profils',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ProfilAPI' },
                  },
                },
              },
            },
            '400': { $ref: '#/components/responses/MissingMode' },
          },
        },
      },
      '/api/vitrine/profils/{slug}': {
        get: {
          tags: ['Profils'],
          summary: "Détail d'un profil",
          description:
            'Retourne un profil avec ses domaines, compétences et expériences',
          parameters: [getSlugParameter('Profil'), getModeParameter(true)],
          responses: {
            '200': {
              description: 'Profil détaillé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ProfilAPI' },
                  examples: {
                    refs: {
                      summary: 'Mode refs - clés étrangères',
                      value: {
                        slug: 'agile',
                        titre: 'Transformation Agile',
                        jobTitles: ['Coach Agile', 'Scrum Master'],
                        cvPath: '/CV/agile.pdf',
                        domaines: [
                          'strategie-et-transformations',
                          'faire-avec-les-equipes',
                        ],
                      },
                    },
                    full: {
                      summary: 'Mode full - arbre complet',
                      value: {
                        slug: 'agile',
                        titre: 'Transformation Agile',
                        jobTitles: ['Coach Agile', 'Scrum Master'],
                        cvPath: '/CV/agile.pdf',
                        domaines: [
                          {
                            slug: 'strategie-et-transformations',
                            titre: 'Stratégie et transformations',
                            competences: ['...'],
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            '400': { $ref: '#/components/responses/MissingMode' },
            '404': { $ref: '#/components/responses/NotFound' },
          },
        },
      },

      // Endpoints Domaines
      '/api/vitrine/domaines': {
        get: {
          tags: ['Domaines'],
          summary: 'Liste des domaines',
          description: 'Retourne la liste des domaines de compétences',
          parameters: [getModeParameter(true)],
          responses: {
            '200': {
              description: 'Liste des domaines',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/DomaineAPI' },
                  },
                },
              },
            },
            '400': { $ref: '#/components/responses/MissingMode' },
          },
        },
      },
      '/api/vitrine/domaines/{slug}': {
        get: {
          tags: ['Domaines'],
          summary: "Détail d'un domaine",
          description: 'Retourne un domaine avec ses compétences',
          parameters: [getSlugParameter('Domaine'), getModeParameter(true)],
          responses: {
            '200': {
              description: 'Domaine détaillé',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/DomaineAPI' },
                },
              },
            },
            '400': { $ref: '#/components/responses/MissingMode' },
            '404': { $ref: '#/components/responses/NotFound' },
          },
        },
      },

      // Endpoints Compétences
      '/api/vitrine/competences': {
        get: {
          tags: ['Compétences'],
          summary: 'Liste des compétences',
          description: 'Retourne la liste des compétences',
          parameters: [getModeParameter(true)],
          responses: {
            '200': {
              description: 'Liste des compétences',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/CompetenceAPI' },
                  },
                },
              },
            },
            '400': { $ref: '#/components/responses/MissingMode' },
          },
        },
      },
      '/api/vitrine/competences/{slug}': {
        get: {
          tags: ['Compétences'],
          summary: "Détail d'une compétence",
          description: 'Retourne une compétence avec ses expériences',
          parameters: [getSlugParameter('Compétence'), getModeParameter(true)],
          responses: {
            '200': {
              description: 'Compétence détaillée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CompetenceAPI' },
                },
              },
            },
            '400': { $ref: '#/components/responses/MissingMode' },
            '404': { $ref: '#/components/responses/NotFound' },
          },
        },
      },

      // Endpoints feuilles (sans mode obligatoire)
      '/api/vitrine/experiences': {
        get: {
          tags: ['Expériences'],
          summary: 'Liste des expériences',
          description:
            'Retourne toutes les expériences triées par date. Mode optionnel (ignoré).',
          responses: {
            '200': {
              description: 'Liste des expériences',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ExperienceAPI' },
                  },
                },
              },
            },
          },
        },
      },
      '/api/vitrine/experiences/{id}': {
        get: {
          tags: ['Expériences'],
          summary: "Détail d'une expérience",
          description: 'Retourne une expérience spécifique par son ID',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: "Identifiant de l'expérience",
              schema: { type: 'string' },
            },
          ],
          responses: {
            '200': {
              description: 'Expérience détaillée',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ExperienceAPI' },
                },
              },
            },
            '404': { $ref: '#/components/responses/NotFound' },
          },
        },
      },
      '/api/vitrine/temoignages': {
        get: {
          tags: ['Témoignages'],
          summary: 'Liste des témoignages',
          description:
            'Retourne tous les témoignages clients. Mode optionnel (ignoré).',
          responses: {
            '200': {
              description: 'Liste des témoignages',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/TemoignageAPI' },
                  },
                },
              },
            },
          },
        },
      },
      '/api/vitrine/detournements': {
        get: {
          tags: ['Détournements'],
          summary: 'Liste des détournements vidéo',
          description:
            'Retourne tous les détournements vidéo. Mode optionnel (ignoré).',
          responses: {
            '200': {
              description: 'Liste des détournements',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/DetournementAPI' },
                  },
                },
              },
            },
          },
        },
      },
      '/api/vitrine/menu': {
        get: {
          tags: ['Menu'],
          summary: 'Menu header',
          description:
            'Retourne le menu header du site (entrées et sous-menus). Source : _Pages-Liens-Et-Menus.json (section menus).',
          responses: {
            '200': {
              description: 'Liste des entrées du menu avec sous-menus',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/MenuItemAPI' },
                  },
                },
              },
            },
            '500': {
              description: 'Erreur lecture du plan (fichier absent ou invalide)',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ApiError' },
                },
              },
            },
          },
        },
      },
      '/api/vitrine/version': {
        get: {
          tags: ['Système'],
          summary: 'Version du site',
          description: 'Retourne la version actuelle du site',
          responses: {
            '200': {
              description: 'Version du site',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/VersionAPI' },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        // Schémas principaux
        ProfilAPI: {
          type: 'object',
          properties: {
            slug: { type: 'string', description: 'Identifiant unique du profil' },
            titre: { type: 'string', description: 'Titre du profil' },
            jobTitles: {
              type: 'array',
              items: { type: 'string' },
              description: 'Titres de poste associés',
            },
            cvPath: { type: 'string', description: 'Chemin vers le CV PDF' },
            domaines: {
              oneOf: [
                {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Mode refs : slugs des domaines',
                },
                {
                  type: 'array',
                  items: { $ref: '#/components/schemas/DomaineAPI' },
                  description: 'Mode full : objets domaine complets',
                },
              ],
            },
          },
          required: ['slug', 'titre'],
        },
        DomaineAPI: {
          type: 'object',
          properties: {
            slug: { type: 'string', description: 'Identifiant unique du domaine' },
            titre: { type: 'string', description: 'Titre du domaine' },
            contenu: { type: 'string', description: 'Description du domaine' },
            auteur: { type: 'string', description: 'Citation - auteur' },
            competences: {
              oneOf: [
                {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Mode refs : slugs des compétences',
                },
                {
                  type: 'array',
                  items: { $ref: '#/components/schemas/CompetenceAPI' },
                  description: 'Mode full : objets compétence complets',
                },
              ],
            },
          },
          required: ['slug', 'titre'],
        },
        CompetenceAPI: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Identifiant unique de la compétence',
            },
            titre: { type: 'string', description: 'Titre de la compétence' },
            description: {
              type: 'string',
              description: 'Description de la compétence',
            },
            icon: { type: 'string', description: 'Icône associée' },
            image: {
              type: 'object',
              properties: {
                src: { type: 'string' },
                alt: { type: 'string' },
              },
            },
            experiences: {
              oneOf: [
                {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Mode refs : IDs des expériences',
                },
                {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ExperienceAPI' },
                  description: 'Mode full : objets expérience complets',
                },
              ],
            },
          },
          required: ['slug', 'titre'],
        },
        ExperienceAPI: {
          type: 'object',
          properties: {
            id: { type: 'string', description: "Identifiant de l'expérience" },
            categorie: {
              type: 'string',
              description: "Catégorie de l'expérience",
            },
            description: {
              type: 'string',
              description: "Description de l'expérience",
            },
            periode: {
              type: 'string',
              nullable: true,
              description: "Période de l'expérience",
            },
          },
          required: ['id', 'categorie', 'description'],
        },
        TemoignageAPI: {
          type: 'object',
          properties: {
            auteur: { type: 'string', description: 'Auteur du témoignage' },
            role: { type: 'string', description: "Rôle de l'auteur" },
            contenu: { type: 'string', description: 'Contenu du témoignage' },
            date: { type: 'string', description: 'Date du témoignage' },
          },
          required: ['auteur', 'role', 'contenu'],
        },
        DetournementAPI: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Identifiant unique du détournement',
            },
            titre: { type: 'string', description: 'Titre du détournement' },
            description: {
              type: 'string',
              description: 'Description du détournement',
            },
            videoUrl: { type: 'string', description: 'URL de la vidéo' },
            thumbnail: {
              type: 'string',
              description: 'URL de la miniature (optionnel)',
            },
          },
          required: ['slug', 'titre', 'videoUrl'],
        },
        PageAPI: {
          type: 'object',
          properties: {
            slug: { type: 'string', description: 'Identifiant unique de la page' },
            type: { type: 'string', description: 'Type de page' },
          },
          required: ['slug', 'type'],
        },
        PageContentAPI: {
          type: 'object',
          properties: {
            metadata: {
              type: 'object',
              properties: {
                titre: { type: 'string' },
                description: { type: 'string' },
              },
            },
            contenu: {
              type: 'array',
              items: { type: 'object' },
              description: 'Contenu de la page (variable selon le type)',
            },
          },
        },
        MenuItemAPI: {
          type: 'object',
          description: 'Entrée du menu header (avec sous-menus optionnels)',
          properties: {
            id: { type: 'string', description: 'Identifiant de l\'entrée' },
            label: { type: 'string', description: 'Libellé affiché' },
            url: { type: 'string', description: 'URL de la page' },
            sousMenu: {
              type: 'array',
              description: 'Sous-pages (ex. profils, portfolio)',
              items: {
                type: 'object',
                properties: {
                  label: { type: 'string' },
                  url: { type: 'string' },
                },
                required: ['label', 'url'],
              },
            },
          },
          required: ['id', 'label', 'url'],
        },
        VersionAPI: {
          type: 'object',
          properties: {
            version: {
              type: 'string',
              description: 'Version au format semver (ex: 1.2.3)',
            },
            major: { type: 'integer', description: 'Numéro majeur' },
            minor: { type: 'integer', description: 'Numéro mineur' },
            patch: { type: 'integer', description: 'Numéro de patch' },
          },
          required: ['version', 'major', 'minor', 'patch'],
        },
        ApiError: {
          type: 'object',
          properties: {
            error: { type: 'string', description: "Message d'erreur" },
            hint: { type: 'string', description: 'Indication pour corriger' },
          },
          required: ['error'],
        },
      },
      responses: {
        MissingMode: {
          description: 'Paramètre mode manquant ou invalide',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiError' },
              example: {
                error: 'Missing required parameter: mode',
                hint: 'Use ?mode=refs or ?mode=full',
              },
            },
          },
        },
        NotFound: {
          description: 'Ressource non trouvée',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiError' },
              example: {
                error: 'Resource not found',
              },
            },
          },
        },
      },
    },
  };
}
