/**
 * Script pour vérifier l'intégrité du menu header (US-13.1 CA7).
 * Exécutable en local ou en CI.
 */

import { checkMenuIntegrity } from '../utils/server';

function main() {
  console.log('🔍 Vérification de l\'intégrité du menu header...\n');

  try {
    const result = checkMenuIntegrity();

    if (result.valid && result.pagesPotentiellementOubliees.length === 0) {
      console.log('✅ Menu header : intégrité OK');
      process.exit(0);
    }

    let hasError = false;

    if (result.urlsManquantes.length > 0) {
      console.error('❌ URLs référencées dans menus.header mais absentes de pages:');
      result.urlsManquantes.forEach((url) => console.error(`   - ${url}`));
      console.error('');
      hasError = true;
    }

    if (result.pagesPotentiellementOubliees.length > 0) {
      console.warn('⚠️ Pages visibles potentiellement oubliées du menu (ajoutez à menus.header ou menus.exclusHeader):');
      result.pagesPotentiellementOubliees.forEach((url) => console.warn(`   - ${url}`));
      console.warn('');
      hasError = true;
    }

    process.exit(hasError ? 1 : 0);
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
    process.exit(1);
  }
}

main();
