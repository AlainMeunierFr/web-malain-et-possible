'use client';

import React, { useState, useEffect } from 'react';
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
import { isProduction } from '../utils/client';
import type { HeaderMenuEntry } from '../utils/shared/headerMenuTypes';

const RAW_PAGE_TITLE = 'Raw — DOM sans feuille de style';

export interface HeaderProps {
  menuEntries: HeaderMenuEntry[];
}

const Header: React.FC<HeaderProps> = ({ menuEntries }) => {
  const pathname = usePathname();
  const { setIsAuthenticated } = useEditing();
  const { pageTitle } = usePageTitle();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const m = window.matchMedia('(max-width: 767px)');
    const handler = () => setIsMobile(m.matches);
    queueMicrotask(() => setIsMobile(m.matches));
    m.addEventListener('change', handler);
    return () => m.removeEventListener('change', handler);
  }, []);

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
      <a href="#main-content-cont" className="skip-link">
        Aller au contenu principal
      </a>
      <header className="header">
        <div className="headerLeft">
          {menuEntries.length > 0 && (
            <>
              <button
                type="button"
                className="headerHamburger"
                aria-label="Ouvrir le menu de navigation"
                aria-expanded={isMobileMenuOpen}
                aria-controls="headerMobilePanel"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                e2eid="e2eid-header-hamburger"
                style={{ display: isMobile ? undefined : 'none' }}
              >
                <span className="headerHamburgerIcon" aria-hidden>☰</span>
              </button>
              <nav
                id="headerNavDesktop"
                className="headerNav"
                aria-label="Navigation principale"
                aria-hidden={isMobile}
                style={{ display: isMobile ? 'none' : undefined }}
              >
              {menuEntries.map((entry) =>
                entry.sousMenu && entry.sousMenu.length > 0 ? (
                  <div key={entry.id} className="headerNavGroup" role="group" aria-label={entry.label}>
                    <Link
                      href={entry.url}
                      className="headerNavLink"
                      e2eid={entry.url === '/' ? `e2eid-${E2E_IDS.header.logo}` : `e2eid-header-menu-${entry.id}`}
                    >
                      {entry.label}
                    </Link>
                    <div className="headerDropdown" role="menu" aria-hidden="false">
                      <Link
                        href={entry.url}
                        className="headerDropdownLink"
                        role="menuitem"
                        e2eid={entry.url === '/' ? `e2eid-${E2E_IDS.header.logo}` : `e2eid-header-menu-${entry.id}`}
                      >
                        {entry.label}
                      </Link>
                      {entry.sousMenu.map((item) => (
                        <Link
                          key={item.url}
                          href={item.url}
                          className="headerDropdownLink"
                          role="menuitem"
                          e2eid={`e2eid-header-menu-${entry.id}-${item.url.replace(/\//g, '-')}`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={entry.id}
                    href={entry.url}
                    className="headerNavLink"
                    e2eid={entry.url === '/' ? `e2eid-${E2E_IDS.header.logo}` : `e2eid-header-menu-${entry.id}`}
                  >
                    {entry.label}
                  </Link>
                )
              )}
              </nav>
            </>
          )}
          {displayTitle && (
            <div className="headerTitleBlock" aria-hidden={isMobile}>
              <h1 className="titreDePage texte">{displayTitle}</h1>
            </div>
          )}
        </div>
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
      {menuEntries.length > 0 && isMobile && (
        <div
          id="headerMobilePanel"
          className="headerMobilePanel"
          role="dialog"
          aria-label="Menu de navigation"
          aria-hidden={!isMobileMenuOpen}
          style={{ display: isMobileMenuOpen ? undefined : 'none' }}
        >
          <button
            type="button"
            className="headerMobilePanelClose"
            aria-label="Fermer le menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>
          <nav className="headerMobileNav" aria-label="Navigation principale">
            {menuEntries.map((entry) => (
              <Link
                key={entry.id}
                href={entry.url}
                className="headerMobileNavLink"
                onClick={() => setIsMobileMenuOpen(false)}
                e2eid={entry.url === '/' ? `e2eid-${E2E_IDS.header.logo}` : `e2eid-header-mobile-${entry.id}`}
              >
                {entry.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
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
