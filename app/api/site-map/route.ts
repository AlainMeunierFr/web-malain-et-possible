import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { PlanSite } from '../../../utils/siteMapGenerator';

const getSiteMapPath = () => {
  return path.join(process.cwd(), 'data', '_Pages-Et-Lien.json');
};

export async function GET() {
  try {
    const siteMapPath = getSiteMapPath();
    
    if (!fs.existsSync(siteMapPath)) {
      return NextResponse.json({ pages: [], liens: [] });
    }

    const content = fs.readFileSync(siteMapPath, 'utf8');
    const plan: PlanSite = JSON.parse(content);

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error reading site map:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture du plan du site' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const plan: PlanSite = await request.json();

    const siteMapPath = getSiteMapPath();
    
    // Créer un backup avant de sauvegarder
    if (fs.existsSync(siteMapPath)) {
      const backupPath = siteMapPath.replace('.json', '.backup.json');
      fs.copyFileSync(siteMapPath, backupPath);
    }

    fs.writeFileSync(siteMapPath, JSON.stringify(plan, null, 2), 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving site map:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde du plan du site' },
      { status: 500 }
    );
  }
}
