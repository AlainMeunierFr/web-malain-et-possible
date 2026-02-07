/**
 * Constantes pour les e2eID statiques
 * Utilisé pour les éléments interactifs qui ne proviennent pas de JSON
 */

export const E2E_IDS = {
  header: {
    logo: 'h1',
    photo: 'h2',
  },
  footer: {
    /** US-13.1 : bouton logo (sans action) */
    logo: 'b46',
  },
  /** Page 404 : boutons codés en dur (même convention lettre + numéro que footer b9–b15) */
  notFound: {
    accueil: 'b16',
    planDuSite: 'b17',
  },
} as const;
