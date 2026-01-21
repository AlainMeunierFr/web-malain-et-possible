import { NextResponse } from 'next/server';
import { detecterPages, detecterLiensInternes, mettreAJourPlanJSON } from '../../../../utils/siteMapGenerator';

export async function POST() {
  try {
    const pages = detecterPages();
    const liens = detecterLiensInternes();
    
    mettreAJourPlanJSON(pages, liens);

    return NextResponse.json({ 
      success: true, 
      pages: pages.length, 
      liens: liens.length 
    });
  } catch (error) {
    console.error('Error generating site map:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du plan du site' },
      { status: 500 }
    );
  }
}
