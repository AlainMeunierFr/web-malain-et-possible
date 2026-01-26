import React from 'react';
import styles from './MarkdownRenderer.module.css';

export interface CourseMarkdownRendererProps {
  content: string;
}

/**
 * Renderer markdown simple pour les cours
 * Affiche le markdown standard (titres, paragraphes, listes, gras, etc.)
 * sans parser les prompts/résultats techniques
 */
const CourseMarkdownRenderer: React.FC<CourseMarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let currentQuote: string[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        elements.push(<p key={`p-${elements.length}`}>{parseInlineMarkdown(text)}</p>);
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`}>
          {currentList.map((item, idx) => (
            <li key={idx}>{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushQuote = () => {
    if (currentQuote.length > 0) {
      const text = currentQuote.join(' ').trim();
      if (text) {
        elements.push(
          <blockquote key={`quote-${elements.length}`} className={styles.blockquote}>
            {parseInlineMarkdown(text)}
          </blockquote>
        );
      }
      currentQuote = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeBlockLines.length > 0) {
      const codeContent = codeBlockLines.join('\n');
      elements.push(
        <pre key={`pre-${elements.length}`} className={styles.pre}>
          <code>{codeContent}</code>
        </pre>
      );
      codeBlockLines = [];
    }
    inCodeBlock = false;
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Code block
    if (trimmedLine.startsWith('```')) {
      flushParagraph();
      flushList();
      flushQuote();
      if (inCodeBlock) {
        flushCodeBlock();
      } else {
        // Le language du code block (après ```) n'est pas utilisé actuellement
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    // Horizontal rule
    if (trimmedLine === '---' || trimmedLine === '***') {
      flushParagraph();
      flushList();
      flushQuote();
      elements.push(<hr key={`hr-${elements.length}`} className={styles.hr} />);
      return;
    }

    // Heading
    // Décalage de +2 : # dans MD → h3 en HTML, ## → h4, ### → h5, etc.
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      const markdownLevel = headingMatch[1].length;
      const htmlLevel = Math.min(markdownLevel + 2, 6); // Limité à h6 maximum
      const text = headingMatch[2];
      // Utiliser le style CSS correspondant au niveau HTML (h3, h4, h5, h6)
      const headingClass = styles[`h${htmlLevel}` as keyof typeof styles] || '';
      const headingContent = parseInlineMarkdown(text);
      const headingKey = `h${htmlLevel}-${elements.length}`;
      const headingProps = { className: headingClass };
      
      // Créer le composant heading dynamiquement avec le niveau HTML
      if (htmlLevel === 3) {
        elements.push(<h3 key={headingKey} {...headingProps}>{headingContent}</h3>);
      } else if (htmlLevel === 4) {
        elements.push(<h4 key={headingKey} {...headingProps}>{headingContent}</h4>);
      } else if (htmlLevel === 5) {
        elements.push(<h5 key={headingKey} {...headingProps}>{headingContent}</h5>);
      } else if (htmlLevel === 6) {
        elements.push(<h6 key={headingKey} {...headingProps}>{headingContent}</h6>);
      }
      return;
    }

    // Quote
    if (trimmedLine.startsWith('> ')) {
      flushParagraph();
      flushList();
      const text = trimmedLine.replace(/^>\s*/, '');
      currentQuote.push(text);
      return;
    }

    // List item
    if (trimmedLine.match(/^[-*+]\s+/)) {
      flushParagraph();
      flushQuote();
      const text = trimmedLine.replace(/^[-*+]\s+/, '');
      currentList.push(text);
      return;
    }

    // Empty line
    if (!trimmedLine) {
      flushParagraph();
      flushList();
      flushQuote();
      return;
    }

    // Regular paragraph
    currentParagraph.push(trimmedLine);
  });

  // Flush remaining content
  flushParagraph();
  flushList();
  flushQuote();
  flushCodeBlock();

  return (
    <div className={styles.markdownContent}>
      {elements}
    </div>
  );
};

/**
 * Parse inline markdown (bold, italic, etc.)
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Pattern pour **bold**
  const boldPattern = /\*\*(.+?)\*\*/g;
  // Pattern pour *italic*
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

export default CourseMarkdownRenderer;
