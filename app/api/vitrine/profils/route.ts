/**
 * API Route : GET /api/vitrine/profils
 * Retourne la liste des profils
 * Mode obligatoire : refs ou full
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateModeParameter, readPageData, convertToRefs } from '@/utils/vitrine';
import type { ElementProfil, ElementListeDeProfils, ElementContenu } from '@/utils/vitrine';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('mode');

  // Valider le mode
  const validation = validateModeParameter(mode);
  if (!validation.valid) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    // Lire mes-profils.json pour obtenir la liste des profils
    const mesProfilsData = readPageData('mes-profils.json');

    // Trouver l'élément listeDeProfils
    const listeProfils = mesProfilsData.contenu.find(
      (el): el is ElementListeDeProfils => el.type === 'listeDeProfils',
    );

    if (!listeProfils?.profils) {
      return NextResponse.json([]);
    }

    if (mode === 'refs') {
      // Mode refs : retourner les profils avec domaines en slugs
      const profils = listeProfils.profils.map((p: ElementProfil) => ({
        slug: p.slug,
        titre: p.titre,
        jobTitles: p.jobTitles,
        cvPath: p.cvPath,
        route: p.route,
      }));
      return NextResponse.json(profils);
    }

    // Mode full : retourner l'arbre complet pour chaque profil
    const profils = listeProfils.profils.map((p: ElementProfil) => {
      try {
        const profilData = readPageData(`profil-${p.slug}.json`);
        return {
          slug: p.slug,
          titre: p.titre,
          jobTitles: p.jobTitles,
          cvPath: p.cvPath,
          route: p.route,
          ...profilData,
        };
      } catch {
        return {
          slug: p.slug,
          titre: p.titre,
          jobTitles: p.jobTitles,
          cvPath: p.cvPath,
          route: p.route,
          error: 'Failed to read profile details',
        };
      }
    });

    return NextResponse.json(profils);
  } catch (error) {
    console.error('Error reading profils:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read profils' },
      { status: 500 },
    );
  }
}
