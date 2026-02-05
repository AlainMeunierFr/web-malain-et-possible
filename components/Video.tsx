/**
 * Composant pour afficher un élément de type "Vidéo"
 * Incrustation YouTube responsive avec gestion du lancement automatique
 */

import React from 'react';
import type { ElementVideo } from '../utils';

export interface VideoProps {
  element: ElementVideo;
  backgroundColor?: 'white' | 'light';
}

/**
 * Extrait l'ID de la vidéo YouTube depuis une URL
 * Supporte les formats :
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
function extraireIdYouTube(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

const Video: React.FC<VideoProps> = ({ element, backgroundColor = 'white' }) => {
  const videoId = extraireIdYouTube(element.urlYouTube);

  const containerClass = backgroundColor === 'light'
    ? 'video light'
    : 'video';

  if (!videoId) {
    return (
      <div className={containerClass} data-url={element.urlYouTube}>
        <span className="video urlYouTube">{element.urlYouTube}</span>
        <p>URL YouTube invalide : {element.urlYouTube}</p>
      </div>
    );
  }

  // Construction de l'URL d'embed avec paramètres
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${
    element.lancementAuto ? 'autoplay=1&' : ''
  }rel=0&modestbranding=1`;

  return (
    <div className={containerClass} data-url={element.urlYouTube}>
      {/* --v : URL comme "texte" pour placement explicite dans le DOM */}
      <span className="video urlYouTube">{element.urlYouTube}</span>
      <div className="videoWrapper">
        <iframe
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Video;
