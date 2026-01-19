import styles from './shared.module.css';
import { readIndexData } from '../utils/indexReader';
import DomaineDeCompetences from '../components/DomaineDeCompetences';

/**
 * Page d'accueil
 * Server Component : Charge le JSON depuis le backend pur et affiche le Domaine de compétences
 */
export default function HomePage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const indexData = readIndexData();
  const domaine = indexData.domaineDeCompetences;

  return (
    <main className={styles.main}>
      <h1>Home page</h1>
      
      {/* Affichage du Domaine de compétences */}
      <DomaineDeCompetences domaine={domaine} />
    </main>
  );
}
