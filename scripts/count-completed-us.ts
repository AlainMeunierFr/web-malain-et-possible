/**
 * Script pour compter les User Stories complétées dans les sprints
 * Une US est considérée comme complétée si elle contient "✅ COMPLÉTÉ" ou "✅ COMPLETÉ"
 */

import fs from 'fs';
import path from 'path';

const SPRINTS_DIR = path.join(process.cwd(), 'data', 'A propos de ce site', '2. Sprints');

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
      const line = lines[i].replace(/\r$/, ''); // Supprimer le \r en fin de ligne (Windows)
      
      // Détecter une User Story (format: ## US-X.Y : Titre ou ## US-X.Ya : Titre)
      // Supporte aussi les variantes avec ou sans espace avant le deux-points
      const usMatch = line.match(/^##\s+(US-\d+\.\d+[a-z]?)\s*:\s*(.+)$/);
      if (usMatch) {
        // Vérifier si l'US précédente était complétée avant de passer à la suivante
        if (currentUS) {
          // Si on avait une US précédente non complétée, on l'ignore
          currentUS = null;
        }
        
        const usTitle = usMatch[2].trim();
        // Vérifier si le marqueur de complétion est dans le titre lui-même
        // Supporte les variantes : "✅ COMPLÉTÉ", "✅ COMPLETÉ", avec ou sans espace
        // Normalise le texte pour gérer les problèmes d'encodage (É peut être encodé différemment)
        const normalizedTitle = usTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const isCompletedInTitle = 
          /COMPL[EÉ]T[EÉ]/i.test(usTitle) || 
          /COMPLETE/i.test(normalizedTitle) ||
          usTitle.includes('✅ COMPLÉTÉ') || 
          usTitle.includes('✅ COMPLETÉ') ||
          usTitle.includes('✅ COMPLETE') ||
          usTitle.includes('COMPLÉTÉ') ||
          usTitle.includes('COMPLETÉ');
        
        if (isCompletedInTitle) {
          // US complétée directement dans le titre
          const cleanTitle = usTitle
            .replace(/✅\s*(COMPLÉTÉ|COMPLETÉ|COMPLETE)\s*/gi, '')
            .trim();
          usList.push({
            id: usMatch[1],
            title: cleanTitle,
            file: file,
          });
          currentUS = null;
        } else {
          // US non complétée dans le titre, on continue à chercher dans les lignes suivantes
          currentUS = {
            id: usMatch[1],
            title: usTitle,
            startLine: i,
          };
        }
        continue;
      }
      
      // Vérifier si l'US courante est complétée dans les lignes suivantes
      if (currentUS) {
        // Chercher "✅ COMPLÉTÉ" ou "✅ COMPLETÉ" dans la ligne courante
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
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('count-completed-us.ts')) {
  const { count, usList } = countCompletedUS();
  console.log(`📊 User Stories complétées: ${count}`);
  if (usList.length > 0) {
    console.log('\nListe des US complétées:');
    usList.forEach(us => {
      console.log(`  - ${us.id}: ${us.title} (${us.file})`);
    });
  }
}
