'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    _paq: Array<unknown[]>;
  }
}

interface MatomoProps {
  matomoUrl?: string;
  siteId?: string;
}

const MatomoInner: React.FC<MatomoProps> = ({ 
  matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL,
  siteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID 
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ne rien faire si les variables d'environnement ne sont pas définies
    if (!matomoUrl || !siteId) {
      console.warn('Matomo: Variables d\'environnement non définies. Tracking désactivé.');
      return;
    }

    // Initialiser _paq si ce n'est pas déjà fait
    window._paq = window._paq || [];

    // Configuration Matomo
    const cleanUrl = matomoUrl.replace(/\/$/, ''); // Retirer le slash final s'il existe
    window._paq.push(['setTrackerUrl', `${cleanUrl}/matomo.php`]);
    window._paq.push(['setSiteId', siteId]);
    window._paq.push(['enableLinkTracking']);

    // Charger le script Matomo
    const script = document.createElement('script');
    script.async = true;
    script.src = `${cleanUrl}/matomo.js`;
    script.onerror = () => {
      console.error('Matomo: Erreur lors du chargement du script de tracking');
    };
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    // Nettoyage lors du démontage
    return () => {
      // Le script reste chargé, mais on peut nettoyer si nécessaire
    };
  }, [matomoUrl, siteId]);

  // Tracker les changements de page (SPA)
  useEffect(() => {
    if (!matomoUrl || !siteId || !window._paq) {
      return;
    }

    // Construire l'URL complète avec les query params
    const fullUrl = searchParams.toString() 
      ? `${pathname}?${searchParams.toString()}` 
      : pathname;

    // Tracker la page vue
    window._paq.push(['setCustomUrl', fullUrl]);
    window._paq.push(['trackPageView']);
  }, [pathname, searchParams, matomoUrl, siteId]);

  // Ce composant ne rend rien
  return null;
};

const Matomo: React.FC<MatomoProps> = (props) => {
  return (
    <Suspense fallback={null}>
      <MatomoInner {...props} />
    </Suspense>
  );
};

export default Matomo;
