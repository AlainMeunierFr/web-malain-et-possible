import { readPageData } from '../../../utils/indexReader';
import { buildPageMetadata } from '../../../utils/metadataBuilder';
import PageContentRenderer from '../../../components/PageContentRenderer';

export const metadata = buildPageMetadata('portfolio-detournements.json', '/portfolio-detournements');

/**
 * Page "Portfolio détournements"
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function PortfolioDetournementsPage() {
  const pageData = readPageData('portfolio-detournements.json');

  const detournementsElement = pageData.contenu.find((el) => {
    const elAny = el as unknown as Record<string, unknown>;
    return Array.isArray(elAny.detournementVideo);
  }) as { detournementVideo: unknown[] } | undefined;
  const detournements = detournementsElement?.detournementVideo ?? [];

  const titre = pageData.contenu.find(el => el.type === 'titre');
  const callToAction = pageData.contenu.find(el => el.type === 'callToAction');

  const contenu = [
    titre!,
    {
      type: 'listeDeDetournementsVideo' as const,
      items: (detournements as any[]).map((d: any) =>
        d.type != null ? d : { type: 'detournementVideo' as const, ...d }
      ),
    },
    callToAction!,
  ].filter(Boolean) as any;

  return (
    <main className="main">
      <PageContentRenderer contenu={contenu} />
    </main>
  );
}
