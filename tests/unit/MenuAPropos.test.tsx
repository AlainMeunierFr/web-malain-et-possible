/**
 * Tests pour MenuAPropos (bande menu page A propos - US-11.3, US-13.2)
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuAPropos from '../../components/MenuAPropos';
import type { LigneDeMenu } from '../../utils/client';

const mockGet = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => '/a-propos',
  useSearchParams: () => ({ get: mockGet }),
}));

const lignes: LigneDeMenu[] = [
  { Titre: 'A propos du projet', Numéro: 1, Type: 'Path', Parametre: 'data/A propos/A propos du projet' },
  { Titre: 'Métriques', Numéro: 2, Type: 'container', Parametre: 'metrics' },
  { Titre: 'Charte graphique', Numéro: 3, Type: 'container', Parametre: 'charte' },
];

describe('MenuAPropos', () => {
  beforeEach(() => {
    mockGet.mockReturnValue(null);
  });

  it('affiche la nav avec data-testid menu-a-propos', () => {
    render(<MenuAPropos lignes={lignes} />);
    expect(screen.getByRole('navigation', { name: /Menu A propos du site/i })).toBeInTheDocument();
  });

  it('affiche un lien par ligne de menu', () => {
    render(<MenuAPropos lignes={lignes} />);
    expect(screen.getByRole('link', { name: 'A propos du projet' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Métriques' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Charte graphique' })).toBeInTheDocument();
  });

  it('bouton hamburger ouvre/ferme la liste', () => {
    render(<MenuAPropos lignes={lignes} />);
    const list = document.getElementById('menu-a-propos-liste');
    const button = screen.getByRole('button', { name: /ouvrir le menu/i });
    expect(list).not.toHaveClass('liste--open');
    fireEvent.click(button);
    expect(list).toHaveClass('liste--open');
    fireEvent.click(button);
    expect(list).not.toHaveClass('liste--open');
  });

  it('lien Path a href /a-propos/...', () => {
    render(<MenuAPropos lignes={lignes} />);
    const link = screen.getByRole('link', { name: 'A propos du projet' });
    expect(link).toHaveAttribute('href', expect.stringContaining('/a-propos/'));
  });

  it('lien container metrics a href /a-propos?view=metrics', () => {
    render(<MenuAPropos lignes={lignes} />);
    expect(screen.getByRole('link', { name: 'Métriques' })).toHaveAttribute('href', '/a-propos?view=metrics');
  });

  it('lien charte a href /a-propos/charte', () => {
    render(<MenuAPropos lignes={lignes} />);
    expect(screen.getByRole('link', { name: 'Charte graphique' })).toHaveAttribute('href', '/a-propos/charte');
  });

  it('affiche le menu même avec lignes vides', () => {
    render(<MenuAPropos lignes={[]} />);
    expect(screen.getByRole('navigation', { name: /Menu A propos du site/i })).toBeInTheDocument();
  });
});
