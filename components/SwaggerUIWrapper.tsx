'use client';

/**
 * Composant wrapper pour Swagger UI
 * US-12.6 - CA6 : Documentation Swagger
 * Client Component car Swagger UI utilise le DOM
 */

import React from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// Import dynamique pour éviter les problèmes de SSR
const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <p>Chargement de la documentation API...</p>,
});

interface SwaggerUIWrapperProps {
  specUrl: string;
}

export default function SwaggerUIWrapper({ specUrl }: SwaggerUIWrapperProps) {
  return (
    <div className="swaggerUIWrapper">
      <h1>API Vitrine - Documentation</h1>
      <p>
        Documentation interactive de l'API REST du site vitrine. Utilisez les
        modes <code>refs</code> (clés étrangères) ou <code>full</code> (arbre
        complet) selon vos besoins.
      </p>
      <SwaggerUI url={specUrl} />
    </div>
  );
}
