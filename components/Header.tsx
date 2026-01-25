'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditing } from '../contexts/EditingContext';
import PasswordModal from './PasswordModal';
import styles from './Header.module.css';
import { ROUTES } from '../constants/routes';
import { HEADER_IMAGES } from '../constants/headerImages';

const Header: React.FC = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useEditing();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleLogoClick = () => {
    router.push(ROUTES.HOME);
  };

  const handlePhotoClick = (e: React.MouseEvent) => {
    // Si Shift est maintenu, ouvrir la modal de mot de passe
    if (e.shiftKey) {
      setIsPasswordModalOpen(true);
    } else {
      router.push(ROUTES.ABOUT);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img
            src={HEADER_IMAGES.logo.src}
            alt={HEADER_IMAGES.logo.alt}
            title={HEADER_IMAGES.logo.title}
            width={HEADER_IMAGES.logo.width}
            height={HEADER_IMAGES.logo.height}
            className={styles.logo}
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
          <img
            src={HEADER_IMAGES.photo.src}
            alt={HEADER_IMAGES.photo.alt}
            title={HEADER_IMAGES.photo.title}
            width={HEADER_IMAGES.photo.width}
            height={HEADER_IMAGES.photo.height}
            className={styles.photo}
            onClick={handlePhotoClick}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePhotoClick(e as any);
              }
            }}
          />
        </div>
      </header>
      {isPasswordModalOpen && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
