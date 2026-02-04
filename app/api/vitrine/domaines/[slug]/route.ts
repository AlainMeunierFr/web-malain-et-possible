/**
 * API Route : GET /api/vitrine/domaines/[slug]
 * Retourne un domaine spécifique
 * Mode obligatoire : refs ou full
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateModeParameter, readDomaines, readCompetences, readAutres } from '@/utils/vitrine';

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
    const domainesMap = readDomaines();
    const domaine = domainesMap.get(slug);

    if (!domaine) {
      return NextResponse.json(
        { error: 'Not found', message: `Domain "${slug}" not found` },
        { status: 404 },
      );
    }

    if (mode === 'refs') {
      // Mode refs : retourner le domaine avec FK en slugs
      return NextResponse.json({
        slug: domaine.id,
        titre: domaine.titre,
        contenu: domaine.contenu,
        auteur: domaine.auteur ?? null,
        competences: domaine.competences ?? [],
        experiences: domaine.experiences ?? [],
      });
    }

    // Mode full : résoudre les références
    const competencesMap = readCompetences();
    const experiencesMap = readAutres();

    // Résoudre les compétences
    const competencesResolved = (domaine.competences ?? []).map((compId) => {
      const comp = competencesMap.get(compId);
      if (!comp) {
        return { id: compId, error: 'Not found' };
      }
      return {
        slug: comp.id,
        titre: comp.titre,
        description: comp.description,
        icon: comp.icon ?? null,
        image: comp.image ?? null,
        auteur: comp.auteur ?? null,
      };
    });

    // Résoudre les expériences
    const experiencesResolved = (domaine.experiences ?? []).map((expId) => {
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
      slug: domaine.id,
      titre: domaine.titre,
      contenu: domaine.contenu,
      auteur: domaine.auteur ?? null,
      competences: competencesResolved,
      experiences: experiencesResolved,
    });
  } catch (error) {
    console.error('Error reading domaine:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read domaine' },
      { status: 500 },
    );
  }
}
