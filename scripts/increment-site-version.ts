/**
 * Script pour incrémenter la version du site
 * Usage:
 *   - npm run version:patch   -> incrémente patch (build)
 *   - npm run version:minor    -> incrémente minor (US validée)
 *   - npm run version:sync    -> synchronise la version avec le nombre d'US complétées
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SPRINTS_DIR = path.join(process.cwd(), 'data', 'A propos de ce site', 'Sprints');

interface CompletedUS {
  id: string;
  title: string;
  file: string;
}

/** Fichiers dont le nom correspond à une US (ex. US-7.1 - Titre.md) */
const US_FILENAME_REGEX = /^US-\d+\.\d+[a-z]?\s*-/i;

function isCompletedInFilename(filename: string): boolean {
  const normalized = filename.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return (
    /COMPL[EÉ]T[EÉ]/i.test(filename) ||
    /COMPLETE/i.test(normalized) ||
    filename.includes('✅')
  );
}

function parseUsFilename(filename: string): { id: string; title: string } | null {
  const base = filename.replace(/\.md$/i, '').trim();
  const match = base.match(/^(US-\d+\.\d+[a-z]?)\s*-\s*(.+)$/i);
  if (!match) return null;
  const title = match[2]
    .replace(/\s*✅\s*(COMPLÉTÉ|COMPLETÉ|COMPLETE)\s*/gi, '')
    .trim();
  return { id: match[1], title };
}

/**
 * Compte les User Stories complétées dans les sous-dossiers de Sprints.
 * Structure : Sprints / [sprint-dir] / US-X.Y - Titre.md (ou ✅ COMPLÉTÉ dans le nom/contenu).
 */
function countCompletedUS(): { count: number; usList: CompletedUS[] } {
  const usList: CompletedUS[] = [];

  if (!fs.existsSync(SPRINTS_DIR)) {
    console.warn(`⚠️  Dossier sprints non trouvé: ${SPRINTS_DIR}`);
    return { count: 0, usList: [] };
  }

  const entries = fs.readdirSync(SPRINTS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const sprintDir = path.join(SPRINTS_DIR, entry.name);
    const files = fs.readdirSync(sprintDir);

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      if (!US_FILENAME_REGEX.test(file)) continue;

      const parsed = parseUsFilename(file);
      if (!parsed) continue;

      let completed = isCompletedInFilename(file);
      if (!completed) {
        const filePath = path.join(sprintDir, file);
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          completed =
            content.includes('✅ COMPLÉTÉ') ||
            content.includes('✅ COMPLETÉ') ||
            /COMPL[EÉ]T[EÉ]/i.test(content);
        } catch {
          // ignorer
        }
      }

      if (completed) {
        usList.push({
          id: parsed.id,
          title: parsed.title,
          file: `${entry.name}/${file}`,
        });
      }
    }
  }

  return { count: usList.length, usList };
}

const VERSION_FILE = path.join(process.cwd(), 'site-version.json');

interface SiteVersion {
  major: number;
  minor: number;
  patch: number;
}

