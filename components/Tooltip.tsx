/**
 * Composant Tooltip - Version simple qui fonctionne avec les tests
 */

'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'bottom',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLElement>(null);

  if (!content) return <>{children}</>;

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + (rect.width / 2)
      });
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleFocus = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + (rect.width / 2)
      });
    }
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  const triggerWithEvents = React.cloneElement(
    React.Children.only(children) as React.ReactElement<any>,
    {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      'aria-describedby': isVisible ? 'tooltip-active' : undefined,
      'aria-label': 'Plus d\'informations',
      tabIndex: 0
    }
  );

  const positionClass = position === 'top' ? 'infobulleHaut' : position === 'bottom' ? 'infobulleBas' : position === 'left' ? 'infobulleGauche' : 'infobulleDroite';

  // Portal pour rendre la tooltip directement dans le body (styles depuis metrics.css)
  const tooltipElement = isVisible ? (
    <div
      data-testid="tooltip"
      id="tooltip-active"
      role="tooltip"
      className={`infobulle ${positionClass} ${className}`.trim()}
      style={{
        position: 'absolute',
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        transform: 'translateX(-50%)',
        pointerEvents: 'none'
      }}
    >
      <div className="contenu" data-testid="tooltip-content">
        {content}
      </div>
    </div>
  ) : null;

  return (
    <>
      {triggerWithEvents}
      {typeof document !== 'undefined' && tooltipElement && 
        createPortal(tooltipElement, document.body)
      }
    </>
  );
};

export default Tooltip;