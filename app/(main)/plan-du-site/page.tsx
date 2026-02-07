import { readPageData, buildPageMetadata } from '../../../utils/server';
import type { ElementListeDesPages } from '../../../utils/client';
import PageContentRenderer from '../../../components/PageContentRenderer';

export const metadata = buildPageMetadata('plan-du-site.json', '/plan-du-site');

/**
 * Page "Plan du site"
 * Server Component : rendu pur JSON (plan-du-site.json). La liste des pages vient du JSON (remplie par le script update-site-map).
 */
export default function PlanDuSitePage() {
  const pageData = readPageData('plan-du-site.json');
  const listeDesPagesEl = pageData.contenu.find((el) => el.type === 'listeDesPages') as ElementListeDesPages | undefined;
  const listeDesPagesInitial =
    listeDesPagesEl?.pages && listeDesPagesEl.pages.length > 0 ? listeDesPagesEl.pages : undefined;

  return (
    <main className="main-cont">
      <PageContentRenderer contenu={pageData.contenu} listeDesPagesInitial={listeDesPagesInitial} />
    </main>
  );
}
