/**
 * Script de migration des fichiers US vers format Markdown standard
 * US-12.8
 *
 * Convertit le format actuel (puces + gras) vers le format standard (headers H2)
 *
 * Usage:
 *   npx ts-node scripts/migrate-us-format.ts [--dry-run]
 */

import * as fs from 'fs';
import * as path from 'path';

export interface CritereAcceptation {
  id: string;
  titre: string;
  sousElements: string[];
}

export interface ParsedUserStory {
  enTantQue: string;
  jeSouhaite: string;
  afinDe: string;
}

export interface MigrationResult {
  filePath: string;
  success: boolean;
  converted: boolean;
  originalContent?: string;
  newContent?: string;
  error?: string;
  skippedReason?: 'already-standard-format' | 'not-us-file' | 'parse-error';
}

export interface MigrationReport {
  totalFiles: number;
  convertedFiles: number;
  skippedFiles: number;
  errorFiles: number;
  errors: string[];
  convertedList: string[];
}

/**
 * Détecte si un nom de fichier correspond au pattern US-X.Y
 */
export function detectUsPattern(filename: string): boolean {
  // Pattern: US-X.Y - Titre.md (avec potentiellement des statuts comme ✅ COMPLÉTÉ)
  const pattern = /^US-\d+\.\d+\s*-\s*.+\.md$/;
  return pattern.test(filename);
}

/**
 * Parse les sections "En tant que", "Je souhaite", "Afin de" depuis le contenu
 * Gère aussi la variante "Je veux" comme équivalent de "Je souhaite"
 */
export function parseEnTantQueJeSouhaiteAfinDe(content: string): ParsedUserStory {
  // Format 1: - **En tant que** texte
  // Format 2: **En tant que** texte (sans tiret)
  // Variante: "Je veux" au lieu de "Je souhaite"
  
  const enTantQueMatch = content.match(/(?:^-\s*)?\*\*En tant que\*\*\s*(.+?)(?=(?:^-\s*)?\*\*Je (?:souhaite|veux)\*\*|$)/ms);
  const jeSouhaiteMatch = content.match(/(?:^-\s*)?\*\*Je (?:souhaite|veux)\*\*\s*(.+?)(?=(?:^-\s*)?\*\*Afin de\*\*|$)/ms);
  const afinDeMatch = content.match(/(?:^-\s*)?\*\*Afin de\*\*\s*(.+?)(?=(?:^-\s*)?\*\*Critères|---|\n\n\*\*CA|\n\n-\s*\*\*|$)/ms);

  return {
    enTantQue: enTantQueMatch ? enTantQueMatch[1].trim() : '',
    jeSouhaite: jeSouhaiteMatch ? jeSouhaiteMatch[1].trim() : '',
    afinDe: afinDeMatch ? afinDeMatch[1].trim() : '',
  };
}

/**
 * Types de lignes détectées
 */
export type LineType = 
  | 'titre-us'           // # US-X.Y : Titre
  | 'en-tant-que'        // - **En tant que** texte
  | 'je-souhaite'        // - **Je souhaite** texte ou - **Je veux** texte
  | 'afin-de'            // - **Afin de** texte
  | 'criteres-titre'     // - **Critères d'acceptation** :
  | 'ca-titre'           // - **Titre du CA** :
  | 'sous-element'       // (espace)- élément
  | 'element-simple'     // - élément (sans gras, niveau racine)
  | 'paragraphe'         // texte libre
  | 'vide';              // ligne vide

export interface ParsedLine {
  type: LineType;
  content: string;
  raw: string;
  extra?: string; // Contenu supplémentaire après le titre (pour ca-titre)
}

/**
 * Détecte le type d'une ligne individuellement (approche unitaire)
 */
