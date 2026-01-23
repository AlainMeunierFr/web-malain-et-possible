/**
 * Script pour mesurer le temps de build Next.js
 * Usage: ts-node scripts/measure-build-time.ts
 * 
 * Ce script exécute `next build` et mesure le temps d'exécution,
 * puis stocke le résultat dans .next/build-metrics.json
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const BUILD_METRICS_FILE = path.join(process.cwd(), '.next', 'build-metrics.json');
const NEXT_DIR = path.join(process.cwd(), '.next');

// Créer le dossier .next s'il n'existe pas
if (!fs.existsSync(NEXT_DIR)) {
  fs.mkdirSync(NEXT_DIR, { recursive: true });
}

console.log('🔨 Mesure du temps de build Next.js...');
console.log('⏳ Cela peut prendre plusieurs minutes...\n');

const startTime = Date.now();

try {
  // Exécuter next build
  execSync('next build', { 
    stdio: 'inherit',
    encoding: 'utf-8'
  });
  
  const endTime = Date.now();
  const buildTime = endTime - startTime;
  
  // Stocker les métriques
  const metrics = {
    buildTime,
    timestamp: new Date().toISOString(),
    buildDate: new Date().toLocaleString('fr-FR'),
  };
  
  fs.writeFileSync(BUILD_METRICS_FILE, JSON.stringify(metrics, null, 2), 'utf-8');
  
  console.log(`\n✅ Build terminé en ${(buildTime / 1000).toFixed(2)}s`);
  console.log(`📊 Métriques sauvegardées dans: ${BUILD_METRICS_FILE}`);
} catch (error) {
  console.error('\n❌ Erreur lors du build:', error);
  process.exit(1);
}
