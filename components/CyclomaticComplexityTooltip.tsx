/**
 * Contenu du tooltip pour la métrique Complexité Cyclomatique
 * Affiche un tableau d'interprétation avec 4 niveaux de complexité
 */

import React from 'react';
import styles from './CyclomaticComplexityTooltip.module.css';

export function CyclomaticComplexityTooltip() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Guide d&apos;interprétation</h4>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.header}`}>
          <div className={styles.complexity}>Complexité</div>
          <div className={styles.interpretation}>Interprétation</div>
        </div>
        
        <div className={`${styles.row} ${styles.excellent}`}>
          <div className={styles.complexity}>
            <span className={styles.range}>1–10</span>
          </div>
          <div className={styles.interpretation}>
            <strong>Excellente</strong> : Code simple et maintenable.
          </div>
        </div>
        
        <div className={`${styles.row} ${styles.moderate}`}>
          <div className={styles.complexity}>
            <span className={styles.range}>11–20</span>
          </div>
          <div className={styles.interpretation}>
            <strong>Modérée</strong> : Acceptable. Attention aux tests.
          </div>
        </div>
        
        <div className={`${styles.row} ${styles.high}`}>
          <div className={styles.complexity}>
            <span className={styles.range}>21–50</span>
          </div>
          <div className={styles.interpretation}>
            <strong>Élevée</strong> : Difficile à tester. Refactoring recommandé.
          </div>
        </div>
        
        <div className={`${styles.row} ${styles.veryHigh}`}>
          <div className={styles.complexity}>
            <span className={styles.range}>+50</span>
          </div>
          <div className={styles.interpretation}>
            <strong>Très élevée</strong> : Non maintenable. Refactoring urgent.
          </div>
        </div>
      </div>
      
      <div className={styles.note}>
        <p><strong>💡</strong> Idéal : ≤ 10 pour une maintenabilité optimale</p>
      </div>
    </div>
  );
}

export default CyclomaticComplexityTooltip;