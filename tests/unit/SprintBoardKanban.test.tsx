/**
 * Tests TDD pour SprintBoardKanban (US-11.5)
 * Board KanBan du sprint en cours : appel API, affichage goal, colonnes, cartes.
 */

import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SprintBoardKanban from '../../components/SprintBoardKanban';

const mockBoardData = {
  goal: 'Améliorer le back-office du projet.',
  columns: [
    { id: 'a_faire', label: 'A faire', type: 'a_faire', count: 2 },
    { id: 'TDD-back-end', label: 'TDD-back-end', type: 'agent', count: 1, wipLimit: '1/1' },
    { id: 'fait', label: 'Fait', type: 'fait', count: 1 },
  ],
  cards: [
    { id: 'US-11.4', titre: 'Affichage Path', filename: 'US-11.4 - Affichage Path.md', state: 'fait' },
    { id: 'US-11.5', titre: 'Definition du board KanBan', filename: 'US-11.5 - Definition du board KanBan.md', state: 'en_cours', agentColumn: 'TDD-back-end' },
    { id: 'US-11.6', titre: 'Autre US', filename: 'US-11.6 - Autre US.md', state: 'a_faire' },
  ],
};

describe('SprintBoardKanban', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock) = jest.fn();
  });

  it('affiche le chargement tant que la réponse API n\'est pas reçue', () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<SprintBoardKanban />);

    expect(screen.getByText(/Chargement du sprint en cours/)).toBeInTheDocument();
  });

  it('affiche le Sprint Goal en style TexteLarge après chargement', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockBoardData) });

    render(<SprintBoardKanban />);

    await waitFor(() => {
      expect(screen.getByTestId('sprint-goal')).toBeInTheDocument();
    });
    expect(screen.getByText('Améliorer le back-office du projet.')).toBeInTheDocument();
    const goalEl = screen.getByTestId('sprint-goal');
    expect(goalEl.className).toContain('texteLarge');
  });

  it('affiche les colonnes A faire, agents, Fait avec décomptes', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockBoardData) });

    render(<SprintBoardKanban />);

    await waitFor(() => {
      expect(screen.getByText('A faire')).toBeInTheDocument();
    });
    expect(screen.getByText('A faire')).toBeInTheDocument();
    expect(screen.getByText('TDD-back-end')).toBeInTheDocument();
    expect(screen.getByText('Fait')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1/1')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('affiche les cartes dans la bonne colonne selon leur état', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockBoardData) });

    render(<SprintBoardKanban />);

    await waitFor(() => {
      expect(screen.getByText('US-11.5')).toBeInTheDocument();
    });
    expect(screen.getByText('US-11.4')).toBeInTheDocument();
    expect(screen.getByText('US-11.6')).toBeInTheDocument();
    expect(screen.getByText(/Definition du board KanBan/)).toBeInTheDocument();
    expect(screen.getByText(/Affichage Path/)).toBeInTheDocument();
    expect(screen.getByText(/Autre US/)).toBeInTheDocument();
  });

  it('affiche le board (zone sprint)', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ json: () => Promise.resolve(mockBoardData) });

    render(<SprintBoardKanban />);

    await waitFor(() => {
      expect(document.querySelector('.tableauSprint')).toBeInTheDocument();
    });
  });

  it('affiche le message d\'erreur si l\'API renvoie une erreur sans colonnes', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ error: 'Aucune US en cours', goal: '', columns: [], cards: [] }),
    });

    render(<SprintBoardKanban />);

    await waitFor(() => {
      expect(screen.getByText('Aucune US en cours')).toBeInTheDocument();
    });
  });

  it('affiche le message d\'erreur si fetch échoue', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<SprintBoardKanban />);

    await waitFor(() => {
      expect(screen.getByText('Impossible de charger le board')).toBeInTheDocument();
    });
  });

  describe('modal détail US (US-11.6)', () => {
    it('au clic sur une carte, appelle l\'API /api/sprint-board/us/[usId] et affiche la modal', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockBoardData) })
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              id: 'US-11.5',
              titre: 'Definition du board KanBan',
              content: '- **En tant que** visiteur\n- **Je souhaite** un board\n- **Afin de** visualiser\n\n- **Critères d\'acceptation** :\n- CA1 : Colonnes',
            }),
        });

      render(<SprintBoardKanban />);

      await waitFor(() => {
        expect(screen.getByText('US-11.5')).toBeInTheDocument();
      });

      const card = screen.getByRole('button', { name: /Voir le détail de US-11.5/ });
      await userEvent.click(card);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/sprint-board/us/US-11.5');
      });

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      const dialog = screen.getByRole('dialog');
      expect(within(dialog).getByText(/Definition du board KanBan/)).toBeInTheDocument();
    });

    it('la modal affiche un bouton de fermeture et le clic ferme la modal', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({ json: () => Promise.resolve(mockBoardData) })
        .mockResolvedValueOnce({
          ok: true,
          json: () =>
            Promise.resolve({
              id: 'US-11.6',
              titre: 'Autre US',
              content: '- **En tant que** visiteur\n- **Critères d\'acceptation** :\n- CA1',
            }),
        });

      render(<SprintBoardKanban />);

      await waitFor(() => {
        expect(screen.getByText('US-11.6')).toBeInTheDocument();
      });

      const card = screen.getByRole('button', { name: /Voir le détail de US-11.6/ });
      await userEvent.click(card);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const closeButton = screen.getByRole('button', { name: /Fermer la modal/ });
      await userEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });
});
