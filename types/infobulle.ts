/**
 * Types pour le système d'info-bulles génériques
 * Réutilisable sur toutes les pages du site
 */

/**
 * Niveau d'interprétation d'une métrique (optionnel)
 */
export interface NiveauInterpretation {
  range: string;        // Ex: "1-10", "11-20", "+50"
  level: string;        // Ex: "Excellente", "Modérée", "Critique"
  description: string;  // Description du niveau
  color?: string;       // Couleur associée (optionnel)
}

/**
 * Info-bulle générique réutilisable
 */
export interface InfoBulle {
  id: string;                              // Identifiant unique
  title: string;                           // Titre de l'info-bulle
  description: string;                     // Description pédagogique
  interpretation?: NiveauInterpretation[]; // Grille d'interprétation (optionnel)
  type?: 'metric' | 'concept' | 'help';    // Type d'info-bulle (optionnel)
}

/**
 * Configuration d'info-bulles pour une page
 */
export interface ConfigurationInfoBulles {
  page: string;           // Nom de la page (ex: "metrics")
  version: string;        // Version de la configuration
  description?: string;   // Description de la configuration
  infoBulles: InfoBulle[]; // Liste des info-bulles
}

/**
 * Mappage id → InfoBulle pour accès rapide
 */
export type MapInfoBulles = Record<string, InfoBulle>;

/**
 * Utilitaire pour convertir une configuration en map
 */
export const creerMapInfoBulles = (config: ConfigurationInfoBulles): MapInfoBulles => {
  return config.infoBulles.reduce((map, infoBulle) => {
    map[infoBulle.id] = infoBulle;
    return map;
  }, {} as MapInfoBulles);
};