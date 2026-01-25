/**
 * Composant pour rendre le contenu markdown
 * HTML minimal : juste le texte et son typeDeContenu
 * La CSS fait le reste
 */

import React from 'react';
import type { ContenuElement } from '../utils/aboutSiteReader';
import { getMdImagePath } from '../utils/imagePath';
import styles from './AboutSiteContentRenderer.module.css';
import Prompt from './Prompt';

/**
 * Parse inline markdown (bold, italic, images) pour convertir :
 * - **texte** en <strong>texte</strong>
 * - [image:filename] en <img src="/api/images/md/filename" />
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  const boldPattern = /\*\*(.+?)\*\*/g;
  const imagePattern = /\[image:([^\]]+)\]/g;
  
  const boldMatches: Array<{ start: number; end: number; text: string }> = [];
  const imageMatches: Array<{ start: number; end: number; filename: string }> = [];

  let match;
  while ((match = boldPattern.exec(text)) !== null) {
    boldMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
  }

  while ((match = imagePattern.exec(text)) !== null) {
    imageMatches.push({ 
      start: match.index, 
      end: match.index + match[0].length, 
      filename: match[1] 
    });
  }

  // Combiner et trier tous les matches
  const allMatches = [
    ...boldMatches.map(m => ({ ...m, type: 'bold' as const })),
    ...imageMatches.map(m => ({ ...m, type: 'image' as const })),
  ].sort((a, b) => a.start - b.start);

  allMatches.forEach((match, index) => {
    // Ajouter le texte avant le match
    if (match.start > currentIndex) {
      parts.push(text.substring(currentIndex, match.start));
    }

    // Ajouter le contenu formaté
    if (match.type === 'bold') {
      parts.push(<strong key={`bold-${index}`}>{match.text}</strong>);
    } else if (match.type === 'image') {
      parts.push(
        <img 
          key={`image-${index}`}
          src={getMdImagePath(match.filename)}
          alt={match.filename}
          className={styles.inlineImage}
        />
      );
    }

    currentIndex = match.end;
  });

  // Ajouter le texte restant
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export interface AboutSiteContentRendererProps {
  elements: ContenuElement[];
  typeDeContenu?: string;
}

const AboutSiteContentRenderer: React.FC<AboutSiteContentRendererProps> = ({ 
  elements, 
  typeDeContenu 
}) => {
  const containerDataAttr = typeDeContenu === 'Prompt' ? { 'data-type-contenu': 'prompt' } : {};

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
    // Image en bloc
    if (element.type === 'image' && element.imageFilename) {
      // Si imageUrl est déjà défini (URL complète), l'utiliser, sinon construire le chemin MD
      const imageSrc = element.imageUrl || getMdImagePath(element.imageFilename);
      return (
        <div key={elementIndex} className={styles.imageBlock}>
          <img 
            src={imageSrc}
            alt={element.imageFilename}
            className={styles.blockImage}
          />
        </div>
      );
    }

    // Paragraphe
    if (element.type === 'paragraph') {
      return (
        <p key={elementIndex} className={styles.paragraph}>
          {parseInlineMarkdown(element.content || '')}
        </p>
      );
    }

    // Liste (ul ou ol)
    if (element.type === 'ul' || element.type === 'ol') {
      if (element.typeDeContenu) {
        const text = element.items?.[0] || '';
        return (
          <ul key={elementIndex} className={styles[element.typeDeContenu] || styles.userStoryElement} data-type-contenu={element.typeDeContenu}>
            <li>
              {parseInlineMarkdown(text)}
            </li>
          </ul>
        );
      }
      const Tag = element.type === 'ul' ? 'ul' : 'ol';
      return (
        <Tag key={elementIndex} className={styles.list}>
          {element.items?.map((item, itemIndex) => (
            <li key={itemIndex} className={styles.listItem}>
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </Tag>
      );
    }

    return null;
  };

  return (
    <div className={typeDeContenu === 'Prompt' ? styles.promptContainer : styles.normalContainer}>
      {groupedElements.map((group, groupIndex) => {
        // Déterminer le conteneur selon le type de groupe
        let containerClass = styles.normalContainer;
        if (group.type === 'alain') {
          containerClass = styles.promptContainer; // Même style que "Prompt" (BleuClair)
        } else if (group.type === 'ia') {
          containerClass = styles.technicalResultContainer; // Même style que "Résultat technique" (Blanc)
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
