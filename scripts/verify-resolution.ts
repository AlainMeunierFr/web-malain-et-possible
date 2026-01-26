/**
 * Script pour vérifier que les références sont bien résolues
 */

import { readPageData } from '../utils/indexReader';

function verifyResolution() {
  console.log('🔍 Vérification de la résolution des références...\n');

  const pageData = readPageData('index.json');
  
  console.log(`📊 Total d'éléments dans index.json: ${pageData.contenu.length}\n`);
  
  let domaineCount = 0;
  let refCount = 0;
  let resolvedCount = 0;

  for (const element of pageData.contenu) {
    if (element.type === 'domaineDeCompetence') {
      domaineCount++;
      const el = element as any;
      if (el.ref) {
        refCount++;
        console.log(`  ⚠️  Référence non résolue: ${el.ref}`);
      } else if (el.titre && el.items) {
        resolvedCount++;
        console.log(`  ✅ Domaine résolu: "${el.titre}" (${el.items.length} compétences)`);
      }
    }
  }

  console.log(`\n📊 Résumé:`);
  console.log(`  - Domaines totaux: ${domaineCount}`);
  console.log(`  - Références non résolues: ${refCount}`);
  console.log(`  - Domaines résolus: ${resolvedCount}`);

  if (refCount === 0 && resolvedCount === domaineCount) {
    console.log('\n✅ Toutes les références sont résolues !');
  } else {
    console.log('\n⚠️  Certaines références ne sont pas résolues');
  }
}

verifyResolution();
