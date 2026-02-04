/**
 * Composant pour rendre le contenu markdown
 * HTML minimal : juste le texte et son typeDeContenu
 * La CSS fait le reste
 */

import React from 'react';
import Image from 'next/image';
import type { ContenuElement } from '../utils';
import { getMdImagePath, parseInlineMarkdown } from '../utils';

export interface AboutSiteContentRendererProps {
  elements: ContenuElement[];
  typeDeContenu?: string;
}

const AboutSiteContentRenderer: React.FC<AboutSiteContentRendererProps> = ({ 
  elements, 
  typeDeContenu 
}) => {
  // Regrouper les éléments par zones (Alain, IA, normal)
  const groupedElements: Array<{
    type: 'alain' | 'ia' | 'normal';
    elements: Array<{ element: ContenuElement; index: number }>;
  }> = [];
  
  let currentGroup: { type: 'alain' | 'ia' | 'normal'; elements: Array<{ element: ContenuElement; index: number }> } | null = null;

  elements.forEach((element, index) => {
    // Détecter si c'est un prompt "Alain" ou une réponse "IA" (uniquement pour les paragraphes)
    if (element.type === 'paragraph') {
      const isAlainPrompt = element.content?.trim().startsWith('**Alain**');
      const isIAResponse = element.content?.trim().startsWith('**IA**');
      
      if (isAlainPrompt) {
        // Finaliser le groupe précédent s'il existe
        if (currentGroup) {
          groupedElements.push(currentGroup);
        }
        // Nouveau groupe Alain
        currentGroup = { type: 'alain', elements: [{ element, index }] };
      } else if (isIAResponse) {
        // Finaliser le groupe précédent s'il existe
        if (currentGroup) {
          groupedElements.push(currentGroup);
        }
        // Nouveau groupe IA
        currentGroup = { type: 'ia', elements: [{ element, index }] };
      } else {
        // Élément normal : ajouter au groupe courant ou créer un groupe normal
        if (currentGroup && currentGroup.type !== 'normal') {
          // On est dans une zone Alain ou IA, ajouter à ce groupe
          currentGroup.elements.push({ element, index });
        } else {
          // Créer ou continuer un groupe normal
          if (currentGroup && currentGroup.type === 'normal') {
            currentGroup.elements.push({ element, index });
          } else {
            if (currentGroup) {
              groupedElements.push(currentGroup);
            }
            currentGroup = { type: 'normal', elements: [{ element, index }] };
          }
        }
      }
    } else {
      // Élément non-paragraphe (image, liste, etc.)
      if (currentGroup) {
        // Ajouter au groupe courant
        currentGroup.elements.push({ element, index });
      } else {
        // Créer un groupe normal
        currentGroup = { type: 'normal', elements: [{ element, index }] };
      }
    }
  });

  // Ajouter le dernier groupe
  if (currentGroup) {
    groupedElements.push(currentGroup);
  }

  // Fonction pour rendre un élément individuel
  const renderElement = (element: ContenuElement, elementIndex: number) => {
    // Image en bloc (fluide, s'adapte à la largeur du container)
    if (element.type === 'image' && element.imageFilename) {
      // Si imageUrl est déjà défini (URL complète), l'utiliser, sinon construire le chemin MD
      const imageSrc = element.imageUrl || getMdImagePath(element.imageFilename);
      return (
        <div key={elementIndex} className="imageBlock">
          <Image 
            src={imageSrc}
            alt={element.imageFilename}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="blockImage"
          />
        </div>
      );
    }

    // Paragraphe
    if (element.type === 'paragraph') {
      // Paragraphes spéciaux US : En tant que, Je souhaite, Afin de
      if (element.typeDeContenu === 'En tant que' || 
          element.typeDeContenu === 'Je souhaite' || 
          element.typeDeContenu === 'Afin de') {
        return (
          <p key={elementIndex} className="usKeyword">
            {parseInlineMarkdown(element.content || '')}
          </p>
        );
      }
      // Paragraphe Critères d'acceptation : titre en gras
      if (element.typeDeContenu === "Critères d'acceptation") {
        return (
          <p key={elementIndex} className="criteresAcceptationTitre">
            {parseInlineMarkdown(element.content || '')}
          </p>
        );
      }
      // Paragraphe CA (themeCritere) : titre de critère
      if (element.typeDeContenu === 'themeCritere') {
        return (
          <p key={elementIndex} className="themeCritere">
            {parseInlineMarkdown(element.content || '')}
          </p>
        );
      }
      return (
        <p key={elementIndex} className="paragraph">
          {parseInlineMarkdown(element.content || '')}
        </p>
      );
    }

    // Liste (ul ou ol)
    if (element.type === 'ul' || element.type === 'ol') {
      if (element.typeDeContenu) {
        const text = element.items?.[0] || '';
        
        // "Critères d'acceptation" → h4 sans puce
        if (element.typeDeContenu === "Critères d'acceptation") {
          return (
            <h4 key={elementIndex} className="criteresAcceptationTitre" data-type-contenu={element.typeDeContenu}>
              {parseInlineMarkdown(text)}
            </h4>
          );
        }
        
        // Déterminer la classe CSS selon le typeDeContenu
        let className = 'userStoryElement';
        if (element.typeDeContenu === 'themeCritere') {
          className = 'themeCritere'; // Puce niveau 1
        } else if (element.typeDeContenu === 'critere') {
          className = 'critere'; // Puce niveau 2
        }
        return (
          <ul key={elementIndex} className={className} data-type-contenu={element.typeDeContenu}>
            <li>
              {parseInlineMarkdown(text)}
            </li>
          </ul>
        );
      }
      const Tag = element.type === 'ul' ? 'ul' : 'ol';
      return (
        <Tag key={elementIndex} className="list">
            {element.items?.map((item, itemIndex) => (
            <li key={itemIndex} className="listItem">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </Tag>
      );
    }

    return null;
  };

  return (
    <div className={typeDeContenu === 'Prompt' ? 'promptContainer' : 'normalContainer'}>
      {groupedElements.map((group, groupIndex) => {
        let containerClass = 'normalContainer';
        if (group.type === 'alain') {
          containerClass = 'promptContainer';
        } else if (group.type === 'ia') {
          containerClass = 'technicalResultContainer';
        }

        return (
          <div key={groupIndex} className={containerClass}>
            {group.elements.map(({ element, index }) => renderElement(element, index))}
          </div>
        );
      })}
    </div>
  );
};

export default AboutSiteContentRenderer;
