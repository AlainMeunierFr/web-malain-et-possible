/**
 * Script pour tester le rendu de la section HERO
 */

import { readPageData } from '../utils/indexReader';

function testHeroRendering() {
  console.log('🧪 Test du rendu de la section HERO...\n');

  try {
    const pageData = readPageData('index.json');
    
    console.log(`✅ Page chargée: ${pageData.contenu.length} éléments\n`);

    // Vérifier que le premier élément est de type hero
    const firstElement = pageData.contenu[0];
    if (firstElement.type === 'hero') {
      const hero = firstElement as any;
      console.log('✅ Section HERO trouvée:');
      console.log(`  - Titre: ${hero.titre}`);
      console.log(`  - Sous-titre: ${hero.sousTitre}`);
      console.log(`  - Description: ${hero.description.substring(0, 50)}...`);
      console.log(`  - Call to action: ${hero.callToAction.texte} → ${hero.callToAction.action}`);
      console.log(`  - Nombre de profils: ${hero.profils.length}\n`);

      // Vérifier chaque profil
      hero.profils.forEach((profil: any, index: number) => {
        console.log(`  Profil ${index + 1}: ${profil.titre}`);
        console.log(`    - Job titles: ${profil.jobTitles.length}`);
        console.log(`    - Route: ${profil.route}`);
        console.log(`    - CV: ${profil.cvPath}\n`);
      });
    } else {
      console.error('❌ Le premier élément n\'est pas de type hero');
      console.error(`   Type trouvé: ${firstElement.type}`);
      process.exit(1);
    }

    // Vérifier la structure complète
    console.log('📊 Structure complète de la page:');
    pageData.contenu.forEach((element, index) => {
      console.log(`  ${index + 1}. ${element.type}`);
    });

    console.log('\n✅ Rendu de la HERO validé !');
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

testHeroRendering();
