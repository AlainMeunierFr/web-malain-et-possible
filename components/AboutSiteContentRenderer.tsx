/**
 * Composant pour rendre le contenu markdown
 * HTML minimal : juste le texte et son typeDeContenu
 * La CSS fait le reste
 */

import React from 'react';
import type { ContenuElement } from '../utils/aboutSiteReader';
import styles from './AboutSiteContentRenderer.module.css';

/**
 * Parse inline markdown (bold, italic, etc.) pour convertir **texte** en <strong>texte</strong>
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  const boldPattern = /\*\*(.+?)\*\*/g;
  const boldMatches: Array<{ start: number; end: number; text: string }> = [];

  let match;
  while ((match = boldPattern.exec(text)) !== null) {
    boldMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
  }

  boldMatches.sort((a, b) => a.start - b.start);

  boldMatches.forEach((match, index) => {
    if (match.start > currentIndex) {
      parts.push(text.substring(currentIndex, match.start));
    }
    parts.push(<strong key={`bold-${index}`}>{match.text}</strong>);
    currentIndex = match.end;
  });

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

  return (
    <div className={typeDeContenu === 'Prompt' ? styles.promptContainer : styles.normalContainer}>
      {elements.map((element, index) => {
        // Paragraphe
        if (element.type === 'paragraph') {
          return (
            <p key={index} className={styles.paragraph}>
              {element.content}
            </p>
          );
        }

        // Liste (ul ou ol)
        if (element.type === 'ul' || element.type === 'ol') {
          // Si typeDeContenu existe, afficher comme élément de liste avec data-type-contenu (HTML minimal)
          if (element.typeDeContenu) {
            const text = element.items?.[0] || '';
            return (
              <ul key={index} className={styles[element.typeDeContenu] || styles.userStoryElement} data-type-contenu={element.typeDeContenu}>
                <li>
                  {parseInlineMarkdown(text)}
                </li>
              </ul>
            );
          }
          // Sinon, liste normale
          const Tag = element.type === 'ul' ? 'ul' : 'ol';
          return (
            <Tag key={index} className={styles.list}>
              {element.items?.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </Tag>
          );
        }

        return null;
      })}
    </div>
  );
};

export default AboutSiteContentRenderer;
