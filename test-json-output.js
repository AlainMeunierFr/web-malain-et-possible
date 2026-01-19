// Script pour tester le parsing du fichier de sprint et afficher le JSON résultant
const fs = require('fs');
const path = require('path');

// Importer les fonctions nécessaires
const { readAboutSiteStructure } = require('./utils/aboutSiteReader.ts');

// Lire le fichier de sprint
const filePath = path.join('A propos de ce site', '2. Sprints', '2026-01-19 - Site vitrine - Structure et responsive.md');
const content = fs.readFileSync(filePath, 'utf8');

// Parser le contenu
try {
  const structure = readAboutSiteStructure();
  
  // Trouver la section "Sprints" et la partie correspondante
  const sprintSection = structure.chapitres.find(ch => ch.nom === '2. Sprints');
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
    console.log('Chapitres disponibles:', structure.chapitres.map(ch => ch.nom));
  }
} catch (error) {
  console.error('Erreur:', error.message);
  console.error(error.stack);
}
