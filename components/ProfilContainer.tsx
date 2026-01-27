/**
 * Composant pour afficher un container de profil dans la HERO
 */

'use client';

import React from 'react';
import Link from 'next/link';
import type { Profil } from '../utils/indexReader';

export interface ProfilContainerProps {
  profil: Profil;
}

const ProfilContainer: React.FC<ProfilContainerProps> = ({ profil }) => {
  return (
    <div className="profil">
      <h3>{profil.titre}</h3>
      
      <ul className="jobTitles">
        {profil.jobTitles.map((jobTitle, index) => (
          <li key={index} className="jobTitle">
            {jobTitle}
          </li>
        ))}
      </ul>

      <div className="boutons">
        <Link 
          href={profil.route} 
          className="bouton"
          data-e2eid={`profil-${profil.slug}-acces`}
        >
          Découvrir
        </Link>
        <a 
          href={profil.cvPath} 
          target="_blank"
          rel="noopener noreferrer"
          className="lienCV"
          data-e2eid={`profil-${profil.slug}-cv`}
        >
          Voir le CV
        </a>
      </div>
    </div>
  );
};

export default ProfilContainer;
