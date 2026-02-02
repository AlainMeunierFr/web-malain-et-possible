import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readPathContentAtRoot } from '../../../../utils/aboutSiteReader';
import { readMenu } from '../../../../utils/menuReader';
import AboutSiteContent from '../../../../components/AboutSiteContent';

/**
 * Page de visualisation d'un Path « A propos de ce site » (US-11.3, US-11.4)
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

  const lignes = readMenu();

  return (
    <main className="main">
      <nav
        className="bandeDossiers"
        data-testid="bande-dossiers"
        aria-label="Lignes de menu"
      >
        <ul className="liste">
          {lignes.map((ligne) => (
            <li key={`${ligne.Numéro}-${ligne.Titre}`} className="item">
              {ligne.Type === 'Path' ? (
                <Link
                  href={`/a-propos-du-site/${encodeURIComponent(ligne.Parametre)}`}
                  className={ligne.Parametre === parametre ? 'lienActif' : 'lien'}
                  e2eid={`e2eid-menu-${ligne.Titre.replace(/\s/g, '-')}`}
                >
                  {ligne.Titre}
                </Link>
              ) : (
                <Link
                  href="/a-propos-du-site"
                  className="lien"
                  e2eid={`e2eid-menu-${ligne.Titre.replace(/\s/g, '-')}`}
                >
                  {ligne.Titre}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="content">
        <AboutSiteContent pathContent={pathContent} embedded />
      </div>
    </main>
  );
}
