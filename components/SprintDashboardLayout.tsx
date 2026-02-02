'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { LigneDeMenu } from '../utils/menuReader';
import SprintBoardKanban, { type SprintBoardData } from './SprintBoardKanban';

export default function SprintDashboardLayout({ lignes }: { lignes: LigneDeMenu[] }) {
  const pathname = usePathname();
  const [data, setData] = useState<SprintBoardData | null>(null);
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
                    href="/a-propos-du-site"
                    className={estSurBoard ? 'lienActif' : 'lien'}
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
