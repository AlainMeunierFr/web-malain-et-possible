'use client';

import React from 'react';
import Link from 'next/link';
import type { ElementGroupeBoutons, BoutonGroupe } from '../utils/indexReader';
import { getButtonAction } from '../utils/buttonHandlers';
import {
  Mail,
  Youtube,
  Linkedin,
  UtensilsCrossed,
  Video,
  Phone,
  type LucideIcon,
} from 'lucide-react';

export interface GroupeBoutonsProps {
  element: ElementGroupeBoutons;
}

// Mapping des noms d'icônes vers les composants lucide-react
const iconMap: Record<string, LucideIcon> = {
  Mail,
  Youtube,
  Linkedin,
  UtensilsCrossed,
  Video,
  Phone,
};

const GroupeBoutons: React.FC<GroupeBoutonsProps> = ({ element }) => {

  const tailleClass = element.taille === 'petite' ? 'taillePetite' : 'tailleGrande';

  return (
    <div className={`groupeBoutons ${tailleClass}`}>
      {element.boutons.map((bouton) => {
        const IconComponent = iconMap[bouton.icone];

        if (!IconComponent) {
          console.error(`Icon "${bouton.icone}" not found in iconMap`);
          return null;
        }

        const afficherTexte = element.taille === 'grande' && bouton.texte;

        // Déterminer l'action pour savoir si c'est un lien interne ou externe
        const action = getButtonAction(bouton.command || '', bouton.url);

        // Props communes pour les liens
        const linkProps = {
          key: bouton.id,
          className: 'bouton',
          'aria-label': bouton.texte || bouton.icone,
        };

        // Contenu commun (icône + texte)
        const linkContent = (
          <>
            <IconComponent
              size={element.taille === 'petite' ? 30 : 24}
              className="icon"
            />
            {afficherTexte && <span className="texte">{bouton.texte}</span>}
          </>
        );

        // Navigation interne : utiliser Link de Next.js
        if (action.type === 'internal') {
          return (
            <Link href={action.route} {...linkProps}data-e2eid="l34">
              {linkContent}
            </Link>
          );
        }

        // Navigation externe : utiliser <a>
        if (action.type === 'external') {
          // Pour tel: et mailto:, pas de target="_blank"
          const isProtocolLink = bouton.url && (
            bouton.url.startsWith('tel:') || 
            bouton.url.startsWith('mailto:')
          );

          return (
            <a
              href={action.url}
              target={isProtocolLink ? undefined : '_blank'}
              rel={isProtocolLink ? undefined : 'noopener noreferrer'}
              {...linkProps}
            >
              {linkContent}
            </a>
          );
        }

        // Fallback : alert (cas rare)
        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          alert(action.message);
        };

        return (
          <a
            href="#"
            onClick={handleClick}
            {...linkProps}
          >
            {linkContent}
          </a>
        );
      })}
    </div>
  );
};

export default GroupeBoutons;
