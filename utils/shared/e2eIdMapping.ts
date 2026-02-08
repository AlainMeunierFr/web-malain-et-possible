/**
 * Mapping des e2eID pour les tests E2E.
 * Sépare les données métier (JSON purs) des identifiants de test.
 * 
 * Clé = identifiant déterministe basé sur le contexte (type:id:action)
 * Valeur = e2eID (lettre + numéro) ou "null" pour exclure du test
 * 
 * Convention :
 * - e2eID = "c12" : élément à tester avec cet identifiant
 * - e2eID = "null" (chaîne) : élément volontairement exclu des tests E2E
 * - e2eID absent : élément non encore traité (à ajouter au mapping)
 */

// Pour le serveur uniquement - lecture/écriture du fichier
let serverMapping: Record<string, string> | null = null;

/**
 * Invalide le cache du mapping (pour les tests qui régénèrent le fichier puis relisent).
 * À appeler après avoir exécuté scripts/generate-e2e-mapping.ts dans un sous-processus.
 */
export function clearMappingCache(): void {
  serverMapping = null;
}

/**
 * Préfixes par type d'élément
 */
const PREFIXES: Record<string, string> = {
  header: 'h',
  footer: 'b',
  notFound: 'b',
  competence: 'c',
  video: 'v',
  callToAction: 'a',
  link: 'l',
  default: 'x',
};

/**
 * Extrait le numéro d'un e2eID
 */
