/**
 * API Route : GET /api/vitrine/detournements
 * Endpoint feuille - retourne tous les détournements vidéo
 * Mode ignoré (pas de sous-niveau)
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Detournement {
  id: number;
  titre: string;
  titreVideoDetournee: string;
  videoDetournee: string;
  titreVideoOriginale: string;
  videoOriginale: string;
  date: string;
  pitch?: string;
  droitsAuteur?: string;
  linkedin?: string;
}

interface PortfolioData {
  contenu: Array<{
    detournementVideo?: Detournement[];
    type?: string;
  }>;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'portfolio-detournements.json');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: PortfolioData = JSON.parse(fileContent);

    // Trouver l'élément contenant detournementVideo
    const detournementsElement = data.contenu?.find(
      (el) => el.detournementVideo && Array.isArray(el.detournementVideo),
    );

    if (!detournementsElement?.detournementVideo) {
      return NextResponse.json([]);
    }

    // Mapper les détournements vers le format API
    const detournements = detournementsElement.detournementVideo.map((d) => ({
      id: d.id,
      titre: d.titre,
      titreVideoDetournee: d.titreVideoDetournee,
      videoDetournee: d.videoDetournee,
      titreVideoOriginale: d.titreVideoOriginale,
      videoOriginale: d.videoOriginale,
      date: d.date,
      pitch: d.pitch ?? null,
      droitsAuteur: d.droitsAuteur ?? null,
      linkedin: d.linkedin ?? null,
    }));

    // Trier par date décroissante (plus récent d'abord)
    detournements.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json(detournements);
  } catch (error) {
    console.error('Error reading detournements:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to read detournements' },
      { status: 500 },
    );
  }
}

/**
 * Parse une date au format français (JJ/M/AAAA ou J/M/AAAA)
 */
function parseDate(dateStr: string): Date {
  const parts = dateStr.split('/');
  if (parts.length !== 3) {
    return new Date(0);
  }
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Mois 0-indexé
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}
