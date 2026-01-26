/**
 * Script pour analyser les fichiers JSON récupérés avant migration
 * et vérifier que toutes les compétences et domaines sont dans la bibliothèque
 */

import fs from 'fs';
import path from 'path';

interface Competence {
  titre: string;
  image?: {
    src: string;
    alt: string;
  };
  description: string;
  bouton?: any;
  type: string;
  auteur?: string;
}

interface DomaineDeCompetence {
  titre: string;
  contenu?: string;
  auteur?: string;
  competences: Competence[];
}

interface ElementContenu {
  type: string;
  titre?: string;
  competences?: Competence[];
  [key: string]: any;
}

interface ContenuPage {
  contenu: ElementContenu[];
}

interface BibliothequeCompetences {
  competences: Record<string, Competence & { id: string }>;
}

interface BibliothequeDomaines {
  domaines: Record<string, {
    id: string;
    titre: string;
    contenu?: string;
    auteur?: string;
    competences: string[];
  }>;
}

// Fonction pour générer un ID à partir d'un titre
function generateId(titre: string): string {
  return titre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Fonction pour comparer deux compétences (sans tenir compte de l'ID)
function competencesEqual(c1: Competence, c2: Competence): boolean {
  return c1.titre.toLowerCase().trim() === c2.titre.toLowerCase().trim();
}

// Fonction pour comparer deux domaines
function domainesEqual(d1: DomaineDeCompetence, d2: { titre: string; contenu?: string }): boolean {
  return d1.titre.toLowerCase().trim() === d2.titre.toLowerCase().trim();
}

// Analyser un fichier JSON
function analyzeJsonFile(filePath: string): {
  competences: Competence[];
  domaines: DomaineDeCompetence[];
} {
  const content = fs.readFileSync(filePath, 'utf-8');
  const data: ContenuPage = JSON.parse(content);
  
  const competences: Competence[] = [];
  const domaines: DomaineDeCompetence[] = [];
  
  for (const element of data.contenu) {
    if (element.type === 'domaineDeCompetence') {
      const domaine: DomaineDeCompetence = {
        titre: element.titre || '',
        contenu: element.contenu || '',
        auteur: element.auteur,
        competences: element.competences || []
      };
      domaines.push(domaine);
      
      // Ajouter les compétences du domaine
      if (element.competences) {
        for (const competence of element.competences) {
          competences.push(competence);
        }
      }
    }
  }
  
  return { competences, domaines };
}

// Lire la bibliothèque de compétences
function readBibliothequeCompetences(): BibliothequeCompetences {
  const filePath = path.join(process.cwd(), 'data', 'bibliotheque', 'competences.json');
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

// Lire la bibliothèque de domaines
function readBibliothequeDomaines(): BibliothequeDomaines {
  const filePath = path.join(process.cwd(), 'data', 'bibliotheque', 'domaines.json');
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

// Main
function main() {
  const avantMigrationDir = path.join(process.cwd(), 'data', 'avant migration');
  const files = fs.readdirSync(avantMigrationDir).filter(f => f.endsWith('.json'));
  
  console.log(`\n📁 Analyse de ${files.length} fichiers JSON...\n`);
  
  const allCompetences: Competence[] = [];
  const allDomaines: DomaineDeCompetence[] = [];
  
  // Analyser tous les fichiers
  for (const file of files) {
    const filePath = path.join(avantMigrationDir, file);
    console.log(`📄 Analyse de ${file}...`);
    
    try {
      const { competences, domaines } = analyzeJsonFile(filePath);
      allCompetences.push(...competences);
      allDomaines.push(...domaines);
    } catch (error) {
      console.error(`❌ Erreur lors de l'analyse de ${file}:`, error);
    }
  }
  
  // Dédupliquer les compétences (par titre)
  const uniqueCompetences = new Map<string, Competence>();
  for (const comp of allCompetences) {
    const key = comp.titre.toLowerCase().trim();
    if (!uniqueCompetences.has(key)) {
      uniqueCompetences.set(key, comp);
    }
  }
  
  // Dédupliquer les domaines (par titre)
  const uniqueDomaines = new Map<string, DomaineDeCompetence>();
  for (const domaine of allDomaines) {
    const key = domaine.titre.toLowerCase().trim();
    if (!uniqueDomaines.has(key)) {
      uniqueDomaines.set(key, domaine);
    }
  }
  
  console.log(`\n✅ Compétences trouvées: ${uniqueCompetences.size}`);
  console.log(`✅ Domaines trouvés: ${uniqueDomaines.size}\n`);
  
  // Lire les bibliothèques
  const bibCompetences = readBibliothequeCompetences();
  const bibDomaines = readBibliothequeDomaines();
  
  // Vérifier les compétences manquantes
  const competencesManquantes: Competence[] = [];
  for (const comp of uniqueCompetences.values()) {
    const id = generateId(comp.titre);
    const exists = bibCompetences.competences[id] || 
      Object.values(bibCompetences.competences).some(c => competencesEqual(c, comp));
    
    if (!exists) {
      competencesManquantes.push(comp);
    }
  }
  
  // Vérifier les domaines manquants
  const domainesManquants: DomaineDeCompetence[] = [];
  for (const domaine of uniqueDomaines.values()) {
    const id = generateId(domaine.titre);
    const exists = bibDomaines.domaines[id] ||
      Object.values(bibDomaines.domaines).some(d => domainesEqual(domaine, d));
    
    if (!exists) {
      domainesManquants.push(domaine);
    }
  }
  
  // Afficher les résultats
  console.log('📊 RÉSULTATS:\n');
  
  if (competencesManquantes.length > 0) {
    console.log(`⚠️  ${competencesManquantes.length} compétence(s) manquante(s):`);
    for (const comp of competencesManquantes) {
      console.log(`   - ${comp.titre}`);
    }
  } else {
    console.log('✅ Toutes les compétences sont dans la bibliothèque');
  }
  
  console.log('');
  
  if (domainesManquants.length > 0) {
    console.log(`⚠️  ${domainesManquants.length} domaine(s) manquant(s):`);
    for (const domaine of domainesManquants) {
      console.log(`   - ${domaine.titre}`);
    }
  } else {
    console.log('✅ Tous les domaines sont dans la bibliothèque');
  }
  
  // Ajouter les éléments manquants
  if (competencesManquantes.length > 0 || domainesManquants.length > 0) {
    console.log('\n🔧 Ajout des éléments manquants...\n');
    
    // Ajouter les compétences manquantes
    for (const comp of competencesManquantes) {
      const id = generateId(comp.titre);
      bibCompetences.competences[id] = {
        id,
        ...comp
      };
      console.log(`   ✅ Ajouté compétence: ${comp.titre} (id: ${id})`);
    }
    
    // Ajouter les domaines manquants
    for (const domaine of domainesManquants) {
      const id = generateId(domaine.titre);
      bibDomaines.domaines[id] = {
        id,
        titre: domaine.titre,
        contenu: domaine.contenu || '',
        auteur: domaine.auteur,
        competences: domaine.competences.map(c => generateId(c.titre))
      };
      console.log(`   ✅ Ajouté domaine: ${domaine.titre} (id: ${id})`);
    }
    
    // Sauvegarder
    const competencesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'competences.json');
    const domainesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'domaines.json');
    
    fs.writeFileSync(competencesPath, JSON.stringify(bibCompetences, null, 2), 'utf-8');
    fs.writeFileSync(domainesPath, JSON.stringify(bibDomaines, null, 2), 'utf-8');
    
    console.log('\n✅ Bibliothèques mises à jour !');
  }
}

main();
