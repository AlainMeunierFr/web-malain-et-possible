'use client';

import React from 'react';
import {
  Mail,
  Youtube,
  Linkedin,
  Network,
  Info,
  type LucideIcon,
} from 'lucide-react';
import styles from './Footer.module.css';
import type { FooterButton } from '../types/footer';

export interface FooterButtonProps extends FooterButton {
  onButtonClick: (command: string, url: string | null) => void;
}

// Mapping des noms d'icônes vers les composants lucide-react
const iconMap: Record<string, LucideIcon> = {
  Mail,
  Youtube,
  Linkedin,
  Network, // Pour "Sitemap" (plan du site)
  Info,
};

const FooterButton: React.FC<FooterButtonProps> = ({
  id,
  icon,
  command,
  alt,
  url,
  tooltip,
  onButtonClick,
}) => {
  const handleClick = () => {
    onButtonClick(command, url);
  };

  // Récupère dynamiquement l'icône lucide-react par son nom
  const IconComponent = iconMap[icon];

  if (!IconComponent) {
    console.error(`Icon "${icon}" not found in iconMap`);
    return null;
  }

  return (
    <button
      className={styles.iconButton}
      onClick={handleClick}
      aria-label={alt}
      title={tooltip}
      data-testid={`footer-button-${id}`}
      type="button"
    >
      <IconComponent
        size={30}
        color="white"
        strokeWidth={2}
        className={styles.iconImage}
        aria-hidden="true"
      />
    </button>
  );
};

export default FooterButton;
