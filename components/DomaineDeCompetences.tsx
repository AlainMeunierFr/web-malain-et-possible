/**
 * Composant pour afficher un Domaine de compétences
 */

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
 * Parse le format citation avec auteur : "citation\n*auteur*"
 * Retourne { description, auteur } si le format est détecté, sinon { description, auteur: undefined }
 */
function parseQuoteWithAuthor(text: string): { description: string; auteur?: string } {
  // Pattern pour détecter "citation\n*auteur*"
  const quotePattern = /^"(.+)\n\*(.+)\*"$/s;
  const match = text.match(quotePattern);
  
  if (match) {
    return {
      description: `"${match[1]}"`,
      auteur: match[2],
    };
  }
  
  return { description: text };
}

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
}

const DomaineDeCompetences: React.FC<DomaineDeCompetencesProps> = ({ domaine }) => {
  return (
    <div className={styles.container}>
      {/* Premier sous-bloc : Domaine de compétences */}
      <div className={styles.domaineHeader}>
        <h2 className={styles.domaineTitre}>{domaine.titre}</h2>
        <p className={styles.domaineContenu}>{domaine.contenu}</p>
      </div>

      {/* Second bloc : 3 compétences */}
      <div className={styles.competencesContainer}>
        {domaine.items.map((competence, index) => {
          // Récupère l'icône lucide-react si elle existe
          const IconComponent = competence.icon ? iconMap[competence.icon] : null;

          // Parse la description pour détecter le format citation avec auteur
          const parsed = parseQuoteWithAuthor(competence.description);
          const finalAuteur = parsed.auteur || competence.auteur;

          return (
            <div key={index} className={styles.competence}>
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
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={competence.image.src} 
                    alt={competence.image.alt}
                  />
                ) : null}
              </div>
              <div className={styles.competenceDescription}>
                {parseInlineMarkdown(parsed.description)}
              </div>
              {finalAuteur && (
                <div className={styles.competenceAuteur}>
                  {finalAuteur}
                </div>
              )}
              {competence.bouton && (
                <Link href={competence.bouton.action} className={styles.competenceBouton}>
                  {competence.bouton.texte}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DomaineDeCompetences;
