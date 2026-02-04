/**
 * Composant pour afficher un élément de type "Titre"
 * Bande bleue foncée pleine largeur avec texte en h1
 */

import React from 'react';
import type { ElementTitre } from '../utils';

export interface TitreProps {
  element: ElementTitre;
}

const Titre: React.FC<TitreProps> = ({ element }) => {
  return (
    <div className="titre">
      <h2 className="titre texte">{element.texte}</h2>
    </div>
  );
};

export default Titre;
