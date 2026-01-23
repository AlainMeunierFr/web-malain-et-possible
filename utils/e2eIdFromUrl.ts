/**
 * Backend pur : Génération d'e2eID déterministe basé sur une URL
 * Utilisé pour les liens du plan du site
 */

/**
 * Génère un e2eID déterministe basé sur l'URL d'une page
 * Format: l{numero} où numero est calculé à partir d'un hash de l'URL
 * 
 * @param url URL de la page (ex: '/portfolio-detournements', '/')
 * @returns e2eID (ex: 'l696', 'l104')
 */
export function generateE2eIdFromUrl(url: string): string {
  // Normaliser l'URL : enlever le slash initial et remplacer les caractères spéciaux
  const normalized = url.replace(/^\//, '').replace(/[^a-z0-9]/gi, '-').toLowerCase();
  // Si l'URL est vide (accueil), utiliser "home"
  const urlKey = normalized || 'home';
  
  // Générer un hash simple et déterministe
  const hash = urlKey.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  // Utiliser un numéro basé sur l'URL pour rester déterministe
  // Format: l{numero} où numero est basé sur l'URL
  const num = Math.abs(hash) % 1000; // Limiter à 3 chiffres
  return `l${num}`;
}
