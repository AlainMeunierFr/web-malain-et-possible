import React from 'react';
import styles from './MarkdownRenderer.module.css';
import CourseMarkdownRenderer from './CourseMarkdownRenderer';
import AboutSiteContentRenderer from './AboutSiteContentRenderer';
import { parseJournalMarkdown, type ParsedJournal } from '../utils/journalMarkdownParser';

export interface MarkdownRendererProps {
  content: string;
}

/**
 * Composant pour afficher du markdown formaté
 * Utilise la structure unifiée : même hiérarchie que aboutSiteReader.ts
 * Partie (h3) → Sous-partie (h4) → Bloc (h5)
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parser le markdown pour extraire la structure unifiée
  const parsed: ParsedJournal = parseJournalMarkdown(content);
  const elements: React.ReactNode[] = [];

  parsed.parties.forEach((partie, partieIndex) => {
    // Titre de partie H3
    elements.push(
      <h3 key={`partie-${partieIndex}`} className={styles.h3}>
        {partie.titre}
      </h3>
    );

    // Afficher le contenu libre de la partie (s'il existe)
    if (partie.contenuParse && partie.contenuParse.length > 0) {
      elements.push(
        <AboutSiteContentRenderer 
          key={`partie-content-${partieIndex}`} 
          elements={partie.contenuParse}
        />
      );
    }

    // Afficher les sous-parties
    partie.sousParties.forEach((sousPartie, sousPartieIndex) => {
      // Titre de sous-partie H4 (toujours affiché, même si typeDeContenu existe)
      elements.push(
        <h4 key={`sous-partie-${partieIndex}-${sousPartieIndex}`} className={styles.h4}>
          {sousPartie.titre}
        </h4>
      );

      // Afficher le contenu libre de la sous-partie (s'il existe et pas de blocs)
      if (sousPartie.contenuParse && sousPartie.contenuParse.length > 0) {
        elements.push(
          <AboutSiteContentRenderer 
            key={`sous-partie-content-${partieIndex}-${sousPartieIndex}`}
            elements={sousPartie.contenuParse}
          />
        );
      }

      // Afficher les blocs
      sousPartie.blocs.forEach((bloc, blocIndex) => {
        // Masquer le titre si typeDeContenu est "Prompt" ou "Résultat technique"
        const doitMasquerTitre = bloc.typeDeContenu === 'Prompt' || bloc.typeDeContenu === 'Résultat technique';
        
        if (!doitMasquerTitre) {
          elements.push(
            <h5 key={`bloc-title-${partieIndex}-${sousPartieIndex}-${blocIndex}`} className={styles.h5}>
              {bloc.titre}
            </h5>
          );
        }

        // Afficher le contenu du bloc avec le typeDeContenu pour le style
        if (bloc.contenuParse && bloc.contenuParse.length > 0) {
          elements.push(
            <AboutSiteContentRenderer 
              key={`bloc-content-${partieIndex}-${sousPartieIndex}-${blocIndex}`}
              elements={bloc.contenuParse}
              typeDeContenu={bloc.typeDeContenu}
            />
          );
        }
      });
    });
  });

  return (
    <div className={styles.markdownContent}>
      {elements}
    </div>
  );
};

export default MarkdownRenderer;
