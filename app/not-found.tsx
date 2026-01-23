/**
 * Page 404 personnalisée
 * Désactive le prerendering pour éviter les erreurs lors du build
 */
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
    </div>
  );
}
