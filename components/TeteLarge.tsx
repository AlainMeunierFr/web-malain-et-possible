/**
 * Composant pour afficher un élément de type "Tête large"
 * Texte style titre domaine (947px max) sans les 3 compétences
 */

import React from 'react';
import type { ElementTeteLarge } from '../utils/indexReader';
import styles from './TeteLarge.module.css';

export interface TeteLargeProps {
  element: ElementTeteLarge;
}

const TeteLarge: React.FC<TeteLargeProps> = ({ element }) => {
  return (
    <div className={styles.teteLargeContainer}>
      <p className={styles.teteLargeText}>{element.texte}</p>
    </div>
  );
};

export default TeteLarge;
