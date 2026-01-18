/**
 * Backend pur : Logique métier pour lire les fichiers journaux et cours
 * Cette logique est réutilisable et testable en ligne de commande
 *
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 */

import fs from 'fs';
import path from 'path';
import { adjustMarkdownTitleLevels } from './markdownTitleAdjuster';

/**
 * Interface pour un fichier journal
 */
export interface JournalFile {
  filename: string;
  date: string; // Format YYYY-MM-DD extrait du nom de fichier
  title: string; // Première ligne du fichier (titre)
  content: string; // Contenu complet du fichier
}

/**
 * Interface pour un fichier cours
 */
export interface CourseFile {
  filename: string;
  title: string; // Première ligne du fichier (titre # ...)
  content: string; // Contenu complet du fichier
}

/**
 * Lit tous les fichiers journaux du dossier JOURNAL_DE_BORD
 * Exclut README.md et le dossier COURS
 */
export const readJournalFiles = (): JournalFile[] => {
  const journalDir = path.join(process.cwd(), 'JOURNAL_DE_BORD');
  
  if (!fs.existsSync(journalDir)) {
    return [];
  }

  const files = fs.readdirSync(journalDir);
  const journalFiles: JournalFile[] = [];

  for (const file of files) {
    // Ignorer README.md et les dossiers
    if (file === 'README.md' || file === 'COURS') {
      continue;
    }

    // Ne prendre que les fichiers .md avec format YYYY-MM-DD.md
    const datePattern = /^(\d{4}-\d{2}-\d{2})\.md$/;
    const match = file.match(datePattern);
    
    if (match) {
      const filePath = path.join(journalDir, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Ajuster les niveaux de titres (ajouter un # devant chaque titre)
      content = adjustMarkdownTitleLevels(content);
      
      // Extraire le titre (première ligne non vide qui n'est pas un commentaire)
      const lines = content.split('\n');
      let title = file.replace('.md', ''); // Par défaut, utiliser le nom du fichier
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#') && !trimmedLine.startsWith('>')) {
          title = trimmedLine.substring(0, 100); // Limiter à 100 caractères
          break;
        }
      }

      journalFiles.push({
        filename: file,
        date: match[1], // YYYY-MM-DD
        title,
        content,
      });
    }
  }

  // Trier par nom de fichier alphabétique (date en format YYYY-MM-DD)
  return journalFiles.sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * Lit tous les fichiers cours du dossier JOURNAL_DE_BORD/COURS
 */
export const readCourseFiles = (): CourseFile[] => {
  const coursesDir = path.join(process.cwd(), 'JOURNAL_DE_BORD', 'COURS');
  
  if (!fs.existsSync(coursesDir)) {
    return [];
  }

  const files = fs.readdirSync(coursesDir);
  const courseFiles: CourseFile[] = [];

  for (const file of files) {
    // Ne prendre que les fichiers .md
    if (!file.endsWith('.md')) {
      continue;
    }

    const filePath = path.join(coursesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Les fichiers cours doivent commencer par ### (H3) dans le source
    // On ajuste les niveaux pour que ### devienne #### (H4) après ajustement
    // Mais le premier titre ### reste ### pour l'extraction, puis devient #### pour le rendu
    content = adjustMarkdownTitleLevels(content);
    
    // Extraire le titre (première ligne ### ... dans le source, devient #### après ajustement)
    const lines = content.split('\n');
    let title = file.replace('.md', ''); // Par défaut, utiliser le nom du fichier
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      // Après ajustement, ### devient ####
      if (trimmedLine.startsWith('#### ')) {
        title = trimmedLine.replace('#### ', '');
        break;
      }
      // Fallback pour les fichiers qui n'ont pas été ajustés
      if (trimmedLine.startsWith('### ')) {
        title = trimmedLine.replace('### ', '');
        break;
      }
    }

    courseFiles.push({
      filename: file,
      title,
      content,
    });
  }

  // Trier par nom de fichier alphabétique (sans extension)
  return courseFiles.sort((a, b) => {
    // Comparer les noms de fichiers sans extension
    const nameA = a.filename.replace('.md', '').toLowerCase();
    const nameB = b.filename.replace('.md', '').toLowerCase();
    return nameA.localeCompare(nameB);
  });
};
