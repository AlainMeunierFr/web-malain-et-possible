/**
 * Composant pour afficher un Domaine de compétences
 */

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Rocket,
  Globe,
  MessageCircle,
  Puzzle,
  Binoculars,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { DomaineDeCompetences } from '../utils/indexReader';
import styles from './DomaineDeCompetences.module.css';

/**
 * Parse inline markdown (bold) pour convertir **texte** en <strong>texte</strong>
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Pattern pour **bold**
  const boldPattern = /\*\*(.+?)\*\*/g;

  const boldMatches: Array<{ start: number; end: number; text: string }> = [];

  let match;
  while ((match = boldPattern.exec(text)) !== null) {
    boldMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
  }

  // Trier les matches par position
  boldMatches.sort((a, b) => a.start - b.start);

  boldMatches.forEach((match, index) => {
    // Ajouter le texte avant le match
    if (match.start > currentIndex) {
      parts.push(text.substring(currentIndex, match.start));
    }

    // Ajouter le contenu en gras
    parts.push(<strong key={`bold-${index}`}>{match.text}</strong>);

    currentIndex = match.end;
  });

  // Ajouter le texte restant
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/**
 * Mapping des noms d'icônes vers les composants lucide-react
 */
const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Globe,
  MessageCircle,
  Puzzle,
  Binoculars,
  Users,
};

export interface DomaineDeCompetencesProps {
  domaine: DomaineDeCompetences;
  backgroundColor?: 'white' | 'light';
}

const DomaineDeCompetences: React.FC<DomaineDeCompetencesProps> = ({ domaine, backgroundColor = 'white' }) => {
  // Protection : vérifier que items existe et est un tableau
  if (!domaine.items || !Array.isArray(domaine.items)) {
    console.error('DomaineDeCompetences: items is missing or not an array', domaine);
    return null;
  }

  const containerClass = backgroundColor === 'light' 
    ? `${styles.container} ${styles.containerLight}`
    : styles.container;

  return (
    <div className={containerClass}>
      {/* Premier sous-bloc : Domaine de compétences */}
      <div className={styles.domaineHeader}>
        <h2 className={styles.domaineTitre}>{domaine.titre}</h2>
        {domaine.contenu && domaine.contenu.trim() && (
          <p className={styles.domaineContenu}>{domaine.contenu}</p>
        )}
      </div>

      {/* Second bloc : éléments alignés horizontalement */}
      <div className={styles.competencesContainer}>
        {/* Bloc des titres */}
        <div className={styles.competencesRow}>
          {domaine.items.map((competence, index) => (
            <div key={`titre-${index}`} className={styles.competenceCell}>
              <h3 className={styles.competenceTitre}>{competence.titre}</h3>
            </div>
          ))}
        </div>

        {/* Bloc des images */}
        <div className={styles.competencesRow}>
          {domaine.items.map((competence, index) => {
            const IconComponent = competence.icon ? iconMap[competence.icon] : null;
            return (
              <div key={`image-${index}`} className={styles.competenceCell}>
                <div className={styles.competenceImage}>
                  {IconComponent ? (
                    <IconComponent
                      size={120}
                      color="rgba(9, 23, 71, 1)"
                      strokeWidth={1.5}
                      className={styles.competenceIcon}
                    />
                  ) : competence.image ? (
                    <img 
                      src={competence.image.src} 
                      alt={competence.image.alt}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bloc des descriptions */}
        <div className={styles.competencesRow}>
          {domaine.items.map((competence, index) => (
            <div key={`description-${index}`} className={styles.competenceCell}>
              <div className={styles.competenceDescription}>
                {parseInlineMarkdown(competence.description)}
              </div>
            </div>
          ))}
        </div>

        {/* Bloc des boutons */}
        <div className={styles.competencesRow}>
          {domaine.items.map((competence, index) => (
            <div key={`bouton-${index}`} className={styles.competenceCell}>
              {competence.bouton ? (
                <Link href={competence.bouton.action} className={styles.competenceBouton} data-e2eid={null}>
                  {competence.bouton.texte}
                </Link>
              ) : (
                <div className={styles.competenceBoutonPlaceholder}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomaineDeCompetences;
