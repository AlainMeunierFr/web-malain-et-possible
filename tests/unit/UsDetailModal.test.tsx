/**
 * Tests TDD pour UsDetailModal (US-11.6)
 * Modal détail US : titre, bloc fixe (En tant que...), zone défilable (CA), fermeture.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsDetailModal from '../../components/UsDetailModal';

const mockData = {
  id: 'US-11.5',
  titre: 'Definition du board KanBan',
  content: `- **En tant que** visiteur
- **Je souhaite** un board KanBan
- **Afin de** visualiser l'état

- **Critères d'acceptation** :
- **CA1** : Colonnes A faire / agents / Fait
- **CA2** : Cartes par état`,
};

describe('UsDetailModal', () => {
  it('affiche le titre (ID et titre) et le bouton de fermeture', () => {
    const onClose = jest.fn();
    render(<UsDetailModal data={mockData} onClose={onClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('US-11.5')).toBeInTheDocument();
    expect(screen.getByText(/Definition du board KanBan/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fermer la modal/ })).toBeInTheDocument();
  });

  it('appelle onClose au clic sur le bouton de fermeture', async () => {
    const onClose = jest.fn();
    render(<UsDetailModal data={mockData} onClose={onClose} />);

    const closeButton = screen.getByRole('button', { name: /Fermer la modal/ });
    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('affiche le bloc En tant que / Je souhaite / Afin de dans la zone fixe', () => {
    render(<UsDetailModal data={mockData} onClose={jest.fn()} />);

    expect(screen.getByText(/En tant que/)).toBeInTheDocument();
    expect(screen.getByText(/Je souhaite/)).toBeInTheDocument();
    expect(screen.getByText(/Afin de/)).toBeInTheDocument();
  });

  it('affiche les critères d\'acceptation dans la zone défilable', () => {
    render(<UsDetailModal data={mockData} onClose={jest.fn()} />);

    expect(screen.getByText(/Critères d'acceptation/)).toBeInTheDocument();
    expect(screen.getByText(/CA1/)).toBeInTheDocument();
    expect(screen.getByText(/CA2/)).toBeInTheDocument();
  });
});
