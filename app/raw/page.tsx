/**
 * Page /raw : même contenu que le mode lecture (pages JSON) mais rendu en HTML sémantique
 * sans aucune feuille de style. Utilise uniquement le layout racine (pas de Header, Footer, ni CSS).
 * Pour voir comment le navigateur affiche le DOM sans style.
 */

import { readPageData } from '../../utils/server';
import type { ElementContenu, ElementListeDesPages } from '../../utils/client';
import PageContentRenderer from '../../components/PageContentRenderer';

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

function getPageTitle(contenu: ElementContenu[]): string {
  const titreDePage = contenu.find((el) => el.type === 'titreDePage');
  if (titreDePage && 'texte' in titreDePage) return titreDePage.texte as string;
  const titre = contenu.find((el) => el.type === 'titre');
  if (titre && 'texte' in titre) return titre.texte as string;
  const hero = contenu.find((el) => el.type === 'hero');
  if (hero && 'titre' in hero) return hero.titre as string;
  return 'Page';
}

export default function RawPage() {
  const pages: { pageTitle: string; contenu: ElementContenu[] }[] = [];

  for (const filename of ORDRE_JSON) {
    try {
      const pageData = readPageData(filename);
      if (pageData?.contenu?.length) {
        const pageTitle = getPageTitle(pageData.contenu);
        pages.push({ pageTitle, contenu: pageData.contenu });
      }
    } catch {
      // Fichier absent ou erreur : on ignorer
    }
  }

  return (
    <main>
      <h1>Raw — DOM sans feuille de style</h1>
      <p>Contenu des pages en HTML sémantique uniquement (aucune CSS chargée).</p>
      {pages.map((page, pageIndex) => {
        const listeDesPagesEl = page.contenu.find((el) => el.type === 'listeDesPages') as ElementListeDesPages | undefined;
        const listeDesPagesInitial =
          listeDesPagesEl?.pages && listeDesPagesEl.pages.length > 0 ? listeDesPagesEl.pages : undefined;
        const hero = page.contenu.find((el) => el.type === 'hero') as { titre?: string } | undefined;
        const titreRedondant = hero?.titre && hero.titre === page.pageTitle;
        return (
          <section key={pageIndex} aria-label={page.pageTitle}>
            {!titreRedondant && <h2>{page.pageTitle}</h2>}
            <PageContentRenderer contenu={page.contenu} listeDesPagesInitial={listeDesPagesInitial} />
          </section>
        );
      })}
    </main>
  );
}
