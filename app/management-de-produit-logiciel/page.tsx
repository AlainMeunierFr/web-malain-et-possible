import styles from '../shared.module.css';
import { readPageData } from '../../utils/indexReader';
import PageContentRenderer from '../../components/PageContentRenderer';

/**
 * Page "Management de produit logiciel"
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 */
export default function ManagementDeProduitLogicielPage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const pageData = readPageData('management-de-produit-logiciel.json');

  return (
    <main className={styles.main}>
      {/* Affichage de tous les éléments de contenu */}
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
