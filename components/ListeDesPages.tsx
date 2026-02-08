'use client';

import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { PlanSite, PlanPage } from '../utils/client';
import { generateE2eIdFromUrl } from '../utils/client';

/** Données initiales issues de plan-du-site.json (rendu pur JSON, pas de fetch). */
export interface ListeDesPagesInitial {
  url: string;
  titre: string;
  zone?: string;
  dessiner?: string;
}

export default function ListeDesPages({ initialPages }: { initialPages?: ListeDesPagesInitial[] }) {
  const [planSite, setPlanSite] = useState<PlanSite>({ pages: [], liens: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialPages && initialPages.length > 0) {
      queueMicrotask(() => setLoading(false));
      return;
    }
    fetch('/api/site-map')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: PlanSite) => {
        setPlanSite(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement du plan du site:', error);
        setLoading(false);
      });
  }, [initialPages]);

  // Données : plan-du-site.json (initialPages) ou API
  const pagesSource = initialPages?.length ? (initialPages as PlanPage[]) : planSite.pages;
  if (loading && !initialPages?.length) {
    return <div>Chargement...</div>;
  }

  // Organiser les pages par zone ; filtrer : exclure zone "Masqué" et dessiner "Non"
  const pagesAAfficher = pagesSource.filter((p) => {
    const zone = p.zone;
    const dessiner = p.dessiner;
    return zone !== 'Masqué' && dessiner !== 'Non';
  });

  const pagesParZone = {
    // Zone du haut : HomePage (ex. Home, Mes Profils)
    HomePage: pagesAAfficher
      .filter((p) => p.zone === 'HomePage')
      .sort((a, b) => (a.ordre ?? 99) - (b.ordre ?? 99)),
    Profils: pagesAAfficher.filter((p) => p.zone === 'Profils'),
    Autres: pagesAAfficher.filter((p) => p.zone === 'Autres'),
    Footer: pagesAAfficher.filter((p) => p.zone === 'Footer'),
  };

  const totalPages = pagesParZone.HomePage.length + pagesParZone.Profils.length + 
                     pagesParZone.Autres.length + pagesParZone.Footer.length;

  if (totalPages === 0) {
    // Debug : afficher les informations pour comprendre le problème
    console.log('ListeDesPages - Debug:', {
      totalPages: planSite.pages.length,
      pagesAAfficher: pagesAAfficher.length,
      pagesParZone,
      toutesLesPages: planSite.pages.map((p) => ({
        url: p.url,
        titre: p.titre,
        zone: p.zone,
        dessiner: p.dessiner,
      })),
    });
    return <div className="listeDesPages-cont">Aucune page à afficher.</div>;
  }

  const renderPageButton = (page: PlanPage) => {
    const e2eId = page.e2eID ?? generateE2eIdFromUrl(page.url);
    return (
      <Link 
        key={page.url}
        href={page.url}
        className="bouton"
        e2eid={`e2eid-${e2eId}`}
      >
        {page.titre}
      </Link>
    );
  };

  return (
    <div className="listeDesPages-cont" data-layout="draw with page properties">
      {/* Ligne 1 : HomePage (horizontal) */}
      {pagesParZone.HomePage.length > 0 && (
        <div className="ligne-1 zone-homepage">
          {pagesParZone.HomePage.map(renderPageButton)}
        </div>
      )}

      {/* Ligne 2 : Profils (horizontal) */}
      {pagesParZone.Profils.length > 0 && (
        <div className="ligne-2 zone-profils">
          {pagesParZone.Profils.map(renderPageButton)}
        </div>
      )}

      {/* Ligne 3 : Autres (gauche, vertical) et Footer (droite, vertical) */}
      {(pagesParZone.Autres.length > 0 || pagesParZone.Footer.length > 0) && (
        <div className="ligne-3">
          {pagesParZone.Autres.length > 0 && (
            <div className="colonne-gauche zone-autres">
              {pagesParZone.Autres.map(renderPageButton)}
            </div>
          )}
          {pagesParZone.Footer.length > 0 && (
            <div className="colonne-droite zone-footer">
              {pagesParZone.Footer.map(renderPageButton)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
