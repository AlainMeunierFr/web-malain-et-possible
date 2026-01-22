/**
 * Script pour compter les User Stories complétées dans les sprints
 * Une US est considérée comme complétée si elle contient "✅ COMPLÉTÉ" ou "✅ COMPLETÉ"
 */

import fs from 'fs';
import path from 'path';

const SPRINTS_DIR = path.join(process.cwd(), 'A propos de ce site', '2. Sprints');

interface CompletedUS {
  id: string;
  title: string;
  file: string;
}

/**
 * Compte les User Stories complétées dans tous les fichiers de sprint
 */
export function countCompletedUS(): { count: number; usList: CompletedUS[] } {
  const usList: CompletedUS[] = [];
  
  if (!fs.existsSync(SPRINTS_DIR)) {
    console.warn(`⚠️  Dossier sprints non trouvé: ${SPRINTS_DIR}`);
    return { count: 0, usList: [] };
  }
  
  const files = fs.readdirSync(SPRINTS_DIR);
  
  for (const file of files) {
    if (!file.endsWith('.md')) {
      continue;
    }
    
    const filePath = path.join(SPRINTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    let currentUS: { id: string; title: string; startLine: number } | null = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Détecter une User Story (format: #### US-X.Y : Titre)
      const usMatch = line.match(/^####\s+(US-\d+\.\d+)\s*:\s*(.+)$/);
      if (usMatch) {
        // Si on avait une US précédente non complétée, on l'ignore
        currentUS = {
          id: usMatch[1],
          title: usMatch[2].trim(),
          startLine: i,
        };
        continue;
      }
      
      // Vérifier si l'US courante est complétée
      if (currentUS) {
        // Chercher "✅ COMPLÉTÉ" ou "✅ COMPLETÉ" dans la ligne courante ou les suivantes
        const isCompleted = line.includes('✅ COMPLÉTÉ') || line.includes('✅ COMPLETÉ');
        
        if (isCompleted) {
          usList.push({
            id: currentUS.id,
            title: currentUS.title,
            file: file,
          });
          currentUS = null; // Reset pour éviter de compter plusieurs fois
        }
      }
    }
  }
  
  return { count: usList.length, usList };
}

/**
 * Fonction principale pour usage en ligne de commande
 */
if (require.main === module) {
  const { count, usList } = countCompletedUS();
  console.log(`📊 User Stories complétées: ${count}`);
  if (usList.length > 0) {
    console.log('\nListe des US complétées:');
    usList.forEach(us => {
      console.log(`  - ${us.id}: ${us.title} (${us.file})`);
    });
  }
}
