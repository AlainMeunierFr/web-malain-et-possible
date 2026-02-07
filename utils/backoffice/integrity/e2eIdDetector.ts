/**
 * Backend pur : Détection des éléments sans e2eID
 * Détecte les éléments interactifs dans les JSON et React qui n'ont pas d'e2eID
 *
 * Convention e2eid :
 * - e2eid="null" (chaîne) = exclusion volontaire des tests E2E (éléments clicables à ne pas intégrer aux tests)
 * - e2eid={null} ou absent = vraie valeur null, un ID doit être attribué automatiquement par l'utilitaire
 */

import fs from 'fs';
import path from 'path';
import { calculateMaxCounter } from './e2eIdCounter';

// Types connus qui DOIVENT avoir un e2eID
const TYPES_INTERACTIFS_CONNUS = new Set([
  'video',
  'callToAction',
  'groupeDeBoutons',
  'domaineDeCompetence',
]);

// Types connus qui N'ONT PAS besoin d'e2eID (non interactifs)
const TYPES_NON_INTERACTIFS = new Set([
  'titre',
  'texteLarge',
  'competence',
]);

// Propriétés qui indiquent qu'un élément est interactif
const PROPRIETES_INTERACTIVES = new Set([
  'url',
  'href',
  'action',
  'onClick',
  'command',
  'bouton',
  'urlYouTube',
  'linkedin',
]);

// Composants React générés depuis MD (Wiki) - à exclure
const COMPOSANTS_EXCLUS_MD = new Set([
  'AccordionTitle.tsx',
  'AccordionSection.tsx',
  'CourseList.tsx',
  'JournalList.tsx',
]);

// Fichiers JSON à ignorer
// Note: _footerButtons.json et les fichiers de la bibliothèque utilisent le mapping e2eID centralisé (_e2eIds-mapping.json)
const FICHIERS_JSON_IGNORES = new Set([
  '_Pages-Liens-Et-Menus.json',
  'plan-du-site.json',
  '_motdepasse.json',
  '_metrics.json',
  '_temoignages.json',
  '_footerButtons.json', // Les e2eID sont dans _e2eIds-mapping.json
  '_e2eIds-mapping.json', // Fichier de mapping lui-même
]);

export interface DetectionItem {
  file: string;
  path: string;
  type: string;
  typeDetecte?: string;
  proprietesInteractives?: string[];
  line?: number;
  element?: string;
  description?: string;
  action: 'add' | 'null' | '';
  _note?: string;
}

export interface DetectionResult {
  json: DetectionItem[];
  react: DetectionItem[];
  compteurMax: number;
  prochainIdLibre: number;
}

/**
 * Détecte les éléments sans e2eID dans les fichiers JSON
 */
function detectInJsonFiles(): DetectionItem[] {
  const detections: DetectionItem[] = [];
  const dataDir = path.join(process.cwd(), 'data');

  if (!fs.existsSync(dataDir)) {
    return detections;
  }

  const files = fs.readdirSync(dataDir);
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  for (const jsonFile of jsonFiles) {
    // Ignorer les fichiers qui commencent par _ (config) ou sont dans la liste d'exclusion
    if (jsonFile.startsWith('_') || FICHIERS_JSON_IGNORES.has(jsonFile)) {
      continue;
    }

    try {
      const filePath = path.join(dataDir, jsonFile);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);

      const traverse = (obj: any, currentPath: string, parentType?: string): void => {
        if (typeof obj !== 'object' || obj === null) {
          return;
        }

        if (typeof obj.type === 'string') {
          const elementType = obj.type;

          if (TYPES_INTERACTIFS_CONNUS.has(elementType)) {
            if (elementType === 'video' || elementType === 'callToAction') {
              if (!obj.e2eID) {
                detections.push({ file: jsonFile, path: currentPath, type: elementType, action: '' });
              }
            } else if (elementType === 'groupeDeBoutons') {
              if (Array.isArray(obj.boutons)) {
                obj.boutons.forEach((bouton: any, index: number) => {
                  if (!bouton.e2eID) {
                    detections.push({ file: jsonFile, path: `${currentPath}.boutons[${index}]`, type: 'bouton', action: '' });
                  }
                });
              }
            } else if (elementType === 'domaineDeCompetence') {
              if (Array.isArray(obj.competences)) {
                obj.competences.forEach((competence: any, index: number) => {
                  if (competence.bouton && !competence.bouton.e2eID) {
                    detections.push({ file: jsonFile, path: `${currentPath}.competences[${index}].bouton`, type: 'competenceBouton', action: '' });
                  }
                });
              }
            }
          } else if (!TYPES_NON_INTERACTIFS.has(elementType)) {
            const proprietesTrouvees: string[] = [];
            for (const prop of PROPRIETES_INTERACTIVES) {
              if (obj[prop] !== undefined && obj[prop] !== null) {
                proprietesTrouvees.push(prop);
              }
            }

            if (proprietesTrouvees.length > 0 && !obj.e2eID) {
              detections.push({
                file: jsonFile,
                path: currentPath,
                type: 'NOUVEAU_TYPE_INTERACTIF',
                typeDetecte: elementType,
                proprietesInteractives: proprietesTrouvees,
                action: '',
              });
            }
          }
        }

        if (Array.isArray(obj)) {
          obj.forEach((item, index) => {
            traverse(item, `${currentPath}[${index}]`, parentType);
          });
        } else if (typeof obj === 'object') {
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const newPath = currentPath === '' ? key : `${currentPath}.${key}`;
              traverse(obj[key], newPath, obj.type);
            }
          }
        }
      };

      if (data.contenu && Array.isArray(data.contenu)) {
        data.contenu.forEach((element: any, index: number) => {
          traverse(element, `contenu[${index}]`);
        });
      }
      // Note: _footerButtons.json est maintenant ignoré car les e2eID sont dans le mapping centralisé
    } catch (error) {
      continue;
    }
  }

  return detections;
}

