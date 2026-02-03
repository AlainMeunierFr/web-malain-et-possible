'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { parseInlineMarkdown } from '../utils/markdownInlineParser';

const UsDetailModal = dynamic(() => import('./UsDetailModal'), { ssr: false });

/** Carte US (sans contenu, chargé à la demande) */
interface UsCard {
  id: string;
  titre: string;
  filename: string;
  state: 'a_faire' | 'en_cours' | 'fait';
  agentColumn?: string;
  /** Rotation en degrés (-3 à +3), déterministe (backend) */
  rotation?: number;
  /** True si l'US est en phase de revue (étape avec suffixe -review) */
  enRevue?: boolean;
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

  // Synchroniser data avec initialDataProp quand contrôlé (sans effet)
  const effectiveData = isControlled ? initialDataProp : data;

  useEffect(() => {
    if (isControlled) {
      // Données fournies par le parent, pas de fetch
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

  if (error && !effectiveData?.columns?.length) {
    return (
      <div className="tableauSprint">
        <p className="texteLarge">{error}</p>
      </div>
    );
  }

  if (!effectiveData) {
    return (
      <div className="tableauSprint">
        <p>Chargement du sprint en cours…</p>
      </div>
    );
  }

  const showGoal = !hideGoal && effectiveData.goal;

  return (
    <div className="tableauSprint">
      {showGoal && (
        <div className="texteLarge objectif" e2eid="sprint-goal">
          {effectiveData.goal.split(/\r?\n/).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
      <div className="grille" role="table" aria-label="Board KanBan du sprint">
        <div className="ligne ligneStatique" role="row">
          {effectiveData.columns.map((col) => (
            <div
              key={col.id}
              className="colonneTableauSprint"
              role="columnheader"
              data-column-id={col.id}
              data-column-type={col.type}
            >
              <div className="enTete">
                <span className="titre">{col.label}</span>
                <span className="compte" aria-label={`Décompte ${col.label}`}>
                  {getColumnCountLabel(col)}
                </span>
              </div>
              <div className="cartes" role="rowgroup">
                                {getCardsForColumn(col, effectiveData.cards).map((card) => (
                                  <div
                                    key={card.id}
                                    className="carteUS"
                                    data-us-id={card.id}
                                    data-state={card.state}
                                    style={{ transform: `rotate(${card.rotation ?? 0}deg)` }}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Voir le détail de ${card.id} - ${card.titre}`}
                                    onClick={() => openUsDetail(card.id)}
                                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openUsDetail(card.id)}
                                  >
                                    {card.enRevue && (
                                      <span className="badgeEnRevue" aria-label="En revue">🔍</span>
                                    )}
                                    <span className="contenu titre">
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
        <p className="chargementUS" aria-live="polite">
          Chargement de l&apos;US…
        </p>
      )}
      {usDetail && (
        <UsDetailModal data={usDetail} onClose={closeUsDetail} />
      )}
    </div>
  );
}
