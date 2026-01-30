/**
 * Composant pour afficher le bloc "Profils" (page Mes Profils US-7.12).
 * Affiche une grille de cartes profil avec titre, job titles, lien CV et lien "En savoir plus".
 */

'use client';

import React from 'react';
import type { ElementProfils } from '../utils/indexReader';
import ProfilContainer from './ProfilContainer';

export interface BlocsProfilsProps {
  element: ElementProfils;
}

const BlocsProfils: React.FC<BlocsProfilsProps> = ({ element }) => {
  if (!element.profils || element.profils.length === 0) {
    return null;
  }

  return (
    <section className="blocsProfils" aria-label="Mes profils professionnels">
      {element.profils.map((profil) => (
        <ProfilContainer
          key={profil.slug}
          profil={profil}
          labelAcces="En savoir plus…"
          labelCV="Télécharger le CV"
        />
      ))}
    </section>
  );
};

export default BlocsProfils;
