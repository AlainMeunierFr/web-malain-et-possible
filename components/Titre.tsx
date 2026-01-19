/**
 * Composant pour afficher un élément de type "Titre"
 * Bande bleue foncée pleine largeur avec texte en h1
 */

import React from 'react';
import type { ElementTitre } from '../utils/indexReader';
import styles from './Titre.module.css';

export interface TitreProps {
  element: ElementTitre;
}

const Titre: React.FC<TitreProps> = ({ element }) => {
  return (
    <div className={styles.titreContainer}>
      <h1 className={styles.titreText}>{element.texte}</h1>
    </div>
  );
};

export default Titre;
