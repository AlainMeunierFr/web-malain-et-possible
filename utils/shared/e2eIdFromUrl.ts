/**
 * Backend pur : Génération d'e2eID déterministe basé sur une URL
 * Utilisé pour les liens du plan du site
 * 
 * IMPORTANT : Utilise 2 plages réservées pour éviter les conflits avec le système séquentiel
 * - Plage 1 : l600-l749 (150 numéros)
 * - Plage 2 : l800-l949 (150 numéros)
 * Total : 300 numéros réservés pour les liens du plan du site
 */

// Plages réservées pour les liens du plan du site (génération déterministe)
const PLAGE_1_MIN = 600;
const PLAGE_1_MAX = 749;
const PLAGE_2_MIN = 800;
const PLAGE_2_MAX = 949;
const PLAGE_1_SIZE = PLAGE_1_MAX - PLAGE_1_MIN + 1; // 150
const PLAGE_2_SIZE = PLAGE_2_MAX - PLAGE_2_MIN + 1; // 150
const TOTAL_PLAGES_SIZE = PLAGE_1_SIZE + PLAGE_2_SIZE; // 300

/**
 * Vérifie si un numéro est dans une plage réservée
 */
export function isInReservedRange(num: number): boolean {
  return (num >= PLAGE_1_MIN && num <= PLAGE_1_MAX) || 
         (num >= PLAGE_2_MIN && num <= PLAGE_2_MAX);
}

/**
 * Génère un e2eID déterministe basé sur l'URL d'une page
 * Utilise 2 plages réservées (l600-l749 et l800-l949) pour éviter les conflits
 * 
 * @param url URL de la page (ex: '/portfolio-detournements', '/')
 * @returns e2eID (ex: 'l756', 'l812')
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
  
  // Mapper le hash vers les 2 plages réservées
  // Utiliser modulo pour distribuer uniformément entre les 2 plages
  const hashMod = Math.abs(hash) % TOTAL_PLAGES_SIZE;
  
  let num: number;
  if (hashMod < PLAGE_1_SIZE) {
    // Plage 1 : l600-l749
    num = PLAGE_1_MIN + hashMod;
  } else {
    // Plage 2 : l800-l949
    num = PLAGE_2_MIN + (hashMod - PLAGE_1_SIZE);
  }
  
  return `l${num}`;
}
