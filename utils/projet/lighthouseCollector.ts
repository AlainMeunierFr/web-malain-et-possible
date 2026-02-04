/**
 * Collecteur de scores Lighthouse via l'API PageSpeed Insights (US-12.7)
 * 
 * Fonctionnalités :
 * - Exécution conditionnelle (>7 jours depuis le dernier run)
 * - Collecte des 4 scores : Performance, Accessibilité, Bonnes pratiques, SEO
 * - Fallback gracieux en cas d'échec (scores = NC)
 */

/**
 * Scores Lighthouse pour les 4 catégories
 */
export interface LighthouseScores {
  performance: number | 'NC';
  accessibility: number | 'NC';
  bestPractices: number | 'NC';
  seo: number | 'NC';
}

/**
 * Résultat de la collecte Lighthouse
 */
export interface LighthouseResult {
  scores: LighthouseScores;
  lastRun: string; // ISO 8601
  skipped: boolean;
}

/**
 * URL de production à analyser
 */
export const PROD_URL = 'https://www.malain-et-possible.fr';

/**
 * Délai minimum entre deux exécutions (7 jours en ms)
 */
export const MIN_DELAY_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Scores NC par défaut (Non Calculé)
 */
const NC_SCORES: LighthouseScores = {
  performance: 'NC',
  accessibility: 'NC',
  bestPractices: 'NC',
  seo: 'NC',
};

/**
 * Vérifie si Lighthouse doit s'exécuter (>= 7 jours depuis lastRun)
 * @param lastRun - Date ISO 8601 du dernier run, ou undefined si première exécution
 * @returns true si Lighthouse doit s'exécuter
 */
export function shouldRunLighthouse(lastRun: string | undefined): boolean {
  // Première exécution ou chaîne vide
  if (!lastRun) {
    return true;
  }

  // Vérifier si la date est valide
  const lastRunDate = new Date(lastRun);
  if (isNaN(lastRunDate.getTime())) {
    return true; // Date invalide = première exécution
  }

  const now = new Date();
  const elapsedMs = now.getTime() - lastRunDate.getTime();

  return elapsedMs >= MIN_DELAY_MS;
}

/**
 * Calcule le nombre de jours depuis la dernière exécution
 */
function getDaysSinceLastRun(lastRun: string): number {
  const lastRunDate = new Date(lastRun);
  const now = new Date();
  const elapsedMs = now.getTime() - lastRunDate.getTime();
  return Math.floor(elapsedMs / (24 * 60 * 60 * 1000));
}

/**
 * Extrait un score depuis la réponse de l'API et le convertit en pourcentage (0-100)
 */
function extractScore(
  categories: Record<string, { score?: number | null }> | undefined,
  categoryKey: string
): number | 'NC' {
  if (!categories) {
    return 'NC';
  }

  const category = categories[categoryKey];
  if (!category || category.score === null || category.score === undefined) {
    return 'NC';
  }

  // L'API retourne un score entre 0 et 1, on le convertit en 0-100
  return Math.round(category.score * 100);
}

/**
 * Appelle l'API PageSpeed Insights et retourne les scores
 * @param url - URL à analyser (défaut: URL de production)
 * @returns Scores Lighthouse pour les 4 catégories
 */
export async function fetchLighthouseScores(
  url: string = PROD_URL
): Promise<LighthouseScores> {
  const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  apiUrl.searchParams.set('url', url);
  apiUrl.searchParams.append('category', 'performance');
  apiUrl.searchParams.append('category', 'accessibility');
  apiUrl.searchParams.append('category', 'best-practices');
  apiUrl.searchParams.append('category', 'seo');

  try {
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      console.warn(
        `PageSpeed Insights API error: ${response.status} ${response.statusText}`
      );
      return NC_SCORES;
    }

    const data = await response.json();
    const categories = data?.lighthouseResult?.categories;

    return {
      performance: extractScore(categories, 'performance'),
      accessibility: extractScore(categories, 'accessibility'),
      bestPractices: extractScore(categories, 'best-practices'),
      seo: extractScore(categories, 'seo'),
    };
  } catch (error) {
    console.warn('Lighthouse fetch failed:', error);
    return NC_SCORES;
  }
}

/**
 * Collecte les scores Lighthouse avec condition d'exécution
 * @param lastRun - Date ISO 8601 du dernier run, ou undefined si première exécution
 * @param existingScores - Scores existants à conserver si on skip
 * @returns Résultat de la collecte
 */
export async function collectLighthouseScores(
  lastRun: string | undefined,
  existingScores?: LighthouseScores
): Promise<LighthouseResult> {
  const shouldRun = shouldRunLighthouse(lastRun);

  if (!shouldRun) {
    // Skip : conserver les scores existants
    const daysSince = lastRun ? getDaysSinceLastRun(lastRun) : 0;
    console.log(`Lighthouse skipped: last run ${daysSince} days ago`);

    return {
      scores: existingScores || NC_SCORES,
      lastRun: lastRun || '',
      skipped: true,
    };
  }

  // Exécution de Lighthouse
  if (!lastRun) {
    console.log('Lighthouse running: first execution');
  } else {
    const daysSince = getDaysSinceLastRun(lastRun);
    console.log(`Lighthouse running: last run ${daysSince} days ago`);
  }

  const scores = await fetchLighthouseScores();
  const now = new Date().toISOString();

  return {
    scores,
    lastRun: now,
    skipped: false,
  };
}
