import React from 'react';
import { parseInlineMarkdown } from '../utils';

export interface CourseMarkdownRendererProps {
  content: string;
}

/**
 * Renderer markdown simple pour les cours
 * Affiche le markdown standard (titres, paragraphes, listes, gras, etc.)
 * sans parser les prompts/résultats techniques
 */
const CourseMarkdownRenderer: React.FC<CourseMarkdownRendererProps> = ({ content }) => {
  // Normaliser les retours à la ligne Windows (\r\n) en Unix (\n)
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  type ListItem = { text: string; children: string[] };
  let currentList: ListItem[] = [];
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
            <li key={idx}>
              {parseInlineMarkdown(item.text)}
              {item.children.length > 0 ? (
                <ul>
                  {item.children.map((sub, subIdx) => (
                    <li key={subIdx}>{parseInlineMarkdown(sub)}</li>
                  ))}
                </ul>
              ) : null}
            </li>
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
          <blockquote key={`quote-${elements.length}`} className="blockquote">
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
        <pre key={`pre-${elements.length}`} className="pre">
          <code>{codeContent}</code>
        </pre>
      );
      codeBlockLines = [];
    }
    inCodeBlock = false;
  };

  lines.forEach((line) => {
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
      elements.push(<hr key={`hr-${elements.length}`} className="hr" />);
      return;
    }

    // Heading
    // Décalage de +2 : # dans MD → h3 en HTML, ## → h4, ### → h5, etc.
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushQuote();
      const text = headingMatch[2];
      
      // Cas spécial : "En tant que", "Je souhaite", "Afin de" → pas de titre, texte avec mot-clé en gras
      const usKeywordMatch = text.match(/^(En tant que|Je souhaite|Je veux|Afin de)\s+(.*)$/i);
      if (usKeywordMatch) {
        const keyword = usKeywordMatch[1];
        const rest = usKeywordMatch[2];
        elements.push(
          <p key={`us-${elements.length}`} className="usKeyword">
            <strong>{keyword}</strong> {rest}
          </p>
        );
        return;
      }
      
      const markdownLevel = headingMatch[1].length;
      const htmlLevel = Math.min(markdownLevel + 2, 6); // Limité à h6 maximum
      // Utiliser le style CSS correspondant au niveau HTML (h3, h4, h5, h6)
      const headingContent = parseInlineMarkdown(text);
      const headingKey = `h${htmlLevel}-${elements.length}`;
      const headingProps = {};
      
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

    // List item (niveau 0 ou imbriqué : indentation = sous-liste)
    const listMatch = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (listMatch) {
      flushParagraph();
      flushQuote();
      const indent = listMatch[1].length;
      const text = listMatch[2].trim();
      if (indent === 0) {
        currentList.push({ text, children: [] });
      } else if (currentList.length > 0) {
        currentList[currentList.length - 1].children.push(text);
      } else {
        currentList.push({ text, children: [] });
      }
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
    <div className="markdownContent">
      {elements}
    </div>
  );
};

export default CourseMarkdownRenderer;
