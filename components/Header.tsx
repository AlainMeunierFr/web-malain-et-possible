'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { ROUTES } from '../constants/routes';

const IMAGE_CONFIG = {
  logo: {
    src: '/images/Logo.png',
    alt: 'Logo Malain et possible',
    title: 'Home page',
    width: 150,
    height: 150,
  },
  photo: {
    src: '/images/Photo.png',
    alt: 'Photo Alain Meunier',
    title: 'A propos de moi',
    width: 150,
    height: 150,
  },
} as const;

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push(ROUTES.HOME);
  };

  const handlePhotoClick = () => {
    router.push(ROUTES.ABOUT);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          {...IMAGE_CONFIG.logo}
          className={styles.logo}
          priority
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLogoClick();
            }
          }}
        />
      </div>
      <div className={styles.photoContainer}>
        <Image
          {...IMAGE_CONFIG.photo}
          className={styles.photo}
          priority
          onClick={handlePhotoClick}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePhotoClick();
            }
          }}
        />
      </div>
    </header>
  );
};

export default Header;
