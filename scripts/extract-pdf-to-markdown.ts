/**
 * Script pour extraire le texte des PDF et le convertir en Markdown
 * 
 * Ce script :
 * 1. Parcourt les fichiers PDF dans data/Ressources/
 * 2. Extrait le texte de chaque PDF
 * 3. Tente de détecter la structure (titres, listes, paragraphes)
 * 4. Convertit en Markdown avec une structure raisonnable
 * 5. Sauvegarde dans le même dossier avec l'extension .md
 */

import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';

interface PDFExtractionResult {
  filename: string;
  text: string;
  markdown: string;
}

/**
 * Détecte si une ligne est un titre basé sur sa longueur, position et format
 */
const isLikelyTitle = (line: string, previousLine: string, nextLine: string): boolean => {
  const trimmed = line.trim();
  
  // Lignes trop courtes ou trop longues ne sont probablement pas des titres
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }
  
  // Lignes en majuscules sont souvent des titres
  if (trimmed === trimmed.toUpperCase() && trimmed.length > 5 && trimmed.length < 50) {
    return true;
  }
  
  // Lignes suivies d'une ligne vide et précédées d'une ligne vide ou d'un autre titre
  const isFollowedByEmpty = !nextLine || nextLine.trim() === '';
  const isPrecededByEmpty = !previousLine || previousLine.trim() === '';
  
  if (isFollowedByEmpty && isPrecededByEmpty && trimmed.length < 80) {
    return true;
  }
  
  // Lignes qui commencent par des chiffres suivis d'un point (ex: "1. Titre")
  if (/^\d+\.\s+[A-Z]/.test(trimmed)) {
    return true;
  }
  
  // Lignes qui sont courtes et suivies d'une ligne vide
  if (trimmed.length < 60 && isFollowedByEmpty) {
    return true;
  }
  
  return false;
};

/**
 * Détecte si une ligne est le début d'une liste
 */
const isListItem = (line: string): boolean => {
  const trimmed = line.trim();
  
  // Puces classiques
  if (/^[-•*]\s+/.test(trimmed)) {
    return true;
  }
  
  // Numérotation
  if (/^\d+[\.\)]\s+/.test(trimmed)) {
    return true;
  }
  
  // Puces Unicode
  if (/^[▪▫▬]\s+/.test(trimmed)) {
    return true;
  }
  
  return false;
};

/**
 * Convertit le texte extrait d'un PDF en Markdown
 */
const convertToMarkdown = (text: string): string => {
  const lines = text.split('\n');
  const markdownLines: string[] = [];
  let inList = false;
  let previousLine = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
    
    // Ignorer les lignes vides multiples consécutives
    if (trimmed === '') {
      if (inList) {
        inList = false;
        markdownLines.push('');
      } else if (markdownLines[markdownLines.length - 1] !== '') {
        markdownLines.push('');
      }
      previousLine = line;
      continue;
    }
    
    // Détecter les titres
    if (isLikelyTitle(trimmed, previousLine, nextLine)) {
      if (inList) {
        inList = false;
        markdownLines.push('');
      }
      // Utiliser ## pour les titres principaux (on peut ajuster selon le contexte)
      markdownLines.push(`## ${trimmed}`);
      markdownLines.push('');
      previousLine = line;
      continue;
    }
    
    // Détecter les listes
    if (isListItem(trimmed)) {
      if (!inList) {
        inList = true;
      }
      // Normaliser les puces en `-`
      const listItem = trimmed.replace(/^[-•*▪▫▬]\s+/, '- ').replace(/^\d+[\.\)]\s+/, '- ');
      markdownLines.push(listItem);
      previousLine = line;
      continue;
    }
    
    // Paragraphe normal
    if (inList) {
      inList = false;
      markdownLines.push('');
    }
    
    // Nettoyer la ligne (supprimer les espaces multiples)
    const cleanedLine = trimmed.replace(/\s+/g, ' ');
    if (cleanedLine) {
      markdownLines.push(cleanedLine);
    }
    
    previousLine = line;
  }
  
  return markdownLines.join('\n');
};

