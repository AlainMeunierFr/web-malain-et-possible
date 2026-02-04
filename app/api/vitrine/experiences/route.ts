/**
 * API Route : GET /api/vitrine/experiences
 * Endpoint feuille - retourne toutes les expériences
 * Mode ignoré (pas de sous-niveau)
 */

import { NextResponse } from 'next/server';
import { readAutres } from '@/utils/vitrine';

export async function GET() {
  try {
    const experiencesMap = readAutres();

    // Convertir la Map en tableau et trier par id
    const experiences = Array.from(experiencesMap.values())
      .map((exp) => ({
        id: exp.id,
        categorie: exp.categorie ?? 'Expériences et apprentissages',
        description: exp.description,
        periode: exp.periode,
      }))
      .sort((a, b) => {
        // Tri numérique par id
        const idA = parseInt(a.id, 10);
        const idB = parseInt(b.id, 10);
        return idA - idB;
      });

    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error reading experiences:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read experiences' },
      { status: 500 },
    );
  }
}
