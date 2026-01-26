import { notFound } from 'next/navigation';
import styles from '../../shared.module.css';
import { readPageData } from '../../../utils/indexReader';
import PageContentRenderer from '../../../components/PageContentRenderer';

/**
 * Page de profil dynamique
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 * 
 * Routes supportées :
 * - /profil/cpo -> profil-cpo.json
 * - /profil/coo -> profil-coo.json
 * - /profil/agile -> profil-agile.json
 * - /profil/cto -> profil-cto.json
 */
export default async function ProfilPage({ params }: { params: Promise<{ slug: string }> }) {
  // Déballer params (Next.js 15+ : params est une Promise)
  const { slug } = await params;
  
  // Valider le slug
  const validSlugs = ['cpo', 'coo', 'agile', 'cto'];
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  // Construire le nom du fichier JSON
  const filename = `profil-${slug}.json`;

  try {
    // Appel côté serveur : le backend pur lit le fichier JSON
    const pageData = readPageData(filename);

    // Debug : vérifier que les données sont bien chargées
    if (!pageData || !pageData.contenu || pageData.contenu.length === 0) {
      console.error(`Page data vide pour ${filename}:`, pageData);
      notFound();
    }


    return (
      <main className={styles.main}>
        {/* Affichage de tous les éléments de contenu */}
        <PageContentRenderer contenu={pageData.contenu} />
      </main>
    );
  } catch (error) {
    // Si le fichier n'existe pas ou erreur de lecture, retourner 404
    console.error(`Erreur lors de la lecture de ${filename}:`, error);
    notFound();
  }
}
