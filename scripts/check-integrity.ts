/**
 * Script pour vérifier l'intégrité référentielle de toutes les pages
 */

import { readCompetences, readDomaines } from '../utils/server';
import { checkAllPagesIntegrity } from '../utils/backoffice/integrity/referentialIntegrityChecker';

function checkIntegrity() {
  console.log('🔍 Vérification de l\'intégrité référentielle...\n');

  try {
    const competences = readCompetences();
    const domaines = readDomaines();
    
    console.log(`✅ Bibliothèque chargée:`);
    console.log(`  - ${competences.size} compétences`);
    console.log(`  - ${domaines.size} domaines\n`);

    const result = checkAllPagesIntegrity(competences, domaines);

    if (result.valid) {
      console.log('✅ Toutes les références sont valides !');
      process.exit(0);
    } else {
      console.error('❌ Erreurs d\'intégrité référentielle trouvées:\n');
      for (const error of result.errors) {
        console.error(error);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
    process.exit(1);
  }
}

checkIntegrity();
