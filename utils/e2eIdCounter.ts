/**
 * Backend pur : Calcul du compteur max des e2eID
 * Calcule le compteur global maximum en analysant tous les e2eID existants
 * (JSON + constantes statiques)
 */

import fs from 'fs';
import path from 'path';
import { E2E_IDS } from '../constants/e2eIds';

/**
 * Extrait le numéro d'un e2eID (2e caractère et suivants)
 * @param e2eId Format attendu: "v10", "b15", "h1", etc.
 * @returns Le numéro extrait, ou 0 si format invalide
 */
function extractNumberFromE2eId(e2eId: string): number {
  // Format attendu: [lettre][chiffres]
  // Exemple: "v10" → 10, "b15" → 15, "h1" → 1
  const match = e2eId.match(/^[a-z](\d+)$/);
  if (!match) {
    return 0;
  }
  return parseInt(match[1], 10);
}

/**
 * Calcule le compteur maximum global en analysant tous les e2eID
 * @returns Le compteur maximum trouvé
 */
export function calculateMaxCounter(): number {
  let maxCounter = 0;

  // 1. Analyser tous les fichiers JSON dans data/
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    return maxCounter;
  }

  const files = fs.readdirSync(dataDir);
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  // Fichiers à ignorer (configuration, pas de contenu interactif)
  const ignoredFiles = new Set([
    'Pages-Et-Lien.json',
    'plan-du-site.json',
    'motdepasse.json',
  ]);

  for (const jsonFile of jsonFiles) {
    if (ignoredFiles.has(jsonFile)) {
      continue;
    }

    try {
      const filePath = path.join(dataDir, jsonFile);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);

      // Fonction récursive pour parcourir tous les e2eID
      const traverse = (obj: any): void => {
        if (typeof obj !== 'object' || obj === null) {
          return;
        }

        // Si l'objet a un e2eID
        if (typeof obj.e2eID === 'string') {
          const num = extractNumberFromE2eId(obj.e2eID);
          if (num > maxCounter) {
            maxCounter = num;
          }
        }

        // Parcourir récursivement
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            traverse(obj[key]);
          }
        }
      };

      traverse(data);
    } catch (error) {
      // Ignorer les erreurs de parsing
      continue;
    }
  }

  // 2. Analyser les constantes statiques (Header)
  const headerLogoNum = extractNumberFromE2eId(E2E_IDS.header.logo);
  if (headerLogoNum > maxCounter) {
    maxCounter = headerLogoNum;
  }

  const headerPhotoNum = extractNumberFromE2eId(E2E_IDS.header.photo);
  if (headerPhotoNum > maxCounter) {
    maxCounter = headerPhotoNum;
  }

  return maxCounter;
}

/**
 * Retourne le prochain ID libre
 * @returns Le prochain numéro disponible
 */
export function getNextAvailableId(): number {
  return calculateMaxCounter() + 1;
}
