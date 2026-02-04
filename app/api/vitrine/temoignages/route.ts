/**
 * API Route : GET /api/vitrine/temoignages
 * Endpoint feuille - retourne tous les témoignages
 * Mode ignoré (pas de sous-niveau)
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Temoignage {
  nom: string;
  fonction: string;
  photo: string;
  temoignage: string;
}

interface TemoignagesData {
  contenu: Array<{
    type: string;
    items?: Temoignage[];
  }>;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', '_temoignages.json');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: TemoignagesData = JSON.parse(fileContent);

    // Trouver l'élément listeDeTemoignages
    const listeTemoignages = data.contenu?.find(
      (el) => el.type === 'listeDeTemoignages',
    );

    if (!listeTemoignages?.items) {
      return NextResponse.json([]);
    }

    // Mapper les témoignages vers le format API
    const temoignages = listeTemoignages.items.map((t) => ({
      auteur: t.nom,
      role: t.fonction,
      photo: t.photo,
      contenu: t.temoignage,
    }));

    return NextResponse.json(temoignages);
  } catch (error) {
    console.error('Error reading temoignages:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read temoignages' },
      { status: 500 },
    );
  }
}
