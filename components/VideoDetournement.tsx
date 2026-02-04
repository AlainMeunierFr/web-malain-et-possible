/**
 * Composant pour afficher une liste de détournements vidéo
 * Affiche les détournements les uns sous les autres, chaque détournement ayant 2 vidéos côte à côte
 */

'use client';

import React from 'react';
import type { ElementListeDeDetournementsVideo } from '../utils/client';
import TexteLarge from './TexteLarge';
import AlerteDroitsAuteur from './AlerteDroitsAuteur';

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
    <section className="listeDeDetournementsVideo" data-layout="X rows">
      {sortedItems.map((detournement, index) => {
        const videoDetourneeId = extraireIdYouTube(detournement.videoDetournee);
        const videoOriginaleId = extraireIdYouTube(detournement.videoOriginale);
        
        return (
          // Structure conforme à /charte : .detournementVideo.ui-card
          <div key={detournement.id || index} className="detournementVideo ui-card">
            {/* Titre h2 standard */}
            <h2 className="detournementVideo titre">{detournement.titre}</h2>

            {/* Pitch */}
            {detournement.pitch && (
              <div className="detournementVideo pitch">
                <TexteLarge element={{ type: 'texteLarge', texte: detournement.pitch }} />
              </div>
            )}

            {/* Videos : 2 colonnes côte à côte */}
            <div className="detournementVideo videos">
              {/* Vidéo détournée */}
              <div className="detournementVideo videoDetournee">
                <h3 className="detournementVideo titreVideoDetournee">{detournement.titreVideoDetournee}</h3>
                <p className="detournementVideo source">{detournement.titre}</p>
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
                {/* Actions : droitsAuteur (tooltip CSS) + linkedin */}
                <div className="ui-videoActions">
                  <AlerteDroitsAuteur texte={detournement.droitsAuteur} />
                  {detournement.linkedin && (
                    <a 
                      href={detournement.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ui-linkedinButton bouton"
                    >
                      VOIR L&apos;ENGAGEMENT SUR LINKEDIN
                    </a>
                  )}
                </div>
              </div>

              {/* Vidéo originale */}
              <div className="detournementVideo videoOriginale">
                <h3 className="detournementVideo titreVideoOriginale">{detournement.titreVideoOriginale}</h3>
                <p className="detournementVideo source">{detournement.titreVideoOriginale}</p>
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
          </div>
        );
      })}
    </section>
  );
};

export default VideoDetournement;
