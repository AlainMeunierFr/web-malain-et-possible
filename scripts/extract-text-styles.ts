/**
 * Extrait les styles associés au TEXTE du fichier app/content-styles.css
 * et génère un fichier .txt tabulé (UTF-8).
 * Colonnes : Chemin CSS, Nom du style (= sélecteur brut), TypeDeContenu, Composant, Niveau de titre, Type standard HTML, Police, Taille, Gras, Italique, Couleur.
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

/** Fichier CSS à exporter. */
const CSS_EXPORT_PATH = 'app/content-styles.css';

/** À partir du sélecteur CSS, déduit le niveau de titre (H1–H6) si applicable */
function getNiveauTitre(selector: string): string {
  const sel = selector.split(',')[0].trim();
  const hMatch = sel.match(/\bh([1-6])\b/i);
  return hMatch ? `H${hMatch[1]}` : '-';
}

/** À partir du sélecteur CSS, déduit le type standard HTML */
function getTypeStandardHtml(selector: string): string {
  const sel = selector.split(',')[0].trim();
  const s = sel.toLowerCase();
  if (/\bh[1-6]\b/.test(s)) return 'Titre';
  if (/\b(ul|li)\b/.test(s) || s.includes('.markdownlist') || s.includes('ul ') || s.includes(' li')) return 'Liste à puces';
  if (/\bol\b/.test(s)) return 'Liste numérotée';
  if (/\ba\b(?!\w)/.test(s) || s.includes('lieninterne') || s.includes('.lien')) return 'Lien';
  if (/\bbutton\b/.test(s) || s.includes('.bouton')) return 'Bouton';
  if (/\bp\b(?!\w)/.test(s) || s.includes('.paragraph') || s.includes('.contenu') || s.includes('.description') || s.includes('.texte') || s.includes('.auteur') || s.includes('.fonction') || s.includes('.pitch') || s.includes('.pourlecomptede') || s.includes('.titrevideo')) return 'Normal (paragraphe)';
  if (s.includes('.nom') || s.includes('.titre') || s.includes('partietitle') || s.includes('souspartietitle') || s.includes('bloctitle') || s.includes('experiencestitre') || s.includes('experiencetitre')) return 'Titre';
  return '-';
}

/** TypeDeContenu et Composant à partir du sélecteur (convention projet, inclut noms canoniques) */
function getTypeDeContenuEtComposant(filePath: string, selector: string): { typeDeContenu: string; composant: string } {
  const sel = selector.split(',')[0].trim();
  const selNorm = sel.replace(/\s+/g, ' ');
  let typeDeContenu = '';
  let composant = '';

  if (selNorm.includes('domaineDeCompetence-titre') || selNorm.includes('domaineDeCompetence-contenu') || selNorm.includes('domaineDeCompetence-auteur')) {
    typeDeContenu = 'domaineDeCompetence';
    composant = 'DomaineDeCompetences';
  } else if (selNorm.includes('competence-titre') || selNorm.includes('competence-description') || selNorm.includes('competence-auteur') || selNorm.includes('competence-bouton')) {
    typeDeContenu = 'competence';
    composant = 'DomaineDeCompetences';
  } else if (selNorm.includes('.titre.texte') || selNorm.includes('.titre .texte') || /\.titre\s+h1/.test(selNorm)) {
    typeDeContenu = 'titre';
    composant = 'Titre';
  } else if (selNorm.includes('.texteLarge') || selNorm.includes('.texteLarge-texte')) {
    typeDeContenu = 'texteLarge';
    composant = 'TexteLarge';
  } else if (selNorm.includes('.domaineDeCompetence') || selNorm.includes('.competence') || selNorm.includes('.experiences')) {
    typeDeContenu = 'domaineDeCompetence';
    composant = 'DomaineDeCompetences';
  } else if (selNorm.includes('.temoignages') || selNorm.includes('.temoignage')) {
    typeDeContenu = 'listeDeTemoignages';
    composant = 'Temoignages';
  } else if (selNorm.includes('.hero')) {
    typeDeContenu = 'hero';
    composant = 'HeroSection';
  } else if (selNorm.includes('.profil') || selNorm.includes('.blocsProfils') || selNorm.includes('.jobTitle')) {
    typeDeContenu = 'listeDeProfils';
    composant = 'BlocsProfils / ProfilContainer';
  } else if (selNorm.includes('.video ') && !selNorm.includes('videoDetournement')) {
    typeDeContenu = 'video';
    composant = 'Video';
  } else if (selNorm.includes('.videoDetournement') || selNorm.includes('detournementVideo-')) {
    typeDeContenu = 'listeDeDetournementsVideo';
    composant = 'VideoDetournement';
  } else if (selNorm.includes('.callToAction')) {
    typeDeContenu = 'callToAction';
    composant = 'CallToAction';
  } else if (selNorm.includes('.groupeBoutons') || selNorm.includes('.groupeDeBoutons.texte')) {
    typeDeContenu = 'groupeDeBoutons';
    composant = 'GroupeBoutons';
  } else if (selNorm.includes('.listeDesPages')) {
    typeDeContenu = 'listeDesPages';
    composant = 'ListeDesPages';
  } else if (selNorm.includes('.bouton')) {
    typeDeContenu = 'bouton (partagé)';
    composant = 'plusieurs';
  } else if (selNorm.includes('.lienInterne')) {
    typeDeContenu = 'lien';
    composant = 'liens internes';
  } else if (selNorm.includes('header.header') || selNorm.includes('.pageTitle') || selNorm.includes('.titreDePage.texte') || selNorm.includes('titreDePage')) {
    typeDeContenu = 'titreDePage';
    composant = 'Header';
  }

  if (!typeDeContenu && composant) typeDeContenu = '-';
  if (!composant) composant = '-';
  return { typeDeContenu, composant };
}

