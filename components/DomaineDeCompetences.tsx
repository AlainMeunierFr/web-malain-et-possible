/**
 * Composant pour afficher un Domaine de compétences
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Rocket,
  Globe,
  MessageCircle,
  Puzzle,
  Binoculars,
  Users,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from 'lucide-react';
import type { ElementDomaineDeCompetence } from '../utils/client';
import { getJsonImagePath, parseInlineMarkdown } from '../utils/client';

/**
 * Vérifie si une URL est externe (commence par http:// ou https://)
 */
function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Parse markdown avec support des listes à puces.
 */
function parseMarkdownContent(text: string): React.ReactNode {
  // Normaliser les retours à la ligne Windows (\r\n) en Unix (\n)
  const lines = text.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let currentListItems: string[] = [];
  let currentParagraph: string[] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      blocks.push(
        <ul key={`list-${blocks.length}`} className="markdownList">
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
          <p key={`p-${blocks.length}`} className="markdownParagraph">
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

  if (blocks.length === 0) return <>{parseInlineMarkdown(text)}</>;
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
  domaine: ElementDomaineDeCompetence;
  backgroundColor?: 'white' | 'light';
}

const DomaineDeCompetences: React.FC<DomaineDeCompetencesProps> = ({ domaine, backgroundColor = 'white' }) => {
  const pathname = usePathname();
  const [experiencesOuvert, setExperiencesOuvert] = useState(false);
  
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
    ? 'domaineDeCompetence-cont light'
    : 'domaineDeCompetence-cont';

  return (
    <div className={containerClass}>
      {/* Premier sous-bloc : Domaine de compétences */}
      <div className="domaineDeCompetence-header-cont">
        <h2 className="domaineDeCompetence-cont titre">{domaine.titre}</h2>
        {domaine.contenu && domaine.contenu.trim() && (
          <p className="domaineDeCompetence-cont contenu">
            {parseInlineMarkdown(domaine.contenu)}
          </p>
        )}
        {domaine.auteur && (
          <p className="domaineDeCompetence-cont auteur">{domaine.auteur}</p>
        )}
      </div>

      {/* Second bloc : compétences organisées verticalement par compétence */}
      <div className="domaineDeCompetence-competences-cont" data-layout="3 columns x 1 row">
        {domaine.items.map((competence, index) => {
          const IconComponent = competence.icon ? iconMap[competence.icon] : null;
          return (
            <div key={`competence-${index}`} className="competence-cont">
              {/* Image en premier pour float left (structure Mistral : img direct) */}
              {IconComponent && (
                <div className="competence-cont icon">
                  <IconComponent size={72} color="rgba(9, 23, 71, 1)" strokeWidth={1.5} />
                </div>
              )}
              {competence.image && !IconComponent && (
                <img
                  src={getJsonImagePath(competence.image.src)}
                  alt={competence.image.alt}
                  width={72}
                  height={72}
                  className="competence-cont image"
                />
              )}
              <h3 className="competence-cont titre">{competence.titre}</h3>
              {parseMarkdownContent(competence.description)}
              {competence.auteur && (
                <p className="competence-cont auteur">{competence.auteur}</p>
              )}
              {competence.bouton && shouldDisplayButton(competence.bouton) && (
                <div className="competence-cont lienContainer">
                  {isExternalUrl(competence.bouton.action) ? (
                    <a
                      href={competence.bouton.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="competence-cont lienInterne"
                    >
                      {competence.bouton.texte}
                    </a>
                  ) : (
                    <Link href={competence.bouton.action} className="competence-cont lienInterne" e2eid={competence.bouton.e2eID ? `e2eid-${competence.bouton.e2eID}` : undefined}>
                      {competence.bouton.texte}
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Troisième bloc : Expériences et apprentissages (à la demande) */}
      {domaine.experiences && domaine.experiences.length > 0 && (
        <div className="experiencesContainer" data-layout="accordeon, X rows">
          <button
            type="button"
            className="experiencesToggle"
            onClick={() => setExperiencesOuvert((o) => !o)}
            aria-expanded={experiencesOuvert}
            aria-controls={`experiences-list-${domaine.titre.replace(/\s+/g, '-')}`}
          >
            <h3 className="experienceEtApprentissage titre">
              Expériences et apprentissages ({domaine.experiences.length})
            </h3>
            {experiencesOuvert ? (
              <ChevronUp className="experiencesToggleIcon" aria-hidden="true" />
            ) : (
              <ChevronDown className="experiencesToggleIcon" aria-hidden="true" />
            )}
          </button>
          {experiencesOuvert && (
            <div
              id={`experiences-list-${domaine.titre.replace(/\s+/g, '-')}`}
              className="experiencesContent"
              role="region"
              aria-label="Liste des expériences et apprentissages"
            >
              <ul className="experiencesList">
                {[...domaine.experiences]
                  .sort((a, b) => {
                    // Les périodes null en premier
                    if (!a.periode && !b.periode) return 0;
                    if (!a.periode) return -1;
                    if (!b.periode) return 1;

                    const getLatestYear = (periode: string | null): number => {
                      if (!periode || typeof periode !== 'string') return 0;
                      const rangeMatch = periode.match(/(\d{4})-(\d{4})/);
                      if (rangeMatch) return parseInt(rangeMatch[2], 10);
                      const depuisMatch = periode.match(/Depuis\s+(\d{4})/i);
                      if (depuisMatch) return parseInt(depuisMatch[1], 10);
                      const yearMatch = periode.match(/(\d{4})/);
                      if (yearMatch) return parseInt(yearMatch[1], 10);
                      return 0;
                    };
                    return getLatestYear(b.periode) - getLatestYear(a.periode);
                  })
                  .map((experience, index) => (
                    <li key={`experience-${experience.id || index}`} className="experienceEtApprentissage">
                      {/* Ordre spec : categorie (h4) → description (p) → periode (n) */}
                      {experience.categorie && (
                        <h4 className="experienceEtApprentissage categorie">{experience.categorie}</h4>
                      )}
                      <span className="experienceEtApprentissage description">
                        {experience.periode && String(experience.periode).trim() !== '' ? (
                          <><em>[{experience.periode}]</em> - {parseMarkdownContent(experience.description)}</>
                        ) : (
                          parseMarkdownContent(experience.description)
                        )}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DomaineDeCompetences;
