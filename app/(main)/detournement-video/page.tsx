import { readPageData } from '../../../utils/indexReader';
import { buildPageMetadata } from '../../../utils/metadataBuilder';
import PageContentRenderer from '../../../components/PageContentRenderer';

export const metadata = buildPageMetadata('detournement-video.json', '/detournement-video');

/**
 * Page "Détournement vidéo"
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function DetournementVideoPage() {
  const pageData = readPageData('detournement-video.json');

  return (
    <main className="main">
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
