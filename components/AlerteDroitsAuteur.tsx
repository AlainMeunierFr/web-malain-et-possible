import React from 'react';
import { AlertTriangle } from 'lucide-react';

export interface AlerteDroitsAuteurProps {
  /** Texte des droits d'auteur. Si vide, le composant n'est pas affiché. */
  texte?: string;
}

const AlerteDroitsAuteur: React.FC<AlerteDroitsAuteurProps> = ({ texte }) => {
  // Ne pas afficher si le texte est vide
  if (!texte || texte.trim() === '') {
    return null;
  }

  return (
    <div className="ui-droitsAuteurContainer" data-layout="tooltip, droits d'auteur">
      <span className="ui-alertButton" aria-label="Information sur les droits d'auteur">
        <AlertTriangle className="ui-alertIcon" />
      </span>
      <div className="tooltip-content">
        {texte.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default AlerteDroitsAuteur;
