/**
 * Script pour mettre à jour _Pages-Et-Lien.json et plan-du-site.json.
 * Les pages affichées dans "Plan du site" viennent de plan-du-site.json (rendu pur JSON).
 */

import fs from 'fs';
import path from 'path';
import { detecterPages, detecterLiensInternes, mettreAJourPlanJSON, injecterPagesDansPlanDuSiteJson } from '../utils/backoffice/generators/siteMapGenerator';
import type { PlanPage } from '../utils/backoffice/generators/siteMapGenerator';

const pages = detecterPages();
const liens = detecterLiensInternes();

console.log(`Pages détectées: ${pages.length}`);
console.log(`Liens détectés: ${liens.length}`);

mettreAJourPlanJSON(pages, liens);

// Lire les pages mises à jour depuis _Pages-Et-Lien.json (avec les bonnes zones)
const siteMapPath = path.join(process.cwd(), 'data', '_Pages-Et-Lien.json');
const planMisAJour = JSON.parse(fs.readFileSync(siteMapPath, 'utf8'));
const pagesMisesAJour: PlanPage[] = planMisAJour.pages;

injecterPagesDansPlanDuSiteJson(pagesMisesAJour);

console.log('✅ Fichiers mis à jour :');
console.log('   - _Pages-Et-Lien.json');
console.log('   - plan-du-site.json (liste des pages pour le rendu)');
console.log(`   - ${pages.length} pages, ${liens.length} liens`);
