'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import footerButtonsData from '../data/_footerButtons.json';
import FooterButton from './FooterButton';
import type { FooterButton as FooterButtonType } from '../types/footer';
import { getButtonAction } from '../utils/buttonHandlers';

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

  return (
    <footer className="footer">
      <div className="version">
        {version ? `v${version}` : '\u00A0'}
      </div>
      <div className="boutonsContainer">
        {footerButtons.boutons.map((button) => {
          // Vérifier que chaque bouton a les propriétés requises
          if (!button || !button.id || !button.icone || !button.command) {
            console.error('Invalid button data:', button);
            return null;
          }
          return (
            <FooterButton
              key={button.id}
              {...button}
              url={button.url ?? null}
              e2eID={button.e2eID ?? (button as { e2eid?: string }).e2eid}
            />
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
