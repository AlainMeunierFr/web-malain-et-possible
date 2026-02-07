/**
 * Composant pour afficher une liste de témoignages
 * Affiche les témoignages sur 2 colonnes (50% largeur chacun)
 */

import React from 'react';
import Image from 'next/image';
import type { ElementListeDeTemoignages, ElementTemoignage } from '../utils';
import { getJsonImagePath } from '../utils';

export interface TemoignagesProps {
  element: ElementListeDeTemoignages;
}

const Temoignages: React.FC<TemoignagesProps> = ({ element }) => {
  // Vérifier que les items existent (peuvent être chargés depuis une source externe)
  if (!element.items || element.items.length === 0) {
    return null;
  }

  return (
    <section className="listeDeTemoignages-cont" data-layout="2 columns x N rows">
      <h2 className="listeDeTemoignages-cont titre">Témoignages</h2>
      <div className="ui-grid">
        {element.items.map((temoignage: ElementTemoignage, index) => (
          <div key={index} className="temoignage-cont ui-card">
            <div className="ui-header">
              <div className="temoignage-cont photo ui-photo">
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
                <h3 className="temoignage-cont nom">{temoignage.nom}</h3>
                <p className="temoignage-cont fonction">{temoignage.fonction}</p>
              </div>
            </div>
            <div className="temoignage-cont temoignage">
              {temoignage.temoignage.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} className="ui-paragraph">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Temoignages;
