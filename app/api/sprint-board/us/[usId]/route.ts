/**
 * API Route : Contenu complet d'une US du sprint en cours (US-11.6).
 * GET /api/sprint-board/us/[usId]
 * Retourne { id, titre, content } (content = markdown brut) ou 404.
 */

import { NextResponse } from 'next/server';
import { readUsContent } from '../../../../../utils/sprintBoardReader';

export async function GET(
  _request: Request,
  context: { params: Promise<{ usId: string }> }
) {
  const { usId } = await context.params;
  if (!usId || !/^US-\d+\.\d+$/i.test(usId)) {
    return NextResponse.json(
      { error: 'Paramètre usId invalide (attendu US-X.Y)' },
      { status: 400 }
    );
  }
  const data = readUsContent(usId);
  if (!data) {
    return NextResponse.json(
      { error: 'US introuvable', id: usId },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
}
