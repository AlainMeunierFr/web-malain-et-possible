/**
 * Détection d'environnement (production vs développement)
 * US-Assistant-Scenario : B1 - Le système distingue l'environnement de production et de développement
 * Utilisé pour afficher l'assistant graphique (Maintenance) sans mot de passe en dev, avec mot de passe en prod.
 */

/**
 * Retourne true si l'environnement est la production (NODE_ENV === 'production').
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Retourne true si l'environnement est le développement (NODE_ENV !== 'production').
 * En test (NODE_ENV === 'test'), considéré comme développement pour l'accès à l'assistant.
 */
export function isDevelopment(): boolean {
  return !isProduction();
}
