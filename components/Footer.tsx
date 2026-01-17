'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Footer.module.css';
import footerButtons from '../data/footerButtons.json';
import FooterButton from './FooterButton';
import type { FooterButton as FooterButtonType } from '../types/footer';
import { getButtonAction } from '../utils/buttonHandlers';

const Footer: React.FC = () => {
  const router = useRouter();

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

  return (
    <footer className={styles.footer}>
      <div className={styles.buttonsContainer}>
        {(footerButtons as FooterButtonType[]).map((button) => (
          <FooterButton
            key={button.id}
            {...button}
            url={button.url ?? null}
            onButtonClick={handleButtonClick}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
