/**
 * Composant pour afficher un Domaine de compétences
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { getJsonImagePath } from '../utils/imagePath';
import styles from './DomaineDeCompetences.module.css';

/**
 * Vérifie si une URL est externe (commence par http:// ou https://)
 */
function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

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
 * Parse inline markdown (bold, italic, links) pour convertir :
 * - **texte** en <strong>texte</strong>
 * - *texte* en <em>texte</em>
 * - [texte](url) en <a href="url" target="_blank">texte</a> (sans les crochets)
 * - [**texte**](url) en <a> avec texte en gras
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Pattern pour **bold** (hors liens et italique)
  const boldPattern = /\*\*(.+?)\*\*/g;
  // Pattern pour *italic* (un seul astérisque, hors bold et liens)
  // On évite les lookbehind/lookahead pour compatibilité, on vérifiera manuellement
  const italicPattern = /\*([^*\n]+?)\*/g;
  // Pattern pour [texte](url) - peut contenir **bold** dans le texte
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  const boldMatches: Array<{ start: number; end: number; text: string; type: 'bold' }> = [];
  const italicMatches: Array<{ start: number; end: number; text: string; type: 'italic' }> = [];
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

  // Détecter les italic qui ne sont PAS dans un lien ni dans un bold
  let italicMatch: RegExpExecArray | null;
  while ((italicMatch = italicPattern.exec(text)) !== null) {
    // Vérifier si cet italic est à l'intérieur d'un lien ou d'un bold
    const isInLink = linkMatches.some(link => 
      italicMatch!.index >= link.start && italicMatch!.index < link.end
    );
    const isInBold = boldMatches.some(bold => 
      italicMatch!.index >= bold.start && italicMatch!.index < bold.end
    );
    
    // Vérifier aussi si c'est en fait un bold (vérifier les caractères avant/après)
    const charBefore = italicMatch.index > 0 ? text[italicMatch.index - 1] : '';
    const charAfter = italicMatch.index + italicMatch[0].length < text.length 
      ? text[italicMatch.index + italicMatch[0].length] 
      : '';
    const isPartOfBold = charBefore === '*' || charAfter === '*';
    
    if (!isInLink && !isInBold && !isPartOfBold) {
      italicMatches.push({ 
        start: italicMatch.index, 
        end: italicMatch.index + italicMatch[0].length, 
        text: italicMatch[1],
        type: 'italic'
      });
    }
  }

  // Combiner et trier tous les matches
  const allMatches = [
    ...boldMatches,
    ...italicMatches,
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
    } else if (match.type === 'italic') {
      parts.push(<em key={`italic-${index}`}>{match.text}</em>);
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
 * Parse markdown avec support des listes à puces
 * Gère les blocs de texte et les listes (lignes commençant par "- ")
 */
function parseMarkdownContent(text: string): React.ReactNode {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentListItems: string[] = [];
  let currentParagraph: string[] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      blocks.push(
        <ul key={`list-${blocks.length}`} className={styles.markdownList}>
          {currentListItems.map((item, idx) => (
            <li key={`li-${idx}`}>
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      currentListItems = [];
    }
  };

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ').trim();
      if (paragraphText) {
        blocks.push(
          <p key={`p-${blocks.length}`} className={styles.markdownParagraph}>
            {parseInlineMarkdown(paragraphText)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('- ')) {
      // C'est un élément de liste
      flushParagraph(); // Flush le paragraphe en cours avant de commencer une liste
      const listItem = trimmedLine.substring(2).trim(); // Enlever "- " au début
      currentListItems.push(listItem);
    } else if (trimmedLine === '') {
      // Ligne vide : flush ce qui est en cours
      flushList();
      flushParagraph();
    } else {
      // C'est du texte normal
      flushList(); // Flush la liste en cours avant de commencer un paragraphe
      currentParagraph.push(trimmedLine);
    }
  }

  // Flush ce qui reste
  flushList();
  flushParagraph();

  // Si aucun bloc n'a été créé, retourner le texte parsé inline
  if (blocks.length === 0) {
    return <>{parseInlineMarkdown(text)}</>;
  }

  return <>{blocks}</>;
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
  const pathname = usePathname();
  
  // Protection : vérifier que items existe et est un tableau
  if (!domaine.items || !Array.isArray(domaine.items)) {
    console.error('DomaineDeCompetences: items is missing or not an array', {
      titre: domaine.titre,
      hasItems: !!domaine.items,
      itemsType: typeof domaine.items,
      itemsIsArray: Array.isArray(domaine.items),
      domaine
    });
    return null;
  }
  
  // Debug : vérifier la structure des compétences
  if (domaine.items.length === 0) {
    console.warn('DomaineDeCompetences: items array is empty', domaine.titre);
  }
  
  /**
   * Vérifie si un bouton doit être affiché
   * Masque le bouton si il pointe vers un profil et qu'on est déjà sur cette page
   */
  const shouldDisplayButton = (bouton: { texte: string; action: string } | null): boolean => {
    if (!bouton) return false;
    
    // Si le bouton pointe vers un profil
    if (bouton.action.startsWith('/profil/')) {
      // Vérifier si on est déjà sur cette page
      return pathname !== bouton.action;
    }
    
    // Pour les autres boutons, toujours les afficher
    return true;
  };

  const containerClass = backgroundColor === 'light' 
    ? 'domaineDeCompetence light'
    : 'domaineDeCompetence';

  return (
    <div className={containerClass}>
      {/* Premier sous-bloc : Domaine de compétences */}
      <div className="domaineHeader">
        <h2>{domaine.titre}</h2>
        {domaine.contenu && domaine.contenu.trim() && (
          <p className="domaineContenu">
            {parseInlineMarkdown(domaine.contenu)}
          </p>
        )}
        {domaine.auteur && (
          <p className="domaineAuteur">{domaine.auteur}</p>
        )}
      </div>

      {/* Second bloc : compétences organisées verticalement par compétence */}
      <div className="competencesContainer">
        {domaine.items.map((competence, index) => {
          const IconComponent = competence.icon ? iconMap[competence.icon] : null;
          return (
            <div key={`competence-${index}`} className="competenceCard">
              <h3 className="competenceTitre">{competence.titre}</h3>
              <div className="competenceImage">
                {IconComponent ? (
                  <IconComponent
                    size={120}
                    color="rgba(9, 23, 71, 1)"
                    strokeWidth={1.5}
                  />
                ) : competence.image ? (
                  <img 
                    src={getJsonImagePath(competence.image.src)} 
                    alt={competence.image.alt}
                  />
                ) : null}
              </div>
              <div className="competenceDescription">
                {parseMarkdownContent(competence.description)}
              </div>
              {competence.auteur && (
                <p className="competenceAuteur">{competence.auteur}</p>
              )}
              <div className="competenceBoutonContainer">
                {competence.bouton && shouldDisplayButton(competence.bouton) ? (
                  isExternalUrl(competence.bouton.action) ? (
                    <a
                      href={competence.bouton.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bouton"
                      data-e2eid={null}
                    >
                      {competence.bouton.texte}
                    </a>
                  ) : (
                    <Link href={competence.bouton.action} className="bouton" data-e2eid={null}>
                      {competence.bouton.texte}
                    </Link>
                  )
                ) : (
                  <div className="competenceBoutonPlaceholder"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Troisième bloc : Expériences et apprentissages (si disponibles) */}
      {domaine.experiences && domaine.experiences.length > 0 && (
        <div className="experiencesContainer">
          <h3 className="experiencesTitre">Expériences et apprentissages</h3>
          <ul className="experiencesList">
            {[...domaine.experiences]
              .sort((a, b) => {
                // Les périodes null en premier
                if (!a.periode && !b.periode) return 0;
                if (!a.periode) return -1;
                if (!b.periode) return 1;
                
                // Extraire l'année la plus récente de chaque période
                const getLatestYear = (periode: string | null): number => {
                  if (!periode || typeof periode !== 'string') return 0;
                  
                  // Format "2022-2023" → prendre 2023
                  const rangeMatch = periode.match(/(\d{4})-(\d{4})/);
                  if (rangeMatch) {
                    return parseInt(rangeMatch[2], 10);
                  }
                  
                  // Format "Depuis 2020" → prendre 2020
                  const depuisMatch = periode.match(/Depuis\s+(\d{4})/i);
                  if (depuisMatch) {
                    return parseInt(depuisMatch[1], 10);
                  }
                  
                  // Format "février-juin 2022" ou "2022" → prendre l'année
                  const yearMatch = periode.match(/(\d{4})/);
                  if (yearMatch) {
                    return parseInt(yearMatch[1], 10);
                  }
                  
                  return 0;
                };
                
                const yearA = getLatestYear(a.periode);
                const yearB = getLatestYear(b.periode);
                
                // Ordre inverse chronologique (plus récent en premier)
                return yearB - yearA;
              })
              .map((experience, index) => (
              <li key={`experience-${experience.id || index}`} className="experienceItem">
                {experience.periode && (
                  <>
                    <em className="experiencePeriode">[{experience.periode}]</em>
                    {' - '}
                  </>
                )}
                <span className="experienceDescription">
                  {parseMarkdownContent(experience.description)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DomaineDeCompetences;
