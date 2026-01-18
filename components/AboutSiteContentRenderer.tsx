/**
 * Composant pour rendre le contenu markdown des parties et sous-parties
 * Utilise les styles HTML standards
 */

import React from 'react';
import type { ContenuElement } from '../utils/aboutSiteReader';
import styles from './AboutSiteContentRenderer.module.css';

export interface AboutSiteContentRendererProps {
  elements: ContenuElement[];
  isPrompt?: boolean; // Si true, affiche avec fond bleu clair (pour les sous-parties "Prompt")
}

const AboutSiteContentRenderer: React.FC<AboutSiteContentRendererProps> = ({ 
  elements, 
  isPrompt = false 
}) => {
  const containerClass = isPrompt ? styles.promptContainer : styles.normalContainer;

  return (
    <div className={containerClass}>
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
