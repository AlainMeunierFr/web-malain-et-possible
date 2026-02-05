require('@testing-library/jest-dom');
const { configure } = require('@testing-library/react');

// Configurer pour utiliser e2eid (cohérent avec Playwright)
configure({ testIdAttribute: 'e2eid' });

// Mock react-syntax-highlighter (ESM dans node_modules, non transformé par Jest)
jest.mock('react-syntax-highlighter', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- CommonJS setup, pas de ESM
  const React = require('react');
  return {
    Prism: ({ children }) => React.createElement('pre', { className: 'prism-mock' }, React.createElement('code', null, children)),
    Light: ({ children }) => React.createElement('pre', { className: 'light-mock' }, React.createElement('code', null, children)),
  };
});
jest.mock('react-syntax-highlighter/dist/cjs/styles/prism/one-light', () => ({}));

// Configuration pour React 19 : s'assurer que act est disponible
// @testing-library/react v16 gère automatiquement act() pour React 19
// Cette configuration évite les erreurs "React.act is not a function"
if (typeof globalThis.IS_REACT_ACT_ENVIRONMENT === 'undefined') {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
}
