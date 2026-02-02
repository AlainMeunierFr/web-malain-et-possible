const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'app', 'content-styles.css');
/* Ordre : noms longs d'abord pour que margin-left matche avant margin */
const propsToRemove = [
  'border-bottom-color',
  'border-left-color',
  'border-right-color',
  'border-top-color',
  'border-bottom',
  'border-left',
  'border-top',
  'border-collapse',
  'border-color',
  'border-radius',
  'border',
  'box-sizing',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin',
  'outline-offset',
  'outline',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-top',
  'padding',
];

const propPattern = new RegExp(
  '^\\s*(' + propsToRemove.join('|') + ')\\s*:\\s*[^;]+;\\s*$'
);

let css = fs.readFileSync(cssPath, 'utf8');
const lines = css.split('\n');
const kept = lines.filter((line) => !propPattern.test(line));
fs.writeFileSync(cssPath, kept.join('\n'), 'utf8');
console.log('Supprimé', lines.length - kept.length, 'lignes');
