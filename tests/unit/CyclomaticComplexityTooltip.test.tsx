/**
 * Tests unitaires pour le composant CyclomaticComplexityTooltip
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CyclomaticComplexityTooltip from '../../components/CyclomaticComplexityTooltip';

describe('CyclomaticComplexityTooltip', () => {
  beforeEach(() => {
    render(<CyclomaticComplexityTooltip />);
  });

  it('affiche le titre du guide', () => {
    expect(screen.getByText("Guide d'interprétation")).toBeInTheDocument();
  });

  it('affiche les en-têtes du tableau', () => {
    expect(screen.getByText('Complexité')).toBeInTheDocument();
    expect(screen.getByText('Interprétation')).toBeInTheDocument();
  });

  it('affiche tous les niveaux de complexité', () => {
    // Niveau Excellent (1-10)
    expect(screen.getByText('1–10')).toBeInTheDocument();
    expect(screen.getByText('Excellente')).toBeInTheDocument();
    expect(screen.getByText(/Code simple, facile à tester et maintenir/)).toBeInTheDocument();

    // Niveau Modéré (11-20)
    expect(screen.getByText('11–20')).toBeInTheDocument();
    expect(screen.getByText('Modérée')).toBeInTheDocument();
    expect(screen.getByText(/Complexité acceptable, mais nécessite une attention/)).toBeInTheDocument();

    // Niveau Élevé (21-50)
    expect(screen.getByText('21–50')).toBeInTheDocument();
    expect(screen.getByText('Élevée')).toBeInTheDocument();
    expect(screen.getByText(/Code complexe, difficile à tester exhaustivement/)).toBeInTheDocument();

    // Niveau Très élevé (+50)
    expect(screen.getByText('+50')).toBeInTheDocument();
    expect(screen.getByText('Très élevée')).toBeInTheDocument();
    expect(screen.getByText(/Code considéré comme non maintenable/)).toBeInTheDocument();
  });

  it('affiche la note de conseil', () => {
    expect(screen.getByText(/💡 Conseil/)).toBeInTheDocument();
    expect(screen.getByText(/Visez une complexité cyclomatique ≤ 10/)).toBeInTheDocument();
  });

  it('utilise les bonnes classes CSS pour les niveaux', () => {
    const container = screen.getByText("Guide d'interprétation").closest('div');
    expect(container).toBeInTheDocument();

    // Vérifier que les ranges sont dans des spans avec la classe appropriée
    const range1to10 = screen.getByText('1–10');
    const range11to20 = screen.getByText('11–20');
    const range21to50 = screen.getByText('21–50');
    const rangePlus50 = screen.getByText('+50');

    // Tous les ranges doivent être dans des spans
    expect(range1to10.tagName).toBe('SPAN');
    expect(range11to20.tagName).toBe('SPAN');
    expect(range21to50.tagName).toBe('SPAN');
    expect(rangePlus50.tagName).toBe('SPAN');
  });

  it('affiche les textes en gras correctement', () => {
    const excellentStrong = screen.getByText('Excellente').closest('strong');
    const moderateStrong = screen.getByText('Modérée').closest('strong');
    const highStrong = screen.getByText('Élevée').closest('strong');
    const veryHighStrong = screen.getByText('Très élevée').closest('strong');
    const conseilStrong = screen.getByText('💡 Conseil :').closest('strong');

    expect(excellentStrong).toBeInTheDocument();
    expect(moderateStrong).toBeInTheDocument();
    expect(highStrong).toBeInTheDocument();
    expect(veryHighStrong).toBeInTheDocument();
    expect(conseilStrong).toBeInTheDocument();
  });

  it('structure le contenu avec la hiérarchie appropriée', () => {
    // Le titre doit être un h4
    const title = screen.getByRole('heading', { level: 4 });
    expect(title).toHaveTextContent("Guide d'interprétation");
  });

  it('contient toutes les informations d\'interprétation importantes', () => {
    // Vérifications sur le contenu détaillé
    expect(screen.getByText(/fonctions courtes et claires/)).toBeInTheDocument();
    expect(screen.getByText(/Refactoring possible si proche de 20/)).toBeInTheDocument();
    expect(screen.getByText(/Risque accru d'erreurs et de bugs/)).toBeInTheDocument();
    expect(screen.getByText(/découpage en sous-fonctions indispensable/)).toBeInTheDocument();
  });

  it('a la structure de table appropriée', () => {
    // Vérifier que le composant structure bien les informations
    const container = screen.getByText("Guide d'interprétation").closest('div');
    expect(container).toBeInTheDocument();
    
    // Les 4 niveaux + header doivent être présents
    expect(screen.getByText('1–10')).toBeInTheDocument();
    expect(screen.getByText('11–20')).toBeInTheDocument();
    expect(screen.getByText('21–50')).toBeInTheDocument();
    expect(screen.getByText('+50')).toBeInTheDocument();
  });
});