/**
 * Composant pour rendre le contenu markdown
 * HTML minimal : juste le texte et son typeDeContenu
 * La CSS fait le reste
 * Blocs de code : affichage avec label de langage (ex. TS TypeScript)
 */

import React from 'react';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import oneLight from 'react-syntax-highlighter/dist/cjs/styles/prism/one-light';
import type { ContenuElement } from '../utils';
import { getMdImagePath, parseInlineMarkdown, titreToAnchorId } from '../utils';

/** Label d’affichage pour le langage du bloc de code (ex. "ts" → "TS TypeScript") */
function codeBlockLabel(lang: string | undefined): string {
  if (lang === undefined || String(lang).trim() === '') return 'Code';
  const l = lang.toLowerCase().trim();
  const surcharge: Record<string, string> = {
    ts: 'TypeScript',
    typescript: 'TypeScript',
    tsx: 'TSX',
    js: 'JavaScript',
    javascript: 'JavaScript',
    jsx: 'JSX',
    gherkin: 'Gherkin',
    yaml: 'YAML',
    yml: 'YAML',
    html: 'HTML',
    css: 'CSS',
    markdown: 'Markdown',
    md: 'Markdown',
  };
  return surcharge[l] ?? lang.trim();
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const USER_STORIE_KEYWORDS = ["En tant qu'", 'En tant que ', 'Je souhaite ', 'Afin de ', "Critères d'acceptation"];

/** Mots-clés Gherkin : motif regex (accepte accents E/É, e/é) pour éviter soucis d’encodage. */
const GHERKIN_PATTERNS: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /^(\s*)(Fonctionnalit[eé])(\s*:.*)$/gim, replacement: '$1<span class="codeKeyword">$2</span>$3' },
  { pattern: /^(\s*)(Contexte)(\s*:.*)$/gim, replacement: '$1<span class="codeKeyword">$2</span>$3' },
  { pattern: /^(\s*)(Sc[eé]nario)(\s*:.*)$/gim, replacement: '$1<span class="codeKeyword">$2</span>$3' },
  { pattern: /^(\s*)([EÉ]tant donn[eé])(\s+.*)$/gim, replacement: '$1<span class="codeKeyword">$2</span>$3' },
  { pattern: /^(\s*)(Quand)(\s+.*)$/gim, replacement: '$1<span class="codeKeyword">$2</span>$3' },
  { pattern: /^(\s*)(Alors)(\s+.*)$/gim, replacement: '$1<span class="codeKeyword">$2</span>$3' },
  { pattern: /^(\s*)(Et)(\s+.*)$/gim, replacement: '$1<span class="codeKeyword">$2</span>$3' },
  { pattern: /^(\s*)(Ou)(\s+.*)$/gim, replacement: '$1<span class="codeKeyword">$2</span>$3' },
];

function highlightCodeKeywords(content: string, language: string | undefined): string {
  const lang = (language ?? '').toLowerCase().trim();
  let escaped = escapeHtml(content);
  escaped = escaped.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (lang === 'user storie') {
    let out = escaped;
    for (const kw of USER_STORIE_KEYWORDS) {
      const safe = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`^(${safe})`, 'gm');
      out = out.replace(re, '<span class="codeKeyword">$1</span>');
    }
    return out;
  }
  if (lang === 'gherkin') {
    let out = escaped;
    for (const { pattern, replacement } of GHERKIN_PATTERNS) {
      out = out.replace(pattern, replacement);
    }
    return out;
  }
  return escaped;
}

function hasSyntaxHighlighter(lang: string | undefined): boolean {
  const l = (lang ?? '').toLowerCase().trim();
  return ['typescript', 'ts', 'tsx', 'javascript', 'js', 'jsx', 'html', 'css', 'yaml', 'yml'].includes(l);
}

/** Nom du langage pour Prism (ts→typescript, yml→yaml, etc.). */
function prismLanguage(lang: string | undefined): string {
  const l = (lang ?? '').toLowerCase().trim();
  if (l === 'ts') return 'typescript';
  if (l === 'js') return 'javascript';
  if (l === 'yml') return 'yaml';
  return l || 'text';
}

