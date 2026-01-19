/**
 * Composant pour afficher un élément de type "Texte large"
 * Texte style titre domaine (947px max) sans les 3 compétences
 */

import React from 'react';
import type { ElementTexteLarge } from '../utils/indexReader';
import styles from './TexteLarge.module.css';

export interface TexteLargeProps {
  element: ElementTexteLarge;
}

const TexteLarge: React.FC<TexteLargeProps> = ({ element }) => {
  return (
    <div className={styles.texteLargeContainer}>
      <p className={styles.texteLargeText}>{element.texte}</p>
    </div>
  );
};

export default TexteLarge;
