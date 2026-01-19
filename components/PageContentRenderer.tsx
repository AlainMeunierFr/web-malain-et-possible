/**
 * Composant de rendu unifié pour afficher tous les types de contenu de page
 */

import React from 'react';
import type { ElementContenu } from '../utils/indexReader';
import Titre from './Titre';
import Video from './Video';
import TeteLarge from './TeteLarge';
import DomaineDeCompetences from './DomaineDeCompetences';

export interface PageContentRendererProps {
  contenu: ElementContenu[];
}

const PageContentRenderer: React.FC<PageContentRendererProps> = ({ contenu }) => {
  return (
    <>
      {contenu.map((element, index) => {
        switch (element.type) {
          case 'titre':
            return <Titre key={index} element={element} />;
          case 'video':
            return <Video key={index} element={element} />;
          case 'teteLarge':
            return <TeteLarge key={index} element={element} />;
          case 'domaineDeCompetence':
            return (
              <DomaineDeCompetences
                key={index}
                domaine={{
                  titre: element.titre,
                  contenu: element.contenu,
                  items: element.items,
                }}
              />
            );
          default:
            // TypeScript devrait empêcher ce cas, mais on le gère pour la sécurité
            return null;
        }
      })}
    </>
  );
};

export default PageContentRenderer;
