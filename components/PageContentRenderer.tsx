/**
 * Composant de rendu unifié pour afficher tous les types de contenu de page
 */

import React from 'react';
import type { ElementContenu } from '../utils/indexReader';
import Titre from './Titre';
import Video from './Video';
import TexteLarge from './TexteLarge';
import DomaineDeCompetences from './DomaineDeCompetences';
import CallToAction from './CallToAction';
import GroupeBoutons from './GroupeBoutons';
import ListeDesPages from './ListeDesPages';
import VideoDetournement from './VideoDetournement';
import Temoignages from './Temoignages';

export interface PageContentRendererProps {
  contenu: ElementContenu[];
}

const PageContentRenderer: React.FC<PageContentRendererProps> = ({ contenu }) => {
  return (
    <>
      {contenu.map((element, index) => {
        const elementAny = element as any;
        
        switch (element.type) {
          case 'titre':
            return <Titre key={index} element={element} />;
          case 'video':
            return <Video key={index} element={element} />;
          case 'texteLarge':
            return <TexteLarge key={index} element={element} />;
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
          case 'callToAction':
            return <CallToAction key={index} element={element} />;
          case 'groupeBoutons':
            return <GroupeBoutons key={index} element={element} />;
          case 'listeDesPages':
            return <ListeDesPages key={index} />;
          case 'videoDetournement':
            return <VideoDetournement key={index} element={elementAny} />;
          case 'temoignages':
            return <Temoignages key={index} element={elementAny} />;
          default:
            // TypeScript devrait empêcher ce cas, mais on le gère pour la sécurité
            return null;
        }
      })}
    </>
  );
};

export default PageContentRenderer;
