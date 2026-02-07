/**
 * Composant pour afficher un container de profil (hero ou page Mes Profils).
 * Option 1 : carte entière cliquable vers la page profil + petit lien CV discret (icône + texte).
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { FileDown } from 'lucide-react';
import type { ElementProfil } from '../utils/client';

export interface ProfilContainerProps {
  profil: ElementProfil;
  /** Libellé du lien vers la page du profil (ex. "Découvrir" dans le hero, "En savoir plus…" sur Mes Profils). */
  labelAcces?: string;
  /** Libellé du lien CV pour accessibilité / title (ex. "Voir le CV", "Télécharger le CV"). */
  labelCV?: string;
}

const ProfilContainer: React.FC<ProfilContainerProps> = ({
  profil,
  labelAcces = 'Découvrir',
  labelCV = 'Voir le CV',
}) => {
  return (
    <div className="profil-cont">
      <h2 className="profil-cont titre">{profil.titre}</h2>
      <ul className="profil-cont jobTitles">
        {profil.jobTitles.map((jobTitle, index) => (
          <li key={index} className="profil-cont jobTitle">
            {jobTitle}
          </li>
        ))}
      </ul>
      <div className="profil-cont actions">
        <Link
          href={profil.route}
          className="profil-cont route lienInterne"
          e2eid={`profil-${profil.slug}-acces`}
        >
          {labelAcces}
        </Link>
      </div>
      <a
        href={profil.cvPath}
        target="_blank"
        rel="noopener noreferrer"
        className="cvPath"
        title={`${labelCV} (PDF)`}
        e2eid={`profil-${profil.slug}-cv`}
      >
        <FileDown size={20} aria-hidden />
        <span>{labelCV}</span>
      </a>
    </div>
  );
};

export default ProfilContainer;
