'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEditing } from '../contexts/EditingContext';
import { usePageTitle } from '../contexts/PageTitleContext';

const PasswordModal = dynamic(() => import('./PasswordModal'), { ssr: false });
import { ROUTES } from '../constants/routes';
import { HEADER_IMAGES } from '../constants/headerImages';
import { E2E_IDS } from '../constants/e2eIds';
import { isProduction } from '../utils/environment';

const RAW_PAGE_TITLE = 'Raw — DOM sans feuille de style';

const Header: React.FC = () => {
  const pathname = usePathname();
  const { setIsAuthenticated } = useEditing();
  const { pageTitle } = usePageTitle();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const displayTitle = pathname === '/raw' ? RAW_PAGE_TITLE : pageTitle;

  const handlePhotoClick = (e: React.MouseEvent) => {
    // US-Assistant-Scenario : en production, clic sur Photo → mot de passe ; en dev → Maintenance (assistant)
    if (isProduction()) {
      e.preventDefault();
      setIsPasswordModalOpen(true);
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <header className="header">
        <div className="logoContainer">
          <Link href={ROUTES.HOME} className="logoLink" e2eid="e2eid-h1">
            <Image
              src={HEADER_IMAGES.logo.src}
              alt={HEADER_IMAGES.logo.alt}
              title={HEADER_IMAGES.logo.title}
              width={HEADER_IMAGES.logo.width}
              height={HEADER_IMAGES.logo.height}
              className="logo"
              priority
            />
          </Link>
        </div>
        {displayTitle && (
          <div className="titleContainer">
            <h1 className="titreDePage texte">{displayTitle}</h1>
          </div>
        )}
        <div className="photoContainer">
          <Link 
            href={ROUTES.MAINTENANCE} 
            className="photoLink"
            onClick={handlePhotoClick}
            e2eid={`e2eid-${E2E_IDS.header.photo}`}
          >
            <Image
              src={HEADER_IMAGES.photo.src}
              alt={HEADER_IMAGES.photo.alt}
              title={HEADER_IMAGES.photo.title}
              width={HEADER_IMAGES.photo.width}
              height={HEADER_IMAGES.photo.height}
              className="photo"
              priority
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
