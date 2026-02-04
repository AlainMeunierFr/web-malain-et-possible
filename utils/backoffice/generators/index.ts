/**
 * Barrel export pour le sous-domaine generators (BackOffice)
 */

// Site Hierarchy Generator
export {
  buildHierarchyTree,
  renderHierarchyToAscii,
  generateHierarchyMarkdown,
} from './siteHierarchyGenerator';

export type {
  TreeContainer,
  TreeLeaf,
  TreeNode,
} from './siteHierarchyGenerator';

// Site Map Generator
export {
  detecterPages,
  getLiensFromE2eIdInventory,
  detecterLiensInternes,
  mettreAJourPlanJSON,
  injecterPagesDansPlanDuSiteJson,
  validerEmplacements,
} from './siteMapGenerator';

export type {
  PlanPage,
  PlanLien,
  PlanSite,
} from './siteMapGenerator';