/**
 * Extrait le texte d'un fichier PDF
 */
const extractPDFText = async (filePath: string): Promise<string> => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error(`Erreur lors de l'extraction du PDF ${filePath}: ${error}`);
  }
};

/**
 * Traite un fichier PDF et génère le Markdown correspondant
 */
const processPDFFile = async (filePath: string): Promise<PDFExtractionResult | null> => {
  const filename = path.basename(filePath);
  const filenameWithoutExt = path.basename(filePath, '.pdf');
  const dir = path.dirname(filePath);
  const outputPath = path.join(dir, `${filenameWithoutExt}.md`);
  
  // Vérifier si le fichier Markdown existe déjà
  if (fs.existsSync(outputPath)) {
    console.log(`⚠️  Fichier Markdown existe déjà : ${outputPath}`);
    console.log(`   Pour le régénérer, supprimez-le d'abord.`);
    return null;
  }
  
  console.log(`📄 Traitement de : ${filename}`);
  
  try {
    // Extraire le texte du PDF
    const text = await extractPDFText(filePath);
    
    if (!text || text.trim().length === 0) {
      console.log(`   ⚠️  Aucun texte extrait du PDF`);
      return null;
    }
    
    // Convertir en Markdown
    const markdown = convertToMarkdown(text);
    
    // Ajouter un en-tête avec le nom du fichier source
    const header = `# ${filenameWithoutExt}\n\n> **Source** : ${filename}\n> **Date d'extraction** : ${new Date().toISOString().split('T')[0]}\n\n---\n\n`;
    const finalMarkdown = header + markdown;
    
    // Sauvegarder
    fs.writeFileSync(outputPath, finalMarkdown, 'utf-8');
    console.log(`   ✅ Markdown généré : ${path.basename(outputPath)}`);
    
    return {
      filename,
      text,
      markdown: finalMarkdown,
    };
  } catch (error) {
    console.error(`   ❌ Erreur : ${error}`);
    return null;
  }
};

/**
 * Parcourt récursivement un dossier pour trouver tous les fichiers PDF
 */
const findPDFFiles = (dir: string): string[] => {
  const pdfFiles: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return pdfFiles;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Parcourir récursivement les sous-dossiers
      pdfFiles.push(...findPDFFiles(fullPath));
    } else if (item.toLowerCase().endsWith('.pdf')) {
      pdfFiles.push(fullPath);
    }
  }
  
  return pdfFiles;
};

/**
 * Fonction principale
 */
const main = async () => {
  const resourcesDir = path.join(process.cwd(), 'data', 'Ressources');
  
  if (!fs.existsSync(resourcesDir)) {
    console.error(`❌ Le dossier ${resourcesDir} n'existe pas`);
    process.exit(1);
  }
  
  console.log(`🔍 Recherche de fichiers PDF dans : ${resourcesDir}\n`);
  
  // Trouver tous les fichiers PDF
  const pdfFiles = findPDFFiles(resourcesDir);
  
  if (pdfFiles.length === 0) {
    console.log('❌ Aucun fichier PDF trouvé');
    process.exit(0);
  }
  
  console.log(`📚 ${pdfFiles.length} fichier(s) PDF trouvé(s)\n`);
  
  // Traiter chaque fichier PDF
  const results: PDFExtractionResult[] = [];
  
  for (const pdfFile of pdfFiles) {
    const result = await processPDFFile(pdfFile);
    if (result) {
      results.push(result);
    }
  }
  
  // Résumé
  console.log(`\n📊 Résumé :`);
  console.log(`   - Fichiers PDF traités : ${results.length}/${pdfFiles.length}`);
  console.log(`   - Fichiers Markdown générés : ${results.length}`);
  
  if (results.length > 0) {
    console.log(`\n✅ Extraction terminée avec succès !`);
    console.log(`\n💡 Note : La structure Markdown générée est une approximation.`);
    console.log(`   Vous pouvez améliorer manuellement les fichiers .md générés si nécessaire.`);
  }
};

// Exécuter le script
main().catch((error) => {
  console.error('❌ Erreur fatale :', error);
  process.exit(1);
});
