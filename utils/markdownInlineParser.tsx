/**
 * Utilitaire partagé pour parser le markdown inline
 * Convertit :
 * - **texte** en <strong>texte</strong> (gras)
 * - *texte* en <em>texte</em> (italique)
 * - [texte](url) en <a href="url">texte</a> (liens, ouverture externe)
 *
 * Gère les chevauchements (ignore italic si déjà dans bold)
 */

import React from 'react';

/** Parse uniquement gras et italique (utilisé pour les segments texte et le texte des liens). */
function parseBoldItalic(segment: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  const boldPattern = /\*\*(.+?)\*\*/g;
  const italicPattern = /\*(.+?)\*/g;
  const boldMatches: Array<{ start: number; end: number; text: string }> = [];
  const italicMatches: Array<{ start: number; end: number; text: string }> = [];

  let match;
  while ((match = boldPattern.exec(segment)) !== null) {
    boldMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
  }
  while ((match = italicPattern.exec(segment)) !== null) {
    const inBold = boldMatches.some(b => match!.index >= b.start && match!.index < b.end);
    if (!inBold) {
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

/**
 * Parse markdown inline : **gras**, *italique*, [texte](url).
 * Les liens sont rendus en <a> avec target="_blank" et rel="noopener noreferrer".
 */
export function parseInlineMarkdown(text: string): React.ReactNode[] {
  const linkPattern = /\[([^\]]*)\]\(([^)]*)\)/g;
  const segments: Array<{ type: 'text'; start: number; end: number } | { type: 'link'; text: string; url: string; start: number; end: number }> = [];
  let match;
  let lastEnd = 0;

  while ((match = linkPattern.exec(text)) !== null) {
    const fullLength = match[0].length;
    const start = match.index;
    const end = start + fullLength;
    if (start > lastEnd) {
      segments.push({ type: 'text', start: lastEnd, end: start });
    }
    segments.push({ type: 'link', text: match[1], url: match[2], start, end });
    lastEnd = end;
  }
  if (lastEnd < text.length) {
    segments.push({ type: 'text', start: lastEnd, end: text.length });
  }
  if (segments.length === 0) {
    return parseBoldItalic(text, 'md');
  }

  const parts: React.ReactNode[] = [];
  segments.forEach((seg, index) => {
    const prefix = `md-${index}`;
    if (seg.type === 'text') {
      const segmentText = text.substring(seg.start, seg.end);
      if (segmentText) parts.push(...parseBoldItalic(segmentText, prefix));
    } else {
      parts.push(
        <a
          key={`link-${index}`}
          href={seg.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {parseBoldItalic(seg.text, `${prefix}-a`)}
        </a>
      );
    }
  });
  return parts.length > 0 ? parts : [text];
}
