/**
 * Tests pour PasswordModal (œuf de Pâques / accès maintenance)
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PasswordModal from '../../components/PasswordModal';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockSetIsAuthenticated = jest.fn();
jest.mock('../../contexts/EditingContext', () => ({
  useEditing: () => ({ setIsAuthenticated: mockSetIsAuthenticated }),
}));

const mockFetch = jest.fn();
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = mockFetch;
});

describe('PasswordModal', () => {
  it('ne rend rien quand isOpen est false', () => {
    render(<PasswordModal isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByRole('heading', { name: /accès au module/i })).not.toBeInTheDocument();
  });

  it('affiche le formulaire quand isOpen est true', () => {
    render(<PasswordModal isOpen onClose={jest.fn()} />);
    expect(screen.getByRole('heading', { name: /accès au module d'édition/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /valider/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /annuler/i })).toBeInTheDocument();
  });

  it('appelle onClose au clic sur Annuler', () => {
    const onClose = jest.fn();
    render(<PasswordModal isOpen onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /annuler/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('affiche une erreur si le mot de passe est incorrect', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: false, error: 'Mot de passe incorrect' }),
    });
    const onClose = jest.fn();
    render(<PasswordModal isOpen onClose={onClose} />);
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /valider/i }));
    await waitFor(() => {
      expect(screen.getByText(/mot de passe incorrect/i)).toBeInTheDocument();
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('appelle setIsAuthenticated et onClose si le mot de passe est valide', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
    const onClose = jest.fn();
    render(<PasswordModal isOpen onClose={onClose} />);
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'secret' } });
    fireEvent.click(screen.getByRole('button', { name: /valider/i }));
    await waitFor(() => {
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
      expect(onClose).toHaveBeenCalled();
    });
  });
});
