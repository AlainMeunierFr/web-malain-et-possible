/**
 * Logique métier de l'assistant graphique de construction de scénario E2E
 * US-Assistant-Scenario : listes "Liens à parcourir", "pages accessibles depuis la page courante", "Chemin parcouru"
 * Réutilise les types et la logique du plan du site (siteMapGenerator / _Pages-Liens-Et-Menus.json).
 */

import type { PlanPage, PlanLien, PlanSite } from './planDuSiteTypes';

/**
 * Pages avec zone "Masqué" (sauf Plan du site) : exclues du scénario de navigation.
 * Plan du site (/plan-du-site) reste la cible de navigation et n'est pas exclu.
 */
export function getPagesExclues(pages: { url: string; zone?: string }[]): string[] {
  return (pages || []).filter((p) => p.zone === 'Masqué' && p.url !== '/plan-du-site').map((p) => p.url);
}

/**
 * Destinations "toujours accessibles" (footer + logo) : dérivées du plan, pas hardcodées.
 * Une destination est considérée comme telle si elle est liée depuis au moins (nb pages - 1) sources différentes
 * (footer et logo étant sur toutes les pages). Ainsi, un nouveau bouton dans _footerButtons.json sera pris en compte.
 */
function getDestinationsToujoursAccessibles(plan: PlanSite): Set<string> {
  const nbPages = plan.pages.length;
  if (nbPages <= 1) return new Set();
  const seuil = nbPages - 1;
  const nbSourcesParDestination = new Map<string, Set<string>>();
  for (const l of plan.liens) {
    let sources = nbSourcesParDestination.get(l.destination);
    if (!sources) {
      sources = new Set();
      nbSourcesParDestination.set(l.destination, sources);
    }
    sources.add(l.source);
  }
  const result = new Set<string>();
  for (const [dest, sources] of nbSourcesParDestination) {
    if (sources.size >= seuil) result.add(dest);
  }
  return result;
}

/**
 * Liste initiale "Liens à parcourir" : liens du plan dont la source et la destination
 * ne sont pas dans les pages exclues (zone Masqué sauf /plan-du-site).
 * Pour les destinations toujours accessibles (footer/logo, dérivées du plan), au plus un lien par destination.
 */
export function getLiensAParcourirInitial(plan: PlanSite): PlanLien[] {
  const exclues = getPagesExclues(plan.pages);
  const liensFiltres = plan.liens.filter(
    (l) => !exclues.includes(l.source) && !exclues.includes(l.destination)
  );
  const destinationsToujoursAccessibles = getDestinationsToujoursAccessibles(plan);
  const vusDestinations = new Set<string>();
  return liensFiltres.filter((l) => {
    if (destinationsToujoursAccessibles.has(l.destination)) {
      if (vusDestinations.has(l.destination)) return false;
      vusDestinations.add(l.destination);
    }
    return true;
  });
}

/**
 * Pages accessibles depuis la page courante (liens dont la source est pageCourante).
 * Utilisé pour afficher en BleuClair les pages cliquables.
 */
export function getPagesAccessiblesDepuis(pageCourante: string, liens: PlanLien[]): PlanLien[] {
  return liens.filter((l) => l.source === pageCourante);
}

/**
 * Retire un lien utilisé du parcours (liste "Liens à parcourir").
 * Compare par source et destination. Retourne une nouvelle liste (immuable).
 */
export function retirerLienUtilise(liensAParcourir: PlanLien[], lienUtilise: PlanLien): PlanLien[] {
  return liensAParcourir.filter(
    (l) => !(l.source === lienUtilise.source && l.destination === lienUtilise.destination)
  );
}

/** URL de la page d'accueil (page courante initiale dans l'assistant). */
export function pageAccueil(): string {
  return '/';
}
