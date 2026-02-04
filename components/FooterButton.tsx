'use client';

import React from 'react';
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
import type { FooterButton } from '../types/footer';
import { getButtonAction } from '../utils/client';

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
  BarChart3, // Icône du bouton Metrics
  Metrics: BarChart3, // Alias : le JSON peut utiliser "Metrics"
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

  // Attribut e2eid pour les tests E2E : e2eID du JSON (garanti par Footer) ou fallback footer-button-{id}
  const e2eidAttr = e2eID ? `e2eid-${e2eID}` : `footer-button-${id}`;

  // Déterminer l'action pour savoir si c'est un lien interne ou externe
  const action = getButtonAction(command, url);
  
  // Props communes pour les liens ; e2eid en dernier pour qu'il ne soit jamais écrasé
  const linkProps = {
    className: 'bouton',
    'aria-label': alt || icone,
    title: tooltip || icone,
    e2eid: e2eidAttr,
  };

  // Contenu commun (icône) : aucun style imposé (raw) — taille, couleur, stroke = responsabilité du Designer via .footer .icone
  const iconContent = (
    <IconComponent className="icone" aria-hidden="true" />
  );

  // Navigation interne : <a> avec e2eid directement sur l'élément (fiable pour E2E, pas de Link Next.js qui peut ne pas transmettre l'attribut ou le clic)
  if (action.type === 'internal') {
    return (
      <a href={action.route} {...linkProps}>
        {iconContent}
      </a>
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
