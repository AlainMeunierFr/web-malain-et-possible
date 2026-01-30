import React from 'react';
import Link from 'next/link';
import type { ElementCallToAction } from '../utils/indexReader';

export interface CallToActionProps {
  element: ElementCallToAction;
}

const CallToAction: React.FC<CallToActionProps> = ({ element }) => {
  return (
    <div className="callToAction">
      <Link 
        href="/faisons-connaissance" 
        className="bouton"
        e2eid={element.e2eID ? `e2eid-${element.e2eID}` : undefined}
      >
        {element.action}
      </Link>
    </div>
  );
};

export default CallToAction;
