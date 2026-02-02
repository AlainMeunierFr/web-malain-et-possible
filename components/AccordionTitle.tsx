'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const headerClass = level === 1 ? 'headerH1' : 'headerH2';
  const titleClass = level === 1 ? 'titleH1' : 'titleH2';
  const contentClass = level === 1 ? 'contentH1' : 'contentH2';

  return (
    <div className="accordionTitle">
      <button
        className={headerClass}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-${level}-${title.replace(/\s+/g, '-')}`}
        type="button"
      >
        <TitleTag className={titleClass}>{title}</TitleTag>
        {isOpen ? (
          <ChevronUp className="icon" aria-hidden="true" />
        ) : (
          <ChevronDown className="icon" aria-hidden="true" />
        )}
      </button>
      <div
        id={`accordion-${level}-${title.replace(/\s+/g, '-')}`}
        className={`${contentClass} ${isOpen ? 'open' : 'closed'}`}
        aria-hidden={!isOpen}
      >
        <div className="contentInner">{children}</div>
      </div>
    </div>
  );
};

export default AccordionTitle;
