/**
 * Utilitaire partagé pour parser le markdown inline
 * Version unifiée gérant toutes les syntaxes du projet :
 * - **texte** en <strong>texte</strong> (gras)
 * - *texte* en <em>texte</em> (italique)
 * - [texte](url) en <a href="url" class="markdownLink">texte</a> (liens externes)
 * - [image:filename] en <img src="/api/images/md/filename" /> (images inline)
 *
 * Gère les chevauchements (ignore italic si déjà dans bold)
 */

import React from 'react';
import { getMdImagePath } from './imagePath';

/** Parse uniquement gras et italique (utilisé pour les segments texte et le texte des liens). */
function parseBoldItalic(segment: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  const boldPattern = /\*\*(.+?)\*\*/g;
  const italicPattern = /\*([^*\n]+?)\*/g;
  const boldMatches: Array<{ start: number; end: number; text: string }> = [];
  const italicMatches: Array<{ start: number; end: number; text: string }> = [];

  let match;
  while ((match = boldPattern.exec(segment)) !== null) {
    boldMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
  }
  while ((match = italicPattern.exec(segment)) !== null) {
    const inBold = boldMatches.some(b => match!.index >= b.start && match!.index < b.end);
    // Vérifier si c'est en fait un bold (caractères avant/après sont des *)
    const charBefore = match.index > 0 ? segment[match.index - 1] : '';
    const charAfter = match.index + match[0].length < segment.length 
      ? segment[match.index + match[0].length] 
      : '';
    const isPartOfBold = charBefore === '*' || charAfter === '*';
    
    if (!inBold && !isPartOfBold) {
      italicMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
    }
  }

  const allMatches = [
    ...boldMatches.map(m => ({ ...m, type: 'bold' as const })),
    ...italicMatches.map(m => ({ ...m, type: 'italic' as const })),
  ].sort((a, b) => a.start - b.start);

  allMatches.forEach((match, index) => {
    if (match.start > currentIndex) {
      parts.push(segment.substring(currentIndex, match.start));
    }
    if (match.type === 'bold') {
      parts.push(<strong key={`${keyPrefix}-bold-${index}`}>{match.text}</strong>);
    } else {
      parts.push(<em key={`${keyPrefix}-italic-${index}`}>{match.text}</em>);
    }
    currentIndex = match.end;
  });
  if (currentIndex < segment.length) {
    parts.push(segment.substring(currentIndex));
  }
  return parts.length > 0 ? parts : [segment];
}

type Segment = 
  | { type: 'text'; start: number; end: number }
  | { type: 'link'; text: string; url: string; start: number; end: number }
  | { type: 'image'; filename: string; start: number; end: number };

/**
 * Parse markdown inline : **gras**, *italique*, [texte](url), [image:filename].
 * - Les liens sont rendus avec target="_blank", rel="noopener noreferrer" et classe "markdownLink"
 * - Les images sont rendues avec le chemin API approprié
 */
export function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Pattern pour les liens markdown [texte](url)
  const linkPattern = /\[([^\]]*)\]\(([^)]*)\)/g;
  // Pattern pour les images inline [image:filename]
  const imagePattern = /\[image:([^\]]+)\]/g;
  
  const segments: Segment[] = [];
  let match;
  
  // Collecter toutes les images d'abord
  const imageMatches: Array<{ start: number; end: number; filename: string }> = [];
  while ((match = imagePattern.exec(text)) !== null) {
    imageMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      filename: match[1]
    });
  }
  
  // Collecter tous les liens (en excluant ceux qui chevauchent les images)
  const linkMatches: Array<{ start: number; end: number; text: string; url: string }> = [];
  while ((match = linkPattern.exec(text)) !== null) {
    const start = match.index;
    const end = match.index + match[0].length;
    // Vérifier que ce n'est pas une image
    const isImage = imageMatches.some(img => start >= img.start && start < img.end);
    if (!isImage) {
      linkMatches.push({ start, end, text: match[1], url: match[2] });
    }
  }
  
  // Combiner et trier par position
  const allMatches = [
    ...imageMatches.map(m => ({ ...m, type: 'image' as const })),
    ...linkMatches.map(m => ({ ...m, type: 'link' as const })),
  ].sort((a, b) => a.start - b.start);
  
  // Construire les segments
  let lastEnd = 0;
  allMatches.forEach(m => {
    if (m.start > lastEnd) {
      segments.push({ type: 'text', start: lastEnd, end: m.start });
    }
    if (m.type === 'image') {
      segments.push({ type: 'image', filename: m.filename, start: m.start, end: m.end });
    } else {
      segments.push({ type: 'link', text: m.text, url: m.url, start: m.start, end: m.end });
    }
    lastEnd = m.end;
  });
  if (lastEnd < text.length) {
    segments.push({ type: 'text', start: lastEnd, end: text.length });
  }
  
  // Si pas de segments spéciaux, parser bold/italic directement
  if (segments.length === 0) {
    return parseBoldItalic(text, 'md');
  }

  const parts: React.ReactNode[] = [];
  segments.forEach((seg, index) => {
    const prefix = `md-${index}`;
    if (seg.type === 'text') {
      const segmentText = text.substring(seg.start, seg.end);
      if (segmentText) parts.push(...parseBoldItalic(segmentText, prefix));
    } else if (seg.type === 'image') {
      parts.push(
        <img
          key={`image-${index}`}
          src={getMdImagePath(seg.filename)}
          alt={seg.filename}
          className="inline-image"
        />
      );
    } else {
      // Lien avec classe markdownLink
      parts.push(
        <a
          key={`link-${index}`}
          href={seg.url}
          target="_blank"
          rel="noopener noreferrer"
          className="markdownLink"
        >
          {parseBoldItalic(seg.text, `${prefix}-a`)}
        </a>
      );
    }
  });
  return parts.length > 0 ? parts : [text];
}
