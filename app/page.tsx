import styles from './shared.module.css';
import { readIndexData } from '../utils/indexReader';
import DomaineDeCompetences from '../components/DomaineDeCompetences';

/**
 * Page d'accueil
 * Server Component : Charge le JSON depuis le backend pur et affiche les Domaines de compétences
 */
export default function HomePage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const indexData = readIndexData();
  const domaines = indexData.domainesDeCompetences;

  return (
    <main className={styles.main}>
      <h1>Home page</h1>
      
      {/* Affichage de tous les Domaines de compétences */}
      {domaines.map((domaine, index) => (
        <DomaineDeCompetences key={index} domaine={domaine} />
      ))}
    </main>
  );
}
