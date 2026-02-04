/**
 * Synchronise la configuration IA (.cursor/) vers data/A propos de ce site/.
 * 
 * Synchronise :
 * - .cursor/agents/*.md → data/A propos de ce site/Configuration IA/Agents/
 * - .cursor/rules/*.mdc → data/A propos de ce site/Configuration IA/Rules/
 * - agents.json (id/label pour le board Kanban)
 * 
 * Exécuté uniquement en environnement de développement.
 * Utilisé par "npm run dev" pour mettre à jour la config avant de lancer Next.js.
 */

import fs from 'fs';
import path from 'path';
import { isDevelopment } from '../utils/client';
import { readAgentsFromCursorAgents } from '../utils/server';

const DATA_DIR = path.join(process.cwd(), 'data', 'A propos de ce site');
const CONFIG_IA_DIR = path.join(DATA_DIR, 'Configuration IA');
const AGENTS_DEST_DIR = path.join(CONFIG_IA_DIR, 'Agents');
const RULES_DEST_DIR = path.join(CONFIG_IA_DIR, 'Rules');
const AGENTS_JSON_PATH = path.join(DATA_DIR, 'agents.json');

const CURSOR_AGENTS_DIR = path.join(process.cwd(), '.cursor', 'agents');
const CURSOR_RULES_DIR = path.join(process.cwd(), '.cursor', 'rules');

/**
 * Copie tous les fichiers d'un dossier source vers un dossier destination.
 * Crée le dossier destination si nécessaire.
 */
function syncDirectory(srcDir: string, destDir: string, extension: string): void {
  if (!fs.existsSync(srcDir)) {
    return;
  }
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Supprimer les anciens fichiers du dossier destination
  const existingFiles = fs.readdirSync(destDir);
  for (const file of existingFiles) {
    fs.unlinkSync(path.join(destDir, file));
  }
  
  // Copier les nouveaux fichiers
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(extension)) {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main(): void {
  if (!isDevelopment()) {
    return;
  }
  
  // Créer les dossiers si nécessaire
  if (!fs.existsSync(CONFIG_IA_DIR)) {
    fs.mkdirSync(CONFIG_IA_DIR, { recursive: true });
  }
  
  // Synchroniser les agents (.md)
  syncDirectory(CURSOR_AGENTS_DIR, AGENTS_DEST_DIR, '.md');
  
  // Synchroniser les rules (.mdc)
  syncDirectory(CURSOR_RULES_DIR, RULES_DEST_DIR, '.mdc');
  
  // Générer agents.json (pour le board Kanban)
  const agents = readAgentsFromCursorAgents();
  fs.writeFileSync(AGENTS_JSON_PATH, JSON.stringify(agents, null, 2), 'utf8');
  
  console.log('✅ Configuration IA synchronisée');
  console.log(`   - Agents: ${AGENTS_DEST_DIR}`);
  console.log(`   - Rules: ${RULES_DEST_DIR}`);
  console.log(`   - agents.json: ${AGENTS_JSON_PATH}`);
}

main();
