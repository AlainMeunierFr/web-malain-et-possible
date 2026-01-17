import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import texts from '../data/texts.json';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/images/Logo.png"
            alt={texts.site.title}
            width={120}
            height={60}
            priority
          />
        </div>
        <h1 className={styles.title}>{texts.header.title}</h1>
        <p className={styles.subtitle}>{texts.header.subtitle}</p>
      </div>
    </header>
  );
};

export default Header;
