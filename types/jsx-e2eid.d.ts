/**
 * Extension des types JSX pour l'attribut personnalisé e2eid
 * utilisé par les tests E2E (Playwright / Testing Library avec testIdAttribute: 'e2eid')
 */
import type { HTMLAttributes } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    e2eid?: string | null;
  }
}
