import React from 'react';
import styles from './MarkdownRenderer.module.css';
import TechnicalResult from './TechnicalResult';
import Prompt from './Prompt';
import CourseMarkdownRenderer from './CourseMarkdownRenderer';
import { parseJournalMarkdown, type ParsedJournal } from '../utils/journalMarkdownParser';

export interface MarkdownRendererProps {
  content: string;
}

/**
 * Composant pour afficher du markdown formaté
 * Utilise le parser journalMarkdownParser pour extraire la structure (sections, prompts, résultats techniques)
 * et affiche les éléments avec les composants appropriés
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parser le markdown pour extraire la structure
  const parsed: ParsedJournal = parseJournalMarkdown(content);
  const elements: React.ReactNode[] = [];

  parsed.sections.forEach((section, sectionIndex) => {
    // Titre de section H3 (après ajustement dans journalReader, était H2 dans le fichier source)
    elements.push(
      <h3 key={`section-${sectionIndex}`} className={styles.h3}>
        {section.title}
      </h3>
    );

    // Afficher le contenu libre de la section (s'il existe)
    if (section.content.trim()) {
      elements.push(
        <CourseMarkdownRenderer 
          key={`section-content-${sectionIndex}`} 
          content={section.content.trim()} 
        />
      );
    }

    // Afficher les prompts de cette section
    section.prompts.forEach((prompt, promptIndex) => {
      // Titre de prompt H4 (après ajustement dans journalReader) - seulement s'il existe
      if (prompt.title.trim()) {
        elements.push(
          <h4 key={`prompt-title-${sectionIndex}-${promptIndex}`} className={styles.h4}>
            {prompt.title}
          </h4>
        );
      }

      // Contenu du prompt (si présent)
      if (prompt.text.trim()) {
        elements.push(
          <Prompt
            key={`prompt-${sectionIndex}-${promptIndex}`}
            content={prompt.text.trim()}
          />
        );
      }

      // Résultat technique (si présent)
      if (prompt.technicalResult.trim()) {
        elements.push(
          <TechnicalResult
            key={`tech-result-${sectionIndex}-${promptIndex}`}
            content={prompt.technicalResult.trim()}
          />
        );
      }
    });
  });

  return (
    <div className={styles.markdownContent}>
      {elements}
    </div>
  );
};

export default MarkdownRenderer;
