'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SprintBoardKanban, { type SprintBoardData } from './SprintBoardKanban';
import SwaggerUIWrapper from './SwaggerUIWrapper';
import MetricsCompact from './MetricsCompact';

type ContainerView = 'sprint' | 'openapi' | 'metrics';

function viewFromParams(searchParams: URLSearchParams): ContainerView {
  const view = searchParams.get('view');
  if (view === 'openapi') return 'openapi';
  if (view === 'metrics') return 'metrics';
  return 'sprint';
}

/**
 * Contenu principal de la page "A propos du site".
 * Affiche le Sprint Board, l'API OpenAPI ou les Métriques selon le paramètre ?view=
 * Le menu est géré par le layout parent.
 */
function SprintDashboardInner() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SprintBoardData | null>(null);
  const activeView = viewFromParams(searchParams);

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

  if (activeView === 'openapi') {
    return (
      <section className="zoneOpenAPI" e2eid="zone-openapi" aria-label="Documentation API">
        <SwaggerUIWrapper specUrl="/api/vitrine/openapi.json" />
      </section>
    );
  }

  if (activeView === 'metrics') {
    return (
      <section className="zoneMetrics" e2eid="zone-metrics" aria-label="Métriques de qualité">
        <MetricsCompact />
      </section>
    );
  }

  return (
    <>
      {/* Sprint Goal à droite */}
      <div className="dashboardHeader">
        <div className="sprintGoalContainer">
          {data?.goal && (
            <div className="sprintGoal" e2eid="sprint-goal">
              {data.goal.split(/\r?\n/).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <section className="zoneSprint" e2eid="zone-sprint" aria-label="Sprint en cours">
        <SprintBoardKanban initialData={data} hideGoal />
      </section>
    </>
  );
}

export default function SprintDashboardContent() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SprintDashboardInner />
    </Suspense>
  );
}
