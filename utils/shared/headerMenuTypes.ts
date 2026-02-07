/**
 * Types pour le menu header paramétrable (US-13.1).
 * Section menus du fichier _Pages-Liens-Et-Menus.json.
 */

/** Entrée du menu header : page mère + sous-pages optionnelles */
export interface HeaderMenuEntryConfig {
  id: string;
  pageUrl: string;
  /** Libellé court pour le menu (sinon dérivé du titre de la page ou des défauts) */
  label?: string;
  sousmenuPageUrls?: string[];
}

/** Entrée du menu header résolue (avec titres depuis pages) */
export interface HeaderMenuEntry {
  id: string;
  label: string;
  url: string;
  sousMenu?: { label: string; url: string }[];
}

/** Section menus du fichier plan */
export interface MenusConfig {
  header?: HeaderMenuEntryConfig[];
  exclusHeader?: string[];
}
