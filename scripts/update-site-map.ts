/**
 * Script pour mettre à jour _Pages-Liens-Et-Menus.json et plan-du-site.json (CA5 US-13.1).
 * La section "menus" de _Pages-Liens-Et-Menus.json est lue depuis _Menus-header.json (source éditable).
 */

import fs from 'fs';
import path from 'path';
import { detecterPages, detecterLiensInternes, mettreAJourPlanJSON, injecterPagesDansPlanDuSiteJson } from '../utils/backoffice/generators/siteMapGenerator';
import type { PlanPage } from '../utils/backoffice/generators/siteMapGenerator';
import type { MenusConfig } from '../utils/shared/headerMenuTypes';

const PAGES_LIENS_ET_MENUS_PATH = path.join(process.cwd(), 'data', '_Pages-Liens-Et-Menus.json');
const MENUS_HEADER_PATH = path.join(process.cwd(), 'data', '_Menus-header.json');

/** Configuration par défaut du menu header si _Menus-header.json est absent */
const DEFAULT_MENUS: MenusConfig = {
  header: [
    { id: 'accueil', pageUrl: '/' },
    { id: 'mes-profils', pageUrl: '/mes-profils', sousmenuPageUrls: ['/profil/cpo', '/profil/coo', '/profil/agile', '/profil/cto'] },
    { id: 'detournements', pageUrl: '/detournement-video', sousmenuPageUrls: ['/portfolio-detournements'] },
    { id: 'a-propos', pageUrl: '/a-propos' },
  ],
  exclusHeader: ['/pour-aller-plus-loin', '/faisons-connaissance'],
};

const pages = detecterPages();
const liens = detecterLiensInternes();

console.log(`Pages détectées: ${pages.length}`);
console.log(`Liens détectés: ${liens.length}`);

// Migration unique : si seul l'ancien fichier existe, le copier pour préserver coords/zones
const oldPath = path.join(process.cwd(), 'data', '_Pages-Et-Lien.json');
if (!fs.existsSync(PAGES_LIENS_ET_MENUS_PATH) && fs.existsSync(oldPath)) {
  fs.copyFileSync(oldPath, PAGES_LIENS_ET_MENUS_PATH);
  console.log('   (migration : _Pages-Et-Lien.json copié vers _Pages-Liens-Et-Menus.json)');
}

// CA5 US-13.1 : un seul fichier _Pages-Liens-Et-Menus.json (pages + liens + menus)
mettreAJourPlanJSON(pages, liens, { siteMapPath: PAGES_LIENS_ET_MENUS_PATH });

const planMisAJour: { pages: PlanPage[]; liens: unknown[]; menus?: MenusConfig } = JSON.parse(
  fs.readFileSync(PAGES_LIENS_ET_MENUS_PATH, 'utf8')
);
let menus: MenusConfig = DEFAULT_MENUS;
if (fs.existsSync(MENUS_HEADER_PATH)) {
  try {
    const menusRaw = JSON.parse(fs.readFileSync(MENUS_HEADER_PATH, 'utf8'));
    if (menusRaw && (menusRaw.header || menusRaw.exclusHeader !== undefined)) {
      menus = { header: menusRaw.header ?? DEFAULT_MENUS.header, exclusHeader: menusRaw.exclusHeader ?? DEFAULT_MENUS.exclusHeader };
    }
  } catch {
    console.warn('⚠️ _Menus-header.json invalide, utilisation des menus par défaut.');
  }
}
planMisAJour.menus = menus;
fs.writeFileSync(PAGES_LIENS_ET_MENUS_PATH, JSON.stringify(planMisAJour, null, 2));

const pagesMisesAJour: PlanPage[] = planMisAJour.pages;
injecterPagesDansPlanDuSiteJson(pagesMisesAJour);

console.log('✅ Fichiers mis à jour :');
console.log('   - _Pages-Liens-Et-Menus.json (pages + liens + menus, spec CA5 US-13.1)');
console.log('   - plan-du-site.json (liste des pages pour le rendu)');
console.log(`   - ${pages.length} pages, ${liens.length} liens`);