/**
 * Détecte les éléments sans e2eid dans les composants React
 */
function detectInReactFiles(): DetectionItem[] {
  const detections: DetectionItem[] = [];
  const componentsDir = path.join(process.cwd(), 'components');

  if (!fs.existsSync(componentsDir)) {
    return detections;
  }

  const files = fs.readdirSync(componentsDir);
  const tsxFiles = files.filter((file) => file.endsWith('.tsx'));

  for (const tsxFile of tsxFiles) {
    if (COMPOSANTS_EXCLUS_MD.has(tsxFile)) {
      continue;
    }

    try {
      const filePath = path.join(componentsDir, tsxFile);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      const patterns = [
        /<button[^>]*>/gi,
        /<Link[^>]*>/gi,
        /<Image[^>]*onClick[^>]*>/gi,
        /role=["']button["'][^>]*onClick/gi,
      ];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;

        for (const pattern of patterns) {
          if (pattern.test(line)) {
            if (!/e2eid/i.test(line)) {
              let foundE2eId = false;
              for (let j = i; j < Math.min(i + 5, lines.length); j++) {
                if (/e2eid/i.test(lines[j])) {
                  if (/e2eid=["']null["']/i.test(lines[j])) {
                    foundE2eId = true;
                    break;
                  }
                  if (/e2eid=\{null\}/i.test(lines[j])) {
                    foundE2eId = false;
                    break;
                  }
                  foundE2eId = true;
                  break;
                }
                if (lines[j].includes('>') || lines[j].includes('/>')) {
                  break;
                }
              }

              if (!foundE2eId) {
                let elementType = 'button';
                let description = '';
                
                if (/<Link/i.test(line)) {
                  elementType = 'link';
                  const hrefMatch = line.match(/href=["']([^"']+)["']/);
                  if (hrefMatch) {
                    description = `Link vers: ${hrefMatch[1]}`;
                  } else {
                    description = 'Link (href dynamique)';
                  }
                } else if (/<Image/i.test(line)) {
                  elementType = 'image';
                  description = 'Image cliquable (Header)';
                } else {
                  const textMatch = line.match(/>([^<]+)</);
                  if (textMatch) {
                    description = `Button: ${textMatch[1].trim()}`;
                  } else {
                    description = 'Button';
                  }
                }

                let e2eIdFromJson = false;
                let jsonSource = '';
                
                if (/competence\.bouton/i.test(line)) {
                  e2eIdFromJson = true;
                  jsonSource = 'competence.bouton (e2eID dans JSON)';
                } else if (/element\.(action|url)/i.test(line)) {
                  e2eIdFromJson = true;
                  jsonSource = 'element (e2eID dans JSON)';
                }

                detections.push({
                  file: tsxFile,
                  path: `line ${lineNumber}`,
                  type: elementType,
                  line: lineNumber,
                  element: line.trim().substring(0, 50),
                  description: description,
                  action: e2eIdFromJson ? 'null' : '',
                  ...(e2eIdFromJson && { _note: `Cet élément utilise une prop du JSON (${jsonSource}). L'e2eID est déjà dans le JSON, donc mettre "null" pour exclure.` }),
                });
              }
            }
          }
        }
      }
    } catch (error) {
      continue;
    }
  }

  return detections;
}

/**
 * Détecte tous les éléments sans e2eID
 */
export function detectMissingE2eIds(): DetectionResult {
  const jsonDetections = detectInJsonFiles();
  const reactDetections = detectInReactFiles();

  const compteurMax = calculateMaxCounter();
  const prochainIdLibre = compteurMax + 1;

  return {
    json: jsonDetections,
    react: reactDetections,
    compteurMax,
    prochainIdLibre,
  };
}

/**
 * Génère le fichier d'audit temporaire e2e-ids-pending.json
 */
export function generateAuditFile(result: DetectionResult): string | null {
  const auditPath = path.join(process.cwd(), 'e2e-ids-pending.json');

  if (result.json.length === 0 && result.react.length === 0) {
    if (fs.existsSync(auditPath)) {
      fs.unlinkSync(auditPath);
    }
    return null;
  }

  const auditData = {
    _instructions: {
      comment: 'Ce fichier liste les éléments interactifs sans e2eID détectés automatiquement.',
      actions: {
        '': 'Non affecté (valeur par défaut) - À modifier en "add" ou "null"',
        add: 'Générer automatiquement un e2eID pour cet élément (recommandé pour les éléments à tester)',
        null: 'Exclure explicitement cet élément (mettre e2eID: null dans le code/JSON).',
      },
      etapes: [
        '1. Pour chaque élément, modifier "action": "" → "action": "add" OU "action": "null"',
        '2. Relancer le test',
        '3. Le système générera automatiquement les e2eID pour les éléments avec "add"',
        '4. Le fichier sera supprimé automatiquement quand tous les éléments sont traités',
      ],
    },
    metadata: {
      compteurMax: result.compteurMax,
      prochainIdLibre: result.prochainIdLibre,
      dateGeneration: new Date().toISOString(),
    },
    json: result.json,
    react: result.react,
  };

  fs.writeFileSync(auditPath, JSON.stringify(auditData, null, 2), 'utf8');
  return auditPath;
}
