/**
 * Script pour mettre à jour _Pages-Et-Lien.json et plan-du-site.json.
 * Les pages affichées dans "Plan du site" viennent de plan-du-site.json (rendu pur JSON).
 */

import { detecterPages, detecterLiensInternes, mettreAJourPlanJSON, injecterPagesDansPlanDuSiteJson } from '../utils/siteMapGenerator';

const pages = detecterPages();
const liens = detecterLiensInternes();

console.log(`Pages détectées: ${pages.length}`);
console.log(`Liens détectés: ${liens.length}`);

mettreAJourPlanJSON(pages, liens);
injecterPagesDansPlanDuSiteJson(pages);

console.log('✅ Fichiers mis à jour :');
console.log('   - _Pages-Et-Lien.json');
console.log('   - plan-du-site.json (liste des pages pour le rendu)');
console.log(`   - ${pages.length} pages, ${liens.length} liens`);
