'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEditing } from '../../contexts/EditingContext';
import CallToAction from '../../components/CallToAction';
import type { ElementCallToAction } from '../../utils/indexReader';
import { Egg } from 'lucide-react';
import { isDevelopment } from '../../utils/environment';
import AssistantScenario from '../../components/AssistantScenario';
import styles from './maintenance.module.css';

export default function MaintenancePage() {
  const router = useRouter();
  const { isAuthenticated } = useEditing();

  // US-Assistant-Scenario : en prod, rediriger si non authentifié ; en dev, afficher l'assistant sans mot de passe
  useEffect(() => {
    if (!isDevelopment() && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // En production sans authentification : ne rien afficher (redirection en cours)
  if (!isDevelopment() && !isAuthenticated) {
    return null;
  }

  // En développement : afficher l'assistant de construction de scénario
  if (isDevelopment()) {
    return (
      <div className={styles.maintenancePage}>
        <AssistantScenario />
      </div>
    );
  }

  // Mock d'ElementCallToAction pour le bouton "Faisons connaissance..."
  const callToActionElement: ElementCallToAction & { e2eID?: string } = {
    type: 'callToAction',
    action: 'Faisons connaissance...',
    e2eID: 'null', // Chaîne "null" pour indiquer qu'on ne fera pas de test E2E avec ce bouton
  };

  return (
    <div className={styles.maintenancePage}>
      <div className={styles.content}>
        <div className={styles.easterEggContainer}>
          <Egg className={styles.easterEggIcon} size={80} />
          <h2 className={styles.easterEggTitle}>Bravo ! 🎉</h2>
          <p className={styles.easterEggMessage}>
            Tu as été curieux en lisant la fameuse User Storie qui donne le mot de passe pour arriver ici.
            <br />
            <br />
            Clique (1) sur le bouton ci-dessous car tu viens de gagner un restaurant près de Lyon avec moi !!
            <br />
            <br />
            (1) on se tutoie du coup...
          </p>
          <CallToAction element={callToActionElement} />
        </div>
      </div>
    </div>
  );
}
