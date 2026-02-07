import { readPageData, buildPageMetadata } from '../../../utils/server';
import PageContentRenderer from '../../../components/PageContentRenderer';

export const metadata = buildPageMetadata('faisons-connaissance.json', '/faisons-connaissance');

export default function FaisonsConnaissancePage() {
  const pageData = readPageData('faisons-connaissance.json');

  return (
    <main className="main-cont">
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
