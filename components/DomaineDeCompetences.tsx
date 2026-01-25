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
 * Parse le bold dans un texte (utilisé pour le texte des liens)
 */
function parseBoldInText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  const boldPattern = /\*\*(.+?)\*\*/g;
  const boldMatches: Array<{ start: number; end: number; text: string }> = [];

  let match: RegExpExecArray | null;
  while ((match = boldPattern.exec(text)) !== null) {
    boldMatches.push({ 
      start: match.index, 
      end: match.index + match[0].length, 
      text: match[1]
    });
  }

  boldMatches.sort((a, b) => a.start - b.start);

  boldMatches.forEach((match, index) => {
    if (match.start > currentIndex) {
      parts.push(text.substring(currentIndex, match.start));
    }
    parts.push(<strong key={`bold-${index}`}>{match.text}</strong>);
    currentIndex = match.end;
  });

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/**
 * Parse inline markdown (bold, links) pour convertir :
 * - **texte** en <strong>texte</strong>
 * - [texte](url) en <a href="url" target="_blank">texte</a> (sans les crochets)
 * - [**texte**](url) en <a> avec texte en gras
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Pattern pour **bold** (hors liens)
  const boldPattern = /\*\*(.+?)\*\*/g;
  // Pattern pour [texte](url) - peut contenir **bold** dans le texte
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  const boldMatches: Array<{ start: number; end: number; text: string; type: 'bold' }> = [];
  const linkMatches: Array<{ start: number; end: number; text: string; url: string; type: 'link' }> = [];

  // D'abord détecter les liens
  let linkMatch: RegExpExecArray | null;
  while ((linkMatch = linkPattern.exec(text)) !== null) {
    linkMatches.push({
      start: linkMatch.index,
      end: linkMatch.index + linkMatch[0].length,
      text: linkMatch[1], // Texte du lien (peut contenir **bold**)
      url: linkMatch[2],
      type: 'link'
    });
  }

  // Ensuite détecter les bold qui ne sont PAS dans un lien
  let boldMatch: RegExpExecArray | null;
  while ((boldMatch = boldPattern.exec(text)) !== null) {
    // Vérifier si ce bold est à l'intérieur d'un lien
    const isInLink = linkMatches.some(link => 
      boldMatch!.index >= link.start && boldMatch!.index < link.end
    );
    
    if (!isInLink) {
      boldMatches.push({ 
        start: boldMatch.index, 
        end: boldMatch.index + boldMatch[0].length, 
        text: boldMatch[1],
        type: 'bold'
      });
    }
  }

  // Combiner et trier tous les matches
  const allMatches = [
    ...boldMatches,
    ...linkMatches,
  ].sort((a, b) => a.start - b.start);

  allMatches.forEach((match, index) => {
    // Ajouter le texte avant le match
    if (match.start > currentIndex) {
      parts.push(text.substring(currentIndex, match.start));
    }

    // Ajouter le contenu formaté
    if (match.type === 'bold') {
      parts.push(<strong key={`bold-${index}`}>{match.text}</strong>);
    } else if (match.type === 'link') {
      // Parser le bold dans le texte du lien
      const linkContent = parseBoldInText(match.text);
      parts.push(
        <a 
          key={`link-${index}`} 
          href={match.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.markdownLink}
        >
          {linkContent}
        </a>
      );
    }

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
          <p className={styles.domaineContenu}>
            {parseInlineMarkdown(domaine.contenu)}
          </p>
        )}
      </div>

      {/* Second bloc : compétences organisées verticalement par compétence */}
      <div className={styles.competencesContainer}>
        {domaine.items.map((competence, index) => {
          const IconComponent = competence.icon ? iconMap[competence.icon] : null;
          return (
            <div key={`competence-${index}`} className={styles.competenceCard}>
              <h3 className={styles.competenceTitre}>{competence.titre}</h3>
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
              <div className={styles.competenceDescription}>
                {parseInlineMarkdown(competence.description)}
              </div>
              <div className={styles.competenceBoutonContainer}>
                {competence.bouton ? (
                  <Link href={competence.bouton.action} className={styles.competenceBouton} data-e2eid={null}>
                    {competence.bouton.texte}
                  </Link>
                ) : (
                  <div className={styles.competenceBoutonPlaceholder}></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DomaineDeCompetences;
