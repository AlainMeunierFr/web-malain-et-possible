/**
 * API Route : GET /api/vitrine/pages/[slug]
 * Retourne une page spécifique
 * Mode obligatoire : refs ou full
 * Format optionnel : json (défaut) ou ascii — les deux appellent readPageData (même code)
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { validateModeParameter, readPageData } from '@/utils/vitrine';
import { contenuToAsciiArt } from '@/utils/backoffice';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('mode');
  const format = searchParams.get('format') ?? 'json';

  // Valider le mode
  const validation = validateModeParameter(mode);
  if (!validation.valid) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const { slug } = await params;

  try {
    const filename = `${slug}.json`;
    const filePath = path.join(process.cwd(), 'data', filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Not found', message: `Page "${slug}" not found` },
        { status: 404 },
      );
    }

    // Les deux formats appellent le même code de lecture
    const pageData = readPageData(filename);

    if (format === 'ascii') {
      const ascii = contenuToAsciiArt(pageData.contenu ?? []);
      return new NextResponse(ascii, {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    return NextResponse.json({
      slug,
      ...pageData,
    });
  } catch (error) {
    console.error('Error reading page:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read page' },
      { status: 500 },
    );
  }
}
