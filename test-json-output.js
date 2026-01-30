// Script pour tester le parsing du fichier de sprint et afficher le JSON résultant
// Utilise readChapitreByPath (US-11.3) au lieu de readAboutSiteStructure (supprimé).
const fs = require('fs');
const path = require('path');

const { readChapitreByPath } = require('./utils/aboutSiteReader.ts');

// Lire le chapitre 2. Sprints par chemin
const sprintPath = 'data/A propos de ce site/2. Sprints';
const content = fs.readFileSync(path.join(sprintPath, '2026-01-19 - Site vitrine - Structure et responsive.md'), 'utf8');

try {
  const chapitre = readChapitreByPath(sprintPath);
  if (!chapitre) {
    console.log('Chapitre 2. Sprints non trouvé ou vide');
    process.exit(1);
  }
  const sprintSection = chapitre;
  if (sprintSection) {
    const sprintPartie = sprintSection.sections[0]?.parties?.find(p => 
      p.titre.includes('Site vitrine - Structure et responsive')
    );
    
    if (sprintPartie) {
      // Afficher les sous-parties (US)
      console.log('=== SOUS-PARTIES (US) ===\n');
      sprintPartie.sousParties.forEach((sousPartie, index) => {
        console.log(`\n--- US ${index + 1}: ${sousPartie.titre} ---`);
        console.log('typeDeContenu:', sousPartie.typeDeContenu || 'null');
        
        if (sousPartie.contenuParse && sousPartie.contenuParse.length > 0) {
          console.log('\nÉléments parsés:');
          sousPartie.contenuParse.forEach((element, elIndex) => {
            if (element.type === 'ul' && element.typeDeContenu) {
              console.log(`  [${elIndex}] typeDeContenu: "${element.typeDeContenu}"`);
              console.log(`      items:`, element.items);
            }
          });
        }
      });
    } else {
      console.log('Partie non trouvée');
      console.log('Sections disponibles:', sprintSection.sections.map(s => s.nom));
      if (sprintSection.sections[0]) {
        console.log('Parties disponibles:', sprintSection.sections[0].parties.map(p => p.titre));
      }
    }
  } else {
    console.log('Section "2. Sprints" non trouvée');
    console.log('Sections disponibles:', sprintSection.sections.map(s => s.nom));
  }
} catch (error) {
  console.error('Erreur:', error.message);
  console.error(error.stack);
}
