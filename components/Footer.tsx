'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import footerButtons from '../data/footerButtons.json';

const Footer: React.FC = () => {
  const handleButtonClick = (command: string, url: string | null) => {
    if (url) {
      // Ouvrir l'URL (mailto: ou lien externe)
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Afficher une pop-up avec le nom de la commande si pas d'URL
      alert(`Commande: ${command}`);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.buttonsContainer}>
        {footerButtons.map((button) => (
          <button
            key={button.id}
            className={styles.iconButton}
            onClick={() => handleButtonClick(button.command, button.url || null)}
            aria-label={button.alt}
          >
            <Image
              src={button.image}
              alt={button.alt}
              width={40}
              height={40}
              className={styles.iconImage}
            />
          </button>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
