/**
 * Backend pur : Parser de markdown pour les journaux
 * Cette logique est réutilisable et testable en ligne de commande
 *
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 * 
 * Structure unifiée : Utilise la même structure que aboutSiteReader.ts
 */

import type { Partie, SousPartie, Bloc, ContenuElement } from './aboutSiteReader';
import { parseMarkdownContent } from './aboutSiteReader';

/**
 * Interface pour le résultat du parsing d'un journal
 * Structure unifiée : même hiérarchie que AboutSiteStructure
 */
export interface ParsedJournal {
  parties: Partie[]; // Les "sections" des journaux deviennent des "parties" (h3)
}

/**
 * Parse un fichier markdown de journal et retourne une structure de données unifiée
 * 
 * Format attendu (après ajustement des niveaux dans journalReader) :
 * #### Partie (H4, était H3 dans le fichier source)
 * ##### Sous-partie (H5, était H4 dans le fichier source)
 * ###### Prompt (H6, était H5 dans le fichier source)
 * Texte du prompt
 * ###### Résultat technique (H6, était H5 dans le fichier source)
 * Texte du résultat technique
 * 
 * Structure unifiée : même hiérarchie que aboutSiteReader.ts
 * - Partie (h3) : correspond à "#### " (H4 après ajustement)
 * - Sous-partie (h4) : correspond à "##### " (H5 après ajustement)
 * - Bloc (h5) : correspond à "###### Prompt" ou "###### Résultat technique" (H6 après ajustement)
 */
export const parseJournalMarkdown = (markdown: string): ParsedJournal => {
  // Normaliser les retours à la ligne Windows (\r\n) en Unix (\n)
  const lines = markdown.split(/\r?\n/);
  const parties: Partie[] = [];
  let partieCourante: Partie | null = null;
  let sousPartieCourante: SousPartie | null = null;
  let blocCourant: Bloc | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const ligne = lines[i];
    const trimmedLine = ligne.trim();
    
    // Partie H1 (avec décalage +2 : # dans MD → h3 en HTML)
    if (trimmedLine.startsWith('# ') && !trimmedLine.startsWith('## ')) {
      // Finaliser le bloc courant si il existe
      if (blocCourant) {
        blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
        if (sousPartieCourante) {
          sousPartieCourante.blocs.push(blocCourant);
        }
        blocCourant = null;
      }
      // Finaliser la sous-partie courante si elle existe
      if (sousPartieCourante) {
        // Parser le contenu de la sous-partie si pas de blocs
        if (sousPartieCourante.blocs.length === 0) {
          sousPartieCourante.contenuParse = parseMarkdownContent(sousPartieCourante.contenu.trim());
        }
        if (partieCourante) {
          partieCourante.sousParties.push(sousPartieCourante);
        }
        sousPartieCourante = null;
      }
      // Finaliser la partie précédente si elle existe
      if (partieCourante) {
        partieCourante.contenuParse = parseMarkdownContent(partieCourante.contenu.trim());
        parties.push(partieCourante);
      }
      
      // Créer une nouvelle partie
      const titre = trimmedLine.substring(2).trim(); // Enlever "# "
      partieCourante = {
        titre,
        contenu: '',
        contenuParse: [],
        sousParties: []
      };
      sousPartieCourante = null;
      blocCourant = null;
      continue;
    }
    
    // Sous-partie H2 (avec décalage +2 : ## dans MD → h4 en HTML)
    if (trimmedLine.startsWith('## ') && !trimmedLine.startsWith('### ')) {
      if (partieCourante) {
        // Finaliser le bloc courant si il existe
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          if (sousPartieCourante) {
            sousPartieCourante.blocs.push(blocCourant);
          }
          blocCourant = null;
        }
        // Finaliser la sous-partie précédente si elle existe
        if (sousPartieCourante) {
          // Parser le contenu de la sous-partie si pas de blocs
          if (sousPartieCourante.blocs.length === 0) {
            sousPartieCourante.contenuParse = parseMarkdownContent(sousPartieCourante.contenu.trim());
          }
          partieCourante.sousParties.push(sousPartieCourante);
        }
        
        // Créer une nouvelle sous-partie
        const titre = trimmedLine.substring(3).trim(); // Enlever "## "
        sousPartieCourante = {
          titre,
          contenu: '',
          contenuParse: [],
          typeDeContenu: undefined, // Pas de typeDeContenu au niveau sous-partie pour les journaux
          blocs: []
        };
        blocCourant = null;
      }
      continue;
    }
    
    // Début d'un bloc H3 (avec décalage +2 : ### dans MD → h5 en HTML)
    // "### Prompt" ou "### Résultat technique"
    if (trimmedLine === '### Prompt' || trimmedLine === '### Résultat technique') {
      if (sousPartieCourante) {
        // Finaliser le bloc précédent si il existe
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          sousPartieCourante.blocs.push(blocCourant);
        }
        
        // Créer un nouveau bloc
        const typeDeContenu = trimmedLine === '### Prompt' ? 'Prompt' : 'Résultat technique';
        blocCourant = {
          titre: typeDeContenu,
          contenu: '',
          contenuParse: [],
          typeDeContenu
        };
      }
      continue;
    }
    
    // Contenu normal
    if (partieCourante) {
      if (blocCourant) {
        // Ajouter au contenu du bloc courant
        blocCourant.contenu += ligne + '\n';
      } else if (sousPartieCourante) {
        // Ajouter au contenu de la sous-partie courante
        sousPartieCourante.contenu += ligne + '\n';
      } else {
        // Ajouter au contenu de la partie courante
        partieCourante.contenu += ligne + '\n';
      }
    }
  }
  
  // Finaliser la dernière partie, sous-partie et bloc
  if (partieCourante) {
    if (blocCourant) {
      blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
      if (sousPartieCourante) {
        sousPartieCourante.blocs.push(blocCourant);
      }
    }
    if (sousPartieCourante) {
      // Parser le contenu de la sous-partie si pas de blocs
      if (sousPartieCourante.blocs.length === 0) {
        sousPartieCourante.contenuParse = parseMarkdownContent(sousPartieCourante.contenu.trim());
      }
      partieCourante.sousParties.push(sousPartieCourante);
    }
    partieCourante.contenuParse = parseMarkdownContent(partieCourante.contenu.trim());
    parties.push(partieCourante);
  }
  
  return { parties };
};
