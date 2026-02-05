/**
 * Tests pour Tooltip
 * Composant tooltip avec hover/focus et portal
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from '../../components/Tooltip';

describe('Tooltip', () => {
  it('affiche les enfants sans tooltip si content est vide', () => {
    render(
      <Tooltip content="">
        <button>Test</button>
      </Tooltip>
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('affiche les enfants sans tooltip si content est null', () => {
    render(
      <Tooltip content={null as unknown as React.ReactNode}>
        <button>Test</button>
      </Tooltip>
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('affiche le tooltip au survol (mouseEnter)', () => {
    render(
      <Tooltip content="Info tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    
    const button = screen.getByText('Hover me');
    
    // Avant le survol, pas de tooltip
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    // Survol
    fireEvent.mouseEnter(button);
    
    // Le tooltip est visible
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Info tooltip')).toBeInTheDocument();
  });

  it('masque le tooltip quand la souris quitte (mouseLeave)', () => {
    render(
      <Tooltip content="Info tooltip">
        <button>Hover me</button>
      </Tooltip>
    );
    
    const button = screen.getByText('Hover me');
    
    // Survol
    fireEvent.mouseEnter(button);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    // Sortie
    fireEvent.mouseLeave(button);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('affiche le tooltip au focus', () => {
    render(
      <Tooltip content="Info tooltip">
        <button>Focus me</button>
      </Tooltip>
    );
    
    const button = screen.getByText('Focus me');
    
    // Focus
    fireEvent.focus(button);
    
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('masque le tooltip au blur', () => {
    render(
      <Tooltip content="Info tooltip">
        <button>Focus me</button>
      </Tooltip>
    );
    
    const button = screen.getByText('Focus me');
    
    // Focus puis blur
    fireEvent.focus(button);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    fireEvent.blur(button);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applique la classe de position bottom par défaut', () => {
    render(
      <Tooltip content="Info">
        <button>Test</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Test'));
    
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('infobulleBas');
  });

  it('applique la classe de position top', () => {
    render(
      <Tooltip content="Info" position="top">
        <button>Test</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Test'));
    
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('infobulleHaut');
  });

  it('applique la classe de position left', () => {
    render(
      <Tooltip content="Info" position="left">
        <button>Test</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Test'));
    
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('infobulleGauche');
  });

  it('applique la classe de position right', () => {
    render(
      <Tooltip content="Info" position="right">
        <button>Test</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Test'));
    
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('infobulleDroite');
  });

  it('applique une classe personnalisée', () => {
    render(
      <Tooltip content="Info" className="custom-class">
        <button>Test</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(screen.getByText('Test'));
    
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveClass('custom-class');
  });

  it('ajoute aria-describedby quand le tooltip est visible', () => {
    render(
      <Tooltip content="Info">
        <button>Test</button>
      </Tooltip>
    );
    
    const button = screen.getByText('Test');
    
    // Pas d'aria-describedby avant le survol
    expect(button).not.toHaveAttribute('aria-describedby');
    
    // Après le survol
    fireEvent.mouseEnter(button);
    expect(button).toHaveAttribute('aria-describedby', 'tooltip-active');
  });

  it('ajoute tabIndex=0 pour l\'accessibilité clavier', () => {
    render(
      <Tooltip content="Info">
        <span>Non focusable normalement</span>
      </Tooltip>
    );
    
    const span = screen.getByText('Non focusable normalement');
    expect(span).toHaveAttribute('tabIndex', '0');
  });
});
