/**
 * API Route : GET /api/vitrine/competences/[slug]
 * Retourne une compétence spécifique
 * Mode obligatoire : refs ou full
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateModeParameter, readCompetences, readDomaines, readAutres } from '@/utils/vitrine';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('mode');

  // Valider le mode
  const validation = validateModeParameter(mode);
  if (!validation.valid) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const { slug } = await params;

  try {
    const competencesMap = readCompetences();
    const competence = competencesMap.get(slug);

    if (!competence) {
      return NextResponse.json(
        { error: 'Not found', message: `Competence "${slug}" not found` },
        { status: 404 },
      );
    }

    // Trouver les expériences liées via les domaines
    const domainesMap = readDomaines();
    const experiences: string[] = [];
    for (const domaine of domainesMap.values()) {
      if (domaine.competences?.includes(slug)) {
        experiences.push(...(domaine.experiences ?? []));
      }
    }
    // Dédupliquer
    const uniqueExperiences = [...new Set(experiences)];

    if (mode === 'refs') {
      // Mode refs : retourner avec expériences en ids
      return NextResponse.json({
        slug: competence.id,
        titre: competence.titre,
        description: competence.description,
        icon: competence.icon ?? null,
        image: competence.image ?? null,
        auteur: competence.auteur ?? null,
        experiences: uniqueExperiences,
      });
    }

    // Mode full : résoudre les expériences
    const experiencesMap = readAutres();
    const experiencesResolved = uniqueExperiences.map((expId) => {
      const exp = experiencesMap.get(expId);
      if (!exp) {
        return { id: expId, error: 'Not found' };
      }
      return {
        id: exp.id,
        categorie: exp.categorie ?? 'Expériences et apprentissages',
        description: exp.description,
        periode: exp.periode,
      };
    });

    return NextResponse.json({
      slug: competence.id,
      titre: competence.titre,
      description: competence.description,
      icon: competence.icon ?? null,
      image: competence.image ?? null,
      auteur: competence.auteur ?? null,
      experiences: experiencesResolved,
    });
  } catch (error) {
    console.error('Error reading competence:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read competence' },
      { status: 500 },
    );
  }
}
