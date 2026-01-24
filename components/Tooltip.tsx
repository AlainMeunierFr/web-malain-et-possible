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

  // Portal pour rendre la tooltip directement dans le body
  const tooltipElement = isVisible ? (
    <div
      data-testid="tooltip"
      id="tooltip-active"
      role="tooltip"
      className={className}
      style={{
        position: 'absolute',
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        transform: 'translateX(-50%)',
        zIndex: 2147483647,
        background: 'white',
        border: '2px solid #3b82f6',
        padding: '1rem',
        borderRadius: '8px',
        maxWidth: '350px',
        minWidth: '280px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        fontSize: '14px',
        color: '#1f2937',
        whiteSpace: 'normal',
        pointerEvents: 'none' // Évite les interactions qui fermeraient la tooltip
      }}
    >
      <div data-testid="tooltip-content">
        {content}
      </div>
      {/* Flèche pointant vers l'icône */}
      <div style={{
        position: 'absolute',
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderBottom: '8px solid #3b82f6'
      }} />
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