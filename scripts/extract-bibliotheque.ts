/**
 * Script pour extraire toutes les compétences et domaines des JSON existants
 * et créer la bibliothèque centralisée
 */

import fs from 'fs';
import path from 'path';

/**
 * Convertit un titre en slug (ID)
 */
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9]+/g, '-') // Remplace les caractères non alphanumériques par des tirets
    .replace(/^-+|-+$/g, ''); // Supprime les tirets en début et fin
}

/**
 * Interface pour une compétence
 */
interface Competence {
  id: string;
  titre: string;
  image?: {
    src: string;
    alt: string;
  };
  icon?: string;
  description: string;
  bouton: {
    type: string;
    texte: string;
    action: string;
    e2eID?: string | null;
  } | null;
  type: string;
  auteur?: string;
}

/**
 * Interface pour un domaine
 */
interface Domaine {
  id: string;
  titre: string;
  contenu: string;
  auteur?: string;
  competences: string[]; // IDs des compétences
}

/**
 * Lit tous les fichiers JSON de pages
 */
function readAllPageFiles(): any[] {
  const dataDir = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDir);
  const pageFiles: any[] = [];

  for (const file of files) {
    if (file.endsWith('.json') && !file.includes('bibliotheque')) {
      const filePath = path.join(dataDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        if (data.contenu && Array.isArray(data.contenu)) {
          pageFiles.push({ filename: file, data });
        }
      } catch (error) {
        console.warn(`Erreur lors de la lecture de ${file}:`, error);
      }
    }
  }

  return pageFiles;
}

/**
 * Extrait toutes les compétences uniques
 */
function extractCompetences(pageFiles: any[]): Map<string, Competence> {
  const competencesMap = new Map<string, Competence>();

  for (const pageFile of pageFiles) {
    for (const element of pageFile.data.contenu) {
      if (element.type === 'domaineDeCompetence' && element.competences) {
        for (const competence of element.competences) {
          const id = titleToSlug(competence.titre);
          
          // Si la compétence n'existe pas encore, l'ajouter
          if (!competencesMap.has(id)) {
            competencesMap.set(id, {
              id,
              titre: competence.titre,
              image: competence.image,
              icon: competence.icon,
              description: competence.description,
              bouton: competence.bouton,
              type: competence.type || 'competence',
              auteur: competence.auteur,
            });
          } else {
            // Vérifier si les données sont identiques (sauf pour les différences mineures)
            const existing = competencesMap.get(id)!;
            if (existing.description !== competence.description) {
              console.warn(`Compétence "${competence.titre}" a des descriptions différentes selon les contextes`);
            }
          }
        }
      }
    }
  }

  return competencesMap;
}

/**
 * Extrait tous les domaines
 */
function extractDomaines(pageFiles: any[]): Map<string, Domaine> {
  const domainesMap = new Map<string, Domaine>();

  for (const pageFile of pageFiles) {
    for (const element of pageFile.data.contenu) {
      if (element.type === 'domaineDeCompetence') {
        const id = titleToSlug(element.titre);
        
        // Extraire les IDs des compétences
        const competenceIds: string[] = [];
        if (element.competences && Array.isArray(element.competences)) {
          for (const competence of element.competences) {
            competenceIds.push(titleToSlug(competence.titre));
          }
        }

        // Si le domaine n'existe pas encore, l'ajouter
        if (!domainesMap.has(id)) {
          domainesMap.set(id, {
            id,
            titre: element.titre,
            contenu: element.contenu || '',
            auteur: element.auteur,
            competences: competenceIds,
          });
        } else {
          // Vérifier si les données sont identiques
          const existing = domainesMap.get(id)!;
          if (existing.contenu !== (element.contenu || '')) {
            console.warn(`Domaine "${element.titre}" a des contenus différents selon les contextes`);
          }
          // Vérifier si les compétences sont identiques
          const existingIds = existing.competences.sort().join(',');
          const newIds = competenceIds.sort().join(',');
          if (existingIds !== newIds) {
            console.warn(`Domaine "${element.titre}" a des compétences différentes selon les contextes`);
          }
        }
      }
    }
  }

  return domainesMap;
}

/**
 * Génère les fichiers de bibliothèque
 */
function generateBibliotheque() {
  console.log('📚 Extraction de la bibliothèque...\n');

  const pageFiles = readAllPageFiles();
  console.log(`✅ ${pageFiles.length} fichiers de pages analysés\n`);

  const competencesMap = extractCompetences(pageFiles);
  console.log(`✅ ${competencesMap.size} compétences uniques extraites\n`);

  const domainesMap = extractDomaines(pageFiles);
  console.log(`✅ ${domainesMap.size} domaines uniques extraits\n`);

  // Créer le dossier bibliotheque s'il n'existe pas
  const bibliothequeDir = path.join(process.cwd(), 'data', 'bibliotheque');
  if (!fs.existsSync(bibliothequeDir)) {
    fs.mkdirSync(bibliothequeDir, { recursive: true });
  }

  // Convertir les Maps en objets pour JSON
  const competencesObj: Record<string, Competence> = {};
  for (const [id, competence] of competencesMap.entries()) {
    competencesObj[id] = competence;
  }

  const domainesObj: Record<string, Domaine> = {};
  for (const [id, domaine] of domainesMap.entries()) {
    domainesObj[id] = domaine;
  }

  // Écrire competences.json
  const competencesPath = path.join(bibliothequeDir, 'competences.json');
  fs.writeFileSync(
    competencesPath,
    JSON.stringify({ competences: competencesObj }, null, 2),
    'utf-8'
  );
  console.log(`✅ ${competencesPath} créé\n`);

  // Écrire domaines.json
  const domainesPath = path.join(bibliothequeDir, 'domaines.json');
  fs.writeFileSync(
    domainesPath,
    JSON.stringify({ domaines: domainesObj }, null, 2),
    'utf-8'
  );
  console.log(`✅ ${domainesPath} créé\n`);

  // Afficher un résumé
  console.log('📊 Résumé :');
  console.log(`  - Compétences : ${competencesMap.size}`);
  console.log(`  - Domaines : ${domainesMap.size}`);
  console.log('\n✅ Bibliothèque générée avec succès !');
}

// Exécuter le script
if (require.main === module) {
  generateBibliotheque();
}

export { titleToSlug, extractCompetences, extractDomaines };
