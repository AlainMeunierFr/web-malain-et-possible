'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { PlanSite } from '../utils/siteMapGenerator';
import { generateE2eIdFromUrl } from '../utils/e2eIdFromUrl';
import styles from './ListeDesPages.module.css';

export default function ListeDesPages() {
  const [planSite, setPlanSite] = useState<PlanSite>({ pages: [], liens: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger le JSON depuis l'API
    fetch('/api/site-map')
      .then((res) => res.json())
      .then((data: PlanSite) => {
        // Filtrer les pages avec dessiner="Oui" et trier par numero
        const pagesAAfficher = data.pages
          .filter((page) => page.dessiner === 'Oui')
          .sort((a, b) => {
            // Trier par numero (si présent), sinon par ordre alphabétique du titre
            if (a.numero !== undefined && b.numero !== undefined) {
              return a.numero - b.numero;
            }
            if (a.numero !== undefined) return -1;
            if (b.numero !== undefined) return 1;
            return a.titre.localeCompare(b.titre);
          });
        setPlanSite({ ...data, pages: pagesAAfficher });
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


  return (
    <div className={styles.buttonsGrid}>
      {planSite.pages.map((page) => {
        const e2eId = generateE2eIdFromUrl(page.url);
        return (
          <Link 
            key={page.url}
            href={page.url}
            className={styles.pageButton}
            data-e2eid={`e2eid-${e2eId}`}
          >
            {page.titre}
          </Link>
        );
      })}
    </div>
  );
}
