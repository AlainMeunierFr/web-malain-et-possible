import { readPageData, buildPageMetadata } from '../../../utils/server';
import PageContentRenderer from '../../../components/PageContentRenderer';

export const metadata = buildPageMetadata('pour-aller-plus-loin.json', '/pour-aller-plus-loin');

/**
 * Page "Pour aller plus loin"
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function PourAllerPlusLoinPage() {
  const pageData = readPageData('pour-aller-plus-loin.json');

  return (
    <main className="main">
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
