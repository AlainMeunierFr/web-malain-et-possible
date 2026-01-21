module.exports = {
  default: {
    require: ['tests/bdd/**/*.steps.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
  },
};
