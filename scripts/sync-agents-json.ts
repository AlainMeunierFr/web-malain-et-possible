/**
 * US-12.2 : Synchronise .cursor/agents vers data/A propos de ce site/agents.json.
 * Exécuté uniquement en environnement de développement (utils/environment.isDevelopment()).
 * Utilisé par "npm run dev" pour mettre à jour agents.json avant de lancer Next.js.
 */

import fs from 'fs';
import path from 'path';
import { isDevelopment } from '../utils/environment';
import { readAgentsFromCursorAgents } from '../utils/sprintBoardReader';

const DATA_DIR = path.join(process.cwd(), 'data', 'A propos de ce site');
const AGENTS_JSON_PATH = path.join(DATA_DIR, 'agents.json');

function main(): void {
  if (!isDevelopment()) {
    return;
  }
  const agents = readAgentsFromCursorAgents();
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(AGENTS_JSON_PATH, JSON.stringify(agents, null, 2), 'utf8');
}

main();
