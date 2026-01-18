'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './AccordionSection.module.css';

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
    <section className={styles.accordionSection}>
      <button
        className={styles.accordionHeader}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-')}`}
        type="button"
      >
        <h1 className={styles.accordionTitle}>{title}</h1>
        {isOpen ? (
          <ChevronUp className={styles.accordionIcon} aria-hidden="true" />
        ) : (
          <ChevronDown className={styles.accordionIcon} aria-hidden="true" />
        )}
      </button>
      <div
        id={`accordion-content-${title.replace(/\s+/g, '-')}`}
        className={`${styles.accordionContent} ${isOpen ? styles.open : styles.closed}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.accordionContentInner}>{children}</div>
      </div>
    </section>
  );
};

export default AccordionSection;
