/**
 * Composant pour afficher une liste de détournements vidéo
 * Affiche les détournements les uns sous les autres, chaque détournement ayant 2 vidéos côte à côte
 */

'use client';

import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
// Type défini localement car non exporté depuis indexReader
interface ElementVideoDetournement {
  type: 'videoDetournement';
  items: any[];
}
import TexteLarge from './TexteLarge';
import styles from './VideoDetournement.module.css';

export interface VideoDetournementProps {
  element: ElementVideoDetournement;
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
    <div className="videoDetournement">
      {sortedItems.map((detournement, index) => {
        const videoDetourneeId = extraireIdYouTube(detournement.videoDetournee);
        const videoOriginaleId = extraireIdYouTube(detournement.videoOriginale);
        
        return (
          <div key={detournement.id || index} className="detournement">
            {/* Titre du détournement (H2) */}
            <h2>{detournement.titreVideoDetournee}</h2>
            
            {/* Pitch/Contexte */}
            <TexteLarge element={{ type: 'texteLarge', texte: detournement.pitch }} />
            
            {/* Container pour les deux vidéos côte à côte */}
            <div className="videosContainer">
              {/* Vidéo détournée (gauche) */}
              <div className="videoSection">
                <h3>Vidéo détournée</h3>
                <p className="videoSubtitle">{detournement.pourLeCompteDe}</p>
                {videoDetourneeId && (
                  <div className="videoWrapper">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoDetourneeId}?rel=0&modestbranding=1`}
                      title="Vidéo détournée"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                )}
                {/* Container pour bouton LinkedIn et icône d'alerte (centrés ensemble) */}
                {(detournement.linkedin || detournement.droitsAuteur) && (
                  <div className={styles.videoActions}>
                    {/* Icône d'alerte pour droits d'auteur si présent - à gauche */}
                    {detournement.droitsAuteur && (
                      <div className={styles.droitsAuteurContainer}>
                        <button
                          className={styles.alertButton}
                          onClick={() => setShowDroitsAuteur(showDroitsAuteur === index ? null : index)}
                          aria-label="Information sur les droits d'auteur"
                        >
                          <AlertTriangle className={styles.alertIcon} />
                        </button>
                        {showDroitsAuteur === index && (
                          <div className={styles.droitsAuteurPopup}>
                            <button
                              className={styles.closeButton}
                              onClick={() => setShowDroitsAuteur(null)}
                              aria-label="Fermer"
                            >
                              ×
                            </button>
                            <div className={styles.droitsAuteurContent}>
                              {detournement.droitsAuteur.split('\n').map((line: string, lineIndex: number) => (
                                <p key={lineIndex}>{line}</p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {/* Bouton LinkedIn si présent - à droite */}
                    {detournement.linkedin && (
                      <a 
                        href={detournement.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.linkedinButton}
                      >
                        VOIR L&apos;ENGAGEMENT SUR LINKEDIN
                      </a>
                    )}
                  </div>
                )}
              </div>
              
              {/* Vidéo originale (droite) */}
              <div className="videoSection">
                <h3>Vidéo originale</h3>
                <p className="videoSubtitle">{detournement.titreVideoOriginale}</p>
                {videoOriginaleId && (
                  <div className="videoWrapper">
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
    </div>
  );
};

export default VideoDetournement;
