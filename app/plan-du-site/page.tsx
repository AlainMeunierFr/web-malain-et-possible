import { readPageData } from '../../utils/indexReader';
import PageContentRenderer from '../../components/PageContentRenderer';

/**
 * Page "Plan du site"
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function PlanDuSitePage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const pageData = readPageData('plan-du-site.json');

  return (
    <main className="main">
      {/* Affichage de tous les éléments de contenu */}
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
