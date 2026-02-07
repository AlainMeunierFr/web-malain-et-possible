/**
 * Vérification d'intégrité du menu header (US-13.1 CA7).
 * URLs du menu présentes dans pages, pages visibles non oubliées.
 */

import fs from 'fs';
import path from 'path';
import type { PlanPage } from '../shared/planDuSiteTypes';
import type { HeaderMenuEntryConfig, MenusConfig } from '../shared/headerMenuTypes';

export interface MenuIntegrityResult {
  valid: boolean;
  urlsManquantes: string[];
  pagesPotentiellementOubliees: string[];
}

const PLAN_PATH = path.join('data', '_Pages-Liens-Et-Menus.json');

/** Même défaut que headerMenuReader (CA2) */
const DEFAULT_HEADER_MENU: HeaderMenuEntryConfig[] = [
  { id: 'accueil', pageUrl: '/' },
  {
    id: 'mes-profils',
    pageUrl: '/mes-profils',
    sousmenuPageUrls: ['/profil/cpo', '/profil/coo', '/profil/agile', '/profil/cto'],
  },
  {
    id: 'detournements',
    pageUrl: '/detournement-video',
    sousmenuPageUrls: ['/portfolio-detournements'],
  },
  { id: 'a-propos', pageUrl: '/a-propos-du-site' },
];

const DEFAULT_EXCLUS_HEADER = ['/pour-aller-plus-loin', '/faisons-connaissance'];

function readPlanFile(): { pages: PlanPage[]; menus?: MenusConfig } {
  const filePath = path.join(process.cwd(), PLAN_PATH.split('/').join(path.sep));
  if (!fs.existsSync(filePath)) {
    throw new Error('Fichier plan introuvable (_Pages-Liens-Et-Menus.json)');
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw) as { pages?: PlanPage[]; menus?: MenusConfig };
  const pages = data.pages ?? [];
  return { pages, menus: data.menus };
}

/** URLs référencées dans menus.header (pageUrl + sousmenuPageUrls) */
function collectMenuUrls(configs: HeaderMenuEntryConfig[]): string[] {
  const urls: string[] = [];
  for (const cfg of configs) {
    urls.push(cfg.pageUrl);
    if (cfg.sousmenuPageUrls) {
      urls.push(...cfg.sousmenuPageUrls);
    }
  }
  return urls;
}

/** Pages visibles dans le plan : dessiner === "Oui" et zone !== "Masqué" */
function getPagesVisibles(pages: PlanPage[]): string[] {
  return pages
    .filter((p) => p.dessiner === 'Oui' && p.zone !== 'Masqué')
    .map((p) => p.url);
}

/**
 * Vérifie l'intégrité du menu :
 * - Chaque URL de menus.header doit exister dans pages
 * - Les pages visibles non dans header ni exclusHeader sont potentiellement oubliées
 */
export function checkMenuIntegrity(): MenuIntegrityResult {
  const { pages, menus } = readPlanFile();
  const pageUrls = new Set(pages.map((p) => p.url));

  const headerConfigs =
    menus?.header && menus.header.length > 0 ? menus.header : DEFAULT_HEADER_MENU;
  const exclusHeader = new Set(
    menus?.exclusHeader && menus.exclusHeader.length > 0 ? menus.exclusHeader : DEFAULT_EXCLUS_HEADER
  );

  const menuUrls = collectMenuUrls(headerConfigs);
  const urlsManquantes = menuUrls.filter((url) => !pageUrls.has(url));

  const urlsDansHeader = new Set<string>();
  for (const cfg of headerConfigs) {
    urlsDansHeader.add(cfg.pageUrl);
    if (cfg.sousmenuPageUrls) {
      cfg.sousmenuPageUrls.forEach((u) => urlsDansHeader.add(u));
    }
  }

  const pagesVisibles = getPagesVisibles(pages);
  const pagesPotentiellementOubliees = pagesVisibles.filter(
    (url) => !urlsDansHeader.has(url) && !exclusHeader.has(url)
  );

  const valid = urlsManquantes.length === 0;

  return {
    valid,
    urlsManquantes,
    pagesPotentiellementOubliees,
  };
}