function extractNumber(e2eId: string): number {
  const match = e2eId.match(/^[a-z](\d+)$/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Vérifie si on est dans un environnement Node.js (serveur ou tests Jest)
 */
function isNodeEnvironment(): boolean {
  // Jest définit window mais on a quand même accès à fs
  const isJest = typeof process !== 'undefined' && process.env?.JEST_WORKER_ID !== undefined;
  // Côté serveur, window n'est pas défini
  const isServer = typeof window === 'undefined';
  // Node.js définit toujours process
  const hasNodeProcess = typeof process !== 'undefined' && process.versions?.node !== undefined;
  
  return isServer || isJest || hasNodeProcess;
}

/**
 * Charge le mapping depuis le fichier (côté serveur ou tests uniquement)
 */
export function loadMapping(): Record<string, string> {
  if (!isNodeEnvironment()) {
    // Côté client (browser réel), le mapping doit être passé via props
    throw new Error('loadMapping() ne peut être appelé que côté serveur');
  }
  
  if (serverMapping) return serverMapping;
  
  // Import dynamique pour éviter les erreurs côté client
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path');
  
  const mappingPath = path.join(process.cwd(), 'data', '_e2eIds-mapping.json');
  
  if (fs.existsSync(mappingPath)) {
    const content = fs.readFileSync(mappingPath, 'utf8');
    const data = JSON.parse(content);
    // Exclure _metadata du mapping
    const { _metadata, ...mapping } = data;
    serverMapping = mapping;
    return mapping as Record<string, string>;
  }
  
  serverMapping = {};
  return {};
}

/**
 * Sauvegarde le mapping dans le fichier (côté serveur ou tests uniquement)
 */
export function saveMapping(mapping: Record<string, string>): void {
  if (!isNodeEnvironment()) {
    throw new Error('saveMapping() ne peut être appelé que côté serveur');
  }
  
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path');
  
  const mappingPath = path.join(process.cwd(), 'data', '_e2eIds-mapping.json');
  
  // Calculer le compteur max
  let compteurMax = 0;
  for (const e2eId of Object.values(mapping)) {
    const num = extractNumber(e2eId);
    if (num > compteurMax) compteurMax = num;
  }
  
  const data = {
    _metadata: {
      description: 'Mapping des e2eID pour les tests E2E. Clé = identifiant déterministe, Valeur = e2eID.',
      format: 'type:id:action ou type:id pour les éléments simples',
      compteurMax,
    },
    ...mapping,
  };
  
  fs.writeFileSync(mappingPath, JSON.stringify(data, null, 2));
  serverMapping = mapping;
}

/**
 * Vérifie si un élément est explicitement exclu des tests E2E
 * @param key Clé déterministe
 * @param mapping Le mapping (optionnel, chargé automatiquement côté serveur)
 * @returns true si l'élément est exclu (valeur "null" dans le mapping)
 */
export function isExcluded(key: string, mapping?: Record<string, string>): boolean {
  const m = mapping ?? loadMapping();
  return m[key] === 'null';
}

/**
 * Récupère l'e2eID pour une clé donnée
 * @param key Clé déterministe (ex: "competence:creativite:bouton")
 * @param mapping Le mapping (passé en paramètre pour compatibilité client)
 * @returns L'e2eID, "null" si exclu, ou null si non trouvé
 */
export function getE2eId(key: string, mapping?: Record<string, string>): string | null {
  const m = mapping ?? loadMapping();
  const value = m[key];
  // Retourne la valeur telle quelle (y compris "null" pour les exclusions)
  return value ?? null;
}

/**
 * Récupère l'e2eID pour une clé, en ignorant les exclusions
 * @param key Clé déterministe
 * @param mapping Le mapping (optionnel)
 * @returns L'e2eID ou undefined si non trouvé ou exclu
 */
export function getE2eIdOrUndefined(key: string, mapping?: Record<string, string>): string | undefined {
  const m = mapping ?? loadMapping();
  const value = m[key];
  // Retourne undefined si absent ou si c'est une exclusion ("null")
  if (!value || value === 'null') return undefined;
  return value;
}

/**
 * Génère un nouvel e2eID pour un type donné
 * @param type Type d'élément (competence, footer, etc.)
 * @param mapping Le mapping actuel
 * @returns Nouvel e2eID
 */
export function generateE2eId(type: string, mapping: Record<string, string>): string {
  const prefix = PREFIXES[type] ?? PREFIXES.default;
  
  // Trouver le max pour ce préfixe
  let maxNum = 0;
  for (const e2eId of Object.values(mapping)) {
    if (e2eId.startsWith(prefix)) {
      const num = extractNumber(e2eId);
      if (num > maxNum) maxNum = num;
    }
  }
  
  return `${prefix}${maxNum + 1}`;
}

/**
 * Récupère ou génère un e2eID pour une clé
 * @param key Clé déterministe
 * @param type Type d'élément (pour la génération)
 * @returns L'e2eID (existant ou nouveau)
 */
export function getOrCreateE2eId(key: string, type: string): string {
  const mapping = loadMapping();
  
  const existing = mapping[key];
  if (existing) return existing;
  
  // Générer un nouvel e2eID
  const newId = generateE2eId(type, mapping);
  mapping[key] = newId;
  saveMapping(mapping);
  
  return newId;
}

// =============================================================================
// Fonctions de construction de clés pour le mapping e2eID
// Format : Source.TypeMétier:Destination (liens de page)
//          TypeMétier:Destination (éléments globaux comme Footer, Header)
// =============================================================================

/**
 * Construit une clé pour une compétence
 * Format: Source.Competence:Destination
 */
export function competenceKey(source: string, destination: string): string {
  return `${source}.Competence:${destination}`;
}

/**
 * Construit une clé pour un profil
 * Format: Source.Profil:Destination
 */
export function profilKey(source: string, destination: string): string {
  return `${source}.Profil:${destination}`;
}

/**
 * Construit une clé pour un lien de page (plan du site)
 * Format: Source.LienPage:Destination
 */
export function lienPageKey(source: string, destination: string): string {
  return `${source}.LienPage:${destination}`;
}

/**
 * Construit une clé pour un CallToAction du Hero
 * Format: Source.Hero.CallToAction:Destination
 */
export function heroCallToActionKey(source: string, destination: string): string {
  return `${source}.Hero.CallToAction:${destination}`;
}

/**
 * Construit une clé pour un lien "En savoir plus" du Hero
 * Format: Source.Hero.EnSavoirPlus:Destination
 */
export function heroEnSavoirPlusKey(source: string, destination: string): string {
  return `${source}.Hero.EnSavoirPlus:${destination}`;
}

/**
 * Construit une clé pour une entrée du menu « A propos » (bande sous le header).
 * Format: Source.MenuAPropos:Destination (destination = URL complète du lien)
 */
export function menuAProposKey(source: string, destination: string): string {
  return `${source}.MenuAPropos:${destination}`;
}

/**
 * Construit une clé pour un bouton du footer (élément global)
 * Format: Footer.Bouton:Destination
 */
export function footerKey(destination: string): string {
  return `Footer.Bouton:${destination}`;
}

/**
 * Construit une clé pour le logo du header (élément global)
 * Format: Header.Logo:Destination
 */
export function headerLogoKey(destination: string = '/'): string {
  return `Header.Logo:${destination}`;
}

/**
 * Construit une clé pour une vidéo (élément de page)
 * Format: Source.Video:youtube ou Source.Hero.Video:youtube
 */
export function videoKey(source: string, isHero: boolean = false): string {
  const type = isHero ? 'Hero.Video' : 'Video';
  return `${source}.${type}:youtube`;
}

/**
 * Ancien format - conservé pour compatibilité ascendante
 * @deprecated Utiliser competenceKey, profilKey, etc.
 */
export function linkKey(source: string, destination: string): string {
  return `${source}.Competence:${destination}`;
}
