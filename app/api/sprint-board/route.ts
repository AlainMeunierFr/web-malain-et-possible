/**
 * API Route : Données du board KanBan du sprint en cours (US-11.5).
 * GET /api/sprint-board
 * Retourne { goal, columns, cards } sans contenu MD (chargé à la demande).
 */

import { NextResponse } from 'next/server';
import {
  readUsEnCours,
  getSprintFolderContainingUs,
  getSprintBoardData,
} from '../../../utils/sprintBoardReader';

export async function GET() {
  const usEnCours = readUsEnCours();
  if (!usEnCours?.usId) {
    return NextResponse.json(
      { error: 'Aucune US en cours', goal: '', columns: [], cards: [] },
      { status: 200 }
    );
  }
  const sprintPath = getSprintFolderContainingUs(usEnCours.usId);
  if (!sprintPath) {
    return NextResponse.json(
      { error: 'Sprint introuvable pour cette US', goal: '', columns: [], cards: [] },
      { status: 200 }
    );
  }
  const data = getSprintBoardData(sprintPath);
  return NextResponse.json(data);
}
