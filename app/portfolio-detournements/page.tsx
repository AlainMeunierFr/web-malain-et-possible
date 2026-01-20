import styles from '../shared.module.css';
import { readPageData, readDetournementsVideo } from '../../utils/indexReader';
import PageContentRenderer from '../../components/PageContentRenderer';

/**
 * Page "Portfolio détournements"
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function PortfolioDetournementsPage() {
  // Appel côté serveur : le backend pur lit les fichiers JSON
  const pageData = readPageData('portfolio-detournements.json');
  const detournements = readDetournementsVideo();
  
  // Ajouter les détournements au contenu (avant le CallToAction)
  // Le contenu actuel contient : [titre, callToAction]
  // On veut : [titre, videoDetournement, callToAction]
  const titre = pageData.contenu.find(el => el.type === 'titre');
  const callToAction = pageData.contenu.find(el => el.type === 'callToAction');
  
  const contenu = [
    titre!,
    {
      type: 'videoDetournement' as const,
      items: detournements,
    },
    callToAction!,
  ].filter(Boolean);

  return (
    <main className={styles.main}>
      {/* Affichage de tous les éléments de contenu */}
      <PageContentRenderer contenu={contenu} />
    </main>
  );
}
