'use client';

import React from 'react';
import {
  Mail,
  Youtube,
  Linkedin,
  Network,
  Info,
  BarChart3,
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
  'Plan du site': Network, // Alias français pour Network
  Info,
  BarChart3, // Pour "Metrics"
};

const FooterButton: React.FC<FooterButtonProps> = ({
  id,
  icone,
  command,
  alt,
  url,
  tooltip,
  e2eID,
  onButtonClick,
}) => {
  const handleClick = () => {
    onButtonClick(command, url);
  };

  // Vérifier que icone est défini
  if (!icone) {
    console.error(`Button "${id}" has no icon defined`);
    return null;
  }

  // Récupère dynamiquement l'icône lucide-react par son nom
  // Le JSON utilise "icone" (avec un "e")
  const IconComponent = iconMap[icone];

  if (!IconComponent) {
    console.error(`Icon "${icone}" not found in iconMap for button "${id}"`);
    return null;
  }

  // Construire les data-testid : e2eID en priorité, sinon footer-button-{id}
  const testIds: Record<string, string> = {
    'data-testid': `footer-button-${id}`,
  };
  if (e2eID) {
    testIds['data-testid'] = `e2eid-${e2eID}`;
  }

  return (
    <button
      className={styles.iconButton}
      onClick={handleClick}
      aria-label={alt || icone}
      title={tooltip || icone}
      {...testIds}
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
