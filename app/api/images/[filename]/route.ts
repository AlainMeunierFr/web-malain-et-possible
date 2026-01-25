/**
 * API Route : Sert les images depuis data/images/
 * Permet d'accéder aux images du wiki via /api/images/filename
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Décoder le nom de fichier (gère les espaces encodés en %20)
    const decodedFilename = decodeURIComponent(filename);
    
    // Chemin vers l'image dans data/images/
    const imagePath = path.join(
      process.cwd(),
      'data',
      'images',
      decodedFilename
    );

    // Vérifier que le fichier existe
    if (!fs.existsSync(imagePath)) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Lire le fichier
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Déterminer le type MIME basé sur l'extension
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    };
    const contentType = mimeTypes[ext] || 'image/jpeg';

    // Retourner l'image avec le bon Content-Type
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return NextResponse.json(
      { error: 'Failed to serve image' },
      { status: 500 }
    );
  }
}