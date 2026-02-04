/**
 * API Route : GET /api/vitrine/pages
 * Retourne la liste des pages du site
 * Mode obligatoire : refs ou full
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { validateModeParameter, readPageData } from '@/utils/vitrine';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('mode');

  // Valider le mode
  const validation = validateModeParameter(mode);
  if (!validation.valid) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  try {
    const dataDir = path.join(process.cwd(), 'data');
    const files = fs.readdirSync(dataDir);

    // Filtrer les fichiers JSON qui sont des pages (pas les fichiers techniques)
    const pageFiles = files.filter((file) => {
      if (!file.endsWith('.json')) return false;
      // Exclure les fichiers techniques
      const excludedFiles = [
        '_Pages-Et-Lien.json',
        '_temoignages.json',
        'plan-du-site.json',
      ];
      if (excludedFiles.includes(file)) return false;
      if (file.startsWith('_')) return false;
      return true;
    });

    if (mode === 'refs') {
      // Mode refs : retourner slug et type seulement
      const pages = pageFiles.map((file) => {
        const slug = file.replace('.json', '');
        // Déduire le type depuis le nom du fichier
        let type = 'page';
        if (slug.startsWith('profil-')) {
          type = 'profil';
        } else if (slug === 'index') {
          type = 'home';
        }
        return { slug, type };
      });
      return NextResponse.json(pages);
    }

    // Mode full : retourner le contenu complet de chaque page
    const pages = pageFiles.map((file) => {
      const slug = file.replace('.json', '');
      try {
        const pageData = readPageData(file);
        return {
          slug,
          ...pageData,
        };
      } catch {
        // Si erreur de lecture, retourner un objet minimal
        return { slug, error: 'Failed to read page' };
      }
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error reading pages:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read pages' },
      { status: 500 },
    );
  }
}
