/**
 * Script de test pour la génération automatique des e2eID
 */

import { generateE2eIdsFromAudit } from '../utils/e2eIdGenerator';

const result = generateE2eIdsFromAudit();

console.log('=== Résultat de la génération ===');
console.log(JSON.stringify(result, null, 2));

if (result.errors.length > 0) {
  console.error('\n❌ Erreurs:', result.errors);
  process.exit(1);
} else {
  console.log('\n✅ Génération réussie!');
  console.log(`   - ${result.generated} e2eID généré(s)`);
  console.log(`   - ${result.excluded} élément(s) exclu(s)`);
  process.exit(0);
}
