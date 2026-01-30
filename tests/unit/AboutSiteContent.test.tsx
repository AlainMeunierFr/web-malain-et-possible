/**
 * Tests pour AboutSiteContent
 * Approche TDD : Tests pour atteindre 100% de couverture
 *
 * Après US-11.2 (tableau de bord A propos de ce site) : la page racine devient un tableau de bord ;
 * la visualisation d'un dossier (H2 = fichiers MD, H3+ = contenu) peut réutiliser ce composant ou un dérivé.
 * Adapter ou dupliquer ces tests pour le nouveau rendu (bande dossiers + zone contenu) si besoin.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutSiteContent from '../../components/AboutSiteContent';
import type { AboutSiteStructure, PathContentAtRoot } from '../../utils/aboutSiteReader';

describe('AboutSiteContent', () => {
  // MOCK : Structure minimale valide
  const mockStructureSimple: AboutSiteStructure = {
    chapitres: [
      {
        nom: '1. Chapitre Test',
        sections: [
          {
            nom: '1.1 Section Test',
            parties: [
              {
                titre: 'Partie Test',
                sousParties: [
                  {
                    titre: 'Sous-partie Test',
                    contenuParse: [
                      {
                        typeDeBloc: 'paragraphe',
                        texte: 'Contenu de test',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  it('devrait afficher le composant sans erreur', () => {
    // ACT
    const { container } = render(<AboutSiteContent structure={mockStructureSimple} />);
    
    // ASSERT
    expect(container).toBeInTheDocument();
  });

  it('devrait afficher le nom du chapitre', () => {
    // ACT
    render(<AboutSiteContent structure={mockStructureSimple} />);
    
    // ASSERT
    expect(screen.getByText('1. Chapitre Test')).toBeInTheDocument();
  });

  it('devrait afficher le nom de la section', () => {
    // ACT
    render(<AboutSiteContent structure={mockStructureSimple} />);
    
    // ASSERT
    expect(screen.getByText('1.1 Section Test')).toBeInTheDocument();
  });

  it('devrait gérer une structure vide', () => {
    // ARRANGE
    const structureVide: AboutSiteStructure = {
      chapitres: [],
    };

    // ACT
    const { container } = render(<AboutSiteContent structure={structureVide} />);
    
    // ASSERT
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('devrait gérer plusieurs chapitres', () => {
    // ARRANGE
    const structureMultiple: AboutSiteStructure = {
      chapitres: [
        {
          nom: '1. Premier Chapitre',
          sections: [
            {
              nom: '1.1 Section 1',
              parties: [],
            },
          ],
        },
        {
          nom: '2. Deuxième Chapitre',
          sections: [
            {
              nom: '2.1 Section 2',
              parties: [],
            },
          ],
        },
      ],
    };

    // ACT
    render(<AboutSiteContent structure={structureMultiple} />);
    
    // ASSERT
    expect(screen.getByText('1. Premier Chapitre')).toBeInTheDocument();
    expect(screen.getByText('2. Deuxième Chapitre')).toBeInTheDocument();
  });

  it('devrait afficher les blocs (h5) avec leur contenu', () => {
    // ARRANGE
    const structureAvecBlocs: AboutSiteStructure = {
      chapitres: [
        {
          nom: '1. Chapitre',
          sections: [
            {
              nom: '1.1 Section',
              parties: [
                {
                  titre: 'Partie',
                  sousParties: [
                    {
                      titre: 'Sous-partie',
                      blocs: [
                        {
                          titre: 'Bloc 1',
                          typeDeContenu: 'Prompt',
                          contenuParse: [
                            {
                              type: 'paragraph',
                              content: 'Contenu bloc prompt',
                            },
                          ],
                        },
                        {
                          titre: 'Bloc 2',
                          typeDeContenu: null,
                          contenuParse: [
                            {
                              type: 'paragraph',
                              content: 'Contenu bloc normal',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    // ACT
    const { container } = render(<AboutSiteContent structure={structureAvecBlocs} />);
    
    // ASSERT
    // Le titre "Bloc 1" ne doit PAS être affiché (typeDeContenu = "Prompt")
    expect(screen.queryByText('Bloc 1')).not.toBeInTheDocument();
    // Le titre "Bloc 2" doit être affiché (typeDeContenu = null)
    expect(screen.getByText('Bloc 2')).toBeInTheDocument();
    // Les h5 doivent être présents
    expect(container.querySelector('h5')).toBeInTheDocument();
  });

  it('devrait afficher fichiers et dossiers en mode pathContent (US-11.4)', () => {
    const pathContent: PathContentAtRoot = {
      fichiers: [
        {
          nom: 'Fichier à la racine',
          contenu: '# Fichier\nContenu',
          parties: [{ titre: 'Partie', contenu: '', sousParties: [], contenuParse: [] }],
        },
      ],
      dossiers: [{ nom: 'Dossier à la racine', path: 'data/A propos de ce site/A propos du projet' }],
    };

    render(<AboutSiteContent pathContent={pathContent} embedded />);

    expect(screen.getByText('Fichier à la racine')).toBeInTheDocument();
    expect(screen.getByText('Dossier à la racine')).toBeInTheDocument();
  });
});
