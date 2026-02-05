import { readPageData, buildPageMetadata } from '../../utils/server';
import type { ElementHero } from '../../utils/client';
import PageContentRenderer from '../../components/PageContentRenderer';
import HeroSection from '../../components/HeroSection';

export const metadata = buildPageMetadata('index.json', '/');

/**
 * Page d'accueil
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page.
 * US-7.11 : bloc hero (gauche texte + CTAs, droite vidéo via hero.video) ; pas de texteLarge sur la home.
 */
export default function HomePage() {
  const pageData = readPageData('index.json');
  const contenu = pageData.contenu;

  const hero = contenu.find((el) => el.type === 'hero') as ElementHero | undefined;

  const contenuSansHeroTexteLarge = contenu.filter(
    (el) => el.type !== 'hero' && el.type !== 'texteLarge'
  );

  return (
    <main className="main home">
      {hero ? (
        <>
          <HeroSection element={hero} />
          <PageContentRenderer contenu={contenuSansHeroTexteLarge} isHomePage />
        </>
      ) : (
        <PageContentRenderer contenu={contenu} isHomePage />
      )}
    </main>
  );
}
