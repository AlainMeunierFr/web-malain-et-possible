'use client';

import React, { useEffect, useState } from 'react';
import footerButtonsData from '../data/_footerButtons.json';
import e2eIdsMapping from '../data/_e2eIds-mapping.json';
import FooterButton from './FooterButton';
import type { FooterButton as FooterButtonType } from '../types/footer';

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
  const footerButtons = footerButtonsData as FooterButtonsData;
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    fetch('/api/version')
      .then(res => res.json())
      .then(data => setVersion(data.version || ''))
      .catch(() => setVersion(''));
  }, []);

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
