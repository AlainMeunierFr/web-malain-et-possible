import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readPageData } from '../../../../utils/indexReader';
import { buildProfilMetadata } from '../../../../utils/metadataBuilder';
import PageContentRenderer from '../../../../components/PageContentRenderer';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const validSlugs = ['cpo', 'coo', 'agile', 'cto'];
  
  if (!validSlugs.includes(slug)) {
    return { title: 'Profil introuvable' };
  }
  
  return buildProfilMetadata(slug);
}

/**
 * Page de profil dynamique
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 *
 * Routes supportées :
 * - /profil/cpo -> profil-cpo.json
 * - /profil/coo -> profil-coo.json
 * - /profil/agile -> profil-agile.json
 * - /profil/cto -> profil-cto.json
 */
export default async function ProfilPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const validSlugs = ['cpo', 'coo', 'agile', 'cto'];
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const filename = `profil-${slug}.json`;

  try {
    const pageData = readPageData(filename);

    if (!pageData || !pageData.contenu || pageData.contenu.length === 0) {
      console.error(`Page data vide pour ${filename}:`, pageData);
      notFound();
    }

    return (
      <main className="main">
        <PageContentRenderer contenu={pageData.contenu} />
      </main>
    );
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${filename}:`, error);
    notFound();
  }
}
