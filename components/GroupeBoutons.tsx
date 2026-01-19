'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
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
import styles from './GroupeBoutons.module.css';

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
  const router = useRouter();

  const handleButtonClick = (bouton: BoutonGroupe) => {
    // Détecter si l'URL est locale (même origine) - côté client uniquement
    if (typeof window !== 'undefined' && bouton.url) {
      const isLocalUrl = 
        bouton.url.startsWith('/') || 
        bouton.url.includes(window.location.hostname) ||
        bouton.url.startsWith('http://localhost') ||
        bouton.url.startsWith('http://127.0.0.1');

      // Si URL locale, utiliser la navigation interne Next.js
      if (isLocalUrl) {
        // Extraire le chemin de l'URL locale
        let path = bouton.url;
        if (path.startsWith('http://localhost') || path.startsWith('http://127.0.0.1')) {
          try {
            const url = new URL(path);
            path = url.pathname;
          } catch (e) {
            // Si l'URL est invalide, utiliser tel quel
          }
        }
        router.push(path);
        return;
      }
    }

    // Backend pur : détermine l'action (logique métier)
    const action = getButtonAction(bouton.command || '', bouton.url);

    // Frontend : exécute l'action (interactivité navigateur)
    switch (action.type) {
      case 'internal':
        router.push(action.route);
        break;
      case 'external':
        // Pour tel: et mailto:, utiliser window.location.href au lieu de window.open
        if (bouton.url && (bouton.url.startsWith('tel:') || bouton.url.startsWith('mailto:'))) {
          window.location.href = bouton.url;
        } else {
          window.open(action.url, '_blank', 'noopener,noreferrer');
        }
        break;
      case 'alert':
        alert(action.message);
        break;
    }
  };

  const tailleClass = element.taille === 'petite' ? styles.taillePetite : styles.tailleGrande;

  return (
    <div className={`${styles.groupeBoutonsContainer} ${tailleClass}`}>
      {element.boutons.map((bouton) => {
        const IconComponent = iconMap[bouton.icone];

        if (!IconComponent) {
          console.error(`Icon "${bouton.icone}" not found in iconMap`);
          return null;
        }

        const afficherTexte = element.taille === 'grande' && bouton.texte;

        return (
          <button
            key={bouton.id}
            className={`${styles.bouton} ${styles.couleurInversee}`}
            onClick={() => handleButtonClick(bouton)}
            aria-label={bouton.texte || bouton.icone}
            type="button"
          >
            <IconComponent
              size={element.taille === 'petite' ? 30 : 24}
              className={styles.icon}
            />
            {afficherTexte && <span className={styles.texte}>{bouton.texte}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default GroupeBoutons;
