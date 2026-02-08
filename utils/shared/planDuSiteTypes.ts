/**
 * Types partagés pour le plan du site
 * 
 * Ces types sont utilisés par :
 * - siteMapGenerator.ts (backoffice) : génération et validation
 * - parcours-complet-liens.spec.ts (E2E) : tests de navigation dynamiques
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
  /** e2eID fourni par le mapping (plan-du-site.json) pour ListeDesPages */
  e2eID?: string;
  e2eIDs?: string[];
  zone?: 'HomePage' | 'Profils' | 'Autres' | 'Footer' | 'Masqué';
  ordre?: number;
}

/**
 * Types d'éléments cliquables (basés sur les types métier du contenu)
 */
export type TypeElementCliquable = 
  | 'Hero.CallToAction'
  | 'Hero.EnSavoirPlus'
  | 'Hero.Video'
  | 'Competence'
  | 'CallToAction'
  | 'Profil'
  | 'LienPage'
  | 'Video'
  | 'Footer.Bouton'
  | 'Header.Logo'
  | 'Header.Photo';

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
  /** Type métier de l'élément cliquable */
  typeElement?: TypeElementCliquable;
}

/**
 * Interface pour le plan du site complet
 */
export interface PlanSite {
  pages: PlanPage[];
  liens: PlanLien[];
}

/** URL de la page d'accueil (pour maintenance / plan du site). */
export function pageAccueil(): string {
  return '/';
}

/** Retourne la liste initiale des liens à parcourir (tous les liens du plan). */
export function getLiensAParcourirInitial(plan: PlanSite): PlanLien[] {
  return plan?.liens ?? [];
}

/** Liens dont la source est la page courante. */
export function getPagesAccessiblesDepuis(page: string, liens: PlanLien[]): PlanLien[] {
  return (liens ?? []).filter((l) => l.source === page);
}

/** Retire un lien de la liste (par source/destination). */
export function retirerLienUtilise(prev: PlanLien[], link: PlanLien): PlanLien[] {
  return prev.filter(
    (l) => !(l.source === link.source && l.destination === link.destination)
  );
}
