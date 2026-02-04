import { NextResponse } from 'next/server';
import { verifyPassword } from '../../../utils/server';

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json(
        { success: false, error: 'Requête invalide' },
        { status: 400 }
      );
    }

    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Mot de passe requis' },
        { status: 400 }
      );
    }

    try {
      const isValid = verifyPassword(password);
      return NextResponse.json({ success: isValid });
    } catch (verifyError) {
      console.error('Error verifying password:', verifyError);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la vérification du mot de passe' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in verify-password route:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
