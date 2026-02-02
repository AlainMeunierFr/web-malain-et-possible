/**
 * Composant pour afficher une liste de détournements vidéo
 * Affiche les détournements les uns sous les autres, chaque détournement ayant 2 vidéos côte à côte
 */

'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { ElementListeDeDetournementsVideo } from '../utils/indexReader';
import TexteLarge from './TexteLarge';

export interface VideoDetournementProps {
  element: ElementListeDeDetournementsVideo;
}

/**
 * Extrait l'ID YouTube depuis une URL ou un ID déjà présent
 */
function extraireIdYouTube(urlOrId: string): string | null {
  // Si c'est déjà un ID (11 caractères alphanumériques)
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId;
  }
  
  // Sinon, essayer d'extraire depuis une URL
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = urlOrId.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Parse une date au format "jj/mm/aaaa" en objet Date pour tri
 */
function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

const VideoDetournement: React.FC<VideoDetournementProps> = ({ element }) => {
  const [showDroitsAuteur, setShowDroitsAuteur] = useState<number | null>(null);

  // Vérifier que les items existent (peuvent être chargés depuis une source externe)
  if (!element.items || element.items.length === 0) {
    return null;
  }

  // Trier les détournements par date décroissante (plus récent en haut)
  const sortedItems = [...element.items].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime(); // Décroissant
  });

  return (
    <div className="videoDetournement" data-layout="X rows">
      {sortedItems.map((detournement, index) => {
        const videoDetourneeId = extraireIdYouTube(detournement.videoDetournee);
        const videoOriginaleId = extraireIdYouTube(detournement.videoOriginale);
        
        return (
          <div key={detournement.id || index} className="ui-card">
            {/* Ordre DOM = CANONICAL_SPEC_ORDER : titre → pitch → date → titreVideoDetournee → videoDetournee → droitsAuteur → linkedin → titreVideoOriginale → videoOriginale */}
            <h2 className="detournementVideo titre">{detournement.titre}</h2>

            {detournement.pitch && (
              <div className="detournementVideo pitch">
                <TexteLarge element={{ type: 'texteLarge', texte: detournement.pitch }} />
              </div>
            )}

            {detournement.date && (
              <p className="detournementVideo date">{detournement.date}</p>
            )}

            <h3 className="detournementVideo titreVideoDetournee">{detournement.titreVideoDetournee}</h3>

            {/* --v : videoDetournee */}
            <div className="detournementVideo videoDetournee" data-url={detournement.videoDetournee}>
              <span className="detournementVideo-url">{detournement.videoDetournee}</span>
              {videoDetourneeId && (
                <div className="ui-videoWrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoDetourneeId}?rel=0&modestbranding=1`}
                    title="Vidéo détournée"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {/* droitsAuteur (--n) puis linkedin (--n) */}
            <div className="ui-videoActions">
              {detournement.droitsAuteur && (
                <div className="ui-droitsAuteurContainer" data-layout="tooltip, droits d'auteur">
                  <button
                    className="ui-alertButton"
                    onClick={() => setShowDroitsAuteur(showDroitsAuteur === index ? null : index)}
                    aria-label="Information sur les droits d'auteur"
                  >
                    <AlertTriangle className="ui-alertIcon" />
                  </button>
                  {showDroitsAuteur === index && (
                    <div className="ui-popup">
                      <button
                        className="ui-closeButton"
                        onClick={() => setShowDroitsAuteur(null)}
                        aria-label="Fermer"
                      >
                        ×
                      </button>
                      <div className="ui-popupContent">
                        {detournement.droitsAuteur.split('\n').map((line: string, lineIndex: number) => (
                          <p key={lineIndex}>{line}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {detournement.linkedin && (
                <a 
                  href={detournement.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ui-linkedinButton"
                >
                  VOIR L&apos;ENGAGEMENT SUR LINKEDIN
                </a>
              )}
            </div>

            <h3 className="detournementVideo titreVideoOriginale">{detournement.titreVideoOriginale}</h3>

            {/* --v : videoOriginale */}
            <div className="detournementVideo videoOriginale" data-url={detournement.videoOriginale}>
              <span className="detournementVideo-url">{detournement.videoOriginale}</span>
              {videoOriginaleId && (
                <div className="ui-videoWrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoOriginaleId}?rel=0&modestbranding=1`}
                    title="Vidéo originale"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoDetournement;
