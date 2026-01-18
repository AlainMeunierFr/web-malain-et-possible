/**
 * Backend pur : Formate les fichiers markdown des journaux
 * Cette logique est réutilisable et testable en ligne de commande
 *
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 */

import fs from 'fs';
import path from 'path';

/**
 * Formate un fichier markdown journal pour ajouter les titres H5 manquants
 * - Ajoute "##### Prompt" avant chaque prompt (ligne suivant un H4)
 * - Remplace "**Résultat technique**" par "##### Résultat technique"
 */
export const formatJournalMarkdown = (content: string): string => {
  const lines = content.split('\n');
  const formattedLines: string[] = [];
  let previousLineWasH4 = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Si la ligne précédente était un H4 et que la ligne actuelle n'est pas vide ni un titre
    if (previousLineWasH4 && trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.includes('**Résultat technique**')) {
      // Ajouter "##### Prompt" avant le contenu du prompt
      formattedLines.push('##### Prompt');
    }

    // Remplacer "**Résultat technique**" par "##### Résultat technique"
    if (trimmedLine.includes('**Résultat technique**')) {
      // Remplacer toute la ligne si elle ne contient que le résultat technique
      if (trimmedLine.startsWith('**Résultat technique**')) {
        const after = trimmedLine.replace(/\*\*Résultat technique\*\*\s*:?\s*/, '').trim();
        formattedLines.push('##### Résultat technique');
        if (after) {
          formattedLines.push(after);
        }
      } else {
        // La ligne contient autre chose, remplacer juste le texte
        const replaced = line.replace(/\*\*Résultat technique\*\*\s*:?\s*/, '##### Résultat technique\n');
        formattedLines.push(replaced);
      }
    } else {
      formattedLines.push(line);
    }

    // Vérifier si la ligne actuelle est un H4 (prompt après ajustement)
    previousLineWasH4 = trimmedLine.startsWith('#### ') && !trimmedLine.includes('Résultat technique');
  }

  return formattedLines.join('\n');
};

/**
 * Formate tous les fichiers markdown dans un dossier
 */
export const formatAllJournalFiles = (journalDir: string): void => {
  const files = fs.readdirSync(journalDir);

  for (const file of files) {
    if (file === 'README.md' || file === 'COURS') {
      continue;
    }

    if (file.endsWith('.md')) {
      const filePath = path.join(journalDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const formatted = formatJournalMarkdown(content);
      fs.writeFileSync(filePath, formatted, 'utf-8');
      console.log(`Formatted: ${file}`);
    }
  }
};
