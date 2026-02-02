/**
 * API Route : Sert les images depuis data/images/{type}/
 * Types acceptés : json, md, static
 * Permet d'accéder aux images via /api/images/{type}/filename
 */

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; filename: string }> }
) {
  try {
    const { type, filename } = await params;
    
    // Valider le type
    const validTypes = ['json', 'md', 'static'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Décoder le nom de fichier (gère les espaces encodés en %20)
    const decodedFilename = decodeURIComponent(filename);
    
    // Chemin vers l'image dans data/images/{type}/
    const baseDir = path.resolve(process.cwd(), 'data', 'images', type);
    const imagePath = path.resolve(baseDir, decodedFilename);
    
    // Validation anti path-traversal : vérifier que le chemin reste dans le répertoire autorisé
    if (!imagePath.startsWith(baseDir + path.sep) && imagePath !== baseDir) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      );
    }

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
