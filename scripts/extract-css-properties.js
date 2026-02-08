const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const files = [
  'app/globals.css',
  'app/content-styles.css',
  'app/a-propos/a-propos.css',
  'app/maintenance/maintenance.module.css',
  'app/metrics/metrics.css'
];

/**
 * Retourne la catégorie / famille d'une propriété CSS pour classement.
 * Basé sur les spécifications et usages courants (typographie, layout, box, couleur, etc.).
 */
function getCategory(prop) {
  if (prop.startsWith('--')) return 'Variables CSS';
  if (/^font-|^line-height|^letter-spacing|^text-|^white-space|^word-spacing|^vertical-align$/.test(prop)) return 'Typographie';
  if (/^display$|^position$|^top$|^right$|^bottom$|^left$|^width$|^height$|^min-|^max-|^flex-|^grid-|^align-|^justify-|^gap$|^overflow/.test(prop)) return 'Disposition';
  if (/^margin|^padding|^border|^box-sizing|^outline/.test(prop)) return 'Boîte';
  if (/^color$|^background|^border-color|^outline-color/.test(prop)) return 'Couleur et fond';
  if (/^box-shadow|^opacity|^visibility|^filter/.test(prop)) return 'Effets visuels';
  if (/^transition|^animation|^transform/.test(prop)) return 'Animation et transition';
  if (/^cursor|^list-style|^content$|^src$/.test(prop)) return 'Divers';
  return 'Autre';
}

/**
 * Pour Excel : si la valeur commence par "-", préfixer par "'" pour éviter interprétation formule.
 */
function formatValueForExcel(val) {
  if (val.length > 0 && val.charAt(0) === '-') return "'" + val;
  return val;
}

const lines = ['catégorie\tpropriété CSS\tvaleur'];
const re = /([a-zA-Z-]+)\s*:\s*([^;]+);/g;

files.forEach((f) => {
  const filePath = path.join(root, f);
  try {
    let css = fs.readFileSync(filePath, 'utf8');
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    let m;
    while ((m = re.exec(css)) !== null) {
      const prop = m[1].trim();
      let val = m[2].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
      val = formatValueForExcel(val);
      const cat = getCategory(prop);
      lines.push(cat + '\t' + prop + '\t' + val);
    }
  } catch (e) {
    console.error(f, e.message);
  }
});

const outPath = path.join(root, '.cursor', 'etat-des-lieux-css.txt');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log('Écrit ' + (lines.length - 1) + ' lignes dans .cursor/etat-des-lieux-css.txt');
