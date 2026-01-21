/**
 * Script pour corriger automatiquement tous les tests après refactorisation DDD
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

async function fixTestFile(filePath: string): Promise<boolean> {
  console.log(`\n📄 Traitement de ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern 1: Remplacer items: [ dans les objets de test
  if (content.includes('items: [')) {
    content = content.replace(/items: \[/g, 'competences: [');
    modified = true;
  }

  // Pattern 2: Ajouter type: 'competence' aux compétences dans les tests
  // Chercher les patterns de compétences sans type
  const competencePattern = /(\{\s*\n\s*)(titre: ['"])/g;
  const matches = content.matchAll(competencePattern);
  
  for (const match of Array.from(matches)) {
    const index = match.index!;
    const indent = match[1];
    
    // Vérifier si ce n'est pas déjà typé
    const before = content.substring(Math.max(0, index - 100), index);
    if (!before.includes("type: 'competence'") && before.includes('competences:')) {
      content = content.substring(0, index) + 
                indent + "type: 'competence',\n" + indent +
                content.substring(index + indent.length);
      modified = true;
    }
  }

  // Pattern 3: Ajouter type: 'bouton' aux boutons dans les tests
  const boutonPattern = /(bouton: \{\s*)(texte:)/g;
  content = content.replace(boutonPattern, "bouton: { type: 'bouton', $2");
  if (content !== fs.readFileSync(filePath, 'utf8')) {
    modified = true;
  }

  // Pattern 4: Remplacer .items par .competences dans les expect
  if (content.includes('.items')) {
    content = content.replace(/\.items/g, '.competences');
    modified = true;
  }

  // Pattern 5: Mettre à jour les commentaires
  if (content.includes('tous les items')) {
    content = content.replace(/tous les items/g, 'toutes les compétences');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Fichier corrigé`);
    return true;
  } else {
    console.log(`  ℹ️  Aucune modification nécessaire`);
    return false;
  }
}

async function main() {
  console.log('🚀 Démarrage de la correction automatique des tests DDD...');

  // Trouver tous les fichiers de test
  const testFiles = await glob('tests/**/*.test.{ts,tsx}', {
    cwd: process.cwd(),
    absolute: true,
  });

  console.log(`📝 Fichiers de test trouvés : ${testFiles.length}`);

  let fixedCount = 0;

  for (const file of testFiles) {
    try {
      const wasFixed = await fixTestFile(file);
      if (wasFixed) fixedCount++;
    } catch (error) {
      console.error(`  ❌ Erreur lors du traitement de ${file}:`, error);
    }
  }

  console.log(`\n✅ Correction terminée !`);
  console.log(`📊 Fichiers corrigés : ${fixedCount}/${testFiles.length}`);
}

main().catch(console.error);
