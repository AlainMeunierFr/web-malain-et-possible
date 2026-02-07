/**
 * Mode lecture : page dédiée pour vérifier sémantique et hiérarchie.
 * Affiche les pages (JSON) dans un ordre configurable, empilement vertical,
 * padding +20px par niveau, labels type HTML · nom canonique · container.
 * Feuille de style dédiée : mode-lecture.css (pas de modification de content-styles.css).
 */

import { readPageData } from '../../../utils/server';
import type { ElementContenu } from '../../../utils/client';
import ModeLectureRenderer from '../../../components/ModeLectureRenderer';

/** Page du plan du site (pour liste des pages en mode lecture). */
export interface SiteMapPageItem {
  url: string;
  titre: string;
}

/** Ordre des JSON à afficher. Plan du site (sommaire) en premier. */
const ORDRE_JSON: string[] = [
  'plan-du-site.json',
  'index.json',
  'mes-profils.json',
  'profil-cpo.json',
  'profil-coo.json',
  'profil-agile.json',
  'profil-cto.json',
  'faisons-connaissance.json',
  'portfolio-detournements.json',
  'detournement-video.json',
  'pour-aller-plus-loin.json',
];

/** Associe un fichier JSON à l'URL de la page (aligné sur le plan du site). */
function filenameToUrl(filename: string): string {
  if (filename === 'index.json') return '/';
  const base = filename.replace('.json', '');
  if (base.startsWith('profil-')) return '/profil/' + base.replace('profil-', '');
  return '/' + base;
}

function getPageTitle(contenu: ElementContenu[], filename: string): string {
  const titreDePage = contenu.find((el) => el.type === 'titreDePage');
  if (titreDePage && 'texte' in titreDePage) return titreDePage.texte as string;
  const titre = contenu.find((el) => el.type === 'titre');
  if (titre && 'texte' in titre) return titre.texte as string;
  const hero = contenu.find((el) => el.type === 'hero');
  if (hero && 'titre' in hero) return hero.titre as string;
  return filename.replace('.json', '');
}

export default function ModeLecturePage() {
  const pages: { pageTitle: string; contenu: ElementContenu[] }[] = [];
  const siteMapPages: SiteMapPageItem[] = [];

  for (const filename of ORDRE_JSON) {
    try {
      const pageData = readPageData(filename);
      if (pageData?.contenu?.length) {
        const pageTitle = getPageTitle(pageData.contenu, filename);
        pages.push({ pageTitle, contenu: pageData.contenu });
        siteMapPages.push({ url: filenameToUrl(filename), titre: pageTitle });
      }
    } catch {
      // Fichier absent ou erreur : on ignore cette entrée
    }
  }

  return (
    <main className="main-cont">
      <ModeLectureRenderer pages={pages} siteMapPages={siteMapPages} />
    </main>
  );
}
