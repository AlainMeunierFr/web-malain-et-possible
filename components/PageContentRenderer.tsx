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
  // Calculer l'index relatif (en ignorant les titres et vidéos) pour l'alternance de fond
  // Seuls les DomaineDeCompetences participent à l'alternance
  let contentIndex = -1; // Commence à -1 car on incrémente avant d'utiliser
  
  return (
    <>
      {contenu.map((element, index) => {
        const elementAny = element as any;
        
        // Les titres remettent le compteur à zéro
        if (element.type === 'titre') {
          contentIndex = -1;
        }
        
        // Incrémenter l'index de contenu seulement pour les DomaineDeCompetences
        // Les vidéos ne participent pas à l'alternance et ont toujours un fond blanc
        if (element.type === 'domaineDeCompetence') {
          contentIndex++;
        }
        
        switch (element.type) {
          case 'titre':
            return <Titre key={index} element={element} />;
          case 'video':
            // Les vidéos ont toujours un fond blanc
            return <Video key={index} element={element} backgroundColor="white" />;
          case 'texteLarge':
            return <TexteLarge key={index} element={element} />;
          case 'domaineDeCompetence': {
            // Déterminer la couleur de fond : pair = blanc, impair = bleu clair
            // Le premier après un titre (index 0, pair) est toujours blanc
            const backgroundColor = contentIndex % 2 === 0 
              ? 'white' // Index pair (0, 2, 4...) = blanc
              : 'light'; // Index impair (1, 3, 5...) = bleu clair
            return (
              <DomaineDeCompetences
                key={index}
                domaine={{
                  titre: element.titre,
                  contenu: element.contenu,
                  items: element.items,
                }}
                backgroundColor={backgroundColor}
              />
            );
          }
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
