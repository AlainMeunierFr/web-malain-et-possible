import { readMenu } from '../../../utils/menuReader';
import SprintDashboardLayout from '../../../components/SprintDashboardLayout';

/**
 * Page « A propos de ce site » en tableau de bord (US-11.3)
 */
export default function AboutSitePage() {
  const lignes = readMenu();

  return (
    <main className="main">
      <SprintDashboardLayout lignes={lignes} />
    </main>
  );
}
