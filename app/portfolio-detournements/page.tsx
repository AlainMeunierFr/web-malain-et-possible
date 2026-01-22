import styles from '../shared.module.css';
import { readPageData } from '../../utils/indexReader';
import PageContentRenderer from '../../components/PageContentRenderer';

/**
 * Page "Portfolio détournements"
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function PortfolioDetournementsPage() {
  // Appel côté serveur : le backend pur lit les fichiers JSON
  const pageData = readPageData('portfolio-detournements.json');
  
  // Extraire les détournements depuis le contenu JSON
  // Note: Le JSON contient des propriétés non typées ('détournement-original' et 'détournements')
  const detournementsElement = pageData.contenu.find((el) => {
    const elAny = el as any;
    return elAny['détournement-original'] || elAny['détournements'];
  }) as any;
  const detournements = detournementsElement?.['détournement-original'] || 
                        detournementsElement?.['détournements'] || 
                        [];
  
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
  ].filter(Boolean) as any;

  return (
    <main className={styles.main}>
      {/* Affichage de tous les éléments de contenu */}
      <PageContentRenderer contenu={contenu} />
    </main>
  );
}
