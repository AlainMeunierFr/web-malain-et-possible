import React from 'react';
import Link from 'next/link';
import type { ElementCallToAction } from '../utils/indexReader';
import styles from './CallToAction.module.css';

export interface CallToActionProps {
  element: ElementCallToAction;
}

const CallToAction: React.FC<CallToActionProps> = ({ element }) => {
  return (
    <div className={styles.callToActionContainer}>
      <Link 
        href="/faisons-connaissance" 
        className={styles.callToActionButton}
        data-e2eid={element.e2eID || undefined}
      >
        {element.action}
      </Link>
    </div>
  );
};

export default CallToAction;
