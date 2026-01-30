import { readPageData } from '../utils/indexReader';
import type { ElementHero, ElementVideo } from '../utils/indexReader';
import PageContentRenderer from '../components/PageContentRenderer';
import HeroSection from '../components/HeroSection';

/**
 * Page d'accueil
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page.
 * US-7.11 : bloc hero (gauche texte + CTAs, droite vidéo) ; pas de texteLarge sur la home.
 */
export default function HomePage() {
  const pageData = readPageData('index.json');
  const contenu = pageData.contenu;

  const hero = contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
  const video = contenu.find((el) => el.type === 'video') as ElementVideo | undefined;

  const contenuSansHeroVideoTexteLarge = contenu.filter(
    (el) => el.type !== 'hero' && el.type !== 'video' && el.type !== 'texteLarge'
  );

  return (
    <main className="main home">
      {hero && video ? (
        <>
          <HeroSection element={hero} video={video} showProfils={false} />
          <PageContentRenderer contenu={contenuSansHeroVideoTexteLarge} />
        </>
      ) : (
        <PageContentRenderer contenu={contenu} />
      )}
    </main>
  );
}
