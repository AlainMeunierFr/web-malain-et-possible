/**
 * Backend pur : Formate les fichiers markdown des journaux
 * Cette logique est réutilisable et testable en ligne de commande
 *
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 * 
 * APPROCHE TDD : Code fait émerger progressivement du simple au complexe
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

    // ITÉRATION 2 : Si la ligne précédente était un H4 et que la ligne actuelle n'est pas vide ni un titre
    // ITÉRATION 5 : Gérer les lignes vides après un H4 (conserver previousLineWasH4)
    if (previousLineWasH4 && trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.includes('**Résultat technique**')) {
      // Ajouter "##### Prompt" avant le contenu du prompt
      formattedLines.push('##### Prompt');
      // Réinitialiser previousLineWasH4 après avoir ajouté le Prompt
      previousLineWasH4 = false;
    }

    // ITÉRATION 1 : Remplacer "**Résultat technique**" par "##### Résultat technique"
    if (trimmedLine.includes('**Résultat technique**')) {
      // ITÉRATION 4 : Remplacer toute la ligne si elle ne contient que le résultat technique
      if (trimmedLine.startsWith('**Résultat technique**')) {
        const after = trimmedLine.replace(/\*\*Résultat technique\*\*\s*:?\s*/, '').trim();
        formattedLines.push('##### Résultat technique');
        if (after) {
          formattedLines.push(after);
        }
      } else {
        // ITÉRATION 4 : La ligne contient autre chose, remplacer juste le texte
        const replaced = line.replace(/\*\*Résultat technique\*\*\s*:?\s*/, '##### Résultat technique\n');
        formattedLines.push(replaced);
      }
    } else {
      formattedLines.push(line);
    }

    // ITÉRATION 5 : Vérifier si la ligne actuelle est un H4 (prompt après ajustement)
    // ITÉRATION 5 : Conserver previousLineWasH4 même pour les lignes vides après un H4
    if (trimmedLine.startsWith('#### ') && !trimmedLine.includes('Résultat technique')) {
      previousLineWasH4 = true;
    } else if (!trimmedLine) {
      // Ligne vide : conserver previousLineWasH4
      // Ne rien changer
    } else {
      // Autre ligne : réinitialiser seulement si ce n'est pas déjà fait
      // (previousLineWasH4 sera réinitialisé lors de l'ajout du Prompt)
    }
  }

  return formattedLines.join('\n');
};

/**
 * Formate tous les fichiers markdown dans un dossier
 */
export const formatAllJournalFiles = (journalDir: string): void => {
  // ITÉRATION 1 : Code minimal pour formater un fichier
  const files = fs.readdirSync(journalDir);

  for (const file of files) {
    // ITÉRATION 2 : Ignorer README.md et COURS
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
