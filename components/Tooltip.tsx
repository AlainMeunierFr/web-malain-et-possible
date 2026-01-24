/**
 * Composant Tooltip réutilisable et accessible
 * Support hover, focus clavier, et navigation ARIA
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  maxWidth?: string;
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  className = '',
  maxWidth = '400px'
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calcul de la position optimale du tooltip
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newPosition = position;

      // Vérifier si le tooltip déborde horizontalement
      if (position === 'top' || position === 'bottom') {
        const tooltipLeft = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        if (tooltipLeft < 10) {
          // Pas assez de place à gauche, rester centré mais ajuster
        } else if (tooltipLeft + tooltipRect.width > viewportWidth - 10) {
          // Pas assez de place à droite, rester centré mais ajuster
        }
      }

      // Vérifier si le tooltip déborde verticalement
      if (position === 'top' && triggerRect.top - tooltipRect.height < 10) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && triggerRect.bottom + tooltipRect.height > viewportHeight - 10) {
        newPosition = 'top';
      }

      setActualPosition(newPosition);
    }
  }, [isVisible, position]);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideTooltip();
    }
  };

  return (
    <div 
      className={`${styles.tooltipContainer} ${className}`}
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-describedby={isVisible ? 'tooltip-content' : undefined}
      aria-expanded={isVisible}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip-content"
          className={`${styles.tooltip} ${styles[`tooltip${actualPosition.charAt(0).toUpperCase()}${actualPosition.slice(1)}`]}`}
          style={{ maxWidth }}
          role="tooltip"
          aria-live="polite"
        >
          <div className={styles.tooltipContent}>
            {content}
          </div>
          <div className={`${styles.tooltipArrow} ${styles[`arrow${actualPosition.charAt(0).toUpperCase()}${actualPosition.slice(1)}`]}`} />
        </div>
      )}
    </div>
  );
}

export default Tooltip;