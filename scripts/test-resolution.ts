/**
 * Script pour tester la résolution des références
 */

import { readPageData, readCompetences, readDomaines } from '../utils/server';

function testResolution() {
  console.log('🧪 Test de résolution des références...\n');

  try {
    // Charger la bibliothèque
    const competences = readCompetences();
    const domaines = readDomaines();
    console.log(`✅ Bibliothèque chargée: ${competences.size} compétences, ${domaines.size} domaines\n`);

    // Tester la résolution pour index.json
    console.log('📄 Test de résolution pour index.json...');
    const pageData = readPageData('index.json');
    
    // Vérifier qu'il y a des références
    const hasRefs = pageData.contenu.some((el: any) => 
      el.type === 'domaineDeCompetence' && el.ref
    );
    console.log(`  ${hasRefs ? '✅' : '⚠️'} Références détectées: ${hasRefs}\n`);

    // readPageData devrait automatiquement résoudre les références
    const resolved = readPageData('index.json');
    
    // Vérifier que les références ont été résolues
    let resolvedCount = 0;
    let refCount = 0;
    for (const element of resolved.contenu) {
      if (element.type === 'domaineDeCompetence') {
        const el = element as any;
        if (el.ref) {
          refCount++;
        } else if (el.titre && el.items) {
          resolvedCount++;
        }
      }
    }

    console.log(`  ✅ Domaines résolus: ${resolvedCount}`);
    console.log(`  ⚠️  Références non résolues: ${refCount}\n`);

    if (refCount === 0 && resolvedCount > 0) {
      console.log('✅ Résolution fonctionne correctement !');
    } else {
      console.log('⚠️  Certaines références n\'ont pas été résolues');
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

testResolution();
