/**
 * Composant pour afficher la section HERO
 */

'use client';

import React from 'react';
import Link from 'next/link';
import type { ElementHero } from '../utils/indexReader';
import ProfilContainer from './ProfilContainer';
import { parseInlineMarkdown } from '../utils/markdownInlineParser';
import styles from './HeroSection.module.css';

export interface HeroSectionProps {
  element: ElementHero;
}

const HeroSection: React.FC<HeroSectionProps> = ({ element }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.titre}>{parseInlineMarkdown(element.titre)}</h1>
        <h2 className={styles.sousTitre}>{parseInlineMarkdown(element.sousTitre)}</h2>
        <p className={styles.description}>{parseInlineMarkdown(element.description)}</p>
        
        <div className={styles.boutonPrincipalContainer}>
          <Link 
            href={element.boutonPrincipal.action} 
            className={styles.boutonPrincipal}
            data-e2eid="hero-bouton-principal"
          >
            {element.boutonPrincipal.texte}
          </Link>
        </div>

        <div className={styles.profilsContainer}>
          {element.profils.map((profil) => (
            <ProfilContainer key={profil.slug} profil={profil} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
