import { readPageData, buildPageMetadata } from '../../../utils/server';
import PageContentRenderer from '../../../components/PageContentRenderer';

export const metadata = buildPageMetadata('portfolio-detournements.json', '/portfolio-detournements');

/**
 * Page "Portfolio détournements"
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function PortfolioDetournementsPage() {
  const pageData = readPageData('portfolio-detournements.json');

  return (
    <main className="main-cont">
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
