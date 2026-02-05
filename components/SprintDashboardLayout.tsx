'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { LigneDeMenu } from '../utils/client';
import SprintBoardKanban, { type SprintBoardData } from './SprintBoardKanban';
import SwaggerUIWrapper from './SwaggerUIWrapper';

type ContainerView = 'sprint' | 'openapi';

function viewFromParams(searchParams: URLSearchParams): ContainerView {
  return searchParams.get('view') === 'openapi' ? 'openapi' : 'sprint';
}

// Composant interne qui utilise useSearchParams
function SprintDashboardContent({ lignes }: { lignes: LigneDeMenu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState<SprintBoardData | null>(null);
  const activeView = viewFromParams(searchParams);
  const estSurBoard = pathname === '/a-propos-du-site';

  useEffect(() => {
    fetch('/api/sprint-board')
      .then((res) => res.json())
      .then((json: SprintBoardData & { error?: string }) => {
        setData({
          goal: json.goal ?? '',
          columns: json.columns ?? [],
          cards: json.cards ?? [],
        } as SprintBoardData);
      })
      .catch(() => setData({ goal: '', columns: [], cards: [] }));
  }, []);

  // Déterminer le lien href pour un item container
  const getContainerHref = (parametre: string): string => {
    if (parametre === 'openapi') {
      return '/a-propos-du-site?view=openapi';
    }
    // Sprint en cours (par défaut)
    return '/a-propos-du-site';
  };

  // Déterminer si un item container est actif
  const isContainerActive = (parametre: string): boolean => {
    if (!estSurBoard) return false;
    if (parametre === 'openapi') {
      return activeView === 'openapi';
    }
    // Sprint en cours est actif si on est sur le board sans view=openapi
    return activeView === 'sprint';
  };

  // Rendu de la zone centrale selon la vue active
  const renderContent = () => {
    if (activeView === 'openapi') {
      return (
        <section className="zoneOpenAPI" e2eid="zone-openapi" aria-label="Documentation API">
          <SwaggerUIWrapper specUrl="/api/vitrine/openapi.json" />
        </section>
      );
    }
    return (
      <section className="zoneSprint" e2eid="zone-sprint" aria-label="Sprint en cours">
        <SprintBoardKanban initialData={data} hideGoal />
      </section>
    );
  };

  return (
    <>
      <div className="dashboardHeader">
        <nav
          className="bandeDossiers"
          data-testid="bande-dossiers"
          aria-label="Lignes de menu"
        >
          <ul className="liste">
            {lignes.map((ligne) => (
              <li key={`${ligne.Numéro}-${ligne.Titre}`} className="item">
                {ligne.Type === 'Path' ? (
                  <Link
                    href={`/a-propos-du-site/${encodeURIComponent(ligne.Parametre)}`}
                    className="lien"
                    e2eid={ligne.e2eID ? `e2eid-${ligne.e2eID}` : `e2eid-menu-${ligne.Titre.replace(/\s/g, '-')}`}
                  >
                    {ligne.Titre}
                  </Link>
                ) : (
                  <Link
                    href={getContainerHref(ligne.Parametre)}
                    className={isContainerActive(ligne.Parametre) ? 'lienActif' : 'lien'}
                    e2eid={ligne.e2eID ? `e2eid-${ligne.e2eID}` : `e2eid-menu-${ligne.Titre.replace(/\s/g, '-')}`}
                  >
                    {ligne.Titre}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="sprintGoalContainer">
          {activeView === 'sprint' && data?.goal && (
            <div className="sprintGoal" e2eid="sprint-goal">
              {data.goal.split(/\r?\n/).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
      {renderContent()}
    </>
  );
}

// Composant exporté avec Suspense boundary pour useSearchParams
export default function SprintDashboardLayout({ lignes }: { lignes: LigneDeMenu[] }) {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SprintDashboardContent lignes={lignes} />
    </Suspense>
  );
}
