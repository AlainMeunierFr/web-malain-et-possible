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
  /** Si true, désactive l'alternance de fond (pour la HomePage) */
  isHomePage?: boolean;
}

const PageContentRenderer: React.FC<PageContentRendererProps> = ({ contenu, listeDesPagesInitial, isHomePage = false }) => {
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
  
  // Compteur pour l'alternance de fond (tous les TypeDeContenu sauf titreDePage et hero)
  // On compte à partir de 1 : impair = blanc, pair = bleu clair
  let contentIndex = 0;
  
  // Fonction helper pour déterminer la classe de fond
  const getBackgroundClass = (currentIndex: number): string => {
    if (isHomePage) return ''; // Pas d'alternance sur HomePage
    // Impair (1, 3, 5...) = blanc (pas de classe), Pair (2, 4, 6...) = bleu clair
    return currentIndex % 2 === 0 ? 'fondBleuClair' : '';
  };
  
  return (
    <>
      {contenu.map((element, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const elementAny = element as any;
        
        // Types qui ne participent pas à l'alternance
        const typesExclus = ['titreDePage', 'hero', 'listeDesExperiencesEtApprentissage'];
        
        // Incrémenter le compteur pour tous les TypeDeContenu sauf les exclus
        if (!typesExclus.includes(element.type)) {
          contentIndex++;
        }
        
        const bgClass = getBackgroundClass(contentIndex);
        
        // Helper pour envelopper un composant avec la classe de fond
        const wrapWithBackground = (component: React.ReactNode, key: number) => {
          if (!bgClass) return component;
          return <section key={key} className={bgClass}>{component}</section>;
        };
        
        switch (element.type) {
          case 'hero':
            return <HeroSection key={index} element={element} />;
          case 'titreDePage':
            // Ne pas afficher le TitreDePage dans le contenu, il est affiché dans le Header
            return null;
          case 'titre':
            return wrapWithBackground(<Titre key={index} element={element} />, index);
          case 'video':
            return wrapWithBackground(<Video key={index} element={element} />, index);
          case 'texteLarge':
            return wrapWithBackground(<TexteLarge key={index} element={element} />, index);
          case 'domaineDeCompetence': {
            // Type guard : TypeScript sait maintenant que element est ElementDomaineDeCompetence
            const domaineElement = element as import('../utils').ElementDomaineDeCompetence;
            
            // Vérifier que le domaine a bien été résolu (a des items, pas de ref)
            if ('ref' in domaineElement) {
              console.error('DomaineDeCompetence avec ref non résolu:', domaineElement);
              return null;
            }
            
            if (!domaineElement.items || !Array.isArray(domaineElement.items)) {
              console.error('DomaineDeCompetence sans items valides:', domaineElement);
              return null;
            }
            
            // Passer la couleur de fond au composant (il gère son propre style)
            const backgroundColor = (bgClass === 'fondBleuClair') ? 'light' : 'white';
            
            return (
              <DomaineDeCompetences
                key={index}
                domaine={domaineElement}
                backgroundColor={backgroundColor}
              />
            );
          }
          case 'callToAction':
            return wrapWithBackground(<CallToAction key={index} element={element} />, index);
          case 'groupeDeBoutons':
            return wrapWithBackground(<GroupeBoutons key={index} element={element} />, index);
          case 'listeDesPages':
            return wrapWithBackground(<ListeDesPages key={index} initialPages={listeDesPagesInitial} />, index);
          case 'listeDeDetournementsVideo':
            return wrapWithBackground(<VideoDetournement key={index} element={elementAny} />, index);
          case 'listeDeTemoignages':
            return wrapWithBackground(<Temoignages key={index} element={elementAny} />, index);
          case 'listeDeProfils':
            return wrapWithBackground(<BlocsProfils key={index} element={element} />, index);
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
