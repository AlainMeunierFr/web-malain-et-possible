/**
 * Script pour nettoyer la bibliothèque des doublons créés à cause de l'encodage incorrect
 */

import fs from 'fs';
import path from 'path';

interface BibliothequeCompetences {
  competences: Record<string, any>;
}

interface BibliothequeDomaines {
  domaines: Record<string, any>;
}

// IDs incorrects à supprimer (créés à cause de l'encodage)
const idsIncorrectsCompetences = [
  'cr-ativit',
  'viralit',
  'strat-gie',
  'ing-nierie-logicielle',
  'mod-lisation-graphique',
  'conf-rence',
  'r-seau-social-professionnel',
  'membre-actif-de-communaut-s',
  'd-tournement-vid-o',
  'une-vision-syst-mique',
  'improvisation-th-otrale',
  'jeux-de-strat-gie',
  'sant',
  'faire-merger-une-vision-partag-e',
  'r-aliser-un-diagnostic-sinc-re',
  'g-n-rer-de-l-engagement'
];

const idsIncorrectsDomaines = [
  'faire-avec-les-quipes',
  'strat-gie-et-transformations',
  'd-veloppement-informatique',
  'engager-les-quipes',
  'activit-s-extra-professionnelles-au-service-de-ma-profession',
  'd-veloppeur',
  'exp-rience-en-quipe',
  'bien-appliqu-l-agilite-est-un-cadre-puissant-pour-d-livrer-de-la-valeur',
  'et-si-nous-rendions-votre-entreprise-stable-malgr-les-fluctuations',
  'la-robustesse-est-la-r-ponse-op-rationnelle-a-un-monde-fluctuant',
  'la-distance-entre-r-ve-et-r-alit-s-appelle-l-action'
];

function main() {
  // Nettoyer les compétences
  const competencesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'competences.json');
  const competencesContent = fs.readFileSync(competencesPath, 'utf-8');
  const bibCompetences: BibliothequeCompetences = JSON.parse(competencesContent);
  
  let removedCount = 0;
  for (const id of idsIncorrectsCompetences) {
    if (bibCompetences.competences[id]) {
      delete bibCompetences.competences[id];
      removedCount++;
      console.log(`✅ Supprimé compétence incorrecte: ${id}`);
    }
  }
  
  fs.writeFileSync(competencesPath, JSON.stringify(bibCompetences, null, 2), 'utf-8');
  console.log(`\n✅ ${removedCount} compétence(s) incorrecte(s) supprimée(s)\n`);
  
  // Nettoyer les domaines
  const domainesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'domaines.json');
  const domainesContent = fs.readFileSync(domainesPath, 'utf-8');
  const bibDomaines: BibliothequeDomaines = JSON.parse(domainesContent);
  
  removedCount = 0;
  for (const id of idsIncorrectsDomaines) {
    if (bibDomaines.domaines[id]) {
      delete bibDomaines.domaines[id];
      removedCount++;
      console.log(`✅ Supprimé domaine incorrect: ${id}`);
    }
  }
  
  fs.writeFileSync(domainesPath, JSON.stringify(bibDomaines, null, 2), 'utf-8');
  console.log(`\n✅ ${removedCount} domaine(s) incorrect(s) supprimé(s)\n`);
  
  console.log('✅ Nettoyage terminé !');
}

main();
