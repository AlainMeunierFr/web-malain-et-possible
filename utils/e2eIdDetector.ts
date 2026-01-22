/**
 * Backend pur : Détection des éléments sans e2eID
 * Détecte les éléments interactifs dans les JSON et React qui n'ont pas d'e2eID
 */

import fs from 'fs';
import path from 'path';
import { calculateMaxCounter } from './e2eIdCounter';

// Types connus qui DOIVENT avoir un e2eID
const TYPES_INTERACTIFS_CONNUS = new Set([
  'video',
  'callToAction',
  'groupeBoutons',
  'domaineDeCompetence',
]);

// Types connus qui N'ONT PAS besoin d'e2eID (non interactifs)
const TYPES_NON_INTERACTIFS = new Set([
  'titre',
  'texteLarge',
  'competence', // le type lui-même, pas son bouton
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

// Fichiers JSON à ignorer (configuration, pas de contenu interactif)
const FICHIERS_JSON_IGNORES = new Set([
  'Pages-Et-Lien.json',
  'plan-du-site.json',
  'motdepasse.json',
]);

export interface DetectionItem {
  file: string;
  path: string;
  type: string;
  typeDetecte?: string; // Pour les nouveaux types
  proprietesInteractives?: string[]; // Pour les nouveaux types
  line?: number; // Pour React
  element?: string; // Extrait de code pour React
  description?: string; // Description lisible pour React
  action: 'add' | 'null' | ''; // '' = non affecté, 'add' = générer e2eID, 'null' = exclure
  _note?: string; // Note explicative pour l'arbitrage
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
    if (FICHIERS_JSON_IGNORES.has(jsonFile)) {
      continue;
    }

    try {
      const filePath = path.join(dataDir, jsonFile);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);

      // Fonction récursive pour parcourir le contenu
      const traverse = (
        obj: any,
        currentPath: string,
        parentType?: string
      ): void => {
        if (typeof obj !== 'object' || obj === null) {
          return;
        }

        // Vérifier si c'est un élément de contenu
        if (typeof obj.type === 'string') {
          const elementType = obj.type;

          // Types interactifs connus
          if (TYPES_INTERACTIFS_CONNUS.has(elementType)) {
            if (elementType === 'video' || elementType === 'callToAction') {
              // Ces types doivent avoir un e2eID directement
              if (!obj.e2eID) {
                  detections.push({
                    file: jsonFile,
                    path: currentPath,
                    type: elementType,
                    action: '',
                  });
              }
            } else if (elementType === 'groupeBoutons') {
              // Les boutons dans groupeBoutons doivent avoir un e2eID
              if (Array.isArray(obj.boutons)) {
                obj.boutons.forEach((bouton: any, index: number) => {
                  if (!bouton.e2eID) {
                    detections.push({
                      file: jsonFile,
                      path: `${currentPath}.boutons[${index}]`,
                      type: 'bouton',
                      action: '',
                    });
                  }
                });
              }
            } else if (elementType === 'domaineDeCompetence') {
              // Les boutons dans les compétences doivent avoir un e2eID
              if (Array.isArray(obj.competences)) {
                obj.competences.forEach((competence: any, index: number) => {
                  if (competence.bouton && !competence.bouton.e2eID) {
                    detections.push({
                      file: jsonFile,
                      path: `${currentPath}.competences[${index}].bouton`,
                      type: 'competenceBouton',
                      action: '',
                    });
                  }
                });
              }
            }
          }
          // Types non interactifs - ignorer
          else if (TYPES_NON_INTERACTIFS.has(elementType)) {
            // Pas besoin d'e2eID
          }
          // Nouveau type détecté
          else {
            // Vérifier si l'élément a des propriétés interactives
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

        // Parcourir récursivement
        if (Array.isArray(obj)) {
          obj.forEach((item, index) => {
            traverse(item, `${currentPath}[${index}]`, parentType);
          });
        } else if (typeof obj === 'object') {
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const newPath =
                currentPath === '' ? key : `${currentPath}.${key}`;
              traverse(obj[key], newPath, obj.type);
            }
          }
        }
      };

      // Démarrer le parcours
      if (data.contenu && Array.isArray(data.contenu)) {
        data.contenu.forEach((element: any, index: number) => {
          traverse(element, `contenu[${index}]`);
        });
      }

      // Vérifier aussi footerButtons.json
      if (jsonFile === 'footerButtons.json') {
        if (data.boutons && Array.isArray(data.boutons)) {
          data.boutons.forEach((bouton: any, index: number) => {
            if (!bouton.e2eID) {
              detections.push({
                file: jsonFile,
                path: `boutons[${index}]`,
                type: 'bouton',
                action: '',
              });
            }
          });
        }
        // Nouvelle structure groupeBoutons
        if (data.type === 'groupeBoutons' && data.boutons) {
          data.boutons.forEach((bouton: any, index: number) => {
            if (!bouton.e2eID) {
              detections.push({
                file: jsonFile,
                path: `boutons[${index}]`,
                type: 'bouton',
                action: '',
              });
            }
          });
        }
      }
    } catch (error) {
      // Ignorer les erreurs de parsing
      continue;
    }
  }

  return detections;
}