function findCssFiles(): string[] {
  const fullPath = path.join(ROOT, CSS_EXPORT_PATH);
  if (!fs.existsSync(fullPath)) return [];
  return [CSS_EXPORT_PATH];
}

interface ParsedRow {
  selector: string;
  fontFamily: string;
  fontSize: string;
  bold: string;
  italic: string;
  color: string;
}

function parseCssFile(filePath: string): ParsedRow[] {
  const fullPath = path.join(ROOT, filePath);
  let content: string;
  try {
    content = fs.readFileSync(fullPath, 'utf8');
  } catch {
    return [];
  }
  content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  const rows: ParsedRow[] = [];
  const blockRe = /([^{]+)\{([^}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(content)) !== null) {
    const selector = m[1].replace(/\s+/g, ' ').trim();
    const body = m[2];
    if (!selector || selector.startsWith('}') || selector.includes('@')) continue;
    if (!/font-(family|size|weight|style)|color\s*:/.test(body)) continue;
    const getProp = (name: string): string => {
      const re = new RegExp(`${name}\\s*:\\s*([^;]+)`, 'i');
      const r = body.match(re);
      return r ? r[1].trim() : '';
    };
    const fontFamily = getProp('font-family').trim() || '';
    const fontSize = getProp('font-size') || '';
    const fontWeight = getProp('font-weight');
    const bold = /^([67]00|bold)$/i.test(fontWeight) ? 'oui' : 'non';
    const fontStyle = getProp('font-style');
    const italic = /italic/i.test(fontStyle) ? 'oui' : 'non';
    const color = getProp('color') || '';
    if (fontFamily || fontSize || fontWeight || fontStyle || color) {
      rows.push({ selector, fontFamily, fontSize, bold, italic, color });
    }
  }
  return rows;
}

function main() {
  const files = findCssFiles();
  const header = 'Chemin vers le fichier CSS\tNom du style\tTypeDeContenu\tComposant\tNiveau de titre\tType standard HTML\tNom de la police de caractère\tTaille de la police de caractère\tGras : oui / non\tItalique : oui / non\tCouleur';
  const lines: string[] = [header];
  for (const file of files.sort()) {
    const rows = parseCssFile(file);
    for (const r of rows) {
      const { typeDeContenu, composant } = getTypeDeContenuEtComposant(file, r.selector);
      const niveauTitre = getNiveauTitre(r.selector);
      const typeStandardHtml = getTypeStandardHtml(r.selector);
      lines.push([file, r.selector, typeDeContenu, composant, niveauTitre, typeStandardHtml, r.fontFamily, r.fontSize, r.bold, r.italic, r.color].join('\t'));
    }
  }
  const outPath = path.join(ROOT, 'styles-texte.txt');
  const out = lines.join('\r\n');
  fs.writeFileSync(outPath, out, { encoding: 'utf8' });
  console.log('Écrit:', outPath, '(', lines.length - 1, 'lignes de styles)');
}

main();
