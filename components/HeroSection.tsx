/**
 * Composant pour afficher la section HERO
 */

'use client';

import React from 'react';
import Link from 'next/link';
import type { ElementHero, ElementVideo } from '../utils/indexReader';
import { ROUTES } from '../constants/routes';
import ProfilContainer from './ProfilContainer';
import Video from './Video';
import { parseInlineMarkdown } from '../utils/markdownInlineParser';

export interface HeroSectionProps {
  element: ElementHero;
  /** Masquer les profils (ex. home US-7.11). Par défaut true. */
  showProfils?: boolean;
  /** Vidéo à afficher à droite (layout deux colonnes). */
  video?: ElementVideo;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  element,
  showProfils = true,
  video,
}) => {
  const descriptionAvecRetoursLigne = element.description.replace(/\\n/g, '\n');

  const contenuGauche = (
    <>
      <h1>{parseInlineMarkdown(element.titre)}</h1>
      <h2>{parseInlineMarkdown(element.sousTitre)}</h2>
      <p className="description">{parseInlineMarkdown(descriptionAvecRetoursLigne)}</p>
      <div className="heroCtas">
        <Link
          href={ROUTES.MES_PROFILS}
          className="lienInterne"
          e2eid="hero-telecharger-cv"
        >
          Télécharger mon CV
        </Link>
        <Link
          href={element.boutonPrincipal.action}
          className="bouton"
          e2eid="hero-bouton-principal"
        >
          {element.boutonPrincipal.texte}
        </Link>
      </div>
      {showProfils && element.profils.length > 0 && (
        <div className="profilsContainer">
          {element.profils.map((profil) => (
            <ProfilContainer key={profil.slug} profil={profil} />
          ))}
        </div>
      )}
    </>
  );

  if (video) {
    return (
      <section className="hero">
        <div className="heroGauche">{contenuGauche}</div>
        <div className="heroDroite">
          <Video element={video} backgroundColor="white" />
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="content">
        {contenuGauche}
      </div>
    </section>
  );
};

export default HeroSection;
