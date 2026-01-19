import { readAboutSiteStructure } from '../../utils/aboutSiteReader';
import AboutSiteContent from '../../components/AboutSiteContent';

/**
 * Page "À propos du site"
 * Server Component : Appelle le backend pur pour générer le HTML complet
 * 
 * Architecture pédagogique :
 * - Backend pur (utils/aboutSiteReader.ts) : génère du JSON
 * - Backend Next.js (ce fichier) : appelle le backend pur et génère le HTML
 * - Client Component (AboutSiteContent) : reçoit les données via props et gère les interactions
 * 
 * Avantages :
 * - SEO optimal : HTML complet dans la réponse HTTP
 * - Performance : pas de fetch côté client
 * - Pas de problème d'hydratation : données identiques serveur/client
 */
export default function AboutSitePage() {
  try {
    // Appel côté serveur : le backend pur génère le JSON
    const structure = readAboutSiteStructure();
    
    // Passage des données au Client Component via props
    return <AboutSiteContent structure={structure} />;
  } catch (error) {
    // En cas d'erreur de validation, faire échouer le build explicitement
    if (error instanceof Error && error.name === 'ValidationError') {
      // Next.js fait échouer le build si on throw une erreur dans un Server Component
      throw error;
    }
    // Pour les autres erreurs, les propager aussi
    throw error;
  }
}
