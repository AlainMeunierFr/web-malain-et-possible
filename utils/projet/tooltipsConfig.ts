/**
 * Utilitaires de configuration des info-bulles - Nouvelle Architecture
 * Compatible avec le système générique InfoBulle
 */

import fs from 'fs';
import path from 'path';
// Types définis directement pour éviter les problèmes d'import
export interface NiveauInterpretation {
  range: string;
  level: string;
  description: string;
  color?: string;
}

export interface InfoBulle {
  id: string;
  title: string;
  description: string;
  interpretation?: NiveauInterpretation[];
  type?: 'metric' | 'concept' | 'help';
}

export interface ConfigurationInfoBulles {
  page: string;
  version: string;
  description?: string;
  infoBulles: InfoBulle[];
}

export type MapInfoBulles = Record<string, InfoBulle>;

export const creerMapInfoBulles = (config: ConfigurationInfoBulles): MapInfoBulles => {
  return config.infoBulles.reduce((map, infoBulle) => {
    map[infoBulle.id] = infoBulle;
    return map;
  }, {} as MapInfoBulles);
};

// Types exportés directement - plus besoin de réexport

// Cache pour éviter les lectures répétées du fichier
let _cachedConfig: ConfigurationInfoBulles | null = null;
let _cachedMap: MapInfoBulles | null = null;

/**
 * Charge la configuration des info-bulles depuis metrics.json
 * Utilise un cache pour les appels répétés
 */
export const loadInfoBullesConfig = (): ConfigurationInfoBulles => {
  if (_cachedConfig) {
    return _cachedConfig;
  }

  try {
    const configPath = path.resolve(process.cwd(), 'data/_metrics.json');
    const configContent = fs.readFileSync(configPath, 'utf8');
    _cachedConfig = JSON.parse(configContent);
    
    return _cachedConfig!;
  } catch (error) {
    console.error('Erreur lors du chargement de la configuration des info-bulles:', error);
    throw new Error(`Impossible de charger la configuration des info-bulles: ${error}`);
  }
};

/**
 * Fonction legacy pour compatibilité avec l'ancien code
 * @deprecated Utiliser loadInfoBullesConfig() à la place
 */
export const loadTooltipsConfig = (): MapInfoBulles => {
  const config = loadInfoBullesConfig();
  if (!_cachedMap) {
    _cachedMap = creerMapInfoBulles(config);
  }
  return _cachedMap;
};

/**
 * Récupère la configuration d'une métrique spécifique
 */
export const getTooltipConfig = (metricKey: string): InfoBulle | null => {
  try {
    const config = loadTooltipsConfig();
    return config[metricKey] || null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la config pour ${metricKey}:`, error);
    return null;
  }
};

/**
 * Vérifie si une métrique a une configuration tooltip disponible
 */
export const hasTooltipConfig = (metricKey: string): boolean => {
  try {
    const config = loadTooltipsConfig();
    return config.hasOwnProperty(metricKey);
  } catch (error) {
    console.error(`Erreur lors de la vérification de la config pour ${metricKey}:`, error);
    return false;
  }
};

/**
 * Récupère toutes les clés de métriques configurées
 */
export const getAvailableMetrics = (): string[] => {
  try {
    const config = loadTooltipsConfig();
    return Object.keys(config);
  } catch (error) {
    console.error('Erreur lors de la récupération des métriques disponibles:', error);
    return [];
  }
};

/**
 * Valide la structure d'une info-bulle
 */
export const validateInfoBulle = (infoBulle: any): infoBulle is InfoBulle => {
  if (!infoBulle || typeof infoBulle !== 'object') {
    return false;
  }

  // Vérifier les champs obligatoires
  if (typeof infoBulle.id !== 'string' || infoBulle.id.length === 0) {
    return false;
  }

  if (typeof infoBulle.title !== 'string' || infoBulle.title.length === 0) {
    return false;
  }

  if (typeof infoBulle.description !== 'string' || infoBulle.description.length === 0) {
    return false;
  }

  // Vérifier les interprétations (optionnelles)
  if (infoBulle.interpretation && Array.isArray(infoBulle.interpretation)) {
    return infoBulle.interpretation.every((item: any) => {
      return (
        typeof item === 'object' &&
        typeof item.range === 'string' &&
        typeof item.level === 'string' &&
        typeof item.description === 'string'
      );
    });
  }

  return true;
};

/**
 * Fonction legacy pour compatibilité
 * @deprecated Utiliser validateInfoBulle() à la place
 */
export const validateMetricConfig = validateInfoBulle;

/**
 * Vide le cache (utile pour les tests ou rechargement)
 */
export const clearTooltipsCache = (): void => {
  _cachedConfig = null;
  _cachedMap = null;
};

/**
 * Valide toute la configuration chargée
 */
export const validateInfoBullesConfig = (): boolean => {
  try {
    const config = loadInfoBullesConfig();
    
    // Vérifier la structure de base
    if (!config.page || !config.infoBulles || !Array.isArray(config.infoBulles)) {
      console.error('Configuration invalide: structure de base manquante');
      return false;
    }

    // Valider chaque info-bulle
    for (const infoBulle of config.infoBulles) {
      if (!validateInfoBulle(infoBulle)) {
        console.error(`Info-bulle invalide: ${(infoBulle as any)?.id || 'inconnue'}`);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la validation de la configuration:', error);
    return false;
  }
};

/**
 * Fonction legacy pour compatibilité
 * @deprecated Utiliser validateInfoBullesConfig() à la place
 */
export const validateTooltipsConfig = (): boolean => {
  return validateInfoBullesConfig();
};
