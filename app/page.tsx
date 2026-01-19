import styles from './shared.module.css';
import { readPageData } from '../utils/indexReader';
import PageContentRenderer from '../components/PageContentRenderer';

/**
 * Page d'accueil
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function HomePage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const pageData = readPageData('index.json');

  return (
    <main className={styles.main}>
      {/* Affichage de tous les éléments de contenu */}
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
