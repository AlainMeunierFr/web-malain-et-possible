import styles from '../shared.module.css';
import { readPageData } from '../../utils/indexReader';
import PageContentRenderer from '../../components/PageContentRenderer';

export default function FaisonsConnaissancePage() {
  const pageData = readPageData('faisons-connaissance.json');

  return (
    <main className={styles.main}>
      <PageContentRenderer contenu={pageData.contenu} />
    </main>
  );
}
