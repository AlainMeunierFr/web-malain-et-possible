/**
 * API Route : GET /api/vitrine/experiences/[id]
 * Endpoint feuille - retourne une expérience spécifique
 * Mode ignoré (pas de sous-niveau)
 */

import { NextRequest, NextResponse } from 'next/server';
import { readAutres } from '@/utils/vitrine';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const experiencesMap = readAutres();

    const experience = experiencesMap.get(id);

    if (!experience) {
      return NextResponse.json(
        { error: 'Not found', message: `Experience with id "${id}" not found` },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: experience.id,
      categorie: experience.categorie ?? 'Expériences et apprentissages',
      description: experience.description,
      periode: experience.periode,
    });
  } catch (error) {
    console.error('Error reading experience:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read experience' },
      { status: 500 },
    );
  }
}
