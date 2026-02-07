'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import footerButtonsData from '../data/_footerButtons.json';
import e2eIdsMapping from '../data/_e2eIds-mapping.json';
import FooterButton from './FooterButton';
import type { FooterButton as FooterButtonType } from '../types/footer';
import { getButtonAction } from '../utils/client';
import { HEADER_IMAGES } from '../constants/headerImages';
import { E2E_IDS } from '../constants/e2eIds';

// Fonction pour résoudre l'e2eID d'un bouton footer depuis le mapping
function getFooterE2eId(buttonId: string): string | undefined {
  const key = `footer:${buttonId}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapping = e2eIdsMapping as Record<string, any>;
  return mapping[key] as string | undefined;
}

interface FooterButtonsData {
  type: string;
  taille?: string;
  boutons: FooterButtonType[];
}

const Footer: React.FC = () => {
  const router = useRouter();
  const footerButtons = footerButtonsData as FooterButtonsData;
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    // Charger la version depuis l'API
    fetch('/api/version')
      .then(res => res.json())
      .then(data => setVersion(data.version || ''))
      .catch(() => setVersion(''));
  }, []);

  // Plus besoin de handleButtonClick car FooterButton gère maintenant les liens directement
  // On garde la fonction pour compatibilité mais elle n'est plus utilisée
  const handleButtonClick = (command: string, url: string | null) => {
    // Cette fonction n'est plus nécessaire car FooterButton utilise maintenant des liens
    // Mais on la garde pour compatibilité avec l'interface
  };

  // Vérifier que footerButtons existe et a une structure valide
  if (!footerButtons || !footerButtons.boutons || !Array.isArray(footerButtons.boutons)) {
    console.error('Footer buttons data is invalid:', footerButtons);
    return null;
  }

  // US-13.1 : logo comme bouton dans la liste, entre "Plan du site" et "À propos de ce site"
  const FOOTER_LOGO_SIZE = 24; // même taille que les icônes footer (.icone)
  const boutonsWithLogo: (FooterButtonType | { _logo: true })[] = [];
  for (const b of footerButtons.boutons) {
    boutonsWithLogo.push(b);
    if (b.id === 'sitemap') {
      boutonsWithLogo.push({ _logo: true });
    }
  }

  return (
    <footer className="footer">
      <div className="version">
        {version ? `v${version}` : '\u00A0'}
      </div>
      <div className="boutonsContainer">
        {boutonsWithLogo.map((item, index) => {
          if ('_logo' in item && item._logo) {
            return (
              <button
                key="footer-logo"
                type="button"
                className="bouton"
                aria-label={HEADER_IMAGES.logo.alt}
                title={HEADER_IMAGES.logo.title}
                e2eid={`e2eid-${E2E_IDS.footer.logo}`}
              >
                <Image
                  src={HEADER_IMAGES.logo.src}
                  alt={HEADER_IMAGES.logo.alt}
                  width={FOOTER_LOGO_SIZE}
                  height={FOOTER_LOGO_SIZE}
                  className="icone"
                />
              </button>
            );
          }
          const button = item as FooterButtonType;
          if (!button || !button.id || !button.icone || !button.command) {
            console.error('Invalid button data:', button);
            return null;
          }
          const e2eId = button.e2eID || getFooterE2eId(button.id);
          return (
            <FooterButton
              key={button.id}
              {...button}
              url={button.url ?? null}
              e2eID={e2eId}
            />
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
