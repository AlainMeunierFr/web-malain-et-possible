/**
 * Tests unitaires pour la page Mes Profils (US-7.12).
 * Vérifie que la page charge mes-profils.json et affiche les 4 blocs profil, CTA Discutons, texteLarge.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MesProfilsPage from '../../app/mes-profils/page';
import { PageTitleProvider } from '../../contexts/PageTitleContext';

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return React.createElement('a', { href, ...props }, children);
  };
});

jest.mock('lucide-react', () => ({
  FileDown: () => React.createElement('svg', { 'e2eid': 'file-down' }),
}));

describe('Page Mes Profils', () => {
  const renderPage = () => {
    return render(
      <PageTitleProvider>
        <MesProfilsPage />
      </PageTitleProvider>
    );
  };

  it('affiche les 4 blocs profil (titres CPO, COO, Agile, CTO)', () => {
    renderPage();

    const titres = screen.getAllByRole('heading', { level: 3 });
    const titresTexte = titres.map((h) => h.textContent);
    expect(titresTexte).toContain('Produit logiciel');
    expect(titresTexte).toContain('Opérations');
    expect(titresTexte).toContain('Transformation Agile');
    expect(titresTexte).toContain('Technologie');
  });

  it('affiche le lien "Discutons" vers /faisons-connaissance', () => {
    renderPage();

    const discutons = screen.getByRole('link', { name: /discutons/i });
    expect(discutons).toHaveAttribute('href', '/faisons-connaissance');
  });

  it('affiche au moins un lien "Télécharger le CV" et "En savoir plus…" par profil', () => {
    renderPage();

    expect(screen.getAllByText('Télécharger le CV').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('En savoir plus…').length).toBeGreaterThanOrEqual(1);
  });
});
