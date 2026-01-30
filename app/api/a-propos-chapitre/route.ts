/**
 * API Route : Retourne le contenu d'un chapitre (dossier) « A propos de ce site » (US-11.4).
 * GET /api/a-propos-chapitre?path=... (path = chemin relatif, ex. data/A propos de ce site/A propos du projet)
 */

import { NextRequest, NextResponse } from 'next/server';
import { readChapitreByPath } from '../../../utils/aboutSiteReader';

export async function GET(request: NextRequest) {
  const pathParam = request.nextUrl.searchParams.get('path');
  if (!pathParam || typeof pathParam !== 'string') {
    return NextResponse.json({ error: 'Paramètre path requis' }, { status: 400 });
  }
  const pathDecoded = decodeURIComponent(pathParam);
  const chapitre = readChapitreByPath(pathDecoded);
  if (!chapitre) {
    return NextResponse.json({ error: 'Chapitre introuvable' }, { status: 404 });
  }
  return NextResponse.json(chapitre);
}
