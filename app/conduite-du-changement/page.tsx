import styles from '../shared.module.css';
import { readDomaineData } from '../../utils/indexReader';
import DomaineDeCompetences from '../../components/DomaineDeCompetences';

/**
 * Page "Conduite du changement"
 * Server Component : Charge le JSON depuis le backend pur et affiche les Domaines de compétences
 */
export default function ConduiteDuChangementPage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const domaineData = readDomaineData('Conduite du changement.json');
  const domaines = domaineData.domainesDeCompetences;

  return (
    <main className={styles.main}>
      {/* Affichage de tous les Domaines de compétences */}
      {domaines.map((domaine, index) => (
        <DomaineDeCompetences key={index} domaine={domaine} />
      ))}
    </main>
  );
}
