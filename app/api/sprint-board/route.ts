/**
 * API Route : Données du board KanBan du sprint en cours (US-11.5).
 * GET /api/sprint-board
 * Retourne { goal, columns, cards } sans contenu MD (chargé à la demande).
 * Si aucune US en cours, affiche le dernier sprint avec une carte fictive humoristique.
 */

import { NextResponse } from 'next/server';
import {
  readUsEnCours,
  getSprintFolderContainingUs,
  getSprintBoardData,
  getLatestSprintFolder,
} from '../../../utils/server';
import type { UsCard } from '../../../utils/server';

/** Carte fictive affichée quand toutes les US sont terminées */
const MOCK_CARD_ALL_DONE: UsCard = {
  id: 'US-9000.0',
  titre: 'Prendre un café bien mérité ☕',
  filename: 'US-9000.0 - Mock.md',
  state: 'en_cours',
  agentColumn: 'Lead-dev',
  rotation: 2,
  enRevue: true, // Affiche la loupe 🔍
};

export async function GET() {
  const usEnCours = readUsEnCours();
  
  // Cas 1 : Une US est en cours → afficher son sprint
  if (usEnCours?.usId) {
    const sprintPath = getSprintFolderContainingUs(usEnCours.usId);
    if (sprintPath) {
      const data = getSprintBoardData(sprintPath);
      return NextResponse.json(data);
    }
  }
  
  // Cas 2 : Aucune US en cours → afficher le dernier sprint + carte fictive
  const latestSprintPath = getLatestSprintFolder();
  if (!latestSprintPath) {
    return NextResponse.json(
      { error: 'Aucun sprint trouvé', goal: '', columns: [], cards: [] },
      { status: 200 }
    );
  }
  
  const data = getSprintBoardData(latestSprintPath);
  
  // Ajouter la carte fictive en mode "review" dans la colonne Lead-dev
  data.cards.push(MOCK_CARD_ALL_DONE);
  
  // Mettre à jour le compteur de la colonne Lead-dev
  const leadDevColumn = data.columns.find((c) => c.id === 'Lead-dev');
  if (leadDevColumn) {
    leadDevColumn.count = 1;
    leadDevColumn.wipLimit = '1/1';
  }
  
  return NextResponse.json(data);
}
