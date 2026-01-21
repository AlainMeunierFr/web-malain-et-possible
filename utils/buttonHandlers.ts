/**
 * Backend pur : Logique métier pour gérer les actions des boutons
 * Cette logique est réutilisable et testable en ligne de commande
 * 
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 */

import { ROUTES, COMMANDS } from '../constants/routes';

/**
 * Détermine la route associée à une commande (logique métier pure)
 * Utilisable en ligne de commande : getRouteForCommand('cmd-PlanDuSite') => '/plan-du-site'
 */
export const getRouteForCommand = (command: string): string | null => {
  const commandToRouteMap: Record<string, string> = {
    [COMMANDS.SITEMAP]: ROUTES.SITEMAP,
    [COMMANDS.ABOUT_SITE]: ROUTES.ABOUT,
    [COMMANDS.METRICS]: ROUTES.METRICS,
  };

  return commandToRouteMap[command] || null;
};

/**
 * Détermine si une commande nécessite une navigation interne (logique métier pure)
 */
export const isInternalNavigation = (command: string): boolean => {
  return getRouteForCommand(command) !== null;
};

/**
 * Détermine l'action à effectuer pour un bouton (logique métier pure)
 * Utilisable en ligne de commande pour tester la logique
 */
export type ButtonAction = 
  | { type: 'internal'; route: string }
  | { type: 'external'; url: string }
  | { type: 'alert'; message: string };

export const getButtonAction = (command: string, url: string | null): ButtonAction => {
  // Navigation interne
  const route = getRouteForCommand(command);
  if (route) {
    return { type: 'internal', route };
  }

  // Ouverture URL externe
  if (url) {
    return { type: 'external', url };
  }

  // Fallback pour les commandes non gérées
  return { type: 'alert', message: `Commande: ${command}` };
};
