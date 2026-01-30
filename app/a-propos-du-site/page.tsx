import { readMenu } from '../../utils/menuReader';
import SprintDashboardLayout from '../../components/SprintDashboardLayout';
import styles from './about.module.css';

/**
 * Page « A propos de ce site » en tableau de bord (US-11.3)
 * - Bande horizontale pilotée par menu.json (lignes de menu : Titre, Numéro, Type, Parametre)
 * - Type Path : lien vers /a-propos-du-site/[parametre] (parametre = chemin encodé)
 * - Type container : lien vers la même page (zone sous la bande)
 * - Layout : menu à gauche, Sprint Goal à droite (même ligne) ; board en dessous (US-11.5)
 */
export default function AboutSitePage() {
  const lignes = readMenu();

  return (
    <main className={styles.main}>
      <SprintDashboardLayout lignes={lignes} />
    </main>
  );
}
