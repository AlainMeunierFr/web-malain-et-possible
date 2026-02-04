/**
 * API Route : GET /api/vitrine/domaines
 * Retourne la liste des domaines de compétences
 * Mode obligatoire : refs ou full
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateModeParameter, readDomaines, readCompetences, readAutres } from '@/utils/vitrine';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('mode');

  // Valider le mode
  const validation = validateModeParameter(mode);
  if (!validation.valid) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    const domainesMap = readDomaines();

    if (mode === 'refs') {
      // Mode refs : retourner les domaines avec compétences en slugs
      const domaines = Array.from(domainesMap.values()).map((d) => ({
        slug: d.id,
        titre: d.titre,
        contenu: d.contenu,
        auteur: d.auteur ?? null,
        competences: d.competences ?? [],
        experiences: d.experiences ?? [],
      }));
      return NextResponse.json(domaines);
    }

    // Mode full : résoudre les références vers les compétences et expériences
    const competencesMap = readCompetences();
    const experiencesMap = readAutres();

    const domaines = Array.from(domainesMap.values()).map((d) => {
      // Résoudre les compétences
      const competencesResolved = (d.competences ?? []).map((compId) => {
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
      const experiencesResolved = (d.experiences ?? []).map((expId) => {
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
        slug: d.id,
        titre: d.titre,
        contenu: d.contenu,
        auteur: d.auteur ?? null,
        competences: competencesResolved,
        experiences: experiencesResolved,
      };
    });

    return NextResponse.json(domaines);
  } catch (error) {
    console.error('Error reading domaines:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read domaines' },
      { status: 500 },
    );
  }
}
