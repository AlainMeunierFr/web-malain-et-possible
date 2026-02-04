/**
 * Fonctions utilitaires pour l'API Vitrine
 * US-12.6 - Exposition API Vitrine via Swagger
 */

/**
 * Type pour les erreurs API
 */
export interface ApiError {
  error: string;
  hint?: string;
}

/**
 * Type pour le résultat de validation du mode
 */
export interface ModeValidationResult {
  valid: boolean;
  error?: ApiError;
}

/**
 * Modes valides pour l'API Vitrine
 */
export type ApiMode = 'refs' | 'full';

const VALID_MODES: readonly string[] = ['refs', 'full'];

/**
 * Valide le paramètre mode de l'API
 * @param mode - La valeur du paramètre mode (peut être null, vide ou invalide)
 * @returns Résultat de validation avec erreur si invalide
 */
export function validateModeParameter(mode: string | null): ModeValidationResult {
  // Mode manquant ou vide
  if (mode === null || mode === '') {
    return {
      valid: false,
      error: {
        error: 'Missing required parameter: mode',
        hint: 'Use ?mode=refs or ?mode=full',
      },
    };
  }

  // Mode invalide
  if (!VALID_MODES.includes(mode)) {
    return {
      valid: false,
      error: {
        error: `Invalid mode parameter: ${mode}`,
        hint: 'Use ?mode=refs or ?mode=full',
      },
    };
  }

  // Mode valide
  return { valid: true };
}

/**
 * Convertit un objet en mode "refs" en extrayant les clés étrangères (slugs/ids)
 * d'un champ qui contient un tableau d'objets.
 *
 * @param data - L'objet contenant le champ à convertir
 * @param fkField - Le nom du champ contenant le tableau d'objets (ex: 'domaines', 'competences')
 * @param keyField - Le nom de la propriété à extraire de chaque objet (ex: 'slug', 'id')
 * @returns Une copie de l'objet avec le champ FK converti en tableau de strings
 */
export function convertToRefs<T extends Record<string, unknown>>(
  data: T,
  fkField: string,
  keyField: string,
): T {
  // Si le champ n'existe pas, retourner l'objet tel quel
  if (!(fkField in data)) {
    return data;
  }

  const fieldValue = data[fkField];

  // Si le champ n'est pas un tableau, retourner l'objet tel quel
  if (!Array.isArray(fieldValue)) {
    return data;
  }

  // Si le tableau est vide ou contient déjà des strings, retourner tel quel
  if (fieldValue.length === 0) {
    return data;
  }

  // Si le premier élément est déjà une string, le tableau est déjà en mode refs
  if (typeof fieldValue[0] === 'string') {
    return data;
  }

  // Extraire les clés de chaque objet
  const refs = fieldValue.map((item) => {
    if (typeof item === 'object' && item !== null && keyField in item) {
      return String(item[keyField]);
    }
    return '';
  });

  return {
    ...data,
    [fkField]: refs,
  };
}
