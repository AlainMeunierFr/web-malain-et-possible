'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEditing } from '../../contexts/EditingContext';
import styles from './maintenance.module.css';

export default function MaintenancePage() {
  const router = useRouter();
  const { isAuthenticated } = useEditing();

  // Rediriger si non authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.maintenancePage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Maintenance</h1>
      </div>
      <div className={styles.content}>
        <p>Module de maintenance - À implémenter</p>
      </div>
    </div>
  );
}