export function detectLineType(line: string): ParsedLine {
  const raw = line;
  
  // Ligne vide
  if (line.trim() === '') {
    return { type: 'vide', content: '', raw };
  }
  
  // Titre US: # US-X.Y ou ## US-X.Y ou ### US-X.Y ou #### US-X.Y
  const titreUsMatch = line.match(/^#{1,4}\s+(US-\d+\.\d+.*)$/);
  if (titreUsMatch) {
    return { type: 'titre-us', content: titreUsMatch[1].trim(), raw };
  }
  
  // - **En tant que** texte
  const enTantQueMatch = line.match(/^-\s*\*\*En tant que\*\*\s*(.*)$/i);
  if (enTantQueMatch) {
    return { type: 'en-tant-que', content: enTantQueMatch[1].trim(), raw };
  }
  
  // **En tant que** texte (sans tiret)
  const enTantQueSansMatch = line.match(/^\*\*En tant que\*\*\s*(.*)$/i);
  if (enTantQueSansMatch) {
    return { type: 'en-tant-que', content: enTantQueSansMatch[1].trim(), raw };
  }
  
  // - **Je souhaite** texte ou - **Je veux** texte
  const jeSouhaiteMatch = line.match(/^-\s*\*\*Je (?:souhaite|veux)\*\*\s*(.*)$/i);
  if (jeSouhaiteMatch) {
    return { type: 'je-souhaite', content: jeSouhaiteMatch[1].trim(), raw };
  }
  
  // **Je souhaite** ou **Je veux** (sans tiret)
  const jeSouhaiteSansMatch = line.match(/^\*\*Je (?:souhaite|veux)\*\*\s*(.*)$/i);
  if (jeSouhaiteSansMatch) {
    return { type: 'je-souhaite', content: jeSouhaiteSansMatch[1].trim(), raw };
  }
  
  // - **Afin de** texte
  const afinDeMatch = line.match(/^-\s*\*\*Afin de?\*\*\s*(.*)$/i);
  if (afinDeMatch) {
    return { type: 'afin-de', content: afinDeMatch[1].trim(), raw };
  }
  
  // **Afin de** (sans tiret)
  const afinDeSansMatch = line.match(/^\*\*Afin de?\*\*\s*(.*)$/i);
  if (afinDeSansMatch) {
    return { type: 'afin-de', content: afinDeSansMatch[1].trim(), raw };
  }
  
  // - **Critères d'acceptation** :
  const criteresMatch = line.match(/^-?\s*\*\*Critères d'acceptation\*\*\s*:?/i);
  if (criteresMatch) {
    return { type: 'criteres-titre', content: '', raw };
  }
  
  // - **Titre du CA** : texte (titre en gras avec tiret, le reste fait partie du titre)
  const caTitreMatch = line.match(/^-\s*\*\*([^*]+)\*\*\s*:?\s*(.*)$/);
  if (caTitreMatch) {
    const titrePrincipal = caTitreMatch[1].trim();
    const reste = caTitreMatch[2]?.trim() || '';
    // Le titre complet inclut tout : "Titre : reste"
    const titreComplet = reste ? `${titrePrincipal} : ${reste}` : titrePrincipal;
    return { type: 'ca-titre', content: titreComplet, raw };
  }
  
  // Sous-élément indenté: (espaces)- texte
  const sousElementMatch = line.match(/^\s+-\s+(.+)$/);
  if (sousElementMatch) {
    return { type: 'sous-element', content: sousElementMatch[1].trim(), raw };
  }
  
  // Élément simple: - texte (sans gras, niveau racine)
  const elementSimpleMatch = line.match(/^-\s+(.+)$/);
  if (elementSimpleMatch) {
    return { type: 'element-simple', content: elementSimpleMatch[1].trim(), raw };
  }
  
  // Paragraphe (tout le reste)
  return { type: 'paragraphe', content: line.trim(), raw };
}

/**
 * Parse le contenu complet ligne par ligne
 */
export function parseContentLineByLine(content: string): ParsedLine[] {
  const lines = content.split(/\r?\n/);
  return lines.map(line => detectLineType(line));
}

/**
 * Vérifie si le contenu est déjà au format standard
 */
function isAlreadyStandardFormat(content: string): boolean {
  // Format standard: ## En tant que suivi d'une ligne de texte
  return /^## En tant que\s*$/m.test(content) &&
         /^## Je souhaite\s*$/m.test(content);
}

/**
 * Convertit le contenu d'un fichier US vers le format standard
 * Approche ligne par ligne : chaque ligne est analysée individuellement
 */
export function convertUsToStandardFormat(content: string): string {
  // Si déjà au format standard, retourner tel quel
  if (isAlreadyStandardFormat(content)) {
    return content;
  }

  const parsedLines = parseContentLineByLine(content);
  const outputLines: string[] = [];
  
  let caIndex = 0;
  let inCriteres = false;
  let hasCriteresHeader = false;

  for (let i = 0; i < parsedLines.length; i++) {
    const line = parsedLines[i];
    
    switch (line.type) {
      case 'titre-us':
        outputLines.push(`# ${line.content}`);
        outputLines.push('');
        break;
        
      case 'en-tant-que':
        outputLines.push(`## En tant que ${line.content}`);
        outputLines.push('');
        break;
        
      case 'je-souhaite':
        outputLines.push(`## Je souhaite ${line.content}`);
        outputLines.push('');
        break;
        
      case 'afin-de':
        outputLines.push(`## Afin de ${line.content}`);
        outputLines.push('');
        break;
        
      case 'criteres-titre':
        if (!hasCriteresHeader) {
          outputLines.push("# Critères d'acceptation");
          outputLines.push('');
          hasCriteresHeader = true;
        }
        inCriteres = true;
        break;
        
      case 'ca-titre':
        // S'assurer qu'on a le header des critères
        if (!hasCriteresHeader) {
          outputLines.push("# Critères d'acceptation");
          outputLines.push('');
          hasCriteresHeader = true;
        }
        caIndex++;
        outputLines.push(`## CA${caIndex} - ${line.content}`);
        inCriteres = true;
        break;
        
      case 'sous-element':
        outputLines.push(`- ${line.content}`);
        break;
        
      case 'element-simple':
        // Élément simple après les critères = sous-élément sans titre de CA
        if (inCriteres || hasCriteresHeader) {
          outputLines.push(`- ${line.content}`);
        } else {
          // Avant les critères, on garde tel quel (rare)
          outputLines.push(`- ${line.content}`);
        }
        break;
        
      case 'paragraphe':
        // Ignorer les séparateurs ---
        if (line.content === '---') {
          break;
        }
        // Ignorer les titres de section markdown ### Critères
        if (line.content.match(/^#{1,3}\s*Critères/i)) {
          if (!hasCriteresHeader) {
            outputLines.push("# Critères d'acceptation");
            outputLines.push('');
            hasCriteresHeader = true;
          }
          inCriteres = true;
          break;
        }
        // Garder les autres paragraphes (contexte, etc.)
        if (line.content) {
          outputLines.push(line.content);
        }
        break;
        
      case 'vide':
        // Éviter les doubles lignes vides
        if (outputLines.length > 0 && outputLines[outputLines.length - 1] !== '') {
          outputLines.push('');
        }
        break;
    }
  }

  return outputLines.join('\n').trimEnd();
}

/**
 * Migre un fichier US individuel
 * @param filename Nom du fichier
 * @param content Contenu du fichier
 * @param dryRun Si true, ne modifie pas le fichier
 * @returns Résultat de la migration
 */
export function migrateUsFile(filename: string, content: string, dryRun: boolean): MigrationResult {
  // Vérifier si c'est un fichier US
  if (!detectUsPattern(filename)) {
    return {
      filePath: filename,
      success: true,
      converted: false,
      skippedReason: 'not-us-file',
    };
  }

  // Vérifier si déjà au format standard
  if (isAlreadyStandardFormat(content)) {
    return {
      filePath: filename,
      success: true,
      converted: false,
      skippedReason: 'already-standard-format',
    };
  }

  try {
    const newContent = convertUsToStandardFormat(content);

    return {
      filePath: filename,
      success: true,
      converted: true,
      originalContent: content,
      newContent,
    };
  } catch (error) {
    /* istanbul ignore next - code défensif */
    return {
      filePath: filename,
      success: false,
      converted: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Génère un rapport de migration à partir des résultats
 */
export function generateMigrationReport(results: MigrationResult[]): MigrationReport {
  const report: MigrationReport = {
    totalFiles: results.length,
    convertedFiles: 0,
    skippedFiles: 0,
    errorFiles: 0,
    errors: [],
    convertedList: [],
  };

  for (const result of results) {
    if (result.converted) {
      report.convertedFiles++;
      report.convertedList.push(result.filePath);
    } else if (result.success && result.skippedReason) {
      report.skippedFiles++;
    } else if (!result.success) {
      report.errorFiles++;
      report.errors.push(`${result.filePath}: ${result.error}`);
    }
  }

  return report;
}

/**
 * Formate le rapport de migration en texte lisible
 */
export function formatMigrationReport(report: MigrationReport): string {
  const lines: string[] = [];

  lines.push('═══════════════════════════════════════════');
  lines.push('       RAPPORT DE MIGRATION US');
  lines.push('═══════════════════════════════════════════');
  lines.push('');
  lines.push(`Fichiers traités : ${report.totalFiles}`);
  lines.push(`Convertis : ${report.convertedFiles}`);
  lines.push(`Ignorés : ${report.skippedFiles}`);
  lines.push(`Erreurs : ${report.errorFiles}`);
  lines.push('');

  if (report.convertedList.length > 0) {
    lines.push('Fichiers convertis :');
    for (const file of report.convertedList) {
      lines.push(`  ✓ ${file}`);
    }
    lines.push('');
  }

  if (report.errors.length > 0) {
    lines.push('═══ ERREURS ═══');
    for (const error of report.errors) {
      lines.push(`  ✗ ${error}`);
    }
    lines.push('');
  }

  if (report.errorFiles === 0) {
    lines.push('Migration terminée avec succès !');
  } else {
    lines.push(`Migration terminée avec ${report.errorFiles} erreur(s).`);
  }

  return lines.join('\n');
}

const SPRINTS_DIR = 'data/A propos/Sprints';

/**
 * Scanne récursivement un répertoire pour trouver les fichiers .md
 */
/* istanbul ignore next - fonction IO */
export function scanMdFiles(dir: string): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...scanMdFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Exécute la migration sur tous les fichiers US
 */
/* istanbul ignore next - fonction IO */
export async function runMigration(dryRun: boolean): Promise<MigrationReport> {
  const mdFiles = scanMdFiles(SPRINTS_DIR);
  const results: MigrationResult[] = [];

  for (const filePath of mdFiles) {
    const filename = path.basename(filePath);
    
    // Ignorer les fichiers non-US
    if (!detectUsPattern(filename)) {
      results.push({
        filePath: filename,
        success: true,
        converted: false,
        skippedReason: 'not-us-file',
      });
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const result = migrateUsFile(filename, content, dryRun);
      result.filePath = filePath; // Chemin complet pour l'écriture

      // Écrire le fichier converti si pas en mode dry-run
      if (!dryRun && result.converted && result.newContent) {
        fs.writeFileSync(filePath, result.newContent, 'utf-8');
      }

      results.push(result);
    } catch (error) {
      results.push({
        filePath,
        success: false,
        converted: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return generateMigrationReport(results);
}

/**
 * Point d'entrée CLI
 */
/* istanbul ignore next - point d'entrée CLI */
export async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log('═══════════════════════════════════════════');
  console.log('  Migration US vers format Markdown standard');
  console.log('═══════════════════════════════════════════');
  console.log('');
  console.log(`Mode: ${dryRun ? '🔍 dry-run (simulation)' : '✏️ migration réelle'}`);
  console.log('');

  const report = await runMigration(dryRun);
  console.log(formatMigrationReport(report));
}

// Exécution si appelé directement (ne s'exécute pas dans les tests Jest)
/* istanbul ignore next */
const isJest = process.env.JEST_WORKER_ID !== undefined;
/* istanbul ignore next */
const isDirectExecution = process.argv[1]?.includes('migrate-us-format');

/* istanbul ignore next */
if (!isJest && isDirectExecution) {
  main().catch((error) => {
    console.error('Erreur lors de la migration:', error);
    process.exit(1);
  });
}
