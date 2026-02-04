/**
 * Types partagés pour le plan du site
 * 
 * Ces types sont utilisés par :
 * - siteMapGenerator.ts (backoffice) : génération et validation
 * - assistantScenario.ts (shared) : logique de navigation E2E
 * 
 * Séparés dans un fichier dédié pour éviter que les imports de 'fs'
 * de siteMapGenerator ne soient tirés dans le bundle client.
 */

/**
 * Interface pour une Page dans le plan du site
 */
export interface PlanPage {
  url: string;
  titre: string;
  x: number | null;
  y: number | null;
  numero?: number;
  dessiner?: 'Oui' | 'Non';
  e2eIDs?: string[];
  zone?: 'HomePage' | 'Profils' | 'Autres' | 'Footer' | 'Masqué';
  ordre?: number;
}

/**
 * Interface pour un Lien dans le plan du site
 */
export interface PlanLien {
  source: string;
  destination: string;
  sourceSide?: 'Haut' | 'Bas' | 'Droite' | 'Gauche';
  destinationSide?: 'Haut' | 'Bas' | 'Droite' | 'Gauche';
  label?: string;
  e2eID?: string;
}

/**
 * Interface pour le plan du site complet
 */
export interface PlanSite {
  pages: PlanPage[];
  liens: PlanLien[];
}
