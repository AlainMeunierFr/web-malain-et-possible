'use client';

import React from 'react';
import Link from 'next/link';
import {
  Mail,
  Youtube,
  Linkedin,
  Network,
  Info,
  BarChart3,
  Calendar,
  type LucideIcon,
} from 'lucide-react';
import styles from './Footer.module.css';
import type { FooterButton } from '../types/footer';
import { getButtonAction } from '../utils/buttonHandlers';

export interface FooterButtonProps extends FooterButton {
  onButtonClick?: (command: string, url: string | null) => void;
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
  Calendar, // Pour "Faisons connaissance"
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

  // Construire les data-e2eid : e2eID en priorité, sinon footer-button-{id}
  const testIds: Record<string, string> = {
    'data-e2eid': `footer-button-${id}`,
  };
  if (e2eID) {
    testIds['data-e2eid'] = `e2eid-${e2eID}`;
  }

  // Déterminer l'action pour savoir si c'est un lien interne ou externe
  const action = getButtonAction(command, url);
  
  // Props communes pour les liens
  const linkProps = {
    className: styles.iconButton,
    'aria-label': alt || icone,
    title: tooltip || icone,
    ...testIds,
  };

  // Contenu commun (icône)
  const iconContent = (
    <IconComponent
      size={30}
      color="white"
      strokeWidth={2}
      className={styles.iconImage}
      aria-hidden="true"
    />
  );

  // Navigation interne : utiliser Link de Next.js
  if (action.type === 'internal') {
    return (
      <Link href={action.route} {...linkProps}data-e2eid="l33">
        {iconContent}
      </Link>
    );
  }

  // Navigation externe : utiliser <a>
  if (action.type === 'external') {
    return (
      <a
        href={action.url}
        target="_blank"
        rel="noopener noreferrer"
        {...linkProps}
      >
        {iconContent}
      </a>
    );
  }

  // Fallback : alert (cas rare, garder le comportement actuel avec onClick)
  // Mais on utilise quand même un lien pour la sémantique
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onButtonClick) {
      onButtonClick(command, url);
    } else {
      alert(action.message);
    }
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      {...linkProps}
    >
      {iconContent}
    </a>
  );
};

export default FooterButton;
