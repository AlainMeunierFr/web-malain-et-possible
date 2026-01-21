'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditing } from '../contexts/EditingContext';
import styles from './PasswordModal.module.css';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useEditing();
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Réponse invalide du serveur');
      }

      if (data.success) {
        setIsAuthenticated(true);
        onClose();
        // router.push peut retourner une promesse ou undefined selon la version de Next.js
        try {
          const pushResult = router.push('/maintenance');
          // Si c'est une promesse, gérer les erreurs
          if (pushResult && typeof pushResult.catch === 'function') {
            pushResult.catch((navigationError) => {
              console.error('Erreur lors de la navigation:', navigationError);
              setError('Erreur lors de l\'accès au module');
            });
          }
        } catch (navigationError) {
          console.error('Erreur lors de la navigation:', navigationError);
          setError('Erreur lors de l\'accès au module');
        }
      } else {
        setError(data.error || 'Mot de passe incorrect');
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du mot de passe:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la vérification du mot de passe');
    } finally {
      setIsLoading(false);
      setPassword('');
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Accès au module d'édition</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className={styles.label}>
            Mot de passe :
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            autoFocus
            disabled={isLoading}
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Vérification...' : 'Valider'}
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton} disabled={isLoading}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
