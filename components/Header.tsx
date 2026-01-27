'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEditing } from '../contexts/EditingContext';
import { usePageTitle } from '../contexts/PageTitleContext';
import PasswordModal from './PasswordModal';
import styles from './Header.module.css';
import { ROUTES } from '../constants/routes';
import { HEADER_IMAGES } from '../constants/headerImages';

const Header: React.FC = () => {
  const { setIsAuthenticated } = useEditing();
  const { pageTitle } = usePageTitle();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handlePhotoClick = (e: React.MouseEvent) => {
    // Si Shift est maintenu, ouvrir la modal de mot de passe
    if (e.shiftKey) {
      e.preventDefault();
      setIsPasswordModalOpen(true);
    }
    // Sinon, le lien normal vers /a-propos-du-site fonctionnera
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href={ROUTES.HOME} className={styles.logoLink}data-e2eid="l35">
            <img
              src={HEADER_IMAGES.logo.src}
              alt={HEADER_IMAGES.logo.alt}
              title={HEADER_IMAGES.logo.title}
              width={HEADER_IMAGES.logo.width}
              height={HEADER_IMAGES.logo.height}
              className={styles.logo}
            />
          </Link>
        </div>
        {pageTitle && (
          <div className={styles.titleContainer}>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
          </div>
        )}
        <div className={styles.photoContainer}>
          <Link 
            href={ROUTES.ABOUT} 
            className={styles.photoLink}
            onClick={handlePhotoClick}
          >
            <img
              src={HEADER_IMAGES.photo.src}
              alt={HEADER_IMAGES.photo.alt}
              title={HEADER_IMAGES.photo.title}
              width={HEADER_IMAGES.photo.width}
              height={HEADER_IMAGES.photo.height}
              className={styles.photo}
            />
          </Link>
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