/**
 * Détecte les éléments sans data-e2eid dans les composants React
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
      continue; // Ignorer les composants générés depuis MD
    }

    try {
      const filePath = path.join(componentsDir, tsxFile);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      // Détecter les éléments interactifs sans data-e2eid
      // Rechercher: <button, <Link, <Image avec onClick, role="button" avec onClick
      const patterns = [
        /<button[^>]*>/gi,
        /<Link[^>]*>/gi,
        /<Image[^>]*onClick[^>]*>/gi,
        /role=["']button["'][^>]*onClick/gi,
      ];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;

        // Vérifier si la ligne contient un élément interactif
        for (const pattern of patterns) {
          if (pattern.test(line)) {
            // Vérifier si data-e2eid est présent
            if (!/data-e2eid/i.test(line)) {
              // Vérifier aussi dans les lignes suivantes (attribut peut être sur plusieurs lignes)
              let foundE2eId = false;
              for (let j = i; j < Math.min(i + 5, lines.length); j++) {
                if (/data-e2eid/i.test(lines[j])) {
                  foundE2eId = true;
                  break;
                }
                // Si on trouve la fermeture de l'élément, arrêter
                if (lines[j].includes('>') || lines[j].includes('/>')) {
                  break;
                }
              }

              if (!foundE2eId) {
                // Déterminer le type d'élément
                let elementType = 'button';
                let description = '';
                
                if (/<Link/i.test(line)) {
                  elementType = 'link';
                  // Extraire le href pour plus de contexte
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
                  // Pour les boutons, extraire le texte si possible
                  const textMatch = line.match(/>([^<]+)</);
                  if (textMatch) {
                    description = `Button: ${textMatch[1].trim()}`;
                  } else {
                    description = 'Button';
                  }
                }

                // Vérifier si l'élément utilise une prop qui vient d'un JSON avec e2eID
                // Exemple: <Link href={competence.bouton.action} /> → le bouton a déjà un e2eID dans le JSON
                let e2eIdFromJson = false;
                let jsonSource = '';
                
                if (/competence\.bouton/i.test(line)) {
                  e2eIdFromJson = true;
                  jsonSource = 'competence.bouton (e2eID dans JSON)';
                } else if (/element\.(action|url)/i.test(line)) {
                  // CallToAction ou autres éléments qui viennent du JSON
                  e2eIdFromJson = true;
                  jsonSource = 'element (e2eID dans JSON)';
                }

                detections.push({
                  file: tsxFile,
                  path: `line ${lineNumber}`,
                  type: elementType,
                  line: lineNumber,
                  element: line.trim().substring(0, 50), // Extrait pour description
                  description: description,
                  action: e2eIdFromJson ? 'null' : '', // Si e2eID vient du JSON, suggérer 'null' par défaut
                  ...(e2eIdFromJson && { _note: `Cet élément utilise une prop du JSON (${jsonSource}). L'e2eID est déjà dans le JSON, donc mettre "null" pour exclure.` }),
                });
              }
            }
          }
        }
      }
    } catch (error) {
      // Ignorer les erreurs de lecture
      continue;
    }
  }

  return detections;
}

/**
 * Détecte tous les éléments sans e2eID
 * @returns Résultat de la détection avec métadonnées
 */
export function detectMissingE2eIds(): DetectionResult {
  const jsonDetections = detectInJsonFiles();
  const reactDetections = detectInReactFiles();

  // Calculer le compteur max
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
 * @param result Résultat de la détection
 * @returns Chemin du fichier généré, ou null si aucun élément détecté
 */
export function generateAuditFile(result: DetectionResult): string | null {
  const auditPath = path.join(process.cwd(), 'e2e-ids-pending.json');

  if (result.json.length === 0 && result.react.length === 0) {
    // Aucun élément détecté, supprimer le fichier s'il existe
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
        null: 'Exclure explicitement cet élément (mettre e2eID: null dans le code/JSON). Utiliser pour: éléments internes non testés (modals, formulaires), ou éléments dont l\'e2eID vient du JSON',
      },
      etapes: [
        '1. Pour chaque élément, modifier "action": "" → "action": "add" OU "action": "null"',
        '2. Relancer le test: npm test -- tests/integration/e2e-ids-detection.integration.test.ts',
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
