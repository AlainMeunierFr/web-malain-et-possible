/**
 * Composant pour afficher la section HERO
 */

'use client';

import React from 'react';
import Link from 'next/link';
import type { ElementHero } from '../utils/indexReader';
import ProfilContainer from './ProfilContainer';
import { parseInlineMarkdown } from '../utils/markdownInlineParser';

export interface HeroSectionProps {
  element: ElementHero;
}

const HeroSection: React.FC<HeroSectionProps> = ({ element }) => {
  return (
    <section className="hero">
      <div className="content">
        <h1>{parseInlineMarkdown(element.titre)}</h1>
        <h2>{parseInlineMarkdown(element.sousTitre)}</h2>
        <p className="description">{parseInlineMarkdown(element.description)}</p>
        
        <div className="boutonPrincipalContainer">
          <Link 
            href={element.boutonPrincipal.action} 
            className="bouton"
            data-e2eid="hero-bouton-principal"
          >
            {element.boutonPrincipal.texte}
          </Link>
        </div>

        <div className="profilsContainer">
          {element.profils.map((profil) => (
            <ProfilContainer key={profil.slug} profil={profil} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
