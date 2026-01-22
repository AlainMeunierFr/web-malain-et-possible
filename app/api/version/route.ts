/**
 * API Route : Retourne la version du site depuis site-version.json
 */

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface SiteVersion {
  major: number;
  minor: number;
  patch: number;
}

export async function GET() {
  try {
    const versionFilePath = path.join(process.cwd(), 'site-version.json');
    
    if (!fs.existsSync(versionFilePath)) {
      // Si le fichier n'existe pas, retourner la version par défaut
      return NextResponse.json({
        version: '1.0.0',
        major: 1,
        minor: 0,
        patch: 0,
      });
    }
    
    const versionContent = fs.readFileSync(versionFilePath, 'utf-8');
    const version: SiteVersion = JSON.parse(versionContent);
    const versionString = `${version.major}.${version.minor}.${version.patch}`;
    
    return NextResponse.json({
      version: versionString,
      major: version.major,
      minor: version.minor,
      patch: version.patch,
    });
  } catch (error) {
    console.error('Error reading site-version.json:', error);
    return NextResponse.json(
      { version: '1.0.0', major: 1, minor: 0, patch: 0 },
      { status: 200 }
    );
  }
}
