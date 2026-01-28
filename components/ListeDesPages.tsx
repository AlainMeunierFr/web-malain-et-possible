'use client';

import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { PlanSite, PlanPage } from '../utils/siteMapGenerator';
import { generateE2eIdFromUrl } from '../utils/e2eIdFromUrl';

export default function ListeDesPages() {
  const [planSite, setPlanSite] = useState<PlanSite>({ pages: [], liens: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger le JSON depuis l'API
    fetch('/api/site-map')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: PlanSite) => {
        console.log('ListeDesPages - Données reçues de l\'API:', {
          pagesCount: data.pages?.length || 0,
          liensCount: data.liens?.length || 0,
          firstPage: data.pages?.[0],
        });
        setPlanSite(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement du plan du site:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  // Organiser les pages par zone
  // Filtrer les pages : exclure celles avec zone "Masqué" ou dessiner "Non"
  const pagesAAfficher = planSite.pages.filter((p) => {
    const zone = (p as any).zone;
    const dessiner = p.dessiner;
    return zone !== 'Masqué' && dessiner !== 'Non';
  });

  const pagesParZone = {
    HomePage: pagesAAfficher.filter((p) => (p as any).zone === 'HomePage'),
    Profils: pagesAAfficher.filter((p) => (p as any).zone === 'Profils'),
    Autres: pagesAAfficher.filter((p) => (p as any).zone === 'Autres'),
    Footer: pagesAAfficher.filter((p) => (p as any).zone === 'Footer'),
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
        zone: (p as any).zone,
        dessiner: p.dessiner,
      })),
    });
    return <div className="listeDesPages">Aucune page à afficher.</div>;
  }

  const renderPageButton = (page: PlanPage) => {
    const e2eId = generateE2eIdFromUrl(page.url);
    return (
      <Link 
        key={page.url}
        href={page.url}
        className="bouton"
        data-e2eid={`e2eid-${e2eId}`}
      >
        {page.titre}
      </Link>
    );
  };

  return (
    <div className="listeDesPages">
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
