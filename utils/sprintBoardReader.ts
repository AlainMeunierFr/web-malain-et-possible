/**
 * Backend pur : Logique métier pour le board KanBan du sprint en cours (US-11.5, US-12.2).
 * Lit le Sprint Goal, les agents (agents.json), l'US en cours, les cartes US du sprint.
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join('data', 'A propos de ce site');
const SPRINTS_DIR = path.join(DATA_DIR, 'Sprints');
const US_EN_COURS_FILENAME = 'US en cours.md';
const SPRINT_GOAL_FILENAME = '00 - Sprint goal et contexte.md';
const CURSOR_AGENTS_DIR = '.cursor/agents';
const AGENTS_JSON_FILENAME = 'agents.json';

/** État d'une carte US sur le board */
export type UsCardState = 'a_faire' | 'en_cours' | 'fait';

/** Carte US pour le board */
export interface UsCard {
  id: string;
  titre: string;
  filename: string;
  state: UsCardState;
  /** Colonne agent si state === 'en_cours' (ex. "TDD-back-end") */
  agentColumn?: string;
  /** Rotation en degrés (-3 à +3), déterministe à partir de l'id (aspect post-it) */
  rotation: number;
}

/** Ligne "US en cours" parsée */
export interface UsEnCours {
  usId: string;
  titre: string;
  etape: string;
}

/** Colonne du board (A faire, agent, Fait) */
export interface BoardColumn {
  id: string;
  label: string;
  type: 'a_faire' | 'agent' | 'fait';
  count: number;
  /** WIP Limit pour colonne agent : "0/1" ou "1/1" */
  wipLimit?: string;
}

/** Données complètes du board KanBan */
export interface SprintBoardData {
  goal: string;
  columns: BoardColumn[];
  cards: UsCard[];
}

/**
 * Lit le Sprint Goal depuis "00 - Sprint goal et contexte.md" du dossier sprint.
 * Retourne la première ligne de contenu après "# Sprint Goal" (jusqu'au premier "---" ou fin du bloc).
 */
export function readSprintGoal(sprintDirRelativePath: string): string {
  const normalized = sprintDirRelativePath.replace(/^\.\//, '').split('/').join(path.sep);
  const goalPath = path.join(process.cwd(), normalized, SPRINT_GOAL_FILENAME);
  let content: string;
  try {
    content = fs.readFileSync(goalPath, 'utf8');
  } catch {
    return '';
  }
  const lines = content.split(/\r?\n/);
  let afterTitle = false;
  const goalLines: string[] = [];
  for (const line of lines) {
    if (line.trim() === '# Sprint Goal') {
      afterTitle = true;
      continue;
    }
    if (afterTitle) {
      if (line.trim().startsWith('---')) break;
      goalLines.push(line);
    }
  }
  return goalLines.join('\n').trim();
}

/**
 * Lit la liste des agents depuis .cursor/agents (ordre des fichiers).
 * Chaque fichier "N. Nom.md" donne une colonne avec id = "Nom" (sans préfixe numérique).
 */
export function readAgentsFromCursorAgents(): { id: string; label: string }[] {
  const agentsPath = path.join(process.cwd(), CURSOR_AGENTS_DIR.split('/').join(path.sep));
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(agentsPath, { withFileTypes: true });
  } catch {
    return [];
  }
  const agents: { id: string; label: string; order: number }[] = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const match = entry.name.match(/^(\d+)\.\s*(.+)\.md$/);
    const order = match ? parseInt(match[1], 10) : 999;
    const label = match ? match[2].trim() : entry.name.replace(/\.md$/, '');
    const id = label;
    agents.push({ id, label, order });
  }
  agents.sort((a, b) => a.order - b.order);
  return agents.map(({ id, label }) => ({ id, label }));
}

/**
 * Lit la liste des agents depuis data/A propos de ce site/agents.json (US-12.2).
 * Retourne un tableau vide si le fichier est absent ou invalide (repli : board sans colonnes agent).
 */
export function readAgentsFromAgentsJson(): { id: string; label: string }[] {
  const agentsPath = path.join(process.cwd(), DATA_DIR.split('/').join(path.sep), AGENTS_JSON_FILENAME);
  let content: string;
  try {
    content = fs.readFileSync(agentsPath, 'utf8');
  } catch {
    return [];
  }
  let data: unknown;
  try {
    data = JSON.parse(content);
  } catch {
    return [];
  }
  if (!Array.isArray(data) || data.length === 0) return [];
  const agents: { id: string; label: string }[] = [];
  for (const item of data) {
    if (item && typeof item === 'object' && 'id' in item && 'label' in item) {
      const id = String((item as { id: unknown }).id);
      const label = String((item as { label: unknown }).label);
      if (id && label) agents.push({ id, label });
    }
  }
  return agents;
}

/**
 * Parse "US en cours.md" (dossier Sprints).
 * Format : ligne 1 = usId, ligne 2 = titre, ligne 3 = étape.
 * Retourne null si fichier absent ou sans référence valide.
 */
export function readUsEnCours(): UsEnCours | null {
  const filePath = path.join(process.cwd(), SPRINTS_DIR.split('/').join(path.sep), US_EN_COURS_FILENAME);
  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
  const allLines = content.split(/\r?\n/).map((l) => l.trim());
  let afterSeparator = false;
  const lines: string[] = [];
  for (const line of allLines) {
    if (line.startsWith('---')) {
      afterSeparator = true;
      continue;
    }
    if (afterSeparator && line) lines.push(line);
  }
  const usId = lines[0] ?? '';
  if (!usId || !/^US-\d+\.\d+$/i.test(usId)) return null;
  return {
    usId,
    titre: lines[1] ?? '',
    etape: lines[2] ?? '',
  };
}