/** Titres de partie qui indiquent un sommaire (liste → liens ancres). Sans ce titre dans le MD, les listes numérotées restent des listes normales. */
const SOMMAIRE_TITRES = /^(Plan de l'article|Sommaire|Table des matières)$/i;

export interface AboutSiteContentRendererProps {
  elements: ContenuElement[];
  typeDeContenu?: string;
  /** Si fourni et correspond à un titre de sommaire, la liste ordonnée sera rendue en liens vers les ancres. */
  partieTitre?: string;
}

const AboutSiteContentRenderer: React.FC<AboutSiteContentRendererProps> = ({ 
  elements, 
  typeDeContenu,
  partieTitre,
}) => {
  // Regrouper les éléments par zones (Alain, IA, normal)
  const groupedElements: Array<{
    type: 'alain' | 'ia' | 'normal';
    elements: Array<{ element: ContenuElement; index: number }>;
  }> = [];
  
  let currentGroup: { type: 'alain' | 'ia' | 'normal'; elements: Array<{ element: ContenuElement; index: number }> } | null = null;

  elements.forEach((element, index) => {
    // Détecter si c'est un prompt "Alain" ou une réponse "IA" (uniquement pour les paragraphes)
    if (element.type === 'paragraph') {
      const isAlainPrompt = element.content?.trim().startsWith('**Alain**');
      const isIAResponse = element.content?.trim().startsWith('**IA**');
      
      if (isAlainPrompt) {
        // Finaliser le groupe précédent s'il existe
        if (currentGroup) {
          groupedElements.push(currentGroup);
        }
        // Nouveau groupe Alain
        currentGroup = { type: 'alain', elements: [{ element, index }] };
      } else if (isIAResponse) {
        // Finaliser le groupe précédent s'il existe
        if (currentGroup) {
          groupedElements.push(currentGroup);
        }
        // Nouveau groupe IA
        currentGroup = { type: 'ia', elements: [{ element, index }] };
      } else {
        // Élément normal : ajouter au groupe courant ou créer un groupe normal
        if (currentGroup && currentGroup.type !== 'normal') {
          // On est dans une zone Alain ou IA, ajouter à ce groupe
          currentGroup.elements.push({ element, index });
        } else {
          // Créer ou continuer un groupe normal
          if (currentGroup && currentGroup.type === 'normal') {
            currentGroup.elements.push({ element, index });
          } else {
            if (currentGroup) {
              groupedElements.push(currentGroup);
            }
            currentGroup = { type: 'normal', elements: [{ element, index }] };
          }
        }
      }
    } else {
      // Élément non-paragraphe (image, liste, etc.)
      if (currentGroup) {
        // Ajouter au groupe courant
        currentGroup.elements.push({ element, index });
      } else {
        // Créer un groupe normal
        currentGroup = { type: 'normal', elements: [{ element, index }] };
      }
    }
  });

  // Ajouter le dernier groupe
  if (currentGroup) {
    groupedElements.push(currentGroup);
  }

  // Fonction pour rendre un élément individuel
  const renderElement = (element: ContenuElement, elementIndex: number) => {
    // Image en bloc (fluide, s'adapte à la largeur du container)
    if (element.type === 'image' && element.imageFilename) {
      // Si imageUrl est déjà défini (URL complète), l'utiliser, sinon construire le chemin MD
      const imageSrc = element.imageUrl || getMdImagePath(element.imageFilename);
      return (
        <div key={elementIndex} className="imageBlock">
          <Image 
            src={imageSrc}
            alt={element.imageFilename}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="blockImage"
          />
        </div>
      );
    }

    // Paragraphe
    if (element.type === 'paragraph') {
      // Paragraphes spéciaux US : En tant que, Je souhaite, Afin de
      if (element.typeDeContenu === 'En tant que' || 
          element.typeDeContenu === 'Je souhaite' || 
          element.typeDeContenu === 'Afin de') {
        return (
          <p key={elementIndex} className="usKeyword">
            {parseInlineMarkdown(element.content || '')}
          </p>
        );
      }
      // Paragraphe Critères d'acceptation : titre en gras
      if (element.typeDeContenu === "Critères d'acceptation") {
        return (
          <p key={elementIndex} className="criteresAcceptationTitre">
            {parseInlineMarkdown(element.content || '')}
          </p>
        );
      }
      // Paragraphe CA (themeCritere) : titre de critère
      if (element.typeDeContenu === 'themeCritere') {
        return (
          <p key={elementIndex} className="themeCritere">
            {parseInlineMarkdown(element.content || '')}
          </p>
        );
      }
      return (
        <p key={elementIndex} className="paragraph">
          {parseInlineMarkdown(element.content || '')}
        </p>
      );
    }

    // Bloc de code (```lang ... ```)
    if (element.type === 'code' && element.content !== undefined) {
      const label = codeBlockLabel(element.language);
      const lang = (element.language ?? '').toLowerCase().trim();

      if (hasSyntaxHighlighter(element.language)) {
        return (
          <div key={elementIndex} className="codeBlockAPropos">
            <div className="codeBlockAProposHeader">{label}</div>
            <div className="codeBlockAProposPre codeBlockAProposPre--syntax">
              <SyntaxHighlighter
                language={prismLanguage(element.language)}
                style={oneLight}
                PreTag="div"
                codeTagProps={{ className: 'codeBlockAProposCode' }}
                customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.875rem' }}
                showLineNumbers={false}
              >
                {element.content}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      }

      const isKeywordHighlight = lang === 'user storie' || lang === 'gherkin';
      const innerHtml = isKeywordHighlight ? highlightCodeKeywords(element.content, element.language) : escapeHtml(element.content);
      return (
        <div key={elementIndex} className="codeBlockAPropos">
          <div className="codeBlockAProposHeader">{label}</div>
          <pre className="codeBlockAProposPre">
            <code className="codeBlockAProposCode" dangerouslySetInnerHTML={{ __html: innerHtml }} />
          </pre>
        </div>
      );
    }

    // Liste (ul ou ol)
    if (element.type === 'ul' || element.type === 'ol') {
      if (element.typeDeContenu) {
        const text = element.items?.[0] || '';
        
        // "Critères d'acceptation" → h4 sans puce
        if (element.typeDeContenu === "Critères d'acceptation") {
          return (
            <h4 key={elementIndex} className="criteresAcceptationTitre" data-type-contenu={element.typeDeContenu}>
              {parseInlineMarkdown(text)}
            </h4>
          );
        }
        
        // Déterminer la classe CSS selon le typeDeContenu
        let className = 'userStoryElement';
        if (element.typeDeContenu === 'themeCritere') {
          className = 'themeCritere'; // Puce niveau 1
        } else if (element.typeDeContenu === 'critere') {
          className = 'critere'; // Puce niveau 2
        }
        return (
          <ul key={elementIndex} className={className} data-type-contenu={element.typeDeContenu}>
            <li>
              {parseInlineMarkdown(text)}
            </li>
          </ul>
        );
      }
      const Tag = element.type === 'ul' ? 'ul' : 'ol';
      const items = element.items ?? [];
      // Sommaire uniquement si la partie a un titre explicite (Plan de l'article, Sommaire, Table des matières)
      const looksLikeSommaire = Tag === 'ol' && items.length >= 2 && partieTitre != null && SOMMAIRE_TITRES.test(partieTitre.trim());
      return (
        <Tag key={elementIndex} className={looksLikeSommaire ? 'list sommaire' : 'list'}>
          {items.map((item, itemIndex) => {
            const trimmed = item.trim();
            const slugLabel = /^\d+\.\s+.+/.test(trimmed) ? trimmed : `${itemIndex + 1}. ${trimmed}`;
            const anchorId = looksLikeSommaire ? titreToAnchorId(slugLabel) : '';
            const linkText = /^\d+\.\s+.+/.test(trimmed) ? trimmed.replace(/^\d+\.\s+/, '') : trimmed;
            return (
              <li key={itemIndex} className="listItem">
                {anchorId ? (
                  <a href={`#${anchorId}`} className="sommaireLink">
                    {parseInlineMarkdown(linkText)}
                  </a>
                ) : (
                  parseInlineMarkdown(item)
                )}
              </li>
            );
          })}
        </Tag>
      );
    }

    return null;
  };

  return (
    <div className={typeDeContenu === 'Prompt' ? 'promptContainer' : 'normalContainer'}>
      {groupedElements.map((group, groupIndex) => {
        let containerClass = 'normalContainer';
        if (group.type === 'alain') {
          containerClass = 'promptContainer';
        } else if (group.type === 'ia') {
          containerClass = 'technicalResultContainer';
        }

        return (
          <div key={groupIndex} className={containerClass}>
            {group.elements.map(({ element, index }) => renderElement(element, index))}
          </div>
        );
      })}
    </div>
  );
};

export default AboutSiteContentRenderer;
