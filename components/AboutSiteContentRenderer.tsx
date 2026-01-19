/**
 * Composant pour rendre le contenu markdown des parties et sous-parties
 * Utilise les styles HTML standards
 */

import React from 'react';
import type { ContenuElement } from '../utils/aboutSiteReader';
import styles from './AboutSiteContentRenderer.module.css';

export interface AboutSiteContentRendererProps {
  elements: ContenuElement[];
  typeDeContenu?: string; // "Prompt", "Résultat technique", etc. (pour style CSS spécial)
}

const AboutSiteContentRenderer: React.FC<AboutSiteContentRendererProps> = ({ 
  elements, 
  typeDeContenu 
}) => {
  const containerClass = typeDeContenu === 'Prompt' ? styles.promptContainer : styles.normalContainer;

  return (
    <div className={containerClass} {...(typeDeContenu ? { 'data-type-contenu': typeDeContenu } : {})}>
      {elements.map((element, index) => {
        switch (element.type) {
          case 'paragraph':
            return (
              <p key={index} className={styles.paragraph}>
                {element.content}
              </p>
            );

          case 'ul':
            return (
              <ul key={index} className={styles.list}>
                {element.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={index} className={styles.list}>
                {element.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ol>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default AboutSiteContentRenderer;
