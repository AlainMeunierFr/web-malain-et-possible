/**
 * Backend pur : lecture du fichier menu.json pour la page "A propos de ce site" (US-11.3).
 * Expose les lignes de menu (Titre, Numéro, Type, Parametre) triées par Numéro.
 */

import fs from 'fs';
import path from 'path';

/** Ligne de menu telle que définie dans data/A propos de ce site/menu.json */
export interface LigneDeMenu {
  Titre: string;
  Numéro: number;
  Type: 'Path' | 'container';
  Parametre: string;
  /** Identifiant E2E (optionnel). Si présent, le TI peut attribuer un ID automatiquement. */
  e2eID?: string | null;
}

const MENU_RELATIVE_PATH = path.join('data', 'A propos de ce site', 'menu.json');

/**
 * Lit le fichier menu.json et retourne les lignes de menu triées par Numéro.
 * @throws Si le fichier est absent ou si le JSON est invalide
 */
export function readMenu(): LigneDeMenu[] {
  const menuPath = path.join(process.cwd(), MENU_RELATIVE_PATH);
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
