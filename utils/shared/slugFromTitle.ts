/**
 * Génère un identifiant HTML (slug) à partir d'un titre, pour ancres et sommaire.
 * Utilisé pour : id sur les titres (h3, h4, h5) et href="#..." dans le sommaire.
 * Règles : minuscules, espaces/ponctuation → tiret, accents normalisés.
 */
export function titreToAnchorId(titre: string): string {
  if (!titre || typeof titre !== 'string') return '';
  return titre
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
