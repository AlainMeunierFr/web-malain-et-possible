/**
 * Backend pur : Parser de markdown pour les journaux
 * Cette logique est réutilisable et testable en ligne de commande
 *
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 */

/**
 * Interface pour un prompt dans un journal
 */
export interface JournalPrompt {
  title: string;
  text: string;
  technicalResult: string;
}

/**
 * Interface pour une section dans un journal
 */
export interface JournalSection {
  title: string;
  content: string; // Contenu libre (texte, listes, etc.) qui n'est pas dans un prompt
  prompts: JournalPrompt[];
}

/**
 * Interface pour le résultat du parsing d'un journal
 */
export interface ParsedJournal {
  sections: JournalSection[];
}

/**
 * Parse un fichier markdown de journal et retourne une structure de données
 * 
 * Format attendu (après ajustement des niveaux dans journalReader) :
 * ### Section (H3, était H2 dans le fichier source)
 * #### Titre de prompt (H4, était H3 dans le fichier source)
 * ###### Prompt (H6, était H5 dans le fichier source)
 * Texte du prompt
 * ###### Résultat technique (H6, était H5 dans le fichier source)
 * Texte du résultat technique
 * 
 * ATTENTION : Les titres H5 "##### Prompt" et "##### Résultat technique" 
 * deviennent H6 "###### Prompt" et "###### Résultat technique" après ajustement !
 */
export const parseJournalMarkdown = (markdown: string): ParsedJournal => {
  const lines = markdown.split('\n');
  const sections: JournalSection[] = [];
  let currentSection: JournalSection | null = null;
  let currentPrompt: JournalPrompt | null = null;
  
  type ParserState = 'section' | 'prompt-title' | 'prompt-text' | 'technical-result';
  let currentState: ParserState = 'section';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Section H3 (était H2 dans le fichier source, mais ajusté par journalReader)
    // Après ajustement : ## devient ###
    if (trimmedLine.startsWith('### ') && !trimmedLine.startsWith('#### ')) {
      // Flush le prompt en cours s'il existe
      if (currentPrompt) {
        if (currentSection) {
          currentSection.prompts.push(currentPrompt);
        }
        currentPrompt = null;
      }
      
      // Créer une nouvelle section
      // Le contenu libre de la section précédente est déjà conservé dans currentSection.content
      const sectionTitle = trimmedLine.replace('### ', '');
      currentSection = {
        title: sectionTitle,
        content: '', // Contenu libre initialement vide
        prompts: [],
      };
      sections.push(currentSection);
      currentState = 'section';
      continue;
    }
    
    // Titre de prompt H4 (était H3 dans le fichier source, mais ajusté par journalReader)
    if (trimmedLine.startsWith('#### ')) {
      // Flush le prompt en cours s'il existe
      if (currentPrompt) {
        if (currentSection) {
          currentSection.prompts.push(currentPrompt);
        }
      }
      
      // Créer un nouveau prompt
      const promptTitle = trimmedLine.replace('#### ', '');
      currentPrompt = {
        title: promptTitle,
        text: '',
        technicalResult: '',
      };
      currentState = 'prompt-title';
      continue;
    }
    
    // Début du texte du prompt H6 (était H5 dans le fichier source, mais ajusté par journalReader)
    if (trimmedLine === '###### Prompt') {
      // Si on n'a pas de prompt en cours, en créer un (cas où il n'y a pas de titre H4)
      if (!currentPrompt) {
        if (currentSection) {
          currentPrompt = {
            title: '', // Pas de titre
            text: '',
            technicalResult: '',
          };
        }
      }
      currentState = 'prompt-text';
      continue;
    }
    
    // Début du résultat technique H6 (était H5 dans le fichier source, mais ajusté par journalReader)
    if (trimmedLine === '###### Résultat technique') {
      // Si on n'a pas de prompt en cours, en créer un (cas où il n'y a pas de titre H4 ni de prompt)
      if (!currentPrompt) {
        if (currentSection) {
          currentPrompt = {
            title: '', // Pas de titre
            text: '',
            technicalResult: '',
          };
        }
      }
      currentState = 'technical-result';
      continue;
    }
    
    // Collecter le contenu libre de la section (si on est dans l'état 'section' et qu'il n'y a pas de prompt en cours)
    if (currentSection && currentState === 'section' && !currentPrompt) {
      // Ne pas collecter si c'est un titre qui indique le début d'un prompt ou d'une nouvelle section
      if (!trimmedLine.startsWith('#### ') && !trimmedLine.startsWith('### ') && !trimmedLine.startsWith('## ') && !trimmedLine.startsWith('# ')) {
        // Ne pas collecter si c'est un marqueur de prompt/résultat technique
        if (trimmedLine !== '###### Prompt' && trimmedLine !== '###### Résultat technique') {
          // Collecter le contenu libre
          if (currentSection.content) {
            currentSection.content += '\n' + line;
          } else {
            currentSection.content = line;
          }
        }
      }
      continue;
    }
    
    // Collecter le contenu selon l'état
    // IMPORTANT : Ne collecter que si on est dans un état de collecte ET que la ligne n'est pas un titre
    if (currentPrompt && (currentState === 'prompt-text' || currentState === 'technical-result')) {
      // Ne pas collecter si c'est un titre (qui termine la collecte)
      // Vérifier dans l'ordre du plus long au plus court pour éviter les faux positifs
      // ATTENTION : Après ajustement, H6 devient H7 (mais H7 n'existe pas), donc on vérifie jusqu'à H6
      if (trimmedLine.startsWith('###### ') || trimmedLine.startsWith('##### ') || trimmedLine.startsWith('#### ') || trimmedLine.startsWith('### ') || trimmedLine.startsWith('## ') || trimmedLine.startsWith('# ')) {
        // C'est un titre, on arrête la collecte
        // Flush le prompt en cours si on rencontre un nouveau titre
        if (currentState === 'prompt-text' || currentState === 'technical-result') {
          if (currentSection) {
            currentSection.prompts.push(currentPrompt);
          }
          currentPrompt = null;
        }
        currentState = 'section';
        // Ne pas traiter cette ligne ici, elle sera traitée au prochain tour
        continue;
      }
      
      // Collecter la ligne (y compris les lignes vides)
      if (currentState === 'prompt-text') {
        if (currentPrompt.text) {
          currentPrompt.text += '\n' + line;
        } else {
          currentPrompt.text = line;
        }
      } else if (currentState === 'technical-result') {
        if (currentPrompt.technicalResult) {
          currentPrompt.technicalResult += '\n' + line;
        } else {
          currentPrompt.technicalResult = line;
        }
      }
      continue; // Important : ne pas traiter cette ligne comme autre chose
    }
  }
  
  // Flush le dernier prompt s'il existe
  if (currentPrompt && currentSection) {
    currentSection.prompts.push(currentPrompt);
  }
  
  return { sections };
};