function readVersion(): SiteVersion {
  try {
    const content = fs.readFileSync(VERSION_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // Si le fichier n'existe pas, créer la version initiale
    const initial: SiteVersion = { major: 1, minor: 0, patch: 0 };
    writeVersion(initial);
    return initial;
  }
}

function writeVersion(version: SiteVersion): void {
  fs.writeFileSync(VERSION_FILE, JSON.stringify(version, null, 2) + '\n', 'utf-8');
}

function formatVersion(version: SiteVersion): string {
  return `${version.major}.${version.minor}.${version.patch}`;
}

function incrementPatch(): void {
  const version = readVersion();
  version.patch += 1;
  writeVersion(version);
  console.log(`✅ Version du site incrémentée: ${formatVersion(version)}`);
}

function incrementMinor(): void {
  const version = readVersion();
  version.minor += 1;
  version.patch = 0; // Reset patch lors d'un minor
  writeVersion(version);
  console.log(`✅ Version du site incrémentée: ${formatVersion(version)}`);
}

/**
 * Synchronise la version avec le nombre d'US complétées
 * Le minor correspond au nombre d'US complétées
 */
function syncVersionWithUS(): void {
  const { count } = countCompletedUS();
  const version = readVersion();
  const previousMinor = version.minor;
  
  // Mettre à jour le minor pour correspondre au nombre d'US complétées
  version.minor = count;
  
  // Si le minor a changé, reset le patch
  if (version.minor !== previousMinor) {
    version.patch = 0;
    console.log(`✅ Version synchronisée avec les US: ${formatVersion(version)} (${count} US complétées)`);
  } else {
    console.log(`ℹ️  Version déjà à jour: ${formatVersion(version)} (${count} US complétées)`);
  }
  
  writeVersion(version);
}

/**
 * Génère automatiquement le plan du site (_Pages-Et-Lien.json)
 * pour s'assurer qu'il est toujours à jour lors du build
 */
function generateSiteMap(): void {
  try {
    console.log('📋 Génération automatique du plan du site...');
    execSync('ts-node --project tsconfig.node.json scripts/update-site-map.ts', {
      stdio: 'inherit',
      encoding: 'utf8',
      cwd: process.cwd(),
    });
    console.log('✅ Plan du site généré avec succès\n');
  } catch (error: any) {
    console.warn('⚠️  Erreur lors de la génération du plan du site:', error?.message || error);
    console.warn('   Le build continuera, mais le plan du site pourrait être incomplet\n');
    // Ne pas bloquer le build, juste avertir
  }
}

/**
 * Mesure le temps de build Next.js et le stocke dans .next/build-metrics.json
 */
function measureBuildTime(): void {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🔨 MESURE DU TEMPS DE BUILD NEXT.JS');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  
  const BUILD_METRICS_FILE = path.join(process.cwd(), '.next', 'build-metrics.json');
  const NEXT_DIR = path.join(process.cwd(), '.next');
  
  // Créer le dossier .next s'il n'existe pas
  if (!fs.existsSync(NEXT_DIR)) {
    fs.mkdirSync(NEXT_DIR, { recursive: true });
  }
  
  console.log('📝 Démarrage du build Next.js...');
  const startTime = Date.now();
  let buildTime = 0;
  let buildSuccess = false;
  
  try {
    // Exécuter next build
    execSync('next build', { 
      stdio: 'inherit',
      encoding: 'utf-8'
    });
    
    const endTime = Date.now();
    buildTime = endTime - startTime;
    buildSuccess = true;
    
    // Stocker les métriques
    const metrics = {
      buildTime,
      buildSuccess: true,
      timestamp: new Date().toISOString(),
      buildDate: new Date().toLocaleString('fr-FR'),
    };
    
    fs.writeFileSync(BUILD_METRICS_FILE, JSON.stringify(metrics, null, 2), 'utf-8');
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`✅ Build terminé avec succès en ${(buildTime / 1000).toFixed(2)}s`);
    console.log(`📊 Métriques sauvegardées dans: ${BUILD_METRICS_FILE}`);
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
  } catch (error: any) {
    const endTime = Date.now();
    buildTime = endTime - startTime;
    buildSuccess = false;
    
    // Stocker les métriques même en cas d'erreur (pour avoir le temps écoulé)
    const metrics = {
      buildTime,
      buildSuccess: false,
      error: error?.message || 'Erreur inconnue',
      timestamp: new Date().toISOString(),
      buildDate: new Date().toLocaleString('fr-FR'),
    };
    
    try {
      fs.writeFileSync(BUILD_METRICS_FILE, JSON.stringify(metrics, null, 2), 'utf-8');
    } catch (writeError) {
      // Ignorer les erreurs d'écriture
    }
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`⚠️  Build échoué après ${(buildTime / 1000).toFixed(2)}s`);
    console.log(`📊 Temps écoulé sauvegardé dans: ${BUILD_METRICS_FILE}`);
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
    console.error('❌ Erreur lors du build:', error?.message || error);
    console.log('');
    console.log('💡 Conseil: Si vous voyez une erreur EPERM, c\'est souvent dû à OneDrive qui verrouille des fichiers.');
    console.log('   Essayez de fermer OneDrive ou d\'exclure le dossier .next de la synchronisation.');
    console.log('');
    
    process.exit(1);
  }
}

// Récupérer la commande depuis les arguments
const command = process.argv[2];

// Debug: afficher la commande reçue
if (command === 'build') {
  console.log('[DEBUG] Commande "build" détectée, appel de measureBuildTime()...');
}

switch (command) {
  case 'patch':
    incrementPatch();
    break;
  case 'minor':
    incrementMinor();
    break;
  case 'sync':
    syncVersionWithUS();
    break;
  case 'build':
    // Générer le plan du site avant le build pour s'assurer qu'il est à jour
    generateSiteMap();
    // Mesurer le temps de build
    console.log('[DEBUG] Exécution de measureBuildTime()...');
    measureBuildTime();
    break;
  default:
    console.error('Usage: ts-node scripts/increment-site-version.ts [patch|minor|sync|build]');
    console.error(`Commande reçue: "${command}"`);
    process.exit(1);
}
