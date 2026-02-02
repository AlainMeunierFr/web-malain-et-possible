/**
 * Tests unitaires pour BlocsProfils (page Mes Profils US-7.12).
 * TDD : RED → GREEN → REFACTOR
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlocsProfils from '../../components/BlocsProfils';
import type { ElementListeDeProfils, ElementProfil } from '../../utils/indexReader';

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

const profilsFixture: ElementProfil[] = [
  {
    type: 'profil',
    titre: 'Produit logiciel',
    jobTitles: ['CPO - Chief Product Officer', 'Product Manager'],
    slug: 'cpo',
    route: '/profil/cpo',
    cvPath: '/CV/cpo.pdf',
  },
  {
    type: 'profil',
    titre: 'Opérations',
    jobTitles: ['COO - Chief Operation Officer'],
    slug: 'coo',
    route: '/profil/coo',
    cvPath: '/CV/coo.pdf',
  },
  {
    type: 'profil',
    titre: 'Transformation Agile',
    jobTitles: ['Coach Agile'],
    slug: 'agile',
    route: '/profil/agile',
    cvPath: '/CV/agile.pdf',
  },
  {
    type: 'profil',
    titre: 'Technologie',
    jobTitles: ['CTO - Chief Technology Officer'],
    slug: 'cto',
    route: '/profil/cto',
    cvPath: '/CV/cto.pdf',
  },
];

const elementProfilsFixture: ElementListeDeProfils = {
  type: 'listeDeProfils',
  profils: profilsFixture,
};

describe('BlocsProfils', () => {
  it('affiche 4 blocs profil', () => {
    render(<BlocsProfils element={elementProfilsFixture} />);

    expect(screen.getByText('Produit logiciel')).toBeInTheDocument();
    expect(screen.getByText('Opérations')).toBeInTheDocument();
    expect(screen.getByText('Transformation Agile')).toBeInTheDocument();
    expect(screen.getByText('Technologie')).toBeInTheDocument();
  });

  it('affiche les job titles pour chaque profil', () => {
    render(<BlocsProfils element={elementProfilsFixture} />);

    expect(screen.getByText('CPO - Chief Product Officer')).toBeInTheDocument();
    expect(screen.getByText('COO - Chief Operation Officer')).toBeInTheDocument();
    expect(screen.getByText('Coach Agile')).toBeInTheDocument();
    expect(screen.getByText('CTO - Chief Technology Officer')).toBeInTheDocument();
  });

  it('affiche un lien "Télécharger le CV" par profil pointant vers le PDF', () => {
    render(<BlocsProfils element={elementProfilsFixture} />);

    const liensCV = screen.getAllByText('Télécharger le CV');
    expect(liensCV).toHaveLength(4);
    expect(liensCV[0].closest('a')).toHaveAttribute('href', '/CV/cpo.pdf');
    expect(liensCV[1].closest('a')).toHaveAttribute('href', '/CV/coo.pdf');
    expect(liensCV[2].closest('a')).toHaveAttribute('href', '/CV/agile.pdf');
    expect(liensCV[3].closest('a')).toHaveAttribute('href', '/CV/cto.pdf');
  });

  it('affiche une carte cliquable "En savoir plus…" par profil pointant vers la page du profil', () => {
    render(<BlocsProfils element={elementProfilsFixture} />);

    const liensEnSavoirPlus = screen.getAllByText('En savoir plus…');
    expect(liensEnSavoirPlus).toHaveLength(4);
    expect(liensEnSavoirPlus[0].closest('a')).toHaveAttribute('href', '/profil/cpo');
    expect(liensEnSavoirPlus[1].closest('a')).toHaveAttribute('href', '/profil/coo');
    expect(liensEnSavoirPlus[2].closest('a')).toHaveAttribute('href', '/profil/agile');
    expect(liensEnSavoirPlus[3].closest('a')).toHaveAttribute('href', '/profil/cto');
  });

  it('rend null si profils est vide', () => {
    const { container } = render(
      <BlocsProfils element={{ type: 'profils', profils: [] }} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('rend null si profils est absent', () => {
    const { container } = render(
      <BlocsProfils element={{ type: 'listeDeProfils', profils: undefined as unknown as ElementProfil[] }} />
    );

    expect(container.querySelector('.blocsProfils')).toBeNull();
  });
});
