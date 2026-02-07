/**
 * API Route : GET /api/vitrine/menu
 * Retourne le menu header (entrées + sous-menus) pour le site.
 * US-13.1 — Exposé via OpenAPI.
 */

import { NextResponse } from 'next/server';
import { readHeaderMenu } from '@/utils/vitrine/headerMenuReader';

export async function GET() {
  try {
    const items = readHeaderMenu();
    return NextResponse.json(items);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur lecture menu';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
