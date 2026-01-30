import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readPathContentAtRoot } from '../../../utils/aboutSiteReader';
import { readMenu } from '../../../utils/menuReader';
import AboutSiteContent from '../../../components/AboutSiteContent';
import styles from '../about.module.css';

/**
 * Page de visualisation d'un Path « A propos de ce site » (US-11.3, US-11.4)
 * Paramètre = Parametre du menu (chemin relatif, ex. data/A propos de ce site/A propos du projet).
 * Bande = lignes de menu (menu.json) ; contenu = readPathContentAtRoot (fichiers H1 + dossiers H1 accordéon).
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
    <main className={styles.main}>
      <nav
        className={styles.bandeDossiers}
        data-testid="bande-dossiers"
        aria-label="Lignes de menu"
      >
        <ul className={styles.bandeDossiersList}>
          {lignes.map((ligne) => (
            <li key={`${ligne.Numéro}-${ligne.Titre}`} className={styles.bandeDossiersItem}>
              {ligne.Type === 'Path' ? (
                <Link
                  href={`/a-propos-du-site/${encodeURIComponent(ligne.Parametre)}`}
                  className={ligne.Parametre === parametre ? styles.bandeDossiersLinkActive : styles.bandeDossiersLink}
                  e2eid={`e2eid-menu-${ligne.Titre.replace(/\s/g, '-')}`}
                >
                  {ligne.Titre}
                </Link>
              ) : (
                <Link
                  href="/a-propos-du-site"
                  className={styles.bandeDossiersLink}
                  e2eid={`e2eid-menu-${ligne.Titre.replace(/\s/g, '-')}`}
                >
                  {ligne.Titre}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.content}>
        <AboutSiteContent pathContent={pathContent} embedded />
      </div>
    </main>
  );
}
