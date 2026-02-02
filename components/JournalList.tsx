'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import type { JournalFile } from '../utils/journalReader';

export interface JournalListProps {
  journals: JournalFile[];
}

const JournalList: React.FC<JournalListProps> = ({ journals }) => {
  const [expandedJournals, setExpandedJournals] = useState<Set<string>>(new Set());

  const toggleJournal = (filename: string) => {
    const newExpanded = new Set(expandedJournals);
    if (newExpanded.has(filename)) {
      newExpanded.delete(filename);
    } else {
      newExpanded.add(filename);
    }
    setExpandedJournals(newExpanded);
  };

  if (journals.length === 0) {
    return <p>Aucun journal disponible.</p>;
  }

  return (
    <div className="journalList">
      {journals.map((journal) => {
        const isExpanded = expandedJournals.has(journal.filename);
        const displayName = journal.filename.replace('.md', '');
        
        return (
          <div key={journal.filename} className="journalItem">
            <button
              className="journalHeader"
              onClick={() => toggleJournal(journal.filename)}
              aria-expanded={isExpanded}
              aria-controls={`journal-content-${journal.filename}`}
              type="button"
            >
              <h2 className="journalDate">{displayName}</h2>
              {isExpanded ? (
                <ChevronUp className="journalIcon" aria-hidden="true" />
              ) : (
                <ChevronDown className="journalIcon" aria-hidden="true" />
              )}
            </button>
            <div
              id={`journal-content-${journal.filename}`}
              className={`journalContent ${isExpanded ? 'open' : 'closed'}`}
              aria-hidden={!isExpanded}
            >
              <div className="journalContentInner">
                <MarkdownRenderer content={journal.content} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JournalList;
