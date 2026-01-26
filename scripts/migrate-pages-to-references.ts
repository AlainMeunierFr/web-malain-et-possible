/**
 * Script pour migrer toutes les pages JSON pour utiliser des références vers la bibliothèque
 */

import fs from 'fs';
import path from 'path';
import { titleToSlug } from './extract-bibliotheque';

/**
 * Lit un fichier JSON de page
 */
function readPageFile(filename: string): any {
  const filePath = path.join(process.cwd(), 'data', filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier ${filename} n'existe pas`);
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Écrit un fichier JSON de page
 */
function writePageFile(filename: string, data: any): void {
  const filePath = path.join(process.cwd(), 'data', filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Migre une page pour utiliser des références
 */
function migratePage(filename: string): void {
  console.log(`\n📄 Migration de ${filename}...`);
  
  const data = readPageFile(filename);
  if (!data.contenu || !Array.isArray(data.contenu)) {
    console.log(`  ⚠️  ${filename} n'a pas de structure "contenu", ignoré`);
    return;
  }

  let modified = false;
  const newContenu = data.contenu.map((element: any) => {
    if (element.type === 'domaineDeCompetence' && !element.ref) {
      // C'est un domaine inline, le remplacer par une référence
      const domaineId = titleToSlug(element.titre);
      modified = true;
      console.log(`  ✅ Domaine "${element.titre}" → ref: "${domaineId}"`);
      
      return {
        type: 'domaineDeCompetence',
        ref: domaineId,
      };
    }
    return element;
  });

  if (modified) {
    data.contenu = newContenu;
    writePageFile(filename, data);
    console.log(`  ✅ ${filename} migré avec succès`);
  } else {
    console.log(`  ℹ️  ${filename} déjà migré ou sans domaines`);
  }
}

/**
 * Migre tous les fichiers JSON de pages
 */
function migrateAllPages(): void {
  console.log('🔄 Migration de toutes les pages vers des références...\n');

  const dataDir = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDir);

  const pageFiles = files.filter(
    (file) => file.endsWith('.json') && !file.includes('bibliotheque')
  );

  console.log(`📋 ${pageFiles.length} fichiers à migrer\n`);

  for (const file of pageFiles) {
    try {
      migratePage(file);
    } catch (error) {
      console.error(`  ❌ Erreur lors de la migration de ${file}:`, error);
    }
  }

  console.log('\n✅ Migration terminée !');
}

// Exécuter le script
if (require.main === module) {
  migrateAllPages();
}

export { migratePage };
