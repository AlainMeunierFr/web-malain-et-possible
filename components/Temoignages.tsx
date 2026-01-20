/**
 * Composant pour afficher une liste de témoignages
 * Affiche les témoignages sur 2 colonnes (50% largeur chacun)
 */

import React from 'react';
import Image from 'next/image';
import type { ElementTemoignages } from '../utils/indexReader';
import styles from './Temoignages.module.css';

export interface TemoignagesProps {
  element: ElementTemoignages;
}

const Temoignages: React.FC<TemoignagesProps> = ({ element }) => {
  // Vérifier que les items existent (peuvent être chargés depuis une source externe)
  if (!element.items || element.items.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.temoignagesGrid}>
        {element.items.map((temoignage, index) => (
          <div key={index} className={styles.temoignage}>
            <div className={styles.temoignageHeader}>
              <div className={styles.temoignagePhoto}>
                <Image
                  src={temoignage.photo}
                  alt={temoignage.nom}
                  width={80}
                  height={80}
                  className={styles.photoImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.temoignageInfo}>
                <h2 className={styles.temoignageNom}>{temoignage.nom}</h2>
                <p className={styles.temoignageFonction}>{temoignage.fonction}</p>
              </div>
            </div>
            <div className={styles.temoignageTexte}>
              {temoignage.temoignage.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.paragraph}>
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temoignages;
