/**
 * Backend pur : Inventaire de tous les e2eID
 * Liste tous les e2eID existants dans le projet (JSON + React + constantes)
 */

import fs from 'fs';
import path from 'path';
import { E2E_IDS } from '../constants/e2eIds';

export interface E2eIdInventoryItem {
  e2eID: string;
  source: 'json' | 'react' | 'constant';
  file: string;
  path?: string; // Pour JSON
  line?: number; // Pour React
  type: string;
  description?: string;
}

/**
 * Extrait tous les e2eID des fichiers JSON
 */
function extractE2eIdsFromJson(): E2eIdInventoryItem[] {
  const inventory: E2eIdInventoryItem[] = [];
  const dataDir = path.join(process.cwd(), 'data');

  if (!fs.existsSync(dataDir)) {
    return inventory;
  }

  const files = fs.readdirSync(dataDir);
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  // Fichiers à ignorer (les fichiers avec préfixe _ sont automatiquement ignorés)
  const ignoredFiles = new Set([
    '_Pages-Et-Lien.json',
    'plan-du-site.json',
    '_motdepasse.json',
    '_footerButtons.json',
    '_metrics.json',
    '_temoignages.json',
  ]);

  for (const jsonFile of jsonFiles) {
    // Ignorer les fichiers avec préfixe _ (fichiers de configuration)
    if (jsonFile.startsWith('_') || ignoredFiles.has(jsonFile)) {
      continue;
    }

    try {
      const filePath = path.join(dataDir, jsonFile);
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);

      const traverse = (obj: any, currentPath: string): void => {
        if (typeof obj !== 'object' || obj === null) {
          return;
        }

        // Si l'objet a un e2eID
        if (typeof obj.e2eID === 'string') {
          let type = 'unknown';
          if (obj.type === 'video') type = 'video';
          else if (obj.type === 'callToAction') type = 'callToAction';
          else if (obj.type === 'bouton') type = 'bouton';
          else if (obj.type === 'competence' && obj.bouton) type = 'competenceBouton';

          inventory.push({
            e2eID: obj.e2eID,
            source: 'json',
            file: jsonFile,
            path: currentPath,
            type,
            description: obj.texte || obj.action || obj.url || undefined,
          });
        }

        // Parcourir récursivement
        if (Array.isArray(obj)) {
          obj.forEach((item, index) => {
            traverse(item, `${currentPath}[${index}]`);
          });
        } else if (typeof obj === 'object') {
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const newPath = currentPath === '' ? key : `${currentPath}.${key}`;
              traverse(obj[key], newPath);
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

      // Note: _footerButtons.json est ignoré car il a le préfixe _
      // Les boutons sont traités par la fonction traverse() ci-dessus si le fichier n'est pas ignoré
    } catch (error) {
      // Ignorer les erreurs de parsing
      continue;
    }
  }

  return inventory;
}

/**
 * Extrait tous les e2eID des composants React
 */
function extractE2eIdsFromReact(): E2eIdInventoryItem[] {
  const inventory: E2eIdInventoryItem[] = [];
  const componentsDir = path.join(process.cwd(), 'components');

  if (!fs.existsSync(componentsDir)) {
    return inventory;
  }

  const files = fs.readdirSync(componentsDir);
  const tsxFiles = files.filter((file) => file.endsWith('.tsx'));

  // Composants exclus (générés depuis MD)
  const excludedComponents = new Set([
    'AccordionTitle.tsx',
    'AccordionSection.tsx',
    'CourseList.tsx',
    'JournalList.tsx',
  ]);

  for (const tsxFile of tsxFiles) {
    if (excludedComponents.has(tsxFile)) {
      continue;
    }

    try {
      const filePath = path.join(componentsDir, tsxFile);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      // Rechercher data-e2eid="..." ou data-e2eid={...}
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;

        // Pattern: data-e2eid="v10" ou data-e2eid={E2E_IDS.header.logo}
        const stringMatch = line.match(/data-e2eid=["']([^"']+)["']/i);
        if (stringMatch) {
          const e2eId = stringMatch[1];
          // Exclure les e2eID "null" (non testés, modals internes, etc.)
          if (e2eId !== 'null') {
            inventory.push({
              e2eID: e2eId,
              source: 'react',
              file: tsxFile,
              line: lineNumber,
              type: 'react',
              description: line.trim().substring(0, 50),
            });
          }
        }

        // Pattern: data-e2eid={E2E_IDS.header.logo}
        const constantMatch = line.match(/data-e2eid=\{E2E_IDS\.(\w+)\.(\w+)\}/i);
        if (constantMatch) {
          const [, section, key] = constantMatch;
          const e2eId = (E2E_IDS as any)[section]?.[key];
          if (e2eId) {
            inventory.push({
              e2eID: e2eId,
              source: 'react',
              file: tsxFile,
              line: lineNumber,
              type: 'react',
              description: `Constante: ${section}.${key}`,
            });
          }
        }
      }
    } catch (error) {
      // Ignorer les erreurs de lecture
      continue;
    }
  }

  return inventory;
}

