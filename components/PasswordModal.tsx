'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEditing } from '../contexts/EditingContext';
import styles from '../app/maintenance/maintenance.module.css';

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
          try {
            router.push('/maintenance');
          } catch (navigationError) {
            console.error('Erreur lors de la navigation:', navigationError);
            setError('Erreur lors de l\'accès au module');
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
    <div className={styles.passwordModalOverlay} onClick={onClose}>
      <div className={styles.passwordModalModal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.passwordModalTitle}>Accès au module d'édition</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className={styles.passwordModalLabel}>
            Mot de passe :
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.passwordModalInput}
            autoFocus
            disabled={isLoading}
          />
          {error && <p className={styles.passwordModalError}>{error}</p>}
          <div className={styles.passwordModalButtons}>
            <button type="submit" className={styles.passwordModalSubmitButton} disabled={isLoading} e2eid="null">
              {isLoading ? 'Vérification...' : 'Valider'}
            </button>
            <button type="button" onClick={onClose} className={styles.passwordModalCancelButton} disabled={isLoading} e2eid="null">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
