/**
 * Tests unitaires pour le composant Tooltip
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tooltip from '../../components/Tooltip';

describe('Tooltip', () => {
  const mockContent = 'Contenu du tooltip de test';
  const mockChildren = 'Élément déclencheur';

  it('affiche le contenu enfant correctement', () => {
    render(
      <Tooltip content={mockContent}>
        <span>{mockChildren}</span>
      </Tooltip>
    );

    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });

  it('affiche le tooltip au survol', async () => {
    render(
      <Tooltip content={mockContent}>
        <span>{mockChildren}</span>
      </Tooltip>
    );

    const trigger = screen.getByText(mockChildren).closest('[role="button"]');
    expect(trigger).toBeInTheDocument();

    // Survol
    fireEvent.mouseEnter(trigger!);

    await waitFor(() => {
      expect(screen.getByText(mockContent)).toBeInTheDocument();
    });
  });

  it('cache le tooltip quand on arrête le survol', async () => {
    render(
      <Tooltip content={mockContent}>
        <span>{mockChildren}</span>
      </Tooltip>
    );

    const trigger = screen.getByText(mockChildren).closest('[role="button"]');

    // Survol puis arrêt du survol
    fireEvent.mouseEnter(trigger!);
    await waitFor(() => {
      expect(screen.getByText(mockContent)).toBeInTheDocument();
    });

    fireEvent.mouseLeave(trigger!);
    await waitFor(() => {
      expect(screen.queryByText(mockContent)).not.toBeInTheDocument();
    });
  });

  it('affiche le tooltip au focus clavier', async () => {
    render(
      <Tooltip content={mockContent}>
        <span>{mockChildren}</span>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');

    // Focus
    fireEvent.focus(trigger);
    expect(trigger).toHaveFocus();

    await waitFor(() => {
      expect(screen.getByText(mockContent)).toBeInTheDocument();
    });
  });

  it('cache le tooltip au blur', async () => {
    render(
      <div>
        <Tooltip content={mockContent}>
          <span>{mockChildren}</span>
        </Tooltip>
        <button>Autre élément</button>
      </div>
    );

    const trigger = screen.getByRole('button', { name: /élément déclencheur/i });

    // Focus puis blur
    fireEvent.focus(trigger);
    expect(trigger).toHaveFocus();
    
    await waitFor(() => {
      expect(screen.getByText(mockContent)).toBeInTheDocument();
    });

    fireEvent.blur(trigger);
    
    await waitFor(() => {
      expect(screen.queryByText(mockContent)).not.toBeInTheDocument();
    });
  });

  it('cache le tooltip avec la touche Escape', async () => {
    render(
      <Tooltip content={mockContent}>
        <span>{mockChildren}</span>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');

    // Focus et affichage
    fireEvent.focus(trigger);
    await waitFor(() => {
      expect(screen.getByText(mockContent)).toBeInTheDocument();
    });

    // Appui sur Escape
    fireEvent.keyDown(trigger, { key: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByText(mockContent)).not.toBeInTheDocument();
    });
  });

  it('a les attributs ARIA appropriés', async () => {
    render(
      <Tooltip content={mockContent}>
        <span>{mockChildren}</span>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');

    // Vérifications initiales
    expect(trigger).toHaveAttribute('tabIndex', '0');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).not.toHaveAttribute('aria-describedby');

    // Affichage du tooltip
    fireEvent.mouseEnter(trigger);
    
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('aria-describedby', 'tooltip-content');
      
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveAttribute('id', 'tooltip-content');
      expect(tooltip).toHaveAttribute('aria-live', 'polite');
    });
  });

  it('accepte des props de position et style personnalisés', () => {
    const customClass = 'custom-class';
    const maxWidth = '300px';
    
    render(
      <Tooltip 
        content={mockContent}
        position="bottom"
        className={customClass}
        maxWidth={maxWidth}
      >
        <span>{mockChildren}</span>
      </Tooltip>
    );

    const container = screen.getByText(mockChildren).closest('.custom-class');
    expect(container).toBeInTheDocument();
  });

  it('gère le contenu React complexe', async () => {
    const complexContent = (
      <div>
        <h4>Titre complexe</h4>
        <p>Contenu avec <strong>éléments</strong> formatés.</p>
      </div>
    );

    render(
      <Tooltip content={complexContent}>
        <span>{mockChildren}</span>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    fireEvent.mouseEnter(trigger);

    await waitFor(() => {
      expect(screen.getByText('Titre complexe')).toBeInTheDocument();
      expect(screen.getByText('éléments')).toBeInTheDocument();
    });
  });
});