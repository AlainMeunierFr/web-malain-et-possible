import React from 'react';
import { buildMesProfilsPageData, buildPageMetadata } from '../../../utils/server';
import PageContentRenderer from '../../../components/PageContentRenderer';

export const metadata = buildPageMetadata('mes-profils.json', '/mes-profils');

/**
 * Page "Mes Profils" (US-7.12).
 * Sélection de profil et téléchargement CV : 4 blocs profil, CTA Discutons, texteLarge.
 * buildMesProfilsPageData enrichit les profils avec les e2eID (p9, p10, p11, p12) pour les tests E2E.
 */
export default function MesProfilsPage() {
  const pageData = buildMesProfilsPageData();

  return (
    <main className="main-cont">
      <PageContentRenderer contenu={pageData.contenu} isHomePage />
    </main>
  );
}
