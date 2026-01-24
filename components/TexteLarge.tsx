/**
 * Composant pour afficher un élément de type "Texte large"
 * Texte style titre domaine (947px max) sans les 3 compétences
 * Supporte le markdown inline (gras) et les sauts de lignes
 */

import React from 'react';
import type { ElementTexteLarge } from '../utils/indexReader';
import styles from './TexteLarge.module.css';

export interface TexteLargeProps {
  element: ElementTexteLarge;
}

/**
 * Parse inline markdown (bold) pour convertir **texte** en <strong>texte</strong>
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Pattern pour **bold**
  const boldPattern = /\*\*(.+?)\*\*/g;

  const boldMatches: Array<{ start: number; end: number; text: string }> = [];

  let match;
  while ((match = boldPattern.exec(text)) !== null) {
    boldMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[1]
    });
  }

  // Trier les matches par position
  boldMatches.sort((a, b) => a.start - b.start);

  // Construire les éléments React
  for (const boldMatch of boldMatches) {
    // Ajouter le texte avant le match
    if (currentIndex < boldMatch.start) {
      const beforeText = text.substring(currentIndex, boldMatch.start);
      parts.push(beforeText);
    }

    // Ajouter l'élément bold
    parts.push(<strong key={`bold-${boldMatch.start}`}>{boldMatch.text}</strong>);
    currentIndex = boldMatch.end;
  }

  // Ajouter le texte restant
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts;
}

/**
 * Convertit le texte avec sauts de lignes en paragraphes
 */
function renderTextWithLineBreaks(text: string): React.ReactNode[] {
  const paragraphs = text.split('\n\n');
  
  return paragraphs.map((paragraph, index) => (
    <p key={index} className={styles.texteLargeText}>
      {parseInlineMarkdown(paragraph)}
    </p>
  ));
}

const TexteLarge: React.FC<TexteLargeProps> = ({ element }) => {
  return (
    <div className={styles.texteLargeContainer}>
      {renderTextWithLineBreaks(element.texte)}
    </div>
  );
};

export default TexteLarge;
