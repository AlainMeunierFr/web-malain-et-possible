/**
 * API Route : Retourne le JSON structuré pour "À propos du site"
 * Backend pur : Utilise readAboutSiteStructure() qui est testable en ligne de commande
 * 
 * Stratégie B : Séparation claire client/serveur
 * - Backend pur : génère du JSON
 * - API Route : expose le JSON via HTTP
 * - Client Component : fetch le JSON et l'affiche via CSS
 */

import { NextResponse } from 'next/server';
import { readAboutSiteStructure } from '../../../utils/aboutSiteReader';

export async function GET() {
  try {
    const structure = readAboutSiteStructure();
    return NextResponse.json(structure);
  } catch (error) {
    console.error('Error reading about site structure:', error);
    return NextResponse.json(
      { error: 'Failed to load about site structure' },
      { status: 500 }
    );
  }
}
