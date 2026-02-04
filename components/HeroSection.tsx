/**
 * Composant pour afficher la section HERO
 */

'use client';

import React from 'react';
import Link from 'next/link';
import type { ElementHero } from '../utils/client';
import Video from './Video';
import { parseInlineMarkdown } from '../utils/client';

export interface HeroSectionProps {
  element: ElementHero;
}

const HeroSection: React.FC<HeroSectionProps> = ({ element }) => {
  /** Vidéo à afficher à droite (hero.video) ; compatible ElementVideo pour le composant Video. */
  const video = element.video
    ? { type: 'video' as const, urlYouTube: element.video.urlYouTube, lancementAuto: element.video.lancementAuto ?? false, ...(element.video.e2eID && { e2eID: element.video.e2eID }) }
    : undefined;
  /* Retours à la ligne uniquement sur \n dans la source ; gras/italique restent inline */
  const descriptionAvecRetoursLigne = element.description.replace(/\\n/g, '\n');
  const paragraphes = descriptionAvecRetoursLigne.split('\n').filter(Boolean);
  const descriptionNodes =
    paragraphes.length <= 1
      ? parseInlineMarkdown(descriptionAvecRetoursLigne)
      : paragraphes.flatMap((para, i) =>
          i === 0
            ? [<React.Fragment key={`desc-${i}`}>{parseInlineMarkdown(para)}</React.Fragment>]
            : [<br key={`br-${i}`} />, <React.Fragment key={`desc-${i}`}>{parseInlineMarkdown(para)}</React.Fragment>]
        );

  const contenuGauche = (
    <>
      <h1 className="hero titre">{parseInlineMarkdown(element.titre)}</h1>
      <p className="hero sousTitre">{parseInlineMarkdown(element.sousTitre)}</p>
      <p className="hero description">{descriptionNodes}</p>
      <div className="ui-heroCtas">
        <Link
          href={element.ensavoirplus}
          className="lienInterne"
          e2eid="hero-telecharger-cv"
        >
          Télécharger mon CV
        </Link>
        <Link
          href={element.callToAction.action}
          className="bouton hero callToAction"
          e2eid="hero-bouton-principal"
        >
          {element.callToAction.texte}
        </Link>
      </div>
    </>
  );

  if (video) {
    return (
      <section className="hero" data-layout="2 columns">
        <div className="heroGauche">{contenuGauche}</div>
        <div className="heroDroite">
          <Video element={video} backgroundColor="white" />
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="ui-content">
        {contenuGauche}
      </div>
    </section>
  );
};

export default HeroSection;
