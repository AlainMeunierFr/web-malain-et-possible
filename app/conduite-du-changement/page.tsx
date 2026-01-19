import styles from '../shared.module.css';
import { readPageData } from '../../utils/indexReader';
import PageContentRenderer from '../../components/PageContentRenderer';

/**
 * Page "Conduite du changement"
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function ConduiteDuChangementPage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const pageData = readPageData('Conduite du changement.json');

  return (
    <main className={styles.main}>
      {/* Affichage de tous les éléments de contenu */}
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
