/**
 * Script pour transformer les fichiers markdown des journaux vers le nouveau format
 * 
 * Format cible :
 * ### Titre du prompt (H3, devient H4 après ajustement)
 * ##### Prompt (H5)
 * Le texte du prompt
 * ##### Résultat technique (H5)
 * Le résultat technique
 */

import fs from 'fs';
import path from 'path';

/**
 * Transforme un fichier markdown journal vers le nouveau format
 */
const formatJournalFile = (content: string): string => {
  const lines = content.split('\n');
  const formattedLines: string[] = [];
  let previousLineWasH3 = false;
  let inPromptSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Vérifier si la ligne est un H3 (titre de prompt dans le fichier source, avant ajustement)
    // Elle deviendra H4 après ajustement dans journalReader
    const isH3 = trimmedLine.startsWith('### ') && !trimmedLine.includes('Résultat technique') && !trimmedLine.includes('Prompt');

    // Si la ligne précédente était un H3 (titre du prompt dans le fichier source)
    // et que la ligne actuelle n'est pas vide, ni un titre, ni un résultat technique
    if (previousLineWasH3 && trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.includes('**Résultat technique**') && trimmedLine !== '##### Prompt') {
      // C'est le début du prompt, ajouter "##### Prompt" avant le contenu
      formattedLines.push('##### Prompt');
      inPromptSection = true;
    }

    // Remplacer "**Résultat technique**" par "##### Résultat technique"
    if (trimmedLine.includes('**Résultat technique**')) {
      // Si on est dans une section prompt, la terminer
      if (inPromptSection) {
        inPromptSection = false;
      }
      
      // Remplacer la ligne
      const after = trimmedLine.replace(/\*\*Résultat technique\*\*\s*:?\s*/, '').trim();
      formattedLines.push('##### Résultat technique');
      if (after) {
        formattedLines.push(after);
      }
      previousLineWasH3 = false;
      continue;
    }

    // Mettre à jour previousLineWasH3 pour l'itération suivante
    if (isH3) {
      // Si on était dans une section prompt, la terminer avant un nouveau titre
      if (inPromptSection) {
        inPromptSection = false;
      }
      previousLineWasH3 = true;
    } else {
      previousLineWasH3 = false;
    }

    formattedLines.push(line);
  }

  return formattedLines.join('\n');
};

/**
 * Formate tous les fichiers markdown dans le dossier JOURNAL_DE_BORD
 */
const formatAllJournals = () => {
  const journalDir = path.join(process.cwd(), 'JOURNAL_DE_BORD');
  
  if (!fs.existsSync(journalDir)) {
    console.error('Le dossier JOURNAL_DE_BORD n\'existe pas');
    return;
  }

  const files = fs.readdirSync(journalDir);

  for (const file of files) {
    // Ignorer README.md et les dossiers
    if (file === 'README.md' || file === 'COURS') {
      continue;
    }

    // Ne prendre que les fichiers .md avec format YYYY-MM-DD.md
    const datePattern = /^(\d{4}-\d{2}-\d{2})\.md$/;
    if (datePattern.test(file)) {
      const filePath = path.join(journalDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const formatted = formatJournalFile(content);
      fs.writeFileSync(filePath, formatted, 'utf-8');
      console.log(`✓ Formatted: ${file}`);
    }
  }

  console.log('\nTous les fichiers ont été formatés !');
};

// Exécuter le script
formatAllJournals();
