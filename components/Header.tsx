'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
          <Image
            {...HEADER_IMAGES.logo}
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
            {...HEADER_IMAGES.photo}
            className={styles.photo}
            priority
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
