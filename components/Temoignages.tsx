/**
 * Composant pour afficher une liste de témoignages
 * Affiche les témoignages sur 2 colonnes (50% largeur chacun)
 */

import React from 'react';
import Image from 'next/image';
import type { ElementListeDeTemoignages, ElementTemoignage } from '../utils/indexReader';
import { getJsonImagePath } from '../utils/imagePath';

export interface TemoignagesProps {
  element: ElementListeDeTemoignages;
}

const Temoignages: React.FC<TemoignagesProps> = ({ element }) => {
  // Vérifier que les items existent (peuvent être chargés depuis une source externe)
  if (!element.items || element.items.length === 0) {
    return null;
  }

  return (
    <div className="temoignages" data-layout="2 columns x N rows">
      <div className="ui-grid">
        {element.items.map((temoignage: ElementTemoignage, index) => (
          <div key={index} className="temoignage ui-card">
            <div className="ui-header">
              <div className="temoignage photo ui-photo">
                <Image
                  src={getJsonImagePath(temoignage.photo)}
                  alt={temoignage.nom}
                  width={80}
                  height={80}
                  className="ui-photoImage"
                  loading="lazy"
                />
              </div>
              <div className="ui-info">
                <h3 className="temoignage nom">{temoignage.nom}</h3>
                <p className="temoignage fonction">{temoignage.fonction}</p>
              </div>
            </div>
            <div className="temoignage temoignage">
              {temoignage.temoignage.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} className="ui-paragraph">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Temoignages;
