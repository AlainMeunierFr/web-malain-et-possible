/**
 * Utilitaire partagé pour parser le markdown inline
 * Convertit :
 * - **texte** en <strong>texte</strong> (gras)
 * - *texte* en <em>texte</em> (italique)
 * 
 * Gère les chevauchements (ignore italic si déjà dans bold)
 */

import React from 'react';

export function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  const boldPattern = /\*\*(.+?)\*\*/g;
  const italicPattern = /\*(.+?)\*/g;
  
  const boldMatches: Array<{ start: number; end: number; text: string }> = [];
  const italicMatches: Array<{ start: number; end: number; text: string }> = [];

  let match;
  while ((match = boldPattern.exec(text)) !== null) {
    boldMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
  }

  while ((match = italicPattern.exec(text)) !== null) {
    // Ignorer si c'est déjà dans un bold
    const inBold = boldMatches.some(b => match!.index >= b.start && match!.index < b.end);
    if (!inBold) {
      italicMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
    }
  }

  // Combiner et trier tous les matches
  const allMatches = [
    ...boldMatches.map(m => ({ ...m, type: 'bold' as const })),
    ...italicMatches.map(m => ({ ...m, type: 'italic' as const })),
  ].sort((a, b) => a.start - b.start);

  allMatches.forEach((match, index) => {
    // Ajouter le texte avant le match
    if (match.start > currentIndex) {
      parts.push(text.substring(currentIndex, match.start));
    }

    // Ajouter le contenu formaté
    if (match.type === 'bold') {
      parts.push(<strong key={`bold-${index}`}>{match.text}</strong>);
    } else {
      parts.push(<em key={`italic-${index}`}>{match.text}</em>);
    }

    currentIndex = match.end;
  });

  // Ajouter le texte restant
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : [text];
}
