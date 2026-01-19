import styles from '../shared.module.css';
import { readDomaineData } from '../../utils/indexReader';
import DomaineDeCompetences from '../../components/DomaineDeCompetences';

/**
 * Page "Détournement vidéo"
 * Server Component : Charge le JSON depuis le backend pur et affiche les Domaines de compétences
 */
export default function DetournementVideoPage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const domaineData = readDomaineData('Détournement vidéo.json');
  const domaines = domaineData.domainesDeCompetences;

  return (
    <main className={styles.main}>
      <h1>Détournement vidéo</h1>
      
      {/* Affichage de tous les Domaines de compétences */}
      {domaines.map((domaine, index) => (
        <DomaineDeCompetences key={index} domaine={domaine} />
      ))}
    </main>
  );
}
