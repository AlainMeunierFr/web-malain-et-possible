/**
 * Composant de rendu unifié pour afficher tous les types de contenu de page
 */

'use client';

import React, { useEffect } from 'react';
import type { ElementContenu } from '../utils';
import { usePageTitle } from '../contexts/PageTitleContext';
import Titre from './Titre';
import Video from './Video';
import TexteLarge from './TexteLarge';
import DomaineDeCompetences from './DomaineDeCompetences';
import CallToAction from './CallToAction';
import GroupeBoutons from './GroupeBoutons';
import ListeDesPages from './ListeDesPages';
import VideoDetournement from './VideoDetournement';
import Temoignages from './Temoignages';
import HeroSection from './HeroSection';
import BlocsProfils from './BlocsProfils';

export interface PageContentRendererProps {
  contenu: ElementContenu[];
  /** Liste des pages du plan du site (ex. depuis plan-du-site.json). Optionnel : ListeDesPages fera un fetch si absent. */
  listeDesPagesInitial?: { url: string; titre: string }[];
}

const PageContentRenderer: React.FC<PageContentRendererProps> = ({ contenu, listeDesPagesInitial }) => {
  const { setPageTitle } = usePageTitle();
  
  // Extraire le TitreDePage et le mettre dans le contexte
  useEffect(() => {
    const titreDePage = contenu.find((el) => el.type === 'titreDePage');
    if (titreDePage && 'texte' in titreDePage) {
      setPageTitle(titreDePage.texte);
    } else {
      setPageTitle(null);
    }
    
    // Cleanup : réinitialiser le titre quand le composant est démonté
    return () => {
      setPageTitle(null);
    };
  }, [contenu, setPageTitle]);
  
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
          case 'hero':
            return <HeroSection key={index} element={element} />;
          case 'titreDePage':
            // Ne pas afficher le TitreDePage dans le contenu, il est affiché dans le Header
            return null;
          case 'titre':
            return <Titre key={index} element={element} />;
          case 'video':
            // Les vidéos ont toujours un fond blanc
            return <Video key={index} element={element} backgroundColor="white" />;
          case 'texteLarge':
            return <TexteLarge key={index} element={element} />;
          case 'domaineDeCompetence': {
            // Type guard : TypeScript sait maintenant que element est ElementDomaineDeCompetence
            const domaineElement = element as import('../utils').ElementDomaineDeCompetence;
            
            // Déterminer la couleur de fond : pair = blanc, impair = bleu clair
            // Le premier après un titre (index 0, pair) est toujours blanc
            const backgroundColor = contentIndex % 2 === 0 
              ? 'white' // Index pair (0, 2, 4...) = blanc
              : 'light'; // Index impair (1, 3, 5...) = bleu clair
            
            // Vérifier que le domaine a bien été résolu (a des items, pas de ref)
            if ('ref' in domaineElement) {
              console.error('DomaineDeCompetence avec ref non résolu:', domaineElement);
              return null;
            }
            
            if (!domaineElement.items || !Array.isArray(domaineElement.items)) {
              console.error('DomaineDeCompetence sans items valides:', domaineElement);
              return null;
            }
            
            return (
              <DomaineDeCompetences
                key={index}
                domaine={domaineElement}
                backgroundColor={backgroundColor}
              />
            );
          }
          case 'callToAction':
            return <CallToAction key={index} element={element} />;
          case 'groupeDeBoutons':
            return <GroupeBoutons key={index} element={element} />;
          case 'listeDesPages':
            return <ListeDesPages key={index} initialPages={listeDesPagesInitial} />;
          case 'listeDeDetournementsVideo':
            return <VideoDetournement key={index} element={elementAny} />;
          case 'listeDeTemoignages':
            return <Temoignages key={index} element={elementAny} />;
          case 'listeDeProfils':
            return <BlocsProfils key={index} element={element} />;
          case 'listeDesExperiencesEtApprentissage':
            /* Conteneur logique utilisé uniquement en mode lecture (domaineDeCompetence.experiences) */
            return null;
          default:
            // TypeScript devrait empêcher ce cas, mais on le gère pour la sécurité
            return null;
        }
      })}
    </>
  );
};

export default PageContentRenderer;
