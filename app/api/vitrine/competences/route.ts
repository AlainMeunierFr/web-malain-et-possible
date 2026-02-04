/**
 * API Route : GET /api/vitrine/competences
 * Retourne la liste des compétences
 * Mode obligatoire : refs ou full
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateModeParameter, readCompetences, readDomaines, readAutres } from '@/utils/vitrine';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('mode');

  // Valider le mode
  const validation = validateModeParameter(mode);
  if (!validation.valid) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    const competencesMap = readCompetences();
    const domainesMap = readDomaines();

    // Créer une map compétence → expériences via les domaines
    const competenceExperiences = new Map<string, string[]>();
    for (const domaine of domainesMap.values()) {
      const experiences = domaine.experiences ?? [];
      for (const compId of domaine.competences ?? []) {
        const existing = competenceExperiences.get(compId) ?? [];
        competenceExperiences.set(compId, [...existing, ...experiences]);
      }
    }

    if (mode === 'refs') {
      // Mode refs : retourner les compétences avec expériences en ids
      const competences = Array.from(competencesMap.values()).map((c) => ({
        slug: c.id,
        titre: c.titre,
        description: c.description,
        icon: c.icon ?? null,
        image: c.image ?? null,
        auteur: c.auteur ?? null,
        experiences: competenceExperiences.get(c.id) ?? [],
      }));
      return NextResponse.json(competences);
    }

    // Mode full : résoudre les expériences
    const experiencesMap = readAutres();

    const competences = Array.from(competencesMap.values()).map((c) => {
      const expIds = competenceExperiences.get(c.id) ?? [];
      const experiencesResolved = expIds.map((expId) => {
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

      return {
        slug: c.id,
        titre: c.titre,
        description: c.description,
        icon: c.icon ?? null,
        image: c.image ?? null,
        auteur: c.auteur ?? null,
        experiences: experiencesResolved,
      };
    });

    return NextResponse.json(competences);
  } catch (error) {
    console.error('Error reading competences:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read competences' },
      { status: 500 },
    );
  }
}
