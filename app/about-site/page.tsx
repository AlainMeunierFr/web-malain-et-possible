'use client';

import AboutSiteContent from '../../components/AboutSiteContent';

/**
 * Page "À propos du site"
 * Client Component : Fait un fetch vers l'API pour obtenir le JSON
 * Stratégie B : Séparation claire client/serveur via API JSON
 */
export default function AboutSitePage() {
  return <AboutSiteContent />;
}
