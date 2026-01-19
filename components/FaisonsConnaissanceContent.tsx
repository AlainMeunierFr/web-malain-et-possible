'use client';

import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Video, Phone, Mail, Youtube, Linkedin } from 'lucide-react';
import styles from './FaisonsConnaissanceContent.module.css';

const FaisonsConnaissanceContent: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Faisons connaissance</h1>

      <div className={styles.contactSection}>
        <div className={styles.contactItem}>
          <UtensilsCrossed size={24} className={styles.icon} />
          <button className={styles.contactButton}>Déjeuner aux alentours de Lyon</button>
        </div>

        <div className={styles.contactItem}>
          <Video size={24} className={styles.icon} />
          <button className={styles.contactButton}>30 mn de visio</button>
        </div>

        <div className={styles.contactItem}>
          <Phone size={24} className={styles.icon} />
          <span className={styles.contactText}>+33 6.21.03.12.65</span>
        </div>
      </div>

      <div className={styles.socialSection}>
        <Link
          href="mailto:contact@m-alain-et-possible.fr"
          className={styles.socialLink}
          aria-label="Email"
        >
          <Mail size={32} />
        </Link>
        <Link
          href="https://www.youtube.com/@m-alain-et-possible"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="Chaîne YouTube"
        >
          <Youtube size={32} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/alain-meunier"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label="LinkedIn"
        >
          <Linkedin size={32} />
        </Link>
      </div>
    </div>
  );
};

export default FaisonsConnaissanceContent;
