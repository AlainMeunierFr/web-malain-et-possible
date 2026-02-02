'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="accordionSection">
      <button
        className="accordionHeader"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-')}`}
        type="button"
      >
        <h1 className="accordionTitle">{title}</h1>
        {isOpen ? (
          <ChevronUp className="accordionIcon" aria-hidden="true" />
        ) : (
          <ChevronDown className="accordionIcon" aria-hidden="true" />
        )}
      </button>
      <div
        id={`accordion-content-${title.replace(/\s+/g, '-')}`}
        className={`accordionContent ${isOpen ? 'open' : 'closed'}`}
        aria-hidden={!isOpen}
      >
        <div className="accordionContentInner">{children}</div>
      </div>
    </section>
  );
};

export default AccordionSection;
