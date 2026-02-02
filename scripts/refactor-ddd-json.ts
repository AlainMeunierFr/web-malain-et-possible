/**
 * Script pour refactoriser les JSON selon les nouvelles interfaces DDD
 * - Renomme items → competences
 * - Ajoute type: "competence" à chaque compétence
 * - Ajoute type: "bouton" à chaque bouton
 */

import fs from 'fs';
import path from 'path';

interface OldCompetence {
  titre: string;
  image?: { src: string; alt: string };
  icon?: string;
  description: string;
  auteur?: string;
  bouton: { texte: string; action: string } | null;
}

interface NewCompetence extends OldCompetence {
  type: 'competence';
  bouton: { type: 'bouton'; texte: string; action: string } | null;
}

interface OldBoutonGroupe {
  id: string;
  icone: string;
  texte: string | null;
  url: string | null;
  command: string | null;
}

interface NewBoutonGroupe extends OldBoutonGroupe {
  type: 'bouton';
}

function refactorCompetence(competence: OldCompetence): NewCompetence {
  const newCompetence: NewCompetence = {
    ...competence,
    type: 'competence',
    bouton: competence.bouton
      ? {
          type: 'bouton',
          texte: competence.bouton.texte,
          action: competence.bouton.action,
        }
      : null,
  };
  return newCompetence;
}

function refactorBouton(bouton: OldBoutonGroupe): NewBoutonGroupe {
  return {
    type: 'bouton',
    ...bouton,
  };
}

function refactorJson(jsonData: any): any {
  if (Array.isArray(jsonData)) {
    return jsonData.map(refactorJson);
  }

  if (typeof jsonData === 'object' && jsonData !== null) {
    const result: any = {};

    for (const [key, value] of Object.entries(jsonData)) {
      // Renommer items → competences
      if (key === 'items' && jsonData.type === 'domaineDeCompetence') {
        result.competences = (value as OldCompetence[]).map(refactorCompetence);
      }
      // Ajouter type aux boutons dans groupeDeBoutons
      else if (key === 'boutons' && jsonData.type === 'groupeDeBoutons') {
        result.boutons = (value as OldBoutonGroupe[]).map(refactorBouton);
      }
      // Récursion pour les autres valeurs
      else {
        result[key] = refactorJson(value);
      }
    }

    return result;
  }

  return jsonData;
}

function refactorJsonFile(filePath: string): void {
  console.log(`\n📄 Traitement de ${filePath}...`);

  // Lire le fichier
  const content = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(content);

  // Refactoriser
  const refactoredData = refactorJson(jsonData);

  // Sauvegarder une copie de backup
  const backupPath = filePath.replace('.json', '.backup.json');
  fs.writeFileSync(backupPath, content, 'utf8');
  console.log(`  ✅ Backup créé : ${backupPath}`);

  // Écrire le fichier refactorisé
  fs.writeFileSync(filePath, JSON.stringify(refactoredData, null, 2), 'utf8');
  console.log(`  ✅ Fichier refactorisé : ${filePath}`);
}

// Traiter tous les fichiers JSON dans data/
const dataDir = path.join(process.cwd(), 'data');
const jsonFiles = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json'));

console.log('🚀 Démarrage de la refactorisation DDD des JSON...');
console.log(`📁 Répertoire : ${dataDir}`);
console.log(`📝 Fichiers à traiter : ${jsonFiles.length}`);

jsonFiles.forEach((file) => {
  const filePath = path.join(dataDir, file);
  try {
    refactorJsonFile(filePath);
  } catch (error) {
    console.error(`  ❌ Erreur lors du traitement de ${file}:`, error);
  }
});

console.log('\n✅ Refactorisation terminée !');
