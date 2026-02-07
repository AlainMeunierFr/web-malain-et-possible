/**
 * Lecteur du menu header depuis _Pages-Liens-Et-Menus.json (US-13.1).
 * Retourne les entrées du menu avec titres résolus depuis pages.
 */

import fs from 'fs';
import path from 'path';
import type { PlanPage } from '../shared/planDuSiteTypes';
import type { HeaderMenuEntry, HeaderMenuEntryConfig, MenusConfig } from '../shared/headerMenuTypes';

const PLAN_PATH = path.join('data', '_Pages-Liens-Et-Menus.json');

/** Configuration par défaut du menu header (CA2) */
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

/** Libellés courts en français pour le menu (priorité sur les titres de page) */
const DEFAULT_MENU_LABEL_BY_ID: Record<string, string> = {
  accueil: 'Accueil',
  'mes-profils': 'Mes profils',
  detournements: 'Détournement vidéo',
  'a-propos': 'A propos',
};

/** Libellés courts pour les sous-menus (URLs longues ou titres à abréger) */
const SOUSMENU_LABEL_BY_URL: Record<string, string> = {
  '/portfolio-detournements': 'Portfolio',
};

function getTitreByUrl(pages: PlanPage[], url: string): string {
  const page = pages.find((p) => p.url === url);
  return page?.titre ?? url;
}

/**
 * Lit le fichier plan _Pages-Liens-Et-Menus.json.
 */
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

/**
 * Retourne les entrées du menu header résolues (avec titres depuis pages).
 * Si menus.header est absent, utilise la configuration par défaut.
 */
export function readHeaderMenu(): HeaderMenuEntry[] {
  const { pages, menus } = readPlanFile();
  const configs = menus?.header && menus.header.length > 0 ? menus.header : DEFAULT_HEADER_MENU;

  return configs.map((cfg) => {
    const label =
      cfg.label ??
      DEFAULT_MENU_LABEL_BY_ID[cfg.id] ??
      getTitreByUrl(pages, cfg.pageUrl);
    const sousMenu = cfg.sousmenuPageUrls?.map((url) => ({
      label: SOUSMENU_LABEL_BY_URL[url] ?? getTitreByUrl(pages, url),
      url,
    }));
    return {
      id: cfg.id,
      label,
      url: cfg.pageUrl,
      ...(sousMenu && sousMenu.length > 0 ? { sousMenu } : {}),
    };
  });
}

/**
 * Retourne la liste des URLs exclues du menu header (menus.exclusHeader).
 * Vide si non défini.
 */
export function readExclusHeader(): string[] {
  const { menus } = readPlanFile();
  return menus?.exclusHeader ?? [];
}
