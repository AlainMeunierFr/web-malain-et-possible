import React from 'react';
import { parseInlineMarkdown } from '../utils';

export interface SimpleMarkdownRendererProps {
  content: string;
}

/**
 * Renderer markdown simple : paragraphes, listes, **gras**, *italique*, [texte](url).
 * Utilisé dans Prompt, TechnicalResult et mode lecture.
 */
const SimpleMarkdownRenderer: React.FC<SimpleMarkdownRendererProps> = ({ content }) => {
  // Normaliser les retours à la ligne Windows (\r\n) en Unix (\n)
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let currentParagraph: string[] = [];
  
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`}>
          {currentList.map((item, idx) => (
            <li key={idx}>{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ');
      if (text.trim()) {
        elements.push(
          <p key={`p-${elements.length}`}>{parseInlineMarkdown(text)}</p>
        );
      }
      currentParagraph = [];
    }
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    
    // Liste à puces
    if (trimmedLine.startsWith('- ')) {
      flushParagraph();
      const text = trimmedLine.replace('- ', '');
      currentList.push(text);
      return;
    }
    
    // Paragraphe (ligne non vide)
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      flushList();
      currentParagraph.push(trimmedLine);
      return;
    }
    
    // Ligne vide
    if (!trimmedLine) {
      flushParagraph();
      flushList();
    }
  });

  // Finaliser le contenu restant
  flushParagraph();
  flushList();
  
  return (
    <div className="simpleMarkdownContent">
      {elements}
    </div>
  );
};

export default SimpleMarkdownRenderer;
