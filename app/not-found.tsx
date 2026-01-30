/**
 * Page 404 personnalisée
 * Désactive le prerendering pour éviter les erreurs lors du build
 */
import Link from 'next/link';
import { ROUTES } from '../constants/routes';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <main className="main">
      <div className="texteLarge">
        <h1 style={{ 
          fontFamily: 'var(--font-sans)', 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          color: 'var(--BleuFonce)', 
          textAlign: 'center', 
          marginBottom: '1rem',
          marginTop: '2rem'
        }}>
          404 - Page non trouvée
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <p style={{ textAlign: 'center', marginBottom: '0' }}>
          Vous pouvez retourner à la page d'accueil ou consulter le plan du site pour trouver ce que vous cherchez.
        </p>
      </div>
      
      <div className="groupeBoutons" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        alignItems: 'center',
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem 1rem'
      }}>
        <Link href={ROUTES.HOME} className="bouton" e2eid="404-accueil" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          Retour à l'accueil
        </Link>
        <Link href={ROUTES.SITEMAP} className="bouton" e2eid="404-plan-du-site" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          Voir le plan du site
        </Link>
      </div>
    </main>
  );
}
