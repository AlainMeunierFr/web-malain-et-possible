/**
 * Tests unitaires pour le composant Video
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Video from '../../components/Video';
import type { ElementVideo } from '../../utils/indexReader';

describe('Composant Video', () => {
  it('devrait afficher une iframe YouTube avec la bonne URL', () => {
    const element: ElementVideo = {
      type: 'video',
      urlYouTube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      lancementAuto: false,
    };

    render(<Video element={element} />);

    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
    expect(iframe).toHaveAttribute('src', expect.stringContaining('dQw4w9WgXcQ'));
  });

  it('devrait activer le lancement automatique quand lancementAuto est true', () => {
    const element: ElementVideo = {
      type: 'video',
      urlYouTube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      lancementAuto: true,
    };

    render(<Video element={element} />);

    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('autoplay=1'));
  });

  it('ne devrait pas activer le lancement automatique quand lancementAuto est false', () => {
    const element: ElementVideo = {
      type: 'video',
      urlYouTube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      lancementAuto: false,
    };

    render(<Video element={element} />);

    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toHaveAttribute('src', expect.not.stringContaining('autoplay=1'));
  });

  it('devrait avoir une classe CSS pour le container responsive', () => {
    const element: ElementVideo = {
      type: 'video',
      urlYouTube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      lancementAuto: false,
    };

    const { container } = render(<Video element={element} />);
    const div = container.firstChild as HTMLElement;
    
    expect(div).toHaveClass('videoContainer');
  });
});
