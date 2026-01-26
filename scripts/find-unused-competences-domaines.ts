/**
 * Script pour identifier les compétences et domaines dans la bibliothèque
 * qui ne sont pas utilisés dans les profils et autres pages
 */

import fs from 'fs';
import path from 'path';

interface ElementContenu {
  type: string;
  ref?: string;
  [key: string]: any;
}

interface ContenuPage {
  contenu: ElementContenu[];
}

interface BibliothequeCompetences {
  competences: Record<string, {
    id: string;
    titre: string;
    [key: string]: any;
  }>;
}

interface BibliothequeDomaines {
  domaines: Record<string, {
    id: string;
    titre: string;
    competences: string[];
    [key: string]: any;
  }>;
}

// Fonction pour analyser un fichier JSON et extraire les références
function extractRefsFromFile(filePath: string): Set<string> {
  const refs = new Set<string>();
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data: ContenuPage = JSON.parse(content);
    
    if (data.contenu && Array.isArray(data.contenu)) {
      for (const element of data.contenu) {
        if (element.type === 'domaineDeCompetence' && element.ref) {
          refs.add(element.ref);
        }
      }
    }
  } catch (error) {
    // Ignorer les erreurs (fichiers qui ne sont pas des pages de contenu)
  }
  
  return refs;
}

// Fonction pour trouver tous les fichiers JSON à analyser
function findJsonFiles(): string[] {
  const dataDir = path.join(process.cwd(), 'data');
  const files: string[] = [];
  
  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Ignorer les dossiers de sauvegarde et bibliothèque
      if (entry.isDirectory()) {
        if (entry.name !== 'sauvegarde' && entry.name !== 'bibliotheque' && entry.name !== 'avant migration') {
          scanDir(fullPath);
        }
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDir(dataDir);
  return files;
}

function main() {
  console.log('🔍 Analyse des fichiers JSON pour trouver les références utilisées...\n');
  
  // 1. Trouver tous les fichiers JSON
  const jsonFiles = findJsonFiles();
  console.log(`📁 ${jsonFiles.length} fichiers JSON trouvés\n`);
  
  // 2. Extraire toutes les références utilisées
  const refsUtilisees = new Set<string>();
  
  for (const file of jsonFiles) {
    const refs = extractRefsFromFile(file);
    refs.forEach(ref => refsUtilisees.add(ref));
  }
  
  console.log(`✅ ${refsUtilisees.size} référence(s) de domaine trouvée(s) dans les fichiers:\n`);
  Array.from(refsUtilisees).sort().forEach(ref => {
    console.log(`   - ${ref}`);
  });
  
  // 3. Lire la bibliothèque
  const competencesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'competences.json');
  const domainesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'domaines.json');
  
  const bibCompetences: BibliothequeCompetences = JSON.parse(
    fs.readFileSync(competencesPath, 'utf-8')
  );
  const bibDomaines: BibliothequeDomaines = JSON.parse(
    fs.readFileSync(domainesPath, 'utf-8')
  );
  
  // 4. Trouver les compétences utilisées (via les domaines référencés)
  const competencesUtilisees = new Set<string>();
  
  for (const ref of refsUtilisees) {
    const domaine = bibDomaines.domaines[ref];
    if (domaine && domaine.competences) {
      domaine.competences.forEach(compId => competencesUtilisees.add(compId));
    }
  }
  
  console.log(`\n✅ ${competencesUtilisees.size} compétence(s) utilisée(s) (via les domaines référencés)\n`);
  
  // 5. Trouver les domaines non utilisés
  const domainesNonUtilises: string[] = [];
  
  for (const [id, domaine] of Object.entries(bibDomaines.domaines)) {
    if (!refsUtilisees.has(id)) {
      domainesNonUtilises.push(id);
    }
  }
  
  // 6. Trouver les compétences non utilisées
  const competencesNonUtilisees: string[] = [];
  
  for (const [id, competence] of Object.entries(bibCompetences.competences)) {
    if (!competencesUtilisees.has(id)) {
      competencesNonUtilisees.push(id);
    }
  }
  
  // 7. Afficher les résultats
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSULTATS');
  console.log('='.repeat(60) + '\n');
  
  if (domainesNonUtilises.length > 0) {
    console.log(`⚠️  ${domainesNonUtilises.length} domaine(s) dans la bibliothèque mais NON utilisés dans les profils:\n`);
    for (const id of domainesNonUtilises.sort()) {
      const domaine = bibDomaines.domaines[id];
      console.log(`   - ${id}`);
      console.log(`     Titre: ${domaine.titre}`);
      console.log(`     Compétences: ${domaine.competences.length}`);
      console.log('');
    }
  } else {
    console.log('✅ Tous les domaines de la bibliothèque sont utilisés dans les profils\n');
  }
  
  if (competencesNonUtilisees.length > 0) {
    console.log(`\n⚠️  ${competencesNonUtilisees.length} compétence(s) dans la bibliothèque mais NON utilisées dans les profils:\n`);
    for (const id of competencesNonUtilisees.sort()) {
      const competence = bibCompetences.competences[id];
      console.log(`   - ${id}`);
      console.log(`     Titre: ${competence.titre}`);
      console.log('');
    }
  } else {
    console.log('\n✅ Toutes les compétences de la bibliothèque sont utilisées dans les profils\n');
  }
  
  // 8. Sauvegarder dans un fichier
  const outputPath = path.join(process.cwd(), 'competences-domaines-non-utilises.json');
  const output = {
    domainesNonUtilises: domainesNonUtilises.map(id => ({
      id,
      titre: bibDomaines.domaines[id].titre,
      competences: bibDomaines.domaines[id].competences
    })),
    competencesNonUtilisees: competencesNonUtilisees.map(id => ({
      id,
      titre: bibCompetences.competences[id].titre
    }))
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`\n💾 Résultats sauvegardés dans: ${outputPath}\n`);
}

main();
