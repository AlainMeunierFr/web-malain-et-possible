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

const SPRINTS_DIR = path.join(process.cwd(), 'data', 'A propos de ce site', '2. Sprints');

interface CompletedUS {
  id: string;
  title: string;
  file: string;
}

/**
 * Compte les User Stories complétées dans tous les fichiers de sprint
 */
function countCompletedUS(): { count: number; usList: CompletedUS[] } {
  const usList: CompletedUS[] = [];
  
  if (!fs.existsSync(SPRINTS_DIR)) {
    console.warn(`⚠️  Dossier sprints non trouvé: ${SPRINTS_DIR}`);
    return { count: 0, usList: [] };
  }
  
  const files = fs.readdirSync(SPRINTS_DIR);
  
  for (const file of files) {
    if (!file.endsWith('.md')) {
      continue;
    }
    
    const filePath = path.join(SPRINTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    let currentUS: { id: string; title: string; startLine: number } | null = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/\r$/, ''); // Supprimer le \r en fin de ligne (Windows)
      
      // Détecter une User Story (format: #### US-X.Y : Titre ou #### US-X.Ya : Titre)
      const usMatch = line.match(/^####\s+(US-\d+\.\d+[a-z]?)\s*:\s*(.+)$/);
      if (usMatch) {
        // Vérifier si l'US précédente était complétée avant de passer à la suivante
        if (currentUS) {
          // Si on avait une US précédente non complétée, on l'ignore
          currentUS = null;
        }
        
        const usTitle = usMatch[2].trim();
        // Vérifier si le marqueur de complétion est dans le titre lui-même
        // Supporte les variantes : "✅ COMPLÉTÉ", "✅ COMPLETÉ", avec ou sans espace
        // Le caractère ✅ peut être encodé différemment, donc on cherche aussi sans l'emoji
        // Utilise une regex insensible à la casse pour détecter "COMPLÉTÉ" ou "COMPLETÉ"
        // Normalise le texte pour gérer les problèmes d'encodage (É peut être encodé différemment)
        const normalizedTitle = usTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const isCompletedInTitle = 
          /COMPL[EÉ]T[EÉ]/i.test(usTitle) || 
          /COMPLETE/i.test(normalizedTitle) ||
          usTitle.includes('✅ COMPLÉTÉ') ||
          usTitle.includes('✅ COMPLETÉ') ||
          usTitle.includes('COMPLÉTÉ') ||
          usTitle.includes('COMPLETÉ');
        
        if (isCompletedInTitle) {
          // US complétée directement dans le titre
          const cleanTitle = usTitle
            .replace(/✅\s*(COMPLÉTÉ|COMPLETÉ|COMPLETE)\s*/gi, '')
            .trim();
          usList.push({
            id: usMatch[1],
            title: cleanTitle,
            file: file,
          });
          currentUS = null;
        } else {
          // US non complétée dans le titre, on continue à chercher dans les lignes suivantes
          currentUS = {
            id: usMatch[1],
            title: usTitle,
            startLine: i,
          };
        }
        continue;
      }
      
      // Vérifier si l'US courante est complétée dans les lignes suivantes
      if (currentUS) {
        // Chercher "✅ COMPLÉTÉ" ou "✅ COMPLETÉ" dans la ligne courante
        const isCompleted = line.includes('✅ COMPLÉTÉ') || line.includes('✅ COMPLETÉ');
        
        if (isCompleted) {
          usList.push({
            id: currentUS.id,
            title: currentUS.title,
            file: file,
          });
          currentUS = null; // Reset pour éviter de compter plusieurs fois
        }
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
    // Mesurer le temps de build
    console.log('[DEBUG] Exécution de measureBuildTime()...');
    measureBuildTime();
    break;
  default:
    console.error('Usage: ts-node scripts/increment-site-version.ts [patch|minor|sync|build]');
    console.error(`Commande reçue: "${command}"`);
    process.exit(1);
}
