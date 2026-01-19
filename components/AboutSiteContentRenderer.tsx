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

  // Grouper les éléments pour gérer les sous-listes après "Critères d'acceptation"
  const elementsGroupes: (ContenuElement | ContenuElement[])[] = [];
  let dansCriteres = false;
  let criteresIndex = -1;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    
    if (element.typeDeContenu === "Critères d'acceptation") {
      dansCriteres = true;
      criteresIndex = elementsGroupes.length;
      elementsGroupes.push(element);
    } else if (dansCriteres && (element.type === 'ul' || element.type === 'ol')) {
      // Grouper les sous-listes avec les critères d'acceptation
      if (criteresIndex >= 0 && Array.isArray(elementsGroupes[criteresIndex])) {
        (elementsGroupes[criteresIndex] as ContenuElement[]).push(element);
      } else {
        elementsGroupes[criteresIndex] = [elementsGroupes[criteresIndex] as ContenuElement, element];
      }
    } else {
      dansCriteres = false;
      criteresIndex = -1;
      elementsGroupes.push(element);
    }
  }

  return (
    <div className={containerClass}>
      {elementsGroupes.map((elementOrGroup, index) => {
        // Si c'est un groupe (tableau), afficher le premier élément puis les sous-listes
        if (Array.isArray(elementOrGroup)) {
          const [critereElement, ...sousListes] = elementOrGroup;
          return (
            <div key={index}>
              <div className={styles.userStoryElement} data-type-contenu={critereElement.typeDeContenu}>
                <span className={styles.userStoryItem}>- {critereElement.items?.[0]}</span>
              </div>
              {sousListes.map((sousListe, sousIndex) => (
                <ul key={`${index}-${sousIndex}`} className={styles.list}>
                  {sousListe.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          );
        }

        const element = elementOrGroup;
        switch (element.type) {
          case 'paragraph':
            return (
              <p key={index} className={styles.paragraph}>
                {element.content}
              </p>
            );

          case 'ul':
            // Si l'élément a un typeDeContenu (User Story), afficher chaque item séparément
            if (element.typeDeContenu) {
              return (
                <div key={index} className={styles.userStoryElement} data-type-contenu={element.typeDeContenu}>
                  <span className={styles.userStoryItem}>- {element.items?.[0]}</span>
                </div>
              );
            }
            // Sinon, afficher comme une liste normale
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
