'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import type { JournalFile } from '../utils/journalReader';
import styles from './JournalList.module.css';

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
    <div className={styles.journalList}>
      {journals.map((journal) => {
        const isExpanded = expandedJournals.has(journal.filename);
        const displayName = journal.filename.replace('.md', '');
        
        return (
          <div key={journal.filename} className={styles.journalItem}>
            <button
              className={styles.journalHeader}
              onClick={() => toggleJournal(journal.filename)}
              aria-expanded={isExpanded}
              aria-controls={`journal-content-${journal.filename}`}
              type="button"
            >
              <h2 className={styles.journalDate}>{displayName}</h2>
              {isExpanded ? (
                <ChevronUp className={styles.journalIcon} aria-hidden="true" />
              ) : (
                <ChevronDown className={styles.journalIcon} aria-hidden="true" />
              )}
            </button>
            <div
              id={`journal-content-${journal.filename}`}
              className={`${styles.journalContent} ${isExpanded ? styles.open : styles.closed}`}
              aria-hidden={!isExpanded}
            >
              <div className={styles.journalContentInner}>
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
