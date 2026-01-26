/**
 * Composant pour afficher un container de profil dans la HERO
 */

'use client';

import React from 'react';
import Link from 'next/link';
import type { Profil } from '../utils/indexReader';
import styles from './ProfilContainer.module.css';

export interface ProfilContainerProps {
  profil: Profil;
}

const ProfilContainer: React.FC<ProfilContainerProps> = ({ profil }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.titre}>{profil.titre}</h3>
      
      <ul className={styles.jobTitles}>
        {profil.jobTitles.map((jobTitle, index) => (
          <li key={index} className={styles.jobTitle}>
            {jobTitle}
          </li>
        ))}
      </ul>

      <div className={styles.boutons}>
        <Link 
          href={profil.route} 
          className={styles.boutonAcces}
          data-e2eid={`profil-${profil.slug}-acces`}
        >
          Découvrir
        </Link>
        <a 
          href={profil.cvPath} 
          target="_blank"
          rel="noopener noreferrer"
          className={styles.lienCV}
          data-e2eid={`profil-${profil.slug}-cv`}
        >
          Voir mon CV
        </a>
      </div>
    </div>
  );
};

export default ProfilContainer;
