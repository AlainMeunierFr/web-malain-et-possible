/**
 * Tests pour AssistantScenario - US-Assistant-Scenario
 * TDD : baby steps, couverture plan / listes / BleuFoncé-BleuClair / Annuler / Générer scénario
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssistantScenario from '../../components/AssistantScenario';

// Mock fetch pour /api/site-map
const mockPlan = {
  pages: [
    { url: '/', titre: 'Accueil', zone: 'HomePage' },
    { url: '/metrics', titre: 'Metrics', zone: 'Footer' },
  ],
  liens: [{ source: '/', destination: '/metrics', label: 'Metrics' }],
};

beforeEach(() => {
  global.fetch = jest.fn((url: string, init?: RequestInit) => {
    if (url === '/api/site-map') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPlan),
      }) as Promise<Response>;
    }
    if (url === '/api/generate-e2e-scenario' && init?.method === 'POST') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, path: '/tests/parcours.spec.ts' }),
      }) as Promise<Response>;
    }
    return Promise.reject(new Error('Unknown URL'));
  }) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

async function waitForAssistantLoaded() {
  await screen.findByText(/Liens à parcourir/i);
  expect(screen.getByText(/Chemin parcouru/i)).toBeInTheDocument();
}

describe('AssistantScenario', () => {
  it('affiche le plan du site et les listes après chargement', async () => {
    render(<AssistantScenario />);
    expect(screen.getByText(/Chargement/i)).toBeInTheDocument();
    await waitForAssistantLoaded();
  });

  it('affiche Accueil comme page courante (BleuFoncé) à l\'arrivée', async () => {
    const { container } = render(<AssistantScenario />);
    await waitForAssistantLoaded();
    const pageCurrent = container.querySelector('.pageCurrent');
    expect(pageCurrent).toBeInTheDocument();
    expect(pageCurrent?.textContent).toBe('Accueil');
  });

  it('affiche les pages accessibles en BleuClair (cliquables)', async () => {
    const { container } = render(<AssistantScenario />);
    await waitForAssistantLoaded();
    const accessible = container.querySelectorAll('.pageAccessible');
    expect(accessible.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: 'Metrics' })).toBeInTheDocument();
  });

  it('clic sur une page BleuClair met à jour page courante, chemin et liens à parcourir', async () => {
    const user = userEvent.setup();
    const { container } = render(<AssistantScenario />);
    await waitForAssistantLoaded();
    const boutonMetrics = screen.getByRole('button', { name: 'Metrics' });
    await user.click(boutonMetrics);
    await waitFor(() => {
      const pageCurrent = container.querySelector('.pageCurrent');
      expect(pageCurrent?.textContent).toBe('Metrics');
    });
    expect(screen.getByText(/Aucun \(tous parcourus\)/)).toBeInTheDocument();
  });

  it('bouton Générer scénario est désactivé tant que Liens à parcourir non vide', async () => {
    render(<AssistantScenario />);
    await waitForAssistantLoaded();
    const generer = screen.getByRole('button', { name: /Générer scénario/i });
    expect(generer).toBeDisabled();
  });

  it('bouton Annuler est désactivé quand une seule étape (Accueil)', async () => {
    render(<AssistantScenario />);
    await waitForAssistantLoaded();
    const annuler = screen.getByRole('button', { name: /^Annuler$/i });
    expect(annuler).toBeDisabled();
  });

  it('bouton Annuler retire la dernière étape et remet le lien dans Liens à parcourir', async () => {
    const user = userEvent.setup();
    const { container } = render(<AssistantScenario />);
    await waitForAssistantLoaded();
    await user.click(screen.getByRole('button', { name: 'Metrics' }));
    await waitFor(() => {
      expect(container.querySelector('.pageCurrent')?.textContent).toBe('Metrics');
    });
    const annuler = screen.getByRole('button', { name: /^Annuler$/i });
    expect(annuler).toBeEnabled();
    await user.click(annuler);
    await waitFor(() => {
      expect(container.querySelector('.pageCurrent')?.textContent).toBe('Accueil');
    });
  });

  it('bouton Tout annuler réinitialise et vide Chemin parcouru', async () => {
    const user = userEvent.setup();
    const { container } = render(<AssistantScenario />);
    await waitForAssistantLoaded();
    await user.click(screen.getByRole('button', { name: 'Metrics' }));
    await waitFor(() => {
      expect(container.querySelector('.pageCurrent')?.textContent).toBe('Metrics');
    });
    await user.click(screen.getByRole('button', { name: /Tout annuler/i }));
    await waitFor(() => {
      expect(container.querySelector('.pageCurrent')?.textContent).toBe('Accueil');
      expect(screen.getByText('Aucun')).toBeInTheDocument();
    });
  });

  it('quand Liens à parcourir est vide, bouton Générer scénario est actif', async () => {
    const user = userEvent.setup();
    render(<AssistantScenario />);
    await waitForAssistantLoaded();
    await user.click(screen.getByRole('button', { name: 'Metrics' }));
    await waitFor(() => {
      const generer = screen.getByRole('button', { name: /Générer scénario/i });
      expect(generer).toBeEnabled();
    });
  });

  it('clic sur Générer scénario appelle l\'API et affiche le chemin généré', async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<AssistantScenario />);
    await waitForAssistantLoaded();
    await user.click(screen.getByRole('button', { name: 'Metrics' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Générer scénario/i })).toBeEnabled();
    });
    await user.click(screen.getByRole('button', { name: /Générer scénario/i }));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/generate-e2e-scenario',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chemin: ['/', '/metrics'] }),
        })
      );
      expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('parcours'));
    });
    alertSpy.mockRestore();
  });

  it('affiche une erreur si le chargement du plan échoue', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Erreur chargement plan'))
    );
    render(<AssistantScenario />);
    expect(await screen.findByText(/Erreur chargement plan/i)).toBeInTheDocument();
  });
});
