/**
 * Génère le fichier "Hiérarchie containers par page" pour le mode GO CSS.
 * Containers uniquement — à copier-coller dans l'agent Designer.
 * Source : JSON de chaque page (contenu réel) → contenuToAsciiArt.
 * Usage : npm run css:hierarchy
 */

import * as fs from 'fs';
import * as path from 'path';
import { readPageData } from '../utils/vitrine';
import { contenuToAsciiArt } from '../utils/backoffice';

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'data', 'A propos de ce site', 'Documentation technique');
const OUTPUT_FILE = path.join(OUTPUT_DIR, '9. Hiérarchie containers par page.md');

/** Pages à documenter (routes + titres). */
interface PageInfo {
  url: string;
  titre: string;
}

/** Liste des pages principales. */
const PAGES: PageInfo[] = [
  { url: '/', titre: 'Home' },
  { url: '/mes-profils', titre: 'Mes Profils' },
  { url: '/profil/cpo', titre: 'Profil CPO' },
  { url: '/profil/coo', titre: 'Profil COO' },
  { url: '/profil/agile', titre: 'Profil Agile' },
  { url: '/profil/cto', titre: 'Profil CTO' },
  { url: '/detournement-video', titre: 'Détournement vidéo' },
  { url: '/portfolio-detournements', titre: 'Portfolio détournements' },
  { url: '/pour-aller-plus-loin', titre: 'Pour aller plus loin' },
  { url: '/faisons-connaissance', titre: 'Faisons connaissance' },
];

function loadPagesFromPlanDuSite(): PageInfo[] {
  const planPath = path.join(ROOT, 'data', 'plan-du-site.json');
  if (!fs.existsSync(planPath)) return PAGES;
  try {
    const plan = JSON.parse(fs.readFileSync(planPath, 'utf-8'));
    const pages = plan?.contenu?.find((el: { type: string }) => el.type === 'listeDesPages')?.pages;
    if (Array.isArray(pages) && pages.length > 0) {
      return pages
        .filter((p: { url: string }) => p.url !== '/a-propos-du-site' && p.url !== '/plan-du-site')
        .map((p: { url: string; titre: string }) => ({ url: p.url, titre: p.titre || p.url }));
    }
  } catch {
    // Ignorer les erreurs
  }
  return PAGES;
}

/** Convertit une URL en nom de fichier JSON. */
function urlToJsonFilename(url: string): string {
  if (url === '/') return 'index.json';
  const rest = url.slice(1);
  if (rest.startsWith('profil/')) return `profil-${rest.slice(7)}.json`;
  return rest.replace(/\//g, '-') + '.json';
}

function generateMarkdown(pages: Array<PageInfo & { ascii: string }>): string {
  const sections = pages.map(
    (p) => `## ${p.titre} (\`${p.url}\`)

\`\`\`
${p.ascii}
\`\`\`
`
  );
  return `# Hiérarchie containers par page (ASCII Art)

Containers uniquement — pour le mode **GO CSS** de l'agent Designer.  
Source : JSON de chaque page (\`readPageData\` + \`contenuToAsciiArt\`).  
Généré par \`npm run css:hierarchy\`.

**Usage** : copier-coller le bloc ASCII de la page souhaitée dans la commande \`GO CSS\`.

---

${sections.join('---\n\n')}
`;
}

// Créer le dossier si nécessaire
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const pages = loadPagesFromPlanDuSite();
const dataDir = path.join(ROOT, 'data');
const sections: Array<PageInfo & { ascii: string }> = [];

for (const p of pages) {
  const filename = urlToJsonFilename(p.url);
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ Fichier absent : ${filename} — page ${p.url} ignorée`);
    continue;
  }
  try {
    const pageData = readPageData(filename);
    const ascii = contenuToAsciiArt(pageData.contenu ?? []);
    sections.push({ ...p, ascii });
  } catch (err) {
    console.warn(`⚠ Erreur lecture ${filename}:`, err);
  }
}

const markdown = generateMarkdown(sections);
fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');

console.log('✅ Fichier généré : data/A propos de ce site/Documentation technique/9. Hiérarchie containers par page.md');
console.log(`   ${sections.length} pages documentées (source : JSON réel).`);
