/**
 * Backend pur : Génération automatique des e2eID après arbitrage
 * Lit e2e-ids-pending.json et génère les e2eID selon les actions définies
 */

import fs from 'fs';
import path from 'path';
import { getNextAvailableId, calculateMaxCounter } from './e2eIdCounter';
import { detectMissingE2eIds, generateAuditFile } from './e2eIdDetector';
import type { DetectionItem } from './e2eIdDetector';

interface AuditFile {
  _instructions?: any;
  metadata: {
    compteurMax: number;
    prochainIdLibre: number;
    dateGeneration: string;
  };
  json: DetectionItem[];
  react: DetectionItem[];
}

/**
 * Génère un e2eID selon le type d'élément
 */
function generateE2eId(elementType: string, counter: number): string {
  const prefixes: Record<string, string> = {
    video: 'v',
    callToAction: 'a',
    bouton: 'b',
    competenceBouton: 'c',
    link: 'l',
    button: 'b',
    image: 'h',
    header: 'h',
    NOUVEAU_TYPE_INTERACTIF: 'x',
  };
  const prefix = prefixes[elementType] || 'x';
  return `${prefix}${counter}`;
}

/**
 * Met à jour un fichier JSON avec un e2eID
 */
function updateJsonFile(
  filePath: string,
  jsonPath: string,
  e2eId: string | null
): void {
  const fullPath = path.join(process.cwd(), 'data', filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Fichier JSON non trouvé: ${filePath}`);
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const data = JSON.parse(content);

  // Parser le chemin (ex: "contenu[2]" ou "boutons[0]" ou "competences[0].bouton")
  const pathParts = jsonPath.split('.');
  let current: any = data;

  // Naviguer jusqu'à l'élément cible
  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
    
    if (arrayMatch) {
      const [, key, indexStr] = arrayMatch;
      const index = parseInt(indexStr, 10);
      
      if (!current[key] || !Array.isArray(current[key])) {
        throw new Error(`Chemin invalide: ${key} n'est pas un tableau dans ${jsonPath}`);
      }
      
      if (i === pathParts.length - 1) {
        // Dernier élément : modifier directement
        current[key][index].e2eID = e2eId;
        break;
      } else {
        // Continuer la navigation
        current = current[key][index];
      }
    } else {
      // Pas un tableau, navigation simple
      if (i === pathParts.length - 1) {
        // Dernier élément : modifier directement
        current[part].e2eID = e2eId;
        break;
      } else {
        current = current[part];
      }
    }
  }

  // Écrire le fichier
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Met à jour un fichier React avec un data-e2eid
 */
