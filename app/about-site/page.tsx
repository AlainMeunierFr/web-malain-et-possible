import { readAboutSiteStructure } from '../../utils/aboutSiteReader';
import AboutSiteContent from '../../components/AboutSiteContent';

/**
 * Page "À propos du site"
 * Server Component : Appelle la fonction backend pur pour obtenir le JSON
 * Passe les données au composant client pour l'affichage avec accordion
 */
export default function AboutSitePage() {
  // Server Component : Appelle la fonction backend pur pour obtenir le JSON
  const structure = readAboutSiteStructure();

  return <AboutSiteContent structure={structure} />;
}
