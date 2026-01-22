/**
 * Script pour refactoriser le code TypeScript/React
 * Remplace .items par .competences dans tous les fichiers concernés
 */

import fs from 'fs';
import path from 'path';

const filesToFix = [
  'components/DomaineDeCompetences.tsx',
  'tests/unit/videoDetournementJson.test.ts',
  'tests/unit/indexReader.test.ts',
  'tests/integration/jsonConformity.integration.test.ts',
  'utils/siteMapGenerator.ts',
  'utils/indexReader.ts',
  'tests/integration/jsonValidation.integration.test.ts',
  'components/PageContentRenderer.tsx',
  'components/VideoDetournement.tsx',
  'components/Temoignages.tsx',
  'tests/unit/temoignagesJson.test.ts',
  'components/AboutSiteContentRenderer.tsx',
  'tests/unit/criteresAcceptation.test.ts',
  'utils/aboutSiteReader.ts',
  'tests/unit/criteresAcceptationParser.test.ts',
  'scripts/testParser.ts',
  'tests/unit/markdownContentParser.test.ts',
  'tests/unit/markdownParser.test.ts',
  'utils/markdownParser.ts',
];

function refactorFile(filePath: string): void {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`  ⚠️  Fichier non trouvé : ${filePath}`);
    return;
  }

  console.log(`\n📄 Traitement de ${filePath}...`);

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // Remplacer .items par .competences seulement dans le contexte des domaines de compétences
  // Patterns spécifiques pour éviter de casser les témoignages et détournements vidéo
  const patterns = [
    // domaine.items -> domaine.competences
    { from: /(\w+)\.items\.map/g, to: '$1.competences.map' },
    { from: /(\w+)\.items\.forEach/g, to: '$1.competences.forEach' },
    { from: /(\w+)\.items\.filter/g, to: '$1.competences.filter' },
    { from: /(\w+)\.items\.length/g, to: '$1.competences.length' },
    { from: /(\w+)\.items\[/g, to: '$1.competences[' },
    // Pour les tests qui testent la propriété items directement
    { from: /expect\((\w+)\.items\)/g, to: 'expect($1.competences)' },
    { from: /(\w+)\.items;/g, to: '$1.competences;' },
  ];

  patterns.forEach(({ from, to }) => {
    const before = content;
    content = content.replace(from, to);
    if (content !== before) {
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`  ✅ Fichier modifié`);
  } else {
    console.log(`  ℹ️  Aucune modification nécessaire`);
  }
}

console.log('🚀 Démarrage de la refactorisation DDD du code TypeScript...');
console.log(`📝 Fichiers à traiter : ${filesToFix.length}`);

let modifiedCount = 0;

filesToFix.forEach((file) => {
  try {
    const fullPath = path.join(process.cwd(), file);
    const beforeContent = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : '';
    
    refactorFile(file);
    
    const afterContent = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf8') : '';
    if (beforeContent !== afterContent) {
      modifiedCount++;
    }
  } catch (error) {
    console.error(`  ❌ Erreur lors du traitement de ${file}:`, error);
  }
});

console.log(`\n✅ Refactorisation terminée !`);
console.log(`📊 Fichiers modifiés : ${modifiedCount}/${filesToFix.length}`);
