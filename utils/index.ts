/**
 * Index principal - CLIENT-SAFE uniquement
 * 
 * ⚠️  IMPORTANT : Ce barrel n'exporte que les modules qui n'utilisent pas 'fs'
 * Pour les modules serveur-only, importer directement depuis :
 * - './vitrine/pageReader', './vitrine/menuReader', etc.
 * - './projet/journalReader', './projet/sprintBoardReader', etc.
 * - './backoffice' (tout le domaine)
 * 
 * Structure des Bounded Contexts :
 * - vitrine/ : Domaine "Site Vitrine" (pages, profils, bibliothèque)
 * - projet/ : Domaine "Le Projet" (journaux, sprints, about)
 * - backoffice/ : Domaine "Back-Office" (génération, intégrité, E2E)
 * - shared/ : Transversal (markdown, environnement, e2eIdFromUrl)
 */

// Réexporte le barrel client-safe
export * from './client';
