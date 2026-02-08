/**
 * Composant pour afficher la section HERO
 */

'use client';

import React from 'react';
import Link from 'next/link';
import type { ElementHero } from '../utils/client';
import Video from './Video';
import { parseInlineMarkdown } from '../utils/client';
import { E2E_IDS } from '../constants/e2eIds';

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
  // Normaliser les retours à la ligne Windows (\r\n) en Unix (\n)
  const paragraphes = descriptionAvecRetoursLigne.split(/\r?\n/).filter(Boolean);
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
      <h1 className="hero-cont titre">{parseInlineMarkdown(element.titre)}</h1>
      <p className="hero-cont sousTitre">{parseInlineMarkdown(element.sousTitre)}</p>
      <p className="hero-cont description">{descriptionNodes}</p>
      <div className="ui-heroCtas">
        <Link
          href={element.callToAction.action}
          className="bouton hero-cont callToAction"
          e2eid={element.callToAction.e2eID ? `e2eid-${element.callToAction.e2eID}` : undefined}
        >
          {element.callToAction.texte}
        </Link>
        <Link
          href={element.ensavoirplus}
          className="lienInterne"
          e2eid={`e2eid-${element.ensavoirplusE2eID ?? E2E_IDS.hero.lienCv}`}
        >
          Télécharger mon CV
        </Link>
      </div>
    </>
  );

  if (video) {
    return (
      <section className="hero-cont" data-layout="2 columns">
        <div className="hero-gauche-cont">{contenuGauche}</div>
        <div className="hero-droite-cont">
          <Video element={video} backgroundColor="white" />
        </div>
      </section>
    );
  }

  return (
    <section className="hero-cont">
      <div className="ui-content">
        {contenuGauche}
      </div>
    </section>
  );
};

export default HeroSection;
