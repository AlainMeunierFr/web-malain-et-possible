'use client';

import React from 'react';
import { CheckSquare } from 'lucide-react';
import CourseMarkdownRenderer from './CourseMarkdownRenderer';

export interface UsContent {
  id: string;
  titre: string;
  content: string;
}

interface UsDetailModalProps {
  /** Contenu US (id, titre, content markdown) */
  data: UsContent;
  /** Fermer la modal */
  onClose: () => void;
}

/** Retourne le contenu à partir de la ligne contenant "En tant que" (sans répéter la première ligne / titre du fichier). */
function contentFromEnTantQue(content: string): string {
  const idx = content.search(/En tant que/i);
  if (idx === -1) return content;
  const lineStart = content.lastIndexOf('\n', idx) + 1;
  return content.slice(lineStart).trim();
}

/** Sépare le contenu US en bloc fixe (En tant que... Afin de) et bloc défilable (CA et suite). */
function splitUsContent(content: string): { fixed: string; scroll: string } {
  const fromEnTantQue = contentFromEnTantQue(content);
  const match = fromEnTantQue.match(/\n\s*-\s*\*\*Critères d[\u2019']acceptation\*\*\s*:?/i);
  const idx = match ? (match.index ?? -1) : -1;
  if (idx === -1) {
    return { fixed: '', scroll: fromEnTantQue };
  }
  return {
    fixed: fromEnTantQue.slice(0, idx).trim(),
    scroll: fromEnTantQue.slice(idx).trim(),
  };
}

export default function UsDetailModal({ data, onClose }: UsDetailModalProps) {
  const { fixed, scroll } = splitUsContent(data.content);

  return (
    <div
      className="modalDetailUS"
      role="dialog"
      aria-modal="true"
      aria-labelledby="us-detail-title"
      e2eid="us-detail-modal"
    >
      <div className="fenetre">
        <header className="enTete">
          <h2 id="us-detail-title" className="titre">
            <strong>{data.id}</strong> – {data.titre}
          </h2>
          <button
            type="button"
            className="fermer"
            onClick={onClose}
            aria-label="Fermer la modal"
            e2eid="us-detail-modal-close"
          >
            <CheckSquare size={28} aria-hidden />
          </button>
        </header>
        {fixed && (
          <div className="zoneFixe">
            <div className="contenu">
              <CourseMarkdownRenderer content={fixed} />
            </div>
          </div>
        )}
        <div className="zoneScroll">
          <div className="contenu">
            <CourseMarkdownRenderer content={scroll} />
          </div>
        </div>
      </div>
    </div>
  );
}
