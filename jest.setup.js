require('@testing-library/jest-dom');
const { configure } = require('@testing-library/react');

// Configurer pour utiliser data-e2eid au lieu de data-testid (cohérent avec Playwright)
configure({ testIdAttribute: 'data-e2eid' });

// Configuration pour React 19 : s'assurer que act est disponible
// @testing-library/react v16 gère automatiquement act() pour React 19
// Cette configuration évite les erreurs "React.act is not a function"
if (typeof globalThis.IS_REACT_ACT_ENVIRONMENT === 'undefined') {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
}
