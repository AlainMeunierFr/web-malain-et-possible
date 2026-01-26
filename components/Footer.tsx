'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Footer.module.css';
import footerButtonsData from '../data/_footerButtons.json';
import FooterButton from './FooterButton';
import type { FooterButton as FooterButtonType } from '../types/footer';
import { getButtonAction } from '../utils/buttonHandlers';

interface FooterButtonsData {
  type: string;
  taille?: string;
  boutons: FooterButtonType[];
}

const Footer: React.FC = () => {
  const router = useRouter();
  const footerButtons = footerButtonsData as FooterButtonsData;
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    // Charger la version depuis l'API
    fetch('/api/version')
      .then(res => res.json())
      .then(data => setVersion(data.version || ''))
      .catch(() => setVersion(''));
  }, []);

  const handleButtonClick = (command: string, url: string | null) => {
    // Backend pur : détermine l'action (logique métier)
    const action = getButtonAction(command, url);

    // Frontend : exécute l'action (interactivité navigateur)
    switch (action.type) {
      case 'internal':
        router.push(action.route);
        break;
      case 'external':
        window.open(action.url, '_blank', 'noopener,noreferrer');
        break;
      case 'alert':
        alert(action.message);
        break;
    }
  };

  // Vérifier que footerButtons existe et a une structure valide
  if (!footerButtons || !footerButtons.boutons || !Array.isArray(footerButtons.boutons)) {
    console.error('Footer buttons data is invalid:', footerButtons);
    return null;
  }

  return (
    <footer className={styles.footer}>
      {version && (
        <div className={styles.version}>
          v{version}
        </div>
      )}
      <div className={styles.buttonsContainer}>
        {footerButtons.boutons.map((button) => {
          // Vérifier que chaque bouton a les propriétés requises
          if (!button || !button.id || !button.icone || !button.command) {
            console.error('Invalid button data:', button);
            return null;
          }
          return (
            <FooterButton
              key={button.id}
              {...button}
              url={button.url ?? null}
              onButtonClick={handleButtonClick}
            />
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
