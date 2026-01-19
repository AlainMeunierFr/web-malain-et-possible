import styles from '../shared.module.css';
import { readDomaineData } from '../../utils/indexReader';
import DomaineDeCompetences from '../../components/DomaineDeCompetences';

/**
 * Page "Robustesse"
 * Server Component : Charge le JSON depuis le backend pur et affiche les Domaines de compétences
 */
export default function RobustessePage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const domaineData = readDomaineData('Robustesse.json');
  const domaines = domaineData.domainesDeCompetences;

  return (
    <main className={styles.main}>
      <h1>Robustesse</h1>
      
      {/* Affichage de tous les Domaines de compétences */}
      {domaines.map((domaine, index) => (
        <DomaineDeCompetences key={index} domaine={domaine} />
      ))}
    </main>
  );
}
