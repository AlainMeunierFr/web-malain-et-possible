/**
 * Script de refactoring : Supprimer le champ "titre" et ne garder que "description"
 * - Extraire les périodes du texte pour alimenter le champ "periode"
 * - Conserver la syntaxe MD (gras avec **) dans "description"
 */

import fs from 'fs';
import path from 'path';

interface AutreElement {
  id: string;
  type: string;
  titre: string;
  description: string;
  periode: string | null;
}

interface AutresData {
  autres: Record<string, AutreElement>;
}

/**
 * Extrait une période du texte (format: (année), (année-année), (mois-année), etc.)
 */
function extractPeriode(text: string): { periode: string | null; textWithoutPeriode: string } {
  let periode: string | null = null;
  let textWithoutPeriode = text;

  // Pattern 1: (1995) ou (2022-2023) - peut être dans le texte ou à la fin
  const pattern1 = /\((\d{4}(?:-\d{4})?)\)/g;
  const match1 = text.match(pattern1);
  if (match1) {
    periode = match1[0].replace(/[()]/g, '');
    // Supprimer toutes les occurrences de la période entre parenthèses
    textWithoutPeriode = text.replace(/\(\d{4}(?:-\d{4})?\)/g, '').trim();
    // Nettoyer les séparateurs et espaces multiples
    textWithoutPeriode = textWithoutPeriode.replace(/\s*[-–:]\s*$/, '').trim();
    textWithoutPeriode = textWithoutPeriode.replace(/\s+/g, ' ').trim();
    return { periode, textWithoutPeriode };
  }

  // Pattern 2: (www.agepi.io, 2022-2023) - extraire seulement la période
  const pattern2Url = /\([^)]*,\s*(\d{4}(?:-\d{4})?)\)/gi;
  const match2Url = text.match(pattern2Url);
  if (match2Url) {
    periode = match2Url[0].match(/(\d{4}(?:-\d{4})?)/)?.[1] || null;
    if (periode) {
      // Supprimer toute la parenthèse avec l'URL et la période
      textWithoutPeriode = text.replace(/\([^)]*,\s*\d{4}(?:-\d{4})?\)/gi, '').trim();
      textWithoutPeriode = textWithoutPeriode.replace(/\s*[-–:]\s*$/, '').trim();
      textWithoutPeriode = textWithoutPeriode.replace(/\s+/g, ' ').trim();
      return { periode, textWithoutPeriode };
    }
  }

  // Pattern 2b: (février-juin 2022)
  const pattern2b = /\(([a-zéèêà]+-\s*[a-zéèêà]+\s+\d{4})\)/i;
  const match2b = text.match(pattern2b);
  if (match2b) {
    periode = match2b[1];
    textWithoutPeriode = text.replace(/\([a-zéèêà]+-\s*[a-zéèêà]+\s+\d{4}\)/gi, '').trim();
    textWithoutPeriode = textWithoutPeriode.replace(/\s*[-–:]\s*$/, '').trim();
    textWithoutPeriode = textWithoutPeriode.replace(/\s+/g, ' ').trim();
    return { periode, textWithoutPeriode };
  }

  // Pattern 3: [2022-2023]
  const pattern3 = /\[(\d{4}(?:-\d{4})?)\]/g;
  const match3 = text.match(pattern3);
  if (match3) {
    periode = match3[0].replace(/[\[\]]/g, '');
    textWithoutPeriode = text.replace(/\[\d{4}(?:-\d{4})?\]/g, '').trim();
    textWithoutPeriode = textWithoutPeriode.replace(/\s*[-–:]\s*$/, '').trim();
    textWithoutPeriode = textWithoutPeriode.replace(/\s+/g, ' ').trim();
    return { periode, textWithoutPeriode };
  }

  // Pattern 4: Depuis 1995
  const pattern4 = /Depuis\s+(\d{4})/gi;
  const match4 = text.match(pattern4);
  if (match4) {
    const yearMatch = text.match(/Depuis\s+(\d{4})/i);
    if (yearMatch) {
      periode = `Depuis ${yearMatch[1]}`;
      textWithoutPeriode = text.replace(pattern4, '').trim();
      textWithoutPeriode = textWithoutPeriode.replace(/\s*[-–:]\s*$/, '').trim();
      return { periode, textWithoutPeriode };
    }
  }

  // Pattern 5: 1995-2020 au début
  const pattern5 = /^(\d{4}(?:-\d{4})?)\s*[-–]/;
  const match5 = text.match(pattern5);
  if (match5) {
    periode = match5[1];
    textWithoutPeriode = text.replace(pattern5, '').trim();
    return { periode, textWithoutPeriode };
  }

  return { periode, textWithoutPeriode };
}

/**
 * Fusionne titre et description en une seule description avec syntaxe MD
 */
function mergeTitreDescription(titre: string, description: string): string {
  const titreTrim = titre.trim();
  const descriptionTrim = description.trim();
  
  // Si titre et description sont identiques, retourner seulement le titre
  if (titreTrim === descriptionTrim) {
    return titreTrim;
  }
  
  // Si la description commence par le titre, retourner seulement la description
  if (descriptionTrim.startsWith(titreTrim)) {
    return descriptionTrim;
  }
  
  // Sinon, fusionner : **titre** - description
  // Mais seulement si le titre n'est pas déjà en gras dans la description
  if (descriptionTrim.includes(`**${titreTrim}**`)) {
    return descriptionTrim;
  }
  
  return `**${titreTrim}** - ${descriptionTrim}`;
}

function refactorExperiences() {
  const filePath = path.join(process.cwd(), 'data', 'bibliotheque', 'experience-et-autres-informations.json');
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier n'existe pas : ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data: AutresData = JSON.parse(fileContent);

  const refactored: Record<string, Omit<AutreElement, 'titre'>> = {};

  for (const [id, element] of Object.entries(data.autres)) {
    // Si l'élément a encore un champ "titre", le fusionner avec description
    const elementAny = element as any;
    let description = element.description;
    
    if (elementAny.titre) {
      // Fusionner titre et description
      description = mergeTitreDescription(elementAny.titre, element.description);
    }
    
    // Extraire la période de la description
    const { periode: extractedPeriode, textWithoutPeriode } = extractPeriode(description);
    
    // Utiliser la période extraite si elle existe, sinon garder celle du JSON
    const periode = extractedPeriode || element.periode;
    
    // Créer le nouvel élément sans "titre"
    refactored[id] = {
      id: element.id,
      type: element.type,
      description: textWithoutPeriode,
      periode: periode,
    };
  }

  // Sauvegarder le fichier refactorisé
  const outputPath = path.join(process.cwd(), 'data', 'bibliotheque', 'experience-et-autres-informations.json');
  const output = {
    autres: refactored,
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  
  console.log(`✅ Refactoring terminé : ${Object.keys(refactored).length} expériences transformées`);
  console.log(`📝 Fichier sauvegardé : ${outputPath}`);
}

// Exécuter le script
try {
  refactorExperiences();
} catch (error) {
  console.error('❌ Erreur lors du refactoring:', error);
  process.exit(1);
}
