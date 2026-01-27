/**
 * Composant pour afficher une liste de témoignages
 * Affiche les témoignages sur 2 colonnes (50% largeur chacun)
 */

import React from 'react';
import Image from 'next/image';
import { getJsonImagePath } from '../utils/imagePath';

interface Temoignage {
  nom: string;
  fonction: string;
  photo: string;
  temoignage: string;
}

interface ElementTemoignages {
  type: 'temoignages';
  items: Temoignage[];
}

export interface TemoignagesProps {
  element: ElementTemoignages;
}

const Temoignages: React.FC<TemoignagesProps> = ({ element }) => {
  // Vérifier que les items existent (peuvent être chargés depuis une source externe)
  if (!element.items || element.items.length === 0) {
    return null;
  }

  return (
    <div className="temoignages">
      <div className="temoignagesGrid">
        {element.items.map((temoignage, index) => (
          <div key={index} className="temoignage">
            <div className="temoignageHeader">
              <div className="temoignagePhoto">
                <Image
                  src={getJsonImagePath(temoignage.photo)}
                  alt={temoignage.nom}
                  width={80}
                  height={80}
                  className="photoImage"
                  loading="lazy"
                />
              </div>
              <div className="temoignageInfo">
                <h2>{temoignage.nom}</h2>
                <p className="temoignageFonction">{temoignage.fonction}</p>
              </div>
            </div>
            <div className="temoignageTexte">
              {temoignage.temoignage.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} className="paragraph">
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