/**
 * Retourne le chemin relatif du dossier sprint qui contient l'US donnée (fichier dont le nom commence par "US-X.Y").
 */
export function getSprintFolderContainingUs(usId: string): string | null {
  const sprintsPath = path.join(process.cwd(), SPRINTS_DIR.split('/').join(path.sep));
  let dirs: fs.Dirent[];
  try {
    dirs = fs.readdirSync(sprintsPath, { withFileTypes: true });
  } catch {
    return null;
  }
  const prefix = usId + ' ';
  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const sprintDir = path.join(sprintsPath, d.name);
    const files = fs.readdirSync(sprintDir, { withFileTypes: true });
    const hasUs = files.some((f) => f.isFile() && f.name.startsWith(prefix));
    if (hasUs) return path.join(SPRINTS_DIR, d.name).split(path.sep).join('/');
  }
  return null;
}

/**
 * Lit les cartes US du sprint : tous les fichiers "US-X.Y - ..." dans le dossier sprint.
 * État : fait si nom contient "✅ COMPLÉTÉ" ou si US en cours a étape "done" ; en_cours si usId dans US en cours (et étape ≠ done) ; sinon a_faire.
 */
export function readSprintUsCards(sprintDirRelativePath: string): UsCard[] {
  const normalized = sprintDirRelativePath.replace(/^\.\//, '').split('/').join(path.sep);
  const sprintPath = path.join(process.cwd(), normalized);
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(sprintPath, { withFileTypes: true });
  } catch {
    return [];
  }
  const usEnCours = readUsEnCours();
  const cards: UsCard[] = [];
  const usFilePattern = /^US-\d+\.\d+\s+- (.+)\.md$/;
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const match = entry.name.match(usFilePattern);
    if (!match) continue;
    let titreFromFilename = match[1];
    titreFromFilename = titreFromFilename.replace(/\s*✅\s*COMPLÉTÉ\s*$/i, '').trim();
    const idMatch = entry.name.match(/^(US-\d+\.\d+)\s+-/);
    const id = idMatch ? idMatch[1] : entry.name.replace(/\.md$/, '');
    const isDoneInFilename = entry.name.includes('✅ COMPLÉTÉ');
    const isEnCours = usEnCours?.usId === id;
    const etapeDone = usEnCours?.etape === 'done';
    let state: UsCardState = 'a_faire';
    if (isDoneInFilename || (isEnCours && etapeDone)) state = 'fait';
    else if (isEnCours) state = 'en_cours';
    const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const rotation = (hash % 7) - 3;
    cards.push({
      id,
      titre: titreFromFilename,
      filename: entry.name,
      state,
      agentColumn: state === 'en_cours' ? usEnCours?.etape : undefined,
      rotation,
    });
  }
  cards.sort((a, b) => a.id.localeCompare(b.id));
  return cards;
}

/**
 * Construit les données du board KanBan : goal, colonnes (A faire + agents + Fait), cartes, décomptes et WIP.
 */
export function getSprintBoardData(sprintDirRelativePath: string): SprintBoardData {
  const goal = readSprintGoal(sprintDirRelativePath);
  const agents = readAgentsFromAgentsJson();
  const cards = readSprintUsCards(sprintDirRelativePath);

  const aFaireCount = cards.filter((c) => c.state === 'a_faire').length;
  const faitCount = cards.filter((c) => c.state === 'fait').length;
  const enCoursCard = cards.find((c) => c.state === 'en_cours');

  const columns: BoardColumn[] = [
    { id: 'a_faire', label: 'A faire', type: 'a_faire', count: aFaireCount },
    ...agents.map((a) => {
      const hasCard = enCoursCard?.agentColumn === a.id;
      return {
        id: a.id,
        label: a.label,
        type: 'agent' as const,
        count: hasCard ? 1 : 0,
        wipLimit: hasCard ? '1/1' : '0/1',
      };
    }),
    { id: 'fait', label: 'Fait', type: 'fait', count: faitCount },
  ];

  return { goal, columns, cards };
}

/** Contenu complet d'une US (pour affichage modal, US-11.6) */
export interface UsContent {
  id: string;
  titre: string;
  /** Contenu brut du fichier .md */
  content: string;
}

/**
 * Lit le contenu complet d'une US à partir de son id (ex. US-11.5).
 * Cherche le fichier "US-X.Y - ... .md" dans le dossier sprint qui contient cette US.
 * Retourne null si l'US est introuvable.
 */
export function readUsContent(usId: string): UsContent | null {
  const sprintDir = getSprintFolderContainingUs(usId);
  if (!sprintDir) return null;
  const normalized = sprintDir.replace(/^\.\//, '').split('/').join(path.sep);
  const sprintPath = path.join(process.cwd(), normalized);
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(sprintPath, { withFileTypes: true });
  } catch {
    return null;
  }
  const prefix = usId + ' ';
  const usFile = entries.find(
    (e) => e.isFile() && e.name.endsWith('.md') && e.name.startsWith(prefix)
  );
  if (!usFile) return null;
  const filePath = path.join(sprintPath, usFile.name);
  let fileContent: string;
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
  const titreFromFilename = usFile.name
    .replace(/\.md$/i, '')
    .replace(new RegExp(`^${escapeRegex(usId)}\\s*-\\s*`), '')
    .replace(/\s*✅\s*COMPLÉTÉ\s*$/i, '')
    .trim();
  return { id: usId, titre: titreFromFilename, content: fileContent };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
