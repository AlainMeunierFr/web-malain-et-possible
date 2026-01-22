/**
 * Script pre-commit : Génère automatiquement le plan de test E2E
 * 
 * Ce script doit être exécuté avant chaque commit pour s'assurer que
 * le scénario E2E parcours-complet-liens.spec.ts est toujours à jour
 * avec les liens de Pages-Et-Lien.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const main = () => {
  console.log('🔄 Génération automatique du plan de test E2E avant commit...\n');

  const scriptPath = path.join(process.cwd(), 'scripts', 'generate-e2e-scenario.ts');
  
  if (!fs.existsSync(scriptPath)) {
    console.error('❌ Erreur : Le script generate-e2e-scenario.ts n\'existe pas');
    process.exit(1);
  }

  try {
    execSync(`npx ts-node "${scriptPath}"`, { 
      stdio: 'inherit',
      encoding: 'utf8',
      cwd: process.cwd(),
    });
    
    console.log('\n✅ Plan de test E2E généré avec succès');
    console.log('📝 Le fichier tests/end-to-end/parcours-complet-liens.spec.ts est à jour\n');
  } catch (error: any) {
    console.error('\n❌ Erreur lors de la génération du plan de test E2E :', error.message);
    console.error('⚠️  Le commit peut continuer, mais le plan E2E n\'est pas à jour');
    // Ne pas bloquer le commit, juste avertir
    process.exit(0);
  }
};

main();
