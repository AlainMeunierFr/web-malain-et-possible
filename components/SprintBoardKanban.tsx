'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { parseInlineMarkdown } from '../utils/markdownInlineParser';
import UsDetailModal from './UsDetailModal';

/** Carte US (sans contenu, chargé à la demande) */
interface UsCard {
  id: string;
  titre: string;
  filename: string;
  state: 'a_faire' | 'en_cours' | 'fait';
  agentColumn?: string;
  /** Rotation en degrés (-3 à +3), déterministe (backend) */
  rotation?: number;
}

/** Colonne du board (exporté pour usage dans le layout) */
export interface BoardColumn {
  id: string;
  label: string;
  type: 'a_faire' | 'agent' | 'fait';
  count: number;
  wipLimit?: string;
}

/** Réponse API sprint-board (exporté pour usage dans le layout) */
export interface SprintBoardData {
  goal: string;
  columns: BoardColumn[];
  cards: UsCard[];
}

/** Réponse API /api/sprint-board/us/[usId] */
interface UsContent {
  id: string;
  titre: string;
  content: string;
}

function getCardsForColumn(column: BoardColumn, cards: UsCard[]): UsCard[] {
  if (column.type === 'a_faire') return cards.filter((c) => c.state === 'a_faire');
  if (column.type === 'fait') return cards.filter((c) => c.state === 'fait');
  if (column.type === 'agent') return cards.filter((c) => c.state === 'en_cours' && c.agentColumn === column.id);
  return [];
}

function getColumnCountLabel(column: BoardColumn): string {
  if (column.type === 'agent' && column.wipLimit) return column.wipLimit;
  return String(column.count);
}

interface SprintBoardKanbanProps {
  /** Données pré-chargées par le layout (évite double fetch). Si fourni, le goal n'est pas rendu ici. */
  initialData?: SprintBoardData | null;
  /** Quand true, ne jamais afficher le Sprint Goal (il est affiché par le parent, ex. layout). */
  hideGoal?: boolean;
}

export default function SprintBoardKanban({ initialData: initialDataProp, hideGoal = false }: SprintBoardKanbanProps = {}) {
  const [data, setData] = useState<SprintBoardData | null>(initialDataProp ?? null);
  const [error, setError] = useState<string | null>(null);
  const [usDetail, setUsDetail] = useState<UsContent | null>(null);
  const [loadingUs, setLoadingUs] = useState(false);
  const isControlled = initialDataProp !== undefined;

  const openUsDetail = useCallback((usId: string) => {
    setLoadingUs(true);
    setUsDetail(null);
    fetch(`/api/sprint-board/us/${encodeURIComponent(usId)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('US introuvable'))))
      .then((json: UsContent) => setUsDetail(json))
      .catch(() => setUsDetail(null))
      .finally(() => setLoadingUs(false));
  }, []);

  const closeUsDetail = useCallback(() => setUsDetail(null), []);

  useEffect(() => {
    if (isControlled) {
      setData(initialDataProp);
      return;
    }
    fetch('/api/sprint-board')
      .then((res) => res.json())
      .then((json: SprintBoardData & { error?: string }) => {
        setData({
          goal: json.goal ?? '',
          columns: json.columns ?? [],
          cards: json.cards ?? [],
        });
        if (json.error) setError(json.error);
      })
      .catch(() => setError('Impossible de charger le board'));
  }, [isControlled, initialDataProp]);

  if (error && !data?.columns?.length) {
    return (
      <div className="sprintBoard">
        <p className="texteLarge">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="sprintBoard">
        <p>Chargement du sprint en cours…</p>
      </div>
    );
  }

  const showGoal = !hideGoal && data.goal;

  return (
    <div className="sprintBoard">
      {showGoal && (
        <div className="texteLarge sprintBoardGoal" e2eid="sprint-goal">
          {data.goal.split(/\r?\n/).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
      <div className="sprintBoardTable" role="table" aria-label="Board KanBan du sprint">
        <div className="sprintBoardRow sprintBoardRowStatic" role="row">
          {data.columns.map((col) => (
            <div
              key={col.id}
              className="sprintBoardColumn"
              role="columnheader"
              data-column-id={col.id}
              data-column-type={col.type}
            >
              <div className="sprintBoardColumnHeader">
                <span className="sprintBoardColumnTitle">{col.label}</span>
                <span className="sprintBoardColumnCount" aria-label={`Décompte ${col.label}`}>
                  {getColumnCountLabel(col)}
                </span>
              </div>
              <div className="sprintBoardColumnCards" role="rowgroup">
                {getCardsForColumn(col, data.cards).map((card) => (
                  <div
                    key={card.id}
                    className="sprintBoardCard"
                    data-us-id={card.id}
                    data-state={card.state}
                    style={{ transform: `rotate(${card.rotation ?? 0}deg)` }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Voir le détail de ${card.id} - ${card.titre}`}
                    onClick={() => openUsDetail(card.id)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openUsDetail(card.id)}
                  >
                    <span className="sprintBoardCardContent titreUS">
                      {parseInlineMarkdown(`**${card.id}** - ${card.titre}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {loadingUs && (
        <p className="usDetailLoading" aria-live="polite">
          Chargement de l&apos;US…
        </p>
      )}
      {usDetail && (
        <UsDetailModal data={usDetail} onClose={closeUsDetail} />
      )}
    </div>
  );
}
