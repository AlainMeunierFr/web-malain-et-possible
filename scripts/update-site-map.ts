/**
 * Script pour mettre à jour le fichier Pages-Et-Lien.json
 */

import { detecterPages, detecterLiensInternes, mettreAJourPlanJSON } from '../utils/siteMapGenerator';

const pages = detecterPages();
const liens = detecterLiensInternes();

console.log(`Pages détectées: ${pages.length}`);
console.log(`Liens détectés: ${liens.length}`);

mettreAJourPlanJSON(pages, liens);

console.log('✅ Fichier Pages-Et-Lien.json mis à jour avec succès');
console.log(`   - ${pages.length} pages`);
console.log(`   - ${liens.length} liens`);
