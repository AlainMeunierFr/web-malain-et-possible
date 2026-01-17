import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/Logo.png"
          alt="Logo Malain et possible"
          width={150}
          height={150}
          className={styles.logo}
          priority
        />
      </div>
      <div className={styles.photoContainer}>
        <Image
          src="/images/Photo.png"
          alt="Photo Alain Meunier"
          width={150}
          height={150}
          className={styles.photo}
          priority
        />
      </div>
    </header>
  );
};

export default Header;
