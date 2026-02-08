/**
 * Lecteur du menu header depuis _Pages-Liens-Et-Menus.json (US-13.1).
 * Retourne les entrées du menu avec titres résolus depuis pages.
 * Pour "A propos", les sous-menus sont pilotés par menu.json (US-13.2).
 */

import fs from 'fs';
import path from 'path';
import type { PlanPage } from '../shared/planDuSiteTypes';
import type { HeaderMenuEntry, HeaderMenuEntryConfig, MenusConfig } from '../shared/headerMenuTypes';
import { readMenu } from './menuReader';
import type { LigneDeMenu } from './menuReader';
import { loadMapping, getE2eId, menuAProposKey } from '../shared/e2eIdMapping';

const PLAN_PATH = path.join('data', '_Pages-Liens-Et-Menus.json');

const A_PROPOS_BASE = '/a-propos';

/** Construit l'URL d'une ligne du menu A propos (aligné avec MenuAPropos.getHref). Exporté pour le TI et l'enrichissement e2eID. */
export function getUrlForLigneAPropos(ligne: LigneDeMenu): string {
  if (ligne.Type === 'Path') {
    return `${A_PROPOS_BASE}/${encodeURIComponent(ligne.Parametre)}`;
  }
  if (ligne.Parametre === 'openapi') return `${A_PROPOS_BASE}?view=openapi`;
  if (ligne.Parametre === 'metrics') return `${A_PROPOS_BASE}?view=metrics`;
  if (ligne.Parametre === 'charte') return `${A_PROPOS_BASE}/charte`;
  return A_PROPOS_BASE;
}

/** Configuration par défaut du menu header (CA2, US-13.2) */
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
  { id: 'a-propos', pageUrl: A_PROPOS_BASE },
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
 * Si le fichier est absent (ex. avant premier build ou exécution de update-site-map),
 * retourne des valeurs par défaut pour permettre la navigation (menu par défaut, pas de titres personnalisés).
 */
function readPlanFile(): { pages: PlanPage[]; menus?: MenusConfig } {
  const filePath = path.join(process.cwd(), PLAN_PATH.split('/').join(path.sep));
  if (!fs.existsSync(filePath)) {
    return { pages: [], menus: undefined };
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw) as { pages?: PlanPage[]; menus?: MenusConfig };
  const pages = data.pages ?? [];
  return { pages, menus: data.menus };
}

/**
 * Retourne les entrées du menu header résolues (avec titres depuis pages).
 * Si menus.header est absent, utilise la configuration par défaut.
 * Pour l'entrée "a-propos", les sous-menus sont construits depuis menu.json (US-13.2).
 */
export function readHeaderMenu(): HeaderMenuEntry[] {
  const { pages, menus } = readPlanFile();
  const configs = menus?.header && menus.header.length > 0 ? menus.header : DEFAULT_HEADER_MENU;

  return configs.map((cfg) => {
    const label =
      cfg.label ??
      DEFAULT_MENU_LABEL_BY_ID[cfg.id] ??
      getTitreByUrl(pages, cfg.pageUrl);

    let sousMenu: { label: string; url: string }[] | undefined;
    if (cfg.id === 'a-propos') {
      const lignes = readMenu();
      sousMenu =
        lignes.length > 0
          ? lignes.map((ligne) => ({
              label: ligne.Titre,
              url: getUrlForLigneAPropos(ligne),
            }))
          : [{ label: 'A propos', url: A_PROPOS_BASE }];
    } else if (cfg.sousmenuPageUrls?.length) {
      sousMenu = cfg.sousmenuPageUrls.map((url) => ({
        label: SOUSMENU_LABEL_BY_URL[url] ?? getTitreByUrl(pages, url),
        url,
      }));
    }

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

/**
 * Enrichit les lignes du menu A propos avec les e2eID canoniques (lettre + nombre) du mapping.
 * À appeler côté serveur avant de passer les lignes à MenuAPropos.
 */
export function enrichMenuLignesE2eIds(lignes: LigneDeMenu[], sourcePath: string): LigneDeMenu[] {
  const mapping = loadMapping();
  return lignes.map((ligne) => {
    const url = getUrlForLigneAPropos(ligne);
    const e2eID = getE2eId(menuAProposKey(sourcePath, url), mapping);
    return { ...ligne, ...(e2eID && { e2eID }) };
  });
}