function updateReactFile(
  filePath: string,
  lineNumber: number,
  e2eId: string | null
): void {
  const fullPath = path.join(process.cwd(), 'components', filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Fichier React non trouvé: ${filePath}`);
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  // Trouver la ligne avec l'élément interactif
  const targetLineIndex = lineNumber - 1;
  if (targetLineIndex < 0 || targetLineIndex >= lines.length) {
    throw new Error(`Ligne ${lineNumber} non trouvée dans ${filePath}`);
  }

  // Chercher où insérer data-e2eid
  // L'élément peut être sur plusieurs lignes
  let insertLineIndex = targetLineIndex;
  let foundOpeningTag = false;

  // Chercher la ligne avec l'ouverture de la balise
  for (let i = targetLineIndex; i < Math.min(targetLineIndex + 5, lines.length); i++) {
    if (/<[a-zA-Z]/.test(lines[i])) {
      insertLineIndex = i;
      foundOpeningTag = true;
      break;
    }
  }

  if (!foundOpeningTag) {
    throw new Error(`Balise ouvrante non trouvée à la ligne ${lineNumber} dans ${filePath}`);
  }

  // Vérifier si data-e2eid existe déjà
  for (let i = insertLineIndex; i < Math.min(insertLineIndex + 5, lines.length); i++) {
    if (/data-e2eid/i.test(lines[i])) {
      // Remplacer l'existant
      lines[i] = lines[i].replace(
        /data-e2eid=["'][^"']*["']/i,
        e2eId !== null ? `data-e2eid="${e2eId}"` : `data-e2eid={null}`
      );
      fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
      return;
    }
    // Si on trouve la fermeture, arrêter
    if (lines[i].includes('>') || lines[i].includes('/>')) {
      break;
    }
  }

  // Insérer data-e2eid avant la fermeture de la balise
  const targetLine = lines[insertLineIndex];
  if (targetLine.includes('>') || targetLine.includes('/>')) {
    // Balise sur une seule ligne
    if (e2eId !== null) {
      lines[insertLineIndex] = targetLine.replace(
        /(\s*)(\/?>)/,
        `$1data-e2eid="${e2eId}"$2`
      );
    } else {
      lines[insertLineIndex] = targetLine.replace(
        /(\s*)(\/?>)/,
        `$1data-e2eid={null}$2`
      );
    }
  } else {
    // Balise sur plusieurs lignes, insérer avant la fermeture
    for (let i = insertLineIndex + 1; i < Math.min(insertLineIndex + 10, lines.length); i++) {
      if (lines[i].includes('>') || lines[i].includes('/>')) {
        const indent = lines[i].match(/^(\s*)/)?.[1] || '';
        if (e2eId !== null) {
          lines.splice(i, 0, `${indent}data-e2eid="${e2eId}"`);
        } else {
          lines.splice(i, 0, `${indent}data-e2eid={null}`);
        }
        break;
      }
    }
  }

  fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
}

/**
 * Génère les e2eID selon les actions définies dans e2e-ids-pending.json
 * @returns true si la génération a réussi, false sinon
 */
export function generateE2eIdsFromAudit(): {
  success: boolean;
  generated: number;
  excluded: number;
  errors: string[];
} {
  const auditPath = path.join(process.cwd(), 'e2e-ids-pending.json');

  if (!fs.existsSync(auditPath)) {
    return {
      success: true,
      generated: 0,
      excluded: 0,
      errors: [],
    };
  }

  const auditContent = fs.readFileSync(auditPath, 'utf8');
  const audit: AuditFile = JSON.parse(auditContent);

  let currentCounter = audit.metadata.compteurMax;
  let generated = 0;
  let excluded = 0;
  const errors: string[] = [];

  // Traiter les éléments JSON
  for (const item of audit.json) {
    if (item.action === 'add') {
      currentCounter++;
      const e2eId = generateE2eId(item.type, currentCounter);
      try {
        updateJsonFile(item.file, item.path, e2eId);
        generated++;
      } catch (error) {
        errors.push(`JSON ${item.file} → ${item.path}: ${error instanceof Error ? error.message : String(error)}`);
      }
    } else if (item.action === 'null') {
      try {
        updateJsonFile(item.file, item.path, null);
        excluded++;
      } catch (error) {
        errors.push(`JSON ${item.file} → ${item.path}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    // Si action === '', on ignore (non arbitré)
  }

  // Traiter les éléments React
  for (const item of audit.react) {
    if (item.action === 'add') {
      currentCounter++;
      const e2eId = generateE2eId(item.type, currentCounter);
      try {
        if (item.line) {
          updateReactFile(item.file, item.line, e2eId);
          generated++;
        }
      } catch (error) {
        errors.push(`React ${item.file} → ligne ${item.line}: ${error instanceof Error ? error.message : String(error)}`);
      }
    } else if (item.action === 'null') {
      try {
        if (item.line) {
          updateReactFile(item.file, item.line, null);
          excluded++;
        }
      } catch (error) {
        errors.push(`React ${item.file} → ligne ${item.line}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    // Si action === '', on ignore (non arbitré)
  }

  // Vérifier s'il reste des éléments non arbitrés
  const hasUnresolved = audit.json.some((item) => item.action === '') ||
    audit.react.some((item) => item.action === '');

  // Relancer la détection pour vérifier qu'il n'y a plus d'erreurs
  // (seulement si tous les éléments ont été arbitrés)
  if (errors.length === 0 && !hasUnresolved) {
    const newResult = detectMissingE2eIds();
    const newAuditFile = generateAuditFile(newResult);

    if (newAuditFile === null) {
      // Plus d'erreurs, supprimer le fichier d'audit
      fs.unlinkSync(auditPath);
      return {
        success: true,
        generated,
        excluded,
        errors: [],
      };
    } else {
      // Il reste des erreurs (nouvelles détections)
      errors.push('De nouveaux éléments sans e2eID ont été détectés après la génération. Veuillez vérifier le fichier d\'audit.');
    }
  }

  // Si des éléments n'ont pas été arbitrés, ce n'est pas une erreur
  // (ils seront traités lors du prochain arbitrage)
  // On retourne success si la génération s'est bien passée (pas d'erreurs techniques)
  return {
    success: errors.length === 0,
    generated,
    excluded,
    errors,
  };
}
