'use client';

import React, { useState, useCallback } from 'react';
import AccordionTitle from './AccordionTitle';
import AboutSiteContent from './AboutSiteContent';
import type { DossierRacine, Chapitre } from '../utils';

export interface AccordionDossierProps {
  dossier: DossierRacine;
}

/**
 * Accordéon pour un dossier à la racine du Path (US-11.4).
 * Charge le contenu du chapitre au dépliage (lazy) via l'API /api/a-propos-chapitre.
 */
const AccordionDossier: React.FC<AccordionDossierProps> = ({ dossier }) => {
  const [chapitre, setChapitre] = useState<Chapitre | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChapitre = useCallback(async () => {
    if (chapitre !== null) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/a-propos-chapitre?path=${encodeURIComponent(dossier.path)}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Erreur ${res.status}`);
      }
      const data: Chapitre = await res.json();
      setChapitre(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [dossier.path, chapitre]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open && chapitre === null && !loading) fetchChapitre();
    },
    [chapitre, loading, fetchChapitre]
  );

  return (
    <AccordionTitle
      title={dossier.nom}
      level={1}
      defaultOpen={false}
      onOpenChange={handleOpenChange}
    >
      {error && <p role="alert">{error}</p>}
      {loading && !chapitre && <p>Chargement…</p>}
      {chapitre && (
        <AboutSiteContent
          structure={{ chapitres: [chapitre] }}
          startAtSections
          embedded
        />
      )}
    </AccordionTitle>
  );
};

export default AccordionDossier;
