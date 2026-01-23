require('@testing-library/jest-dom');
const { configure } = require('@testing-library/react');

// Configurer pour utiliser data-e2eid au lieu de data-testid (cohérent avec Playwright)
configure({ testIdAttribute: 'data-e2eid' });
