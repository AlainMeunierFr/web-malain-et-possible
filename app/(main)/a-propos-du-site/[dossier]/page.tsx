import { notFound } from 'next/navigation';
import { readPathContentAtRoot } from '../../../../utils/server';
import AboutSiteContent from '../../../../components/AboutSiteContent';

/**
 * Page de visualisation d'un Path « A propos de ce site » (US-11.3, US-11.4)
 * Le menu est géré par le layout partagé.
 */
interface PageProps {
  params: Promise<{ dossier: string }>;
}

export default async function AboutSiteDossierPage({ params }: PageProps) {
  const { dossier: parametreEncoded } = await params;
  const parametre = decodeURIComponent(parametreEncoded);

  const pathContent = readPathContentAtRoot(parametre);
  if (!pathContent) {
    notFound();
  }

  return (
    <div className="content">
      <AboutSiteContent pathContent={pathContent} embedded />
    </div>
  );
}
