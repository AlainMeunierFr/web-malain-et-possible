/**
 * API Route : GET /api/vitrine/pages
 * Retourne la liste des pages du site
 * Mode obligatoire : refs ou full
 * Format optionnel : json (défaut) ou ascii — les deux appellent readPageData (même code)
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { validateModeParameter, readPageData } from '@/utils/vitrine';
import { contenuToAsciiArt } from '@/utils/backoffice';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('mode');
  const format = searchParams.get('format') ?? 'json';

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
      const excludedFiles = [
        '_Pages-Liens-Et-Menus.json',
        '_temoignages.json',
        'plan-du-site.json',
      ];
      if (excludedFiles.includes(file)) return false;
      if (file.startsWith('_')) return false;
      return true;
    });

    if (mode === 'refs') {
      // Mode refs : retourner slug et type seulement (format ascii ignoré)
      const pages = pageFiles.map((file) => {
        const slug = file.replace('.json', '');
        let type = 'page';
        if (slug.startsWith('profil-')) type = 'profil';
        else if (slug === 'index') type = 'home';
        return { slug, type };
      });
      return NextResponse.json(pages);
    }

    // Mode full : mêmes appels readPageData, format de sortie variable
    const pages = pageFiles.map((file) => {
      const slug = file.replace('.json', '');
      try {
        const pageData = readPageData(file);
        if (format === 'ascii') {
          const ascii = contenuToAsciiArt(pageData.contenu ?? []);
          const titre =
            pageData.contenu?.find((el: { type?: string }) => el.type === 'titreDePage' || el.type === 'titre') as
              | { texte?: string }
              | undefined;
          return { slug, titre: titre?.texte ?? slug, ascii };
        }
        return { slug, ...pageData };
      } catch {
        return { slug, error: 'Failed to read page' };
      }
    });

    if (format === 'ascii') {
      const lines = pages.flatMap((p) => {
        if ('error' in p) return [`## ${p.slug}\n(erreur: ${p.error})\n`];
        return [`## ${(p as { titre: string }).titre} (${p.slug})\n\n${(p as { ascii: string }).ascii}\n`];
      });
      return new NextResponse(lines.join('\n---\n\n'), {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error reading pages:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read pages' },
      { status: 500 },
    );
  }
}
