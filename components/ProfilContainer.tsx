/**
 * Composant pour afficher un container de profil (hero ou page Mes Profils).
 * Option 1 : carte entière cliquable vers la page profil + petit lien CV discret (icône + texte).
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { FileDown } from 'lucide-react';
import type { ElementProfil } from '../utils/indexReader';

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
    <div className="profil">
      <Link
        href={profil.route}
        className="profil route ui-card"
        e2eid={`profil-${profil.slug}-acces`}
      >
        <h2 className="profil titre">{profil.titre}</h2>
        <ul className="profil jobTitles">
          {profil.jobTitles.map((jobTitle, index) => (
            <li key={index} className="profil jobTitle">
              {jobTitle}
            </li>
          ))}
        </ul>
        <span className="profil route lienInterne">{labelAcces}</span>
      </Link>
      <a
        href={profil.cvPath}
        target="_blank"
        rel="noopener noreferrer"
        className="profil cvPath"
        title={`${labelCV} (PDF)`}
        e2eid={`profil-${profil.slug}-cv`}
      >
        <FileDown size={24} aria-hidden />
        <span>{labelCV}</span>
      </a>
    </div>
  );
};

export default ProfilContainer;
