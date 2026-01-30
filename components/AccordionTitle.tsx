'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './AccordionTitle.module.css';

export interface AccordionTitleProps {
  title: string;
  level: 1 | 2;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** Appelé quand l'accordéon est ouvert ou fermé (pour chargement lazy, etc.) */
  onOpenChange?: (open: boolean) => void;
}

const AccordionTitle: React.FC<AccordionTitleProps> = ({
  title,
  level,
  children,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onOpenChange?.(next);
  };

  const TitleTag = level === 1 ? 'h1' : 'h2';
  const headerClass = level === 1 ? styles.headerH1 : styles.headerH2;
  const titleClass = level === 1 ? styles.titleH1 : styles.titleH2;
  const contentClass = level === 1 ? styles.contentH1 : styles.contentH2;

  return (
    <div className={styles.accordionTitle}>
      <button
        className={headerClass}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-${level}-${title.replace(/\s+/g, '-')}`}
        type="button"
      >
        <TitleTag className={titleClass}>{title}</TitleTag>
        {isOpen ? (
          <ChevronUp className={styles.icon} aria-hidden="true" />
        ) : (
          <ChevronDown className={styles.icon} aria-hidden="true" />
        )}
      </button>
      <div
        id={`accordion-${level}-${title.replace(/\s+/g, '-')}`}
        className={`${contentClass} ${isOpen ? styles.open : styles.closed}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
};

export default AccordionTitle;
