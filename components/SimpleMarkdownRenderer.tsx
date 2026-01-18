import React from 'react';
import styles from './SimpleMarkdownRenderer.module.css';

export interface SimpleMarkdownRendererProps {
  content: string;
}

/**
 * Renderer markdown simple qui ne gère que les paragraphes et listes
 * Utilisé dans Prompt et TechnicalResult pour éviter la récursion infinie
 */
const SimpleMarkdownRenderer: React.FC<SimpleMarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let currentParagraph: string[] = [];
  
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`}>
          {currentList.map((item, idx) => (
            <li key={idx}>{item}</li>
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
          <p key={`p-${elements.length}`}>{text}</p>
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
    <div className={styles.simpleMarkdownContent}>
      {elements}
    </div>
  );
};

export default SimpleMarkdownRenderer;
