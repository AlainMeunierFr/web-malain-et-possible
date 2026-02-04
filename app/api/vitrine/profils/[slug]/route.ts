/**
 * API Route : GET /api/vitrine/profils/[slug]
 * Retourne un profil spécifique
 * Mode obligatoire : refs ou full
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { validateModeParameter, readPageData } from '@/utils/vitrine';
import type { ElementProfil, ElementListeDeProfils, ElementDomaineDeCompetence } from '@/utils/vitrine';

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
    // Vérifier que le profil existe
    const filename = `profil-${slug}.json`;
    const filePath = path.join(process.cwd(), 'data', filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Not found', message: `Profile "${slug}" not found` },
        { status: 404 },
      );
    }

    // Lire les métadonnées du profil depuis mes-profils.json
    const mesProfilsData = readPageData('mes-profils.json');
    const listeProfils = mesProfilsData.contenu.find(
      (el): el is ElementListeDeProfils => el.type === 'listeDeProfils',
    );

    const profilMeta = listeProfils?.profils?.find(
      (p: ElementProfil) => p.slug === slug,
    );

    // Lire le profil complet (avec références résolues)
    const profilData = readPageData(filename);

    if (mode === 'refs') {
      // Mode refs : extraire les slugs des domaines au lieu des objets complets
      const domaines = profilData.contenu
        .filter((el): el is ElementDomaineDeCompetence => el.type === 'domaineDeCompetence')
        .map((d) => {
          // Extraire un identifiant du domaine (basé sur le titre ou un slug généré)
          return d.titre.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        });

      return NextResponse.json({
        slug,
        titre: profilMeta?.titre ?? slug,
        jobTitles: profilMeta?.jobTitles ?? [],
        cvPath: profilMeta?.cvPath ?? '',
        domaines,
      });
    }

    // Mode full : retourner l'arbre complet
    return NextResponse.json({
      slug,
      titre: profilMeta?.titre ?? slug,
      jobTitles: profilMeta?.jobTitles ?? [],
      cvPath: profilMeta?.cvPath ?? '',
      ...profilData,
    });
  } catch (error) {
    console.error('Error reading profil:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read profil' },
      { status: 500 },
    );
  }
}
