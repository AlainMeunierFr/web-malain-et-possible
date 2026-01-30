/**
 * Composant pour afficher un container de profil (hero ou page Mes Profils).
 * Option 1 : carte entière cliquable vers la page profil + petit lien CV discret (icône + texte).
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { FileDown } from 'lucide-react';
import type { Profil } from '../utils/indexReader';

export interface ProfilContainerProps {
  profil: Profil;
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
        className="profilCarte"
        e2eid={`profil-${profil.slug}-acces`}
      >
        <h3>{profil.titre}</h3>
        <ul className="jobTitles">
          {profil.jobTitles.map((jobTitle, index) => (
            <li key={index} className="jobTitle">
              {jobTitle}
            </li>
          ))}
        </ul>
        <span className="profilCtaLabel lienInterne">{labelAcces}</span>
      </Link>
      <a
        href={profil.cvPath}
        target="_blank"
        rel="noopener noreferrer"
        className="profilLienCV"
        title={`${labelCV} (PDF)`}
        e2eid={`profil-${profil.slug}-cv`}
      >
        <FileDown size={14} aria-hidden />
        <span>{labelCV}</span>
      </a>
    </div>
  );
};

export default ProfilContainer;
