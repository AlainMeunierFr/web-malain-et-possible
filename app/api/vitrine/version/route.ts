/**
 * API Route : GET /api/vitrine/version
 * Endpoint feuille - retourne la version du site
 * Mode ignoré (pas de sous-niveau)
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
      return NextResponse.json({
        version: '1.0.0',
        major: 1,
        minor: 0,
        patch: 0,
      });
    }

    const versionContent = fs.readFileSync(versionFilePath, 'utf-8');
    const siteVersion: SiteVersion = JSON.parse(versionContent);
    const versionString = `${siteVersion.major}.${siteVersion.minor}.${siteVersion.patch}`;

    return NextResponse.json({
      version: versionString,
      major: siteVersion.major,
      minor: siteVersion.minor,
      patch: siteVersion.patch,
    });
  } catch (error) {
    console.error('Error reading site-version.json:', error);
    return NextResponse.json(
      { version: '1.0.0', major: 1, minor: 0, patch: 0 },
      { status: 200 },
    );
  }
}
