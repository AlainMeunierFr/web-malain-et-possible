/**
 * Tests unitaires pour le composant ProfilContainer
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilContainer from '../../components/ProfilContainer';
import type { Profil } from '../../utils/indexReader';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
    return React.createElement('a', { href, className }, children);
  };
});

// Mock lucide-react FileDown (e2eid pour getByTestId dans ce projet)
jest.mock('lucide-react', () => ({
  FileDown: () => React.createElement('svg', { 'e2eid': 'file-down' }),
}));

describe('Composant ProfilContainer', () => {
  it('devrait afficher le titre du profil', () => {
    const profil: Profil = {
      type: 'profil',
      titre: 'Produit logiciel',
      jobTitles: ['CPO - Chief Product Officer'],
      slug: 'cpo',
      route: '/profil/cpo',
      cvPath: '/CV/cpo.pdf',
    };

    render(<ProfilContainer profil={profil} />);

    expect(screen.getByText('Produit logiciel')).toBeInTheDocument();
  });

  it('devrait afficher tous les job titles', () => {
    const profil: Profil = {
      type: 'profil',
      titre: 'Produit logiciel',
      jobTitles: [
        'CPO - Chief Product Officer',
        'HOP - Head of Product',
        'Product Manager',
      ],
      slug: 'cpo',
      route: '/profil/cpo',
      cvPath: '/CV/cpo.pdf',
    };

    render(<ProfilContainer profil={profil} />);

    expect(screen.getByText('CPO - Chief Product Officer')).toBeInTheDocument();
    expect(screen.getByText('HOP - Head of Product')).toBeInTheDocument();
    expect(screen.getByText('Product Manager')).toBeInTheDocument();
  });

  it('devrait avoir un bouton d\'accès vers la route du profil', () => {
    const profil: Profil = {
      type: 'profil',
      titre: 'Produit logiciel',
      jobTitles: [],
      slug: 'cpo',
      route: '/profil/cpo',
      cvPath: '/CV/cpo.pdf',
    };

    render(<ProfilContainer profil={profil} />);

    const boutonAcces = screen.getByRole('link', { name: /découvrir|en savoir plus|voir le profil/i });
    expect(boutonAcces).toHaveAttribute('href', '/profil/cpo');
  });

  it('devrait avoir un lien CV discret pointant vers le PDF (libellé par défaut "Voir le CV")', () => {
    const profil: Profil = {
      type: 'profil',
      titre: 'Produit logiciel',
      jobTitles: [],
      slug: 'cpo',
      route: '/profil/cpo',
      cvPath: '/CV/cpo.pdf',
    };

    render(<ProfilContainer profil={profil} />);

    const lienCV = screen.getByText('Voir le CV');
    expect(lienCV).toBeInTheDocument();
    expect(lienCV.closest('a')).toHaveAttribute('href', '/CV/cpo.pdf');
    expect(lienCV.closest('a')).toHaveAttribute('target', '_blank');
    expect(lienCV.closest('a')).toHaveAttribute('title', 'Voir le CV (PDF)');
    expect(screen.getByTestId('file-down')).toBeInTheDocument();
  });

  it('devrait utiliser les libellés personnalisés quand fournis (page Mes Profils)', () => {
    const profil: Profil = {
      type: 'profil',
      titre: 'Produit logiciel',
      jobTitles: [],
      slug: 'cpo',
      route: '/profil/cpo',
      cvPath: '/CV/cpo.pdf',
    };

    render(
      <ProfilContainer
        profil={profil}
        labelAcces="En savoir plus…"
        labelCV="Télécharger le CV"
      />
    );

    expect(screen.getByText('En savoir plus…').closest('a')).toHaveAttribute('href', '/profil/cpo');
    expect(screen.getByText('Télécharger le CV').closest('a')).toHaveAttribute('href', '/CV/cpo.pdf');
    expect(screen.getByText('Télécharger le CV').closest('a')).toHaveAttribute('title', 'Télécharger le CV (PDF)');
  });
});
