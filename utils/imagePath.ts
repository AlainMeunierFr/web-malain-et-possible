/**
 * Utilitaires pour construire les chemins d'images selon leur type
 * Types supportés : json, md, static
 */

/**
 * Construit le chemin API pour une image JSON
 * @param filename Nom du fichier image (ex: "Logo.png")
 * @returns Chemin API complet (ex: "/api/images/json/Logo.png")
 */
export function getJsonImagePath(filename: string): string {
  // Si le chemin est déjà complet, le retourner tel quel (compatibilité)
  if (filename.startsWith('/api/images/')) {
    return filename;
  }
  // Sinon, construire le chemin avec le type json
  return `/api/images/json/${encodeURIComponent(filename)}`;
}

/**
 * Construit le chemin API pour une image Markdown
 * @param filename Nom du fichier image (ex: "2026-01-24 Capture 1.jpg")
 * @returns Chemin API complet (ex: "/api/images/md/2026-01-24%20Capture%201.jpg")
 */
export function getMdImagePath(filename: string): string {
  // Si le chemin est déjà complet, le retourner tel quel (compatibilité)
  if (filename.startsWith('/api/images/')) {
    return filename;
  }
  // Sinon, construire le chemin avec le type md
  return `/api/images/md/${encodeURIComponent(filename)}`;
}

/**
 * Construit le chemin API pour une image statique (header, etc.)
 * @param filename Nom du fichier image (ex: "Logo.png")
 * @returns Chemin API complet (ex: "/api/images/static/Logo.png")
 */
export function getStaticImagePath(filename: string): string {
  // Si le chemin est déjà complet, le retourner tel quel (compatibilité)
  if (filename.startsWith('/api/images/')) {
    return filename;
  }
  // Sinon, construire le chemin avec le type static
  return `/api/images/static/${encodeURIComponent(filename)}`;
}
