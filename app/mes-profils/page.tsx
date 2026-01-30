import React from 'react';
import { readPageData } from '../../utils/indexReader';
import PageContentRenderer from '../../components/PageContentRenderer';

/**
 * Page "Mes Profils" (US-7.12).
 * Sélection de profil et téléchargement CV : 4 blocs profil, CTA Discutons, texteLarge.
 */
export default function MesProfilsPage() {
  const pageData = readPageData('mes-profils.json');

  return (
    <main className="main">
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