/**
 * Extrait tous les e2eID des constantes
 */
function extractE2eIdsFromConstants(): E2eIdInventoryItem[] {
  const inventory: E2eIdInventoryItem[] = [];

  // Header
  inventory.push({
    e2eID: E2E_IDS.header.logo,
    source: 'constant',
    file: 'constants/e2eIds.ts',
    type: 'header',
    description: 'Header logo',
  });

  inventory.push({
    e2eID: E2E_IDS.header.photo,
    source: 'constant',
    file: 'constants/e2eIds.ts',
    type: 'header',
    description: 'Header photo',
  });

  return inventory;
}

/**
 * Génère l'inventaire complet de tous les e2eID
 */
export function generateE2eIdInventory(): E2eIdInventoryItem[] {
  const jsonIds = extractE2eIdsFromJson();
  const reactIds = extractE2eIdsFromReact();
  const constantIds = extractE2eIdsFromConstants();

  return [...jsonIds, ...reactIds, ...constantIds];
}

/**
 * Extrait les e2eID référencés dans un fichier de test E2E
 */
export function extractE2eIdsFromTestFile(testFilePath: string): string[] {
  if (!fs.existsSync(testFilePath)) {
    return [];
  }

  const content = fs.readFileSync(testFilePath, 'utf8');
  const e2eIds: string[] = [];

  // Rechercher les patterns suivants :
  // - page.getByTestId('e2eid-v10')
  // - page.locator('[data-e2eid="v10"]')
  // - getByTestId('e2eid-v10')
  // - data-e2eid="v10"
  // - data-e2eid={E2E_IDS.header.logo}

  // Pattern 1: getByTestId('e2eid-...')
  const testIdPattern = /getByTestId\(['"]e2eid-([^'"]+)['"]\)/gi;
  let match;
  while ((match = testIdPattern.exec(content)) !== null) {
    e2eIds.push(match[1]);
  }

  // Pattern 2: [data-e2eid="..."]
  const dataAttrPattern = /\[data-e2eid=["']([^"']+)["']\]/gi;
  while ((match = dataAttrPattern.exec(content)) !== null) {
    e2eIds.push(match[1]);
  }

  // Pattern 3: data-e2eid="..." dans le code
  const inlinePattern = /data-e2eid=["']([^"']+)["']/gi;
  while ((match = inlinePattern.exec(content)) !== null) {
    e2eIds.push(match[1]);
  }

  // Pattern 4: E2E_IDS constants
  const constantPattern = /E2E_IDS\.(\w+)\.(\w+)/gi;
  while ((match = constantPattern.exec(content)) !== null) {
    const [, section, key] = match;
    const e2eId = (E2E_IDS as any)[section]?.[key];
    if (e2eId) {
      e2eIds.push(e2eId);
    }
  }

  return [...new Set(e2eIds)]; // Dédupliquer
}
