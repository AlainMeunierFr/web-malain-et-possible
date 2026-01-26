/**
 * Composant pour afficher un élément de type "Texte large"
 * Texte style titre domaine (947px max) sans les 3 compétences
 * Supporte le markdown inline (gras, italique) et les sauts de lignes
 */

import React from 'react';
import type { ElementTexteLarge } from '../utils/indexReader';
import { parseInlineMarkdown } from '../utils/markdownInlineParser';
import styles from './TexteLarge.module.css';

export interface TexteLargeProps {
  element: ElementTexteLarge;
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
