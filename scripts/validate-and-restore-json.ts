/**
 * Script pour valider l'intégrité de tous les fichiers JSON dans ./data
 * - Fait un backup des fichiers invalides
 * - Récupère la dernière version depuis git
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dataDir = path.join(process.cwd(), 'data');

interface ValidationResult {
  file: string;
  valid: boolean;
  error?: string;
}

/**
 * Valide qu'un fichier JSON est syntaxiquement correct
 */
const validateJSONFile = (filePath: string): ValidationResult => {
  const fileName = path.basename(filePath);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier que le fichier n'est pas vide
    if (!content.trim()) {
      return {
        file: fileName,
        valid: false,
        error: 'Fichier vide',
      };
    }
    
    // Essayer de parser le JSON
    JSON.parse(content);
    
    return {
      file: fileName,
      valid: true,
    };
  } catch (error: any) {
    return {
      file: fileName,
      valid: false,
      error: error.message || 'Erreur de parsing JSON',
    };
  }
};

/**
 * Fait un backup d'un fichier
 */
const backupFile = (filePath: string): void => {
  const backupPath = filePath + '.backup.json';
  
  // Si un backup existe déjà, ne pas l'écraser
  if (fs.existsSync(backupPath)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const timestampedBackup = filePath.replace('.json', `.backup-${timestamp}.json`);
    fs.copyFileSync(filePath, timestampedBackup);
    console.log(`  ✓ Backup créé: ${path.basename(timestampedBackup)}`);
  } else {
    fs.copyFileSync(filePath, backupPath);
    console.log(`  ✓ Backup créé: ${path.basename(backupPath)}`);
  }
};

/**
 * Récupère la dernière version d'un fichier depuis git
 */
const restoreFromGit = (filePath: string): void => {
  const relativePath = path.relative(process.cwd(), filePath);
  
  try {
    // Vérifier que le fichier est suivi par git
    try {
      execSync(`git ls-files --error-unmatch "${relativePath}"`, { stdio: 'ignore' });
    } catch (e) {
      console.log(`  ⚠ Fichier non suivi par git: ${relativePath}`);
      return;
    }
    
    // Récupérer la version depuis git
    execSync(`git checkout HEAD -- "${relativePath}"`, { stdio: 'inherit' });
    console.log(`  ✓ Fichier restauré depuis git: ${path.basename(filePath)}`);
  } catch (error: any) {
    console.error(`  ✗ Erreur lors de la restauration depuis git: ${error.message}`);
  }
};

// Main
console.log('🔍 Validation de l\'intégrité des fichiers JSON dans ./data\n');

const jsonFiles = fs.readdirSync(dataDir)
  .filter(f => f.endsWith('.json') && !f.endsWith('.backup.json') && !f.includes('backup-'));

const results: ValidationResult[] = [];

// Valider tous les fichiers
for (const file of jsonFiles) {
  const filePath = path.join(dataDir, file);
  const result = validateJSONFile(filePath);
  results.push(result);
  
  if (result.valid) {
    console.log(`✓ ${file} - Valide`);
  } else {
    console.log(`✗ ${file} - INVALIDE: ${result.error}`);
  }
}

// Compter les fichiers invalides
const invalidFiles = results.filter(r => !r.valid);

if (invalidFiles.length === 0) {
  console.log('\n✅ Tous les fichiers JSON sont valides !');
  process.exit(0);
}

console.log(`\n⚠️ ${invalidFiles.length} fichier(s) invalide(s) détecté(s)`);
console.log('\n📦 Création des backups et restauration depuis git...\n');

// Traiter les fichiers invalides
for (const result of invalidFiles) {
  const filePath = path.join(dataDir, result.file);
  
  console.log(`\n🔧 Traitement de ${result.file}:`);
  console.log(`   Erreur: ${result.error}`);
  
  // Backup
  backupFile(filePath);
  
  // Restauration depuis git
  restoreFromGit(filePath);
  
  // Vérifier que le fichier restauré est valide
  const restoredResult = validateJSONFile(filePath);
  if (restoredResult.valid) {
    console.log(`  ✅ Fichier restauré et valide`);
  } else {
    console.log(`  ⚠️ Le fichier restauré est toujours invalide: ${restoredResult.error}`);
  }
}

console.log('\n✅ Traitement terminé !');
