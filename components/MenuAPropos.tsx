'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import type { LigneDeMenu } from '../utils/client';

interface MenuAProposProps {
  lignes: LigneDeMenu[];
}

/**
 * Menu horizontal partagé pour toutes les pages "A propos du site".
 * Position fixed sous le header principal.
 * Responsive : menu hamburger sur petit écran, menu horizontal sur grand écran.
 */
function MenuAProposContent({ lignes }: MenuAProposProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  // Extraire le dossier actif du pathname
  const segments = pathname.split('/');
  const dossierActif = segments.length > 2 ? decodeURIComponent(segments[2]) : null;
  
  // Vue active (sprint ou swagger) pour la page principale
  const viewParam = searchParams.get('view');
  const estSurPagePrincipale = pathname === '/a-propos-du-site';

  const isActive = (ligne: LigneDeMenu): boolean => {
    if (ligne.Type === 'Path') {
      return ligne.Parametre === dossierActif;
    }
    // Container : Sprint en cours, Métriques, Swagger ou Charte
    // Charte a sa propre route statique /a-propos-du-site/charte
    if (ligne.Parametre === 'charte') {
      return dossierActif === 'charte';
    }
    if (!estSurPagePrincipale) return false;
    if (ligne.Parametre === 'swagger') {
      return viewParam === 'swagger';
    }
    if (ligne.Parametre === 'metrics') {
      return viewParam === 'metrics';
    }
    // Sprint en cours est actif par défaut sur la page principale
    return viewParam !== 'swagger' && viewParam !== 'metrics';
  };

  const getHref = (ligne: LigneDeMenu): string => {
    if (ligne.Type === 'Path') {
      return `/a-propos-du-site/${encodeURIComponent(ligne.Parametre)}`;
    }
    if (ligne.Parametre === 'swagger') {
      return '/a-propos-du-site?view=swagger';
    }
    if (ligne.Parametre === 'metrics') {
      return '/a-propos-du-site?view=metrics';
    }
    if (ligne.Parametre === 'charte') {
      return '/a-propos-du-site/charte';
    }
    return '/a-propos-du-site';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className="menuAPropos"
      data-testid="menu-a-propos"
      aria-label="Menu A propos du site"
    >
      {/* Bouton hamburger (visible sur petit écran uniquement) */}
      <button
        className="menuAPropos__hamburger"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="menu-a-propos-liste"
        aria-label="Ouvrir le menu"
        type="button"
      >
        <span className="menuAPropos__hamburger-icon">
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
          <span className={isOpen ? 'open' : ''}></span>
        </span>
      </button>

      {/* Liste des liens */}
      <ul 
        id="menu-a-propos-liste"
        className={`liste ${isOpen ? 'liste--open' : ''}`}
      >
        {lignes.map((ligne) => (
          <li key={`${ligne.Numéro}-${ligne.Titre}`} className="item">
            <Link
              href={getHref(ligne)}
              className={isActive(ligne) ? 'lienActif' : 'lien'}
              e2eid={ligne.e2eID ? `e2eid-${ligne.e2eID}` : `e2eid-menu-${ligne.Titre.replace(/\s/g, '-')}`}
              onClick={closeMenu}
            >
              {ligne.Titre}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function MenuAPropos({ lignes }: MenuAProposProps) {
  return (
    <Suspense fallback={<div className="menuAPropos">Chargement...</div>}>
      <MenuAProposContent lignes={lignes} />
    </Suspense>
  );
}
