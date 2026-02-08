/**
 * Backend pur : lecture du fichier menu.json pour la page "A propos" (US-11.3, US-13.2).
 * Expose les lignes de menu (Titre, Numéro, Type, Parametre) triées par Numéro.
 */

import fs from 'fs';
import path from 'path';
import { ABOUT_SITE_DATA_DIR } from '../../constants/routes';

/** Ligne de menu telle que définie dans data/<ABOUT_SITE_DATA_DIR>/menu.json */
export interface LigneDeMenu {
  Titre: string;
  Numéro: number;
  Type: 'Path' | 'container';
  Parametre: string;
  /** Identifiant E2E (optionnel). Si présent, le TI peut attribuer un ID automatiquement. */
  e2eID?: string | null;
}

const MENU_RELATIVE_PATH = path.join('data', ABOUT_SITE_DATA_DIR, 'menu.json');

/**
 * Lit le fichier menu.json et retourne les lignes de menu triées par Numéro.
 * Si le fichier est absent, retourne [] (résilient au premier run ou dossier non initialisé).
 * @throws Si le JSON est invalide
 */
export function readMenu(): LigneDeMenu[] {
  const menuPath = path.join(process.cwd(), MENU_RELATIVE_PATH);
  if (!fs.existsSync(menuPath)) {
    return [];
  }
  const raw = fs.readFileSync(menuPath, 'utf-8');
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`menu.json : JSON invalide - ${message}`);
  }
  if (!Array.isArray(data)) {
    throw new Error('menu.json : contenu attendu est un tableau');
  }
  const lignes = data as LigneDeMenu[];
  return [...lignes].sort((a, b) => (a.Numéro ?? 0) - (b.Numéro ?? 0));
}
